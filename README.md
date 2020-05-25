# client

### Tips
##用户端原型设计 https://www.cbfgo.cn/archetype/user

##目前使用的是iphoneX机型的比例 375*812

##需要npm install vant --save //vuex，vue-router，axios  

##vant改成按需引入，需要npm i babel-plugin-import -D ，如果有遗漏的组件，请补上。

##axios完成了四个常用api的封装(post,get，delete，put)。 可以调用api

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### npm install error
运行 npm cache clean --force 清除原本的缓存
然后再次运行 npm install --save