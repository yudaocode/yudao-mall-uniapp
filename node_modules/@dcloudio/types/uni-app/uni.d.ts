declare namespace UniApp {
    interface Uni {
        /**
         * 将 Base64 字符串转成 ArrayBuffer 对象
         *
         * 文档: [http://uniapp.dcloud.io/api/base64ToArrayBuffer?id=base64toarraybuffer](http://uniapp.dcloud.io/api/base64ToArrayBuffer?id=base64toarraybuffer)
         */
        base64ToArrayBuffer(base64: string): ArrayBuffer;
        /**
         * 将 ArrayBuffer 对象转成 Base64 字符串
         *
         * 文档: [http://uniapp.dcloud.io/api/arrayBufferToBase64?id=arraybuffertobase64](http://uniapp.dcloud.io/api/arrayBufferToBase64?id=arraybuffertobase64)
         */
        arrayBufferToBase64(arrayBuffer: ArrayBuffer): string;
        /**
         * 监听自定义事件。事件可以由 uni.$emit 触发。回调函数会接收 uni.$emit 传递的参数。
         *
         * 文档: [http://uniapp.dcloud.io/api/window/communication?id=on](http://uniapp.dcloud.io/api/window/communication?id=on)
         */
        $on(eventName: string, callback: (result: any) => void): void;
        /**
         * 触发自定义事件，附加的参数会传递给事件监听器。
         *
         * 文档: [http://uniapp.dcloud.io/api/window/communication?id=emit](http://uniapp.dcloud.io/api/window/communication?id=emit)
         */
        $emit(eventName: string, param?: any): void;
        /**
         * 监听一个自定义事件。事件只触发一次，在第一次触发之后移除事件监听器。
         *
         * 文档: [http://uniapp.dcloud.io/api/window/communication?id=once](http://uniapp.dcloud.io/api/window/communication?id=once)
         */
        $once(eventName: string, callback: (result: any) => void): void;
        /**
         * 移除自定义事件监听器。如果没有指定事件名，则移除所有事件监听器。如果提供事件名，则移除该事件的所有监听器。如果提供了事件名和回调，则只移除这个回调的监听器。
         *
         * 文档: [http://uniapp.dcloud.io/api/window/communication?id=off](http://uniapp.dcloud.io/api/window/communication?id=off)
         */
        $off(eventName?: string | string [], callback?: (result: any) => void): void;
        /**
         * 通过id 获取 subNVues 原生子窗体的实例
         *
         * 文档: [http://uniapp.dcloud.io/api/window/subNVues?id=app-getsubnvuebyid](http://uniapp.dcloud.io/api/window/subNVues?id=app-getsubnvuebyid)
         */
        getSubNVueById(subNvueId: string): SubNVue;
        /**
         * 获取当前 subNVues 原生子窗体的实例
         *
         * 文档: [http://uniapp.dcloud.io/api/window/subNVues?id=app-getsubnvuebyid](http://uniapp.dcloud.io/api/window/subNVues?id=app-getsubnvuebyid)
         */
        getCurrentSubNVue(): SubNVue;
        /**
         * 发起网络请求
         *
         * 文档: [http://uniapp.dcloud.io/api/request/request?id=request](http://uniapp.dcloud.io/api/request/request?id=request)
         */
        request(options: RequestOptions): RequestTask;
        /**
         * 上传文件
         *
         * 文档: [http://uniapp.dcloud.io/api/request/network-file?id=uploadfile](http://uniapp.dcloud.io/api/request/network-file?id=uploadfile)
         */
        uploadFile(options: UploadFileOption): UploadTask;
        /**
         * 下载文件
         *
         * 文档: [http://uniapp.dcloud.io/api/request/network-file?id=downloadfile](http://uniapp.dcloud.io/api/request/network-file?id=downloadfile)
         */
        downloadFile(options: DownloadFileOption): DownloadTask;
        /**
         * 导入原生插件
         *
         * 文档: [http://uniapp.dcloud.io/api/request/network-file?id=downloadfile](http://uniapp.dcloud.io/api/request/network-file?id=downloadfile)
         */
        requireNativePlugin(moduleName: string): void;
        /**
         * upx 换算为 px
         *
         * 文档: [http://uniapp.dcloud.io/frame?id=upx2px](http://uniapp.dcloud.io/frame?id=upx2px)
         */
        upx2px(upx: number): number;
        /**
         * 配置自签名证书
         *
         * 文档: [http://uniapp.dcloud.io/api/request/request?id=configMTLS](http://uniapp.dcloud.io/api/request/request?id=configMTLS)
         */
        configMTLS(options: ConfigMTLSOptions): void;
        /**
         * 创建一个 WebSocket 连接
         *
         * 文档: [http://uniapp.dcloud.io/api/request/websocket?id=connectsocket](http://uniapp.dcloud.io/api/request/websocket?id=connectsocket)
         */
        connectSocket(options: ConnectSocketOption): SocketTask;
        /**
         * 监听WebSocket连接打开事件
         *
         * 文档: [http://uniapp.dcloud.io/api/request/websocket?id=onsocketopen](http://uniapp.dcloud.io/api/request/websocket?id=onsocketopen)
         */
        onSocketOpen(options: (result: OnSocketOpenCallbackResult) => void): void;
        /**
         * 监听WebSocket错误
         *
         * 文档: [http://uniapp.dcloud.io/api/request/websocket?id=onsocketerror](http://uniapp.dcloud.io/api/request/websocket?id=onsocketerror)
         */
        onSocketError(callback: (result: GeneralCallbackResult) => void): void;
        /**
         * 通过 WebSocket 连接发送数据
         *
         * 文档: [http://uniapp.dcloud.io/api/request/websocket?id=sendsocketmessage](http://uniapp.dcloud.io/api/request/websocket?id=sendsocketmessage)
         */
        sendSocketMessage(options: SendSocketMessageOptions): void;
        /**
         * 监听WebSocket接受到服务器的消息事件
         *
         * 文档: [http://uniapp.dcloud.io/api/request/websocket?id=onsocketmessage](http://uniapp.dcloud.io/api/request/websocket?id=onsocketmessage)
         */
        onSocketMessage(callback: (result: OnSocketMessageCallbackResult) => void): void;
        /**
         * 关闭 WebSocket 连接
         *
         * 文档: [http://uniapp.dcloud.io/api/request/websocket?id=closesocket](http://uniapp.dcloud.io/api/request/websocket?id=closesocket)
         */
        closeSocket(options: CloseSocketOptions): void;
        /**
         * 监听WebSocket关闭
         *
         * 文档: [http://uniapp.dcloud.io/api/request/websocket?id=onsocketclose](http://uniapp.dcloud.io/api/request/websocket?id=onsocketclose)
         */
        onSocketClose(callback: (result: GeneralCallbackResult) => void): void;
        /**
         * 从本地相册选择图片或使用相机拍照
         *
         * 文档: [http://uniapp.dcloud.io/api/media/image?id=chooseimage](http://uniapp.dcloud.io/api/media/image?id=chooseimage)
         */
        chooseImage(options: ChooseImageOptions): void;
        /**
         * 从本地选择文件（仅支持H5）
         *
         * 文档: [http://uniapp.dcloud.io/api/media/file?id=chooseFile](http://uniapp.dcloud.io/api/media/file?id=chooseFile)
         */
        chooseFile(options: ChooseFileOptions): void;
        /**
         * 预览图片
         *
         * 文档: [http://uniapp.dcloud.io/api/media/image?id=previewimage](http://uniapp.dcloud.io/api/media/image?id=previewimage)
         */
        previewImage(options: PreviewImageOptions): void;
        /**
         * 预览图片
         *
         * 文档: [http://uniapp.dcloud.io/api/media/image?id=closepreviewimage](http://uniapp.dcloud.io/api/media/image?id=closepreviewimage)
         */
        closePreviewImage(options: CallBackOptions): void;
        /**
         * 预览图片
         *
         * 文档: [http://uniapp.dcloud.io/api/media/image?id=getimageinfo](http://uniapp.dcloud.io/api/media/image?id=getimageinfo)
         */
        getImageInfo(options: GetImageInfoOptions): void;
        /**
         * 保存图片到系统相册
         *
         * 文档: [http://uniapp.dcloud.io/api/media/image?id=saveimagetophotosalbum](http://uniapp.dcloud.io/api/media/image?id=saveimagetophotosalbum)
         */
        saveImageToPhotosAlbum(options: SaveImageToPhotosAlbumOptions): void;
        /**
         * 压缩图片
         *
         * 文档: [http://uniapp.dcloud.io/api/media/image?id=compressimage](http://uniapp.dcloud.io/api/media/image?id=compressimage)
         */
        compressImage(options: CompressImageOptions): void;
        /**
         * 录音管理
         *
         * 文档: [http://uniapp.dcloud.io/api/media/record-manager?id=getrecordermanager](http://uniapp.dcloud.io/api/media/record-manager?id=getrecordermanager)
         */
        getRecorderManager(): RecorderManager;
        /**
         * 获取全局唯一的背景音频管理器 backgroundAudioManager
         *
         * 文档: [http://uniapp.dcloud.io/api/media/background-audio-manager?id=getbackgroundaudiomanager](http://uniapp.dcloud.io/api/media/background-audio-manager?id=getbackgroundaudiomanager)
         */
        getBackgroundAudioManager(): BackgroundAudioManager;
        /**
         * 创建并返回 audio 上下文 audioContext 对象
         *
         * 文档: [http://uniapp.dcloud.io/api/media/audio-context?id=createinneraudiocontext](http://uniapp.dcloud.io/api/media/audio-context?id=createinneraudiocontext)
         */
        createInnerAudioContext(): InnerAudioContext;
        /**
         * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
         *
         * 文档: [http://uniapp.dcloud.io/api/media/video?id=choosevideo](http://uniapp.dcloud.io/api/media/video?id=choosevideo)
         */
        chooseVideo(options: ChooseVideoOptions): void;
        /**
         * 压缩视频
         *
         * 文档: [http://uniapp.dcloud.io/api/media/video?id=compressvideo](http://uniapp.dcloud.io/api/media/video?id=compressvideo)
         */
        compressVideo(options: CompressVideoOptions): void;
        /**
         * 压缩视频
         *
         * 文档: [http://uniapp.dcloud.io/api/media/video?id=getvideoinfo](http://uniapp.dcloud.io/api/media/video?id=getvideoinfo)
         */
        getVideoInfo(options: GetVideoInfoOptions): void;
        /**
         * 打开视频编辑器
         *
         * 文档: [http://uniapp.dcloud.io/api/media/video?id=openvideoeditor](http://uniapp.dcloud.io/api/media/video?id=openvideoeditor)
         */
        openVideoEditor(options: OpenVideoEditorOptions): void;
        /**
         * 保存视频到系统相册
         *
         * 文档: [http://uniapp.dcloud.io/api/media/video?id=savevideotophotosalbum](http://uniapp.dcloud.io/api/media/video?id=savevideotophotosalbum)
         */
        saveVideoToPhotosAlbum(options: SaveVideoToPhotosAlbumOptions): void;
        /**
         * 创建并返回 video 上下文 videoContext 对象
         *
         * 文档: [http://uniapp.dcloud.io/api/media/video-context?id=createvideocontext](http://uniapp.dcloud.io/api/media/video-context?id=createvideocontext)
         */
        createVideoContext(videoId: string, currentComponent?: any): VideoContext;
        /**
         * 创建并返回 camera 组件的上下文 cameraContext 对象
         *
         * 文档: [http://uniapp.dcloud.io/api/media/camera-context](http://uniapp.dcloud.io/api/media/camera-context)
         */
        createCameraContext(): CameraContext;
        /**
         * 创建 live-pusher 上下文 livePusherContext 对象
         *
         * 文档: [http://uniapp.dcloud.io/api/media/camera-context](http://uniapp.dcloud.io/api/media/camera-context)
         */
        createLivePusherContext(livePusherId: string, currentComponent: any): LivePusherContext;
        /**
         * 保存文件到本地
         *
         * 文档: [http://uniapp.dcloud.io/api/file/file?id=savefile](http://uniapp.dcloud.io/api/file/file?id=savefile)
         */
        saveFile(options: SaveFileOptions): void;
        /**
         * 获取文件信息
         */
        getFileInfo(options: GetFileInfoOptions): void;
        /**
         * 获取本地已保存的文件列表
         *
         * 文档: [http://uniapp.dcloud.io/api/file/file?id=getsavedfilelist](http://uniapp.dcloud.io/api/file/file?id=getsavedfilelist)
         */
        getSavedFileList(options: GetSavedFileListOptions): void;
        /**
         * 获取本地文件的文件信息
         *
         * 文档: [http://uniapp.dcloud.io/api/file/file?id=getsavedfileinfo](http://uniapp.dcloud.io/api/file/file?id=getsavedfileinfo)
         */
        getSavedFileInfo(options: GetSavedFileInfoOptions): void;
        /**
         * 删除本地存储的文件
         *
         * 文档: [http://uniapp.dcloud.io/api/file/file?id=removesavedfile](http://uniapp.dcloud.io/api/file/file?id=removesavedfile)
         */
        removeSavedFile(options: RemoveSavedFileOptions): void;
        /**
         * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
         *
         * 文档: [http://uniapp.dcloud.io/api/file/file?id=opendocument](http://uniapp.dcloud.io/api/file/file?id=opendocument)
         */
        openDocument(options: OpenDocumentOptions): void;
        /**
         * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口
         *
         * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=setstorage](http://uniapp.dcloud.io/api/storage/storage?id=setstorage)
         */
        setStorage(options: SetStorageOptions): void;
        /**
         * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
         *
         * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=setstoragesync](http://uniapp.dcloud.io/api/storage/storage?id=setstoragesync)
         */
        setStorageSync(key: string, value: any): void;
        /**
         * 自定义统计上报数据
         *
         * 文档: [http://uniapp.dcloud.io/api/other/report?id=统计](http://uniapp.dcloud.io/api/other/report?id=统计)
         */
        report(eventName: string, options: any): void;
        /**
         * 从本地缓存中异步获取指定 key 对应的内容
         *
         * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=getstorage](http://uniapp.dcloud.io/api/storage/storage?id=getstorage)
         */
        getStorage(options: GetStorageOptions): void;
        /**
         * 从本地缓存中同步获取指定 key 对应的内容
         *
         * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=getstoragesync](http://uniapp.dcloud.io/api/storage/storage?id=getstoragesync)
         */
        getStorageSync(key: string): any;
        /**
         * 异步获取当前 storage 的相关信息
         *
         * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=getstorageinfo](http://uniapp.dcloud.io/api/storage/storage?id=getstorageinfo)
         */
        getStorageInfo(options: GetStorageInfoOptions): void;
        /**
         * 同步获取当前 storage 的相关信息
         *
         * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=getstorageinfosync](http://uniapp.dcloud.io/api/storage/storage?id=getstorageinfosync)
         */
        getStorageInfoSync(): GetStorageInfoSuccess;
        /**
         * 从本地缓存中异步移除指定 key
         *
         * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=removestorage](http://uniapp.dcloud.io/api/storage/storage?id=removestorage)
         */
        removeStorage(options: RemoveStorageOptions): void;
        /**
         * 从本地缓存中同步移除指定 key
         *
         * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=removestoragesync](http://uniapp.dcloud.io/api/storage/storage?id=removestoragesync)
         */
        removeStorageSync(key: string): void;
        /**
         * 清理本地数据缓存
         *
         * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=clearstorage](http://uniapp.dcloud.io/api/storage/storage?id=clearstorage)
         */
        clearStorage(): void;
        /**
         * 同步清理本地数据缓存
         *
         * 文档: [http://uniapp.dcloud.io/api/storage/storage?id=clearstoragesync](http://uniapp.dcloud.io/api/storage/storage?id=clearstoragesync)
         */
        clearStorageSync(): void;
        /**
         * 获取当前的地理位置、速度
         *
         * 文档: [http://uniapp.dcloud.io/api/location/location?id=getlocation](http://uniapp.dcloud.io/api/location/location?id=getlocation)
         */
        getLocation(options: GetLocationOptions): void;
        /**
         * 打开地图选择位置。
         *
         * 文档: [http://uniapp.dcloud.io/api/location/location?id=chooselocation](http://uniapp.dcloud.io/api/location/location?id=chooselocation)
         */
        chooseLocation(options: ChooseLocationOptions): void;
        /**
         * 使用地图查看位置
         *
         * 文档: [http://uniapp.dcloud.io/api/location/open-location?id=openlocation](http://uniapp.dcloud.io/api/location/open-location?id=openlocation)
         */
        openLocation(options: OpenLocationOptions): void;
        /**
         * 创建并返回 map 上下文 mapContext 对象
         *
         * 文档: [http://uniapp.dcloud.io/api/location/map?id=createmapcontext](http://uniapp.dcloud.io/api/location/map?id=createmapcontext)
         */
        createMapContext(mapId: string, currentComponent?: any): MapContext;
        /**
         * 异步获取系统信息
         *
         * 文档: [http://uniapp.dcloud.io/api/system/info?id=getsysteminfo](http://uniapp.dcloud.io/api/system/info?id=getsysteminfo)
         */
        getSystemInfo(options: GetSystemInfoOptions): void;
        /**
         * 同步获取系统信息
         *
         * 文档: [http://uniapp.dcloud.io/api/system/info?id=getsysteminfosync](http://uniapp.dcloud.io/api/system/info?id=getsysteminfosync)
         */
        getSystemInfoSync(): GetSystemInfoResult;
        /**
         * 同步获取窗口信息
         *
         * 文档: [http://uniapp.dcloud.io/api/system/info?id=getwindowinfo](http://uniapp.dcloud.io/api/system/info?id=getwindowinfo)
         */
        getWindowInfo(): GetWindowInfoResult;
        /**
         * 同步获取设备基础信息
         *
         * 文档: [http://uniapp.dcloud.io/api/system/info?id=getdeviceinfo](http://uniapp.dcloud.io/api/system/info?id=getdeviceinfo)
         */
        getDeviceInfo(): GetDeviceInfoResult;
        /**
         * 同步获取设备基础信息
         *
         * 文档: [http://uniapp.dcloud.io/api/system/info?id=getappbaseinfo](http://uniapp.dcloud.io/api/system/info?id=getappbaseinfo)
         */
        getAppBaseInfo(): GetAppBaseInfoResult;
        /**
         * 判断uni-app的API，回调，参数，组件等是否在当前版本可用
         *
         * 文档: [http://uniapp.dcloud.io/api/system/info?id=caniuse](http://uniapp.dcloud.io/api/system/info?id=caniuse)
         */
        canIUse(options: string): boolean;
        /**
         * 获取网络类型
         *
         * 文档: [http://uniapp.dcloud.io/api/system/network?id=getnetworktype](http://uniapp.dcloud.io/api/system/network?id=getnetworktype)
         */
        getNetworkType(options: GetNetworkTypeOptions): void;
        /**
         * 监听网络状态变化
         *
         * 文档: [http://uniapp.dcloud.io/api/system/network?id=onnetworkstatuschange](http://uniapp.dcloud.io/api/system/network?id=onnetworkstatuschange)
         */
        onNetworkStatusChange(callback: (result: OnNetworkStatusChangeSuccess) => void): void;
        /**
         * 取消监听网络状态变化
         *
         * 文档: [http://uniapp.dcloud.io/api/system/compass?id=offnetworkstatuschange](http://uniapp.dcloud.io/api/system/compass?id=offnetworkstatuschange)
         */
        offNetworkStatusChange(callback: (result: any) => void): void;
        /**
         * 监听加速度数据
         *
         * 文档: [http://uniapp.dcloud.io/api/system/accelerometer?id=onaccelerometerchange](http://uniapp.dcloud.io/api/system/accelerometer?id=onaccelerometerchange)
         */
        onAccelerometerChange(callback: (result: OnAccelerometerChangeSuccess) => void): void;
        /**
         * 取消监听加速度数据
         *
         * 文档: [http://uniapp.dcloud.io/api/system/accelerometer?id=offaccelerometerchange](http://uniapp.dcloud.io/api/system/accelerometer?id=offaccelerometerchange)
         */
        offAccelerometerChange(callback: (result: any) => void): void;
        /**
         * 开始监听加速度数据
         *
         * 文档: [http://uniapp.dcloud.io/api/system/accelerometer?id=startaccelerometer](http://uniapp.dcloud.io/api/system/accelerometer?id=startaccelerometer)
         */
        startAccelerometer(options?: StartAccelerometerOptions): void;
        /**
         * 停止监听加速度数据
         *
         * 文档: [http://uniapp.dcloud.io/api/system/accelerometer?id=stopaccelerometer](http://uniapp.dcloud.io/api/system/accelerometer?id=stopaccelerometer)
         */
        stopAccelerometer(options?: StopAccelerometerOptions): void;
        /**
         * 监听罗盘数据
         *
         * 文档: [http://uniapp.dcloud.io/api/system/compass?id=oncompasschange](http://uniapp.dcloud.io/api/system/compass?id=oncompasschange)
         */
        onCompassChange(callback: (result: OnCompassChangeSuccess) => void): void;
        /**
         * 取消监听罗盘数据
         *
         * 文档: [http://uniapp.dcloud.io/api/system/compass?id=offcompasschange](http://uniapp.dcloud.io/api/system/compass?id=offcompasschange)
         */
        offCompassChange(callback: (result: any) => void): void;
        /**
         * 开始监听罗盘数据
         *
         * 文档: [http://uniapp.dcloud.io/api/system/compass?id=startcompass](http://uniapp.dcloud.io/api/system/compass?id=startcompass)
         */
        startCompass(options?: StartCompassOptions): void;
        /**
         * 停止监听罗盘数据
         *
         * 文档: [http://uniapp.dcloud.io/api/system/compass?id=stopcompass](http://uniapp.dcloud.io/api/system/compass?id=stopcompass)
         */
        stopCompass(options?: StopCompassOptions): void;
        /**
         * 拨打电话
         *
         * 文档: [http://uniapp.dcloud.io/api/system/phone?id=makephonecall](http://uniapp.dcloud.io/api/system/phone?id=makephonecall)
         */
        makePhoneCall(options: MakePhoneCallOptions): void;
        /**
         * 调用扫码界面，扫码成功后返回对应的结果
         *
         * 文档: [http://uniapp.dcloud.io/api/system/barcode?id=scancode](http://uniapp.dcloud.io/api/system/barcode?id=scancode)
         */
        scanCode(options: ScanCodeOptions): void;
        /**
         * 设置系统剪贴板的内容
         *
         * 文档: [http://uniapp.dcloud.io/api/system/clipboard?id=setclipboarddata](http://uniapp.dcloud.io/api/system/clipboard?id=setclipboarddata)
         */
        setClipboardData(options: SetClipboardDataOptions): void;
        /**
         * 获得系统剪贴板的内容
         *
         * 文档: [http://uniapp.dcloud.io/api/system/clipboard?id=getclipboarddata](http://uniapp.dcloud.io/api/system/clipboard?id=getclipboarddata)
         */
        getClipboardData(options: GetClipboardDataOptions): void;
        /**
         * 弹出软键盘
         *
         * 文档: [http://uniapp.dcloud.io/api/key?id=showkeyboard](http://uniapp.dcloud.io/api/key?id=showkeyboard)
         */
        showKeyboard(): void;
        /**
         * 隐藏软键盘
         *
         * 文档: [http://uniapp.dcloud.io/api/key?id=hidekeyboard](http://uniapp.dcloud.io/api/key?id=hidekeyboard)
         */
        hideKeyboard(): void;
        /**
         * 监听键盘高度变化
         *
         * 文档: [http://uniapp.dcloud.io/api/key?id=onkeyboardheightchange](http://uniapp.dcloud.io/api/key?id=onkeyboardheightchange)
         */
        onKeyboardHeightChange(callback: (result: OnKeyboardHeightChangeResult) => void): void;
        /**
         * 取消监听键盘高度变化事件
         *
         * 文档: [http://uniapp.dcloud.io/api/key?id=offkeyboardheightchange](http://uniapp.dcloud.io/api/key?id=offkeyboardheightchange)
         */
        offKeyboardHeightChange(callback?: (result: any) => void): void;
        /**
         * 获取输入框的光标位置
         *
         * 文档: [http://uniapp.dcloud.io/api/key?id=getselectedtextrange](http://uniapp.dcloud.io/api/key?id=getselectedtextrange)
         */
        getSelectedTextRange(options: GetSelectedTextRangeOptions): void;
        /**
         * 设置屏幕亮度
         *
         * 文档: [http://uniapp.dcloud.io/api/system/brightness?id=setscreenbrightness](http://uniapp.dcloud.io/api/system/brightness?id=setscreenbrightness)
         */
        setScreenBrightness(options: SetScreenBrightnessOptions): void;
        /**
         * 获取屏幕亮度
         *
         * 文档: [http://uniapp.dcloud.io/api/system/brightness?id=getscreenbrightness](http://uniapp.dcloud.io/api/system/brightness?id=getscreenbrightness)
         */
        getScreenBrightness(options: GetScreenBrightnessOptions): void;
        /**
         * 设置是否保持常亮状态
         *
         * 文档: [http://uniapp.dcloud.io/api/system/brightness?id=setkeepscreenon](http://uniapp.dcloud.io/api/system/brightness?id=setkeepscreenon)
         */
        setKeepScreenOn(options: SetKeepScreenOnOptions): void;
        /**
         * 使手机发生较长时间的振动（400ms）
         *
         * 文档: [http://uniapp.dcloud.io/api/system/vibrate?id=vibratelong](http://uniapp.dcloud.io/api/system/vibrate?id=vibratelong)
         */
        vibrateLong(options: VibrateLongOptions): void;
        /**
         * 使手机发生较短时间的振动（15ms）
         *
         * 文档: [http://uniapp.dcloud.io/api/system/vibrate?id=vibrateshort](http://uniapp.dcloud.io/api/system/vibrate?id=vibrateshort)
         */
        vibrateShort(options: VibrateShortOptions): void;
        /**
         * 手机通讯录联系人和联系方式的增加
         *
         * 文档: [http://uniapp.dcloud.io/api/system/contact?id=addphonecontact](http://uniapp.dcloud.io/api/system/contact?id=addphonecontact)
         */
        addPhoneContact(options: AddPhoneContactOptions): void;
        /**
         * 获取已搜索到的iBeacon设备
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ibeacon?id=getbeacons](http://uniapp.dcloud.io/api/system/ibeacon?id=getbeacons)
         */
        getBeacons(options: GetBeaconsOptions): void;
        /**
         * 开始搜索附近的iBeacon设备
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ibeacon?id=startbeacondiscovery](http://uniapp.dcloud.io/api/system/ibeacon?id=startbeacondiscovery)
         */
        startBeaconDiscovery(options: StartBeaconDiscoveryOptions): void;
        /**
         * 停止搜索附近的iBeacon设备
         *
         * 文档: [http://uniapp.dcloud.io//api/system/ibeacon?id=stopbeacondiscovery](http://uniapp.dcloud.io//api/system/ibeacon?id=stopbeacondiscovery)
         */
        stopBeaconDiscovery(options: StopBeaconDiscoveryOptions): void;
        /**
         * 监听iBeacon设备更新
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ibeacon?id=onbeaconupdate](http://uniapp.dcloud.io/api/system/ibeacon?id=onbeaconupdate)
         */
        onBeaconUpdate(callback: (result: GetBeaconsRes) => void): void;
        /**
         * 监听iBeacon服务状态变化
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ibeacon?id=onbeaconservicechange](http://uniapp.dcloud.io/api/system/ibeacon?id=onbeaconservicechange)
         */
        onBeaconServiceChange(callback: (result: BeaconService) => void): void;
        /**
         * 关闭蓝牙模块
         *
         * 文档: [http://uniapp.dcloud.io/api/system/bluetooth?id=closebluetoothadapter](http://uniapp.dcloud.io/api/system/bluetooth?id=closebluetoothadapter)
         */
        closeBluetoothAdapter(options: CloseBluetoothAdapterOptions): void;
        /**
         * 获取本机蓝牙适配器状态
         *
         * 文档: [http://uniapp.dcloud.io/api/system/bluetooth?id=getbluetoothadapterstate](http://uniapp.dcloud.io/api/system/bluetooth?id=getbluetoothadapterstate)
         */
        getBluetoothAdapterState(options: GetBluetoothAdapterStateOptions): void;
        /**
         * 获取已搜索到的蓝牙设备
         *
         * 文档: [http://uniapp.dcloud.io/api/system/bluetooth?id=getbluetoothdevices](http://uniapp.dcloud.io/api/system/bluetooth?id=getbluetoothdevices)
         */
        getBluetoothDevices(options: GetBluetoothDevicesOptions): void;
        /**
         * 根据uuid获取处于已连接的设备
         *
         * 文档: [http://uniapp.dcloud.io/api/system/bluetooth?id=getconnectedbluetoothdevices](http://uniapp.dcloud.io/api/system/bluetooth?id=getconnectedbluetoothdevices)
         */
        getConnectedBluetoothDevices(options: GetConnectedBluetoothDevicesOptions): void;
        /**
         * 监听蓝牙适配器状态变化事件
         *
         * 文档: [http://uniapp.dcloud.io/api/system/bluetooth?id=onbluetoothadapterstatechange](http://uniapp.dcloud.io/api/system/bluetooth?id=onbluetoothadapterstatechange)
         */
        onBluetoothAdapterStateChange(callback: (result: OnBluetoothAdapterStateChangeResult) => void): void;
        /**
         * 监听搜索到新设备的事件
         *
         * 文档: [http://uniapp.dcloud.io/api/system/bluetooth?id=onbluetoothdevicefound](http://uniapp.dcloud.io/api/system/bluetooth?id=onbluetoothdevicefound)
         */
        onBluetoothDeviceFound(callback: (result: OnBluetoothDeviceFoundResult) => void): void;
        /**
         * 初始化蓝牙模块
         *
         * 文档: [http://uniapp.dcloud.io/api/system/bluetooth?id=openbluetoothadapter](http://uniapp.dcloud.io/api/system/bluetooth?id=openbluetoothadapter)
         */
        openBluetoothAdapter(options: OpenBluetoothAdapterOptions): void;
        /**
         * 开始搜索附近的蓝牙设备
         *
         * 文档: [http://uniapp.dcloud.io/api/system/bluetooth?id=startbluetoothdevicesdiscovery](http://uniapp.dcloud.io/api/system/bluetooth?id=startbluetoothdevicesdiscovery)
         */
        startBluetoothDevicesDiscovery(options: StartBluetoothDevicesDiscoveryOptions): void;
        /**
         * 停止搜寻附近的蓝牙外围设备
         *
         * 文档: [http://uniapp.dcloud.io/api/system/bluetooth?id=stopbluetoothdevicesdiscovery](http://uniapp.dcloud.io/api/system/bluetooth?id=stopbluetoothdevicesdiscovery)
         */
        stopBluetoothDevicesDiscovery(options: StopBluetoothDevicesDiscoveryOptions): void;
        /**
         * 断开与低功耗蓝牙设备的连接
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ble?id=closebleconnection](http://uniapp.dcloud.io/api/system/ble?id=closebleconnection)
         */
        closeBLEConnection(options: CloseBLEConnectionOptions): void;
        /**
         * 连接低功耗蓝牙设备
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ble?id=createbleconnection](http://uniapp.dcloud.io/api/system/ble?id=createbleconnection)
         */
        createBLEConnection(options: CreateBLEConnectionOptions): void;
        /**
         * 获取蓝牙设备指定服务中所有特征值
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ble?id=getbledevicecharacteristics](http://uniapp.dcloud.io/api/system/ble?id=getbledevicecharacteristics)
         */
        getBLEDeviceCharacteristics(options: GetBLEDeviceCharacteristicsOptions): void;
        /**
         * 获取蓝牙设备的所有服务
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ble?id=getbledeviceservices](http://uniapp.dcloud.io/api/system/ble?id=getbledeviceservices)
         */
        getBLEDeviceServices(options: GetBLEDeviceServicesOptions): void;
        /**
         * 启用低功耗蓝牙设备特征值变化时的notify功能，订阅特征值
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ble?id=notifyblecharacteristicvaluechange](http://uniapp.dcloud.io/api/system/ble?id=notifyblecharacteristicvaluechange)
         */
        notifyBLECharacteristicValueChange(options: NotifyBLECharacteristicValueChangeOptions): void;
        /**
         * 监听低功耗蓝牙设备的特征值变化事件
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ble?id=onblecharacteristicvaluechange](http://uniapp.dcloud.io/api/system/ble?id=onblecharacteristicvaluechange)
         */
        onBLECharacteristicValueChange(callback: (result: OnBLECharacteristicValueChangeSuccess) => void): void;
        /**
         * 监听低功耗蓝牙设备连接状态变化事件
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ble?id=onbleconnectionstatechange](http://uniapp.dcloud.io/api/system/ble?id=onbleconnectionstatechange)
         */
        onBLEConnectionStateChange(callback: (result: OnBLEConnectionStateChangeSuccess) => void): void;
        /**
         * 读取低功耗蓝牙设备指定特征值的二进制数据值
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ble?id=readblecharacteristicvalue](http://uniapp.dcloud.io/api/system/ble?id=readblecharacteristicvalue)
         */
        readBLECharacteristicValue(options: ReadBLECharacteristicValueOptions): void;
        /**
         * 向低功耗蓝牙设备指定特征值写入二进制数据
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ble?id=writeblecharacteristicvalue](http://uniapp.dcloud.io/api/system/ble?id=writeblecharacteristicvalue)
         */
        writeBLECharacteristicValue(options: WriteBLECharacteristicValueOptions): void;
        /**
         * 设置蓝牙最大传输单元。需在 uni.createBLEConnection调用成功后调用，mtu 设置范围 (22,512)。安卓5.1以上有效。
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ble?id=setBLEMTU](http://uniapp.dcloud.io/api/system/ble?id=setBLEMTU)
         */
        setBLEMTU(options: SetBLEMTUOptions): void;
        /**
         * 获取蓝牙设备的信号强度。
         *
         * 文档: [http://uniapp.dcloud.io/api/system/ble?id=getBLEDeviceRSSI](http://uniapp.dcloud.io/api/system/ble?id=getBLEDeviceRSSI)
         */
        getBLEDeviceRSSI(options: GetBLEDeviceRSSIOptions): void;
        /**
         * 显示消息提示框
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=showtoast](http://uniapp.dcloud.io/api/ui/prompt?id=showtoast)
         */
        showToast(options: ShowToastOptions): void;
        /**
         * 显示 loading 提示框
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=showloading](http://uniapp.dcloud.io/api/ui/prompt?id=showloading)
         */
        showLoading(options: ShowLoadingOptions): void;
        /**
         * 隐藏消息提示框
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=hidetoast](http://uniapp.dcloud.io/api/ui/prompt?id=hidetoast)
         */
        hideToast(): void;
        /**
         * 隐藏 loading 提示框
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=hideloading](http://uniapp.dcloud.io/api/ui/prompt?id=hideloading)
         */
        hideLoading(): void;
        /**
         * 显示模态弹窗
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=showmodal](http://uniapp.dcloud.io/api/ui/prompt?id=showmodal)
         */
        showModal(options: ShowModalOptions): void;
        /**
         * 显示操作菜单
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=showactionsheet](http://uniapp.dcloud.io/api/ui/prompt?id=showactionsheet)
         */
        showActionSheet(options: ShowActionSheetOptions): void;
        /**
         * 动态设置当前页面的标题
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbartitle](http://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbartitle)
         */
        setNavigationBarTitle(options: SetNavigationBarTitleOptions): void;
        /**
         * 在当前页面显示导航条加载动画
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/navigationbar?id=shownavigationbarloading](http://uniapp.dcloud.io/api/ui/navigationbar?id=shownavigationbarloading)
         */
        showNavigationBarLoading(): void;
        /**
         * 隐藏导航条加载动画
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/navigationbar?id=hidenavigationbarloading](http://uniapp.dcloud.io/api/ui/navigationbar?id=hidenavigationbarloading)
         */
        hideNavigationBarLoading(): void;
        /**
         * 隐藏返回首页按钮
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/navigationbar?id=hidehomebutton](http://uniapp.dcloud.io/api/ui/navigationbar?id=hidehomebutton)
         */
        hideHomeButton(): void;
        /**
         * 设置导航条颜色
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbarcolor](http://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbarcolor)
         */
        setNavigationBarColor(options: SetNavigationbarColorOptions): void;
        /**
         * 动态设置 tabBar 某一项的内容
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=settabbaritem](http://uniapp.dcloud.io/api/ui/tabbar?id=settabbaritem)
         */
        setTabBarItem(options: SetTabBarItemOptions): void;
        /**
         * 动态设置 tabBar 的整体样式
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=settabbarstyle](http://uniapp.dcloud.io/api/ui/tabbar?id=settabbarstyle)
         */
        setTabBarStyle(options: SetTabBarStyleOptions): void;
        /**
         * 隐藏 tabBar
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbar](http://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbar)
         */
        hideTabBar(options?: HideTabBarOptions): void;
        /**
         * 显示 tabBar
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=showtabbar](http://uniapp.dcloud.io/api/ui/tabbar?id=showtabbar)
         */
        showTabBar(options?: ShowTabBarOptions): void;
        /**
         * 为 tabBar 某一项的右上角添加文本
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=settabbarbadge](http://uniapp.dcloud.io/api/ui/tabbar?id=settabbarbadge)
         */
        setTabBarBadge(options: SetTabBarBadgeOptions): void;
        /**
         * 移除 tabBar 某一项右上角的文本
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=removetabbarbadge](http://uniapp.dcloud.io/api/ui/tabbar?id=removetabbarbadge)
         */
        removeTabBarBadge(options: RemoveTabBarBadgeOptions): void;
        /**
         * 显示 tabBar 某一项的右上角的红点
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=showtabbarreddot](http://uniapp.dcloud.io/api/ui/tabbar?id=showtabbarreddot)
         */
        showTabBarRedDot(options: ShowTabBarRedDotOptions): void;
        /**
         * 隐藏 tabBar 某一项的右上角的红点
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbarreddot](http://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbarreddot)
         */
        hideTabBarRedDot(options: HideTabBarRedDotOptions): void;
        /**
         * 监听中间按钮的点击事件
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/tabbar?id=ontabbarmidbuttontap](http://uniapp.dcloud.io/api/ui/tabbar?id=ontabbarmidbuttontap)
         */
        onTabBarMidButtonTap(callback: (result: any) => void): void;
        /**
         * 保留当前页面，跳转到应用内的某个页面
         *
         * 文档: [http://uniapp.dcloud.io/api/router?id=navigateto](http://uniapp.dcloud.io/api/router?id=navigateto)
         */
        navigateTo(options: NavigateToOptions): void;
        /**
         * 关闭当前页面，跳转到应用内的某个页面
         *
         * 文档: [http://uniapp.dcloud.io/api/router?id=redirectto](http://uniapp.dcloud.io/api/router?id=redirectto)
         */
        redirectTo(options: RedirectToOptions): void;
        /**
         * 关闭所有页面，打开到应用内的某个页面
         *
         * 文档: [http://uniapp.dcloud.io/api/router?id=relaunch](http://uniapp.dcloud.io/api/router?id=relaunch)
         */
        reLaunch(options: ReLaunchOptions): void;
        /**
         * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
         *
         * 文档: [http://uniapp.dcloud.io/api/router?id=switchtab](http://uniapp.dcloud.io/api/router?id=switchtab)
         */
        switchTab(options: SwitchTabOptions): void;
        /**
         * 关闭当前页面，返回上一页面或多级页面
         *
         * 文档: [http://uniapp.dcloud.io/api/router?id=navigateback](http://uniapp.dcloud.io/api/router?id=navigateback)
         */
        navigateBack(options: NavigateBackOptions): void;
        /**
         * 预加载页面
         *
         * 文档: [http://uniapp.dcloud.io/api/preload-page?id=preloadpage](http://uniapp.dcloud.io/api/preload-page?id=preloadpage)
         */
        preloadPage(options: PreloadPageOptions): void;
        /**
         * 取消页面预加载
         *
         * 文档: [http://uniapp.dcloud.io/api/preload-page?id=unpreloadpage](http://uniapp.dcloud.io/api/preload-page?id=unpreloadpage)
         */
        unPreloadPage(options: UnPreloadPageOptions): void;
        /**
         * 创建一个动画实例
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/animation?id=createanimation](http://uniapp.dcloud.io/api/ui/animation?id=createanimation)
         */
        createAnimation(options?: CreateAnimationOptions): Animation;
        /**
         * 将页面滚动到目标位置
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/scroll?id=pagescrollto](http://uniapp.dcloud.io/api/ui/scroll?id=pagescrollto)
         */
        pageScrollTo(options: PageScrollToOptions): void;
        /**
         * 开始下拉刷新
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/pulldown?id=startpulldownrefresh](http://uniapp.dcloud.io/api/ui/pulldown?id=startpulldownrefresh)
         */
        startPullDownRefresh(options: StartPullDownRefreshOptions): void;
        /**
         * 停止当前页面下拉刷新
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/pulldown?id=stoppulldownrefresh](http://uniapp.dcloud.io/api/ui/pulldown?id=stoppulldownrefresh)
         */
        stopPullDownRefresh(): void;
        /**
         * 返回一个SelectorQuery对象实例
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/nodes-info?id=createselectorquery](http://uniapp.dcloud.io/api/ui/nodes-info?id=createselectorquery)
         */
        createSelectorQuery(): SelectorQuery;
        /**
         * 创建并返回一个 IntersectionObserver 对象实例
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/intersection-observer?id=createintersectionobserver](http://uniapp.dcloud.io/api/ui/intersection-observer?id=createintersectionobserver)
         */
        createIntersectionObserver(component: any, options?: CreateIntersectionObserverOptions): IntersectionObserver;
        /**
         * 创建并返回一个 MediaQueryObserver 对象实例。context: 自定义组件实例。小程序端不支持此参数，传入仅为抹平写法差异
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/media-query-observer?id=createmediaqueryobserver](http://uniapp.dcloud.io/api/ui/media-query-observer?id=createmediaqueryobserver)
         */
        createMediaQueryObserver(context?: any): MediaQueryObserver;
        /**
         * 获取本次启动时的参数。返回值与App.onLaunch的回调参数一致
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/getLaunchOptionsSync](http://uniapp.dcloud.io/api/plugins/getLaunchOptionsSync)
         */
        getLaunchOptionsSync(): GetLaunchOptionsSyncOptions;
        /**
         * 获取本次启动时的参数。返回值与App.onLaunch的回调参数一致
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/getEnterOptionsSync](http://uniapp.dcloud.io/api/plugins/getEnterOptionsSync)
         */
        getEnterOptionsSync(): GetLaunchOptionsSyncOptions;
        /**
         * 创建 canvas 绘图上下文
         *
         * 文档: [http://uniapp.dcloud.io/api/canvas/createCanvasContext?id=createcanvascontext](http://uniapp.dcloud.io/api/canvas/createCanvasContext?id=createcanvascontext)
         */
        createCanvasContext(canvasId: string, componentInstance?: any): CanvasContext;
        /**
         * 把当前画布指定区域的内容导出生成指定大小的图片
         *
         * 文档: [http://uniapp.dcloud.io/api/canvas/canvasToTempFilePath?id=canvastotempfilepath](http://uniapp.dcloud.io/api/canvas/canvasToTempFilePath?id=canvastotempfilepath)
         */
        canvasToTempFilePath(options: CanvasToTempFilePathOptions, componentInstance?: any): void;
        /**
         * 描述 canvas 区域隐含的像素数据
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/canvas?id=canvasgetimagedata](http://uniapp.dcloud.io/api/ui/canvas?id=canvasgetimagedata)
         */
        canvasGetImageData(options: CanvasGetImageDataOptions): void;
        /**
         * 将像素数据绘制到画布
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/canvas?id=canvasputimagedata](http://uniapp.dcloud.io/api/ui/canvas?id=canvasputimagedata)
         */
        canvasPutImageData(options: CanvasPutImageDataOptions): void;
        /**
         * 监听窗口尺寸变化事件
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/window?id=onwindowresize](http://uniapp.dcloud.io/api/ui/window?id=onwindowresize)
         */
        onWindowResize(callback: (result: WindowResizeResult) => void): void;
        /**
         * 取消监听窗口尺寸变化事件
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/window?id=offwindowresize](http://uniapp.dcloud.io/api/ui/window?id=offwindowresize)
         */
        offWindowResize(callback: (result: any) => void): void;
        /**
         * 显示 topWindow 窗体
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/adapt?id=showTopWindow](http://uniapp.dcloud.io/api/ui/adapt?id=showTopWindow)
         */
        showTopWindow(options: CommonOptions): void;
        /**
         * 隐藏 topWindow 窗体
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/adapt?id=hideTopWindow](http://uniapp.dcloud.io/api/ui/adapt?id=hideTopWindow)
         */
        hideTopWindow(options: CommonOptions): void;
        /**
         * 显示 leftWindow 窗体
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/adapt?id=showLeftWindow](http://uniapp.dcloud.io/api/ui/adapt?id=showLeftWindow)
         */
        showLeftWindow(options: CommonOptions): void;
        /**
         * 隐藏 leftWindow 窗体
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/adapt?id=hideLeftWindow](http://uniapp.dcloud.io/api/ui/adapt?id=hideLeftWindow)
         */
        hideLeftWindow(options: CommonOptions): void;
        /**
         * 显示 rightWindow 窗体
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/adapt?id=showRightWindow](http://uniapp.dcloud.io/api/ui/adapt?id=showRightWindow)
         */
        showRightWindow(options: CommonOptions): void;
        /**
         * 隐藏 rightWindow 窗体
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/adapt?id=hideRightWindow](http://uniapp.dcloud.io/api/ui/adapt?id=hideRightWindow)
         */
        hideRightWindow(options: CommonOptions): void;
        /**
         * 获取leftWindow窗体样式
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/adapt?id=getLeftWindowStyle](http://uniapp.dcloud.io/api/ui/adapt?id=getLeftWindowStyle)
         */
        getLeftWindowStyle(): any;
        /**
         * 获取rightWindow窗体样式
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/adapt?id=getRightWindowStyle](http://uniapp.dcloud.io/api/ui/adapt?id=getRightWindowStyle)
         */
        getRightWindowStyle(): any;
        /**
         * 获取topWindow窗体样式
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/adapt?id=getTopWindowStyle](http://uniapp.dcloud.io/api/ui/adapt?id=getTopWindowStyle)
         */
        getTopWindowStyle(): any;
        /**
         * 设置leftWindow窗体样式
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/adapt?id=setLeftWindowStyle](http://uniapp.dcloud.io/api/ui/adapt?id=setLeftWindowStyle)
         */
        setLeftWindowStyle(options: any): void;
        /**
         * 设置rightWindow窗体样式
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/adapt?id=setRightWindowStyle](http://uniapp.dcloud.io/api/ui/adapt?id=setRightWindowStyle)
         */
        setRightWindowStyle(options: any): void;
        /**
         * 设置topWindow窗体样式
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/adapt?id=setTopWindowStyle](http://uniapp.dcloud.io/api/ui/adapt?id=setTopWindowStyle)
         */
        setTopWindowStyle(options: any): void;
        /**
         * 获取服务供应商
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/provider?id=getprovider](http://uniapp.dcloud.io/api/plugins/provider?id=getprovider)
         */
        getProvider(options: GetProviderOptions): void;
        /**
         * 登录
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/login?id=login](http://uniapp.dcloud.io/api/plugins/login?id=login)
         */
        login(options: LoginOptions): void;
        /**
         * 登录
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/login?id=unichecksession](http://uniapp.dcloud.io/api/plugins/login?id=unichecksession)
         */
        checkSession(options: CheckSessionOptions): void;
        /**
         * 获取用户信息
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/login?id=getuserinfo](http://uniapp.dcloud.io/api/plugins/login?id=getuserinfo)
         */
        getUserInfo(options: GetUserInfoOptions): void;
        /**
         * 获取用户信息
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/login?id=getUserProfile](http://uniapp.dcloud.io/api/plugins/login?id=getUserProfile)
         */
        getUserProfile(options: GetUserProfileOptions): void;
        /**
         * 预登录
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/login?id=prelogin](http://uniapp.dcloud.io/api/plugins/login?id=prelogin)
         */
        preLogin(options: PreLoginOptions): void;
        /**
         * 关闭一键登陆页面
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/login?id=closeauthview](http://uniapp.dcloud.io/api/plugins/login?id=closeauthview)
         */
        closeAuthView(): void;
        /**
         * 获取一键登录条款勾选框状态
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/login?id=getCheckBoxState](http://uniapp.dcloud.io/api/plugins/login?id=getCheckBoxState)
         */
        getCheckBoxState(options: GetCheckBoxStateOptions): void;
        /**
         * 获取全局唯一的一键登录管理器 UniverifyManager
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/login?id=getUniverifyManager](http://uniapp.dcloud.io/api/plugins/login?id=getUniverifyManager)
         */
        getUniverifyManager(): UniverifyManager;
        /**
         * 分享
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/share?id=share](http://uniapp.dcloud.io/api/plugins/share?id=share)
         */
        share(options: ShareOptions): void;
        /**
         * 调用系统分享
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/share?id=sharewithsystem](http://uniapp.dcloud.io/api/plugins/share?id=sharewithsystem)
         */
        shareWithSystem(options: ShareWithSystemOptions): void;
        /**
         * 支付
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/payment?id=requestpayment](http://uniapp.dcloud.io/api/plugins/payment?id=requestpayment)
         */
        requestPayment(options: RequestPaymentOptions): void;
        /**
         * 提前向用户发起授权请求
         *
         * 文档: [http://uniapp.dcloud.io/api/other/authorize?id=authorize](http://uniapp.dcloud.io/api/other/authorize?id=authorize)
         */
        authorize(options: AuthorizeOptions): void;
        /**
         * 调起客户端小程序设置界面，返回用户设置的操作结果
         *
         * 文档: [http://uniapp.dcloud.io/api/other/authorize?id=opensetting](http://uniapp.dcloud.io/api/other/authorize?id=opensetting)
         */
        openSetting(options: OpenSettingOptions): void;
        /**
         * 获取用户的当前设置
         *
         * 文档: [http://uniapp.dcloud.io/api/other/setting?id=getsetting](http://uniapp.dcloud.io/api/other/setting?id=getsetting)
         */
        getSetting(options: GetSettingOptions): void;
        /**
         * 获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址，需要用户授权 scope.address
         *
         * 文档: [http://uniapp.dcloud.io/api/other/choose-address?id=chooseaddress](http://uniapp.dcloud.io/api/other/choose-address?id=chooseaddress)
         */
        chooseAddress(options: ChooseAddressOptions): void;
        /**
         * 选择用户的发票抬头，需要用户授权 scope.invoiceTitle
         *
         * 文档: [http://uniapp.dcloud.io/api/other/invoice-title?id=chooseinvoicetitle](http://uniapp.dcloud.io/api/other/invoice-title?id=chooseinvoicetitle)
         */
        chooseInvoiceTitle(options: ChooseInvoiceTitleOptions): void;
        /**
         * 调起客户端小程序设置界面，返回用户设置的操作结果
         *
         * 文档: [http://uniapp.dcloud.io/api/other/open-miniprogram?id=navigatetominiprogram](http://uniapp.dcloud.io/api/other/open-miniprogram?id=navigatetominiprogram)
         */
        navigateToMiniProgram(options: NavigateToMiniProgramOptions): void;
        /**
         * 跳转回上一个小程序，只有当另一个小程序跳转到当前小程序时才会能调用成功
         *
         * 文档: [http://uniapp.dcloud.io/api/other/open-miniprogram?id=navigatebackminiprogram](http://uniapp.dcloud.io/api/other/open-miniprogram?id=navigatebackminiprogram)
         */
        navigateBackMiniProgram(options: NavigateBackMiniProgramOptions): void;
        /**
         * 返回全局唯一的版本更新管理器对象： updateManager，用于管理小程序更新
         *
         * 文档: [http://uniapp.dcloud.io/api/other/update?id=getupdatemanager](http://uniapp.dcloud.io/api/other/update?id=getupdatemanager)
         */
        getUpdateManager(): UpdateManager;
        /**
         * 设置是否打开调试开关。此开关对正式版也能生效
         *
         * 文档: [http://uniapp.dcloud.io/api/other/set-enable-debug?id=setenabledebug](http://uniapp.dcloud.io/api/other/set-enable-debug?id=setenabledebug)
         */
        setEnableDebug(options: SetEnableDebugOptions): void;
        /**
         * 获取第三方平台自定义的数据字段
         *
         * 文档: [http://uniapp.dcloud.io/api/other/get-extconfig?id=getextconfig](http://uniapp.dcloud.io/api/other/get-extconfig?id=getextconfig)
         */
        getExtConfig(options: GetExtConfigOptions): void;
        /**
         * uni.getExtConfig() 的同步版本
         *
         * 文档: [http://uniapp.dcloud.io/api/other/get-extconfig?id=getextconfigsync](http://uniapp.dcloud.io/api/other/get-extconfig?id=getextconfigsync)
         */
        getExtConfigSync(): any;
        /**
         * 显示分享按钮
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/share?id=showsharemenu](http://uniapp.dcloud.io/api/plugins/share?id=showsharemenu)
         */
        showShareMenu(options: ShowShareMenuOptions): void;
        /**
         * 隐藏分享按钮
         *
         * 文档: [http://uniapp.dcloud.io/api/plugins/share?id=hidesharemenu](http://uniapp.dcloud.io/api/plugins/share?id=hidesharemenu)
         */
        hideShareMenu(options: HideShareMenuOptions): void;
        /**
         * 动态设置窗口的背景色
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/bgcolor?id=setbackgroundcolor](http://uniapp.dcloud.io/api/ui/bgcolor?id=setbackgroundcolor)
         */
        setBackgroundColor(options: SetBackgroundColorOptions): void;
        /**
         * 动态设置窗口的背景色
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/bgcolor?id=setbackgroundtextstyle](http://uniapp.dcloud.io/api/ui/bgcolor?id=setbackgroundtextstyle)
         */
        setBackgroundTextStyle(options: SetBackgroundTextStyleOptions): void;
        /**
         * 动态设置页面根节点样式和字体大小
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/setpagemeta](http://uniapp.dcloud.io/api/ui/setpagemeta)
         */
        setPageMeta(options: StatusBarStyle): void;
        /**
         * 监听陀螺仪数据变化事件
         *
         * 文档: [http://uniapp.dcloud.io/api/system/gyroscope?id=ongyroscopechange](http://uniapp.dcloud.io/api/system/gyroscope?id=ongyroscopechange)
         */
        onGyroscopeChange(callback: (result: OnGyroscopeChangeSuccess) => void): void;
        /**
         * 开始监听陀螺仪数据
         *
         * 文档: [http://uniapp.dcloud.io/api/system/gyroscope?id=startgyroscope](http://uniapp.dcloud.io/api/system/gyroscope?id=startgyroscope)
         */
        startGyroscope(options: StartGyroscopeOptions): void;
        /**
         * 停止监听陀螺仪数据
         *
         * 文档: [http://uniapp.dcloud.io/api/system/gyroscope?id=stopgyroscope](http://uniapp.dcloud.io/api/system/gyroscope?id=stopgyroscope)
         */
        stopGyroscope(options: StopGyroscopeOptions): void;
        /**
         * 动态加载网络字体
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/font?id=loadfontface](http://uniapp.dcloud.io/api/ui/font?id=loadfontface)
         */
        loadFontFace(options: LoadFontFaceOptions): void;
        /**
         * 获取小程序下该菜单按钮的布局位置信息
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/menuButton?id=getmenubuttonboundingclientrect](http://uniapp.dcloud.io/api/ui/menuButton?id=getmenubuttonboundingclientrect)
         */
        getMenuButtonBoundingClientRect(): GetMenuButtonBoundingClientRectRes;
        /**
         * 开始 SOTER 生物认证
         *
         * 文档: [http://uniapp.dcloud.io/api/system/authentication?id=startsoterauthentication](http://uniapp.dcloud.io/api/system/authentication?id=startsoterauthentication)
         */
        startSoterAuthentication(options: StartSoterAuthenticationOptions): void;
        /**
         * 获取本机支持的 SOTER 生物认证方式
         *
         * 文档: [http://uniapp.dcloud.io/api/system/authentication?id=checkissupportsoterauthentication](http://uniapp.dcloud.io/api/system/authentication?id=checkissupportsoterauthentication)
         */
        checkIsSupportSoterAuthentication(options: CheckIsSupportSoterAuthenticationOptions): void;
        /**
         * 获取设备内是否录入如指纹等生物信息
         *
         * 文档: [http://uniapp.dcloud.io/api/system/authentication?id=checkissoterenrolledindevice](http://uniapp.dcloud.io/api/system/authentication?id=checkissoterenrolledindevice)
         */
        checkIsSoterEnrolledInDevice(options: CheckIsSoterEnrolledInDeviceOptions): void;
        /**
         * 创建激励视频广告组件
         *
         * 文档: [http://uniapp.dcloud.io/api/a-d/rewarded-video](http://uniapp.dcloud.io/api/a-d/rewarded-video)
         */
        createRewardedVideoAd(options: RewardedVideoAdOptions): RewardedVideoAdContext;
        /**
         * 创建全屏视频广告组件
         *
         * 文档: [http://uniapp.dcloud.io/api/a-d/full-screen-video](http://uniapp.dcloud.io/api/a-d/full-screen-video)
         */
        createFullScreenVideoAd(options: FullScreenVideoAdOptions): FullScreenVideoAdContext;
        /**
         * 创建插屏广告组件
         *
         * 文档: [http://uniapp.dcloud.io/api/a-d/interstitial](http://uniapp.dcloud.io/api/a-d/interstitial)
         */
        createInterstitialAd(options: InterstitialAdOptions): InterstitialAdContext;
        /**
         * 创建互动广告组件
         *
         * 文档: [http://uniapp.dcloud.io/api/a-d/interactive](http://uniapp.dcloud.io/api/a-d/interactive)
         */
        createInteractiveAd(options: InteractiveAdOptions): InteractiveAdContext;
        /**
         * 添加拦截器
         *
         * 文档: [http://uniapp.dcloud.io/api/interceptor](http://uniapp.dcloud.io/api/interceptor)
         */
        addInterceptor(name: string, options: InterceptorOptions): void;
        /**
         * 删除拦截器
         *
         * 文档: [http://uniapp.dcloud.io/api/interceptor](http://uniapp.dcloud.io/api/interceptor)
         */
        removeInterceptor(name: string): void;
        /**
         * 获取当前设置的语言
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/language?id=getlocale](http://uniapp.dcloud.io/api/ui/language?id=getlocale)
         */
        getLocale(): string;
        /**
         * 设置当前语言
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/language?id=setlocale](http://uniapp.dcloud.io/api/ui/language?id=setlocale)
         */
        setLocale(locale: string): void;
        /**
         * 设置当前语言
         *
         * 文档: [http://uniapp.dcloud.io/api/ui/language?id=setlocale](http://uniapp.dcloud.io/api/ui/language?id=setlocale)
         */
        onLocaleChange(callback: (result: OnLocaleChangeCallbackResult) => void): void;
        /**
         *
         * 获取当前帐号信息。线上小程序版本号仅支持在正式版小程序中获取，开发版和体验版中无法获取。
         *
         *
         * 最低基础库： `2.2.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/open-api/account-info/wx.getAccountInfoSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/account-info/wx.getAccountInfoSync.html)
         */
        getAccountInfoSync(): AccountInfo;
        /**
         *
         * [uni.getBatteryInfo](https://developers.weixin.qq.com/miniprogram/dev/api/device/battery/wx.getBatteryInfo.html) 的同步版本
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/battery/wx.getBatteryInfoSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/battery/wx.getBatteryInfoSync.html)
         */
        getBatteryInfoSync(): GetBatteryInfoSyncResult;
        /**
         *
         * 创建 [audio](https://developers.weixin.qq.com/miniprogram/dev/component/audio.html) 上下文 [AudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/AudioContext.html) 对象。
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createAudioContext.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.createAudioContext.html)
         */
        createAudioContext(id: string, component?: any): AudioContext;
        /**
         *
         * 获取全局唯一的文件管理器
         *
         * 最低基础库： `1.9.9`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.getFileSystemManager.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.getFileSystemManager.html)
         */
        getFileSystemManager(): FileSystemManager;
        /**
         *
         * 创建 [live-player](https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html) 上下文 [LivePlayerContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.html) 对象。
         *
         * 最低基础库： `1.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/live/wx.createLivePlayerContext.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/wx.createLivePlayerContext.html)
         */
        createLivePlayerContext(id: string, component?: any): LivePlayerContext;
        /**
         *
         * 获取日志管理器对象。
         *
         *
         * 最低基础库： `2.1.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.getLogManager.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.getLogManager.html)
         */
        getLogManager(option: GetLogManagerOption): LogManager;
        /**
         *
         * 创建音视频处理容器，最终可将容器中的轨道合成一个视频
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/wx.createMediaContainer.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/wx.createMediaContainer.html)
         */
        createMediaContainer(): MediaContainer;
        /**
         *
         * 创建 WebGL 画面录制器，可逐帧录制在 WebGL 上渲染的画面并导出视频文件
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/wx.createMediaRecorder.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/wx.createMediaRecorder.html)
         */
        createMediaRecorder(canvas: Record<string, any>, options: CreateMediaRecorderOption): MediaRecorder;
        /**
         *
         * 获取 NFC 实例
         *
         * **示例代码**
         *
         *
         * [在微信开发者工具中查看示例](https://developers.weixin.qq.com/s/1WsbDwmb75ig)
         *
         * 最低基础库： `2.11.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.getNFCAdapter.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.getNFCAdapter.html)
         */
        getNFCAdapter(): NFCAdapter;
        /**
         *
         * 创建离屏 canvas 实例
         *
         * 最低基础库： `2.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.createOffscreenCanvas.html](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.createOffscreenCanvas.html)
         */
        createOffscreenCanvas(): OffscreenCanvas;
        /**
         *
         * 获取实时日志管理器对象。
         *
         *
         * 最低基础库： `2.7.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.getRealtimeLogManager.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/wx.getRealtimeLogManager.html)
         */
        getRealtimeLogManager(): RealtimeLogManager;
        /**
         *
         * 创建一个 UDP Socket 实例。使用前请注意阅读[相关说明](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)。
         *
         * 最低基础库： `2.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/wx.createUDPSocket.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/wx.createUDPSocket.html)
         */
        createUDPSocket(): UDPSocket;
        /**
         *
         * 创建视频解码器，可逐帧获取解码后的数据
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/wx.createVideoDecoder.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/wx.createVideoDecoder.html)
         */
        createVideoDecoder(): VideoDecoder;
        /**
         *
         * 创建一个 [Worker 线程](https://developers.weixin.qq.com/miniprogram/dev/framework/workers.html)。目前限制最多只能创建一个 Worker，创建下一个 Worker 前请先调用 [Worker.terminate](https://developers.weixin.qq.com/miniprogram/dev/api/worker/Worker.terminate.html)
         *
         * 最低基础库： `1.9.90`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/worker/wx.createWorker.html](https://developers.weixin.qq.com/miniprogram/dev/api/worker/wx.createWorker.html)
         */
        createWorker(scriptPath: string): Worker;
        /**
         *
         * 批量添加卡券。只有通过 [认证](https://developers.weixin.qq.com/miniprogram/product/renzheng.html) 的小程序或文化互动类目的小游戏才能使用。更多文档请参考 [微信卡券接口文档](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1490190158&version=1&lang=zh_CN&platform=2)。
         *
         * **cardExt 说明**
         *
         *
         * cardExt 是卡券的扩展参数，其值是一个 JSON 字符串。
         *
         *
         * 最低基础库： `1.1.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/open-api/card/wx.addCard.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/card/wx.addCard.html)
         */
        addCard(option: AddCardOption): void;
        /**
         *
         * 选择用户已有的发票。
         *
         * **通过 cardId 和 encryptCode 获得报销发票的信息**
         *
         *
         * 请参考[微信电子发票文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=21517918939oae3U)中，「查询报销发票信息」部分。
         * 其中 `access_token` 的获取请参考[auth.getAccessToken](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html)文档
         *
         * 最低基础库： `2.3.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/open-api/invoice/wx.chooseInvoice.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/invoice/wx.chooseInvoice.html)
         */
        chooseInvoice(option?: ChooseInvoiceOption): void;
        /**
         *
         * 拍摄或从手机相册中选择图片或视频。
         *
         *
         * 最低基础库： `2.10.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html)
         */
        chooseMedia(option: ChooseMediaOption): void;
        /**
         *
         * 从客户端会话选择文件。
         *
         * ****
         *
         * ```js
         * wx.chooseMessageFile({
         * count: 10,
         * type: 'image',
         * success (res) {
         * // tempFilePath可以作为img标签的src属性显示图片
         * const tempFilePaths = res.tempFiles
         * }
         * })
         * ```
         *
         * 最低基础库： `2.5.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseMessageFile.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseMessageFile.html)
         */
        chooseMessageFile(option: ChooseMessageFileOption): void;
        /**
         *
         * 连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。仅 Android 与 iOS 11 以上版本支持。
         *
         *
         * 最低基础库： `1.6.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.connectWifi.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.connectWifi.html)
         */
        connectWifi(option: ConnectWifiOption): void;
        /**
         *
         * 建立本地作为外围设备的服务端，可创建多个。
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/wx.createBLEPeripheralServer.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/wx.createBLEPeripheralServer.html)
         */
        createBLEPeripheralServer(option?: CreateBLEPeripheralServerOption): void;
        /**
         *
         * 关闭小程序页面返回询问对话框
         *
         * 最低基础库： `2.12.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.disableAlertBeforeUnload.html](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.disableAlertBeforeUnload.html)
         */
        disableAlertBeforeUnload(option?: DisableAlertBeforeUnloadOption): void;
        /**
         *
         * 开启小程序页面返回询问对话框
         *
         * 最低基础库： `2.12.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.enableAlertBeforeUnload.html](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.enableAlertBeforeUnload.html)
         */
        enableAlertBeforeUnload(option: EnableAlertBeforeUnloadOption): void;
        /**
         *
         * 退出（销毁）实时语音通话
         *
         * 最低基础库： `2.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.exitVoIPChat.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.exitVoIPChat.html)
         */
        exitVoIPChat(option?: ExitVoIPChatOption): void;
        /**
         *
         * 获取当前支持的音频输入源
         *
         * 最低基础库： `2.1.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.getAvailableAudioSources.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.getAvailableAudioSources.html)
         */
        getAvailableAudioSources(option?: GetAvailableAudioSourcesOption): void;
        /**
         *
         * 获取后台音乐播放状态。
         *
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioPlayerState.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioPlayerState.html)
         */
        getBackgroundAudioPlayerState(option?: GetBackgroundAudioPlayerStateOption): void;
        /**
         *
         * 拉取 backgroundFetch 客户端缓存数据
         *
         * 最低基础库： `2.8.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.getBackgroundFetchData.html](https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.getBackgroundFetchData.html)
         */
        getBackgroundFetchData(option: GetBackgroundFetchDataOption): void;
        /**
         *
         * 获取设置过的自定义登录态。若无，则返回 fail。
         *
         * 最低基础库： `2.8.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.getBackgroundFetchToken.html](https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.getBackgroundFetchToken.html)
         */
        getBackgroundFetchToken(option?: GetBackgroundFetchTokenOption): void;
        /**
         *
         * 获取设备电量。同步 API [uni.getBatteryInfoSync](https://developers.weixin.qq.com/miniprogram/dev/api/device/battery/wx.getBatteryInfoSync.html) 在 iOS 上不可用。
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/battery/wx.getBatteryInfo.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/battery/wx.getBatteryInfo.html)
         */
        getBatteryInfo(option?: GetBatteryInfoOption): void;
        /**
         *
         * 获取已连接中的 Wi-Fi 信息。
         *
         * 最低基础库： `1.6.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.getConnectedWifi.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.getConnectedWifi.html)
         */
        getConnectedWifi(option?: GetConnectedWifiOption): void;
        /**
         *
         * 判断当前设备是否支持 HCE 能力。
         *
         *
         * 最低基础库： `1.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.getHCEState.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.getHCEState.html)
         */
        getHCEState(option?: GetHCEStateOption): void;
        /**
         *
         * 获取当前小程序性能相关的信息。
         *
         * ****
         *
         * 目前支持获取以下几类性能指标：
         *
         * | 类别 | 名称 (entryType) | 指标             |
         * | ---- | ---------------- | ---------------- |
         * | 路由 | navigation       | route, appLaunch |
         * | 渲染 | render           | firstRender      |
         * | 脚本 | script           | evaluateScript   |
         *
         * - route: 路由性能
         * - appLaunch: 小程序启动耗时
         * - firstRender: 页面首次渲染耗时
         * - evaluateScript: 注入脚本耗时
         *
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/open-api/performance/wx.getPerformance.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/performance/wx.getPerformance.html)
         */
        getPerformance(): void;
        /**
         *
         * 获取转发详细信息
         *
         *
         * **Tips**
         *
         *
         * - 如需要展示群名称，小程序可以使用[开放数据组件](https://developers.weixin.qq.com/miniprogram/dev/component/open-ability/open-data.html)
         * - 小游戏可以通过 `wx.getGroupInfo` 接口获取群名称
         *
         * 最低基础库： `1.1.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.getShareInfo.html](https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.getShareInfo.html)
         */
        getShareInfo(option: GetShareInfoOption): void;
        /**
         *
         * 获取用户过去三十天微信运动步数。需要先调用 [uni.login](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html) 接口。步数信息会在用户主动进入小程序时更新。
         *
         *
         * stepInfoList 中，每一项结构如下：
         *
         * | 属性 | 类型 | 说明 |
         * | --- | ---- | --- |
         * | timestamp | number | 时间戳，表示数据对应的时间 |
         * | step | number | 微信运动步数 |
         *
         * 最低基础库： `1.2.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/open-api/werun/wx.getWeRunData.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/werun/wx.getWeRunData.html)
         */
        getWeRunData(option?: GetWeRunDataOption): void;
        /**
         *
         * 请求获取 Wi-Fi 列表。在 `onGetWifiList` 注册的回调中返回 `wifiList` 数据。 **Android 调用前需要 [用户授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html) scope.userLocation。**
         *
         * iOS 将跳转到系统的 Wi-Fi 界面，Android 不会跳转。 iOS 11.0 及 iOS 11.1 两个版本因系统问题，该方法失效。但在 iOS 11.2 中已修复。
         *
         * 最低基础库： `1.6.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.getWifiList.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.getWifiList.html)
         */
        getWifiList(option?: GetWifiListOption): void;
        /**
         *
         * 加入 (创建) 实时语音通话，更多信息可见 [实时语音指南](#)
         *
         * 最低基础库： `2.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.joinVoIPChat.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.joinVoIPChat.html)
         */
        joinVoIPChat(option: JoinVoIPChatOption): void;
        /**
         *
         * 蓝牙配对接口，仅安卓使用。安卓上蓝牙连接时，部分设备需先配对。
         *
         * 最低基础库： `2.12.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.makeBluetoothPair.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.makeBluetoothPair.html)
         */
        makeBluetoothPair(option: MakeBluetoothPairOption): void;
        /**
         *
         * 取消监听小程序切后台事件
         *
         * 最低基础库： `2.1.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offAppHide.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offAppHide.html)
         */
        offAppHide(callback: OffAppHideCallback): void;
        /**
         *
         * 取消监听小程序切前台事件
         *
         * 最低基础库： `2.1.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offAppShow.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offAppShow.html)
         */
        offAppShow(callback: OffAppShowCallback): void;
        /**
         *
         * 取消监听音频因为受到系统占用而被中断开始事件
         *
         * 最低基础库： `2.6.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offAudioInterruptionBegin.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offAudioInterruptionBegin.html)
         */
        offAudioInterruptionBegin(callback: OffAudioInterruptionBeginCallback): void;
        /**
         *
         * 取消监听音频中断结束事件
         *
         * 最低基础库： `2.6.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offAudioInterruptionEnd.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offAudioInterruptionEnd.html)
         */
        offAudioInterruptionEnd(callback: OffAudioInterruptionEndCallback): void;
        /**
         *
         * 取消监听低功耗蓝牙设备的特征值变化事件。
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.offBLECharacteristicValueChange.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.offBLECharacteristicValueChange.html)
         */
        offBLECharacteristicValueChange(callback: (...args: any[]) => any): void;
        /**
         *
         * 取消监听低功耗蓝牙连接状态的改变事件
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.offBLEConnectionStateChange.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.offBLEConnectionStateChange.html)
         */
        offBLEConnectionStateChange(callback: (...args: any[]) => any): void;
        /**
         *
         * 取消监听当前外围设备被连接或断开连接事件
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/wx.offBLEPeripheralConnectionStateChanged.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/wx.offBLEPeripheralConnectionStateChanged.html)
         */
        offBLEPeripheralConnectionStateChanged(callback: OffBLEPeripheralConnectionStateChangedCallback): void;
        /**
         *
         * 取消监听 iBeacon 服务状态变化事件
         *
         * 最低基础库： `2.8.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.offBeaconServiceChange.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.offBeaconServiceChange.html)
         */
        offBeaconServiceChange(callback: OffBeaconServiceChangeCallback): void;
        /**
         *
         * 取消监听 iBeacon 设备更新事件
         *
         * 最低基础库： `2.8.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.offBeaconUpdate.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/ibeacon/wx.offBeaconUpdate.html)
         */
        offBeaconUpdate(callback: OffBeaconUpdateCallback): void;
        /**
         *
         * 取消监听蓝牙适配器状态变化事件。
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.offBluetoothAdapterStateChange.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.offBluetoothAdapterStateChange.html)
         */
        offBluetoothAdapterStateChange(callback: (...args: any[]) => any): void;
        /**
         *
         * 取消监听寻找到新设备的事件。
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.offBluetoothDeviceFound.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.offBluetoothDeviceFound.html)
         */
        offBluetoothDeviceFound(callback: (...args: any[]) => any): void;
        /**
         *
         * 取消监听设备方向变化事件，参数为空，则取消所有的事件监听。
         *
         * 最低基础库： `2.9.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.offDeviceMotionChange.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.offDeviceMotionChange.html)
         */
        offDeviceMotionChange(callback: (...args: any[]) => any): void;
        /**
         *
         * 取消监听小程序错误事件。
         *
         * 最低基础库： `2.1.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offError.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offError.html)
         */
        offError(callback: (...args: any[]) => any): void;
        /**
         *
         * 取消监听获取到 Wi-Fi 列表数据事件。
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.offGetWifiList.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.offGetWifiList.html)
         */
        offGetWifiList(callback: (...args: any[]) => any): void;
        /**
         *
         * 取消监听陀螺仪数据变化事件。
         *
         * 最低基础库： `2.9.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.offGyroscopeChange.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/gyroscope/wx.offGyroscopeChange.html)
         */
        offGyroscopeChange(callback: (...args: any[]) => any): void;
        /**
         *
         * 接收 NFC 设备消息事件，取消事件监听。
         *
         * 最低基础库： `2.8.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.offHCEMessage.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.offHCEMessage.html)
         */
        offHCEMessage(callback: (...args: any[]) => any): void;
        /**
         *
         * 取消监听 mDNS 服务停止搜索的事件
         *
         * 最低基础库： `2.4.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceDiscoveryStop.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceDiscoveryStop.html)
         */
        offLocalServiceDiscoveryStop(callback: OffLocalServiceDiscoveryStopCallback): void;
        /**
         *
         * 取消监听 mDNS 服务发现的事件
         *
         * 最低基础库： `2.4.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceFound.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceFound.html)
         */
        offLocalServiceFound(callback: OffLocalServiceFoundCallback): void;
        /**
         *
         * 取消监听 mDNS 服务离开的事件
         *
         * 最低基础库： `2.4.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceLost.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceLost.html)
         */
        offLocalServiceLost(callback: OffLocalServiceLostCallback): void;
        /**
         *
         * 取消监听 mDNS 服务解析失败的事件
         *
         * 最低基础库： `2.4.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceResolveFail.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.offLocalServiceResolveFail.html)
         */
        offLocalServiceResolveFail(callback: OffLocalServiceResolveFailCallback): void;
        /**
         *
         * 取消监听实时地理位置变化事件
         *
         * 最低基础库： `2.8.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.offLocationChange.html](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.offLocationChange.html)
         */
        offLocationChange(callback: OffLocationChangeCallback): void;
        /**
         *
         * 取消监听内存不足告警事件。
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/performance/wx.offMemoryWarning.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/performance/wx.offMemoryWarning.html)
         */
        offMemoryWarning(callback: (...args: any[]) => any): void;
        /**
         *
         * 取消监听实时语音通话成员视频状态变化事件
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.offOnVoIPVideoMembersChanged.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.offOnVoIPVideoMembersChanged.html)
         */
        offOnVoIPVideoMembersChanged(callback: OffOnVoIPVideoMembersChangedCallback): void;
        /**
         *
         * 取消监听小程序要打开的页面不存在事件
         *
         * 最低基础库： `2.1.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offPageNotFound.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offPageNotFound.html)
         */
        offPageNotFound(callback: OffPageNotFoundCallback): void;
        /**
         *
         * 取消监听系统主题改变事件
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offThemeChange.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offThemeChange.html)
         */
        offThemeChange(callback: OffThemeChangeCallback): void;
        /**
         *
         * 取消监听未处理的 Promise 拒绝事件
         *
         * 最低基础库： `2.10.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offUnhandledRejection.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.offUnhandledRejection.html)
         */
        offUnhandledRejection(callback: OffUnhandledRejectionCallback): void;
        /**
         *
         * 用户主动截屏事件。取消事件监听。
         *
         * 最低基础库： `2.9.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/screen/wx.offUserCaptureScreen.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/screen/wx.offUserCaptureScreen.html)
         */
        offUserCaptureScreen(callback: (...args: any[]) => any): void;
        /**
         *
         * 取消监听被动断开实时语音通话事件。
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.offVoIPChatInterrupted.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.offVoIPChatInterrupted.html)
         */
        offVoIPChatInterrupted(callback: (...args: any[]) => any): void;
        /**
         *
         * 取消监听实时语音通话成员在线状态变化事件。
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.offVoIPChatMembersChanged.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.offVoIPChatMembersChanged.html)
         */
        offVoIPChatMembersChanged(callback: (...args: any[]) => any): void;
        /**
         *
         * 取消监听连接上 Wi-Fi 的事件。
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.offWifiConnected.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.offWifiConnected.html)
         */
        offWifiConnected(callback: (...args: any[]) => any): void;
        /**
         *
         * 监听小程序切后台事件。该事件与 [`App.onHide`](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onhide) 的回调时机一致。
         *
         * 最低基础库： `2.1.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAppHide.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAppHide.html)
         */
        onAppHide(callback: OnAppHideCallback): void;
        /**
         *
         * 监听小程序切前台事件。该事件与 [`App.onShow`](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onshowobject-object) 的回调参数一致。
         *
         * **返回有效 referrerInfo 的场景**
         *
         *
         * | 场景值 | 场景                            | appId含义  |
         * | ------ | ------------------------------- | ---------- |
         * | 1020   | 公众号 profile 页相关小程序列表 | 来源公众号 |
         * | 1035   | 公众号自定义菜单                | 来源公众号 |
         * | 1036   | App 分享消息卡片                | 来源App    |
         * | 1037   | 小程序打开小程序                | 来源小程序 |
         * | 1038   | 从另一个小程序返回              | 来源小程序 |
         * | 1043   | 公众号模板消息                  | 来源公众号 |
         *
         * **注意**
         *
         *
         * 部分版本在无`referrerInfo`的时候会返回 `undefined`，建议使用 `options.referrerInfo && options.referrerInfo.appId` 进行判断。
         *
         * 最低基础库： `2.1.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAppShow.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAppShow.html)
         */
        onAppShow(callback: OnAppShowCallback): void;
        /**
         *
         * 监听音频因为受到系统占用而被中断开始事件。以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，小程序内所有音频会暂停。
         *
         * 最低基础库： `2.6.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAudioInterruptionBegin.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAudioInterruptionBegin.html)
         */
        onAudioInterruptionBegin(callback: OnAudioInterruptionBeginCallback): void;
        /**
         *
         * 监听音频中断结束事件。在收到 onAudioInterruptionBegin 事件之后，小程序内所有音频会暂停，收到此事件之后才可再次播放成功
         *
         * 最低基础库： `2.6.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAudioInterruptionEnd.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAudioInterruptionEnd.html)
         */
        onAudioInterruptionEnd(callback: OnAudioInterruptionEndCallback): void;
        /**
         *
         * 监听当前外围设备被连接或断开连接事件
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/wx.onBLEPeripheralConnectionStateChanged.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/wx.onBLEPeripheralConnectionStateChanged.html)
         */
        onBLEPeripheralConnectionStateChanged(callback: OnBLEPeripheralConnectionStateChangedCallback): void;
        /**
         *
         * 监听音乐暂停事件。
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.onBackgroundAudioPause.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.onBackgroundAudioPause.html)
         */
        onBackgroundAudioPause(callback: OnBackgroundAudioPauseCallback): void;
        /**
         *
         * 监听音乐播放事件。
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.onBackgroundAudioPlay.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.onBackgroundAudioPlay.html)
         */
        onBackgroundAudioPlay(callback: OnBackgroundAudioPlayCallback): void;
        /**
         *
         * 监听音乐停止事件。
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.onBackgroundAudioStop.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.onBackgroundAudioStop.html)
         */
        onBackgroundAudioStop(callback: OnBackgroundAudioStopCallback): void;
        /**
         *
         * 监听收到 backgroundFetch 数据时的回调
         *
         * 最低基础库： `2.8.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.onBackgroundFetchData.html](https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.onBackgroundFetchData.html)
         */
        onBackgroundFetchData(callback: OnBackgroundFetchDataCallback): void;
        /**
         *
         * 监听设备方向变化事件。频率根据 [uni.startDeviceMotionListening()](https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.startDeviceMotionListening.html) 的 interval 参数。可以使用 [uni.stopDeviceMotionListening()](https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.stopDeviceMotionListening.html) 停止监听。
         *
         * 最低基础库： `2.3.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.onDeviceMotionChange.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.onDeviceMotionChange.html)
         */
        onDeviceMotionChange(callback: OnDeviceMotionChangeCallback): void;
        /**
         *
         * 监听小程序错误事件。如脚本错误或 API 调用报错等。该事件与 [`App.onError`](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onerrorstring-error) 的回调时机与参数一致。
         *
         * 最低基础库： `2.1.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onError.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onError.html)
         */
        onError(callback: OnAppErrorCallback): void;
        /**
         *
         * 监听获取到 Wi-Fi 列表数据事件
         *
         * 最低基础库： `1.6.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.onGetWifiList.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.onGetWifiList.html)
         */
        onGetWifiList(callback: OnGetWifiListCallback): void;
        /**
         *
         * 监听接收 NFC 设备消息事件，仅能注册一个监听
         *
         * 最低基础库： `1.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.onHCEMessage.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.onHCEMessage.html)
         */
        onHCEMessage(callback: OnHCEMessageCallback): void;
        /**
         *
         * 监听 mDNS 服务停止搜索的事件
         *
         * 最低基础库： `2.4.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceDiscoveryStop.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceDiscoveryStop.html)
         */
        onLocalServiceDiscoveryStop(callback: OnLocalServiceDiscoveryStopCallback): void;
        /**
         *
         * 监听 mDNS 服务发现的事件
         *
         * 最低基础库： `2.4.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceFound.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceFound.html)
         */
        onLocalServiceFound(callback: OnLocalServiceFoundCallback): void;
        /**
         *
         * 监听 mDNS 服务离开的事件
         *
         * 最低基础库： `2.4.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceLost.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceLost.html)
         */
        onLocalServiceLost(callback: OnLocalServiceLostCallback): void;
        /**
         *
         * 监听 mDNS 服务解析失败的事件
         *
         * 最低基础库： `2.4.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceResolveFail.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.onLocalServiceResolveFail.html)
         */
        onLocalServiceResolveFail(callback: OnLocalServiceResolveFailCallback): void;
        /**
         *
         * 监听实时地理位置变化事件，需结合 [uni.startLocationUpdateBackground](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.startLocationUpdateBackground.html)、[uni.startLocationUpdate](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.startLocationUpdate.html)使用。
         *
         *
         * 最低基础库： `2.8.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.onLocationChange.html](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.onLocationChange.html)
         */
        onLocationChange(callback: OnLocationChangeCallback): void;
        /**
         *
         * 监听内存不足告警事件。
         *
         * 当 iOS/Android 向小程序进程发出内存警告时，触发该事件。触发该事件不意味小程序被杀，大部分情况下仅仅是告警，开发者可在收到通知后回收一些不必要资源避免进一步加剧内存紧张。
         *
         *
         * 最低基础库： `2.0.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/performance/wx.onMemoryWarning.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/performance/wx.onMemoryWarning.html)
         */
        onMemoryWarning(callback: OnMemoryWarningCallback): void;
        /**
         *
         * 监听实时语音通话成员视频状态变化事件。
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.onOnVoIPVideoMembersChanged.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.onOnVoIPVideoMembersChanged.html)
         */
        onOnVoIPVideoMembersChanged(callback: OnOnVoIPVideoMembersChangedCallback): void;
        /**
         *
         * 监听小程序要打开的页面不存在事件。该事件与 [`App.onPageNotFound`](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onpagenotfoundobject-object) 的回调时机一致。
         *
         * **注意**
         *
         *
         * - 开发者可以在回调中进行页面重定向，但必须在回调中**同步**处理，异步处理（例如 `setTimeout` 异步执行）无效。
         * - 若开发者没有调用 [uni.onPageNotFound](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onPageNotFound.html) 绑定监听，也没有声明 `App.onPageNotFound`，当跳转页面不存在时，将推入微信客户端原生的页面不存在提示页面。
         * - 如果回调中又重定向到另一个不存在的页面，将推入微信客户端原生的页面不存在提示页面，并且不再第二次回调。
         *
         * 最低基础库： `2.1.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onPageNotFound.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onPageNotFound.html)
         */
        onPageNotFound(callback: OnPageNotFoundCallback): void;
        /**
         *
         * 监听系统主题改变事件。该事件与 [`App.onThemeChange`](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onThemeChange-Object-object) 的回调时机一致。
         *
         * **注意**
         *
         *
         * - 只有在全局配置"darkmode": true时才会触发此事件。
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onThemeChange.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onThemeChange.html)
         */
        onThemeChange(callback: OnThemeChangeCallback): void;
        /**
         *
         * 监听未处理的 Promise 拒绝事件。该事件与 `App.onUnhandledRejection` 的回调时机与参数一致。
         *
         * **注意**
         *
         *
         * - 安卓平台暂时不支持该事件
         * - 所有的 unhandledRejection 都可以被这一监听捕获，但只有 Error 类型的才会在小程序后台触发报警。
         *
         * 最低基础库： `2.10.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onUnhandledRejection.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onUnhandledRejection.html)
         */
        onUnhandledRejection(callback: OnUnhandledRejectionCallback): void;
        /**
         *
         * 监听用户主动截屏事件。用户使用系统截屏按键截屏时触发，只能注册一个监听
         *
         *
         * 最低基础库： `1.4.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/screen/wx.onUserCaptureScreen.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/screen/wx.onUserCaptureScreen.html)
         */
        onUserCaptureScreen(callback: OnUserCaptureScreenCallback): void;
        /**
         *
         * 监听被动断开实时语音通话事件。包括小游戏切入后端时断开
         *
         * 最低基础库： `2.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.onVoIPChatInterrupted.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.onVoIPChatInterrupted.html)
         */
        onVoIPChatInterrupted(callback: OnVoIPChatInterruptedCallback): void;
        /**
         *
         * 监听实时语音通话成员在线状态变化事件。有成员加入/退出通话时触发回调
         *
         * 最低基础库： `2.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.onVoIPChatMembersChanged.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.onVoIPChatMembersChanged.html)
         */
        onVoIPChatMembersChanged(callback: OnVoIPChatMembersChangedCallback): void;
        /**
         *
         * 监听实时语音通话成员通话状态变化事件。有成员开始/停止说话时触发回调
         *
         * 最低基础库： `2.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.onVoIPChatSpeakersChanged.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.onVoIPChatSpeakersChanged.html)
         */
        onVoIPChatSpeakersChanged(callback: OnVoIPChatSpeakersChangedCallback): void;
        /**
         *
         * 监听连接上 Wi-Fi 的事件
         *
         * 最低基础库： `1.6.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.onWifiConnected.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.onWifiConnected.html)
         */
        onWifiConnected(callback: OnWifiConnectedCallback): void;
        /**
         *
         * 查看微信卡包中的卡券。只有通过 [认证](https://developers.weixin.qq.com/miniprogram/product/renzheng.html) 的小程序或文化互动类目的小游戏才能使用。更多文档请参考 [微信卡券接口文档](https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1490190158&version=1&lang=zh_CN&platform=2)。
         *
         *
         * 最低基础库： `1.1.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/open-api/card/wx.openCard.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/card/wx.openCard.html)
         */
        openCard(option: OpenCardOption): void;
        /**
         *
         * 暂停播放音乐。
         *
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.pauseBackgroundAudio.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.pauseBackgroundAudio.html)
         */
        pauseBackgroundAudio(option?: PauseBackgroundAudioOption): void;
        /**
         *
         * 暂停正在播放的语音。再次调用 [uni.playVoice](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.playVoice.html) 播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 [uni.stopVoice](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.stopVoice.html)。
         *
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.pauseVoice.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.pauseVoice.html)
         */
        pauseVoice(option?: PauseVoiceOption): void;
        /**
         *
         * 使用后台播放器播放音乐。对于微信客户端来说，只能同时有一个后台音乐在播放。当用户离开小程序后，音乐将暂停播放；当用户在其他小程序占用了音乐播放器，原有小程序内的音乐将停止播放。
         *
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.playBackgroundAudio.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.playBackgroundAudio.html)
         */
        playBackgroundAudio(option: PlayBackgroundAudioOption): void;
        /**
         *
         * 开始播放语音。同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。
         *
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.playVoice.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.playVoice.html)
         */
        playVoice(option: PlayVoiceOption): void;
        /**
         *
         * 预览图片和视频。
         *
         * 最低基础库： `2.12.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewMedia.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewMedia.html)
         */
        previewMedia(option: PreviewMediaOption): void;
        /**
         *
         * 自定义分析数据上报接口。使用前，需要在小程序管理后台自定义分析中新建事件，配置好事件名与字段。
         *
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/open-api/data-analysis/wx.reportAnalytics.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/data-analysis/wx.reportAnalytics.html)
         */
        reportAnalytics(eventName: string, data: Record<string, any>): void;
        /**
         *
         * 自定义业务数据监控上报接口。
         *
         * **使用说明**
         *
         *
         * 使用前，需要在「小程序管理后台-运维中心-性能监控-业务数据监控」中新建监控事件，配置监控描述与告警类型。每一个监控事件对应唯一的监控ID，开发者最多可以创建128个监控事件。
         *
         *
         * 最低基础库： `2.0.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/open-api/report/wx.reportMonitor.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/report/wx.reportMonitor.html)
         */
        reportMonitor(name: string, value: number): void;
        /**
         *
         * 小程序测速上报。使用前，需要在小程序管理后台配置。 详情参见[小程序测速](#)指南。
         *
         *
         * 最低基础库： `2.9.2`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/open-api/performance/wx.reportPerformance.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/performance/wx.reportPerformance.html)
         */
        reportPerformance(id: number, value: number, dimensions?: string | any[]): void;
        /**
         *
         * 调起客户端小程序订阅消息界面，返回用户订阅消息的操作结果。当用户勾选了订阅面板中的“总是保持以上选择，不再询问”时，模板消息会被添加到用户的小程序设置页，通过 [uni.getSetting](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.getSetting.html) 接口可获取用户对相关模板消息的订阅状态。
         *
         * ## 注意事项
         * - 一次性模板 id 和永久模板 id 不可同时使用。
         * - 低版本基础库2.4.4~2.8.3 已支持订阅消息接口调用，仅支持传入一个一次性 tmplId / 永久 tmplId。
         * - [2.8.2](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 版本开始，用户发生点击行为或者发起支付回调后，才可以调起订阅消息界面。
         * - [2.10.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 版本开始，开发版和体验版小程序将禁止使用模板消息 formId。
         *
         * **错误码**
         *
         *
         *
         * | errCode | errMsg                                                 | 说明                                                           |
         * | ------- | ------------------------------------------------------ | -------------------------------------------------------------- |
         * | 10001   | TmplIds can't be empty                                 | 参数传空了                                                     |
         * | 10002   | Request list fail                                       | 网络问题，请求消息列表失败                                     |
         * | 10003   | Request subscribe fail                                 | 网络问题，订阅请求发送失败                                     |
         * | 10004   | Invalid template id                                    | 参数类型错误                                                   |
         * | 10005   | Cannot show subscribe message UI                       | 无法展示 UI，一般是小程序这个时候退后台了导致的                |
         * | 20001   | No template data return, verify the template id exist  | 没有模板数据，一般是模板 ID 不存在 或者和模板类型不对应 导致的 |
         * | 20002   | Templates type must be same                            | 模板消息类型 既有一次性的又有永久的                            |
         * | 20003   | Templates count out of max bounds                      | 模板消息数量超过上限                                           |
         * | 20004   | The main switch is switched off                        | 用户关闭了主开关，无法进行订阅                                 |
         * | 20005   | This mini program was banned from subscribing messages | 小程序被禁封                                                   |
         *
         *
         * 最低基础库： `2.4.4`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html)
         */
        requestSubscribeMessage(option: RequestSubscribeMessageOption): void;
        /**
         *
         * 保存文件系统的文件到用户磁盘，仅在 PC 端支持
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.saveFileToDisk.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.saveFileToDisk.html)
         */
        saveFileToDisk(option: SaveFileToDiskOption): void;
        /**
         *
         * 控制音乐播放进度。
         *
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.seekBackgroundAudio.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.seekBackgroundAudio.html)
         */
        seekBackgroundAudio(option: SeekBackgroundAudioOption): void;
        /**
         *
         * 发送 NFC 消息。仅在安卓系统下有效。
         *
         *
         * 最低基础库： `1.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.sendHCEMessage.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.sendHCEMessage.html)
         */
        sendHCEMessage(option: SendHCEMessageOption): void;
        /**
         *
         * 设置自定义登录态，在周期性拉取数据时带上，便于第三方服务器验证请求合法性
         *
         * 最低基础库： `2.8.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.setBackgroundFetchToken.html](https://developers.weixin.qq.com/miniprogram/dev/api/storage/background-fetch/wx.setBackgroundFetchToken.html)
         */
        setBackgroundFetchToken(option: SetBackgroundFetchTokenOption): void;
        /**
         *
         * 设置 [InnerAudioContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/InnerAudioContext.html) 的播放选项。设置之后对当前小程序全局生效。
         *
         * 最低基础库： `2.3.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.setInnerAudioOption.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.setInnerAudioOption.html)
         */
        setInnerAudioOption(option: SetInnerAudioOption): void;
        /**
         *
         * 动态设置置顶栏文字内容。只有当前小程序被置顶时能生效，如果当前小程序没有被置顶，也能调用成功，但是不会立即生效，只有在用户将这个小程序置顶后才换上设置的文字内容.
         *
         *
         * **注意**
         *
         *
         * - 调用成功后，需间隔 5s 才能再次调用此接口，如果在 5s 内再次调用此接口，会回调 fail，errMsg："setTopBarText: fail invoke too frequently"
         *
         * 最低基础库： `1.4.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/ui/sticky/wx.setTopBarText.html](https://developers.weixin.qq.com/miniprogram/dev/api/ui/sticky/wx.setTopBarText.html)
         */
        setTopBarText(option: SetTopBarTextOption): void;
        /**
         *
         * 设置 `wifiList` 中 AP 的相关信息。在 `onGetWifiList` 回调后调用，**iOS特有接口**。
         *
         * **注意**
         *
         *
         * - 该接口只能在 `onGetWifiList` 回调之后才能调用。
         * - 此时客户端会挂起，等待小程序设置 Wi-Fi 信息，请务必尽快调用该接口，若无数据请传入一个空数组。
         * - 有可能随着周边 Wi-Fi 列表的刷新，单个流程内收到多次带有存在重复的 Wi-Fi 列表的回调。
         *
         *
         * 最低基础库： `1.6.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.setWifiList.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.setWifiList.html)
         */
        setWifiList(option: SetWifiListOption): void;
        /**
         *
         * 设置窗口大小，该接口仅适用于 PC 平台，使用细则请参见指南
         *
         * 最低基础库： `2.10.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/ui/window/wx.setWindowSize.html](https://developers.weixin.qq.com/miniprogram/dev/api/ui/window/wx.setWindowSize.html)
         */
        setWindowSize(option: SetWindowSizeOption): void;
        /**
         *
         * 拉取h5领取红包封面页。获取参考红包封面地址参考 [微信红包封面开发平台](https://cover.weixin.qq.com/cgi-bin/mmcover-bin/readtemplate?t=page%2Fdoc%2Fguide%2Fintroduce.html)。
         *
         * 最低基础库： `2.10.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/open-api/redpackage/wx.showRedPackage.html](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/redpackage/wx.showRedPackage.html)
         */
        showRedPackage(option: ShowRedPackageOption): void;
        /**
         *
         * 开始监听设备方向的变化。
         *
         * 最低基础库： `2.3.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.startDeviceMotionListening.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.startDeviceMotionListening.html)
         */
        startDeviceMotionListening(option: StartDeviceMotionListeningOption): void;
        /**
         *
         * 初始化 NFC 模块。
         *
         *
         * 最低基础库： `1.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.startHCE.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.startHCE.html)
         */
        startHCE(option: StartHCEOption): void;
        /**
         *
         * 开始搜索局域网下的 mDNS 服务。搜索的结果会通过 wx.onLocalService* 事件返回。
         *
         * **注意**
         *
         *
         * 1. wx.startLocalServiceDiscovery 是一个消耗性能的行为，开始 30 秒后会自动 stop 并执行 wx.onLocalServiceDiscoveryStop 注册的回调函数。
         * 2. 在调用 wx.startLocalServiceDiscovery 后，在这次搜索行为停止后才能发起下次 wx.startLocalServiceDiscovery。停止本次搜索行为的操作包括调用 wx.stopLocalServiceDiscovery 和 30 秒后系统自动 stop 本次搜索。
         *
         * 最低基础库： `2.4.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.startLocalServiceDiscovery.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.startLocalServiceDiscovery.html)
         */
        startLocalServiceDiscovery(option: StartLocalServiceDiscoveryOption): void;
        /**
         *
         * 开启小程序进入前台时接收位置消息
         *
         * **注意**
         *
         *
         * - 获取位置信息需配置[地理位置用途说明](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#permission)。
         *
         * 最低基础库： `2.8.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.startLocationUpdate.html](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.startLocationUpdate.html)
         */
        startLocationUpdate(option?: StartLocationUpdateOption): void;
        /**
         *
         * 开启小程序进入前后台时均接收位置消息，需引导用户开启[授权]((open-ability/authorize#后台定位))。授权以后，小程序在运行中或进入后台均可接受位置消息变化。
         *
         * **注意**
         *
         *
         * - 安卓微信7.0.6版本，iOS 7.0.5版本起支持该接口
         * - 需在app.json中配置requiredBackgroundModes: ['location']后使用
         * - 获取位置信息需配置[地理位置用途说明](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#permission)。
         *
         * 最低基础库： `2.8.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.startLocationUpdateBackground.html](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.startLocationUpdateBackground.html)
         */
        startLocationUpdateBackground(option?: StartLocationUpdateBackgroundOption): void;
        /**
         *
         * 开始录音。当主动调用 [uni.stopRecord](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.stopRecord.html)，或者录音超过1分钟时自动结束录音。当用户离开小程序时，此接口无法调用。
         *
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.startRecord.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.startRecord.html)
         */
        startRecord(option: WxStartRecordOption): void;
        /**
         *
         * 初始化 Wi-Fi 模块。
         *
         *
         * 最低基础库： `1.6.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.startWifi.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.startWifi.html)
         */
        startWifi(option?: StartWifiOption): void;
        /**
         *
         * 停止播放音乐。
         *
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.stopBackgroundAudio.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.stopBackgroundAudio.html)
         */
        stopBackgroundAudio(option?: StopBackgroundAudioOption): void;
        /**
         *
         * 停止监听设备方向的变化。
         *
         * 最低基础库： `2.3.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.stopDeviceMotionListening.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/motion/wx.stopDeviceMotionListening.html)
         */
        stopDeviceMotionListening(option?: StopDeviceMotionListeningOption): void;
        /**
         *
         * 关闭 NFC 模块。仅在安卓系统下有效。
         *
         *
         * 最低基础库： `1.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.stopHCE.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.stopHCE.html)
         */
        stopHCE(option?: StopHCEOption): void;
        /**
         *
         * 停止搜索 mDNS 服务
         *
         * 最低基础库： `2.4.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.stopLocalServiceDiscovery.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/mdns/wx.stopLocalServiceDiscovery.html)
         */
        stopLocalServiceDiscovery(option?: StopLocalServiceDiscoveryOption): void;
        /**
         *
         * 关闭监听实时位置变化，前后台都停止消息接收
         *
         * 最低基础库： `2.8.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.stopLocationUpdate.html](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.stopLocationUpdate.html)
         */
        stopLocationUpdate(option?: StopLocationUpdateOption): void;
        /**
         *
         * 停止录音。
         *
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.stopRecord.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/wx.stopRecord.html)
         */
        stopRecord(option?: WxStopRecordOption): void;
        /**
         *
         * 结束播放语音。
         *
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.stopVoice.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/audio/wx.stopVoice.html)
         */
        stopVoice(option?: StopVoiceOption): void;
        /**
         *
         * 关闭 Wi-Fi 模块。
         *
         *
         * 最低基础库： `1.6.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.stopWifi.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.stopWifi.html)
         */
        stopWifi(option?: StopWifiOption): void;
        /**
         *
         * 更新转发属性
         *
         *
         * 最低基础库： `1.2.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.updateShareMenu.html](https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.updateShareMenu.html)
         */
        updateShareMenu(option: UpdateShareMenuOption): void;
        /**
         *
         * 更新实时语音静音设置
         *
         * 最低基础库： `2.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.updateVoIPChatMuteConfig.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/voip/wx.updateVoIPChatMuteConfig.html)
         */
        updateVoIPChatMuteConfig(option: UpdateVoIPChatMuteConfigOption): void;
        /**
         *
         * 更新客户端版本。当判断用户小程序所在客户端版本过低时，可使用该接口跳转到更新微信页面。
         *
         * 最低基础库： `2.12.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/update/wx.updateWeChatApp.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/update/wx.updateWeChatApp.html)
         */
        updateWeChatApp(option?: UpdateWeChatAppOption): void;
    }

    interface NavigateToMiniProgramOptions {
        /**
         * 要打开的小程序 appId（百度小程序则填写App Key）
         */
        appId: string;
        /**
         * 打开的页面路径，如果为空则打开首页
         */
        path?: string;
        /**
         * 需要传递给目标小程序的数据，目标小程序可在 App.vue 的 onLaunch或onShow 中获取到这份数据
         */
        extraData?: any;
        /**
         * 要打开的小程序版本，有效值： develop（开发版），trial（体验版），release（正式版）。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版
         * - release: 正式版
         * - develop: 开发版
         * - trial: 体验版
         */
        envVersion?: 'release' | 'develop' | 'trial';
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface NavigateBackMiniProgramOptions {
        /**
         * 需要传递给目标小程序的数据，目标小程序可在 App.vue 的 onLaunch或onShow 中获取到这份数据
         */
        extraData?: any;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GeneralCallbackResult {
        /**
         * 错误信息
         */
        errMsg: string;
    }

    interface SubNVue {
        /**
         * 显示原生子窗体
         */
        show(options: 'slide-in-right' | 'slide-in-left' | 'slide-in-top' | 'slide-in-bottom' | 'fade-in' | 'zoom-out' | 'zoom-fade-out' | 'pop-in'): void;
        /**
         * 隐藏原生子窗体
         */
        hide(options: 'slide-out-right' | 'slide-out-left' | 'slide-out-top' | 'slide-out-bottom' | 'fade-out' | 'zoom-in' | 'zoom-fade-in' | 'pop-out'): void;
        /**
         * 设置原生子窗体的样式
         */
        setStyle(options: SubNVuesSetStyleOptions): void;
        /**
         * 发送消息
         */
        postMessage(message: any): void;
        /**
         * 监听消息
         */
        onMessage(success: (result: any) => void): void;
    }

    interface SubNVuesSetStyleOptions {
        /**
         * 原生子窗体的排版位置
         * - static: 原生子窗体在页面中正常定位
         * - absolute: 原生子窗体在页面中绝对定位
         * - dock: 原生子窗体在页面中停靠
         */
        position: 'static' | 'absolute' | 'dock';
        /**
         * 原生子窗体的停靠方式,仅当原生子窗体 "position" 属性值设置为 "dock" 时才生效
         * - top: 原生子窗体停靠则页面顶部
         * - bottom: 原生子窗体停靠在页面底部
         * - left: 原生子窗体停靠在页面左侧
         * - right: 原生子窗体停靠在页面右侧
         */
        dock: 'top' | 'bottom' | 'left' | 'right';
        /**
         * 原生子窗体的内置样式
         * - popup: 弹出层
         * - navigationBar: 导航栏
         */
        type: 'popup' | 'navigationBar';
        /**
         * 原生子窗体的遮罩层,仅当原生子窗体 "type" 属性值设置为 "popup" 时才生效
         * - popup: 弹出层
         * - navigationBar: 导航栏
         */
        mask: 'popup' | 'navigationBar';
        /**
         * 原生子窗体的宽度
         */
        width: string;
        /**
         * 原生子窗体的高度
         */
        height: string;
        /**
         * 原生子窗体垂直向下的偏移量
         */
        top: string;
        /**
         * 原生子窗体垂直向上的偏移量
         */
        bottom: string;
        /**
         * 原生子窗体水平向左的偏移量
         */
        left: string;
        /**
         * 原生子窗体水平向右的偏移量
         */
        right: string;
        /**
         * 原生子窗体的边距
         */
        margin: string;
    }

    interface RequestPaymentOptions {
        /**
         * 支付服务提供商，通过 uni.getProvider 获取
         * - alipay: 支付宝支付
         * - wxpay: 微信支付
         * - baidu: 百度收银台
         * - appleiap: 苹果应用内支付
         */
        provider: 'alipay' | 'wxpay' | 'baidu' | 'appleiap';
        /**
         * 订单数据
         */
        orderInfo: string;
        /**
         * 时间戳从1970年1月1日至今的秒数，即当前的时间，微信小程序独有
         */
        timeStamp?: string;
        /**
         * 随机字符串，长度为32个字符以下，微信小程序独有 。
         */
        nonceStr?: string;
        /**
         * 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx，微信小程序独有
         */
        package?: string;
        /**
         * 签名算法，暂支持 MD5 ，微信小程序独有
         */
        signType?: string;
        /**
         * 签名，具体签名方案参见小程序支付接口文档，微信小程序独有
         */
        paySign?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface RequestOptions {
        /**
         * 资源url
         */
        url: string;
        /**
         * 请求的参数
         */
        data?: string | AnyObject | ArrayBuffer;
        /**
         * 设置请求的 header，header 中不能设置 Referer。
         */
        header?: any;
        /**
         * 默认为 GET
         * 可以是：OPTIONS，GET，HEAD，POST，PUT，DELETE，TRACE，CONNECT
         */
        method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
        /**
         * 超时时间
         */
        timeout?: number;
        /**
         * 如果设为json，会尝试对返回的数据做一次 JSON.parse
         */
        dataType?: string;
        /**
         * 设置响应的数据类型。合法值：text、arraybuffer
         */
        responseType?: string;
        /**
         * 验证 ssl 证书
         */
        sslVerify?: boolean;
        /**
         * 跨域请求时是否携带凭证
         */
        withCredentials?: boolean;
        /**
         * DNS解析时优先使用 ipv4
         */
        firstIpv4?: boolean;
        /**
         * 成功返回的回调函数
         */
        success?: (result: RequestSuccessCallbackResult) => void;
        /**
         * 失败的回调函数
         */
        fail?: (result: GeneralCallbackResult) => void;
        /**
         * 结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: GeneralCallbackResult) => void;
    }

    interface RequestSuccessCallbackResult {
        /**
         * 开发者服务器返回的数据
         */
        data: string | AnyObject | ArrayBuffer;
        /**
         * 开发者服务器返回的 HTTP 状态码
         */
        statusCode: number;
        /**
         * 开发者服务器返回的 HTTP Response Header
         */
        header: any;
        /**
         * 开发者服务器返回的 cookies，格式为字符串数组
         */
        cookies: string [];
    }

    interface RequestTask {
        /**
         * 中断请求任务
         */
        abort(): void;
        /**
         * 监听 HTTP Response Header 事件
         */
        onHeadersReceived(callback: (result: any) => void): void;
        /**
         * 取消监听 HTTP Response Header 事件
         */
        offHeadersReceived(callback: (result: any) => void): void;
    }

    interface ConfigMTLSOptions {
        /**
         * 资源url
         */
        certificates: Certificate [];
        /**
         * 成功返回的回调函数
         */
        success?: (result: ConfigMTLSResult) => void;
        /**
         * 失败的回调函数
         */
        fail?: (result: ConfigMTLSResult) => void;
        /**
         * 结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface Certificate {
        /**
         * 对应请求的域名（注意：不要协议部分）
         */
        host: string;
        /**
         * 客户端证书（服务器端需要验证客户端证书时需要配置此项，格式要求请参考下面的证书格式说明，注意 iOS 平台客户端证书只支持 .p12 类型的证书）
         */
        client?: string;
        /**
         * 客户端证书对应的密码（客户端证书存在时必须配置此项）
         */
        clientPassword?: string;
        /**
         * 服务器端证书（客户端需要对服务器端证书做校验时需要配置此项，格式要求请参考下面的证书格式说明，注意 iOS 平台服务器端证书只支持 .cer 类型的证书）
         */
        server?: string [];
    }

    interface ConfigMTLSResult {
        /**
         * 成功返回 0,失败返回相应 code 码
         */
        code: number;
    }

    interface UploadFileOption {
        /**
         * 开发者服务器 url
         */
        url: string;
        /**
         * 文件类型，image/video/audio，仅支付宝小程序，且必填。
         * - image: 图像
         * - video: 视频
         * - audio: 音频
         */
        fileType?: 'image' | 'video' | 'audio';
        /**
         * 要上传的文件对象
         */
        file?: File;
        /**
         * 要上传文件资源的路径
         */
        filePath?: string;
        /**
         * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
         */
        name?: string;
        /**
         * 需要上传的文件列表。
         */
        files?: UploadFileOptionFiles [];
        /**
         * HTTP 请求 Header, header 中不能设置 Referer
         */
        header?: any;
        /**
         * HTTP 请求中其他额外的 form data
         */
        formData?: any;
        /**
         * 超时时间，单位 ms
         */
        timeout?: number;
        /**
         * 成功返回的回调函数
         */
        success?: (result: UploadFileSuccessCallbackResult) => void;
        /**
         * 失败的回调函数
         */
        fail?: (result: GeneralCallbackResult) => void;
        /**
         * 结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: GeneralCallbackResult) => void;
    }

    interface UploadFileOptionFiles {
        /**
         * multipart 提交时，表单的项目名，默认为 file，如果 name 不填或填的值相同，可能导致服务端读取文件时只能读取到一个文件。
         */
        name?: string;
        /**
         * 要上传的文件对象
         */
        file?: File;
        /**
         * 要上传文件资源的路径
         */
        uri?: string;
    }

    interface UploadTask {
        /**
         * 中断上传任务
         */
        abort(): void;
        /**
         * 监听上传进度变化
         */
        onProgressUpdate(callback: (result: OnProgressUpdateResult) => void): void;
        /**
         * 取消监听上传进度变化事件
         */
        offProgressUpdate(callback: (result: any) => void): void;
        /**
         * 监听 HTTP Response Header 事件
         */
        onHeadersReceived(callback: (result: any) => void): void;
        /**
         * 取消监听 HTTP Response Header 事件
         */
        offHeadersReceived(callback: (result: any) => void): void;
    }

    interface OnProgressUpdateResult {
        /**
         * 上传进度百分比
         */
        progress: number;
        /**
         * 已经上传的数据长度，单位 Bytes
         */
        totalBytesSent: number;
        /**
         * 预期需要上传的数据总长度，单位 Bytes
         */
        totalBytesExpectedToSend: number;
    }

    interface DownloadFileOption {
        /**
         * 下载资源的 url
         */
        url: string;
        /**
         * HTTP 请求 Header，header 中不能设置 Referer
         */
        header?: any;
        /**
         * 超时时间，单位 ms
         */
        timeout?: number;
        /**
         * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
         */
        success?: (result: DownloadSuccessData) => void;
        /**
         * 失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface DownloadTask {
        /**
         * 中断下载任务
         */
        abort(): void;
        /**
         * 监听下载进度变化
         */
        onProgressUpdate(callback: (result: OnProgressDownloadResult) => void): void;
        /**
         * 取消监听下载进度变化
         */
        offProgressUpdate(callback: (result: any) => void): void;
        /**
         * 监听 HTTP Response Header 事件
         */
        onProgressUpdate(callback: (result: any) => void): void;
        /**
         * 取消监听 HTTP Response Header 事件
         */
        offHeadersReceived(callback: (result: any) => void): void;
    }

    interface OnProgressDownloadResult {
        /**
         * 下载进度百分比
         */
        progress: number;
        /**
         * 已经下载的数据长度，单位 Bytes
         */
        totalBytesWritten: number;
        /**
         * 预期需要下载的数据总长度，单位 Bytes
         */
        totalBytesExpectedToWrite: number;
    }

    interface UploadFileSuccessCallbackResult {
        /**
         * 开发者服务器返回的数据
         */
        data: string;
        /**
         * 开发者服务器返回的 HTTP 状态码
         */
        statusCode: number;
    }

    interface DownloadSuccessData {
        /**
         * 临时文件路径，下载后的文件会存储到一个临时文件
         */
        tempFilePath: string;
        /**
         * 开发者服务器返回的 HTTP 状态码
         */
        statusCode: number;
    }

    interface ConnectSocketOption {
        /**
         * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
         */
        url: string;
        /**
         * HTTP 请求 Header，header 中不能设置 Referer
         */
        header?: any;
        /**
         * 默认为 GET
         * 可以是：OPTIONS，GET，HEAD，POST，PUT，DELETE，TRACE，CONNECT
         */
        method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
        /**
         * 子协议数组
         */
        protocols?: string [];
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SendSocketMessageOptions {
        /**
         * 需要发送的内容
         */
        data: string | ArrayBuffer;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GeneralCallbackResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: GeneralCallbackResult) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: GeneralCallbackResult) => void;
    }

    interface CloseSocketOptions {
        /**
         * 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）
         */
        code?: number;
        /**
         * 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）
         */
        reason?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GeneralCallbackResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: GeneralCallbackResult) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: GeneralCallbackResult) => void;
    }

    interface SocketTask {
        /**
         * 通过 WebSocket 连接发送数据
         */
        send(options: SendSocketMessageOptions): void;
        /**
         * 关闭 WebSocket 连接
         */
        close(options: CloseSocketOptions): void;
        /**
         * 监听 WebSocket 连接打开事件
         */
        onOpen(callback: (result: OnSocketOpenCallbackResult) => void): void;
        /**
         * 监听 WebSocket 连接关闭事件
         */
        onClose(callback: (result: any) => void): void;
        /**
         * 监听 WebSocket 错误
         */
        onError(callback: (result: GeneralCallbackResult) => void): void;
        /**
         * 监听WebSocket接受到服务器的消息事件
         */
        onMessage(callback: (result: OnSocketMessageCallbackResult) => void): void;
    }

    interface OnSocketMessageCallbackResult {
        /**
         * 服务器返回的消息
         */
        data: string | ArrayBuffer;
    }

    interface OnSocketOpenCallbackResult {
        /**
         * 连接成功的 HTTP 响应 Header
         */
        header: any;
    }

    interface ChooseImageOptions {
        /**
         * 最多可以选择的图片张数，默认9
         */
        count?: number;
        /**
         * original 原图，compressed 压缩图，默认二者都有
         */
        sizeType?: string | string [];
        /**
         * album 从相册选图，camera 使用相机，默认二者都有
         */
        sourceType?: string [];
        /**
         * 根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。
         */
        extension?: string [];
        /**
         * 图像裁剪参数，设置后 sizeType 失效。
         */
        crop?: ChooseImageCropOptions;
        /**
         * 成功则返回图片的本地文件路径列表 tempFilePaths
         */
        success?: (result: ChooseImageSuccessCallbackResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ChooseImageCropOptions {
        /**
         * 裁剪的宽度，单位为px，用于计算裁剪宽高比。
         */
        width: number;
        /**
         * 裁剪的高度，单位为px，用于计算裁剪宽高比。
         */
        height: number;
        /**
         * 取值范围为1-100，数值越小，质量越低（仅对jpg格式有效）。默认值为80。
         */
        quality?: number;
        /**
         * 是否将width和height作为裁剪保存图片真实的像素值。默认值为true。注：设置为false时在裁剪编辑界面显示图片的像素值，设置为true时不显示。
         */
        resize?: boolean;
        /**
         * 是否将裁剪的图片保存到手机相册里，默认值为false。
         */
        saveToAlbum?: boolean;
    }

    interface ChooseImageSuccessCallbackResult {
        /**
         * 图片的本地文件路径列表
         */
        tempFilePaths: string | string [];
        /**
         * 图片的本地文件列表，每一项是一个 File 对象
         */
        tempFiles: ChooseImageSuccessCallbackResultFile | ChooseImageSuccessCallbackResultFile [] | File | File [];
    }

    interface ChooseImageSuccessCallbackResultFile {
        /**
         * 本地文件路径
         */
        path: string;
        /**
         * 本地文件大小，单位：B
         */
        size: number;
    }

    interface PreviewImageOptions {
        /**
         * 当前显示图片的链接，不填则默认为 urls 的第一张
         */
        count?: string;
        /**
         * current 为当前显示图片的链接/索引值，不填或填写的值无效则为 urls 的第一张。App平台在 1.9.5至1.9.8之间，current为必填。不填会报错
         */
        current?: string | number;
        /**
         * 需要预览的图片链接列表
         */
        urls: string [];
        /**
         * 图片指示器样式
         * - default: 底部圆点指示器
         * - number: 顶部数字指示器
         * - none: 不显示指示器
         */
        indicator?: 'default' | 'number' | 'none';
        /**
         * 是否可循环预览
         */
        loop?: boolean;
        /**
         * 长按图片显示操作菜单，如不填默认为保存相册，1.9.5 起支持。
         */
        longPressActions?: LongPressActionsOptions;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface LongPressActionsOptions {
        /**
         * 按钮的文字数组
         */
        itemList: string [];
        /**
         * 按钮的文字颜色，字符串格式，默认为"#000000"
         */
        itemColor?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: LongPressActionsSuccessData) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface LongPressActionsSuccessData {
        /**
         * 接口调用失败的回调函数
         */
        tapIndex: number;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        index: number;
    }

    interface GetImageInfoOptions {
        /**
         * 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
         */
        src: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetImageInfoSuccessData) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetImageInfoSuccessData {
        /**
         * 图片宽度，单位px
         */
        width: number;
        /**
         * 图片高度，单位px
         */
        height: number;
        /**
         * 返回图片的本地路径
         */
        path: string;
        /**
         * 返回图片的方向
         */
        orientation?: string;
        /**
         * 返回图片的格式
         */
        type?: string;
    }

    interface SaveImageToPhotosAlbumOptions {
        /**
         * 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
         */
        filePath: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: SaveImageToPhotosAlbumResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SaveImageToPhotosAlbumResult {
        /**
         * 保存到相册的图片路径
         */
        path: string;
    }

    interface CompressImageOptions {
        /**
         * 图片路径，图片的路径，可以是相对路径、临时文件路径、存储文件路径
         */
        src: string;
        /**
         * 压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效）
         */
        quality?: number;
        /**
         * 缩放图片的宽度
         */
        width?: string;
        /**
         * 缩放图片的高度
         */
        height?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: CompressImageSuccessResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface CompressImageSuccessResult {
        /**
         * 压缩后图片的临时文件路径
         */
        tempFilePath: string;
    }

    interface CompressVideoOptions {
        /**
         * 视频文件路径，可以是临时文件路径也可以是永久文件路径
         */
        src: string;
        /**
         * 压缩质量
         * - low: 低
         * - medium: 中
         * - high: 高
         */
        quality?: 'low' | 'medium' | 'high';
        /**
         * 码率，单位 kbps
         */
        bitrate?: number;
        /**
         * 帧率
         */
        fps?: number;
        /**
         * 相对于原视频的分辨率比例，取值范围(0, 1]
         */
        resolution?: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: CompressVideoSuccessData) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface CompressVideoSuccessData {
        /**
         * 压缩后的临时文件地址
         */
        tempFilePath: string;
        /**
         * 压缩后的大小，单位 kB
         */
        size: string;
    }

    interface GetVideoInfoOptions {
        /**
         * 视频文件路径，可以是临时文件路径也可以是永久文件路径
         */
        src: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: GetVideoInfoSuccessData) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetVideoInfoSuccessData {
        /**
         * 画面方向
         */
        orientation: string;
        /**
         * 视频格式
         */
        type: string;
        /**
         * 视频长度
         */
        duration: number;
        /**
         * 视频大小，单位 kB
         */
        size: number;
        /**
         * 视频的长，单位 px
         */
        height: number;
        /**
         * 视频的宽，单位 px
         */
        width: number;
        /**
         * 视频帧率
         */
        fps: number;
        /**
         * 视频码率，单位 kbps
         */
        bitrate: number;
    }

    interface OpenVideoEditorOptions {
        /**
         * 视频源的路径，只支持本地路径
         */
        filePath: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: OpenVideoEditorSuccessData) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface OpenVideoEditorSuccessData {
        /**
         * 剪辑后生成的视频文件的时长，单位毫秒（ms）
         */
        duration: number;
        /**
         * 剪辑后生成的视频文件大小，单位字节数（byte）
         */
        size: number;
        /**
         * 编辑后生成的视频文件的临时路径
         */
        tempFilePath: string;
        /**
         * 编辑后生成的缩略图文件的临时路径
         */
        tempThumbPath: string;
    }

    interface ChooseFileOptions {
        /**
         * 最多可以选择的文件数，默认100
         */
        count?: number;
        /**
         * 选择文件的类型，默认all，可选image、video
         * - image: 选择图片文件
         * - video: 选择视频文件
         * - all: 默认值，选择本地文件，包含图片和视频
         */
        type?: 'image' | 'video' | 'all';
        /**
         * 选择文件的后缀名，暂只支持.zip、.png等，不支持application/msword等值
         */
        extension?: string [];
        /**
         * original 原图，compressed 压缩图，默认二者都有
         */
        sizeType?: string | string [];
        /**
         * album 从相册选图，camera 使用相机，默认二者都有
         */
        sourceType?: string [];
        /**
         * 成功则返回图片的本地文件路径列表 tempFilePaths、tempFiles
         */
        success?: (result: ChooseFileSuccessCallbackResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ChooseFileSuccessCallbackResult {
        /**
         * 文件的本地文件路径列表
         */
        tempFilePaths: string | string [];
        /**
         * 文件的本地文件列表，每一项是一个 File 对象
         */
        tempFiles: ChooseFileSuccessCallbackResultFile | ChooseFileSuccessCallbackResultFile [] | File | File [];
    }

    interface ChooseFileSuccessCallbackResultFile {
        /**
         * 本地文件路径
         */
        path: string;
        /**
         * 本地文件大小，单位：B
         */
        size: number;
    }

    interface StartRecordOptions {
        /**
         * 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface RecorderManager {
        /**
         * 开始录音
         */
        start(options: RecorderManagerStartOptions): void;
        /**
         * 暂停录音
         */
        pause(): void;
        /**
         * 暂停录音
         */
        resume(): void;
        /**
         * 停止录音
         */
        stop(): void;
        /**
         * 录音开始事件
         */
        onStart(options: (result: any) => void): void;
        /**
         * 录音暂停事件
         */
        onPause(options: (result: any) => void): void;
        /**
         * 录音停止事件，会回调文件地址
         */
        onStop(options: (result: any) => void): void;
        /**
         * 已录制完指定帧大小的文件，会回调录音分片结果数据。如果设置了 frameSize ，则会回调此事件
         */
        onFrameRecorded(options: (result: any) => void): void;
        /**
         * 录音错误事件, 会回调错误信息
         */
        onError(options: (result: any) => void): void;
    }

    interface RecorderManagerStartOptions {
        /**
         * 指定录音的时长，单位 ms ，如果传入了合法的 duration ，在到达指定的 duration 后会自动停止录音，最大值 600000（10 分钟）,默认值 60000（1 分钟）
         */
        duration?: number;
        /**
         * 采样率，有效值 8000/16000/44100
         */
        sampleRate?: number;
        /**
         * 录音通道数，有效值 1/2
         */
        numberOfChannels?: number;
        /**
         * 编码码率，有效值见下表格
         */
        encodeBitRate?: number;
        /**
         * 音频格式，有效值 aac/mp3
         */
        format?: string;
        /**
         * 指定帧大小，单位 KB。传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，不指定则不会回调。暂仅支持 mp3 格式。
         */
        frameSize?: number;
    }

    interface PlayVoiceOptions {
        /**
         * 需要播放的语音文件的文件路径
         */
        filePath: string;
        /**
         * original 原图，compressed 压缩图，默认二者都有
         */
        duration?: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetBackgroundAudioPlayerStateOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetBackgroundAudioPlayerStateSuccessData) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetBackgroundAudioPlayerStateSuccessData {
        /**
         * 选定音频的长度（单位：s），只有在当前有音乐播放时返回
         */
        duration: number;
        /**
         * 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回
         */
        currentPosition: number;
        /**
         * 播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
         */
        status: number;
        /**
         * 音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回
         */
        downloadPercent: number;
        /**
         * 歌曲数据链接，只有在当前有音乐播放时返回
         */
        dataUrl: string;
    }

    interface SeekBackgroundAudioOptions {
        /**
         * 音乐位置，单位：秒
         */
        position: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface BackgroundAudioManager {
        /**
         * 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
         */
        duration: number;
        /**
         * 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回
         */
        currentTime: number;
        /**
         * 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
         */
        paused: boolean;
        /**
         * 音频的数据源，默认为空字符串，当设置了新的 src 时，会自动开始播放 ，目前支持的格式有 m4a, aac, mp3, wav
         */
        src: string;
        /**
         * 音频开始播放的位置（单位：s）
         */
        startTime: number;
        /**
         * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲
         */
        buffered: number;
        /**
         * 音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。
         */
        title: string;
        /**
         * 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值
         */
        epname: string;
        /**
         * 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值
         */
        singer: string;
        /**
         * 封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。
         */
        coverImgUrl: string;
        /**
         * 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值
         */
        webUrl: string;
        /**
         * 音频协议。默认值为 'http'，设置 'hls' 可以支持播放 HLS 协议的直播音频
         */
        protocol: string;
        /**
         * 播放的倍率。可取值： 0.5/0.8/1.0/1.25/1.5/2.0，默认值为1.0。（仅 App 支持）
         */
        playbackRate?: number;
        /**
         * 播放
         */
        play(): void;
        /**
         * 暂停
         */
        pause(): void;
        /**
         * 跳转到指定位置，单位 s
         */
        seek(position: number): void;
        /**
         * 停止
         */
        stop(): void;
        /**
         * 背景音频进入可以播放状态，但不保证后面可以流畅播放
         */
        onCanplay(callback: (result: any) => void): void;
        /**
         * 背景音频播放事件
         */
        onPlay(callback: (result: any) => void): void;
        /**
         * 背景音频暂停事件
         */
        onPause(callback: (result: any) => void): void;
        /**
         * 背景音频停止事件
         */
        onStop(callback: (result: any) => void): void;
        /**
         * 背景音频自然播放结束事件
         */
        onEnded(callback: (result: any) => void): void;
        /**
         * 背景音频播放进度更新事件
         */
        onTimeUpdate(callback: (result: any) => void): void;
        /**
         * 用户在系统音乐播放面板点击上一曲事件（iOS only）
         */
        onPrev(callback: (result: any) => void): void;
        /**
         * 用户在系统音乐播放面板点击下一曲事件（iOS only）
         */
        onNext(callback: (result: any) => void): void;
        /**
         * 背景音频播放错误事件
         */
        onError(callback: (result: any) => void): void;
        /**
         * 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
         */
        onWaiting(callback: (result: any) => void): void;
    }

    interface AudioContext {
        /**
         * 音频的地址
         */
        setSrc(): void;
        /**
         * 暂停
         */
        pause(): void;
        /**
         * 播放
         */
        play(): void;
        /**
         * 跳转到指定位置，单位 s
         */
        seek(position: number): void;
    }

    interface InnerAudioContext {
        /**
         * 当前音频的长度（单位：s），只有在当前有合法的 src 时返回
         */
        duration: number;
        /**
         * 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回
         */
        currentTime: number;
        /**
         * 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放
         */
        paused: boolean;
        /**
         * 音频的数据链接，用于直接播放。
         */
        src: string;
        /**
         * 音频开始播放的位置（单位：s）
         */
        startTime: number;
        /**
         * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲
         */
        buffered: number;
        /**
         * 是否自动开始播放，默认 false
         */
        autoplay: boolean;
        /**
         * 是否循环播放，默认 false
         */
        loop: boolean;
        /**
         * 是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音，默认值 true
         */
        obeyMuteSwitch: boolean;
        /**
         * 音量。范围 0~1。
         */
        volume: number;
        /**
         * 播放的倍率。可取值： 0.5/0.8/1.0/1.25/1.5/2.0，默认值为1.0。（仅 App 支持）
         */
        playbackRate?: number;
        /**
         * 暂停
         */
        pause(): void;
        /**
         * 停止
         */
        stop(): void;
        /**
         * 播放
         */
        play(): void;
        /**
         * 跳转到指定位置，单位 s
         */
        seek(position: number): void;
        /**
         * 销毁当前实例
         */
        destroy(): void;
        /**
         * 音频进入可以播放状态，但不保证后面可以流畅播放
         */
        onCanplay(callback: (result: any) => void): void;
        /**
         * 音频播放事件
         */
        onPlay(callback: (result: any) => void): void;
        /**
         * 音频暂停事件
         */
        onPause(callback: (result: any) => void): void;
        /**
         * 音频停止事件
         */
        onStop(callback: (result: any) => void): void;
        /**
         * 音频自然播放结束事件
         */
        onEnded(callback: (result: any) => void): void;
        /**
         * 音频播放进度更新事件
         */
        onTimeUpdate(callback: (result: any) => void): void;
        /**
         * 音频播放错误事件
         */
        onError(callback: (result: any) => void): void;
        /**
         * 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
         */
        onWaiting(callback: (result: any) => void): void;
        /**
         * 音频进行 seek 操作事件
         */
        onSeeking(callback: (result: any) => void): void;
        /**
         * 音频完成 seek 操作事件
         */
        onSeeked(callback: (result: any) => void): void;
        /**
         * 取消监听 onCanplay 事件
         */
        offCanplay(callback: (result: any) => void): void;
        /**
         * 取消监听 onPlay 事件
         */
        offPlay(callback: (result: any) => void): void;
        /**
         * 取消监听 onPause 事件
         */
        offPause(callback: (result: any) => void): void;
        /**
         * 取消监听 onStop 事件
         */
        offStop(callback: (result: any) => void): void;
        /**
         * 取消监听 onEnded 事件
         */
        offEnded(callback: (result: any) => void): void;
        /**
         * 取消监听 onTimeUpdate 事件
         */
        offTimeUpdate(callback: (result: any) => void): void;
        /**
         * 取消监听 onWaiting 事件
         */
        offError(callback: (result: any) => void): void;
        /**
         * 取消监听 onWaiting 事件
         */
        offWaiting(callback: (result: any) => void): void;
        /**
         * 取消监听 onSeeking 事件
         */
        offSeeking(callback: (result: any) => void): void;
        /**
         * 取消监听 onSeeked 事件
         */
        offSeeked(callback: (result: any) => void): void;
    }

    interface ChooseVideoOptions {
        /**
         * album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
         */
        sourceType?: string [];
        /**
         * 是否压缩所选的视频源文件，默认值为true，需要压缩
         */
        compressed?: boolean;
        /**
         * 拍摄视频最长拍摄时间，单位秒。最长支持 60 秒
         */
        maxDuration?: number;
        /**
         * 摄像切换
         * - front: 前置摄像头
         * - back: 后置摄像头
         */
        camera?: 'front' | 'back';
        /**
         * 根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。
         */
        extension?: string [];
        /**
         * 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明
         */
        success?: (result: ChooseVideoSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SaveVideoToPhotosAlbumOptions {
        /**
         * 视频文件路径，可以是临时文件路径也可以是永久文件路径
         */
        filePath: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ChooseVideoSuccess {
        /**
         * 选定视频的临时文件路径
         */
        tempFilePath: string;
        /**
         * 选定的视频文件
         */
        tempFile: File;
        /**
         * 选定视频的时间长度
         */
        duration: number;
        /**
         * 选定视频的数据量大小
         */
        size: number;
        /**
         * 返回选定视频的长
         */
        height: number;
        /**
         * 返回选定视频的宽
         */
        width: number;
        /**
         * 包含扩展名的文件名称（仅H5支持）
         */
        name: string;
    }

    interface VideoContext {
        /**
         * 暂停
         */
        pause(): void;
        /**
         * 播放
         */
        play(): void;
        /**
         * 跳转到指定位置，单位 s
         */
        seek(position: number): void;
        /**
         * 发送弹幕，danmu 包含两个属性 text, color。
         */
        sendDanmu(danmu: Danmu): void;
        /**
         * 设置倍速播放，支持的倍率有 0.5/0.8/1.0/1.25/1.5
         */
        playbackRate(rate: number): void;
        /**
         * 进入全屏，可传入{direction}参数（1.7.0起支持），详见video组件文档
         */
        requestFullScreen(direction?: RequestFullScreenOptions): void;
        /**
         * 退出全屏
         */
        exitFullScreen(): void;
    }

    interface Danmu {
        /**
         * 弹幕文字
         */
        text?: string;
        /**
         * 弹幕颜色
         */
        color?: string;
    }

    interface RequestFullScreenOptions {
        /**
         * direction
         * - 0: 正常竖向
         * - 90: 屏幕逆时针90度
         * - -90: 屏幕顺时针90度
         */
        direction?: 0 | 90 | -90;
    }

    interface CameraContext {
        /**
         * 拍照，可指定质量，成功则返回图片
         */
        takePhoto(options: CameraContextTakePhotoOptions): void;
        /**
         * 开始录像
         */
        startRecord(options: CameraContextStartRecordOptions): void;
        /**
         * 结束录像，成功则返回封面与视频
         */
        stopRecord(options: CameraContextStopRecordOptions): void;
        /**
         * 结束录像，成功则返回封面与视频
         */
        onCameraFrame(callback: (result: CameraFrame) => void): void;
    }

    interface CameraContextTakePhotoOptions {
        /**
         * 成像质量，值为high, normal, low，默认normal
         * - normal: 普通质量
         * - high: 高质量
         * - low: 低质量
         */
        quality?: 'normal' | 'high' | 'low';
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: CameraContextTakePhotoResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface CameraContextTakePhotoResult {
        /**
         * 照片文件的临时路径，安卓是jpg图片格式，ios是png
         */
        tempImagePath: string;
    }

    interface CameraContextStartRecordOptions {
        /**
         * 超过30s或页面onHide时会结束录像
         */
        timeoutCallback?: (result: CameraContextStopRecordResult) => void;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface CameraContextStopRecordOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: CameraContextStopRecordResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface CameraContextStopRecordResult {
        /**
         * 封面图片文件的临时路径
         */
        tempThumbPath: string;
        /**
         * 视频的文件的临时路径
         */
        tempVideoPath: string;
    }

    interface CameraFrame {
        /**
         * 图像数据矩形的宽度
         */
        width: number;
        /**
         * 图像数据矩形的高度
         */
        height: number;
        /**
         * 图像像素点数据，一维数组，每四项表示一个像素点的 rgba
         */
        data: ArrayBuffer;
    }

    interface LivePusherContext {
        /**
         * 开始推流
         */
        start(options?: LivePusherContextOptions): void;
        /**
         * 暂停推流
         */
        pause(options?: LivePusherContextOptions): void;
        /**
         * 恢复推流
         */
        resume(options?: LivePusherContextOptions): void;
        /**
         * 停止推流
         */
        stop(options?: LivePusherContextOptions): void;
        /**
         * 切换前后摄像头
         */
        switchCamera(options?: LivePusherContextOptions): void;
        /**
         * 快照
         */
        snapshot(options?: LivePusherContextOptions): void;
        /**
         * 开启摄像头预览
         */
        startPreview(options?: LivePusherContextOptions): void;
        /**
         * 关闭摄像头预览
         */
        stopPreview(options?: LivePusherContextOptions): void;
    }

    interface LivePusherContextOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SaveFileOptions {
        /**
         * 需要保存的文件的临时路径
         */
        tempFilePath: string;
        /**
         * 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}
         */
        success?: (result: SaveFileSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SaveFileSuccess {
        /**
         * 文件的保存路径
         */
        savedFilePath: string;
    }

    interface GetFileInfoOptions {
        /**
         * 本地路径
         */
        filePath: string;
        /**
         * 计算文件摘要的算法，默认值 md5，有效值：md5，sha1
         */
        digestAlgorithm?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetFileInfoSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetFileInfoSuccess {
        /**
         * 文件大小，单位：B
         */
        size: number;
        /**
         * 按照传入的 digestAlgorithm 计算得出的的文件摘要
         */
        digest?: string;
        /**
         * 调用结果
         */
        errMsg: string;
    }

    interface GetSavedFileListOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetSavedFileListSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetSavedFileListSuccess {
        /**
         * 接口调用结果
         */
        errMsg: number;
        /**
         * 文件列表
         */
        fileList: GetSavedFileListSuccessFileItem [];
    }

    interface GetSavedFileListSuccessFileItem {
        /**
         * 文件的本地路径
         */
        filePath: string;
        /**
         * 文件的保存时的时间戳
         */
        createTime: number;
        /**
         * 文件大小，以字节为单位
         */
        size: number;
    }

    interface GetSavedFileInfoOptions {
        /**
         * 文件路径
         */
        filePath: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetSavedFileInfoSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetSavedFileInfoSuccess {
        /**
         * 接口调用结果
         */
        errMsg: string;
        /**
         * 文件大小，单位B
         */
        size: number;
        /**
         * 文件保存时的时间戳，从1970/01/01 08:00:00 到该时刻的秒数
         */
        createTime: number;
    }

    interface RemoveSavedFileOptions {
        /**
         * 文件路径
         */
        filePath: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface OpenDocumentOptions {
        /**
         * 文件路径
         */
        filePath: string;
        /**
         * 文件类型，指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx
         */
        fileType?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SetStorageOptions {
        /**
         * 本地缓存中的指定的 key
         */
        key: string;
        /**
         * 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象
         */
        data: any;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetStorageOptions {
        /**
         * 本地缓存中的指定的 key
         */
        key: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetStorageInfoOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetStorageInfoSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetStorageInfoSuccess {
        /**
         * 当前storage中所有的 key
         */
        keys: string [];
        /**
         * 当前占用的空间大小, 单位 kb
         */
        currentSize: number;
        /**
         * 限制的空间大小，单位kb
         */
        limitSize: number;
    }

    interface RemoveStorageOptions {
        /**
         * 本地缓存中的指定的 key
         */
        key: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetLocationOptions {
        /**
         * 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于uni.openLocation的坐标
         */
        type?: string;
        /**
         * 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
         */
        altitude?: boolean;
        /**
         * 传入 true 会解析地址
         */
        geocode?: boolean;
        /**
         * 高精度定位超时时间(ms)，指定时间内返回最高精度，该值3000ms以上高精度定位才有效果
         */
        highAccuracyExpireTime?: number;
        /**
         * 开启高精度定位
         */
        isHighAccuracy?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetLocationSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetLocationSuccess {
        /**
         * 纬度，浮点数，范围为-90~90，负数表示南纬
         */
        latitude: number;
        /**
         * 经度，范围为-180~180，负数表示西经
         */
        longitude: number;
        /**
         * 速度，浮点数，单位m/s
         */
        speed: number;
        /**
         * 位置的精确度
         */
        accuracy: number;
        /**
         * 高度，单位 m
         */
        altitude: number;
        /**
         * 垂直精度，单位 m（Android 无法获取，返回 0）
         */
        verticalAccuracy: number;
        /**
         * 水平精度，单位 m
         */
        horizontalAccuracy: number;
        /**
         * 地址信息
         */
        address?: any;
    }

    interface ChooseLocationOptions {
        /**
         * 目标地纬度
         */
        latitude?: number;
        /**
         * 目标地经度
         */
        longitude?: number;
        /**
         * 搜索关键字
         */
        keyword?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: ChooseLocationSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ChooseLocationSuccess {
        /**
         * 位置名称
         */
        name: string;
        /**
         * 详细地址
         */
        address: string;
        /**
         * 纬度，浮点数，范围为-90~90，负数表示南纬
         */
        latitude: number;
        /**
         * 经度，范围为-180~180，负数表示西经
         */
        longitude: number;
    }

    interface OpenLocationOptions {
        /**
         * 纬度，范围为-90~90，负数表示南纬
         */
        latitude: number;
        /**
         * 经度，范围为-180~180，负数表示西经
         */
        longitude: number;
        /**
         * 缩放比例，范围5~18，默认为18
         */
        scale?: number;
        /**
         * 位置名称
         */
        name?: string;
        /**
         * 地址的详细说明
         */
        address?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface MapContext {
        /**
         * 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 uni.openLocation
         */
        getCenterLocation(options: MapContextGetCenterLocationOptions): void;
        /**
         * 将地图中心移动到当前定位点，需要配合map组件的show-location使用
         */
        moveToLocation(options: MapContextMoveToLocationOptions): void;
        /**
         * 平移marker，带动画
         */
        translateMarker(options: MapContextTranslateMarkerOptions): void;
        /**
         * 缩放视野展示所有经纬度
         */
        includePoints(options: MapContextIncludePointsOptions): void;
        /**
         * 获取当前地图的视野范围
         */
        getRegion(options: MapContextGetRegionOptions): void;
        /**
         * 获取当前地图的缩放级别
         */
        getScale(options: MapContextGetScaleOptions): void;
        /**
         * 获取原生地图对象 plus.maps.Map
         */
        $getAppMap(): any;
    }

    interface MapContextGetCenterLocationOptions {
        /**
         * 接口调用成功的回调函数 ，res = { longitude: "经度", latitude: "纬度"}
         */
        success?: (result: LocationObject) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface MapContextMoveToLocationOptions {
        /**
         * 纬度，浮点数，范围为-90~90，负数表示南纬
         */
        latitude?: number;
        /**
         * 经度，范围为-180~180，负数表示西经
         */
        longitude?: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface LocationObject {
        /**
         * 纬度，浮点数，范围为-90~90，负数表示南纬
         */
        latitude: number;
        /**
         * 经度，范围为-180~180，负数表示西经
         */
        longitude: number;
    }

    interface MapContextTranslateMarkerOptions {
        /**
         * 指定marker
         */
        markerId: number;
        /**
         * 指定marker移动到的目标点
         */
        destination: LocationObject;
        /**
         * 移动过程中是否自动旋转marker
         */
        autoRotate?: boolean;
        /**
         * marker的旋转角度
         */
        rotate?: number;
        /**
         * 动画持续时长，默认值1000ms，平移与旋转分别计算
         */
        duration?: number;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 动画结束回调函数
         */
        animationEnd: (result: any) => void;
    }

    interface MapContextIncludePointsOptions {
        /**
         * 要显示在可视区域内的坐标点列表，[{latitude, longitude}]
         */
        points: LocationObject [];
        /**
         * 坐标点形成的矩形边缘到地图边缘的距离，单位像素。格式为[上,右,下,左]，安卓上只能识别数组第一项，上下左右的padding一致。开发者工具暂不支持padding参数。
         */
        padding?: number [];
    }

    interface MapContextGetRegionOptions {
        /**
         * 接口调用成功的回调函数，res = {southwest, northeast}，西南角与东北角的经纬度
         */
        success?: (result: MapContextGetRegionResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface MapContextGetRegionResult {
        /**
         * 西南角的经纬度
         */
        southwest: LocationObject;
        /**
         * 东北角的经纬度
         */
        northeast: LocationObject;
    }

    interface MapContextGetScaleOptions {
        /**
         * 接口调用成功的回调函数，res = {scale}
         */
        success?: (result: MapContextGetScaleResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface MapContextGetScaleResult {
        /**
         * 地图缩放级别
         */
        scale: number;
    }

    interface GetSystemInfoOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetSystemInfoResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetSystemInfoResult {
        /**
         * 手机品牌。H5 不支持
         */
        brand?: string;
        /**
         * 手机型号
         */
        model: string;
        /**
         * 设备像素比
         */
        pixelRatio: number;
        /**
         * 屏幕宽度
         */
        screenWidth: number;
        /**
         * 屏幕高度
         */
        screenHeight: number;
        /**
         * 可使用窗口宽度
         */
        windowWidth: number;
        /**
         * 可使用窗口高度
         */
        windowHeight: number;
        /**
         * 状态栏的高度
         */
        statusBarHeight?: number;
        /**
         * 导航栏的高度
         */
        navigationBarHeight?: number;
        /**
         * 标题栏高度
         */
        titleBarHeight?: number;
        /**
         * 程序设置的语言
         */
        language?: string;
        /**
         * 引擎版本号
         */
        version: string;
        /**
         * 设备磁盘容量
         */
        storage?: string;
        /**
         * 当前电量百分比
         */
        currentBattery?: string;
        /**
         * App平台
         */
        AppPlatform?: string;
        /**
         * 宿主平台
         */
        host?: string;
        /**
         * 当前运行的客户端
         */
        app?: string;
        /**
         * 客户端基础库版本
         */
        SDKVersion: string;
        /**
         * 宿主平台版本号
         */
        swanNativeVersion?: string;
        /**
         * 操作系统版本
         */
        system: string;
        /**
         * 客户端平台
         */
        platform: string;
        /**
         * 用户字体大小设置
         */
        fontSizeSetting?: number;
        /**
         * 可使用窗口的顶部位置
         */
        windowTop: number;
        /**
         * 可使用窗口的底部位置
         */
        windowBottom: number;
        /**
         * 允许微信使用相册的开关（仅 iOS 有效）
         */
        albumAuthorized?: boolean;
        /**
         * 允许微信使用摄像头的开关
         */
        cameraAuthorized?: boolean;
        /**
         * 允许微信使用定位的开关
         */
        locationAuthorized?: boolean;
        /**
         * 允许微信使用麦克风的开关
         */
        microphoneAuthorized?: boolean;
        /**
         * 允许微信通知的开关
         */
        notificationAuthorized?: boolean;
        /**
         * 允许微信通知带有提醒的开关（仅 iOS 有效）
         */
        notificationAlertAuthorized?: boolean;
        /**
         * 允许微信通知带有标记的开关（仅 iOS 有效）
         */
        notificationBadgeAuthorized?: boolean;
        /**
         * 允许微信通知带有声音的开关（仅 iOS 有效）
         */
        notificationSoundAuthorized?: boolean;
        /**
         * 蓝牙的系统开关
         */
        bluetoothEnabled?: boolean;
        /**
         * 地理位置的系统开关
         */
        locationEnabled?: boolean;
        /**
         * Wi-Fi 的系统开关
         */
        wifiEnabled?: boolean;
        /**
         * 在竖屏正方向下的安全区域
         */
        safeArea?: SafeArea;
        /**
         * 在竖屏正方向下的安全区域插入位置
         */
        safeAreaInsets?: SafeAreaInsets;
        /**
         * 上一次缓存的位置信息
         */
        cacheLocation?: any;
        /**
         * 设备 ID
         */
        deviceId: string;
        /**
         * 设备品牌。如：`apple`、`huawei`。H5 不支持
         */
        deviceBrand?: string;
        /**
         * 设备型号
         */
        deviceModel: string;
        /**
         * 设备类型。`phone`、`pad`、`pc`
         */
        deviceType: string;
        /**
         * uni-app 运行平台。如：`app`、`mp-weixin`、`web`
         */
        uniPlatform: string;
        /**
         * uni 编译器版本号
         */
        uniCompileVersion: string;
        /**
         * uni 运行时版本
         */
        uniRuntimeVersion: string;
        /**
         * `manifest.json` 中应用appid。
         */
        appId: string;
        /**
         * `manifest.json` 中应用名称。和`字节跳动小程序、飞书小程序`字段冲突，原字端与`hostName`一致
         */
        appName: string;
        /**
         * `manifest.json` 中应用版本名称。
         */
        appVersion: string;
        /**
         * `manifest.json` 中应用版本名号
         */
        appVersionCode: string;
        /**
         * 用户标识。小程序端为空
         */
        ua: string;
        /**
         * 浏览器名称。`App` 端是系统 webview 的名字，比如 wkwebview、chrome。小程序端为空
         */
        browserName: string;
        /**
         * 浏览器版本、webview 版本。小程序端为空
         */
        browserVersion: string;
        /**
         * ios、android、windows、mac、linux
         */
        osName: string;
        /**
         * 操作系统版本。如 ios 版本，andriod 版本
         */
        osVersion: string;
        /**
         * 操作系统语言，小程序端与 `version` 相同，H5 与浏览器语言一致
         */
        osLanguage?: string;
        /**
         * |操作系统主题 light、dark。小程序端为小程序主题，H5 端为空
         */
        osTheme?: string;
        /**
         * 应用设置的语言。仅 App、H5 支持
         */
        appLanguage?: string;
        /**
         * 用户字体大小设置
         */
        hostFontSizeSetting?: number;
        /**
         * 客户端基础库版本
         */
        hostSDKVersion?: string;
        /**
         * 设备像素比
         */
        devicePixelRatio: number;
        /**
         * 设备方向。如：`竖屏 portrait`、`横屏 landscape`
         * - portrait: 竖屏
         * - landscape: 横屏
         */
        deviceOrientation: 'portrait' | 'landscape';
        /**
         * rom 名称。Android 部分机型获取不到值。iOS 恒为 `ios`
         */
        romName?: string;
        /**
         * rom 版本号。Android 部分机型获取不到值。iOS 恒为 `ios 版本号`
         */
        romVersion?: string;
        /**
         * App、小程序宿主名称，如：`WeChat`、`FeiShu`、`alipay`、`DINGTALK`。H5 不支持
         */
        hostName?: string;
        /**
         * App、小程序宿主版本。如：微信版本号。H5 不支持
         */
        hostVersion?: string;
        /**
         * 小程序宿主语言、app 语言
         */
        hostLanguage?: string;
        /**
         * App 主题 `light`、`dark`。H5 端为空，小程序端为系统当前主题
         */
        hostTheme?: string;
        /**
         * 小程序宿主包名。仅 App 支持，其他平台为空
         */
        hostPackageName?: string;
        /**
         * 系统当前主题，取值为light或dark。仅微信小程序支持
         */
        theme?: string;
    }

    interface GetWindowInfoResult {
        /**
         * 设备像素比
         */
        pixelRatio: number;
        /**
         * 屏幕宽度
         */
        screenWidth: number;
        /**
         * 屏幕高度
         */
        screenHeight: number;
        /**
         * 可使用窗口宽度
         */
        windowWidth: number;
        /**
         * 可使用窗口高度
         */
        windowHeight: number;
        /**
         * 状态栏的高度
         */
        statusBarHeight: number;
        /**
         * 可使用窗口的顶部位置
         */
        windowTop: number;
        /**
         * 可使用窗口的底部位置
         */
        windowBottom: number;
        /**
         * 在竖屏正方向下的安全区域
         */
        safeArea: SafeArea;
        /**
         * 在竖屏正方向下的安全区域插入位置
         */
        safeAreaInsets: SafeAreaInsets;
        /**
         * 窗口上边缘的 y 值
         */
        screenTop: number;
    }

    interface GetDeviceInfoResult {
        /**
         * 设备品牌。如：`apple`、`huawei`。H5 不支持
         */
        deviceBrand?: string;
        /**
         * 设备型号
         */
        deviceModel: string;
        /**
         * 设备 ID
         */
        deviceId: string;
        /**
         * 设备类型。`phone`、`pad`、`pc`
         */
        deviceType: string;
        /**
         * 设备像素比
         */
        devicePixelRatio: number;
        /**
         * 设备方向。如：`竖屏 portrait`、`横屏 landscape`
         * - portrait: 竖屏
         * - landscape: 横屏
         */
        deviceOrientation: 'portrait' | 'landscape';
        /**
         * 手机品牌。H5 不支持
         */
        brand?: string;
        /**
         * 手机型号
         */
        model: string;
        /**
         * 操作系统版本
         */
        system: string;
        /**
         * 客户端平台
         */
        platform: string;
    }

    interface GetAppBaseInfoResult {
        /**
         * `manifest.json` 中应用appid。
         */
        appId: string;
        /**
         * `manifest.json` 中应用名称。和`字节跳动小程序、飞书小程序`字段冲突，原字端与`hostName`一致
         */
        appName: string;
        /**
         * `manifest.json` 中应用版本名称。
         */
        appVersion: string;
        /**
         * `manifest.json` 中应用版本名号
         */
        appVersionCode: string;
        /**
         * 程序设置的语言
         */
        language: string;
        /**
         * 引擎版本号
         */
        version: string;
        /**
         * App、小程序宿主名称，如：`WeChat`、`FeiShu`、`alipay`、`DINGTALK`。H5 端为浏览器名称
         */
        hostName?: string;
        /**
         * App、小程序宿主版本。如：微信版本号。H5 端为浏览器版本
         */
        hostVersion?: string;
        /**
         * 浏览器语言、小程序宿主语言、app 语言
         */
        hostLanguage?: string;
        /**
         * App 主题 `light`、`dark`。H5 端为空，小程序端为系统当前主题
         */
        hostTheme?: string;
        /**
         * 小程序宿主包名。仅 App 支持，其他平台为空
         */
        hostPackageName?: string;
        /**
         * 系统当前主题，取值为light或dark。仅微信小程序支持
         */
        theme?: string;
        /**
         * 客户端基础库版本。仅支付宝小程序不支持
         */
        SDKVersion: string;
        /**
         * 是否已打开调试本。仅微信小程序支持
         */
        enableDebug: boolean;
        /**
         * 当前小程序运行的宿主环境。仅微信小程序支持
         */
        host?: string;
        /**
         * 应用设置的语言。仅 App、H5 支持
         */
        appLanguage?: string;
        /**
         * 用户字体大小设置
         */
        hostFontSizeSetting?: number;
        /**
         * 客户端基础库版本
         */
        hostSDKVersion?: string;
    }

    interface SafeArea {
        /**
         * 安全区域左上角横坐标
         */
        left: number;
        /**
         * 安全区域右下角横坐标
         */
        right: number;
        /**
         * 安全区域左上角纵坐标
         */
        top: number;
        /**
         * 安全区域右下角纵坐标
         */
        bottom: number;
        /**
         * 安全区域的宽度，单位逻辑像素
         */
        width: number;
        /**
         * 安全区域的高度，单位逻辑像素
         */
        height: number;
    }

    interface SafeAreaInsets {
        /**
         * 安全区域左侧插入位置
         */
        left: number;
        /**
         * 安全区域右侧插入位置
         */
        right: number;
        /**
         * 安全区顶部插入位置
         */
        top: number;
        /**
         * 安全区域底部插入位置
         */
        bottom: number;
    }

    interface GetNetworkTypeOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetNetworkTypeSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetNetworkTypeSuccess {
        /**
         * 网络类型
         */
        networkType: string;
    }

    interface OnNetworkStatusChangeSuccess {
        /**
         * 当前是否有网络连接
         */
        isConnected: boolean;
        /**
         * 网络类型
         */
        networkType: string;
    }

    interface OnKeyboardHeightChangeResult {
        /**
         * 键盘高度
         */
        height: number;
    }

    interface OnAccelerometerChangeSuccess {
        /**
         * X 轴
         */
        x: number;
        /**
         * Y 轴
         */
        y: number;
        /**
         * Z 轴
         */
        z: number;
    }

    interface StartAccelerometerOptions {
        /**
         * interval
         * - game: 适用于更新游戏的回调频率，在 20ms/次 左右
         * - ui: 适用于更新游戏的回调频率，在 20ms/次 左右
         * - normal: 普通的回调频率，在 200ms/次 左右
         */
        interval?: 'game' | 'ui' | 'normal';
        /**
         * 成功返回的回调函数
         */
        success?: (result: any) => void;
        /**
         * 失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StopAccelerometerOptions {
        /**
         * 成功返回的回调函数
         */
        success?: (result: any) => void;
        /**
         * 失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface OnCompassChangeSuccess {
        /**
         * 面对的方向度数
         */
        direction: number;
    }

    interface StartCompassOptions {
        /**
         * 成功返回的回调函数
         */
        success?: (result: any) => void;
        /**
         * 失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StopCompassOptions {
        /**
         * 成功返回的回调函数
         */
        success?: (result: any) => void;
        /**
         * 失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface MakePhoneCallOptions {
        /**
         * 需要拨打的电话号码
         */
        phoneNumber: string;
        /**
         * 成功返回的回调函数
         */
        success?: (result: any) => void;
        /**
         * 失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ScanCodeOptions {
        /**
         * 是否只能从相机扫码，不允许从相册选择图片
         */
        onlyFromCamera?: boolean;
        /**
         * 扫码类型，参数类型是数组，二维码是'qrCode'，一维码是'barCode'，DataMatrix是‘datamatrix’，pdf417是‘pdf417’。
         */
        scanType?: any [];
        /**
         * 自动解码字符集，默认 false。可取值：false - 将二维码解码数据当做utf-8字符集处理，对于非utf-8字符集数据可能会出现乱码。true - 自动检测二维码解码数据，兼容处理utf-8、GBK、Big5编码格式的字符。仅App端支持
         */
        autoDecodeCharSet?: boolean;
        /**
         * 是否启用声音，可选值：none、default，默认 none。仅App端支持
         * - none: 扫描成功不播放声音
         * - default: 扫描成功播放声音
         */
        sound?: 'none' | 'default';
        /**
         * 成功返回的回调函数
         */
        success?: (result: ScanCodeSuccessRes) => void;
        /**
         * 失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ScanCodeSuccessRes {
        /**
         * 所扫码的内容
         */
        result: string;
        /**
         * 所扫码的类型
         */
        scanType: string;
        /**
         * 所扫码的字符集
         */
        charSet: string;
        /**
         * 当所扫的码为当前应用的合法二维码时，会返回此字段，内容为二维码携带的 path。
         */
        path: string;
    }

    interface SetClipboardDataOptions {
        /**
         * 需要设置的内容
         */
        data: string;
        /**
         * 是否弹出提示，默认弹出提示
         */
        showToast?: boolean;
        /**
         * 成功返回的回调函数
         */
        success?: (result: any) => void;
        /**
         * 失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetClipboardDataOptions {
        /**
         * 成功返回的回调函数
         */
        success?: (result: GetClipboardDataSuccessRes) => void;
        /**
         * 失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetClipboardDataSuccessRes {
        /**
         * 剪贴板的内容
         */
        data: string;
    }

    interface OpenBluetoothAdapterOptions {
        /**
         * 成功则返回成功初始化信息
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface CloseBluetoothAdapterOptions {
        /**
         * 成功则返回成功关闭模块信息
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetBluetoothAdapterStateOptions {
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success?: (result: GetBluetoothAdapterStateSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetBluetoothAdapterStateSuccess {
        /**
         * 是否正在搜索设备
         */
        discovering: boolean;
        /**
         * 蓝牙适配器是否可用
         */
        available: boolean;
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string;
    }

    interface OnBluetoothAdapterStateChangeResult {
        /**
         * 是否正在搜索设备
         */
        discovering: boolean;
        /**
         * 蓝牙适配器是否可用
         */
        available: boolean;
    }

    interface OnBluetoothDeviceFoundResult {
        /**
         * 设备列表信息
         */
        devices: BluetoothDeviceInfo [];
    }

    interface StartBluetoothDevicesDiscoveryOptions {
        /**
         * 蓝牙设备主 service 的 uuid 列表
         */
        services?: any [];
        /**
         * 是否允许重复上报同一设备， 如果允许重复上报，则onDeviceFound 方法会多次上报同一设备，但是 RSSI 值会有不同
         */
        allowDuplicatesKey?: boolean;
        /**
         * 上报设备的间隔，默认为0，意思是找到新设备立即上报，否则根据传入的间隔上报
         */
        interval?: number;
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StopBluetoothDevicesDiscoveryOptions {
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success?: (result: StopBluetoothDevicesDiscoverySuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StopBluetoothDevicesDiscoverySuccess {
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string;
    }

    interface GetBluetoothDevicesOptions {
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success?: (result: GetBluetoothDevicesSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetBluetoothDevicesSuccess {
        /**
         * uuid 对应的的已连接设备列表
         */
        devices: BluetoothDeviceInfo [];
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string;
    }

    interface BluetoothDeviceInfo {
        /**
         * 蓝牙设备名称，某些设备可能没有
         */
        name: string;
        /**
         * 用于区分设备的 id
         */
        deviceId: string;
        /**
         * 当前蓝牙设备的信号强度
         */
        RSSI: number;
        /**
         * 当前蓝牙设备的广播数据段中的ManufacturerData数据段 （注意：vConsole 无法打印出 ArrayBuffer 类型数据）
         */
        advertisData: any [];
        /**
         * 当前蓝牙设备的广播数据段中的ServiceUUIDs数据段
         */
        advertisServiceUUIDs: any [];
        /**
         * 当前蓝牙设备的广播数据段中的LocalName数据段
         */
        localName: string;
        /**
         * 当前蓝牙设备的广播数据段中的ServiceData数据段
         */
        serviceData: any [];
    }

    interface GetConnectedBluetoothDevicesOptions {
        /**
         * 蓝牙设备主 service 的 uuid 列表
         */
        services: any [];
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success?: (result: GetConnectedBluetoothDevicesSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetConnectedBluetoothDevicesSuccess {
        /**
         * 搜索到的设备列表
         */
        devices: GetConnectedBluetoothDevicesSuccessData [];
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string;
    }

    interface GetConnectedBluetoothDevicesSuccessData {
        /**
         * 蓝牙设备名称，某些设备可能没有
         */
        name: string;
        /**
         * 用于区分设备的 id
         */
        deviceId: string;
    }

    interface CloseBLEConnectionOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string;
    }

    interface CreateBLEConnectionOptions {
        /**
         * 蓝牙设备 id，参考 getDevices 接口
         */
        deviceId: string;
        /**
         * 超时时间
         */
        timeout?: number;
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface OnBLEConnectionStateChangeSuccess {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string;
        /**
         * 连接目前的状态
         */
        connected: boolean;
    }

    interface GetBLEDeviceServicesOptions {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string;
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success?: (result: GetBLEDeviceServicesSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetBLEDeviceServicesSuccess {
        /**
         * 设备服务列表
         */
        services: GetBLEDeviceServicesSuccessData [];
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string;
    }

    interface GetBLEDeviceServicesSuccessData {
        /**
         * 蓝牙设备服务的 uuid
         */
        uuid: string;
        /**
         * 该服务是否为主服务
         */
        isPrimary: boolean;
    }

    interface GetBLEDeviceCharacteristicsOptions {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string;
        /**
         * 蓝牙服务 uuid
         */
        serviceId: string;
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success?: (result: GetBLEDeviceCharacteristicsSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetBLEDeviceCharacteristicsSuccess {
        /**
         * 设备特征值列表
         */
        characteristics: GetBLEDeviceCharacteristicsSuccessData [];
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string;
    }

    interface GetBLEDeviceCharacteristicsSuccessData {
        /**
         * 蓝牙设备服务的 uuid
         */
        uuid: string;
        /**
         * 该特征值支持的操作类型
         */
        properties: any;
    }

    interface ReadBLECharacteristicValueOptions {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string;
        /**
         * 蓝牙特征值对应服务的 uuid
         */
        serviceId: string;
        /**
         * 蓝牙特征值的 uuid
         */
        characteristicId: string;
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success?: (result: ReadBLECharacteristicValueSuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ReadBLECharacteristicValueSuccess {
        /**
         * 错误码
         */
        errCode: string;
        /**
         * 成功：ok，错误：详细信息
         */
        errMsg: string;
    }

    interface WriteBLECharacteristicValueOptions {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string;
        /**
         * 蓝牙特征值对应服务的 uuid
         */
        serviceId: string;
        /**
         * 蓝牙特征值的 uuid
         */
        characteristicId: string;
        /**
         * 蓝牙设备特征值对应的二进制值
         */
        value: any [];
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success?: (result: StopBluetoothDevicesDiscoverySuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface NotifyBLECharacteristicValueChangeOptions {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string;
        /**
         * 蓝牙特征值对应服务的 uuid
         */
        serviceId: string;
        /**
         * 蓝牙特征值的 uuid
         */
        characteristicId: string;
        /**
         * true: 启用 notify; false: 停用 notify
         */
        state: boolean;
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success?: (result: StopBluetoothDevicesDiscoverySuccess) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface OnBLECharacteristicValueChangeSuccess {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string;
        /**
         * 蓝牙特征值对应服务的 uuid
         */
        serviceId: string;
        /**
         * 蓝牙特征值的 uuid
         */
        characteristicId: string;
        /**
         * 特征值最新的值 （注意：vConsole 无法打印出 ArrayBuffer 类型数据）
         */
        value: any [];
    }

    interface StartBeaconDiscoveryOptions {
        /**
         * iBeacon设备广播的 uuids
         */
        uuids: any [];
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StopBeaconDiscoveryOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SetBLEMTUOptions {
        /**
         * 用于区分设备的 id
         */
        deviceId: string;
        /**
         * 最大传输单元(22,512) 区间内，单位 bytes
         */
        mtu: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetBLEDeviceRSSIOptions {
        /**
         * 蓝牙设备 id
         */
        deviceId: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetBeaconsOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetBeaconsRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetBeaconsRes {
        /**
         * 接口调用成功的回调函数
         */
        beacons: Beacon [];
        /**
         * 调用结果
         */
        errMsg: string;
    }

    interface Beacon {
        /**
         * iBeacon 设备广播的 uuid
         */
        uuid: string;
        /**
         * iBeacon 设备的主 id
         */
        major: string;
        /**
         * iBeacon 设备的次 id
         */
        minor: string;
        /**
         * 表示设备距离的枚举值
         */
        proximity: number;
        /**
         * iBeacon 设备的距离
         */
        accuracy: number;
        /**
         * 表示设备的信号强度
         */
        rssi: number;
    }

    interface BeaconService {
        /**
         * 服务目前是否可用
         */
        available: boolean;
        /**
         * 目前是否处于搜索状态
         */
        discovering: boolean;
    }

    interface GetHCEStateOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StartHCEOptions {
        /**
         * 需要注册到系统的 AID 列表，每个 AID 为 String 类型
         */
        aid_list: any [];
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StopHCEOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface HCEMessageRes {
        /**
         * 消息类型
         */
        messageType: number;
        /**
         * 客户端接收到 NFC 设备的指令
         */
        data: any [];
        /**
         * 此参数当且仅当 messageType=2 时有效
         */
        reason: number;
    }

    interface SendHCEMessageOptions {
        /**
         * 二进制数据
         */
        data: any [];
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StartWifiOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StopWifiOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ConnectWifiOptions {
        /**
         * Wi-Fi 设备ssid
         */
        SSID: string;
        /**
         * Wi-Fi 设备bssid
         */
        BSSID?: string;
        /**
         * Wi-Fi 设备密码
         */
        password?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetWifiListOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface WiFi {
        /**
         * Wi-Fi 的SSID
         */
        SSID: string;
        /**
         * Wi-Fi 的BSSID
         */
        BSSID: string;
        /**
         * Wi-Fi 是否安全
         */
        secure: boolean;
        /**
         * Wi-Fi 信号强度
         */
        signalStrength: number;
    }

    interface SetWifiListOptions {
        /**
         * Wi-Fi 的SSID
         */
        wifiList: WiFiItem [];
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface WiFiItem {
        /**
         * Wi-Fi 的SSID
         */
        SSID: string;
        /**
         * Wi-Fi 的BSSID
         */
        BSSID: string;
        /**
         * Wi-Fi 设备密码
         */
        password: string;
    }

    interface GetConnectedWifiOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetConnectedWifiRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetConnectedWifiRes {
        /**
         * 接口调用成功的回调函数
         */
        wifi: WiFi;
    }

    interface ShowToastOptions {
        /**
         * 提示的内容
         */
        title?: string;
        /**
         * 图标
         * - success: 显示成功图标
         * - loading: 显示加载图标
         * - error: 显示错误图标
         * - none: 不显示图标
         */
        icon?: 'success' | 'loading' | 'error' | 'none';
        /**
         * 自定义图标的本地路径，image 的优先级高于 icon
         */
        image?: string;
        /**
         * 提示的延迟时间，单位毫秒，默认：1500
         */
        duration?: number;
        /**
         * 纯文本轻提示显示位置，填写有效值后只有 title 属性生效
         * - top: 居上显示
         * - center: 居中显示
         * - bottom: 居底显示
         */
        position?: 'top' | 'center' | 'bottom';
        /**
         * 是否显示透明蒙层，防止触摸穿透，默认：false
         */
        mask?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ShowLoadingOptions {
        /**
         * 提示的内容
         */
        title?: string;
        /**
         * 是否显示透明蒙层，防止触摸穿透，默认：false
         */
        mask?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ShowModalOptions {
        /**
         * 提示的标题
         */
        title?: string;
        /**
         * 提示的内容
         */
        content?: string;
        /**
         * 是否显示取消按钮，默认为 true
         */
        showCancel?: boolean;
        /**
         * 取消按钮的文字，默认为"取消"
         */
        cancelText?: string;
        /**
         * 取消按钮的文字颜色，默认为"#000000"
         */
        cancelColor?: string;
        /**
         * 确定按钮的文字，默认为"确定"
         */
        confirmText?: string;
        /**
         * 确定按钮的文字颜色，默认为"#3CC51F"
         */
        confirmColor?: string;
        /**
         * 是否显示输入框
         */
        editable?: boolean;
        /**
         * 显示输入框时的提示文本
         */
        placeholderText?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: ShowModalRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ShowModalRes {
        /**
         * 为 true 时，表示用户点击了确定按钮
         */
        confirm: boolean;
        /**
         * 为 true 时，表示用户点击了取消
         */
        cancel: boolean;
        /**
         * editable 为 true 时，用户输入的文本
         */
        content?: string;
    }

    interface ShowActionSheetOptions {
        /**
         * 警示文案（已废弃，请改用 alertText）
         */
        title?: string;
        /**
         * 警示文案
         */
        alertText?: string;
        /**
         * 按钮的文字数组
         */
        itemList: any [];
        /**
         * 按钮的文字颜色，默认为"#000000"
         */
        itemColor?: string;
        /**
         * 大屏设备弹出原生选择按钮框的指示区域，默认居中显示
         */
        popover?: ShowActionPopover;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: ShowActionSheetRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ShowActionSheetRes {
        /**
         * 用户点击的按钮，从上到下的顺序，从0开始
         */
        tapIndex: number;
    }

    interface ShowActionPopover {
        /**
         * 指示区域坐标，使用原生 navigationBar 时一般需要加上 navigationBar 的高度
         */
        top?: number;
        /**
         * 指示区域坐标
         */
        left?: number;
        /**
         * 指示区域宽度
         */
        width?: number;
        /**
         * 指示区域高度
         */
        height?: number;
    }

    interface SetNavigationBarTitleOptions {
        /**
         * 页面标题
         */
        title: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SetNavigationbarColorOptions {
        /**
         * 前景颜色值，包括按钮、标题、状态栏的颜色
         */
        frontColor?: string;
        /**
         * 背景颜色值，有效值为十六进制颜色
         */
        backgroundColor?: string;
        /**
         * 动画效果
         */
        animation?: NavigationBarAnimation;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SetTabBarBadgeOptions {
        /**
         * tabBar的哪一项，从左边算起，索引从0开始
         */
        index: number;
        /**
         * 显示的文本，不超过 3 个半角字符
         */
        text: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface RemoveTabBarBadgeOptions {
        /**
         * tabBar的哪一项，从左边算起，索引从0开始
         */
        index: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ShowTabBarRedDotOptions {
        /**
         * tabBar的哪一项，从左边算起，索引从0开始
         */
        index: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface HideTabBarRedDotOptions {
        /**
         * tabBar的哪一项，从左边算起，索引从0开始
         */
        index: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface NavigationBarAnimation {
        /**
         * 动画变化时间，默认0，单位：毫秒
         */
        duration: number;
        /**
         * 动画变化方式，默认 linear
         * - linear: 动画从头到尾的速度是相同的
         * - easeIn: 动画以低速开始
         * - easeOut: 动画以低速结束
         * - easeInOut: 动画以低速开始和结束
         */
        timingFunc: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
    }

    interface WindowResizeResult {
        /**
         * 变化后的窗口的大小，单位为 px ，{windowWidth,windowHeight}
         */
        size: WindowResizeResultSize;
        /**
         * 变化后的设备方向
         * - landscape: undefined
         * - portrait: undefined
         */
        deviceOrientation: 'landscape' | 'portrait';
    }

    interface WindowResizeResultSize {
        /**
         * 变化后的窗口宽度，单位 px
         */
        windowWidth: number;
        /**
         * 变化后的窗口高度，单位 px
         */
        windowHeight: number;
    }

    interface SetTabBarBadgeOptions {
        /**
         * tabBar的哪一项，从左边算起，索引从0开始
         */
        index: number;
        /**
         * 显示的文本
         */
        text: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface RemoveTabBarBadgeOptions {
        /**
         * tabBar的哪一项，从左边算起，索引从0开始
         */
        index: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ShowTabBarRedDotOptions {
        /**
         * tabBar的哪一项，从左边算起，索引从0开始
         */
        index: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface HideTabBarRedDotOptions {
        /**
         * tabBar的哪一项，从左边算起，索引从0开始
         */
        index: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SetTabBarStyleOptions {
        /**
         * tab 上的文字默认颜色
         */
        color?: string;
        /**
         * tab 上的文字选中时的颜色
         */
        selectedColor?: string;
        /**
         * tab 的背景色
         */
        backgroundColor?: string;
        /**
         * 图片背景
         */
        backgroundImage?: string;
        /**
         * 背景图平铺方式
         * - repeat: 背景图片在垂直方向和水平方向平铺
         * - repeat-x: 背景图片在水平方向平铺，垂直方向拉伸
         * - repeat-y: 背景图片在垂直方向平铺，水平方向拉伸
         * - no-repeat: 背景图片在垂直方向和水平方向都拉伸
         */
        backgroundRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
        /**
         * tabbar上边框的颜色
         */
        borderStyle?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SetTabBarItemOptions {
        /**
         * tabBar 的哪一项，从左边算起，索引从0开始
         */
        index: number;
        /**
         * tab 上按钮文字
         */
        text?: string;
        /**
         * 图片路径
         */
        iconPath?: string;
        /**
         * 选中时的图片路径
         */
        selectedIconPath?: string;
        /**
         * 页面绝对路径
         */
        pagePath?: string;
        /**
         * 字体图标，优先级高于 iconPath
         */
        iconfont?: SetTabBarItemIconFontOptions;
        /**
         * tab 是否显示
         */
        visible?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SetTabBarItemIconFontOptions {
        /**
         * 字库 Unicode 码
         */
        text: string;
        /**
         * 选中后字库 Unicode 码
         */
        selectedText: string;
        /**
         * 字体图标字号(px)
         */
        fontSize?: string;
        /**
         * 字体图标颜色
         */
        color?: string;
        /**
         * 字体图标选中颜色
         */
        selectedColor?: string;
    }

    interface ShowTabBarOptions {
        /**
         * 是否需要动画效果
         */
        animation?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface HideTabBarOptions {
        /**
         * 是否需要动画效果
         */
        animation?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SetTopBarTextOptions {
        /**
         * 置顶栏文字内容
         */
        text: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface NavigateToOptions {
        /**
         * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数
         */
        url: string;
        /**
         * 窗口显示的动画类型
         * - auto: 自动选择动画效果
         * - none: 无动画效果
         * - slide-in-right: 从右侧横向滑动效果
         * - slide-in-left: 左侧横向滑动效果
         * - slide-in-top: 从上侧竖向滑动效果
         * - slide-in-bottom: 从下侧竖向滑动效果
         * - fade-in: 从透明到不透明逐渐显示效果
         * - zoom-out: 从小到大逐渐放大显示效果
         * - zoom-fade-out: 从小到大逐渐放大并且从透明到不透明逐渐显示效果
         * - pop-in: 从右侧平移入栈动画效果
         */
        animationType?: 'auto' | 'none' | 'slide-in-right' | 'slide-in-left' | 'slide-in-top' | 'slide-in-bottom' | 'fade-in' | 'zoom-out' | 'zoom-fade-out' | 'pop-in';
        /**
         * 窗口显示动画的持续时间，单位为 ms
         */
        animationDuration?: number;
        /**
         * 页面间通信接口，用于监听被打开页面发送到当前页面的数据
         */
        events?: any;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface RedirectToOptions {
        /**
         * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数
         */
        url: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ReLaunchOptions {
        /**
         * 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数
         */
        url: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SwitchTabOptions {
        /**
         * 需要跳转的 tabBar 页面的路径，路径后不能带参数
         */
        url: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface PreloadPageOptions {
        /**
         * 预加载页面的路径
         */
        url: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface UnPreloadPageOptions {
        /**
         * 需要跳转的 tabBar 页面的路径，路径后不能带参数
         */
        url: string;
    }

    interface CreateIntersectionObserverOptions {
        /**
         * 所有阈值
         */
        thresholds?: any [];
        /**
         * 初始的相交比例
         */
        initialRatio?: number;
        /**
         * 是否同时观测多个参照节点（而非一个）
         */
        observeAll?: boolean;
    }

    interface NavigateBackOptions {
        /**
         * 返回的页面数，如果 delta 大于现有页面数，则返回到首页
         */
        delta?: number;
        /**
         * 窗口关闭的动画类型
         * - auto: 自动选择动画效果
         * - none: 无动画效果
         * - slide-out-right: 横向向右侧滑出屏幕动画
         * - slide-out-left: 横向向左侧滑出屏幕动画
         * - slide-out-top: 竖向向上侧滑出屏幕动画
         * - slide-out-bottom: 竖向向下侧滑出屏幕动画
         * - fade-out: 从不透明到透明逐渐隐藏动画
         * - zoom-in: 从大逐渐缩小关闭动画
         * - zoom-fade-in: 从大逐渐缩小并且从不透明到透明逐渐隐藏关闭动画
         * - pop-out: 从右侧平移出栈动画效果
         */
        animationType?: 'auto' | 'none' | 'slide-out-right' | 'slide-out-left' | 'slide-out-top' | 'slide-out-bottom' | 'fade-out' | 'zoom-in' | 'zoom-fade-in' | 'pop-out';
        /**
         * 窗口关闭动画的持续时间，单位为 ms
         */
        animationDuration?: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetLaunchOptionsSyncOptions {
        /**
         * 启动的路径(代码包路径)
         */
        path: string;
        /**
         * 启动时的场景值，具体值含义请查看各平台文档说明。钉钉小程序在 IDE 恒为0000，真机不支持。
         */
        scene: number;
        /**
         * 启动时的 query 参数
         */
        query: any;
        /**
         * 启来源信息。如果没有则返回 `{}`
         */
        referrerInfo: ReferrerInfo;
        /**
         * 应用的渠道标识。仅 App 端支持
         * - qihoo:browser: 360浏览器流应用
         * - qihoo:appstore: 360手机助手流应用
         * - dcloud:streamapps: DCloud流应用基座
         */
        channel?: 'qihoo:browser' | 'qihoo:appstore' | 'dcloud:streamapps';
        /**
         * 应用启动来源。仅 App 端支持
         * - default: 默认启动方式，通常表示应用列表启动（360手助中搜索启动）
         * - scheme: 通过urlscheme方式触发启动
         * - push: 通过点击系统通知方式触发启动
         * - stream: 通过流应用api（plus.stream.open）启动
         * - shortcut: 通过快捷方式启动，iOS平台表示通过3D Touch快捷方式，Android平台表示通过桌面快捷方式启动
         * - barcode: 通过二维码扫描启动
         * - myapp: 通过流应用"我的"应用列表或历史列表中触发启动
         * - favorite: 通过流应用的"收藏"应用列表启动
         * - browser: 通过流应用的内置浏览器导流启动的流应用（地址栏输入url启动应用、点击wap页面链接启动应用）
         * - engines: 通过流应用的浏览器界面作为搜索引擎启动
         * - search: 通过流应用的应用搜索启动应用（如iOS平台的T9键盘搜索）
         * - speech: 通过流应用的语音识别启动应用
         * - uniLink: 通过通用链接（universal link）启动应用
         * - miniProgram: 通过微信小程序启动应用
         */
        launcher?: 'default' | 'scheme' | 'push' | 'stream' | 'shortcut' | 'barcode' | 'myapp' | 'favorite' | 'browser' | 'engines' | 'search' | 'speech' | 'uniLink' | 'miniProgram';
    }

    interface ReferrerInfo {
        /**
         * 来源小程序 appId
         */
        appId: string;
        /**
         * 来源小程序传过来的数据
         */
        extraData: any;
    }

    interface CreateAnimationOptions {
        /**
         * 动画持续时间，单位ms
         */
        duration?: number;
        /**
         * 定义动画的效果
         * - linear: 动画从头到尾的速度是相同的
         * - ease: 动画以低速开始，然后加快，在结束前变慢
         * - ease-in: 动画以低速开始
         * - ease-in-out: 动画以低速开始和结束
         * - ease-out: 动画以低速结束
         * - step-start: 动画第一帧就跳至结束状态直到结束
         * - step-end: 动画一直保持开始状态，最后一帧跳到结束状态
         */
        timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end';
        /**
         * 动画延迟时间，单位 ms
         */
        delay?: number;
        /**
         * 设置transform-origin
         */
        transformOrigin?: string;
    }

    interface PageScrollToOptions {
        /**
         * 滚动到页面的目标位置
         */
        scrollTop?: number;
        /**
         * 选择器
         */
        selector?: string;
        /**
         * 滚动动画的时长
         */
        duration?: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StartPullDownRefreshOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SelectorQuery {
        /**
         * 将选择器的选取范围更改为自定义组件component内
         */
        in(component: any): SelectorQuery;
        /**
         * 在当前页面下选择第一个匹配选择器selector的节点
         */
        select(selector: string): NodesRef;
        /**
         * 在当前页面下选择匹配选择器selector的所有节点
         */
        selectAll(selector: string): NodesRef;
        /**
         * 选择显示区域
         */
        selectViewport(): NodesRef;
        /**
         * 执行所有的请求
         */
        exec(callback?: (result: any) => void): NodesRef;
    }

    interface NodesRef {
        /**
         * 添加节点的布局位置的查询请求，相对于显示区域，以像素为单位
         */
        boundingClientRect(callback: (result: NodeInfo) => void): SelectorQuery;
        /**
         * 添加节点的滚动位置查询请求，以像素为单位
         */
        scrollOffset(callback: (result: NodeInfo) => void): SelectorQuery;
        /**
         * 获取节点的相关信息，需要获取的字段在fields中指定
         */
        fields(fields: NodeField, callback: (result: NodeInfo) => void): SelectorQuery;
        /**
         * 添加节点的 Context 对象查询请求
         */
        context(callback: (result: NodeInfo) => void): SelectorQuery;
        /**
         * 获取 Node 节点实例。目前支持 Canvas 的获取。
         */
        node(callback: (result: any) => void): SelectorQuery;
    }

    interface NodeInfo {
        /**
         * 节点的ID
         */
        id?: string;
        /**
         * 节点的dataset
         */
        dataset?: any;
        /**
         * 节点的左边界坐标
         */
        left?: number;
        /**
         * 节点的右边界坐标
         */
        right?: number;
        /**
         * 节点的上边界坐标
         */
        top?: number;
        /**
         * 节点的下边界坐标
         */
        bottom?: number;
        /**
         * 节点的宽度
         */
        width?: number;
        /**
         * 节点的高度
         */
        height?: number;
        /**
         * 节点的水平滚动位置
         */
        scrollLeft?: number;
        /**
         * 节点的垂直滚动位置
         */
        scrollTop?: number;
        /**
         * 节点的内容高度
         */
        scrollHeight?: number;
        /**
         * 节点的内容宽度
         */
        scrollWidth?: number;
        /**
         * 节点对应的 Context 对象
         */
        context?: MapContext | CanvasContext | VideoContext | EditorContext;
    }

    interface EditorContext {
        /**
         * 修改样式
         */
        format(name: string, value: string): void;
        /**
         * 插入分割线
         */
        insertDivider(): void;
        /**
         * 获取节点的相关信息，需要获取的字段在fields中指定
         */
        insertImage(options: EditorContextInsertImageOptions): void;
        /**
         * 添加节点的 Context 对象查询请求
         */
        insertText(options: EditorContextInsertTextOptions): void;
        /**
         * 初始化编辑器内容，hmlt和delta同时存在时仅delta生效
         */
        setContents(options: EditorContextSetContentsOptions): void;
        /**
         * 初始化编辑器内容，hmlt和delta同时存在时仅delta生效
         */
        getContents(options: EditorContextGetContentsOptions): void;
        /**
         * 初始化编辑器内容，hmlt和delta同时存在时仅delta生效
         */
        clear(options: EditorContextClearOptions): void;
        /**
         * 清除当前选区的样式
         */
        removeFormat(options: EditorContextRemoveFormatOptions): void;
        /**
         * 撤销
         */
        undo(options: EditorContextUndoOptions): void;
        /**
         * 撤销
         */
        redo(options: EditorContextRedoOptions): void;
        /**
         * 编辑器失焦，同时收起键盘。
         */
        blur(options: CommonOptions): void;
        /**
         * 使得编辑器光标处滚动到窗口可视区域内。
         */
        scrollIntoView(options: CommonOptions): void;
        /**
         * 获取编辑器已选区域内的纯文本内容。当编辑器失焦或未选中一段区间时，返回内容为空。
         */
        getSelectionText(options: EditorContextGetSelectionTextOptions): void;
    }

    interface EditorContextInsertImageOptions {
        /**
         * 图片地址
         */
        src: string;
        /**
         * 图像无法显示时的替代文本
         */
        alt?: string;
        /**
         * 图片宽度（pixels/百分比)
         */
        width?: string;
        /**
         * 图片高度 (pixels/百分比)
         */
        height?: string;
        /**
         * 添加到图片 img 标签上的类名
         */
        extClass?: string;
        /**
         * data 被序列化为 name=value;name1=value2 的格式挂在属性 data-custom 上
         */
        data?: any;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface EditorContextInsertTextOptions {
        /**
         * 文本内容
         */
        text: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface EditorContextSetContentsOptions {
        /**
         * 带标签的HTML内容
         */
        html?: string;
        /**
         * 表示内容的delta对象
         */
        delta?: any;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface EditorContextGetContentsOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface EditorContextClearOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface EditorContextRemoveFormatOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface EditorContextUndoOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface EditorContextRedoOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface EditorContextGetSelectionTextOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetSelectionTextSuccessCallbackResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetSelectionTextSuccessCallbackResult {
        /**
         * 纯文本内容
         */
        text: string;
    }

    interface CommonOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface NodeField {
        /**
         * 是否返回节点 id
         */
        id?: boolean;
        /**
         * 是否返回节点 dataset
         */
        dataset?: boolean;
        /**
         * 是否返回节点布局位置（left right top bottom）
         */
        rect?: boolean;
        /**
         * 是否返回节点尺寸（width height）
         */
        size?: boolean;
        /**
         * 是否返回节点的 scrollLeft scrollTop，节点必须是 scroll-view 或者 viewport
         */
        scrollOffset?: boolean;
        /**
         * 指定属性名列表，返回节点对应属性名的当前属性值（只能获得组件文档中标注的常规属性值，id class style 和事件绑定的属性值不可获取）
         */
        properties?: string [];
        /**
         * 指定样式名列表，返回节点对应样式名的当前值
         */
        computedStyle?: string [];
        /**
         * 是否返回节点对应的 Context 对象
         */
        context?: boolean;
    }

    interface IntersectionObserver {
        /**
         * 使用选择器指定一个节点，作为参照区域之一
         */
        relativeTo(selector: string, margins?: any): IntersectionObserver;
        /**
         * 指定页面显示区域作为参照区域之一
         */
        relativeToViewport(margins?: any): IntersectionObserver;
        /**
         * 指定目标节点并开始监听相交状态变化情况
         */
        observe(targetSelector: string, callback: (result: ObserveResult) => void): void;
        /**
         * 停止监听
         */
        disconnect(): void;
    }

    /**
     * 和 UI 相关的 api 在组件 mountd 后执行
     */
    interface MediaQueryObserver {
        /**
         * 开始监听页面 media query 变化情况
         */
        observe(descriptor: DescriptorOptions, callback: (result: MediaQueryObserveResult) => void): void;
        /**
         * 停止监听，回调函数将不再触发
         */
        disconnect(): void;
    }

    interface DescriptorOptions {
        /**
         * 屏幕方向（ landscape 或 portrait ）
         * - landscape:
         * - portrait:
         */
        orientation: 'landscape' | 'portrait';
        /**
         * 页面宽度（ px 为单位）
         */
        width: number;
        /**
         * 页面高度（ px 为单位）
         */
        height: number;
        /**
         * 页面最小宽度（ px 为单位）
         */
        'min-width': number;
        /**
         * 页面最小高度（ px 为单位）
         */
        'min-height': number;
        /**
         * 页面最大宽度（ px 为单位）
         */
        'max-width': number;
        /**
         * 页面最大高度（ px 为单位）
         */
        'max-height': number;
    }

    interface MediaQueryObserveResult {
        /**
         * 页面的当前状态是否满足所指定的 media query
         */
        matches: boolean;
    }

    interface ObserveResult {
        /**
         * 相交比例
         */
        intersectionRatio: number;
        /**
         * 相交区域的边界
         */
        intersectionRect: any;
        /**
         * 目标节点布局区域的边界
         */
        boundingClientRect: ObserveNodeRect;
        /**
         * 参照区域的边界
         */
        relativeRect: ObserveNodeRect;
        /**
         * 相交检测时的时间戳
         */
        time: number;
    }

    interface ObserveNodeRect {
        /**
         * left
         */
        left: number;
        /**
         * right
         */
        right: number;
        /**
         * top
         */
        top: number;
        /**
         * bottom
         */
        bottom: number;
    }

    interface Animation {
        /**
         * 设置透明度
         */
        opacity(value: number): Animation;
        /**
         * 设置背景色
         */
        backgroundColor(color: number): Animation;
        /**
         * 设置宽度
         */
        width(length: number | string): Animation;
        /**
         * 设置高度
         */
        height(length: number | string): Animation;
        /**
         * 设置 top 值
         */
        top(length: number): Animation;
        /**
         * 设置 left 值
         */
        left(length: number): Animation;
        /**
         * 设置 bottom 值
         */
        bottom(length: number): Animation;
        /**
         * 设置 right 值
         */
        right(length: number): Animation;
        /**
         * 从原点顺时针旋转一个角度
         */
        rotate(deg: number): Animation;
        /**
         * 从X轴顺时针旋转一个角度
         */
        rotateX(deg: number): Animation;
        /**
         * 从Y轴顺时针旋转一个角度
         */
        rotateY(deg: number): Animation;
        /**
         * 从Z轴顺时针旋转一个角度
         */
        rotateZ(deg: number): Animation;
        /**
         * 从固定轴顺时针旋转一个角度
         */
        rotate3d(x: number, y: number, z: number, deg: number): Animation;
        /**
         * 缩放
         */
        scale(sx: number, sy: number): Animation;
        /**
         * 缩放X轴
         */
        scaleX(sx: number): Animation;
        /**
         * 缩放Y轴
         */
        scaleY(sy: number): Animation;
        /**
         * 缩放Z轴
         */
        scaleZ(sz: number): Animation;
        /**
         * 缩放
         */
        scale3d(sx: number, sy: number, sz: number): Animation;
        /**
         * 平移变换
         */
        translate(tx: number, ty: number): Animation;
        /**
         * 对X轴平移
         */
        translateX(tx: number): Animation;
        /**
         * 对Y轴平移
         */
        translateY(ty: number): Animation;
        /**
         * 对Z轴平移
         */
        translateZ(tz: number): Animation;
        /**
         * 对X、Y、Z坐标进行平移变换
         */
        translate3d(tx: number, ty: number, tz: number): Animation;
        /**
         * 对X、Y轴坐标进行倾斜
         */
        skew(ax: number, ay: number): Animation;
        /**
         * 对X轴坐标进行倾斜
         */
        skewX(ax: number): Animation;
        /**
         * 对Y轴坐标进行倾斜
         */
        skewY(ay: number): Animation;
        /**
         * 矩阵变形
         */
        matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): Animation;
        /**
         * 矩阵变形
         */
        matrix3d(): Animation;
        /**
         * 表示一组动画完成
         */
        step(options?: CreateAnimationOptions): void;
        /**
         * 导出动画队列
         */
        export(): any;
    }

    interface CanvasContext {
        /**
         * 填充色
         */
        fillStyle: string;
        /**
         * 边框颜色
         */
        strokeStyle: string;
        /**
         * 阴影的模糊级别
         */
        shadowBlur: number;
        /**
         * 阴影的颜色
         */
        shadowColor: string;
        /**
         * 阴影相对于形状在水平方向的偏移
         */
        shadowOffsetX: number;
        /**
         * 阴影相对于形状在竖直方向的偏移
         */
        shadowOffsetY: number;
        /**
         * 线条的宽度
         */
        lineWidth: number;
        /**
         * 线条的端点样式
         * - butt:
         * - round:
         * - square:
         */
        lineCap: 'butt' | 'round' | 'square';
        /**
         * 线条的结束交点样式
         * - bevel:
         * - round:
         * - miter:
         */
        lineJoin: 'bevel' | 'round' | 'miter';
        /**
         * 最大斜接长度
         */
        miterLimit: number;
        /**
         * 透明度
         */
        globalAlpha: number;
        /**
         * 设置要在绘制新形状时应用的合成操作的类型
         */
        globalCompositeOperation: string;
        /**
         * 偏移量
         */
        lineDashOffset: number;
        /**
         * 字体样式
         */
        font: string;
        /**
         * 设置填充色
         */
        setFillStyle(color: string | CanvasGradient): void;
        /**
         * 设置边框颜色
         */
        setStrokeStyle(color: string): void;
        /**
         * 设置阴影样式
         */
        setShadow(offsetX?: number, offsetY?: number, blur?: number, color?: string): void;
        /**
         * 创建一个线性的渐变颜色
         */
        createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
        /**
         * 创建一个圆形的渐变颜色
         */
        createCircularGradient(x: number, y: number, r: number): CanvasGradient;
        /**
         * 创建一个颜色的渐变点
         */
        addColorStop(stop: number, color: string): void;
        /**
         * 设置线条的宽度
         */
        setLineWidth(lineWidth: number): void;
        /**
         * 设置线条的端点样式
         */
        setLineCap(lineCap: 'butt' | 'round' | 'square'): void;
        /**
         * 设置线条的交点样式
         */
        setLineJoin(lineJoin: 'bevel' | 'round' | 'miter'): void;
        /**
         * 设置线条的宽度
         */
        setLineDash(pattern: any [], offset: number): void;
        /**
         * 设置最大斜接长度
         */
        setMiterLimit(miterLimit: number): void;
        /**
         * 创建一个矩形
         */
        rect(x: number, y: number, width: number, height: number): void;
        /**
         * 填充一个矩形
         */
        fillRect(x: number, y: number, width: number, height: number): void;
        /**
         * 画一个矩形(非填充)
         */
        strokeRect(x: number, y: number, width: number, height: number): void;
        /**
         * 清除画布上在该矩形区域内的内容
         */
        clearRect(x: number, y: number, width: number, height: number): void;
        /**
         * 对当前路径中的内容进行填充
         */
        fill(): void;
        /**
         * 画出当前路径的边框
         */
        stroke(): void;
        /**
         * 开始创建一个路径
         */
        beginPath(): void;
        /**
         * 关闭一个路径
         */
        closePath(): void;
        /**
         * 把路径移动到画布中的指定点，不创建线条
         */
        moveTo(x: number, y: number): void;
        /**
         * 增加一个新点，然后创建一条从上次指定点到目标点的线
         */
        lineTo(x: number, y: number): void;
        /**
         * 画一条弧线
         */
        arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise?: boolean): void;
        /**
         * 创建三次方贝塞尔曲线路径
         */
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
        /**
         * 创建二次贝塞尔曲线路径
         */
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
        /**
         * 横纵坐标缩放
         */
        scale(scaleWidth: number, scaleHeight: number): void;
        /**
         * 顺时针旋转当前坐标轴
         */
        rotate(rotate: number): void;
        /**
         * 对当前坐标系的原点(0, 0)进行变换
         */
        translate(x: number, y: number): void;
        /**
         * 从原始画布中剪切任意形状和尺寸
         */
        clip(): void;
        /**
         * 设置字体的字号
         */
        setFontSize(fontSize: number): void;
        /**
         * 在画布上绘制被填充的文本
         */
        fillText(text: string, x: number, y: number, maxWidth?: number): void;
        /**
         * 设置文字的对齐
         */
        setTextAlign(align: 'left' | 'center' | 'right'): void;
        /**
         * 设置文字的水平对齐
         */
        setTextBaseline(textBaseline: 'top' | 'bottom' | 'middle' | 'normal'): void;
        /**
         * 绘制图像到画布
         */
        drawImage(imageResource: string, dx?: number, dy?: number, dWidth?: number, dHeigt?: number, sx?: number, sy?: number, sWidth?: number, sHeight?: number): void;
        /**
         * 设置全局画笔透明度
         */
        setGlobalAlpha(alpha: number): void;
        /**
         * 保存当前的绘图上下文
         */
        save(): void;
        /**
         * 恢复之前保存的绘图上下文
         */
        restore(): void;
        /**
         * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
         */
        draw(reserve?: boolean, callback?: (result: any) => void): void;
        /**
         * 测量文本尺寸信息，目前仅返回文本宽度
         */
        measureText(text: string): CanvasTextMetrics;
        /**
         * 根据控制点和半径绘制圆弧路径
         */
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
        /**
         * 给定的 (x, y) 位置绘制文本描边的方法
         */
        strokeText(text: string, x: number, y: number, maxWidth?: number): void;
        /**
         * 对指定的图像创建模式的方法，可在指定的方向上重复元图像
         */
        createPattern(image: string, repetition: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'): void;
        /**
         * 使用矩阵重新设置（覆盖）当前变换的方法
         */
        setTransform(scaleX: number, skewX: number, skewY: number, scaleY: number, translateX: number, translateY: number): void;
    }

    interface CanvasGradient {
        /**
         * 添加颜色的渐变点
         */
        addColorStop(stop: number, color: string): void;
    }

    interface CanvasTextMetrics {
        /**
         * 文本的宽度
         */
        width: number;
    }

    interface CanvasToTempFilePathOptions {
        /**
         * 画布x轴起点（默认0）
         */
        x?: number;
        /**
         * 画布y轴起点（默认0）
         */
        y?: number;
        /**
         * 画布宽度（默认为canvas宽度-x）
         */
        width?: number;
        /**
         * 画布高度（默认为canvas高度-y）
         */
        height?: number;
        /**
         * 输出图片宽度（默认为 width * 屏幕像素密度）
         */
        destWidth?: number;
        /**
         * 输出图片高度（默认为 height * 屏幕像素密度）
         */
        destHeight?: number;
        /**
         * 画布标识，传入 <canvas/> 的 canvas-id
         */
        canvasId: string;
        /**
         * 目标文件的类型，默认为 'png'
         */
        fileType?: string;
        /**
         * 图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理
         */
        quality?: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: CanvasToTempFilePathRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface CanvasToTempFilePathRes {
        /**
         * 导出生成的图片路径
         */
        tempFilePath: string;
    }

    interface CanvasGetImageDataOptions {
        /**
         * 画布标识，传入 <canvas/> 的 canvas-id
         */
        canvasId: string;
        /**
         * 将要被提取的图像数据矩形区域的左上角 x 坐标
         */
        x?: number;
        /**
         * 将要被提取的图像数据矩形区域的左上角 y 坐标
         */
        y?: number;
        /**
         * 将要被提取的图像数据矩形区域的宽度
         */
        width?: number;
        /**
         * 将要被提取的图像数据矩形区域的高度
         */
        height?: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: CanvasGetImageDataRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface CanvasGetImageDataRes {
        /**
         * 回调信息
         */
        errMsg: string;
        /**
         * 图像数据矩形的宽度
         */
        width: number;
        /**
         * 图像数据矩形的高度
         */
        height: number;
        /**
         * 图像像素点数据，一维数组，每四项表示一个像素点的rgba
         */
        data: any [];
    }

    interface CanvasPutImageDataOptions {
        /**
         * 画布标识，传入 <canvas/> 的 canvas-id
         */
        canvasId: string;
        /**
         * 图像像素点数据，一维数组，每四项表示一个像素点的rgba
         */
        data?: any [];
        /**
         * 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）
         */
        x?: number;
        /**
         * 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）
         */
        y?: number;
        /**
         * 源图像数据矩形区域的宽度
         */
        width?: number;
        /**
         * 源图像数据矩形区域的高度
         */
        height?: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SetScreenBrightnessOptions {
        /**
         * 屏幕亮度值，范围 0~1，0 最暗，1 最亮
         */
        value: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetScreenBrightnessOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetScreenBrightnessSuccessRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetScreenBrightnessSuccessRes {
        /**
         * 屏幕亮度值，范围 0~1，0 最暗，1 最亮。
         */
        value: number;
    }

    interface SetKeepScreenOnOptions {
        /**
         * 是否保持屏幕常亮
         */
        keepScreenOn: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface VibrateLongOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface VibrateShortOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface AddPhoneContactOptions {
        /**
         * 头像本地文件路径
         */
        photoFilePath?: string;
        /**
         * 昵称
         */
        nickName?: string;
        /**
         * 姓氏
         */
        lastName?: string;
        /**
         * 中间名
         */
        middleName?: string;
        /**
         * 名字
         */
        firstName?: string;
        /**
         * 备注
         */
        remark?: string;
        /**
         * 手机号
         */
        mobilePhoneNumber?: string;
        /**
         * 微信号
         */
        weChatNumber?: string;
        /**
         * 联系地址国家
         */
        addressCountry?: string;
        /**
         * 联系地址省份
         */
        addressState?: string;
        /**
         * 联系地址城市
         */
        addressCity?: string;
        /**
         * 联系地址街道
         */
        addressStreet?: string;
        /**
         * 联系地址邮政编码
         */
        addressPostalCode?: string;
        /**
         * 公司
         */
        organization?: string;
        /**
         * 职位
         */
        title?: string;
        /**
         * 工作传真
         */
        workFaxNumber?: string;
        /**
         * 工作电话
         */
        workPhoneNumber?: string;
        /**
         * 公司电话
         */
        hostNumber?: string;
        /**
         * 电子邮件
         */
        email?: string;
        /**
         * 网站
         */
        url?: string;
        /**
         * 工作地址国家
         */
        workAddressCountry?: string;
        /**
         * 工作地址省份
         */
        workAddressState?: string;
        /**
         * 工作地址城市
         */
        workAddressCity?: string;
        /**
         * 工作地址街道
         */
        workAddressStreet?: string;
        /**
         * 工作地址邮政编码
         */
        workAddressPostalCode?: string;
        /**
         * 住宅传真
         */
        homeFaxNumber?: string;
        /**
         * 住宅电话
         */
        homePhoneNumber?: string;
        /**
         * 住宅地址国家
         */
        homeAddressCountry?: string;
        /**
         * 住宅地址省份
         */
        homeAddressState?: string;
        /**
         * 住宅地址城市
         */
        homeAddressCity?: string;
        /**
         * 住宅地址街道
         */
        homeAddressStreet?: string;
        /**
         * 住宅地址邮政编码
         */
        homeAddressPostalCode?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetExtConfigOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetMenuButtonBoundingClientRectRes {
        /**
         * 小程序胶囊菜单按钮的宽度
         */
        width: number;
        /**
         * 小程序胶囊菜单按钮的高度
         */
        height: number;
        /**
         * 小程序胶囊菜单按钮的上边界坐标
         */
        top: number;
        /**
         * 小程序胶囊菜单按钮的右边界坐标
         */
        right: number;
        /**
         * 小程序胶囊菜单按钮的下边界坐标
         */
        bottom: number;
        /**
         * 小程序胶囊菜单按钮的左边界坐标
         */
        left: number;
    }

    interface GetProviderOptions {
        /**
         * 服务类型，可取值“oauth”、“share”、“payment”、“push”
         * - oauth: 授权登录
         * - share: 分享
         * - payment: 支付
         * - push: 推送
         */
        service: 'oauth' | 'share' | 'payment' | 'push';
        /**
         * 接口调用成功的回调
         */
        success?: (result: GetProviderRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetProviderRes {
        /**
         * 服务类型
         * - oauth: 授权登录
         * - share: 分享
         * - payment: 支付
         * - push: 推送
         */
        service: 'oauth' | 'share' | 'payment' | 'push';
        /**
         * 得到的服务供应商
         */
        provider: any [];
        /**
         * 描述信息
         */
        errMsg: string;
    }

    interface LoginOptions {
        /**
         * 授权登录服务提供商，通过uni.getProvider获取，如果不设置则弹出分享列表选择界面
         * - weixin: 微信登录
         * - qq: QQ登录
         * - sinaweibo: 新浪微博登录
         * - xiaomi: 小米登录
         * - apple: Apple登录
         * - univerify: 一键登录
         */
        provider?: 'weixin' | 'qq' | 'sinaweibo' | 'xiaomi' | 'apple' | 'univerify';
        /**
         * 授权类型，默认 auth_base。
         */
        scopes?: LoginScopes | LoginScopes [];
        /**
         * 超时时间，单位 ms
         */
        timeout?: number;
        /**
         * 一键登录页面样式
         */
        univerifyStyle?: UniverifyStyle;
        /**
         * 微信登录仅请求授权认证
         */
        onlyAuthorize?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: LoginRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface UniverifyStyle {
        /**
         * 是否全屏模式。
         *
         * true表示全屏模式，false表示非全屏模式，默认值为false。
         */
        fullScreen?: boolean;
        /**
         * 授权界面背景颜色。
         *
         * 格式为"#RRGGBB"，默认值为"#FFFFF"。
         */
        backgroundColor?: string;
        /**
         * 背景图片
         */
        backgroundImage?: string;
        /**
         * 授权界面图标样式。
         *
         * 可设置自定义图标，默认为应用图标。
         */
        icon?: UniverifyIconStyles;
        /**
         * 授权界面电话号码样式
         *
         * 可设置自定义电话号码文字颜色、大小等。
         */
        phoneNum?: UniverifyPhoneNumStyles;
        /**
         * 授权界面服务说明样式
         *
         * 可设置自定义服务说明文字颜色、大小等。
         */
        slogan?: UniverifySloganStyles;
        /**
         * 授权界面其他登录按钮样式
         *
         * 可设置自定义其他登录按钮背景颜色、文本内容、大小等。
         */
        authButton?: UniverifyAuthButtonStyles;
        /**
         * 支付宝小程序登录成功的授权 scope
         */
        otherLoginButton?: UniverifyOtherButtonStyles;
        /**
         * 授权界面服务协议样式
         *
         * 自定义设置服务器协议文字颜色、文本内容，添加自定义服务协议链接等。
         */
        privacyTerms?: UniverifyPrivacyTermsStyles;
        /**
         * 自定义登录按钮列表样式
         *
         * 自定义设置更多登录按钮列表，如其它三方登录等。
         *                     注意：HBuilderX3.1.14+版本支持。
         */
        buttons?: UniVerifyButtonsStyles;
    }

    interface UniverifyIconStyles {
        /**
         * 图标地址
         *
         * 仅支持本地路径，默认为应用图标。
         */
        path: string;
        /**
         * 图标宽度
         *
         * 格式为“XXpx"，默认值为"60px"。
         */
        width?: string;
        /**
         * 图标高度
         *
         * 格式为“XXpx"，默认值为"60px"。
         */
        height?: string;
    }

    interface UniVerifyButtonsStyles {
        /**
         * 自定义登录按钮图标宽度
         *
         * 单位为px，默认值为45px。
         *                     按指定宽度缩放，高度等比例缩放。
         */
        iconWidth?: string;
        /**
         * 自定义登录按钮列表
         */
        list: UniVerifyButtonListItem [];
    }

    interface UniVerifyButtonListItem {
        /**
         * 该按钮标识，会原样返回。
         */
        provider: string;
        /**
         * 图片路径
         *
         * 仅支持本地图片
         */
        iconPath: string;
    }

    interface UniverifyPhoneNumStyles {
        /**
         * 字体颜色
         *
         * 格式为"#RRGGBB"，默认值为"#000000"。
         */
        color?: string;
        /**
         * 字体大小
         *
         * 格式为“XXpx"，默认值为"18px"。注意：字体加粗显示。
         */
        fontSize?: string;
    }

    interface UniverifySloganStyles {
        /**
         * 字体颜色
         *
         * 格式为"#RRGGBB"，默认值为"#8a8b90"。
         */
        color?: string;
        /**
         * 字体大小
         *
         * 格式为“XXpx"，默认值为"12px"。
         */
        fontSize?: string;
    }

    interface UniverifyAuthButtonStyles {
        /**
         * 正常状态按钮颜色
         *
         * 格式为"#RRGGBB"，默认值为"#3479f5"。
         */
        normalColor?: string;
        /**
         * 按下状态按钮颜色
         *
         * 格式为"#RRGGBB"，默认值为"#2861c5"。
         */
        highlightColor?: string;
        /**
         * 不可点击状态按钮颜色
         *
         * 格式为"#RRGGBB"，默认值为"#73aaf5"。 注意：仅iOS平台支持。
         */
        disabledColor?: string;
        /**
         * 按钮宽度
         *
         * 格式为“XXpx"，默认值为自适应，距离屏幕左右"32px"。
         */
        width?: string;
        /**
         * 按钮高度
         *
         * 格式为“XXpx"，默认值为"94px"。
         */
        height?: string;
        /**
         * 按钮上文字颜色
         *
         * 格式为"#RRGGBB"，默认值为"#ffffff"。
         */
        textColor?: string;
        /**
         * 按钮上文字内容
         *
         * 默认值为"本机号码一键登录"。
         */
        title?: string;
        /**
         * 授权按钮圆角
         *
         * 格式为“XXpx"，默认值："24px" （按钮高度的一半）
         */
        borderRadius?: string;
    }

    interface UniverifyOtherButtonStyles {
        /**
         * 是否显示其它按钮
         *
         * 可取值： true - 显示其它按钮；false - 不显示其它按钮。 默认值为true。
         */
        visible?: boolean;
        /**
         * 正常状态按钮颜色
         *
         * 格式为"#RRGGBB"，默认值为"#f8f8f8"。
         */
        normalColor?: string;
        /**
         * 按下状态按钮颜色
         *
         * 格式为"#RRGGBB"，默认值为"#dedede"。
         */
        highlightColor?: string;
        /**
         * 按钮宽度
         *
         * 格式为“XXpx"，默认值为自适应，距离屏幕左右"32px"。
         */
        width?: string;
        /**
         * 按钮高度
         *
         * 格式为“XXpx"，默认值为"94px"。
         */
        height?: string;
        /**
         * 按钮上文字颜色
         *
         * 格式为"#RRGGBB"，默认值为"#000000"。
         */
        textColor?: string;
        /**
         * 按钮上文字内容
         *
         * 默认值为"本机号码一键登录"。
         */
        title?: string;
        /**
         * 按钮边框宽度
         *
         * 格式为“XXpx"，默认值为"1px"。 注意：仅iOS平台支持。
         */
        borderWidth?: string;
        /**
         * 按钮边框颜色
         *
         * 格式为"#RRGGBB"，默认值为"#c5c5c5"。 注意：仅iOS平台支持。
         */
        borderColor?: string;
        /**
         * 其他登录按钮圆角
         *
         * 格式为“XXpx"，默认值："24px" （按钮高度的一半）
         */
        borderRadius?: string;
    }

    interface UniverifyPrivacyTermsStyles {
        /**
         * 默认是否勾选同意协议选择框
         *
         * ture表示勾选，false表示不勾选。默认值为true。
         *                     HBuilderX3.1.0+版本新增支持。
         */
        defaultCheckBoxState?: boolean;
        /**
         * 普通文字颜色
         *
         * 格式为"#RRGGBB"，默认值为"#8a8b90"。
         */
        textColor?: string;
        /**
         * 协议链接文字颜色
         *
         * 格式为"#RRGGBB"，默认值为"#1d4788"。
         */
        termsColor?: string;
        /**
         * 服务协议前文本内容
         *
         * 默认值为"我已阅读并同意"。
         */
        prefix?: string;
        /**
         * 服务协议后文本内容
         *
         * 默认值为"并使用本机号码登录"。
         */
        suffix?: string;
        /**
         * 字体大小
         *
         * 格式为“XXpx"，默认值为"12px"。
         */
        fontSize?: string;
        /**
         * 服务协议
         *
         * 自定义服务协议，可设置使用手机号码登录的协议，最多可设置两个协议。 注意：运营商的服务协议链接会自动添加到自定义服务协议之前。
         */
        privacyItems?: UniverifyPrivacyItemStyles [];
    }

    interface UniverifyPrivacyItemStyles {
        /**
         * 链接地址
         *
         * http/https开头的协议链接地址。
         */
        url: string;
        /**
         * 协议链接文字
         */
        title: string;
    }

    /**
     * - auth_base: 静默授权
     * - auth_user: 网站支付宝登录
     * - auth_zhima: 用户芝麻信息
     */
    type LoginScopes = 'auth_base' | 'auth_user' | 'auth_zhima';

    interface LoginRes {
        /**
         * 描述信息
         */
        errMsg: string;
        /**
         * 登录服务商提供的登录信息，服务商不同返回的结果不完全相同
         */
        authResult: string;
        /**
         * 小程序用户临时登录凭证
         */
        code: string;
        /**
         * 头条小程序当前设备标识
         */
        anonymousCode?: string;
        /**
         * 支付宝小程序授权码
         */
        authCode?: string;
        /**
         * 支付宝小程序登录失败的授权类型，key是授权失败的 scope，value 是对应的错误码
         */
        authErrorScope?: any;
        /**
         * 支付宝小程序登录成功的授权 scope
         */
        authSucessScope?: string [];
        /**
         * 苹果登录成功返回的信息
         */
        appleInfo?: AppleLoginAppleInfo;
    }

    interface AppleLoginAppleInfo {
        /**
         * 应用程序用来与服务器交互的令牌
         */
        authorizationCode?: string;
        /**
         * 返回身份的全名
         */
        fullName?: any;
        /**
         * 一个JSON Web令牌(JWT)，可以安全地将用户信息传递给应用程序
         */
        identityToken?: string;
        /**
         * 指示用户是否为真人
         */
        realUserStatus?: number;
        /**
         * 验证用户的标识符
         */
        user?: string;
    }

    interface CheckSessionOptions {
        /**
         * 接口调用成功的回调函数，session_key未过期
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数，session_key已过期
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface AuthorizeOptions {
        /**
         * 需要获取权限的scope
         */
        scope: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetUserInfoOptions {
        /**
         * 授权登录服务提供商，通过uni.getProvider获取
         * - weixin: 微信登录
         * - qq: QQ登录
         * - sinaweibo: 新浪微博登录
         * - xiaomi: 小米登录
         * - apple: Apple登录
         */
        provider?: 'weixin' | 'qq' | 'sinaweibo' | 'xiaomi' | 'apple';
        /**
         * 是否带上登录态信息，仅微信小程序生效。
         */
        withCredentials?: boolean;
        /**
         * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en，仅微信小程序生效。
         */
        lang?: string;
        /**
         * 超时时间，单位 ms
         */
        timeout?: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetUserInfoRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetUserProfileOptions {
        /**
         * 授权登录服务提供商，通过uni.getProvider获取
         * - weixin: 微信登录
         * - qq: QQ登录
         * - sinaweibo: 新浪微博登录
         * - xiaomi: 小米登录
         * - apple: Apple登录
         */
        provider?: 'weixin' | 'qq' | 'sinaweibo' | 'xiaomi' | 'apple';
        /**
         * 声明获取用户个人信息后的用途，不超过30个字符。仅微信小程序生效，且为必填。
         */
        desc?: string;
        /**
         * 是否带上登录态信息，仅微信小程序生效。
         */
        withCredentials?: boolean;
        /**
         * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en，仅微信小程序生效。
         * - en: 英文
         * - zh_CN: 简体中文
         * - zh_TW: 繁体中文
         */
        lang?: 'en' | 'zh_CN' | 'zh_TW';
        /**
         * 超时时间，单位 ms
         */
        timeout?: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetUserProfileRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetUserInfoRes {
        /**
         * 用户信息对象，不包含 openid 等敏感信息
         */
        userInfo: UserInfo;
        /**
         * 不包括敏感信息的原始数据字符串，用于计算签名。
         */
        rawData: string;
        /**
         * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，仅微信小程序生效。
         */
        signature: string;
        /**
         * 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法，仅微信小程序生效。
         */
        encryptedData: string;
        /**
         * 加密算法的初始向量，详细见加密数据解密算法，仅微信小程序生效。
         */
        iv: string;
        /**
         * 描述信息
         */
        errMsg: string;
    }

    interface GetUserProfileRes {
        /**
         * 用户信息对象，不包含 openid 等敏感信息
         */
        userInfo: UserInfo;
        /**
         * 不包括敏感信息的原始数据字符串，用于计算签名。
         */
        rawData: string;
        /**
         * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，仅微信小程序生效。
         */
        signature: string;
        /**
         * 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法，仅微信小程序生效。
         */
        encryptedData: string;
        /**
         * 加密算法的初始向量，详细见加密数据解密算法，仅微信小程序生效。
         */
        iv: string;
        /**
         * 描述信息
         */
        errMsg: string;
    }

    interface UserInfo {
        /**
         * 用户昵称
         */
        nickName: string;
        /**
         * 该服务商唯一用户标识
         */
        openId: string;
        /**
         * 用户头像
         */
        avatarUrl: string;
    }

    interface PreLoginOptions {
        /**
         * 授权登录服务提供商，通过uni.getProvider获取
         * - univerify: 一键登录
         */
        provider?: 'univerify';
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetCheckBoxStateOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetCheckBoxStateRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetCheckBoxStateRes {
        /**
         * 错误信息
         */
        errMsg: string;
        /**
         * 一键登录条款勾选框状态
         */
        state: boolean;
    }

    interface UniverifyManager {
        /**
         * 一键登录
         */
        login(options: UniverifyLoginOptions): void;
        /**
         * 预登录
         */
        preLogin(options: CallBackOptions): void;
        /**
         * 关闭一键登陆页面
         */
        close(): void;
        /**
         * 获取一键登录条款勾选框状态
         */
        getCheckBoxState(options: GetCheckBoxStateOptions): void;
        /**
         * 订阅一键登录自定义按钮点击事件
         */
        onButtonsClick(callback: (result: any) => void): void;
        /**
         * 取消订阅一键登录自定义按钮点击事件
         */
        offButtonsClick(callback: (result: any) => void): void;
    }

    interface UniverifyLoginOptions {
        /**
         * 一键登录页面样式
         */
        univerifyStyle?: UniverifyStyle;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: LoginRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface CallBackOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ShareOptions {
        /**
         * 分享服务提供商，通过uni.getProvider获取，如果不设置则弹出分享列表选择界面
         * - sinaweibo: 新浪微博分享
         * - qq: 分享到QQ好友
         * - weixin: 分享微信消息、朋友圈及微信小程序
         */
        provider?: 'sinaweibo' | 'qq' | 'weixin';
        /**
         * 分享类型。默认图文0，纯文字1，纯图片2，音乐3，视频4，小程序5。
         * - 0: 图文
         * - 1: 纯文字
         * - 2: 纯图片
         * - 3: 音乐
         * - 4: 视频
         * - 5: 小程序
         */
        type?: 0 | 1 | 2 | 3 | 4 | 5;
        /**
         * 标题
         */
        title?: string;
        /**
         * 场景。可取值“WXSceneSession”分享到聊天界面，“WXSceneTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏
         * - WXSceneSession: 分享到聊天界面
         * - WXSceneTimeline: 分享到朋友圈
         * - WXSceneFavorite: 分享到微信收藏
         */
        scene?: 'WXSceneSession' | 'WXSceneTimeline' | 'WXSceneFavorite';
        /**
         * 摘要
         */
        summary?: string;
        /**
         * 跳转链接
         */
        href?: string;
        /**
         * 图片地址
         */
        imageUrl?: string;
        /**
         * 音视频地址
         */
        mediaUrl?: string;
        /**
         * 分享小程序
         */
        miniProgram?: MiniProgramShareOptions;
        /**
         * 是否启用拉起客服功能（目前仅支持微信）
         */
        openCustomerServiceChat?: boolean;
        /**
         * 客服ID（目前仅支持微信）
         */
        corpid?: string;
        /**
         * 客服的页面路径（目前仅支持微信）
         */
        customerUrl?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface MiniProgramShareOptions {
        /**
         * 微信小程序原始id
         */
        id?: string;
        /**
         * 点击链接进入的页面
         */
        path?: string;
        /**
         * 微信小程序版本类型，默认为0。
         * - 0: 正式版
         * - 1: 测试版
         * - 2: 体验版
         */
        type?: 0 | 1 | 2;
        /**
         * 兼容低版本的网页链接
         */
        webUrl?: string;
    }

    interface ShareWithSystemOptions {
        /**
         * 分享内容的类型
         * - text: 文字类型
         * - image: 图片类型
         */
        type?: 'text' | 'image';
        /**
         * 分享文字内容
         */
        summary?: string;
        /**
         * 分享链接
         */
        href?: string;
        /**
         * 分享图片地址,仅支持本地图片
         */
        imageUrl?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SubscribePushOptions {
        /**
         * 推送服务提供商，通过uni.getProvider获取
         * - unipush: UniPush
         * - igexin: 个推
         * - mipush: 小米推送
         */
        provider?: 'unipush' | 'igexin' | 'mipush';
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface UnscribePushOptions {
        /**
         * 推送服务提供商，通过uni.getProvider获取
         * - unipush: UniPush
         * - igexin: 个推
         * - mipush: 小米推送
         */
        provider?: 'unipush' | 'igexin' | 'mipush';
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface OnPushOptions {
        /**
         * 推送服务提供商，通过uni.getProvider获取
         * - unipush: UniPush
         * - igexin: 个推
         * - mipush: 小米推送
         */
        provider?: 'unipush' | 'igexin' | 'mipush';
        /**
         * 接收到透传数据回调，回调参数（Object）：messageId（消息id）、data（消息内容）
         */
        callback?: (result: any) => void;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface OffPushOptions {
        /**
         * 推送服务提供商，通过uni.getProvider获取
         * - unipush: UniPush
         * - igexin: 个推
         * - mipush: 小米推送
         */
        provider?: 'unipush' | 'igexin' | 'mipush';
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ShowShareMenuOptions {
        /**
         * 是否使用带 shareTicket 的转发
         */
        withShareTicket?: boolean;
        /**
         * 需要显示的转发按钮名称列表
         */
        menus?: ShowShareMenuOptionsMenu [];
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    /**
     * 转发按钮名称
     * - shareAppMessage: 发送给朋友
     * - shareTimeline: 分享到朋友圈
     */
    type ShowShareMenuOptionsMenu = 'shareAppMessage' | 'shareTimeline';

    interface HideShareMenuOptions {
        /**
         * 控制隐藏的哪些分享选项
         */
        hideShareItems: any [];
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface UpdateShareMenuOptions {
        /**
         * 是否使用带 shareTicket 的转发
         */
        withShareTicket?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetShareInfoOptions {
        /**
         * shareTicket
         */
        shareTicket: string;
        /**
         * 超时时间，单位 ms
         */
        timeout?: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetShareInfoRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetShareInfoRes {
        /**
         * 错误信息
         */
        errMsg: string;
        /**
         * 包括敏感数据在内的完整转发信息的加密数据
         */
        encryptedData: string;
        /**
         * 加密算法的初始向量
         */
        iv: string;
    }

    interface ChooseAddressOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: ChooseAddressRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ChooseAddressRes {
        /**
         * 调用结果
         */
        errMsg: string;
        /**
         * 收货人姓名
         */
        userName: string;
        /**
         * 邮编
         */
        postalCode: string;
        /**
         * 国标收货地址第一级地址
         */
        provinceName: string;
        /**
         * 国标收货地址第二级地址
         */
        cityName: string;
        /**
         * 国标收货地址第三级地址
         */
        countyName: string;
        /**
         * 详细收货地址信息
         */
        detailInfo: string;
        /**
         * 收货地址国家码
         */
        nationalCode: string;
        /**
         * 收货人手机号码
         */
        telNumber: string;
    }

    interface AddCardOptions {
        /**
         * 需要添加的卡券列表
         */
        cardList: AddCardData [];
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: AddCardRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface AddCardData {
        /**
         * 卡券 id
         */
        cardId: string;
        /**
         * 卡券的扩展参数
         */
        cardExt: string;
    }

    interface AddCardRes {
        /**
         * 卡券 id
         */
        cardList: CardData [];
    }

    interface CardData {
        /**
         * 加密 code，为用户领取到卡券的code加密后的字符串
         */
        code: string;
        /**
         * 用户领取到卡券的id
         */
        cardId: string;
        /**
         * 用户领取到卡券的扩展参数，与调用时传入的参数相同
         */
        cardExt: string;
        /**
         * 是否成功
         */
        isSuccess: boolean;
    }

    interface OpenCardOptions {
        /**
         * 需要打开的卡券列表
         */
        cardList: OpenCardData [];
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface OpenCardData {
        /**
         * 需要打开的卡券 Id
         */
        cardId: string;
        /**
         * 由 addCard 的返回对象中的加密 code 通过解密后得到
         */
        code: string;
    }

    interface OpenSettingOptions {
        /**
         * 是否同时获取用户订阅消息的订阅状态，默认不获取。注意：withSubscriptions 只返回用户勾选过订阅面板中的“总是保持以上选择，不再询问”的订阅消息。
         *
         * 最低基础库：2.10.3
         */
        withSubscriptions?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetSettingOptions {
        /**
         * 是否同时获取用户订阅消息的订阅状态
         */
        withSubscriptions?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetSettingSuccessResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetSettingSuccessResult {
        /**
         * 用户授权结果
         */
        authSetting: AuthSetting;
        /**
         * 用户订阅消息设置
         */
        subscriptionsSetting: SubscriptionsSetting;
    }

    interface AuthSetting {
        /**
         * 是否授权用户信息
         */
        'scope.userInfo': boolean;
        /**
         * 是否授权地理位置
         */
        'scope.userLocation': boolean;
        /**
         * 是否授权通讯地址
         */
        'scope.address': boolean;
        /**
         * 是否授权发票抬头
         */
        'scope.invoiceTitle': boolean;
        /**
         * 是否授权获取发票
         */
        'scope.invoice': boolean;
        /**
         * 是否授权微信运动步数
         */
        'scope.werun': boolean;
        /**
         * 是否授权录音功能
         */
        'scope.record': boolean;
        /**
         * 是否授权保存到相册
         */
        'scope.writePhotosAlbum': boolean;
        /**
         * 是否授权摄像头
         */
        'scope.camera': boolean;
    }

    interface SubscriptionsSetting {
        /**
         * 订阅消息总开关
         */
        mainSwitch: boolean;
        /**
         * 每一项订阅消息的订阅状态
         */
        itemSettings: any;
    }

    interface GetWeRunDataOptions {
        /**
         * 超时时间，单位 ms
         */
        timeout?: number;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetWeRunDataRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetWeRunDataRes {
        /**
         * 调用结果
         */
        errMsg: string;
        /**
         * 包括敏感数据在内的完整用户信息的加密数据
         */
        encryptedData: string;
        /**
         * 加密算法的初始向量
         */
        iv: string;
    }

    interface ChooseInvoiceTitleOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: ChooseInvoiceTitleRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface ChooseInvoiceTitleRes {
        /**
         * 抬头类型（0：单位，1：个人）
         */
        type: string;
        /**
         * 抬头名称
         */
        title: string;
        /**
         * 抬头税号
         */
        taxNumber: string;
        /**
         * 单位地址
         */
        companyAddress: string;
        /**
         * 手机号码
         */
        telephone: string;
        /**
         * 银行名称
         */
        bankName: string;
        /**
         * 银行账号
         */
        bankAccount: string;
        /**
         * 接口调用结果
         */
        errMsg: string;
    }

    interface CheckIsSupportSoterAuthenticationOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: CheckIsSupportSoterAuthenticationRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface CheckIsSupportSoterAuthenticationRes {
        /**
         * 接口调用成功的回调函数
         */
        supportMode: SoterAuthModes [];
        /**
         * 接口调用结果
         */
        errMsg: string;
    }

    interface StartSoterAuthenticationOptions {
        /**
         * 请求使用的可接受的生物认证方式
         */
        requestAuthModes: SoterAuthModes [];
        /**
         * 挑战因子
         */
        challenge?: string;
        /**
         * 验证描述，即识别过程中显示在界面上的对话框提示内容
         */
        authContent?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: StartSoterAuthenticationRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    /**
     * 生物认证方式
     * - fingerPrint: 指纹识别
     * - facial: 人脸识别（暂未支持）
     * - speech: 声纹识别（暂未支持）
     */
    type SoterAuthModes = 'fingerPrint' | 'facial' | 'speech';

    interface StartSoterAuthenticationRes {
        /**
         * 错误码
         */
        errCode: number;
        /**
         * 生物认证方式
         * - fingerPrint: 指纹识别
         * - facial: 人脸识别（暂未支持）
         * - speech: 声纹识别（暂未支持）
         */
        authMode: 'fingerPrint' | 'facial' | 'speech';
        /**
         * 在设备安全区域（TEE）内获得的本机安全信息以及本次认证信息
         */
        resultJSON?: string;
        /**
         * 用SOTER安全密钥对 resultJSON 的签名(SHA256 with RSA/PSS, saltlen=20)
         */
        resultJSONSignature?: string;
        /**
         * 接口调用结果
         */
        errMsg: string;
    }

    interface CheckIsSoterEnrolledInDeviceOptions {
        /**
         * 生物认证方式
         * - fingerPrint: 指纹识别
         * - facial: 人脸识别（暂未支持）
         * - speech: 声纹识别（暂未支持）
         */
        checkAuthMode: 'fingerPrint' | 'facial' | 'speech';
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: CheckIsSoterEnrolledInDeviceRes) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface CheckIsSoterEnrolledInDeviceRes {
        /**
         * 是否已录入信息
         */
        isEnrolled: boolean;
        /**
         * 错误信息
         */
        errMsg: string;
    }

    interface UpdateManager {
        /**
         * 当向应用后台请求完新版本信息，会进行回调
         */
        onCheckForUpdate(callback: (result: OnCheckForUpdateResult) => void): void;
        /**
         * 当新版本下载完成，会进行回调
         */
        onUpdateReady(callback: (result: any) => void): void;
        /**
         * 当新版本下载失败，会进行回调
         */
        onUpdateFailed(callback: (result: any) => void): void;
        /**
         * 当新版本下载完成，调用该方法会强制当前uni-app应用上新版本并重启
         */
        applyUpdate(): void;
    }

    interface OnCheckForUpdateResult {
        /**
         * 是否有新版本
         */
        hasUpdate: boolean;
    }

    interface Worker {
        /**
         * 向 Worker 线程发送的消息。
         */
        postMessage(message: any): void;
        /**
         * 监听 Worker 线程向当前线程发送的消息
         */
        onMessage(callback: (result: any) => void): void;
        /**
         * 结束当前 Worker 线程，仅限在主线程 Worker 实例上调用。
         */
        terminate(): void;
    }

    interface SetEnableDebugOptions {
        /**
         * 是否打开调试
         */
        enableDebug: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SetBackgroundColorOptions {
        /**
         * 窗口的背景色，必须为十六进制颜色值
         */
        backgroundColor?: string;
        /**
         * 顶部窗口的背景色，必须为十六进制颜色值，仅 iOS 支持
         */
        backgroundColorTop?: string;
        /**
         * 底部窗口的背景色，必须为十六进制颜色值，仅 iOS 支持
         */
        backgroundColorBottom?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface SetBackgroundTextStyleOptions {
        /**
         * 下拉背景字体、loading 图的样式，值为：dark、light
         */
        textStyle: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StatusBarStyle {
        /**
         * 页面根节点样式，页面根节点是所有页面节点的祖先节点，相当于 HTML 中的 body 节点
         */
        pageStyle?: string;
        /**
         * 页面的根字体大小，页面中的所有 rem 单位，将使用这个字体大小作为参考值，即 1rem 等于这个字体大小
         */
        rootFontSize?: string;
    }

    interface OnGyroscopeChangeSuccess {
        /**
         * x 轴方向角速度
         */
        x: number;
        /**
         * y 轴方向角速度
         */
        y: number;
        /**
         * z 轴方向角速度
         */
        z: number;
    }

    interface StartGyroscopeOptions {
        /**
         * 监听陀螺仪数据回调函数的执行频率：game（20ms/次）、ui（60ms/次）、normal （200ms/次）
         */
        interval?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StopGyroscopeOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface StopGyroscopeOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface LoadFontFaceOptions {
        /**
         * 定义的字体名称
         */
        family: string;
        /**
         * 字体资源的地址。建议格式为 TTF 和 WOFF，WOFF2 在低版本的iOS上会不兼容。
         */
        source: string;
        /**
         * 可选的字体描述符
         */
        desc?: LoadFontFaceOptionsDesc;
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: any) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface LoadFontFaceOptionsDesc {
        /**
         * 字体样式，可选值为 normal、italic、oblique
         */
        style: string;
        /**
         * 字体粗细，可选值为 normal、bold、100、200../ 900
         */
        weight: string;
        /**
         * 设置小型大写字母的字体显示文本，可选值为 normal、small-caps、inherit
         */
        variant: string;
    }

    interface GetSelectedTextRangeOptions {
        /**
         * 接口调用成功的回调函数
         */
        success?: (result: GetSelectedTextRangeSuccessCallbackResult) => void;
        /**
         * 接口调用失败的回调函数
         */
        fail?: (result: any) => void;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: (result: any) => void;
    }

    interface GetSelectedTextRangeSuccessCallbackResult {
        /**
         * 输入框光标起始位置
         */
        start?: number;
        /**
         * 输入框光标结束位置
         */
        end?: number;
    }

    interface RewardedVideoAdOptions {
        /**
         * 广告位 id
         */
        adpid?: string;
        /**
         * 小程序平台广告位 id
         */
        adUnitId?: string;
    }

    interface RewardedVideoAdContext {
        /**
         * 加载激励视频广告
         */
        load(): Promise<any>;
        /**
         * 显示激励视频广告
         */
        show(): Promise<any>;
        /**
         * 获取广告商
         */
        getProvider(): string;
        /**
         * 销毁激励视频广告实例
         */
        destroy(): void;
        /**
         * 绑定 load 事件的监听器
         */
        onLoad(callback: (result: any) => void): void;
        /**
         * 绑定 close 事件的监听器
         */
        onClose(callback: (result: any) => void): void;
        /**
         * 绑定 error 事件的监听器
         */
        onError(callback: (result: any) => void): void;
        /**
         * 解除绑定 load 事件的监听器
         */
        offLoad(callback: (result: any) => void): void;
        /**
         * 解除绑定 close 事件的监听器
         */
        offClose(callback: (result: any) => void): void;
        /**
         * 解除绑定 error 事件的监听器
         */
        offError(callback: (result: any) => void): void;
    }

    interface FullScreenVideoAdOptions {
        /**
         * 广告位 id
         */
        adpid?: string;
    }

    interface FullScreenVideoAdContext {
        /**
         * 加载全屏视频广告
         */
        load(): Promise<any>;
        /**
         * 显示全屏视频广告
         */
        show(): Promise<any>;
        /**
         * 销毁全屏视频广告实例
         */
        destroy(): void;
        /**
         * 绑定 load 事件的监听器
         */
        onLoad(callback: (result: any) => void): void;
        /**
         * 绑定 close 事件的监听器
         */
        onClose(callback: (result: any) => void): void;
        /**
         * 绑定 error 事件的监听器
         */
        onError(callback: (result: any) => void): void;
        /**
         * 解除绑定 load 事件的监听器
         */
        offLoad(callback: (result: any) => void): void;
        /**
         * 解除绑定 close 事件的监听器
         */
        offClose(callback: (result: any) => void): void;
        /**
         * 解除绑定 error 事件的监听器
         */
        offError(callback: (result: any) => void): void;
    }

    interface InterstitialAdOptions {
        /**
         * 广告位 id
         */
        adpid?: string;
        /**
         * 小程序平台广告位 id
         */
        adUnitId?: string;
    }

    interface InterstitialAdContext {
        /**
         * 加载插屏广告
         */
        load(): Promise<any>;
        /**
         * 显示插屏广告
         */
        show(): Promise<any>;
        /**
         * 销毁插屏广告实例
         */
        destroy(): void;
        /**
         * 绑定 load 事件的监听器
         */
        onLoad(callback: (result: any) => void): void;
        /**
         * 绑定 close 事件的监听器
         */
        onClose(callback: (result: any) => void): void;
        /**
         * 绑定 error 事件的监听器
         */
        onError(callback: (result: any) => void): void;
        /**
         * 解除绑定 load 事件的监听器
         */
        offLoad(callback: (result: any) => void): void;
        /**
         * 解除绑定 close 事件的监听器
         */
        offClose(callback: (result: any) => void): void;
        /**
         * 解除绑定 error 事件的监听器
         */
        offError(callback: (result: any) => void): void;
    }

    interface InteractiveAdOptions {
        /**
         * 广告位 id
         */
        adpid: string;
        /**
         * 广告服务商标识
         */
        provider: string;
    }

    interface InteractiveAdContext {
        /**
         * 加载互动广告
         */
        load(): Promise<any>;
        /**
         * 显示互动广告
         */
        show(): Promise<any>;
        /**
         * 场景入口曝光打点
         */
        reportExposure(): void;
        /**
         * 销毁互动广告实例
         */
        destroy(): void;
        /**
         * 绑定 load 事件的监听器
         */
        onLoad(callback: (result: any) => void): void;
        /**
         * 绑定 close 事件的监听器
         */
        onClose(callback: (result: any) => void): void;
        /**
         * 绑定 error 事件的监听器
         */
        onError(callback: (result: any) => void): void;
        /**
         * 解除绑定 load 事件的监听器
         */
        offLoad(callback: (result: any) => void): void;
        /**
         * 解除绑定 close 事件的监听器
         */
        offClose(callback: (result: any) => void): void;
        /**
         * 解除绑定 error 事件的监听器
         */
        offError(callback: (result: any) => void): void;
    }

    interface InterceptorOptions {
        /**
         * 拦截前触发
         */
        invoke?: (result: any) => void;
        /**
         * 成功回调拦截
         */
        success?: (result: any) => void;
        /**
         * 失败回调拦截
         */
        fail?: (result: any) => void;
        /**
         * 完成回调拦截
         */
        complete?: (result: any) => void;
    }

    interface OnLocaleChangeCallbackResult {
        /**
         * 当前语言
         */
        locale?: string;
    }

    /**
     * 小程序帐号信息
     */
    interface MiniProgram {
        /**
         * 小程序 appId
         */
        appId: string;
        /**
         * 小程序版本
         *
         * 可选值：
         * - 'develop': 开发版;
         * - 'trial': 体验版;
         * - 'release': 正式版;
         *
         * 最低基础库： `2.10.0`
         */
        envVersion: "develop" | "trial" | "release";
        /**
         * 线上小程序版本号
         *
         * 最低基础库： `2.10.2`
         */
        version: string;
    }

    /**
     * 插件帐号信息（仅在插件中调用时包含这一项）
     */
    interface Plugin {
        /**
         * 插件 appId
         */
        appId: string;
        /**
         * 插件版本号
         */
        version: string;
    }

    /**
     * 帐号信息
     */
    interface AccountInfo {
        /**
         * 小程序帐号信息
         */
        miniProgram: MiniProgram;
        /**
         * 插件帐号信息（仅在插件中调用时包含这一项）
         */
        plugin: Plugin;
    }

    interface GetBatteryInfoSyncResult {
        /**
         * 是否正在充电中
         */
        isCharging: boolean;
        /**
         * 设备电量，范围 1 - 100
         */
        level: string;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type AccessCompleteCallback = (res: GeneralCallbackResult) => void;

    interface AccessFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail no such file or directory ${path}': 文件/目录不存在;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type AccessFailCallback = (result: AccessFailCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type AccessSuccessCallback = (res: GeneralCallbackResult) => void;

    interface AccessOption {
        /**
         * 要判断是否存在的文件/目录路径 (本地路径)
         */
        path: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: AccessCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: AccessFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: AccessSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type AppendFileCompleteCallback = (res: GeneralCallbackResult) => void;

    interface AppendFileFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail no such file or directory, open ${filePath}': 指定的 filePath 文件不存在;
         * - 'fail illegal operation on a directory, open "${filePath}"': 指定的 filePath 是一个已经存在的目录;
         * - 'fail permission denied, open ${dirPath}': 指定的 filePath 路径没有写权限;
         * - 'fail sdcard not mounted': 指定的 filePath 是一个已经存在的目录;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type AppendFileFailCallback = (result: AppendFileFailCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type AppendFileSuccessCallback = (res: GeneralCallbackResult) => void;

    interface AppendFileOption {
        /**
         * 要追加的文本或二进制数据
         */
        data: string | ArrayBuffer;
        /**
         * 要追加内容的文件路径 (本地路径)
         */
        filePath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: AppendFileCompleteCallback;
        /**
         * 指定写入文件的字符编码
         *
         * 可选值：
         * - 'ascii': ;
         * - 'base64': ;
         * - 'binary': ;
         * - 'hex': ;
         * - 'ucs2': 以小端序读取;
         * - 'ucs-2': 以小端序读取;
         * - 'utf16le': 以小端序读取;
         * - 'utf-16le': 以小端序读取;
         * - 'utf-8': ;
         * - 'utf8': ;
         * - 'latin1': ;
         */
        encoding?: "ascii" | "base64" | "binary" | "hex" | "ucs2" | "ucs-2" | "utf16le" | "utf-16le" | "utf-8" | "utf8" | "latin1";
        /**
         * 接口调用失败的回调函数
         */
        fail?: AppendFileFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: AppendFileSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type CopyFileCompleteCallback = (res: GeneralCallbackResult) => void;

    interface CopyFileFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail permission denied, copyFile ${srcPath} -> ${destPath}': 指定目标文件路径没有写权限;
         * - 'fail no such file or directory, copyFile ${srcPath} -> ${destPath}': 源文件不存在，或目标文件路径的上层目录不存在;
         * - 'fail the maximum size of the file storage limit is exceeded': 存储空间不足;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type CopyFileFailCallback = (result: CopyFileFailCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type CopyFileSuccessCallback = (res: GeneralCallbackResult) => void;

    interface CopyFileOption {
        /**
         * 目标文件路径，支持本地路径
         */
        destPath: string;
        /**
         * 源文件路径，支持本地路径
         */
        srcPath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: CopyFileCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: CopyFileFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: CopyFileSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type GetFileInfoCompleteCallback = (res: GeneralCallbackResult) => void;

    interface GetFileInfoFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail file not exist': 指定的 filePath 找不到文件;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type FileSystemManagerGetFileInfoFailCallback = (
                result: GetFileInfoFailCallbackResult
            ) => void;

    interface FileSystemManagerGetFileInfoSuccessCallbackResult {
        /**
         * 文件大小，以字节为单位
         */
        size: number;
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type FileSystemManagerGetFileInfoSuccessCallback = (
                result: FileSystemManagerGetFileInfoSuccessCallbackResult
            ) => void;

    interface FileSystemManagerGetFileInfoOption {
        /**
         * 要读取的文件路径 (本地路径)
         */
        filePath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: GetFileInfoCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: FileSystemManagerGetFileInfoFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: FileSystemManagerGetFileInfoSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type GetSavedFileListCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type GetSavedFileListFailCallback = (res: GeneralCallbackResult) => void;

    interface FileItem {
        /**
         * 文件保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
         */
        createTime: number;
        /**
         * 文件路径 (本地路径)
         */
        filePath: string;
        /**
         * 本地文件大小，以字节为单位
         */
        size: number;
    }

    interface FileSystemManagerGetSavedFileListSuccessCallbackResult {
        /**
         * 文件数组
         */
        fileList: FileItem[];
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type FileSystemManagerGetSavedFileListSuccessCallback = (
                result: FileSystemManagerGetSavedFileListSuccessCallbackResult
            ) => void;

    interface FileSystemManagerGetSavedFileListOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: GetSavedFileListCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: GetSavedFileListFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: FileSystemManagerGetSavedFileListSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type MkdirCompleteCallback = (res: GeneralCallbackResult) => void;

    interface MkdirFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail no such file or directory ${dirPath}': 上级目录不存在;
         * - 'fail permission denied, open ${dirPath}': 指定的 filePath 路径没有写权限;
         * - 'fail file already exists ${dirPath}': 有同名文件或目录;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type MkdirFailCallback = (result: MkdirFailCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type MkdirSuccessCallback = (res: GeneralCallbackResult) => void;

    interface MkdirOption {
        /**
         * 创建的目录路径 (本地路径)
         */
        dirPath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: MkdirCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: MkdirFailCallback;
        /**
         * 是否在递归创建该目录的上级目录后再创建该目录。如果对应的上级目录已经存在，则不创建该上级目录。如 dirPath 为 a/b/c/d 且 recursive 为 true，将创建 a 目录，再在 a 目录下创建 b 目录，以此类推直至创建 a/b/c 目录下的 d 目录。
         *
         * 最低基础库： `2.3.0`
         */
        recursive?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: MkdirSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ReadFileCompleteCallback = (res: GeneralCallbackResult) => void;

    interface ReadFileFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail no such file or directory, open ${filePath}': 指定的 filePath 所在目录不存在;
         * - 'fail permission denied, open ${dirPath}': 指定的 filePath 路径没有读权限;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type ReadFileFailCallback = (result: ReadFileFailCallbackResult) => void;

    interface ReadFileSuccessCallbackResult {
        /**
         * 文件内容
         */
        data: string | ArrayBuffer;
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type ReadFileSuccessCallback = (
                result: ReadFileSuccessCallbackResult
            ) => void;

    interface ReadFileOption {
        /**
         * 要读取的文件的路径 (本地路径)
         */
        filePath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ReadFileCompleteCallback;
        /**
         * 指定读取文件的字符编码，如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容
         *
         * 可选值：
         * - 'ascii': ;
         * - 'base64': ;
         * - 'binary': ;
         * - 'hex': ;
         * - 'ucs2': 以小端序读取;
         * - 'ucs-2': 以小端序读取;
         * - 'utf16le': 以小端序读取;
         * - 'utf-16le': 以小端序读取;
         * - 'utf-8': ;
         * - 'utf8': ;
         * - 'latin1': ;
         */
        encoding?: "ascii" | "base64" | "binary" | "hex" | "ucs2" | "ucs-2" | "utf16le" | "utf-16le" | "utf-8" | "utf8" | "latin1";
        /**
         * 接口调用失败的回调函数
         */
        fail?: ReadFileFailCallback;
        /**
         * 指定文件的长度，如果不指定，则读到文件末尾。有效范围：[1, fileLength]。单位：byte
         *
         * 最低基础库： `2.10.0`
         */
        length?: string;
        /**
         * 从文件指定位置开始读，如果不指定，则从文件头开始读。读取的范围应该是左闭右开区间 [position, position+length)。有效范围：[0, fileLength - 1]。单位：byte
         *
         * 最低基础库： `2.10.0`
         */
        position?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: ReadFileSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ReaddirCompleteCallback = (res: GeneralCallbackResult) => void;

    interface ReaddirFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail no such file or directory ${dirPath}': 目录不存在;
         * - 'fail not a directory ${dirPath}': dirPath 不是目录;
         * - 'fail permission denied, open ${dirPath}': 指定的 filePath 路径没有读权限;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type ReaddirFailCallback = (result: ReaddirFailCallbackResult) => void;

    interface ReaddirSuccessCallbackResult {
        /**
         * 指定目录下的文件名数组。
         */
        files: string[];
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type ReaddirSuccessCallback = (result: ReaddirSuccessCallbackResult) => void;

    interface ReaddirOption {
        /**
         * 要读取的目录路径 (本地路径)
         */
        dirPath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ReaddirCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: ReaddirFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: ReaddirSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type RemoveSavedFileCompleteCallback = (res: GeneralCallbackResult) => void;

    interface RemoveSavedFileFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail file not exist': 指定的 tempFilePath 找不到文件;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type FileSystemManagerRemoveSavedFileFailCallback = (
                result: RemoveSavedFileFailCallbackResult
            ) => void;
    /**
     * 接口调用成功的回调函数
     */
    type RemoveSavedFileSuccessCallback = (res: GeneralCallbackResult) => void;

    interface FileSystemManagerRemoveSavedFileOption {
        /**
         * 需要删除的文件路径 (本地路径)
         */
        filePath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: RemoveSavedFileCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: FileSystemManagerRemoveSavedFileFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: RemoveSavedFileSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type RenameCompleteCallback = (res: GeneralCallbackResult) => void;

    interface RenameFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail permission denied, rename ${oldPath} -> ${newPath}': 指定源文件或目标文件没有写权限;
         * - 'fail no such file or directory, rename ${oldPath} -> ${newPath}': 源文件不存在，或目标文件路径的上层目录不存在;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type RenameFailCallback = (result: RenameFailCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type RenameSuccessCallback = (res: GeneralCallbackResult) => void;

    interface RenameOption {
        /**
         * 新文件路径，支持本地路径
         */
        newPath: string;
        /**
         * 源文件路径，支持本地路径
         */
        oldPath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: RenameCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: RenameFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: RenameSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type RmdirCompleteCallback = (res: GeneralCallbackResult) => void;

    interface RmdirFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail no such file or directory ${dirPath}': 目录不存在;
         * - 'fail directory not empty': 目录不为空;
         * - 'fail permission denied, open ${dirPath}': 指定的 dirPath 路径没有写权限;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type RmdirFailCallback = (result: RmdirFailCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type RmdirSuccessCallback = (res: GeneralCallbackResult) => void;

    interface RmdirOption {
        /**
         * 要删除的目录路径 (本地路径)
         */
        dirPath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: RmdirCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: RmdirFailCallback;
        /**
         * 是否递归删除目录。如果为 true，则删除该目录和该目录下的所有子目录以及文件。
         *
         * 最低基础库： `2.3.0`
         */
        recursive?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: RmdirSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type SaveFileCompleteCallback = (res: GeneralCallbackResult) => void;

    interface SaveFileFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail tempFilePath file not exist': 指定的 tempFilePath 找不到文件;
         * - 'fail permission denied, open "${filePath}"': 指定的 filePath 路径没有写权限;
         * - 'fail no such file or directory "${dirPath}"': 上级目录不存在;
         * - 'fail the maximum size of the file storage limit is exceeded': 存储空间不足;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type FileSystemManagerSaveFileFailCallback = (
                result: SaveFileFailCallbackResult
            ) => void;

    interface FileSystemManagerSaveFileSuccessCallbackResult {
        /**
         * 存储后的文件路径 (本地路径)
         */
        savedFilePath: string;
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type FileSystemManagerSaveFileSuccessCallback = (
                result: FileSystemManagerSaveFileSuccessCallbackResult
            ) => void;

    interface FileSystemManagerSaveFileOption {
        /**
         * 临时存储文件路径 (本地路径)
         */
        tempFilePath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: SaveFileCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: FileSystemManagerSaveFileFailCallback;
        /**
         * 要存储的文件路径 (本地路径)
         */
        filePath?: string;
        /**
         * 接口调用成功的回调函数
         */
        success?: FileSystemManagerSaveFileSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StatCompleteCallback = (res: GeneralCallbackResult) => void;

    interface StatFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail permission denied, open ${path}': 指定的 path 路径没有读权限;
         * - 'fail no such file or directory ${path}': 文件不存在;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type StatFailCallback = (result: StatFailCallbackResult) => void;

    /**
     * 描述文件状态的对象
     */
    interface Stats {
        /**
         * 文件最近一次被存取或被执行的时间，UNIX 时间戳，对应 POSIX stat.st_atime
         */
        lastAccessedTime: number;
        /**
         * 文件最后一次被修改的时间，UNIX 时间戳，对应 POSIX stat.st_mtime
         */
        lastModifiedTime: number;
        /**
         * 文件的类型和存取的权限，对应 POSIX stat.st_mode
         */
        mode: string;
        /**
         * 文件大小，单位：B，对应 POSIX stat.st_size
         */
        size: number;
    }

    interface StatSuccessCallbackResult {
        /**
         * [Stats](https://developers.weixin.qq.com/miniprogram/dev/api/file/Stats.html)|Object
         *
         * 当 recursive 为 false 时，res.stats 是一个 Stats 对象。当 recursive 为 true 且 path 是一个目录的路径时，res.stats 是一个 Object，key 以 path 为根路径的相对路径，value 是该路径对应的 Stats 对象。
         */
        stats: Record<string, any> | Stats;
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type StatSuccessCallback = (result: StatSuccessCallbackResult) => void;

    interface StatOption {
        /**
         * 文件/目录路径 (本地路径)
         */
        path: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StatCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StatFailCallback;
        /**
         * 是否递归获取目录下的每个文件的 Stats 信息
         *
         * 最低基础库： `2.3.0`
         */
        recursive?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: StatSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type UnlinkCompleteCallback = (res: GeneralCallbackResult) => void;

    interface UnlinkFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail permission denied, open ${path}': 指定的 path 路径没有读权限;
         * - 'fail no such file or directory ${path}': 文件不存在;
         * - 'fail operation not permitted, unlink ${filePath}': 传入的 filePath 是一个目录;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type UnlinkFailCallback = (result: UnlinkFailCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type UnlinkSuccessCallback = (res: GeneralCallbackResult) => void;

    interface UnlinkOption {
        /**
         * 要删除的文件路径 (本地路径)
         */
        filePath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: UnlinkCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: UnlinkFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: UnlinkSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type UnzipCompleteCallback = (res: GeneralCallbackResult) => void;

    interface UnzipFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail permission denied, unzip ${zipFilePath} -> ${destPath}': 指定目标文件路径没有写权限;
         * - 'fail no such file or directory, unzip ${zipFilePath} -> "${destPath}': 源文件不存在，或目标文件路径的上层目录不存在;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type UnzipFailCallback = (result: UnzipFailCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type UnzipSuccessCallback = (res: GeneralCallbackResult) => void;

    interface UnzipOption {
        /**
         * 目标目录路径, 支持本地路径
         */
        targetPath: string;
        /**
         * 源文件路径，支持本地路径, 只可以是 zip 压缩文件
         */
        zipFilePath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: UnzipCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: UnzipFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: UnzipSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type WriteFileCompleteCallback = (res: GeneralCallbackResult) => void;

    interface WriteFileFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'fail no such file or directory, open ${filePath}': 指定的 filePath 所在目录不存在;
         * - 'fail permission denied, open ${dirPath}': 指定的 filePath 路径没有写权限;
         * - 'fail the maximum size of the file storage limit is exceeded': 存储空间不足;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type WriteFileFailCallback = (result: WriteFileFailCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type WriteFileSuccessCallback = (res: GeneralCallbackResult) => void;

    interface WriteFileOption {
        /**
         * 要写入的文本或二进制数据
         */
        data: string | ArrayBuffer;
        /**
         * 要写入的文件路径 (本地路径)
         */
        filePath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: WriteFileCompleteCallback;
        /**
         * 指定写入文件的字符编码
         *
         * 可选值：
         * - 'ascii': ;
         * - 'base64': ;
         * - 'binary': ;
         * - 'hex': ;
         * - 'ucs2': 以小端序读取;
         * - 'ucs-2': 以小端序读取;
         * - 'utf16le': 以小端序读取;
         * - 'utf-16le': 以小端序读取;
         * - 'utf-8': ;
         * - 'utf8': ;
         * - 'latin1': ;
         */
        encoding?: "ascii" | "base64" | "binary" | "hex" | "ucs2" | "ucs-2" | "utf16le" | "utf-16le" | "utf-8" | "utf8" | "latin1";
        /**
         * 接口调用失败的回调函数
         */
        fail?: WriteFileFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: WriteFileSuccessCallback;
    }

    interface FileSystemManager {
        /**
         *
         * [FileSystemManager.readdir](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.readdir.html) 的同步版本
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.readdirSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.readdirSync.html)
         */
        readdirSync(dirPath: string): string[];
        /**
         *
         * 判断文件/目录是否存在
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.access.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.access.html)
         */
        access(option: AccessOption): void;
        /**
         *
         * [FileSystemManager.access](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.access.html) 的同步版本
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.accessSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.accessSync.html)
         */
        accessSync(path: string): void;
        /**
         *
         * 在文件结尾追加内容
         *
         * 最低基础库： `2.1.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.appendFile.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.appendFile.html)
         */
        appendFile(option: AppendFileOption): void;
        /**
         *
         * [FileSystemManager.appendFile](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.appendFile.html) 的同步版本
         *
         * 最低基础库： `2.1.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.appendFileSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.appendFileSync.html)
         */
        appendFileSync(filePath: string, data: string | ArrayBuffer, encoding?: "ascii" | "base64" | "binary" | "hex" | "ucs2" | "ucs-2" | "utf16le" | "utf-16le" | "utf-8" | "utf8" | "latin1"): void;
        /**
         *
         * 复制文件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.copyFile.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.copyFile.html)
         */
        copyFile(option: CopyFileOption): void;
        /**
         *
         * [FileSystemManager.copyFile](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.copyFile.html) 的同步版本
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.copyFileSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.copyFileSync.html)
         */
        copyFileSync(srcPath: string, destPath: string): void;
        /**
         *
         * 获取该小程序下的 本地临时文件 或 本地缓存文件 信息
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.getFileInfo.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.getFileInfo.html)
         */
        getFileInfo(option: FileSystemManagerGetFileInfoOption): void;
        /**
         *
         * 获取该小程序下已保存的本地缓存文件列表
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.getSavedFileList.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.getSavedFileList.html)
         */
        getSavedFileList(option?: FileSystemManagerGetSavedFileListOption): void;
        /**
         *
         * 创建目录
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.mkdir.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.mkdir.html)
         */
        mkdir(option: MkdirOption): void;
        /**
         *
         * [FileSystemManager.mkdir](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.mkdir.html) 的同步版本
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.mkdirSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.mkdirSync.html)
         */
        mkdirSync(dirPath: string, recursive?: boolean): void;
        /**
         *
         * 读取本地文件内容
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.readFile.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.readFile.html)
         */
        readFile(option: ReadFileOption): void;
        /**
         *
         * 读取目录内文件列表
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.readdir.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.readdir.html)
         */
        readdir(option: ReaddirOption): void;
        /**
         *
         * 删除该小程序下已保存的本地缓存文件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.removeSavedFile.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.removeSavedFile.html)
         */
        removeSavedFile(option: FileSystemManagerRemoveSavedFileOption): void;
        /**
         *
         * 重命名文件。可以把文件从 oldPath 移动到 newPath
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.rename.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.rename.html)
         */
        rename(option: RenameOption): void;
        /**
         *
         * [FileSystemManager.rename](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.rename.html) 的同步版本
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.renameSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.renameSync.html)
         */
        renameSync(oldPath: string, newPath: string): void;
        /**
         *
         * 删除目录
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.rmdir.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.rmdir.html)
         */
        rmdir(option: RmdirOption): void;
        /**
         *
         * [FileSystemManager.rmdir](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.rmdir.html) 的同步版本
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.rmdirSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.rmdirSync.html)
         */
        rmdirSync(dirPath: string, recursive?: boolean): void;
        /**
         *
         * 保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用。
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.saveFile.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.saveFile.html)
         */
        saveFile(option: FileSystemManagerSaveFileOption): void;
        /**
         *
         * 获取文件 Stats 对象
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.stat.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.stat.html)
         */
        stat(option: StatOption): void;
        /**
         *
         * 删除文件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.unlink.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.unlink.html)
         */
        unlink(option: UnlinkOption): void;
        /**
         *
         * [FileSystemManager.unlink](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.unlink.html) 的同步版本
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.unlinkSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.unlinkSync.html)
         */
        unlinkSync(filePath: string): void;
        /**
         *
         * 解压文件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.unzip.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.unzip.html)
         */
        unzip(option: UnzipOption): void;
        /**
         *
         * 写文件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.writeFile.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.writeFile.html)
         */
        writeFile(option: WriteFileOption): void;
        /**
         *
         * [FileSystemManager.writeFile](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.writeFile.html) 的同步版本
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.writeFileSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.writeFileSync.html)
         */
        writeFileSync(filePath: string, data: string | ArrayBuffer, encoding?: "ascii" | "base64" | "binary" | "hex" | "ucs2" | "ucs-2" | "utf16le" | "utf-16le" | "utf-8" | "utf8" | "latin1"): void;
        /**
         *
         * [FileSystemManager.stat](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.stat.html) 的同步版本
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.statSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.statSync.html)
         */
        statSync(path: string, recursive?: boolean): Record<string, any> | Stats;
        /**
         *
         * [FileSystemManager.saveFile](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.saveFile.html) 的同步版本
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.saveFileSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.saveFileSync.html)
         */
        saveFileSync(tempFilePath: string, filePath?: string): string;
        /**
         *
         * [FileSystemManager.readFile](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.readFile.html) 的同步版本
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.readFileSync.html](https://developers.weixin.qq.com/miniprogram/dev/api/file/FileSystemManager.readFileSync.html)
         */
        readFileSync(filePath: string, encoding?: "ascii" | "base64" | "binary" | "hex" | "ucs2" | "ucs-2" | "utf16le" | "utf-16le" | "utf-8" | "utf8" | "latin1", position?: string, length?: string): string | ArrayBuffer;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ExitFullScreenCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type ExitFullScreenFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type ExitFullScreenSuccessCallback = (res: GeneralCallbackResult) => void;

    interface ExitFullScreenOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ExitFullScreenCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: ExitFullScreenFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: ExitFullScreenSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ExitPictureInPictureCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type ExitPictureInPictureFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type ExitPictureInPictureSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface ExitPictureInPictureOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ExitPictureInPictureCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: ExitPictureInPictureFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: ExitPictureInPictureSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type MuteCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type MuteFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type MuteSuccessCallback = (res: GeneralCallbackResult) => void;

    interface MuteOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: MuteCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: MuteFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: MuteSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type PauseCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type PauseFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type PauseSuccessCallback = (res: GeneralCallbackResult) => void;

    interface PauseOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: PauseCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: PauseFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: PauseSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type PlayCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type PlayFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type PlaySuccessCallback = (res: GeneralCallbackResult) => void;

    interface PlayOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: PlayCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: PlayFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: PlaySuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type RequestFullScreenCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type RequestFullScreenFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type RequestFullScreenSuccessCallback = (res: GeneralCallbackResult) => void;

    interface LivePlayerContextRequestFullScreenOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: RequestFullScreenCompleteCallback;
        /**
         * 设置全屏时的方向
         *
         * 可选值：
         * - 0: 正常竖向;
         * - 90: 屏幕逆时针90度;
         * - -90: 屏幕顺时针90度;
         */
        direction?: 0 | 90 | -90;
        /**
         * 接口调用失败的回调函数
         */
        fail?: RequestFullScreenFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: RequestFullScreenSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ResumeCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type ResumeFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type ResumeSuccessCallback = (res: GeneralCallbackResult) => void;

    interface ResumeOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ResumeCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: ResumeFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: ResumeSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StopCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StopFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StopSuccessCallback = (res: GeneralCallbackResult) => void;

    interface StopOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StopCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StopFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StopSuccessCallback;
    }

    interface LivePlayerContext {
        /**
         *
         * 退出全屏
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.exitFullScreen.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.exitFullScreen.html)
         */
        exitFullScreen(option?: ExitFullScreenOption): void;
        /**
         *
         * 退出小窗，该方法可在任意页面调用
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.exitPictureInPicture.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.exitPictureInPicture.html)
         */
        exitPictureInPicture(option?: ExitPictureInPictureOption): void;
        /**
         *
         * 静音
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.mute.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.mute.html)
         */
        mute(option?: MuteOption): void;
        /**
         *
         * 暂停
         *
         * 最低基础库： `1.9.90`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.pause.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.pause.html)
         */
        pause(option?: PauseOption): void;
        /**
         *
         * 播放
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.play.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.play.html)
         */
        play(option?: PlayOption): void;
        /**
         *
         * 进入全屏
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.requestFullScreen.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.requestFullScreen.html)
         */
        requestFullScreen(option: LivePlayerContextRequestFullScreenOption): void;
        /**
         *
         * 恢复
         *
         * 最低基础库： `1.9.90`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.resume.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.resume.html)
         */
        resume(option?: ResumeOption): void;
        /**
         *
         * 截图
         *
         * 最低基础库： `2.7.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.snapshot.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.snapshot.html)
         */
        snapshot(quality?: string): void;
        /**
         *
         * 停止
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.stop.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePlayerContext.stop.html)
         */
        stop(option?: StopOption): void;
    }

    interface GetLogManagerOption {
        /**
         * 取值为0/1，取值为0表示是否会把 `App`、`Page` 的生命周期函数和 uni 命名空间下的函数调用写入日志，取值为1则不会。默认值是 0
         *
         * 最低基础库： `2.3.2`
         */
        level?: number;
    }

    interface LogManager {
        /**
         *
         * 写 debug 日志
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/LogManager.debug.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/LogManager.debug.html)
         */
        debug(args: any[]): void;
        /**
         *
         * 写 info 日志
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/LogManager.info.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/LogManager.info.html)
         */
        info(args: any[]): void;
        /**
         *
         * 写 log 日志
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/LogManager.log.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/LogManager.log.html)
         */
        log(args: any[]): void;
        /**
         *
         * 写 warn 日志
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/LogManager.warn.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/LogManager.warn.html)
         */
        warn(args: any[]): void;
    }

    /**
     * 可通过 [MediaContainer.extractDataSource](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/MediaContainer.extractDataSource.html) 返回。
     *
     * [MediaTrack](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/MediaTrack.html) 音频或视频轨道，可以对轨道进行一些操作
     *
     * 最低基础库： `2.9.0`
     */
    interface MediaTrack {
        /**
         * 轨道长度，只读
         */
        duration: number;
        /**
         * 轨道类型，只读
         *
         * 可选值：
         * - 'audio': 音频轨道;
         * - 'video': 视频轨道;
         */
        kind: "audio" | "video";
        /**
         * 音量，音频轨道下有效，可写
         */
        volume: number;
    }

    interface ExtractDataSourceOption {
        /**
         * 视频源地址，只支持本地文件
         */
        source: string;
    }

    interface MediaContainer {
        /**
         *
         * 将音频或视频轨道添加到容器
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/MediaContainer.addTrack.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/MediaContainer.addTrack.html)
         */
        addTrack(track: MediaTrack): void;
        /**
         *
         * 将容器销毁，释放资源
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/MediaContainer.destroy.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/MediaContainer.destroy.html)
         */
        destroy(): void;
        /**
         *
         * 将容器内的轨道合并并导出视频文件
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/MediaContainer.export.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/MediaContainer.export.html)
         */
        export(): void;
        /**
         *
         * 将传入的视频源分离轨道。不会自动将轨道添加到待合成的容器里。
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/MediaContainer.extractDataSource.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/MediaContainer.extractDataSource.html)
         */
        extractDataSource(option: ExtractDataSourceOption): void;
        /**
         *
         * 将音频或视频轨道从容器中移除
         *
         * 最低基础库： `2.9.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/MediaContainer.removeTrack.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-processing/MediaContainer.removeTrack.html)
         */
        removeTrack(track: MediaTrack): void;
    }

    interface CreateMediaRecorderOption {
        /**
         * 指定录制的时长（s)，到达自动停止。最大 7200，最小 5
         */
        duration?: number;
        /**
         * 视频 fps
         */
        fps?: number;
        /**
         * 视频关键帧间隔
         */
        gop?: number;
        /**
         * 视频比特率（kbps），最小值 600，最大值 3000
         */
        videoBitsPerSecond?: number;
    }

    interface MediaRecorder {
        /**
         *
         * 销毁录制器
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.destroy.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.destroy.html)
         */
        destroy(): void;
        /**
         *
         * 取消监听录制事件。当对应事件触发时，该回调函数不再执行。
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.off.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.off.html)
         */
        off(eventName: string, callback: (...args: any[]) => any): void;
        /**
         *
         * 注册监听录制事件的回调函数。当对应事件触发时，回调函数会被执行。
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.on.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.on.html)
         */
        on(eventName: "start" | "stop", callback: (...args: any[]) => any): void;
        /**
         *
         * 暂停录制
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.pause.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.pause.html)
         */
        pause(): void;
        /**
         *
         * 请求下一帧录制，在 callback 里完成一帧渲染后开始录制当前帧
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.requestFrame.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.requestFrame.html)
         */
        requestFrame(callback: (...args: any[]) => any): void;
        /**
         *
         * 恢复录制
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.resume.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.resume.html)
         */
        resume(): void;
        /**
         *
         * 开始录制
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.start.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.start.html)
         */
        start(): void;
        /**
         *
         * 结束录制
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.stop.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/media-recorder/MediaRecorder.stop.html)
         */
        stop(): void;
    }

    /**
     * 标签类型枚举
     */
    interface TechType {
        /**
         * 对应IsoDep实例，实例支持ISO-DEP (ISO 14443-4)标准的读写
         */
        isoDep: string;
        /**
         * 对应MifareClassic实例，实例支持MIFARE Classic标签的读写
         */
        mifareClassic: string;
        /**
         * 对应MifareUltralight实例，实例支持MIFARE Ultralight标签的读写
         */
        mifareUltralight: string;
        /**
         * 对应Ndef实例，实例支持对NDEF格式的NFC标签上的NDEF数据的读写
         */
        ndef: string;
        /**
         * 对应NfcA实例，实例支持NFC-A (ISO 14443-3A)标准的读写
         */
        nfcA: string;
        /**
         * 对应NfcB实例，实例支持NFC-B (ISO 14443-3B)标准的读写
         */
        nfcB: string;
        /**
         * 对应NfcF实例，实例支持NFC-F (JIS 6319-4)标准的读写
         */
        nfcF: string;
        /**
         * 对应NfcV实例，实例支持NFC-V (ISO 15693)标准的读写
         */
        nfcV: string;
    }

    /**
     * 最低基础库： `2.11.2`
     */
    interface NFCAdapter {
        /**
         * 标签类型枚举
         */
        tech: TechType;
    }

    interface OffscreenCanvas {
        /**
         *
         * 该方法返回 OffscreenCanvas 的绘图上下文
         *
         * ****
         *
         * 当前仅支持获取 WebGL 绘图上下文
         *
         * 最低基础库： `2.7.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/canvas/OffscreenCanvas.getContext.html](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/OffscreenCanvas.getContext.html)
         */
        getContext(contextType: string): any;
    }

    interface RealtimeLogManager {
        /**
         *
         * 添加过滤关键字
         *
         * 最低基础库： `2.8.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.addFilterMsg.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.addFilterMsg.html)
         */
        addFilterMsg(msg: string): void;
        /**
         *
         * 写 error 日志
         *
         * 最低基础库： `2.7.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.error.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.error.html)
         */
        error(args: any[]): void;
        /**
         *
         * 设置实时日志page参数所在的页面
         *
         * 最低基础库： `2.9.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.in.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.in.html)
         */
        in(pageInstance: any): void;
        /**
         *
         * 写 info 日志
         *
         * 最低基础库： `2.7.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.info.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.info.html)
         */
        info(args: any[]): void;
        /**
         *
         * 设置过滤关键字
         *
         * 最低基础库： `2.7.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.setFilterMsg.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.setFilterMsg.html)
         */
        setFilterMsg(msg: string): void;
        /**
         *
         * 写 warn 日志
         *
         * 最低基础库： `2.7.1`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.warn.html](https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.warn.html)
         */
        warn(args: any[]): void;
    }

    type OffCloseCallback = (res: GeneralCallbackResult) => void;
    type OffErrorCallback = (res: GeneralCallbackResult) => void;
    /**
     * 开始监听数据包消息的事件的回调函数
     */
    type OffListeningCallback = (res: GeneralCallbackResult) => void;
    /**
     * 收到消息的事件的回调函数
     */
    type OffMessageCallback = (res: GeneralCallbackResult) => void;
    type UDPSocketOnCloseCallback = (res: GeneralCallbackResult) => void;

    interface UDPSocketOnErrorCallbackResult {
        /**
         * 错误信息
         */
        errMsg: string;
    }

    type UDPSocketOnErrorCallback = (
                result: UDPSocketOnErrorCallbackResult
            ) => void;
    /**
     * 开始监听数据包消息的事件的回调函数
     */
    type OnListeningCallback = (res: GeneralCallbackResult) => void;

    /**
     * 消息来源的结构化信息
     */
    interface RemoteInfo {
        /**
         * 发送消息的 socket 的地址
         */
        address: string;
        /**
         * 使用的协议族，为 IPv4 或者 IPv6
         */
        family: string;
        /**
         * 端口号
         */
        port: number;
        /**
         * message 的大小，单位：字节
         */
        size: number;
    }

    interface UDPSocketOnMessageCallbackResult {
        /**
         * 收到的消息
         */
        message: ArrayBuffer;
        /**
         * 消息来源的结构化信息
         */
        remoteInfo: RemoteInfo;
    }

    /**
     * 收到消息的事件的回调函数
     */
    type UDPSocketOnMessageCallback = (
                result: UDPSocketOnMessageCallbackResult
            ) => void;

    interface UDPSocketSendOption {
        /**
         * 要发消息的地址。在基础库 2.9.3 及之前版本可以是一个和本机同网段的 IP 地址，也可以是在安全域名列表内的域名地址；在基础库 2.9.4 及之后版本，可以是任意 IP 和域名
         */
        address: string;
        /**
         * 要发送的数据
         */
        message: string | ArrayBuffer;
        /**
         * 要发送消息的端口号
         */
        port: number;
        /**
         * 发送数据的长度，仅当 message 为 ArrayBuffer 类型时有效
         */
        length?: number;
        /**
         * 发送数据的偏移量，仅当 message 为 ArrayBuffer 类型时有效
         */
        offset?: number;
    }

    interface UDPSocket {
        /**
         *
         * 关闭 UDP Socket 实例，相当于销毁。 在关闭之后，UDP Socket 实例不能再发送消息，每次调用 `UDPSocket.send` 将会触发错误事件，并且 message 事件回调函数也不会再也执行。在 `UDPSocket` 实例被创建后将被 Native 强引用，保证其不被 GC。在 `UDPSocket.close` 后将解除对其的强引用，让 UDPSocket 实例遵从 GC。
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.close.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.close.html)
         */
        close(): void;
        /**
         *
         * 取消监听关闭事件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.offClose.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.offClose.html)
         */
        offClose(callback: OffCloseCallback): void;
        /**
         *
         * 取消监听错误事件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.offError.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.offError.html)
         */
        offError(callback: OffErrorCallback): void;
        /**
         *
         * 取消监听开始监听数据包消息的事件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.offListening.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.offListening.html)
         */
        offListening(callback: OffListeningCallback): void;
        /**
         *
         * 取消监听收到消息的事件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.offMessage.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.offMessage.html)
         */
        offMessage(callback: OffMessageCallback): void;
        /**
         *
         * 监听关闭事件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.onClose.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.onClose.html)
         */
        onClose(callback: UDPSocketOnCloseCallback): void;
        /**
         *
         * 监听错误事件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.onError.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.onError.html)
         */
        onError(callback: UDPSocketOnErrorCallback): void;
        /**
         *
         * 监听开始监听数据包消息的事件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.onListening.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.onListening.html)
         */
        onListening(callback: OnListeningCallback): void;
        /**
         *
         * 监听收到消息的事件
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.onMessage.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.onMessage.html)
         */
        onMessage(callback: UDPSocketOnMessageCallback): void;
        /**
         *
         * 向指定的 IP 和 port 发送消息
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.send.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.send.html)
         */
        send(option: UDPSocketSendOption): void;
        /**
         *
         * 绑定一个系统随机分配的可用端口，或绑定一个指定的端口号
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.bind.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/udp/UDPSocket.bind.html)
         */
        bind(port?: number): number;
    }

    /**
     * 视频帧数据，若取不到则返回 null。当缓冲区为空的时候可能暂停取不到数据。
     */
    interface FrameDataOptions {
        /**
         * 帧数据
         */
        data: ArrayBuffer;
        /**
         * 帧数据高度
         */
        height: number;
        /**
         * 帧原始 dts
         */
        pkDts: number;
        /**
         * 帧原始 pts
         */
        pkPts: number;
        /**
         * 帧数据宽度
         */
        width: number;
    }

    interface VideoDecoderStartOption {
        /**
         * 需要解码的视频源文件，只支持本地路径
         */
        source: string;
        /**
         * 解码模式。0：按 pts 解码；1：以最快速度解码
         */
        mode?: number;
    }

    interface VideoDecoder {
        /**
         *
         * 获取下一帧的解码数据
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.getFrameData.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.getFrameData.html)
         */
        getFrameData(): FrameDataOptions;
        /**
         *
         * 取消监听录制事件。当对应事件触发时，该回调函数不再执行
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.off.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.off.html)
         */
        off(eventName: string, callback: (...args: any[]) => any): void;
        /**
         *
         * 注册监听录制事件的回调函数。当对应事件触发时，回调函数会被执行
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.on.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.on.html)
         */
        on(eventName: "start" | "stop" | "seek" | "bufferchange" | "ended", callback: (...args: any[]) => any): void;
        /**
         *
         * 移除解码器
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.remove.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.remove.html)
         */
        remove(): void;
        /**
         *
         * 跳到某个时间点解码
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.seek.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.seek.html)
         */
        seek(position: number): void;
        /**
         *
         * 开始解码
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.start.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.start.html)
         */
        start(option: VideoDecoderStartOption): void;
        /**
         *
         * 停止解码
         *
         * 最低基础库： `2.11.0`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.stop.html](https://developers.weixin.qq.com/miniprogram/dev/api/media/video-decoder/VideoDecoder.stop.html)
         */
        stop(): void;
    }

    /**
     * 需要添加的卡券列表
     */
    interface AddCardRequestInfo {
        /**
         * 卡券的扩展参数。需将 CardExt 对象 JSON 序列化为**字符串**传入
         */
        cardExt: string;
        /**
         * 卡券 ID
         */
        cardId: string;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type AddCardCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type AddCardFailCallback = (res: GeneralCallbackResult) => void;

    /**
     * 卡券添加结果列表
     */
    interface AddCardResponseInfo {
        /**
         * 卡券的扩展参数，结构请参考下文
         */
        cardExt: string;
        /**
         * 用户领取到卡券的 ID
         */
        cardId: string;
        /**
         * 加密 code，为用户领取到卡券的code加密后的字符串，解密请参照：[code 解码接口](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1499332673_Unm7V)
         */
        code: string;
        /**
         * 是否成功
         */
        isSuccess: boolean;
    }

    interface AddCardSuccessCallbackResult {
        /**
         * 卡券添加结果列表
         */
        cardList: AddCardResponseInfo[];
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type AddCardSuccessCallback = (result: AddCardSuccessCallbackResult) => void;

    interface AddCardOption {
        /**
         * 需要添加的卡券列表
         */
        cardList: AddCardRequestInfo[];
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: AddCardCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: AddCardFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: AddCardSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ChooseInvoiceCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type ChooseInvoiceFailCallback = (res: GeneralCallbackResult) => void;

    interface ChooseInvoiceSuccessCallbackResult {
        /**
         * 用户选中的发票信息，格式为一个 JSON 字符串，包含三个字段： card_id：所选发票卡券的 cardId，encrypt_code：所选发票卡券的加密 code，报销方可以通过 cardId 和 encryptCode 获得报销发票的信息，app_id： 发票方的 appId。
         */
        invoiceInfo: string;
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type ChooseInvoiceSuccessCallback = (
                result: ChooseInvoiceSuccessCallbackResult
            ) => void;

    interface ChooseInvoiceOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ChooseInvoiceCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: ChooseInvoiceFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: ChooseInvoiceSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ChooseMediaCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type ChooseMediaFailCallback = (res: GeneralCallbackResult) => void;

    /**
     * 本地临时文件列表
     */
    interface MediaFile {
        /**
         * 视频的时间长度
         */
        duration: number;
        /**
         * 视频的高度
         */
        height: number;
        /**
         * 本地临时文件大小，单位 B
         */
        size: number;
        /**
         * 本地临时文件路径 (本地路径)
         */
        tempFilePath: string;
        /**
         * 视频缩略图临时文件路径
         */
        thumbTempFilePath: string;
        /**
         * 视频的宽度
         */
        width: number;
    }

    interface ChooseMediaSuccessCallbackResult {
        /**
         * 本地临时文件列表
         */
        tempFiles: MediaFile[];
        /**
         * 文件类型，有效值有 image 、video
         */
        type: string;
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type ChooseMediaSuccessCallback = (
                result: ChooseMediaSuccessCallbackResult
            ) => void;

    interface ChooseMediaOption {
        /**
         * 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头
         *
         * 可选值：
         * - 'back': 使用后置摄像头;
         * - 'front': 使用前置摄像头;
         */
        camera?: "back" | "front";
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ChooseMediaCompleteCallback;
        /**
         * 最多可以选择的文件个数
         */
        count?: number;
        /**
         * 接口调用失败的回调函数
         */
        fail?: ChooseMediaFailCallback;
        /**
         * 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 30s 之间
         */
        maxDuration?: number;
        /**
         * 文件类型
         *
         * 可选值：
         * - 'image': 只能拍摄图片或从相册选择图片;
         * - 'video': 只能拍摄视频或从相册选择视频;
         */
        mediaType?: ("video" | "image")[];
        /**
         * 仅对 mediaType 为 image 时有效，是否压缩所选文件
         */
        sizeType?: string[];
        /**
         * 图片和视频选择的来源
         *
         * 可选值：
         * - 'album': 从相册选择;
         * - 'camera': 使用相机拍摄;
         */
        sourceType?: ("album" | "camera")[];
        /**
         * 接口调用成功的回调函数
         */
        success?: ChooseMediaSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ChooseMessageFileCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type ChooseMessageFileFailCallback = (res: GeneralCallbackResult) => void;

    /**
     * 返回选择的文件的本地临时文件对象数组
     */
    interface ChooseFile {
        /**
         * 选择的文件名称
         */
        name: string;
        /**
         * 本地临时文件路径 (本地路径)
         */
        path: string;
        /**
         * 本地临时文件大小，单位 B
         */
        size: number;
        /**
         * 选择的文件的会话发送时间，Unix时间戳，工具暂不支持此属性
         */
        time: number;
        /**
         * 选择的文件类型
         *
         * 可选值：
         * - 'video': 选择了视频文件;
         * - 'image': 选择了图片文件;
         * - 'file': 选择了除图片和视频的文件;
         */
        type: "video" | "image" | "file";
    }

    interface ChooseMessageFileSuccessCallbackResult {
        /**
         * 返回选择的文件的本地临时文件对象数组
         */
        tempFiles: ChooseFile[];
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type ChooseMessageFileSuccessCallback = (
                result: ChooseMessageFileSuccessCallbackResult
            ) => void;

    interface ChooseMessageFileOption {
        /**
         * 最多可以选择的文件个数，可以 0～100
         */
        count: number;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ChooseMessageFileCompleteCallback;
        /**
         * 根据文件拓展名过滤，仅 type==file 时有效。每一项都不能是空字符串。默认不过滤。
         *
         * 最低基础库： `2.6.0`
         */
        extension?: string[];
        /**
         * 接口调用失败的回调函数
         */
        fail?: ChooseMessageFileFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: ChooseMessageFileSuccessCallback;
        /**
         * 所选的文件的类型
         *
         * 可选值：
         * - 'all': 从所有文件选择;
         * - 'video': 只能选择视频文件;
         * - 'image': 只能选择图片文件;
         * - 'file': 可以选择除了图片和视频之外的其它的文件;
         */
        type?: "video" | "image" | "file" | "all";
    }

    interface WifiError {
        /**
         * 错误信息
         *
         * | 错误码 | 错误信息 | 说明 |
         * | - | - | - |
         * | 0 | ok | 正常 |
         * | 12000 | not init | 未先调用 `startWifi` 接口 |
         * | 12001 | system not support | 当前系统不支持相关能力 |
         * | 12002 | password error Wi-Fi | 密码错误 |
         * | 12003 | connection timeout | 连接超时 |
         * | 12004 | duplicate request | 重复连接 Wi-Fi |
         * | 12005 | wifi not turned on | Android 特有，未打开 Wi-Fi 开关 |
         * | 12006 | gps not turned on | Android 特有，未打开 GPS 定位开关 |
         * | 12007 | user denied | 用户拒绝授权链接 Wi-Fi |
         * | 12008 | invalid SSID | 无效 SSID |
         * | 12009 | system config err | 系统运营商配置拒绝连接 Wi-Fi |
         * | 12010 | system internal error | 系统其他错误，需要在 errmsg 打印具体的错误原因 |
         * | 12011 | weapp in background | 应用在后台无法配置 Wi-Fi |
         * | 12013 | wifi config may be expired | 系统保存的 Wi-Fi 配置过期，建议忘记 Wi-Fi 后重试 |
         */
        errMsg: string;
        /**
         * 错误码
         *
         * | 错误码 | 错误信息 | 说明 |
         * | - | - | - |
         * | 0 | ok | 正常 |
         * | 12000 | not init | 未先调用 `startWifi` 接口 |
         * | 12001 | system not support | 当前系统不支持相关能力 |
         * | 12002 | password error Wi-Fi | 密码错误 |
         * | 12003 | connection timeout | 连接超时 |
         * | 12004 | duplicate request | 重复连接 Wi-Fi |
         * | 12005 | wifi not turned on | Android 特有，未打开 Wi-Fi 开关 |
         * | 12006 | gps not turned on | Android 特有，未打开 GPS 定位开关 |
         * | 12007 | user denied | 用户拒绝授权链接 Wi-Fi |
         * | 12008 | invalid SSID | 无效 SSID |
         * | 12009 | system config err | 系统运营商配置拒绝连接 Wi-Fi |
         * | 12010 | system internal error | 系统其他错误，需要在 errmsg 打印具体的错误原因 |
         * | 12011 | weapp in background | 应用在后台无法配置 Wi-Fi |
         * | 12013 | wifi config may be expired | 系统保存的 Wi-Fi 配置过期，建议忘记 Wi-Fi 后重试 |
         */
        errCode: number;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ConnectWifiCompleteCallback = (res: WifiError) => void;
    /**
     * 接口调用失败的回调函数
     */
    type ConnectWifiFailCallback = (res: WifiError) => void;
    /**
     * 接口调用成功的回调函数
     */
    type ConnectWifiSuccessCallback = (res: WifiError) => void;

    interface ConnectWifiOption {
        /**
         * Wi-Fi 设备 SSID
         */
        SSID: string;
        /**
         * Wi-Fi 设备密码
         */
        password: string;
        /**
         * Wi-Fi 设备 BSSID
         */
        BSSID?: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ConnectWifiCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: ConnectWifiFailCallback;
        /**
         * 跳转到系统设置页进行连接，仅安卓生效
         *
         * 最低基础库： `2.12.0`
         */
        maunal?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: ConnectWifiSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type CreateBLEPeripheralServerCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type CreateBLEPeripheralServerFailCallback = (
                res: GeneralCallbackResult
            ) => void;

    /**
     * 描述符的权限
     */
    interface DescriptorPermission {
        /**
         * 读
         */
        read?: boolean;
        /**
         * 写
         */
        write?: boolean;
    }

    /**
     * 描述符数据
     */
    interface CharacteristicDescriptor {
        /**
         * Descriptor 的 uuid
         */
        uuid: string;
        /**
         * 描述符的权限
         */
        permission?: DescriptorPermission;
        /**
         * 描述符数据
         */
        value?: ArrayBuffer;
    }

    /**
     * 特征值权限
     */
    interface CharacteristicPermission {
        /**
         * 加密读请求
         */
        readEncryptionRequired?: boolean;
        /**
         * 可读
         */
        readable?: boolean;
        /**
         * 加密写请求
         */
        writeEncryptionRequired?: boolean;
        /**
         * 可写
         */
        writeable?: boolean;
    }

    /**
     * 特征值支持的操作
     */
    interface CharacteristicProperties {
        /**
         * 回包
         */
        indicate?: boolean;
        /**
         * 订阅
         */
        notify?: boolean;
        /**
         * 读
         */
        read?: boolean;
        /**
         * 写
         */
        write?: boolean;
    }

    /**
     * characteristics列表
     */
    interface Characteristic {
        /**
         * Characteristic 的 uuid
         */
        uuid: string;
        /**
         * 描述符数据
         */
        descriptors?: CharacteristicDescriptor[];
        /**
         * 特征值权限
         */
        permission?: CharacteristicPermission;
        /**
         * 特征值支持的操作
         */
        properties?: CharacteristicProperties;
        /**
         * 特征值对应的二进制值
         */
        value?: ArrayBuffer;
    }

    /**
     * 描述service的Object
     */
    interface BLEPeripheralService {
        /**
         * characteristics列表
         */
        characteristics: Characteristic[];
        /**
         * service 的 uuid
         */
        uuid: string;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type AddServiceCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type AddServiceFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type AddServiceSuccessCallback = (res: GeneralCallbackResult) => void;

    interface AddServiceOption {
        /**
         * 描述service的Object
         */
        service: BLEPeripheralService;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: AddServiceCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: AddServiceFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: AddServiceSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type CloseCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type CloseFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type CloseSuccessCallback = (res: GeneralCallbackResult) => void;

    interface NdefCloseOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: CloseCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: CloseFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: CloseSuccessCallback;
    }

    /**
     * 已连接的设备请求读当前外围设备的特征值事件的回调函数
     */
    type OffCharacteristicReadRequestCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 已连接的设备请求写当前外围设备的特征值事件的回调函数
     */
    type OffCharacteristicWriteRequestCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface OnCharacteristicReadRequestCallbackResult {
        /**
         * 唯一标识码，调用 writeCharacteristicValue 时使用
         */
        callbackId: number;
        /**
         * characteristic对应的uuid
         */
        characteristicId: string;
        /**
         * service对应的uuid
         */
        serviceId: string;
    }

    /**
     * 已连接的设备请求读当前外围设备的特征值事件的回调函数
     */
    type OnCharacteristicReadRequestCallback = (
                result: OnCharacteristicReadRequestCallbackResult
            ) => void;

    interface OnCharacteristicWriteRequestCallbackResult {
        /**
         * 唯一标识码，调用 writeCharacteristicValue 时使用
         */
        callbackId: number;
        /**
         * characteristic对应的uuid
         */
        characteristicId: string;
        /**
         * service对应的uuid
         */
        serviceId: string;
        /**
         * 请求写入的特征值数据
         */
        value: ArrayBuffer;
    }

    /**
     * 已连接的设备请求写当前外围设备的特征值事件的回调函数
     */
    type OnCharacteristicWriteRequestCallback = (
                result: OnCharacteristicWriteRequestCallbackResult
            ) => void;
    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type RemoveServiceCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type RemoveServiceFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type RemoveServiceSuccessCallback = (res: GeneralCallbackResult) => void;

    interface RemoveServiceOption {
        /**
         * service 的 uuid
         */
        serviceId: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: RemoveServiceCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: RemoveServiceFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: RemoveServiceSuccessCallback;
    }

    /**
     * 广播的制造商信息, 仅安卓支持
     */
    interface ManufacturerData {
        /**
         * 制造商ID，0x 开头的十六进制
         */
        manufacturerId: string;
        /**
         * 制造商信息
         */
        manufacturerSpecificData?: ArrayBuffer;
    }

    /**
     * 广播自定义参数
     */
    interface AdvertiseReqObj {
        /**
         * 当前Service是否可连接
         */
        connectable?: boolean;
        /**
         * 广播中deviceName字段，默认为空
         */
        deviceName?: string;
        /**
         * 广播的制造商信息, 仅安卓支持
         */
        manufacturerData?: ManufacturerData[];
        /**
         * 要广播的serviceUuid列表
         */
        serviceUuids?: string[];
    }

    interface StartAdvertisingObject {
        /**
         * 广播自定义参数
         */
        advertiseRequest: AdvertiseReqObj;
        /**
         * 广播功率
         *
         * 可选值：
         * - 'low': 功率低;
         * - 'medium': 功率适中;
         * - 'high': 功率高;
         */
        powerLevel?: "low" | "medium" | "high";
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StopAdvertisingCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StopAdvertisingFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StopAdvertisingSuccessCallback = (res: GeneralCallbackResult) => void;

    interface StopAdvertisingOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StopAdvertisingCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StopAdvertisingFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StopAdvertisingSuccessCallback;
    }

    interface WriteCharacteristicValueObject {
        /**
         * characteristic对应的uuid
         */
        characteristicId: string;
        /**
         * 是否需要通知主机value已更新
         */
        needNotify: boolean;
        /**
         * service 的 uuid
         */
        serviceId: string;
        /**
         * 特征值对应的二进制值
         */
        value: ArrayBuffer;
        /**
         * 可选，处理回包时使用
         */
        callbackId?: number;
    }

    interface BLEPeripheralServer {
        /**
         *
         * 添加服务。
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.addService.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.addService.html)
         */
        addService(option: AddServiceOption): void;
        /**
         *
         * 关闭当前服务端。
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.close.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.close.html)
         */
        close(option?: NdefCloseOption): void;
        /**
         *
         * 取消监听已连接的设备请求读当前外围设备的特征值事件
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.offCharacteristicReadRequest.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.offCharacteristicReadRequest.html)
         */
        offCharacteristicReadRequest(callback: OffCharacteristicReadRequestCallback): void;
        /**
         *
         * 取消监听已连接的设备请求写当前外围设备的特征值事件
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.offCharacteristicWriteRequest.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.offCharacteristicWriteRequest.html)
         */
        offCharacteristicWriteRequest(callback: OffCharacteristicWriteRequestCallback): void;
        /**
         *
         * 监听已连接的设备请求读当前外围设备的特征值事件。收到该消息后需要立刻调用 `writeCharacteristicValue` 写回数据，否则主机不会收到响应。
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.onCharacteristicReadRequest.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.onCharacteristicReadRequest.html)
         */
        onCharacteristicReadRequest(callback: OnCharacteristicReadRequestCallback): void;
        /**
         *
         * 监听已连接的设备请求写当前外围设备的特征值事件。收到该消息后需要立刻调用 `writeCharacteristicValue` 写回数据，否则主机不会收到响应。
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.onCharacteristicWriteRequest.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.onCharacteristicWriteRequest.html)
         */
        onCharacteristicWriteRequest(callback: OnCharacteristicWriteRequestCallback): void;
        /**
         *
         * 移除服务。
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.removeService.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.removeService.html)
         */
        removeService(option: RemoveServiceOption): void;
        /**
         *
         * 开始广播本地创建的外围设备。
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.startAdvertising.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.startAdvertising.html)
         */
        startAdvertising(Object: StartAdvertisingObject): void;
        /**
         *
         * 停止广播。
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.stopAdvertising.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.stopAdvertising.html)
         */
        stopAdvertising(option?: StopAdvertisingOption): void;
        /**
         *
         * 往指定特征值写入数据，并通知已连接的主机，从机的特征值已发生变化，该接口会处理是走回包还是走订阅。
         *
         * 最低基础库： `2.10.3`
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.writeCharacteristicValue.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.writeCharacteristicValue.html)
         */
        writeCharacteristicValue(Object: WriteCharacteristicValueObject): void;
    }

    interface CreateBLEPeripheralServerSuccessCallbackResult {
        /**
         *
         * 外围设备的服务端。
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-peripheral/BLEPeripheralServer.html)
         */
        server: BLEPeripheralServer;
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type CreateBLEPeripheralServerSuccessCallback = (
                result: CreateBLEPeripheralServerSuccessCallbackResult
            ) => void;

    interface CreateBLEPeripheralServerOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: CreateBLEPeripheralServerCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: CreateBLEPeripheralServerFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: CreateBLEPeripheralServerSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type DisableAlertBeforeUnloadCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type DisableAlertBeforeUnloadFailCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用成功的回调函数
     */
    type DisableAlertBeforeUnloadSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface DisableAlertBeforeUnloadOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: DisableAlertBeforeUnloadCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: DisableAlertBeforeUnloadFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: DisableAlertBeforeUnloadSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type EnableAlertBeforeUnloadCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type EnableAlertBeforeUnloadFailCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用成功的回调函数
     */
    type EnableAlertBeforeUnloadSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface EnableAlertBeforeUnloadOption {
        /**
         * 询问对话框内容
         */
        message: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: EnableAlertBeforeUnloadCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: EnableAlertBeforeUnloadFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: EnableAlertBeforeUnloadSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ExitVoIPChatCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type ExitVoIPChatFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type ExitVoIPChatSuccessCallback = (res: GeneralCallbackResult) => void;

    interface ExitVoIPChatOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ExitVoIPChatCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: ExitVoIPChatFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: ExitVoIPChatSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type GetAvailableAudioSourcesCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type GetAvailableAudioSourcesFailCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface GetAvailableAudioSourcesSuccessCallbackResult {
        /**
         * 支持的音频输入源列表，可在 [RecorderManager.start()](https://developers.weixin.qq.com/miniprogram/dev/api/media/recorder/RecorderManager.start.html) 接口中使用。返回值定义参考 https://developer.android.com/reference/kotlin/android/media/MediaRecorder.AudioSource
         *
         * 可选值：
         * - 'auto': 自动设置，默认使用手机麦克风，插上耳麦后自动切换使用耳机麦克风，所有平台适用;
         * - 'buildInMic': 手机麦克风，仅限 iOS;
         * - 'headsetMic': 耳机麦克风，仅限 iOS;
         * - 'mic': 麦克风（没插耳麦时是手机麦克风，插耳麦时是耳机麦克风），仅限 Android;
         * - 'camcorder': 同 mic，适用于录制音视频内容，仅限 Android;
         * - 'voice_communication': 同 mic，适用于实时沟通，仅限 Android;
         * - 'voice_recognition': 同 mic，适用于语音识别，仅限 Android;
         */
        audioSources: ("auto" | "buildInMic" | "headsetMic" | "mic" | "camcorder" | "voice_communication" | "voice_recognition")[];
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type GetAvailableAudioSourcesSuccessCallback = (
                result: GetAvailableAudioSourcesSuccessCallbackResult
            ) => void;

    interface GetAvailableAudioSourcesOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: GetAvailableAudioSourcesCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: GetAvailableAudioSourcesFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: GetAvailableAudioSourcesSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type GetBackgroundAudioPlayerStateCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type GetBackgroundAudioPlayerStateFailCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface GetBackgroundAudioPlayerStateSuccessCallbackResult {
        /**
         * 选定音频的播放位置（单位：s），只有在音乐播放中时返回
         */
        currentPosition: number;
        /**
         * 歌曲数据链接，只有在音乐播放中时返回
         */
        dataUrl: string;
        /**
         * 音频的下载进度百分比，只有在音乐播放中时返回
         */
        downloadPercent: number;
        /**
         * 选定音频的长度（单位：s），只有在音乐播放中时返回
         */
        duration: number;
        /**
         * 播放状态
         *
         * 可选值：
         * - 0: 暂停中;
         * - 1: 播放中;
         * - 2: 没有音乐播放;
         */
        status: 0 | 1 | 2;
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type GetBackgroundAudioPlayerStateSuccessCallback = (
                result: GetBackgroundAudioPlayerStateSuccessCallbackResult
            ) => void;

    interface GetBackgroundAudioPlayerStateOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: GetBackgroundAudioPlayerStateCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: GetBackgroundAudioPlayerStateFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: GetBackgroundAudioPlayerStateSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type GetBackgroundFetchDataCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type GetBackgroundFetchDataFailCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用成功的回调函数
     */
    type GetBackgroundFetchDataSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface GetBackgroundFetchDataOption {
        /**
         * 取值为 periodic
         */
        fetchType: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: GetBackgroundFetchDataCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: GetBackgroundFetchDataFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: GetBackgroundFetchDataSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type GetBackgroundFetchTokenCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type GetBackgroundFetchTokenFailCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用成功的回调函数
     */
    type GetBackgroundFetchTokenSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface GetBackgroundFetchTokenOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: GetBackgroundFetchTokenCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: GetBackgroundFetchTokenFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: GetBackgroundFetchTokenSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type GetBatteryInfoCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type GetBatteryInfoFailCallback = (res: GeneralCallbackResult) => void;

    interface GetBatteryInfoSuccessCallbackResult {
        /**
         * 是否正在充电中
         */
        isCharging: boolean;
        /**
         * 设备电量，范围 1 - 100
         */
        level: string;
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type GetBatteryInfoSuccessCallback = (
                result: GetBatteryInfoSuccessCallbackResult
            ) => void;

    interface GetBatteryInfoOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: GetBatteryInfoCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: GetBatteryInfoFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: GetBatteryInfoSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type GetConnectedWifiCompleteCallback = (res: WifiError) => void;
    /**
     * 接口调用失败的回调函数
     */
    type GetConnectedWifiFailCallback = (res: WifiError) => void;

    /**
     * Wifi 信息
     */
    interface WifiInfo {
        /**
         * Wi-Fi 的 BSSID
         */
        BSSID: string;
        /**
         * Wi-Fi 的 SSID
         */
        SSID: string;
        /**
         * Wi-Fi 频段单位 MHz
         *
         * 最低基础库： `2.12.0`
         */
        frequency: number;
        /**
         * Wi-Fi 是否安全
         */
        secure: boolean;
        /**
         * Wi-Fi 信号强度
         */
        signalStrength: number;
    }

    interface GetConnectedWifiSuccessCallbackResult {
        /**
         *
         * Wi-Fi 信息
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/WifiInfo.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/WifiInfo.html)
         */
        wifi: WifiInfo;
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type GetConnectedWifiSuccessCallback = (
                result: GetConnectedWifiSuccessCallbackResult
            ) => void;

    interface GetConnectedWifiOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: GetConnectedWifiCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: GetConnectedWifiFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: GetConnectedWifiSuccessCallback;
    }

    interface NFCError {
        /**
         * 错误信息
         *
         * | 错误码 | 错误信息 | 说明 |
         * | - | - | - |
         * | 0 | ok | 正常 |
         * | 13000 |  | 当前设备不支持NFC |
         * | 13001 |  | 当前设备支持NFC，但系统NFC开关未开启 |
         * | 13002 |  | 当前设备支持NFC，但不支持HCE |
         * | 13003 |  | AID列表参数格式错误 |
         * | 13004 |  | 未设置微信为默认NFC支付应用 |
         * | 13005 |  | 返回的指令不合法 |
         * | 13006 |  | 注册AID失败 |
         */
        errMsg: string;
        /**
         * 错误码
         *
         * | 错误码 | 错误信息 | 说明 |
         * | - | - | - |
         * | 0 | ok | 正常 |
         * | 13000 |  | 当前设备不支持NFC |
         * | 13001 |  | 当前设备支持NFC，但系统NFC开关未开启 |
         * | 13002 |  | 当前设备支持NFC，但不支持HCE |
         * | 13003 |  | AID列表参数格式错误 |
         * | 13004 |  | 未设置微信为默认NFC支付应用 |
         * | 13005 |  | 返回的指令不合法 |
         * | 13006 |  | 注册AID失败 |
         */
        errCode: number;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type GetHCEStateCompleteCallback = (res: NFCError) => void;
    /**
     * 接口调用失败的回调函数
     */
    type GetHCEStateFailCallback = (res: NFCError) => void;
    /**
     * 接口调用成功的回调函数
     */
    type GetHCEStateSuccessCallback = (res: NFCError) => void;

    interface GetHCEStateOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: GetHCEStateCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: GetHCEStateFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: GetHCEStateSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type GetShareInfoCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type GetShareInfoFailCallback = (res: GeneralCallbackResult) => void;

    interface GetShareInfoSuccessCallbackResult {
        /**
         * 敏感数据对应的云 ID，开通[云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)的小程序才会返回，可通过云调用直接获取开放数据，详细见[云调用直接获取开放数据](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#method-cloud)
         *
         * 最低基础库： `2.7.0`
         */
        cloudID: string;
        /**
         * 包括敏感数据在内的完整转发信息的加密数据，详细见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html)
         */
        encryptedData: string;
        /**
         * 错误信息
         */
        errMsg: string;
        /**
         * 加密算法的初始向量，详细见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html)
         */
        iv: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type GetShareInfoSuccessCallback = (
                result: GetShareInfoSuccessCallbackResult
            ) => void;

    interface GetShareInfoOption {
        /**
         * shareTicket
         */
        shareTicket: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: GetShareInfoCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: GetShareInfoFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: GetShareInfoSuccessCallback;
        /**
         * 超时时间，单位 ms
         *
         * 最低基础库： `1.9.90`
         */
        timeout?: number;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type GetWeRunDataCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type GetWeRunDataFailCallback = (res: GeneralCallbackResult) => void;

    interface GetWeRunDataSuccessCallbackResult {
        /**
         * 敏感数据对应的云 ID，开通云开发的小程序才会返回，可通过云调用直接获取开放数据，详细见[云调用直接获取开放数据](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#method-cloud)
         *
         * 最低基础库： `2.7.0`
         */
        cloudID: string;
        /**
         * 包括敏感数据在内的完整用户信息的加密数据，详细见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html)。解密后得到的数据结构见后文
         */
        encryptedData: string;
        /**
         * 加密算法的初始向量，详细见[加密数据解密算法](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html)
         */
        iv: string;
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type GetWeRunDataSuccessCallback = (
                result: GetWeRunDataSuccessCallbackResult
            ) => void;

    interface GetWeRunDataOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: GetWeRunDataCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: GetWeRunDataFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: GetWeRunDataSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type GetWifiListCompleteCallback = (res: WifiError) => void;
    /**
     * 接口调用失败的回调函数
     */
    type GetWifiListFailCallback = (res: WifiError) => void;
    /**
     * 接口调用成功的回调函数
     */
    type GetWifiListSuccessCallback = (res: WifiError) => void;

    interface GetWifiListOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: GetWifiListCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: GetWifiListFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: GetWifiListSuccessCallback;
    }

    interface JoinVoIPChatError {
        /**
         * 错误信息
         *
         * | 错误码 | 错误信息 | 说明 |
         * | - | - | - |
         * | -1 | 当前已在房间内 |  |
         * | -2 | 录音设备被占用，可能是当前正在使用微信内语音通话或系统通话 |  |
         * | -3 | 加入会话期间退出（可能是用户主动退出，或者退后台、来电等原因），因此加入失败 |  |
         * | -1000 | 系统错误 |  |
         */
        errMsg: string;
        /**
         * 错误码
         *
         * | 错误码 | 错误信息 | 说明 |
         * | - | - | - |
         * | -1 | 当前已在房间内 |  |
         * | -2 | 录音设备被占用，可能是当前正在使用微信内语音通话或系统通话 |  |
         * | -3 | 加入会话期间退出（可能是用户主动退出，或者退后台、来电等原因），因此加入失败 |  |
         * | -1000 | 系统错误 |  |
         */
        errCode: number;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type JoinVoIPChatCompleteCallback = (res: JoinVoIPChatError) => void;
    /**
     * 接口调用失败的回调函数
     */
    type JoinVoIPChatFailCallback = (res: JoinVoIPChatError) => void;

    /**
     * 静音设置
     */
    interface MuteConfig {
        /**
         * 是否静音耳机
         */
        muteEarphone?: boolean;
        /**
         * 是否静音麦克风
         */
        muteMicrophone?: boolean;
    }

    interface JoinVoIPChatSuccessCallbackResult {
        /**
         * 错误码
         */
        errCode: number;
        /**
         * 调用结果
         */
        errMsg: string;
        /**
         * 在此通话中的成员 openId 名单
         */
        openIdList: string[];
    }

    /**
     * 接口调用成功的回调函数
     */
    type JoinVoIPChatSuccessCallback = (
                result: JoinVoIPChatSuccessCallbackResult
            ) => void;

    interface JoinVoIPChatOption {
        /**
         * 小游戏内此房间/群聊的 ID。同一时刻传入相同 groupId 的用户会进入到同个实时语音房间。
         */
        groupId: string;
        /**
         * 验证所需的随机字符串
         */
        nonceStr: string;
        /**
         * 签名，用于验证小游戏的身份
         */
        signature: string;
        /**
         * 验证所需的时间戳
         */
        timeStamp: number;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: JoinVoIPChatCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: JoinVoIPChatFailCallback;
        /**
         * 静音设置
         */
        muteConfig?: MuteConfig;
        /**
         * 房间类型
         *
         * 可选值：
         * - 'voice': 音频房间，用于语音通话;
         * - 'video': 视频房间，结合 [voip-room](https://developers.weixin.qq.com/miniprogram/dev/component/voip-room.html) 组件可显示成员画面;
         */
        roomType?: "video" | "voice";
        /**
         * 接口调用成功的回调函数
         */
        success?: JoinVoIPChatSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type MakeBluetoothPairCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type MakeBluetoothPairFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type MakeBluetoothPairSuccessCallback = (res: GeneralCallbackResult) => void;

    interface MakeBluetoothPairOption {
        /**
         * 蓝牙设备 id
         */
        deviceId: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: MakeBluetoothPairCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: MakeBluetoothPairFailCallback;
        /**
         * pin 码
         */
        pin?: ArrayBuffer;
        /**
         * 接口调用成功的回调函数
         */
        success?: MakeBluetoothPairSuccessCallback;
        /**
         * 超时时间
         */
        timeout?: number;
    }

    /**
     * 小程序切后台事件的回调函数
     */
    type OffAppHideCallback = (res: GeneralCallbackResult) => void;
    /**
     * 小程序切前台事件的回调函数
     */
    type OffAppShowCallback = (res: GeneralCallbackResult) => void;
    /**
     * 音频因为受到系统占用而被中断开始事件的回调函数
     */
    type OffAudioInterruptionBeginCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 音频中断结束事件的回调函数
     */
    type OffAudioInterruptionEndCallback = (res: GeneralCallbackResult) => void;
    /**
     * 当前外围设备被连接或断开连接事件的回调函数
     */
    type OffBLEPeripheralConnectionStateChangedCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * iBeacon 服务状态变化事件的回调函数
     */
    type OffBeaconServiceChangeCallback = (res: GeneralCallbackResult) => void;
    /**
     * iBeacon 设备更新事件的回调函数
     */
    type OffBeaconUpdateCallback = (res: GeneralCallbackResult) => void;
    /**
     * mDNS 服务停止搜索的事件的回调函数
     */
    type OffLocalServiceDiscoveryStopCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * mDNS 服务发现的事件的回调函数
     */
    type OffLocalServiceFoundCallback = (res: GeneralCallbackResult) => void;
    /**
     * mDNS 服务离开的事件的回调函数
     */
    type OffLocalServiceLostCallback = (res: GeneralCallbackResult) => void;
    /**
     * mDNS 服务解析失败的事件的回调函数
     */
    type OffLocalServiceResolveFailCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 实时地理位置变化事件的回调函数
     */
    type OffLocationChangeCallback = (res: GeneralCallbackResult) => void;
    /**
     * 实时语音通话成员视频状态变化事件的回调函数
     */
    type OffOnVoIPVideoMembersChangedCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 小程序要打开的页面不存在事件的回调函数
     */
    type OffPageNotFoundCallback = (res: GeneralCallbackResult) => void;
    /**
     * 系统主题改变事件的回调函数
     */
    type OffThemeChangeCallback = (res: GeneralCallbackResult) => void;
    /**
     * 未处理的 Promise 拒绝事件的回调函数
     */
    type OffUnhandledRejectionCallback = (res: GeneralCallbackResult) => void;
    /**
     * 小程序切后台事件的回调函数
     */
    type OnAppHideCallback = (res: GeneralCallbackResult) => void;

    interface OnAppShowCallbackResult {
        /**
         * 小程序切前台的路径 (代码包路径)
         */
        path: string;
        /**
         * 小程序切前台的 query 参数
         */
        query: Record<string, any>;
        /**
         * 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 `{}`。(参见后文注意)
         */
        referrerInfo: ReferrerInfo;
        /**
         * 小程序切前台的[场景值](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/scene.html)
         */
        scene: number;
        /**
         * shareTicket，详见[获取更多转发信息](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html)
         */
        shareTicket?: string;
    }

    /**
     * 小程序切前台事件的回调函数
     */
    type OnAppShowCallback = (result: OnAppShowCallbackResult) => void;
    /**
     * 音频因为受到系统占用而被中断开始事件的回调函数
     */
    type OnAudioInterruptionBeginCallback = (res: GeneralCallbackResult) => void;
    /**
     * 音频中断结束事件的回调函数
     */
    type OnAudioInterruptionEndCallback = (res: GeneralCallbackResult) => void;

    interface OnBLEPeripheralConnectionStateChangedCallbackResult {
        /**
         * 连接目前状态
         */
        connected: boolean;
        /**
         * 连接状态变化的设备 id
         */
        deviceId: string;
        /**
         * server 的 uuid
         */
        serverId: string;
    }

    /**
     * 当前外围设备被连接或断开连接事件的回调函数
     */
    type OnBLEPeripheralConnectionStateChangedCallback = (
                result: OnBLEPeripheralConnectionStateChangedCallbackResult
            ) => void;
    /**
     * 音乐暂停事件的回调函数
     */
    type OnBackgroundAudioPauseCallback = (res: GeneralCallbackResult) => void;
    /**
     * 音乐播放事件的回调函数
     */
    type OnBackgroundAudioPlayCallback = (res: GeneralCallbackResult) => void;
    /**
     * 音乐停止事件的回调函数
     */
    type OnBackgroundAudioStopCallback = (res: GeneralCallbackResult) => void;

    interface OnBackgroundFetchDataCallbackResult {
        /**
         * 缓存数据类别 (periodic)
         */
        fetchType: string;
        /**
         * 缓存数据
         */
        fetchedData: string;
        /**
         * 客户端拿到缓存数据的时间戳
         */
        timeStamp: number;
    }

    /**
     * 的回调函数
     */
    type OnBackgroundFetchDataCallback = (
                result: OnBackgroundFetchDataCallbackResult
            ) => void;

    interface OnDeviceMotionChangeCallbackResult {
        /**
         * 当 手机坐标 X/Y 和 地球 X/Y 重合时，绕着 Z 轴转动的夹角为 alpha，范围值为 [0, 2*PI)。逆时针转动为正。
         */
        alpha: number;
        /**
         * 当手机坐标 Y/Z 和地球 Y/Z 重合时，绕着 X 轴转动的夹角为 beta。范围值为 [-1*PI, PI) 。顶部朝着地球表面转动为正。也有可能朝着用户为正。
         */
        beta: number;
        /**
         * 当手机 X/Z 和地球 X/Z 重合时，绕着 Y 轴转动的夹角为 gamma。范围值为 [-1*PI/2, PI/2)。右边朝着地球表面转动为正。
         */
        gamma: number;
    }

    /**
     * 设备方向变化事件的回调函数
     */
    type OnDeviceMotionChangeCallback = (
                result: OnDeviceMotionChangeCallbackResult
            ) => void;
    /**
     * 小程序错误事件的回调函数
     */
    type OnAppErrorCallback = (
                /** 错误信息，包含堆栈 */
                error: string
            ) => void;

    interface OnGetWifiListCallbackResult {
        /**
         * Wi-Fi 列表数据
         */
        wifiList: WifiInfo[];
    }

    /**
     * 获取到 Wi-Fi 列表数据事件的回调函数
     */
    type OnGetWifiListCallback = (result: OnGetWifiListCallbackResult) => void;

    interface OnHCEMessageCallbackResult {
        /**
         * `messageType=1` 时 ,客户端接收到 NFC 设备的指令
         */
        data: ArrayBuffer;
        /**
         * 消息类型
         *
         * 可选值：
         * - 1: HCE APDU Command类型，小程序需对此指令进行处理，并调用 sendHCEMessage 接口返回处理指令;
         * - 2: 设备离场事件类型;
         */
        messageType: 1 | 2;
        /**
         * `messageType=2` 时，原因
         */
        reason: number;
    }

    /**
     * 接收 NFC 设备消息事件的回调函数
     */
    type OnHCEMessageCallback = (result: OnHCEMessageCallbackResult) => void;
    /**
     * mDNS 服务停止搜索的事件的回调函数
     */
    type OnLocalServiceDiscoveryStopCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface OnLocalServiceFoundCallbackResult {
        /**
         * 服务的 ip 地址
         */
        ip: string;
        /**
         * 服务的端口
         */
        port: number;
        /**
         * 服务的名称
         */
        serviceName: string;
        /**
         * 服务的类型
         */
        serviceType: string;
    }

    /**
     * mDNS 服务发现的事件的回调函数
     */
    type OnLocalServiceFoundCallback = (
                result: OnLocalServiceFoundCallbackResult
            ) => void;

    interface OnLocalServiceLostCallbackResult {
        /**
         * 服务的名称
         */
        serviceName: string;
        /**
         * 服务的类型
         */
        serviceType: string;
    }

    /**
     * mDNS 服务离开的事件的回调函数
     */
    type OnLocalServiceLostCallback = (
                result: OnLocalServiceLostCallbackResult
            ) => void;
    /**
     * mDNS 服务解析失败的事件的回调函数
     */
    type OnLocalServiceResolveFailCallback = (
                result: OnLocalServiceLostCallbackResult
            ) => void;

    interface OnLocationChangeCallbackResult {
        /**
         * 位置的精确度
         */
        accuracy: number;
        /**
         * 高度，单位 m
         *
         * 最低基础库： `1.2.0`
         */
        altitude: number;
        /**
         * 水平精度，单位 m
         *
         * 最低基础库： `1.2.0`
         */
        horizontalAccuracy: number;
        /**
         * 纬度，范围为 -90~90，负数表示南纬
         */
        latitude: number;
        /**
         * 经度，范围为 -180~180，负数表示西经
         */
        longitude: number;
        /**
         * 速度，单位 m/s
         */
        speed: number;
        /**
         * 垂直精度，单位 m（Android 无法获取，返回 0）
         *
         * 最低基础库： `1.2.0`
         */
        verticalAccuracy: number;
    }

    /**
     * 实时地理位置变化事件的回调函数
     */
    type OnLocationChangeCallback = (
                result: OnLocationChangeCallbackResult
            ) => void;

    interface OnMemoryWarningCallbackResult {
        /**
         * 内存告警等级，只有 Android 才有，对应系统宏定义
         *
         * 可选值：
         * - 5: TRIM_MEMORY_RUNNING_MODERATE;
         * - 10: TRIM_MEMORY_RUNNING_LOW;
         * - 15: TRIM_MEMORY_RUNNING_CRITICAL;
         */
        level: 5 | 10 | 15;
    }

    /**
     * 内存不足告警事件的回调函数
     */
    type OnMemoryWarningCallback = (
                result: OnMemoryWarningCallbackResult
            ) => void;

    interface OnOnVoIPVideoMembersChangedCallbackResult {
        /**
         * 错误码
         */
        errCode: number;
        /**
         * 调用结果
         */
        errMsg: string;
        /**
         * 开启视频的成员名单
         */
        openIdList: string[];
    }

    /**
     * 实时语音通话成员视频状态变化事件的回调函数
     */
    type OnOnVoIPVideoMembersChangedCallback = (
                result: OnOnVoIPVideoMembersChangedCallbackResult
            ) => void;

    interface OnPageNotFoundCallbackResult {
        /**
         * 是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面）
         */
        isEntryPage: boolean;
        /**
         * 不存在页面的路径 (代码包路径)
         */
        path: string;
        /**
         * 打开不存在页面的 query 参数
         */
        query: Record<string, any>;
    }

    /**
     * 小程序要打开的页面不存在事件的回调函数
     */
    type OnPageNotFoundCallback = (result: OnPageNotFoundCallbackResult) => void;

    interface OnThemeChangeCallbackResult {
        /**
         * 系统当前的主题，取值为`light`或`dark`
         *
         * 可选值：
         * - 'dark': 深色主题;
         * - 'light': 浅色主题;
         */
        theme: "dark" | "light";
    }

    /**
     * 系统主题改变事件的回调函数
     */
    type OnThemeChangeCallback = (result: OnThemeChangeCallbackResult) => void;

    interface OnUnhandledRejectionCallbackResult {
        /**
         * 被拒绝的 Promise 对象
         */
        promise: Promise<any>;
        /**
         * 拒绝原因，一般是一个 Error 对象
         */
        reason: string;
    }

    /**
     * 未处理的 Promise 拒绝事件的回调函数
     */
    type OnUnhandledRejectionCallback = (
                result: OnUnhandledRejectionCallbackResult
            ) => void;
    /**
     * 用户主动截屏事件的回调函数
     */
    type OnUserCaptureScreenCallback = (res: GeneralCallbackResult) => void;

    interface OnVoIPChatInterruptedCallbackResult {
        /**
         * 错误码
         */
        errCode: number;
        /**
         * 调用结果（错误原因）
         */
        errMsg: string;
    }

    /**
     * 被动断开实时语音通话事件的回调函数
     */
    type OnVoIPChatInterruptedCallback = (
                result: OnVoIPChatInterruptedCallbackResult
            ) => void;

    interface OnVoIPChatMembersChangedCallbackResult {
        /**
         * 错误码
         */
        errCode: number;
        /**
         * 调用结果
         */
        errMsg: string;
        /**
         * 还在实时语音通话中的成员 openId 名单
         */
        openIdList: string[];
    }

    /**
     * 实时语音通话成员在线状态变化事件的回调函数
     */
    type OnVoIPChatMembersChangedCallback = (
                result: OnVoIPChatMembersChangedCallbackResult
            ) => void;

    interface OnVoIPChatSpeakersChangedCallbackResult {
        /**
         * 错误码
         */
        errCode: number;
        /**
         * 调用结果（错误原因）
         */
        errMsg: string;
        /**
         * 还在实时语音通话中的成员 openId 名单
         */
        openIdList: string[];
    }

    /**
     * 实时语音通话成员通话状态变化事件的回调函数
     */
    type OnVoIPChatSpeakersChangedCallback = (
                result: OnVoIPChatSpeakersChangedCallbackResult
            ) => void;

    interface OnWifiConnectedCallbackResult {
        /**
         *
         * Wi-Fi 信息
         *
         * 文档: [https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/WifiInfo.html](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/WifiInfo.html)
         */
        wifi: WifiInfo;
    }

    /**
     * 连接上 Wi-Fi 的事件的回调函数
     */
    type OnWifiConnectedCallback = (
                result: OnWifiConnectedCallbackResult
            ) => void;

    /**
     * 需要打开的卡券列表
     */
    interface OpenCardRequestInfo {
        /**
         * 卡券 ID
         */
        cardId: string;
        /**
         * 由 [uni.addCard](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/card/wx.addCard.html) 的返回对象中的加密 code 通过解密后得到，解密请参照：[code 解码接口](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1499332673_Unm7V)
         */
        code: string;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type OpenCardCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type OpenCardFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type OpenCardSuccessCallback = (res: GeneralCallbackResult) => void;

    interface OpenCardOption {
        /**
         * 需要打开的卡券列表
         */
        cardList: OpenCardRequestInfo[];
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: OpenCardCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: OpenCardFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: OpenCardSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type PauseBackgroundAudioCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type PauseBackgroundAudioFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type PauseBackgroundAudioSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface PauseBackgroundAudioOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: PauseBackgroundAudioCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: PauseBackgroundAudioFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: PauseBackgroundAudioSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type PauseVoiceCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type PauseVoiceFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type PauseVoiceSuccessCallback = (res: GeneralCallbackResult) => void;

    interface PauseVoiceOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: PauseVoiceCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: PauseVoiceFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: PauseVoiceSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type PlayBackgroundAudioCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type PlayBackgroundAudioFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type PlayBackgroundAudioSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface PlayBackgroundAudioOption {
        /**
         * 音乐链接，目前支持的格式有 m4a, aac, mp3, wav
         */
        dataUrl: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: PlayBackgroundAudioCompleteCallback;
        /**
         * 封面URL
         */
        coverImgUrl?: string;
        /**
         * 接口调用失败的回调函数
         */
        fail?: PlayBackgroundAudioFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: PlayBackgroundAudioSuccessCallback;
        /**
         * 音乐标题
         */
        title?: string;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type PlayVoiceCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type PlayVoiceFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type PlayVoiceSuccessCallback = (res: GeneralCallbackResult) => void;

    interface PlayVoiceOption {
        /**
         * 需要播放的语音文件的文件路径 (本地路径)
         */
        filePath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: PlayVoiceCompleteCallback;
        /**
         * 指定录音时长，到达指定的录音时长后会自动停止录音，单位：秒
         *
         * 最低基础库： `1.6.0`
         */
        duration?: number;
        /**
         * 接口调用失败的回调函数
         */
        fail?: PlayVoiceFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: PlayVoiceSuccessCallback;
    }

    /**
     * 需要预览的资源列表
     */
    interface MediaSource {
        /**
         * 图片或视频的地址
         */
        url: string;
        /**
         * 视频的封面图片
         */
        poster?: string;
        /**
         * 资源的类型，默认为图片
         *
         * 可选值：
         * - 'image': 图片;
         * - 'video': 视频;
         */
        type?: "video" | "image";
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type PreviewMediaCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type PreviewMediaFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type PreviewMediaSuccessCallback = (res: GeneralCallbackResult) => void;

    interface PreviewMediaOption {
        /**
         * 需要预览的资源列表
         */
        sources: MediaSource[];
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: PreviewMediaCompleteCallback;
        /**
         * 当前显示的资源序号
         */
        current?: any;
        /**
         * 接口调用失败的回调函数
         */
        fail?: PreviewMediaFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: PreviewMediaSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type RequestSubscribeMessageCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface RequestSubscribeMessageFailCallbackResult {
        /**
         * 接口调用失败错误码
         */
        errCode: number;
        /**
         * 接口调用失败错误信息
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type RequestSubscribeMessageFailCallback = (
                result: RequestSubscribeMessageFailCallbackResult
            ) => void;

    interface RequestSubscribeMessageSuccessCallbackResult {
        /**
         * [TEMPLATE_ID]是动态的键，即模板id，值包括'accept'、'reject'、'ban'。'accept'表示用户同意订阅该条id对应的模板消息，'reject'表示用户拒绝订阅该条id对应的模板消息，'ban'表示已被后台封禁。例如 { errMsg: "requestSubscribeMessage:ok", zun-LzcQyW-edafCVvzPkK4de2Rllr1fFpw2A_x0oXE: "accept"} 表示用户同意订阅zun-LzcQyW-edafCVvzPkK4de2Rllr1fFpw2A_x0oXE这条消息
         */
        TEMPLATE_ID: string;
        /**
         * 接口调用成功时errMsg值为'requestSubscribeMessage:ok'
         */
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type RequestSubscribeMessageSuccessCallback = (
                result: RequestSubscribeMessageSuccessCallbackResult
            ) => void;

    interface RequestSubscribeMessageOption {
        /**
         * 需要订阅的消息模板的id的集合，一次调用最多可订阅3条消息（注意：iOS客户端7.0.6版本、Android客户端7.0.7版本之后的一次性订阅/长期订阅才支持多个模板消息，iOS客户端7.0.5版本、Android客户端7.0.6版本之前的一次订阅只支持一个模板消息）消息模板id在[微信公众平台(mp.weixin.qq.com)-功能-订阅消息]中配置
         */
        tmplIds: any[];
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: RequestSubscribeMessageCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: RequestSubscribeMessageFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: RequestSubscribeMessageSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type SaveFileToDiskCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type SaveFileToDiskFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type SaveFileToDiskSuccessCallback = (res: GeneralCallbackResult) => void;

    interface SaveFileToDiskOption {
        /**
         * 待保存文件路径
         */
        filePath: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: SaveFileToDiskCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: SaveFileToDiskFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: SaveFileToDiskSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type SeekBackgroundAudioCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type SeekBackgroundAudioFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type SeekBackgroundAudioSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface SeekBackgroundAudioOption {
        /**
         * 音乐位置，单位：秒
         */
        position: number;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: SeekBackgroundAudioCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: SeekBackgroundAudioFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: SeekBackgroundAudioSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type SendHCEMessageCompleteCallback = (res: NFCError) => void;
    /**
     * 接口调用失败的回调函数
     */
    type SendHCEMessageFailCallback = (res: NFCError) => void;
    /**
     * 接口调用成功的回调函数
     */
    type SendHCEMessageSuccessCallback = (res: NFCError) => void;

    interface SendHCEMessageOption {
        /**
         * 二进制数据
         */
        data: ArrayBuffer;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: SendHCEMessageCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: SendHCEMessageFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: SendHCEMessageSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type SetBackgroundFetchTokenCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type SetBackgroundFetchTokenFailCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用成功的回调函数
     */
    type SetBackgroundFetchTokenSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface SetBackgroundFetchTokenOption {
        /**
         * 自定义的登录态
         */
        token: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: SetBackgroundFetchTokenCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: SetBackgroundFetchTokenFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: SetBackgroundFetchTokenSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type SetInnerAudioOptionCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type SetInnerAudioOptionFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type SetInnerAudioOptionSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface SetInnerAudioOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: SetInnerAudioOptionCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: SetInnerAudioOptionFailCallback;
        /**
         * 是否与其他音频混播，设置为 true 之后，不会终止其他应用或微信内的音乐
         */
        mixWithOther?: boolean;
        /**
         * （仅在 iOS 生效）是否遵循静音开关，设置为 false 之后，即使是在静音模式下，也能播放声音
         */
        obeyMuteSwitch?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: SetInnerAudioOptionSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type SetTopBarTextCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type SetTopBarTextFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type SetTopBarTextSuccessCallback = (res: GeneralCallbackResult) => void;

    interface SetTopBarTextOption {
        /**
         * 置顶栏文字
         */
        text: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: SetTopBarTextCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: SetTopBarTextFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: SetTopBarTextSuccessCallback;
    }

    /**
     * 提供预设的 Wi-Fi 信息列表
     */
    interface WifiData {
        /**
         * Wi-Fi 的 BSSID
         */
        BSSID?: string;
        /**
         * Wi-Fi 的 SSID
         */
        SSID?: string;
        /**
         * Wi-Fi 设备密码
         */
        password?: string;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type SetWifiListCompleteCallback = (res: WifiError) => void;
    /**
     * 接口调用失败的回调函数
     */
    type SetWifiListFailCallback = (res: WifiError) => void;
    /**
     * 接口调用成功的回调函数
     */
    type SetWifiListSuccessCallback = (res: WifiError) => void;

    interface SetWifiListOption {
        /**
         * 提供预设的 Wi-Fi 信息列表
         */
        wifiList: WifiData[];
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: SetWifiListCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: SetWifiListFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: SetWifiListSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type SetWindowSizeCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type SetWindowSizeFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type SetWindowSizeSuccessCallback = (res: GeneralCallbackResult) => void;

    interface SetWindowSizeOption {
        /**
         * 窗口高度，以像素为单位
         */
        height: number;
        /**
         * 窗口宽度，以像素为单位
         */
        width: number;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: SetWindowSizeCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: SetWindowSizeFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: SetWindowSizeSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type ShowRedPackageCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type ShowRedPackageFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type ShowRedPackageSuccessCallback = (res: GeneralCallbackResult) => void;

    interface ShowRedPackageOption {
        /**
         * 封面地址
         */
        url: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: ShowRedPackageCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: ShowRedPackageFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: ShowRedPackageSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StartDeviceMotionListeningCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StartDeviceMotionListeningFailCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StartDeviceMotionListeningSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface StartDeviceMotionListeningOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StartDeviceMotionListeningCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StartDeviceMotionListeningFailCallback;
        /**
         * 监听设备方向的变化回调函数的执行频率
         *
         * 可选值：
         * - 'game': 适用于更新游戏的回调频率，在 20ms/次 左右;
         * - 'ui': 适用于更新 UI 的回调频率，在 60ms/次 左右;
         * - 'normal': 普通的回调频率，在 200ms/次 左右;
         */
        interval?: "game" | "ui" | "normal";
        /**
         * 接口调用成功的回调函数
         */
        success?: StartDeviceMotionListeningSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StartHCECompleteCallback = (res: NFCError) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StartHCEFailCallback = (res: NFCError) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StartHCESuccessCallback = (res: NFCError) => void;

    interface StartHCEOption {
        /**
         * 需要注册到系统的 AID 列表
         */
        aid_list: string[];
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StartHCECompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StartHCEFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StartHCESuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StartLocalServiceDiscoveryCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface StartLocalServiceDiscoveryFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'invalid param': serviceType 为空;
         * - 'scan task already exist': 在当前 startLocalServiceDiscovery 发起的搜索未停止的情况下，再次调用 startLocalServiceDiscovery;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type StartLocalServiceDiscoveryFailCallback = (
                result: StartLocalServiceDiscoveryFailCallbackResult
            ) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StartLocalServiceDiscoverySuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface StartLocalServiceDiscoveryOption {
        /**
         * 要搜索的服务类型
         */
        serviceType: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StartLocalServiceDiscoveryCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StartLocalServiceDiscoveryFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StartLocalServiceDiscoverySuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StartLocationUpdateCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StartLocationUpdateFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StartLocationUpdateSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface StartLocationUpdateOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StartLocationUpdateCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StartLocationUpdateFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StartLocationUpdateSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StartLocationUpdateBackgroundCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StartLocationUpdateBackgroundFailCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StartLocationUpdateBackgroundSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface StartLocationUpdateBackgroundOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StartLocationUpdateBackgroundCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StartLocationUpdateBackgroundFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StartLocationUpdateBackgroundSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StartRecordCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StartRecordFailCallback = (res: GeneralCallbackResult) => void;

    interface StartRecordSuccessCallbackResult {
        /**
         * 录音文件的临时路径 (本地路径)
         */
        tempFilePath: string;
        errMsg: string;
    }

    /**
     * 接口调用成功的回调函数
     */
    type WxStartRecordSuccessCallback = (
                result: StartRecordSuccessCallbackResult
            ) => void;

    interface WxStartRecordOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StartRecordCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StartRecordFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: WxStartRecordSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StartWifiCompleteCallback = (res: WifiError) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StartWifiFailCallback = (res: WifiError) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StartWifiSuccessCallback = (res: WifiError) => void;

    interface StartWifiOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StartWifiCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StartWifiFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StartWifiSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StopBackgroundAudioCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StopBackgroundAudioFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StopBackgroundAudioSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface StopBackgroundAudioOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StopBackgroundAudioCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StopBackgroundAudioFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StopBackgroundAudioSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StopDeviceMotionListeningCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StopDeviceMotionListeningFailCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StopDeviceMotionListeningSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface StopDeviceMotionListeningOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StopDeviceMotionListeningCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StopDeviceMotionListeningFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StopDeviceMotionListeningSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StopHCECompleteCallback = (res: NFCError) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StopHCEFailCallback = (res: NFCError) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StopHCESuccessCallback = (res: NFCError) => void;

    interface StopHCEOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StopHCECompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StopHCEFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StopHCESuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StopLocalServiceDiscoveryCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface StopLocalServiceDiscoveryFailCallbackResult {
        /**
         * 错误信息
         *
         * 可选值：
         * - 'task not found': 在当前没有处在搜索服务中的情况下调用 stopLocalServiceDiscovery;
         */
        errMsg: string;
    }

    /**
     * 接口调用失败的回调函数
     */
    type StopLocalServiceDiscoveryFailCallback = (
                result: StopLocalServiceDiscoveryFailCallbackResult
            ) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StopLocalServiceDiscoverySuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface StopLocalServiceDiscoveryOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StopLocalServiceDiscoveryCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StopLocalServiceDiscoveryFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StopLocalServiceDiscoverySuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StopLocationUpdateCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StopLocationUpdateFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StopLocationUpdateSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface StopLocationUpdateOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StopLocationUpdateCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StopLocationUpdateFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StopLocationUpdateSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StopRecordCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StopRecordFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type WxStopRecordSuccessCallback = (res: GeneralCallbackResult) => void;

    interface WxStopRecordOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StopRecordCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StopRecordFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: WxStopRecordSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StopVoiceCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StopVoiceFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StopVoiceSuccessCallback = (res: GeneralCallbackResult) => void;

    interface StopVoiceOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StopVoiceCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StopVoiceFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StopVoiceSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type StopWifiCompleteCallback = (res: WifiError) => void;
    /**
     * 接口调用失败的回调函数
     */
    type StopWifiFailCallback = (res: WifiError) => void;
    /**
     * 接口调用成功的回调函数
     */
    type StopWifiSuccessCallback = (res: WifiError) => void;

    interface StopWifiOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: StopWifiCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: StopWifiFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: StopWifiSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type UpdateShareMenuCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type UpdateShareMenuFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type UpdateShareMenuSuccessCallback = (res: GeneralCallbackResult) => void;

    /**
     * 参数列表
     */
    interface UpdatableMessageFrontEndParameter {
        /**
         * 参数名
         */
        name: string;
        /**
         * 参数值
         */
        value: string;
    }

    /**
     * 动态消息的模板信息
     *
     * 最低基础库： `2.4.0`
     */
    interface UpdatableMessageFrontEndTemplateInfo {
        /**
         * 参数列表
         */
        parameterList: UpdatableMessageFrontEndParameter[];
    }

    interface UpdateShareMenuOption {
        /**
         * 动态消息的 activityId。通过 [updatableMessage.createActivityId](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/updatable-message/updatableMessage.createActivityId.html) 接口获取
         *
         * 最低基础库： `2.4.0`
         */
        activityId?: string;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: UpdateShareMenuCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: UpdateShareMenuFailCallback;
        /**
         * 是否是动态消息，详见[动态消息](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share/updatable-message.html)
         *
         * 最低基础库： `2.4.0`
         */
        isUpdatableMessage?: boolean;
        /**
         * 接口调用成功的回调函数
         */
        success?: UpdateShareMenuSuccessCallback;
        /**
         * 动态消息的模板信息
         *
         * 最低基础库： `2.4.0`
         */
        templateInfo?: UpdatableMessageFrontEndTemplateInfo;
        /**
         * 群待办消息的id，通过toDoActivityId可以把多个群待办消息聚合为同一个。通过 [updatableMessage.createActivityId](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/updatable-message/updatableMessage.createActivityId.html) 接口获取。详见[群待办消息](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html)
         *
         * 最低基础库： `2.11.0`
         */
        toDoActivityId?: string;
        /**
         * 是否使用带 shareTicket 的转发[详情](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share.html)
         */
        withShareTicket?: boolean;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type UpdateVoIPChatMuteConfigCompleteCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用失败的回调函数
     */
    type UpdateVoIPChatMuteConfigFailCallback = (
                res: GeneralCallbackResult
            ) => void;
    /**
     * 接口调用成功的回调函数
     */
    type UpdateVoIPChatMuteConfigSuccessCallback = (
                res: GeneralCallbackResult
            ) => void;

    interface UpdateVoIPChatMuteConfigOption {
        /**
         * 静音设置
         */
        muteConfig: MuteConfig;
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: UpdateVoIPChatMuteConfigCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: UpdateVoIPChatMuteConfigFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: UpdateVoIPChatMuteConfigSuccessCallback;
    }

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    type UpdateWeChatAppCompleteCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用失败的回调函数
     */
    type UpdateWeChatAppFailCallback = (res: GeneralCallbackResult) => void;
    /**
     * 接口调用成功的回调函数
     */
    type UpdateWeChatAppSuccessCallback = (res: GeneralCallbackResult) => void;

    interface UpdateWeChatAppOption {
        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
        complete?: UpdateWeChatAppCompleteCallback;
        /**
         * 接口调用失败的回调函数
         */
        fail?: UpdateWeChatAppFailCallback;
        /**
         * 接口调用成功的回调函数
         */
        success?: UpdateWeChatAppSuccessCallback;
    }
}

/**
 * Uni 实例变量
 *
 * 文档: [http://uniapp.dcloud.io/api](http://uniapp.dcloud.io/api)
 */
declare const uni: UniApp.Uni;
