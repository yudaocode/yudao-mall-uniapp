import { reactive, ref, onBeforeUnmount } from 'vue';
import { baseUrl, websocketPath } from '@/sheep/config';
import { copyValueToTarget } from '@/sheep/util';

export function useWebSocket(opt) {
  // 获取token
  const getAccessToken = () => {
    return uni.getStorageSync('token');
  };

  const options = reactive({
    url: (baseUrl + websocketPath).replace('http', 'ws') + '?token=' + getAccessToken(), // ws 地址
    isReconnecting: false, // 正在重新连接
    reconnectInterval: 3000, // 重连间隔，单位毫秒
    heartBeatInterval: 5000, // 心跳间隔，单位毫秒
    pingTimeoutDuration: 1000, // 超过这个时间，后端没有返回pong，则判定后端断线了。
    heartBeatTimer: null, // 心跳计时器
    destroy: false, // 是否销毁
    onConnected: () => {
    }, // 连接成功时触发
    onClosed: () => {
    }, // 连接关闭时触发
    onMessage: (data) => {
    }, // 收到消息
  });
  const Socket = ref(null); // Socket 链接实例

  const initEventListeners = () => {
    Socket.value.onOpen(() => {
      // WebSocket连接已打开
      options.onConnected();
      startHeartBeat();
    });

    Socket.value.onMessage((res) => {
      try {
        const obj = JSON.parse(res.data);
        if (obj.type === 'pong') {
          // 收到pong消息，心跳正常，无需处理
          resetPingTimeout(); // 重置计时
        } else {
          // 处理其他消息
          options.onMessage(obj);
        }
      } catch {
        console.error(res.data);
      }
    });

    Socket.value.onClose((res) => {
      // WebSocket连接已关闭
      if (options.destroy) {
        options.onClosed();
        return;
      }
      stopHeartBeat();
      if (!options.isReconnecting) {
        reconnect();
      }
    });
  };

  const sendMessage = (message) => {
    if (Socket.value) {
      Socket.value.send({
        data: message,
      });
    }
  };

  const startHeartBeat = () => {
    options.heartBeatTimer = setInterval(() => {
      sendMessage(JSON.stringify({
        type: 'ping',
      })); // 发送ping消息
      options.pingTimeout = setTimeout(() => {
        // 未收到pong消息，尝试重连...
        reconnect();
      }, options.pingTimeoutDuration);
    }, options.heartBeatInterval);
  };

  const stopHeartBeat = () => {
    if (options.heartBeatTimer) {
      clearInterval(options.heartBeatTimer);
    }
  };

  const reconnect = () => {
    options.isReconnecting = true;
    setTimeout(() => {
      onReconnect();
      initSocket();
      options.isReconnecting = false;
    }, options.reconnectInterval);
  };

  const resetPingTimeout = () => {
    clearTimeout(options.pingTimeout); // 重置计时
  };

  const close = () => {
    options.destroy = true;
    stopHeartBeat();
    if (Socket.value) {
      Socket.value.close();
      Socket.value = null;
    }
  };
  /**
   * 重连时触发
   */
  const onReconnect = () => {
    console.log('尝试重连...');
  };

  const initSocket = () => {
    copyValueToTarget(options, opt);
    Socket.value = uni.connectSocket({
      url: options.url,
      complete: () => {
      },
    });
    initEventListeners();
  };
  initSocket();

  onBeforeUnmount(()=>{
    close()
  })
}
