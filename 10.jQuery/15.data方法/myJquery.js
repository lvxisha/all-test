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

    jQuery.prototype.init.prototype = jQuery.prototype;
    
    window.$ = window.jQuery = jQuery;
})();