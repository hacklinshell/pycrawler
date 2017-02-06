# node后台项目+vue前端项目
### 介绍
这个项目是单独的后台项目   
必须配合前台的vue项目才能运行成功。  
后台选择 node + koa + mongodb 构建 路由进行了一些处理，路径就是路由    
前台选择 vue + element UI 框架 前台地址[pycrawler-vue](https://github.com/hacklinshell/pycrawler-vue)   
### 运行方法  
先本地clone后台项目，然后在后台项目中clone前台项目，并且将名字改为public  
进行前台vue编译   
执行命令   
cd public    
npm install   
npm run build  
进入后台目录  
执行命令  
启动数据库 mongod  
启动服务  nodemon index.js 也可以使用pm2进行启动  
可以看到服务的端口为3001   