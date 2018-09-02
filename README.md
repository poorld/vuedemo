![Travis (.org)](https://img.shields.io/travis/:user/:repo.svg)


# 说明:
## Vue.js书本增删改查小例子



> 运行时请先执行 npm install

![效果图](http://pdv8bh429.bkt.clouddn.com/%E6%95%88%E6%9E%9C%E5%9B%BE.png)


前端: vue.js+webpack

后端: springboot

数据库：mysql


=======
前端: vue.js
后端: springboot [后端项目地址](https://github.com/teenyda/vuedemo-springboot)


## 使用的插件有:
-----------------------------------------------
> element-ui 一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库
``` bash
# 安装
cnpm i element-ui -S         -S表示  --save
# 在main.js中引入并使用
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```
-----------------------------------------------
> moment 时间转换工具
``` bash
# 安装
npm install moment --save
# 在使用的组件中导入
import moment from 'moment'
```
-----------------------------------------------
> axios Axios 是一个基于 promise 的 HTTP 库
``` bash
# 安装 
npm install axios --save
# 在使用的组件中导入
import axios from 'axios'
```
-----------------------------------------------
> qs 用于构建表单请求体
``` bash
# 安装
npm install qs --save
# 在使用的组件中引入
import qs from 'qs'
# 或者在main.js中变为全局变量
import qs from 'qs'
Vue.prototype.$qs = qs
```
-----------------------------------------------

# 小细节:
### (Vue.js)element UI 表单重置
- 1.绑定model
- 2.绑定ref
- 3.el-form-item 绑定prop(这一步不能缺少)
- 4.this.$refs['create'].resetFields();
```
<el-form :model="create" ref="create">
<el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
    <el-input v-model="create.name" auto-complete="off"></el-input>
</el-form-item>
```

### element-ui el-date-picker 时间转换
- moment 安装 npm install moment --save
```
this.create.time = moment(this.create.time).format('YYYY-MM-DD')
```

