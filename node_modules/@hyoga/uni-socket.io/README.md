## @hyoga/uni-socket

项目源自：[weapp.socket.io](https://github.com/10cella/weapp.socket.io)，该项目作者已经两年没有维护，出现bug无法修复。

最近需要在uni-app中用到socket.io，遇到bug没有人修复很是头疼，所以基于weapp.socket.io新起一个项目。

如果该项目对您有帮助，可以给作者一个[star](https://github.com/AspenLuoQiang/hyoga-uni-socket.io)。

### 介绍

重写socket.io-client的engin.io-client处理件，h5依旧使用原生WebSocket，APP与小程序使用uni-app的WebSocket协议，所以h5端任然可以支持长轮询等方式，APP与小程序只能支持WebSocket协议。

### 安装

```
// 建议使用npm或yarn包形式引入以保证插件的更新迭代
npm i @hyoga/uni-socket.io --save
// yarn add @hyoga/uni-socket.io
```

### 使用

```
import io from '@hyoga/uni-socket.io';
// import io from '/yourpath/uni-socket.io'; //直接引入文件方式

io('your websocket path', {
  query: {},
  transports: [ 'websocket', 'polling' ],
  timeout: 5000,
});

socket.on('connect', () => {
  console.log('ws 已连接);
});

socket.on('error', (msg: any) => {
  console.log('ws error', msg);
});
```

更多使用方法，请参考[socket.io-client](https://github.com/socketio/socket.io-client)写法即可。

### API

参考[官网API](https://socket.io/docs/client-api/)

### 常见问题

1. 为什么没有聊天室示例代码？  

    本项目仅仅是将socket.io封装到uni-app使用，并非完整的聊天室。

2. Exception: ReferenceError: Can't find variable: window  

    hbuilder x 2.6.3版本中v3编译有bug，升级hbuilder x即可。

3. 真机运行TypeError: undefined is not an object (evaluating 'document.createElement')？  
    示例代码中：  

    ```
    io('your websocket path', {
      query: {},
      transports: [ 'websocket', 'polling' ],
      timeout: 5000,
    });
    ```
    不要漏写`transports: [ 'websocket', 'polling' ]`，如果没有指定协议，貌似socket.io会默认走`JSONP Polling`请求，导致报错。