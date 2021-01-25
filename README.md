# Pet-Mall

### 介绍

使用了node服务端渲染，运行只需使用node环境运行访问项目地址即可

### 项目环境

- 本地环境

 Node.js + Express + mongodb数据库

- 运行数据库

 安装mongodb数据库，运行以下cmd命令开启数据库：

```
 mongod
```

数据库导出文件在db文件夹中，mongodb数据库中创建petStore数据库，再将db中的文件使用命令导入

默认访问地址为：http://localhost:3000   在app.js中可以进行配置

### 安装

```
# 克隆项目
git clone https://github.com/pezihan/Pet-Mall.git

# 进入项目目录
cd Pet-Mall

# 安装依赖
npm install

# 本地开发 启动项目
node ./app.js

# 启动mongodb数据库
mongod
```

### 目录结构说明

- `public`  静态页面区域，公共资源
- `views` 存放私有页面，使用session判断用户的登录状态才能提供访问
  - `login.html` 登录页面
  - `allorders.html` 所有订单页面
  - `shopping.html` 购物车页面
- `node_modules` 项目依赖的第三方模块
- `router.js` 统一路由，页面的跳转、用户的注册登录已经商品加入购物车的实现
- `commodity.js` `petStore.js`  `petStoreshop.js` 定义mongodb数据库的集合与配置
- `app.js` 主项目入口文件
- `package.json` 项目配置文件
