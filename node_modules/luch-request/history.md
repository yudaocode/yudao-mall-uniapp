## [3.1.0](https://github.com/lei-mu/luch-request/compare/3.0.8...3.1.0) (2023-05-25)


### Features

* 更新请求新配置项。新增‘是否尝试将响应数据json化’配置项。 ([68344a1](https://github.com/lei-mu/luch-request/commit/68344a1d9dcbf586d4a0aff37d02aa0bb27ff45c)), closes [#113](https://github.com/lei-mu/luch-request/issues/113)
* 增加`version` 属性，获取插件版本号 ([40403d2](https://github.com/lei-mu/luch-request/commit/40403d2ef57dead0f577a384ac686cc7dcc772da))




## [3.0.8](https://github.com/lei-mu/luch-request/compare/3.0.7...3.0.8) (2022-08-23)


### Features

* `put` 方法增加快手小程序和京东小程序的支持 ([7e15dff](https://github.com/lei-mu/luch-request/commit/7e15dff0ac343ccbd6a298c7c9ae8ef0e2148eb9))
* 参考axio源代码 添加支持paramsSerializer。 ([cae1043](https://github.com/lei-mu/luch-request/commit/cae10430dc7222d85e0cadb13512898d66998547))
* 返回数据增加`rawData`,保留返回的原始数据 ([3924b7c](https://github.com/lei-mu/luch-request/commit/3924b7c3ea444526be436a31f9e7d5623749580b))
* 局部请求配置支持baseURL ([df2d98f](https://github.com/lei-mu/luch-request/commit/df2d98fc063f356ffd525158e9cd47d7eb24f68f))




## 3.0.7 (2021-09-04)

1. Bug Fix: 修复通过 `Request.config` 设置全局参数，多个实例`config`存在共同引用bug


## 3.0.6 (2021-05-10)

1. New Feature: APP端 增加`responseType`配置项

## 3.0.5 (2021-01-10)
### Features

* [重要] APP不再支持`CONNECT`、`HEAD`、`TRACE`请求方式。[uni.request](https://uniapp.dcloud.io/api/request/request)
* [重要]全局默认`timeout`由`30000`ms,改为`60000`ms 
* [重要]增加`index.d.ts`文件支持。感谢`Mr_Mao`的支持。github:`https://github.com/TuiMao233` 
* [重要]网络请求相关接口 uni.request、uni.uploadFile、uni.downloadFile 支持 timeout 参数。 
* [重要]返回结果response 增加`fullPath`参数。 

## 3.0.4 (2020-07-05)

1. New Feature: request 方法增加 ` firstIpv4 `配置项  
1. New Feature: 增加 ` middleware `通用请求方法

## 3.0.3 (2020-06-16)

1. Bug Fix: 修复` params ` 选项对数组格式化错误bug

## 3.0.2 (2020-06-04)

1. Bug Fix: 修复文件上传和request 配置缺少字段bug 

## 3.0.1 (2020-06-02)

1. Bug Fix: 请求方式都为` GET `的bug

## 3.0.0 (2020-06-01)

1. New Feature: 支持多拦截器
1. New Feature: 支持局部配置自定义验证器

## 2.0.1 (2020-05-01)

1. Bug Fix: 修复多实例全局配置共用问题

## 2.0.0 (2020-04-24)

1. New Feature: 增加 request ` withCredentials `选项（仅h5端支持）
1. New Feature: h5端 upload 增加 ` files ` ` file `选项。[uni.uploadFile](https://uniapp.dcloud.io/api/request/network-file?id=uploadfile "uni.uploadFile")
1. Enhancement: ` params ` 选项参数格式化方法使用axios 格式化方法
1. Bug Fix: 对upload 返回data 为空字符串的情况容错
1. Change: 修改header与全局合并方式。当前：header = Object.assign(全局，局部)

## 0.0.0 (2019-05)

1. luch-request created


