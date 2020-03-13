(function () {
        
    function jQuery (selector) {
        return new jQuery.prototype.init(selector);
    }
    jQuery.prototype.init = function (selector) {
        // this = {};
        // 选出 dom 并且包装成jQuery对象  返回
        // id class
        this.length = 0;
        //  null  undefined  ''
        if(selector == null){
            return this
        }
        if (typeof selector == 'string' && selector.indexOf('.') != -1) {
            var dom = document.getElementsByClassName( selector.slice(1) );
        }else if (typeof selector == 'string' && selector.indexOf('#') != -1) {
            var dom = document.getElementById( selector.slice(1) );
        }

        if ( selector instanceof Element || dom.length == undefined) {
            this[0] = dom || selector;
            this.length++;
        }else {
            // 基础铺垫
            for (var i = 0; i < dom.length; i++) {
                this[i] = dom[i];
                this.length++
            }
        }
        // return this;
    }
    jQuery.prototype.css = function (config){
        // 循环操作dom 
        for (var i = 0; i < this.length; i++) {//this执行的是dom
            for(var attr in config){
                this[i].style[attr] = config[attr];
            }
        }
        // 链式操作
        return this;
    }

    // 回归上一个元素
    jQuery.prototype.pushStack = function(dom){
       
        if(dom.constructor != jQuery){
            dom = jQuery(dom);
        }
        dom.prevObject = this;
        return dom;
    }

    jQuery.prototype.get = function (num) {  //this 指向的是dom
        /* if(num != null){
            return Array.prototype.slice.call(this,0);//Array.prototype 或者 [].slice.call(this,0)把类数组变为数组
        }else{
            if(num >= 0){
                return this[num];
            }else{
                return this[num + this.length]
            }
            
        } */
        return num != null ? ((num >= 0) ? this[num] : this[num + this.length]) : [].slice.call(this,0)
    }

    jQuery.prototype.eq = function(num){
        var dom = num != null ? ((num >= 0) ? this[num] : this[num + this.length]) : null;
        // return jQuery(dom)
        return this.pushStack(dom);
    }

    jQuery.prototype.add = function(selector){
        var curObj = jQuery(selector);
        var baseObj = this;
        var newObj = jQuery();

        for(var i = 0; i < curObj.length;i++){
            newObj[newObj.length++] = curObj[i];
        }
        for(var i = 0; i < baseObj.length;i++){
            newObj[newObj.length++] = baseObj[i];
        }

        this.pushStack(newObj);
        return newObj;
    }

    jQuery.prototype.end = function(){
        return this.prevObject;
    }

    // 自定义绑定
    jQuery.prototype.myOn = function(type,handle){
        for(var i = 0; i < this.length; i++){
            if(this[i].cacheEvent){
                this[i].cacheEvent = {};
            }
            if(!this[i].cacheEvent[type]){
                this[i].cacheEvent[type] = [handle];
            }else{
                this[i].cacheEvent[type].push(handle);
            }
        }
    }

    jQuery.prototype.myTrigger = function(type){
        var parmes = arguments.length > 1 ? [].slice.call(arguments,1):[];
        var self = this;
        for(var i = 0; i < this.length; i ++){
            if( this[i].cacheEvent[type]){
                this[i].cacheEvent[type].forEach(function(ele,index){
                    ele.apply(self,parmes)
                })
            }
        }
    }

    // 入队操作
    jQuery.prototype.myQueue = function (type,handle) {  
        var queueObj = this;
        var queueName = arguments[0] || 'fx';
        var addFunc = arguments[1] || null;
        var len = arguments.length;

        // 获取队列
        if(len == 1){
            return queueObj[0][queueName];
        }

        // queue 中 有一个 data 对象 {chain:[]} 添加队列 或往已有队列中添加内容
        queueObj[0][queueName] == undefined ? queueObj[0][queueName] = [addFunc] : queueObj[0][queueName].push(addFunc);
        return this;//链式调用
    }

    // 出队
    jQuery.prototype.myDequeue = function (type) {  
        var self = this;
        var queueName = arguments[0] || 'fx';
        var queueArr = this.myQueue(queueName);

        var currFunc = queueArr.shift();

        if(currFunc == undefined){
            return ;
        }
        var next = function(){
            self.myDequeue(queueName)
        }   
        currFunc(next)
        return this;
    }

    // 只有两个参数 target与回调，
    jQuery.prototype.myAnimate = function(json,callback){
        var len = this.length;
        var self = this;

        // 最后添加到队列里的内容函数
        var baseFunc = function(next){
            var times = 0;
            for(var i = 0 ; i < len; i++){
                startMove(self[i],json,function(){
                    times++
                    if(times == len){
                        times && callback();
                        next();
                    }
                })
            }
        }

        this.myQueue('fx',baseFunc);//入队

        // 出队
        if(this.myQueue('fx').length == 1){
            this.myDequeue('fx')
        }

        function getStyle(obj, attr){
            if(obj.currentStyle ){
                return obj.currentStyle[attr];
            }else{
                return window.getComputedStyle(obj,attr)[attr];
            }
        }
        function startMove(obj,json,callback){
            clearInterval(obj.timer);
            var iSpeed;
            var iCur;
            var name;
            obj.timer = setInterval(function(){
                var bStop = true;
                for(var attr in json){
                    if(attr === 'opacity'){
                        name = attr;
                        iCur = parseFloat(getStyle(obj,attr))*100;
                    }else{
                        iCur = parseInt(getStyle(obj,attr));
                    }

                    iSpeed = ( json[attr] - iCur) / 8;

                    if (iSpeed > 0) {
                        iSpeed = Math.ceil(iSpeed);
                    }else {
                        iSpeed = Math.floor(iSpeed);
                    }

                    if (attr === 'opacity') {
                        obj.style.opacity = ( iCur + iSpeed ) / 100; 
                    }else {
                        obj.style[attr] = iCur + iSpeed + 'px';
                    }
                    if ( Math.floor(Math.abs(json[attr] - iCur)) != 0 ) {
                        bStop = false;
                    }
                }
                if (bStop) {					
                    clearInterval(obj.timer);
                    if (name === 'opacity') {
                        obj.style.opacity = json[name] / 100;
                    }
                    callback();
                }
            },30)
        }
        return this;//链式调用
    }

    // 延时执行
    jQuery.prototype.myDelay = function (duration) {  

        var queueArr = this[0]['fx'];
        queueArr.push(function (next) {  
            setTimeout(function(){
                next();
            },duration)
        })
        return this;//链式调用
    }

    // callbacks原理
    jQuery.myCallbacks = function (){
        //  'once' 'null'
        // 存储参数
        var options = arguments[0] || '';
        var list = [];//通过add 来加入方法

        var fireIndex = 0;//记录当前要执行的函数的索引
        
        var fired = false;//记录是否有被fire过
        var args = [];//实例参数列表

        var fire = function(){
            for(;fireIndex < list.length;fireIndex++){
                list[fireIndex].apply(window,args);
            }
            if(options.indexOf('once') != 0){
                list = [];
                fireIndex = 0;
            }
        }
        return{
            add:function(fnc){
                list.push(fnc);
                if(options.indexOf('memory') != -1 &&fired){
                    fire();
                }
                return this;
            },
            fire:function(){
                fireIndex = 0;
                args = arguments;
                fired = true;
                fire();
            }
        }
    }

    // Deferred原理
    jQuery.myDeferred = function (){
        // callback
        // 3个callback
        //  done  resove  fail  reject  progress notify
        var arr = [
            [
                jQuery.myCallbacks('once'),'done','resolve'
            ],
            [
                jQuery.myCallbacks('once memory'),'fail','reject'
            ],
            [
                jQuery.myCallbacks('memory'),'progress','notify'
            ]
        ];
        var deferred = {};
        var pendding = true;
        for(var i = 0; i < arrCallbacks.length;i++ ){
            // arr[0][1]

            // 注册属性
            // deferred['done'] = function(){}
            // deferred['fail'] = function(){}
            // deferred['progress'] = function(){}
            deferred[arr[i][1]] = (function(index){
                return function(func){
                    arr[i][1].add(func);
                }
            })(i);

            // 触发
            // deferred['resolve'] = function(){}
            // deferred['reject'] = function(){}
            // deferred['notify'] = function(){}
            deferred[arr[i][2]] = (function(index){
                return function(){
                    var args = arguments;
                    if(pendding){
                        arr[index][0].fire.apply(window,args);
                        arr[index][2] == 'resolve' || arr[index][2] == 'reject' ? pendding = false : '';
                    }
                }
            })(i)

        }

    }

    jQuery.prototype.init.prototype = jQuery.prototype;
    
    window.$ = window.jQuery = jQuery;
})();