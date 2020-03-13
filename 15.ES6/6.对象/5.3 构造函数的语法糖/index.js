function Animal(type,name,age,sex){
    this.type = type;
    this.name = name;
    this.age = age;
    this.sex = sex;
}

Animal.prototype.print = function(){
    console.log(`[种类]：${this.type}`);
    console.log(`[名字]：${this.name}`);
    console.log(`[年龄]：${this.age}`);
    console.log(`[性别]：${this.age}`);
}

const a = new Animal('轮子','旺财',3,'男');
a.print()