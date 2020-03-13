<template>
    <div class="content">
        <div class="header">
            <div class="pre-month" @click="leftBtn"></div>
            <div class="cur-month">{{ year }} 年 {{ month }}月 {{ day }} 日</div>
            <div class="next-month" @click="rightBtn"></div>
        </div>
        <div class="data-con">
            <div class="week-header">
                <div v-for="(item,index) in weekArr" :key="index">
                    {{ item + 2}}
                </div>
            </div>
            <div class="week-body">
               <div v-for="item in 42"
                :key="item">
                    {{ item }}
               </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg:"日历",
            weekArr:['日','一','二','三','四','五','六'],
            year:null,
            month:null,
            day:null,
        }
    },
    methods:{
        leftBtn(){
            console.log(`leftBtn 左边按钮`)
        },
        rightBtn(){
            console.log(`rightBtn 右边按钮`)
        },
        getInitTime(){
            const date = new Date();
            this.year = date.getFullYear();
            this.month = date.getMonth() + 1;
            this.day = date.getDate();
            console.log(this.day)
        }
    },
    created(){
        this.getInitTime();
    }
}
</script>
<style  scoped>
div{
    background: yellowgreen;
    color: blueviolet;
    
}
.content{
    width: 500px;
    margin: 0 auto;
}
.header{
    /* display: flex; */
    text-align: center;
    margin-bottom: 10px;
}
.header > div{
    /* flex: 1; */
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
}
.pre-month{
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #00f transparent transparent;
    margin-right: 10px;
}
.next-month{
     width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-color: transparent  transparent transparent #00f;
    margin-left: 10px;
}
.week-body > div,.week-header > div{
    display: inline-block;
    margin: 0 10px;
    cursor: pointer;
}
</style>