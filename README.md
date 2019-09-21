# requirejs-simple
***本文内容可能因新特性发布而过期，可能不是最好的方案，仅为深入了解。若情况允许，还请配合 ES6 Modules 与 webpack 来实现模块化。***

[![requirejs-simple](https://img.shields.io/badge/Github-requireJS--simple-blue.svg "requirejs-simple")](https://github.com/409915016/requirejs-simple "requirejs-simple")

---

不少初学者在编写复杂项目时，代码动辄千行，借用 IDE 搜索功能勉强能找到函数，多人协作时简直太糟糕，相信连自己也不愿意继续维护单文件数千行的代码。在 ES6 正式发布之前，**规范中没有一种组织代码的途径，没有“类”，更别提“模块”**。


其他语言，例如 **Java** 解决这种尴尬情况有 **package** （包）的概念：
- 把功能相似或相关的类或接口组织在同一个包中，方便类的查找和使用；
- 避免命名冲突。

> ECMAScript 6 标准终于在 2015年中发布。因历史遗留问题（IE 系列），多数[新特性](http://es6.ruanyifeng.com "新特性")仍不能直接在浏览器上的使用，形同虚设，[Babel](http://babeljs.io/ "Babel") 可以帮我们转化代码成 ES5 标准。

<!--more-->

### 纵观历史

JavaScript 的发展离不开众多开发者，经过无数次争论及技术碰撞，社区中涌现了许多模块化实现方案：

![妯″潡鍖栨柟妗_1.png][1]

**CommonJS** 规范是服务器端的 `Node.js` 发扬光大，率先采用了模块化的思想；

**AMD** 和 **CMD** 规范均用于浏览器，本质上是模块文件的加载器，完善了模块化特性让开发更加简单。**[RequireJS](http://requirejs.org "RequireJS")** 和 **[SeaJS](http://www.zhangxinxu.com/sp/seajs/ "SeaJS")** 各是规范的实现。

---

### 从头开始

起初学习 JavaScript 时，我们是这样写代码的：

	function foo() {
	  console.log("foo");
	}

	function bar() {
	  console.log("bar");
	}

所有逻辑尽在函数中，各种函数都在一块，之间甚至没什么关系，找起来特麻烦，没准哪天函数名就冲突了。


### 稍作改进

将相关变量和函数整理进**对象**中。
**对象**是一组属性的集合，每个属性都是一个**键值对**，键名都是字符串，而值可以是任意的数据类型。
以函数作为值的属性称为**方法**，如 `foo` `bar`：

	var myModule = {
	  a: 1,
	  b: 2,
	  foo: function() {
		console.log(this.a);
	  },
	  bar: function() {
		console.log(this.b);
	  }
	};
	//How to use?
	myModule.foo(); //1


使用 `myModule.foo();` 访问对象中的成员即可运行函数，降低了前个例子中函数名冲突的可能性。
但是：

	myModule.a = 233;
	myModule.foo(); //233

岂能修改原对象中的属性？这样子并不好（不安全）。


### IIFE

使用**立即执行的函数表达式**，它结合了**匿名函数**和**函数表达式**的用法。
最后将 `myModule` 模块的内的函数暴露出去：

	var myModule = (function () {
	  var a = 1;
	  var b = 2;
	  var foo = function () {
		console.log(a);
	  }
	  var bar = function () {
		console.log(b);
	  }
	  return {
		foo: foo,
		bar: bar
	  }
	})();
	//How to use?
	myModule.foo(); //1
	myModule.a; //undefined
	myModule.a = 233; //after, set a as a internal value.
	myModule.foo(); //still 1

IIFE 引入了一个新的作用域来限制了变量的生命周期。这就是**模块化实现的基石**。



### 简单粗暴

在浏览器中载入几个预先写好的模块文件：

	<script src="modules/myModule.js"></script>
	...
	<script src="modules/orderModule.js"></script>

如果模块文件无需调用另一模块文件中的方法（产生依赖），那么文件之间的加载顺序也无关要紧。

**如果代码之间存在依赖，那不得不按照顺序来加载模块文件。**

---

### RequireJS

**AMD** 方案的实现，在浏览器端作为模块的加载器。它解决了 IIFE 方式的缺陷：

- 多个模块间的依赖关系，需手动整理加载顺序；
- 同步加载阻塞页面渲染。


1.按照 RequireJS 的约定来**封装**一个依赖 `jQuery` 的 `myModule` 模块：

	///myModule.js
	define(["jquery"], function($) {
	  var a = 1;
	  var b = 2;
	  var foo = function() {
		console.log(a);
		console.log($);
	  };
	  var bar = function() {
		console.log(b);
	  };
	  return {
		foo: foo,
		bar: bar
	  };
	});

当前 `define` 传入一个依赖模块的字符串，然后是一个匿名函数包裹着的模块内容。
这个匿名函数中的内容与之前 IIFE 的栗子相似。

2.上一步 **封装** 好的 `myModule` 模块，接下来就可以**调用**了：

	//main.js
	//
	//require.config in here.
	//
	requirejs(
	  ["myModule"], 		//load myModule.js
	  function(myModule) {  //module name
		myModule.foo();     //1
							//jQuery object
	  }
	);

`requirejs` 函数可以指定所依赖的模块，模块成功加载进来后才执行回调函数。


3.RequireJS 通过**初始化**配置的方法 `require.config` 来管理模块依赖问题。在 `script` 标签中指定 **data-main** 来指定 RequireJS 的配置文件 `main.js`：

	<script data-main="scripts/main" src="scripts/require.js"></script>

	//main.js
	require.config({
	  baseUrl: "js",
	  urlArgs: "v=" + new Date().getTime(),
	  paths: {
		jquery: "lib/jquery",
		myModule: "module/myModule"
	  },
	  waitSeconds: 15,
	  shim: {}
	});

`require.config` 常用的配置属性：

| 属性        	| 说明                                                            	|
|-------------	|-----------------------------------------------------------------	|
| baseUrl     	| 指定了模块的前置路径                                            	|
| urlArgs     	| Url 查询参数，可避免浏览器缓存了旧的模块文件                    	|
| paths       	| 指定各个模块的名称及目录                                        	|
| waitSeconds 	| 一个模块文件放弃加载的等待时间                                  	|
| shim        	| 用于加载没有使用 define 方法来编写的模块（不支持 AMD 规范的库） 	|


**简单来说，RequireJS 可以根据配置文件自动加载依赖，且为不符合 AMD 规范代码提供一种加载方式。**

### 兼容传统

虽说 RequireJS shim 可以加载一些非 AMD 规范的代码，仔细一看并不是那么容易，也需要模块自身作支持。这就是为啥 jQuery 在传统浏览器环境中能运行，也能在 AMD 中工作。

**Underscore** 是一个函数式编程库，打开它的源代码看看，到底怎样来处理不同环境的兼容：

	// Underscore.js 1.8.3
	(function() {
	  // Some code...
	  // end of the file
	  if (typeof define === 'function' && define.amd) {
		define('underscore', [], function() {
		  return _;
		});
	  }
	}.call(this));

同样地，使用了 IIFE 作为匿名函数将私有数据和方法包含在闭包中，设置了一个 **_** 变量将整个对象暴露到全局中。

	if (typeof define === 'function' && define.amd) {
	  define('underscore', [], function() {
		return _;
	  });
	}

并检查是否存在 AMD 环境中，来执行加载预先定义好的 `define` 函数，该函数指定了 `Underscore` 文件应该被 `paths` 时的文件名，及 `exports` 时的源文件中暴露的 **全局变量** `_` 。

所以如果需要在 AMD 环境中将 **Underscore** 作为模块加载 ，配置文件中的 shim 应修改如下：

	shim: {
	  underscore: {
		exports: "_"
	  }
	}

	_.each([1, 2, 3], alert); // 1 2 3

### 最佳实践

现在的情况是，原有的代码必须在传统环境下工作，但又想把该模块改写成 AMD 模式，提升兼容性。

	// general.js
	var general = (function general () {
	  var general = {};
	  general.hi = function (val) {
		console.log('Hello ' + val + ' from general Module.' )
	  }

	  if (typeof define === 'function' && define.amd) {
		define('general', [], function() {
		  return general;
		});
	  }
	  return general;
	}());

传统情况下，将 `general` 对象中的所有方法暴露到一个全局变量 `general` 中，而内部的变量将隐藏起来，这就是 IIFE 的好处。

**在没有规范和浏览器直接支持的情况下，开发者们脑洞大开通过一些奇淫技巧来将模块化实现到实际项目中，极大程度推动了 JavaScript 社区的发展，希望我们同样拥有这份热情和执着。**


---

#### 参考资料

[深入理解 JavaScript 1.14.1/31.3](https://book.douban.com/subject/26697422/ "深入理解 JavaScript 1.14.1")

[JavaScript 经典实例 12.4](https://book.douban.com/subject/26773411/ "JavaScript 经典实例")

[JavaScript 模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html "Javascript模块化编程（一）：模块的写法")

[JavaScript 模块化七日谈](http://huangxuan.me/js-module-7day/ "JavaScript 模块化七日谈")

[前端模块化 - dolphinX 谦行](http://www.cnblogs.com/dolphinX/p/4381855.html "前端模块化 - dolphinX 谦行")

[IIFE - suqing](http://suqing.iteye.com/blog/1981591 "IIFE")

[Require.js 教程 - 陈三](https://www.zfanw.com/blog/require-js.html "Require.js 教程 - 陈三")


  [1]: https://misaka.im/usr/uploads/2018/06/255009553.png
