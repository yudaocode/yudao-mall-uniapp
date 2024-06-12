import { reactive, ref, unref } from 'vue';
import sheep from '@/sheep';
// import chat from '@/sheep/api/chat';
import dayjs from 'dayjs';
import io from '@hyoga/uni-socket.io';
import { baseUrl, websocketPath } from '@/sheep/config';
export function useWebSocket() {
  const SocketIo = ref(null)
  // chat状态数据
  const state = reactive({
    socketState: {
      isConnect: true, //是否连接成功
      isConnecting: false, //重连中，不允许新的socket开启。
      tip: '',
    },
    chatConfig: {}, // 配置信息
  });
  /**
   * 连接初始化
   * @param {Object} config  - 配置信息
   * @param {Function} callBack -回调函数,有新消息接入，保持底部
   */
  const socketInit = (config, callBack) => {
    state.chatConfig = config;
    if (SocketIo.value && SocketIo.value.connected) return; // 如果socket已经连接，返回false
    if (state.socketState.isConnecting) return; // 重连中，返回false

    // 启动初始化
    SocketIo.value = io(baseUrl + websocketPath, {
      path:websocketPath,
      query:{
        token: getAccessToken()
      },
      reconnection: true, // 默认 true    是否断线重连
      reconnectionAttempts: 5, // 默认无限次   断线尝试次数
      reconnectionDelay: 1000, // 默认 1000，进行下一次重连的间隔。
      reconnectionDelayMax: 5000, // 默认 5000， 重新连接等待的最长时间 默认 5000
      randomizationFactor: 0.5, // 默认 0.5 [0-1]，随机重连延迟时间
      timeout: 20000, // 默认 20s
      transports: ['websocket', 'polling'], // websocket | polling,
      ...config,
    });

    // 监听连接
    SocketIo.value.on('connect', async (res) => {
      console.log('socket:connect');
      // 消息返回
      callBack && callBack(res)
    });

    // 监听错误 error
    SocketIo.value.on('error', (error) => {
      console.log('error:', error);
    });
    // 重连失败 connect_error
    SocketIo.value.on('connect_error', (error) => {
      console.log('connect_error');
    });
    // 连接上，但无反应 connect_timeout
    SocketIo.value.on('connect_timeout', (error) => {
      console.log(error, 'connect_timeout');
    });
    // 服务进程销毁 disconnect
    SocketIo.value.on('disconnect', (error) => {
      console.log(error, 'disconnect');
    });
    // 服务重启重连上reconnect
    SocketIo.value.on('reconnect', (error) => {
      console.log(error, 'reconnect');
    });
    // 开始重连reconnect_attempt
    SocketIo.value.on('reconnect_attempt', (error) => {
      state.socketState.isConnect = false;
      state.socketState.isConnecting = true;
      console.log(error, 'reconnect_attempt');
    });
    // 重新连接中reconnecting
    SocketIo.value.on('reconnecting', (error) => {
      console.log(error, 'reconnecting');
    });
    // 重新连接错误reconnect_error
    SocketIo.value.on('reconnect_error', (error) => {
      console.log('reconnect_error');
    });
    // 重新连接失败reconnect_failed
    SocketIo.value.on('reconnect_failed', (error) => {
      state.socketState.isConnecting = false;
      console.log(error, 'reconnect_failed');
    });
  };
  // 获取token
  const getAccessToken = () => {
    return uni.getStorageSync('token');
  };
  return {
    state,
    socketInit
  }
}
