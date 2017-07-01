## ES6_demo
#### class
- 1.super 可以作为方法使用，表示基类的构造函数<br>
- 2.可以作为对象使用，代表积累 super.prop  super.method()<br>
- 3.实例对象中 cp.__proto__.__proto__ === pt.__proto__
- 即：子类原型的原型===父类的原型

#### proxy
- 1.利用babel编译proxy的时候 需要一个额外的plugin： babel-plugin-proxy <br>
- 配置.babelrc代码为：<br>
- { "presets":["es2015","stage-0"], "plugins": ["transform-runtime","babel-plugin-proxy"] }<br>
- 2.配置上babel-plugin-proxy 之后 会影响别的文件的编译  如果编译别的文件需要把该命令去掉<br>
- 3.proxy 新建了一个编译命令 proxy   即为： npm run proxy

