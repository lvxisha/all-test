(function(){

    function TurnPage(options,wrap){
        this.nowPage = options.nowPage || 1;
        this.allPage = options.allPage || 1;
        this.wrap = wrap || 'body';
        this.init = function(){
            this.fillHtml();
        }
    }
    TurnPage.prototype.fillHtml = function(){

        var pageContainer = $('<ul class="my-page-wraper"></ul>')
        if(this.nowPage > 1){
            $('<li class="my-page-pre">上一页</li>').appendTo(pageContainer);
        }
        $('<li class="my-page-num">1</li>').appendTo(pageContainer);
        
        if(this.nowPage -2 > 2){
            $('<span>···</span>').appendTo(pageContainer)
        }
        $('<li class="my-page-num">1</li>').appendTo(pageContainer);
        // 中间的省略号
        for(var i = this.nowPage - 2;i < this.nowPage + 2; i ++){
            if(i > 1 && i < this.allPage){
                $('<li class="my-page-num"></li>').text(i).appendTo(pageContainer);
            }
        }
        if(this.nowPage + 2 > this.allPage +1){
            $('<span>···</span>').appendTo(pageContainer)
        }
        $('<li class="my-page-num"></li>').text(this.allPage).appendTo(pageContainer);
        // 下一页
        if(this.nowPage < this.allPage){
            $('<li class="my-page-next">下一页</li>').appendTo(pageContainer);
        }

        $(this.wrap).empty().append(pageContainer);
    }
    TurnPage.prototype.bindEvent = function(){
        var self = this;
        $('.my-page-pre',this.wrap).on('click',function (e) { 
            // e.preventDefault();
            self.nowPage --;
            self.fillHtml()    
        });
        $('.my-page-next',this.wrap).on('click',function (e) { 
            self.nowPage ++;
            self.fillHtml()    
        });

        $('.my-page-num',this.wrap).click(function(){
            self.nowPage = Number($(this).text())
        })
    }
    $.fn.extend({
        page:function(options){
            var page = new TurnPage(options,this);
            page.init();
        }
    })

})()