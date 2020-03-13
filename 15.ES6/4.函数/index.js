function sum(a,b=1,c=5){
    console.log(arguments)
    return a + b + c;
}

console.log(sum(1,3))


/**
 * 创建一个元素
 * @param {*} container 元素的父元素
 * @param {*} content 元素的内容
 */
function creatElemtn(name = 'div',container = document.getElementById('container'),content){
    const ele = document.createElement(name);
    if(content){
        ele.innerHTML = content;
    }
    container.appendChild(ele);
}
creatElemtn(undefined,undefined,'手动设置')