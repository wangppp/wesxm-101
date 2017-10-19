# 项目的结构分析 与 运行指导

## 项目分为三个模块，分别为frontend, backend, dashboard 这三个根目录下的文件夹。

其中 frontend 为向外展示的模块，后台为[Slim]('https://www.slimframework.com/)；前台用Twig模版渲染。

backend 模块为后台管理系统RESTful 接口调用源，集合了资源请求和身份验证。

dashboard 模块为后台管理系统的界面部分，用React + React Router 构建。