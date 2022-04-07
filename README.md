# ReactAccount-FrontEnd

记账本项目的前端代码部分（SPA）

## 构成

框架：react-hooks

项目构建工具：vite

路由：react-router-dom

组件库：ZarmUI

css 预处理：less

移动端适配：rem（lib-flexible）

后端请求：axios

服务器部署：pushstate-server + pm2

验证码：react-captcha-code

时间处理：dayjs

统计图表：Echart

表单：rc-form

## 还未能解决的问题

1. pm2自动化部署无法实现，仍需要手动推到代码库，再从服务器拉取来更新代码，部署需进入服务器进行
2. Zarm组件库keyboard删除按键调试仍然存在错误（组件问题）
