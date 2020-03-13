var objFun = {
    /**
     * 数组升序
     * @param {*}
     * @param {function} fnc 两个参数，比较大小
     * 该函数返回一个数字，如果是正数，则第一个元素比第二个大
     * 如果是0，则相对
     * 如果为负数，则第一个元素比第二个元素小
     * 
     */
    mySort:function(arr,fnc){
        if(!fnc){
            fnc = function(a,b){
                if(a > b){
                    return 1;
                }else if(a == b){
                    return 0;
                }else{
                    return -1;
                }
            }
        }
        for(var i = 1; i < arr.length; i++){
            for(var j = 0; j < arr.length -i ;j++){
                if(fnc(arr[j],arr[j+1]) > 0){
                    var temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            } 
        }
    },
    /**
     * 数组过滤
     * @param {*}
     * @param {function} fnc 两个参数,
     * 表示数组的某一项与下标，返回Boolean
     * 满足条件返回true
     */
    myFilter:function(arr,fnc){
        var newArr = [];
        for(var i = 0; i < arr.length;i++){
            if( fnc(arr[i],i)){
                newArr.push(arr[i]) 
            }
        }
        return newArr;
    },
    /**
     * 数组查找
     * @param {*}
     * @param {function} fnc 两个参数,
     * 表示数组的某一项与下标，返回Boolean
     * 满足条件返回true
     */
    myFind:function(arr,fnc){
        for(var i = 0; i < arr.length;i++){
            if( fnc(arr[i],i)){
                return arr[i]; 
            }
        }
        // return undefined;
    },
    /**
     * 数组查找
     * @param {*}
     * @param {function} fnc 两个参数,
     * 表示数组的某一项与下标
     * 满足条件返回count
     */
    myCount:function(arr,fnc){
        var count = 0;
        for(var i = 0; i < arr.length;i++){
            if( fnc(arr[i],i)){
                count++; 
            }
        }
        return count;
    }
}

var arr = [100,288,984];
var newArr = arr.myFilter(arr,function(item ,index ){
    return item % 2 == 0;
})