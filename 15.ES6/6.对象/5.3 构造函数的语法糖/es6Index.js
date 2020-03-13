const printName = 'zhangsan';
class Animal{
    constructor (type,name,age,sex){
        this.type = type;
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    print(){
        console.log(`种类${this.name}`)
        console.log(`种类${this.type}`)
        console.log(`种类${this.age}`)
    }
    [printName](){
        console.log(`种类${this.sex}`)
    }
}

const a = new Animal('狗','旺财搜索',4,'女');
a.print();
console.log(a);