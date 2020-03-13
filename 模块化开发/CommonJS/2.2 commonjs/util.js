var count = 0;//需要隐藏的内部实现

// 暴露给外面的接口
function getNumber(){
    count++
    return count;
}

/* console.log(getNumber())
console.log(getNumber())
console.log(getNumber())
console.log(getNumber()) */

// exports = {}
/* exports.getNumber = getNumber;
exports.abc = 123; */
/** 
 * 等价于 
 * exports:{
 *      getNumber:getNumber,
 *      abc:123,
 * }
*/

module.exports = {
    getNumber:function(){
        count++;
        return count;
    },
    abc:123,
}