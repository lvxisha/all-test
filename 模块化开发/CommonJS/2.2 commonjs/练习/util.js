// 暴露到外部
module.exports = {
    /**
     * 将数组的内容打乱
     */
    sortRandom(arr){
        arr.sort(function(){
            return Math.random() - 0.5;
        })
        
    },
    
}
