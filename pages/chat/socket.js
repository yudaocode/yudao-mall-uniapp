import { reactive, ref, unref } from 'vue';
import sheep from '@/sheep';
// import chat from '@/sheep/api/chat';
import dayjs from 'dayjs';
import io from '@hyoga/uni-socket.io';

export function useChatWebSocket(socketConfig) {
  let SocketIo = null;

  // chat状态数据
  const state = reactive({
    chatDotNum: 0, //总状态红点
    chatList: [], //会话信息
    customerUserInfo: {}, //用户信息
    customerServerInfo: {
      //客服信息
      title: '连接中...',
      state: 'connecting',
      avatar: null,
      nickname: '',
    },
    socketState: {
      isConnect: true, //是否连接成功
      isConnecting: false, //重连中，不允许新的socket开启。
      tip: '',
    },
    chatHistoryPagination: {
      page: 0, //当前页
      list_rows: 10, //每页条数
      last_id: 0, //最后条ID
      lastPage: 0, //总共多少页
      loadStatus: 'loadmore', //loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
    },
    templateChatList: [], //猜你想问

    chatConfig: {}, // 配置信息

    isSendSucces: -1, // 是否发送成功 -1=发送中|0=发送成功|1发送失败
  });

  /**
   * 连接初始化
   * @param {Object} config  - 配置信息
   * @param {Function} callBack -回调函数,有新消息接入，保持底部
   */
  const socketInit = (config, callBack) => {
    state.chatConfig = config;
    if (SocketIo && SocketIo.connected) return; // 如果socket已经连接，返回false
    if (state.socketState.isConnecting) return; // 重连中，返回false

    // 启动初始化
    SocketIo = io(config.chat_domain, {
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
    SocketIo.on('connect', async (res) => {
      socketReset(callBack);
      // socket连接
      // 用户登录
      // 顾客登录
      console.log('socket:connect');
    });
    // 监听消息
    SocketIo.on('message', (res) => {
      if (res.error === 0) {
        const { message, sender } = res.data;
        state.chatList.push(formatMessage(res.data.message));

        // 告诉父级页面
        // window.parent.postMessage({
        // 	chatDotNum: ++state.chatDotNum
        // })
        callBack && callBack();
      }
    });
    // 监听客服接入成功
    SocketIo.on('customer_service_access', (res) => {
      if (res.error === 0) {
        editCustomerServerInfo({
          title: res.data.customer_service.name,
          state: 'online',
          avatar: res.data.customer_service.avatar,
        });
        state.chatList.push(formatMessage(res.data.message));
        // callBack && callBack()
      }
    });
    // 监听排队等待
    SocketIo.on('waiting_queue', (res) => {
      if (res.error === 0) {
        editCustomerServerInfo({
          title: res.data.title,
          state: 'waiting',
          avatar: '',
        });
        // callBack && callBack()
      }
    });
    // 监听没有客服在线
    SocketIo.on('no_customer_service', (res) => {
      if (res.error === 0) {
        editCustomerServerInfo({
          title: '暂无客服在线...',
          state: 'waiting',
          avatar: '',
        });
      }
      state.chatList.push(formatMessage(res.data.message));
      // callBack && callBack()
    });
    // 监听客服上线
    SocketIo.on('customer_service_online', (res) => {
      if (res.error === 0) {
        editCustomerServerInfo({
          title: res.data.customer_service.name,
          state: 'online',
          avatar: res.data.customer_service.avatar,
        });
      }
    });
    // 监听客服下线
    SocketIo.on('customer_service_offline', (res) => {
      if (res.error === 0) {
        editCustomerServerInfo({
          title: res.data.customer_service.name,
          state: 'offline',
          avatar: res.data.customer_service.avatar,
        });
      }
    });
    // 监听客服忙碌
    SocketIo.on('customer_service_busy', (res) => {
      if (res.error === 0) {
        editCustomerServerInfo({
          title: res.data.customer_service.name,
          state: 'busy',
          avatar: res.data.customer_service.avatar,
        });
      }
    });
    // 监听客服断开链接
    SocketIo.on('customer_service_break', (res) => {
      if (res.error === 0) {
        editCustomerServerInfo({
          title: '客服服务结束',
          state: 'offline',
          avatar: '',
        });
        state.socketState.isConnect = false;
        state.socketState.tip = '当前服务已结束';
      }
      state.chatList.push(formatMessage(res.data.message));
      // callBack && callBack()
    });
    // 监听自定义错误 custom_error
    SocketIo.on('custom_error', (error) => {
      editCustomerServerInfo({
        title: error.msg,
        state: 'offline',
        avatar: '',
      });
      console.log('custom_error:', error);
    });
    // 监听错误 error
    SocketIo.on('error', (error) => {
      console.log('error:', error);
    });
    // 重连失败 connect_error
    SocketIo.on('connect_error', (error) => {
      console.log('connect_error');
    });
    // 连接上，但无反应 connect_timeout
    SocketIo.on('connect_timeout', (error) => {
      console.log(error, 'connect_timeout');
    });
    // 服务进程销毁 disconnect
    SocketIo.on('disconnect', (error) => {
      console.log(error, 'disconnect');
    });
    // 服务重启重连上reconnect
    SocketIo.on('reconnect', (error) => {
      console.log(error, 'reconnect');
    });
    // 开始重连reconnect_attempt
    SocketIo.on('reconnect_attempt', (error) => {
      state.socketState.isConnect = false;
      state.socketState.isConnecting = true;
      editCustomerServerInfo({
        title: `重连中，第${error}次尝试...`,
        state: 'waiting',
        avatar: '',
      });
      console.log(error, 'reconnect_attempt');
    });
    // 重新连接中reconnecting
    SocketIo.on('reconnecting', (error) => {
      console.log(error, 'reconnecting');
    });
    // 重新连接错误reconnect_error
    SocketIo.on('reconnect_error', (error) => {
      console.log('reconnect_error');
    });
    // 重新连接失败reconnect_failed
    SocketIo.on('reconnect_failed', (error) => {
      state.socketState.isConnecting = false;
      editCustomerServerInfo({
        title: `重连失败，请刷新重试~`,
        state: 'waiting',
        avatar: '',
      });
      console.log(error, 'reconnect_failed');

      // setTimeout(() => {
      state.isSendSucces = 1;
      // }, 500)
    });
  };

  // 重置socket
  const socketReset = (callBack) => {
    state.chatList = [];
    state.chatHistoryList = [];
    state.chatHistoryPagination = {
      page: 0,
      per_page: 10,
      last_id: 0,
      totalPage: 0,
    };
    socketConnection(callBack); // 连接
  };

  // 退出连接
  const socketClose = () => {
    SocketIo.emit('customer_logout', {}, (res) => {
      console.log('socket:退出', res);
    });
  };

  // 测试事件
  const socketTest = () => {
    SocketIo.emit('test', {}, (res) => {
      console.log('test:test', res);
    });
  };

  // 发送消息
  const socketSendMsg = (data, sendMsgCallBack) => {
    state.isSendSucces = -1;
    state.chatList.push(data);
    sendMsgCallBack && sendMsgCallBack();
    SocketIo.emit(
      'message',
      {
        message: formatInput(data),
        ...data.customData,
      },
      (res) => {
        // setTimeout(() => {
        state.isSendSucces = res.error;
        // }, 500)

        // console.log(res, 'socket:send');
        // sendMsgCallBack && sendMsgCallBack()
      },
    );
  };

  // 连接socket,存入sessionId
  const socketConnection = (callBack) => {
    SocketIo.emit(
      'connection',
      {
        auth: 'user',
        token: uni.getStorageSync('socketUserToken') || '',
        session_id: uni.getStorageSync('socketSessionId') || '',
      },
      (res) => {
        if (res.error === 0) {
          socketCustomerLogin(callBack);
          uni.setStorageSync('socketSessionId', res.data.session_id);
          // uni.getStorageSync('socketUserToken') && socketLogin(uni.getStorageSync(
          // 	'socketUserToken')) // 如果有用户token,绑定
          state.customerUserInfo = res.data.chat_user;
          state.socketState.isConnect = true;
        } else {
          editCustomerServerInfo({
            title: `服务器异常！`,
            state: 'waiting',
            avatar: '',
          });
          state.socketState.isConnect = false;
        }
      },
    );
  };

  // 用户id,获取token
  const getUserToken = async (id) => {
    const res = await chat.unifiedToken();
    if (res.error === 0) {
      uni.setStorageSync('socketUserToken', res.data.token);
      // SocketIo && SocketIo.connected && socketLogin(res.data.token)
    }
    return res;
  };

  // 用户登录
  const socketLogin = (token) => {
    SocketIo.emit(
      'login',
      {
        token: token,
      },
      (res) => {
        console.log(res, 'socket:login');
        state.customerUserInfo = res.data.chat_user;
      },
    );
  };

  // 顾客登录
  const socketCustomerLogin = (callBack) => {
    SocketIo.emit(
      'customer_login',
      {
        room_id: state.chatConfig.room_id,
      },
      (res) => {
        state.templateChatList = res.data.questions.length ? res.data.questions : [];
        state.chatList.push({
          from: 'customer_service', // 用户customer右 |  顾客customer_service左 | 系统system中间
          mode: 'template', // goods,order,image,text,system
          date: new Date().getTime(), //时间
          content: {
            //内容
            list: state.templateChatList,
          },
        });
        res.error === 0 && socketHistoryList(callBack);
      },
    );
  };

  // 获取历史消息
  const socketHistoryList = (historyCallBack) => {
    state.chatHistoryPagination.loadStatus = 'loading';
    state.chatHistoryPagination.page += 1;
    SocketIo.emit('messages', state.chatHistoryPagination, (res) => {
      if (res.error === 0) {
        state.chatHistoryPagination.total = res.data.messages.total;
        state.chatHistoryPagination.lastPage = res.data.messages.last_page;
        state.chatHistoryPagination.page = res.data.messages.current_page;
        res.data.messages.data.forEach((item) => {
          item.message_type && state.chatList.unshift(formatMessage(item));
        });
        state.chatHistoryPagination.loadStatus =
          state.chatHistoryPagination.page < state.chatHistoryPagination.lastPage
            ? 'loadmore'
            : 'nomore';
        if (state.chatHistoryPagination.last_id == 0) {
          state.chatHistoryPagination.last_id = res.data.messages.data.length
            ? res.data.messages.data[0].id
            : 0;
        }
        state.chatHistoryPagination.page === 1 && historyCallBack && historyCallBack();
      }

      // 历史记录之后，猜你想问
      // state.chatList.push({
      // 	from: 'customer_service', // 用户customer右 |  顾客customer_service左 | 系统system中间
      // 	mode: 'template', // goods,order,image,text,system
      // 	date: new Date().getTime(), //时间
      // 	content: { //内容
      // 		list: state.templateChatList
      // 	}
      // })
    });
  };

  // 修改客服信息
  const editCustomerServerInfo = (data) => {
    state.customerServerInfo = {
      ...state.customerServerInfo,
      ...data,
    };
  };

  /**
   * ================
   * 工具函数 ↓
   * ===============
   */

  /**
   * 是否显示时间
   * @param {*} item - 数据
   * @param {*} index - 索引
   */
  const showTime = (item, index) => {
    if (unref(state.chatList)[index + 1]) {
      let dateString = dayjs(unref(state.chatList)[index + 1].date).fromNow();
      if (dateString === dayjs(unref(item).date).fromNow()) {
        return false;
      } else {
        dateString = dayjs(unref(item).date).fromNow();
        return true;
      }
    }
    return false;
  };

  /**
   * 格式化时间
   * @param {*} time - 时间戳
   */
  const formatTime = (time) => {
    let diffTime = new Date().getTime() - time;
    if (diffTime > 28 * 24 * 60 * 1000) {
      return dayjs(time).format('MM/DD HH:mm');
    }
    if (diffTime > 360 * 28 * 24 * 60 * 1000) {
      return dayjs(time).format('YYYY/MM/DD HH:mm');
    }
    return dayjs(time).fromNow();
  };

  /**
   * 获取焦点
   * @param {*} virtualNode - 节点信息 ref
   */
  const getFocus = (virtualNode) => {
    if (window.getSelection) {
      let chatInput = unref(virtualNode);
      chatInput.focus();
      let range = window.getSelection();
      range.selectAllChildren(chatInput);
      range.collapseToEnd();
    } else if (document.selection) {
      let range = document.selection.createRange();
      range.moveToElementText(chatInput);
      range.collapse(false);
      range.select();
    }
  };

  /**
   * 文件上传
   * @param {Blob} file -文件数据流
   * @return {path,fullPath}
   */

  const upload = (name, file) => {
    return new Promise((resolve, reject) => {
      let data = new FormData();
      data.append('file', file, name);
      data.append('group', 'chat');
      ajax({
        url: '/upload',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data,
        success: function (res) {
          resolve(res);
        },
        error: function (err) {
          reject(err);
        },
      });
    });
  };

  /**
   * 粘贴到输入框
   * @param {*} e  - 粘贴内容
   * @param {*} uploadHttp - 上传图片地址
   */
  const onPaste = async (e) => {
    let paste = e.clipboardData || window.clipboardData;
    let filesArr = Array.from(paste.files);
    filesArr.forEach(async (child) => {
      if (child && child.type.includes('image')) {
        e.preventDefault(); //阻止默认
        let file = child;
        const img = await readImg(file);
        const blob = await compressImg(img, file.type);
        const { data } = await upload(file.name, blob);
        let image = `<img class="full-url" src='${data.fullurl}'>`;
        document.execCommand('insertHTML', false, image);
      } else {
        document.execCommand('insertHTML', false, paste.getData('text'));
      }
    });
  };

  /**
   * 拖拽到输入框
   * @param {*} e  - 粘贴内容
   * @param {*} uploadHttp - 上传图片地址
   */
  const onDrop = async (e) => {
    e.preventDefault(); //阻止默认
    let filesArr = Array.from(e.dataTransfer.files);
    filesArr.forEach(async (child) => {
      if (child && child.type.includes('image')) {
        let file = child;
        const img = await readImg(file);
        const blob = await compressImg(img, file.type);
        const { data } = await upload(file.name, blob);
        let image = `<img class="full-url" src='${data.fullurl}' >`;
        document.execCommand('insertHTML', false, image);
      } else {
        ElMessage({
          message: '禁止拖拽非图片资源',
          type: 'warning',
        });
      }
    });
  };

  /**
   * 解析富文本输入框内容
   * @param {*}  virtualNode -节点信息
   * @param {Function} formatInputCallBack - cb 回调
   */
  const formatChatInput = (virtualNode, formatInputCallBack) => {
    let res = '';
    let elemArr = Array.from(virtualNode.childNodes);
    elemArr.forEach((child, index) => {
      if (child.nodeName === '#text') {
        //如果为文本节点
        res += child.nodeValue;
        if (
          //文本节点的后面是图片，并且不是emoji,分开发送。输入框中的图片和文本表情分开。
          elemArr[index + 1] &&
          elemArr[index + 1].nodeName === 'IMG' &&
          elemArr[index + 1] &&
          elemArr[index + 1].name !== 'emoji'
        ) {
          const data = {
            from: 'customer',
            mode: 'text',
            date: new Date().getTime(),
            content: {
              text: filterXSS(res),
            },
          };
          formatInputCallBack && formatInputCallBack(data);
          res = '';
        }
      } else if (child.nodeName === 'BR') {
        res += '<br/>';
      } else if (child.nodeName === 'IMG') {
        // 有emjio 和 一般图片
        // 图片解析后直接发送，不跟文字表情一组
        if (child.name !== 'emoji') {
          let srcReg = /src=[\'\']?([^\'\']*)[\'\']?/i;
          let src = child.outerHTML.match(srcReg);
          const data = {
            from: 'customer',
            mode: 'image',
            date: new Date().getTime(),
            content: {
              url: src[1],
              path: src[1].replace(/http:\/\/[^\/]*/, ''),
            },
          };
          formatInputCallBack && formatInputCallBack(data);
        } else {
          // 非表情图片跟文字一起发送
          res += child.outerHTML;
        }
      } else if (child.nodeName === 'DIV') {
        res += `<div style='width:200px; white-space: nowrap;'>${child.outerHTML}</div>`;
      }
    });
    if (res) {
      const data = {
        from: 'customer',
        mode: 'text',
        date: new Date().getTime(),
        content: {
          text: filterXSS(res),
        },
      };
      formatInputCallBack && formatInputCallBack(data);
    }
    unref(virtualNode).innerHTML = '';
  };

  /**
   * 状态回调
   * @param {*} res -接口返回数据
   */
  const callBackNotice = (res) => {
    ElNotification({
      title: 'socket',
      message: res.msg,
      showClose: true,
      type: res.error === 0 ? 'success' : 'warning',
      duration: 1200,
    });
  };

  /**
   * 格式化发送信息
   * @param {Object} message
   * @returns  obj - 消息对象
   */
  const formatInput = (message) => {
    let obj = {};
    switch (message.mode) {
      case 'text':
        obj = {
          message_type: 'text',
          message: message.content.text,
        };
        break;
      case 'image':
        obj = {
          message_type: 'image',
          message: message.content.path,
        };
        break;
      case 'goods':
        obj = {
          message_type: 'goods',
          message: message.content.item,
        };
        break;
      case 'order':
        obj = {
          message_type: 'order',
          message: message.content.item,
        };
        break;
      default:
        break;
    }
    return obj;
  };
  /**
   * 格式化接收信息
   * @param {*} message
   * @returns obj - 消息对象
   */
  const formatMessage = (message) => {
    let obj = {};
    switch (message.message_type) {
      case 'system':
        obj = {
          from: 'system', // 用户customer左 |  顾客customer_service右 | 系统system中间
          mode: 'system', // goods,order,image,text,system
          date: message.create_time * 1000, //时间
          content: {
            //内容
            text: message.message,
          },
        };
        break;
      case 'text':
        obj = {
          from: message.sender_identify,
          mode: message.message_type,
          date: message.create_time * 1000, //时间
          sender: message.sender,
          content: {
            text: message.message,
            messageId: message.id,
          },
        };
        break;
      case 'image':
        obj = {
          from: message.sender_identify,
          mode: message.message_type,
          date: message.create_time * 1000, //时间
          sender: message.sender,
          content: {
            url: sheep.$url.cdn(message.message),
            messageId: message.id,
          },
        };
        break;
      case 'goods':
        obj = {
          from: message.sender_identify,
          mode: message.message_type,
          date: message.create_time * 1000, //时间
          sender: message.sender,
          content: {
            item: message.message,
            messageId: message.id,
          },
        };
        break;
      case 'order':
        obj = {
          from: message.sender_identify,
          mode: message.message_type,
          date: message.create_time * 1000, //时间
          sender: message.sender,
          content: {
            item: message.message,
            messageId: message.id,
          },
        };
        break;
      default:
        break;
    }
    return obj;
  };

  /**
   * file 转换为 img
   * @param {*} file  - file 文件
   * @returns  img   - img标签
   */
  const readImg = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
      };
      reader.onerror = function (e) {
        reject(e);
      };
      reader.readAsDataURL(file);
      img.onload = function () {
        resolve(img);
      };
      img.onerror = function (e) {
        reject(e);
      };
    });
  };

  /**
   * 压缩图片
   *@param img -被压缩的img对象
   * @param type -压缩后转换的文件类型
   * @param mx -触发压缩的图片最大宽度限制
   * @param mh -触发压缩的图片最大高度限制
   * @returns blob - 文件流
   */
  const compressImg = (img, type = 'image/jpeg', mx = 1000, mh = 1000, quality = 1) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const { width: originWidth, height: originHeight } = img;
      // 最大尺寸限制
      const maxWidth = mx;
      const maxHeight = mh;
      // 目标尺寸
      let targetWidth = originWidth;
      let targetHeight = originHeight;
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > 1) {
          // 宽图片
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          // 高图片
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      context.clearRect(0, 0, targetWidth, targetHeight);
      // 图片绘制
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      canvas.toBlob(
        function (blob) {
          resolve(blob);
        },
        type,
        quality,
      );
    });
  };

  return {
    compressImg,
    readImg,
    formatMessage,
    formatInput,
    callBackNotice,

    socketInit,
    socketSendMsg,
    socketClose,
    socketHistoryList,

    getFocus,
    formatChatInput,
    onDrop,
    onPaste,
    upload,

    getUserToken,

    state,

    socketTest,

    showTime,
    formatTime,
  };
}