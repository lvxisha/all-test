(function(){

    function Swiper(options,warp){
        this.list = options.list || [];
        this.type = options.type || 'fade';
        this.isAuto = options.isAuto == undefined ? true : options.isAuto;
        this.showChangeBtn = options.showChangeBtn == undefined ? true : options.showChangeBtn;
        this.showSpotBtn = options.showSpotBtn == undefined ? true : options.showSpotBtn;
        this.width = options.width || $(warp).width();
        this.height = options.height || $(warp).height();
        this.warp = warp || $('body');
        this.nowIndex = 0;//默认下标从第0 个开始
        this.num = this.list.length;
        this.autoTime = options.autoTime;
        this.timer = null;
        this.direction = options.direction || 'right';
        this.init = function(){
            this.creatDom();
            this.initStyle();
            this.bindEvent();
            if(this.isAuto){
                this.autoChange();
            }
        }


    }

    // 创建Dom对象
    Swiper.prototype.creatDom = function(){
        var mySwiperDiv = $('<div class="my-swiper"></div>');
        var mySwiperUl = $('<ul class="my-swiper-list"></ul>');
        var mySwiperSpots = $('<div class="my-swiper-spots"></d>');

        for(var i = 0; i < this.list.length; i++){
            var item = this.list[i];
            $('<li class="my-swiper-item"></li>').append($(item)).appendTo(mySwiperUl)                          

            $('<span></span>').appendTo(mySwiperSpots)
        }
        if(this.type == 'animate'){
            $('<li class="my-swiper-item"></li>').append($(this.list[0]).clone(true))
                .appendTo(mySwiperUl)
        }
        
        mySwiperDiv.append(mySwiperUl)
                   .append($('<div class="my-swiper-btn my-swiper-lbtn">&lt;</div>'))
                   .append($('<div class="my-swiper-btn my-swiper-rbtn">&gt;</div>'))
                   .append(mySwiperSpots)
                   .appendTo(this.warp)
                   .addClass('my-swiper'+ this.type);
                   
    
    }
    // 初始化样式
    Swiper.prototype.initStyle = function(){
        if(this.type == "animate"){
            $('.my-swiper-animate > .my-swiper-list',this.warp).css({
                width: this.width * (this.num + 1),
            }).find('.my-swiper-item').css({
                width:this.width,
                height:this.height
            })
        }else{
            $('.my-swiper-item',this.warp).hide().eq(this.nowIndex).show();
        }

        // 判断左右按钮显示还是隐藏
        if(!this.showChangeBtn){    
            $('.my-swiper-btn',this.warp).hide()
        }
        if(!this.showSpotBtn){
            $('.my-swiper-spots',this.warp).hide()
        }

        $('.my-swiper-spots span').eq(this.nowIndex).addClass('actived');

    }

    // 点击事件
    Swiper.prototype.bindEvent = function(){
        var self = this;

        //鼠标 移上
        $('.my-swiper',this.warp).mouseenter(function(){
            clearTimeout(self.timer);
        }).mouseleave(function(){
            if(self.isAuto){
                self.autoChange();
            }
        })
        $('.my-swiper-lbtn',this.warp).click(function(e){
            if(self.nowIndex == 0){
                self.nowIndex = self.num - 1;
            }else{
                self.nowIndex --;
            }
            self.change();
        })

        //右边按钮
        $('.my-swiper-rbtn',this.warp).click(function(){
            //在末尾添加第一张照片
            if(self.nowIndex == self.num - 1){
                self.nowIndex = 0;
            }else{
                self.nowIndex ++;
            }
            self.change();
        })

        // 鼠标移上
        $('.my-swiper-spots > span',this.warp).mouseenter(function(){
            self.nowIndex = $(this).index();
            self.change();
        })
    }

    // 淡入淡出
    Swiper.prototype.change = function(){
        if(this.type == 'fade'){
            $('.my-swiper-item',this.warp).fadeOut().eq(this.nowIndex).fadeIn();
            $('.my-swiper-spots > span',this.warp).removeClass('actived').eq(this.nowIndex).addClass('actived');
        }
    }

    // 自动切换
    Swiper.prototype.autoChange = function(){
        var self = this;
        this.timer = setInterval(function(){
            if(self.direction){
                $('.my-swiper-lbtn',self.warp).click();
            }else{
                $('.my-swiper-rbtn',self.warp).click();
            }
        },this.autoTime)
    }

    //实例方法
    $.fn.extend({

        swiper:function(options){
            var obj = new Swiper(options,this);
            obj.init();
        }

    })

})()