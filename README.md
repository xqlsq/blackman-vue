# 拼图游戏
## 介绍
代码做的是一个移动端的拼图游戏。主要用到了
1. vue-组件
2. vue-过渡效果
3. vue组件的父子组件的数据传递。兄弟组件的数据交互
例子比较简单。但是涵盖了vue的基本使用方法。data、methods、component、computed,以及过渡效果transition和transition-ground和表单提交(只有简单的校验)
由于项目比较小,所以没有使用vue-router路由、vuex状态管理框架。不过在做的过程中也发现,当各组件之间的数据交互比较密集的时候,频繁的使用回调事件和定义属性来简单的传值,会让数据显得比较混乱.这也显得vuex这类的框架是中大型项目必不可少的开发思路。
同时,在写game.vue组件的时候，我尝试把couter.vue组件融入到game组件。但是发现计时器在不停刷新的同时,影响到了game组件里面transition-group里面的cell-move这个类不停地被刷新,所以我不得不把计时器单独作为一个组件。如果有哪位发现问题了,可以在Issues跟我及时沟通。
## 相关命令

``` bash
# 安装依赖

    npm install

# 开发调试（热加载） 默认地址：http://localhost:8080

    npm run dev

# 生产环境构建压缩

    npm run build

```

想要了解更多关于如何运行的，请查看vue官方的[webpack链接](http://vuejs-templates.github.io/webpack/) [vue-loader链接](http://vuejs.github.io/vue-loader).
