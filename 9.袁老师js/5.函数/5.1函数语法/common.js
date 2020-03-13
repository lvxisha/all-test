/**
 *  1. isOdd 判断是不是为奇数
 *  @prame 
 *  @ return
 */

 function isOdd(n){
    if(n % 2 !== 0){
        return  `${n} 是奇数`;
    }
 }

/**
 * 2. 是否为素数
 */
function isPrime(n){
    if( n < 2){
        flag = true;
    }
    var flag = false;
    for(var i = 2; i < n-1; i++){
        if(n % i === 0){
            flag = true;
            break;
        }
    }
    if(flag){
        return `${n} 不是素数`
    }
    return `${n} 是素数`
}

/**
 * 3.该函数对数组求和
 */
function sumOfArr(arr){
    var sum = 0;
    for(var prop in arr){
        sum += arr[prop]
    }
    return `数组求和 ${sum}`
}

/**
 * 4. 数组中的最大值
 */
function maxOfArr(arr){
    if(arr.length == 0){
        return;
    }
    var max = arr[0];
    for(var i = 0; i < arr.length;i++){
        if(arr[i] > max){
            max = arr[i];
        }
    }
    return max;
    /* return arr.sort(function(parme1,parme2){
        return parme2 - parme1;
    }) */
}
/**
 * 5. 数组中的最小值
 */
function minOfArr(arr){
    if(arr.length == 0){
        return;
    }
    var min = arr[0];
    for(var i = 0; i < arr.length;i++){
        if(arr[i] < min){
            min = arr[i];
        }
    }
    return min;
    /* return arr.sort(function(parme1,parme2){
        return parme1 - parme2;
    }) */
}

/**
 * 6. 稀松数组
 */
function hasEmptyInArr(arr){
    // 稀松数组的特点：下标不连续
    for(var i = 0; i < arr.length;i++){
        if(!(i in arr)){
            return true;
        }
    }
    return  false;
}

/**
 * 7. 是否为闰年
 */
function isLeep(year){
    // 4年一闰年，百年不润；400年一润
    return  year % 400 === 0 || year % 4 == 0 && year % 100 !== 0;
}
            
function getDays(year,months){
    if(months == 2){
        return isLeep(year) ? '29天' : '28天';
    }else if(months < 8 && isOdd(months) || months >= 8 && !isOdd(months)){
        return '31天'
    }else{
        return '30天'
    }
}            
