export var a = 1;//导出a值为1，类似与CommonJS中的exports.a = 1;

export function test(){//导出 test ，值为一个函数。类似与CommonJS中的exports.test = function(){};

}

export class Person{

}

var age = 1;
var sex = 10;

export { age, sex }