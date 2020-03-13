function creatUser(loginId,loginPwd,nickName){
    const sayHello = function(){
        console.log('loginID',this.loginId,"nickNames",this.nickName);
    } 
    return{
        loginId,
        loginPwd,
        nickName,
        sayHello,
        id:Math.random()
    }
}
const u = creatUser('aba','123444','aaaa');
u.sayHello();

const prop1 = 'names';
const prop2 = 'age';
const prop3 = 'sayHello';

const user = {
    [prop1]:"继承",
    [prop2]:1002,
    [prop3](){
        console.log(this[prop1],this[prop2])
    },
}
user[prop3]();