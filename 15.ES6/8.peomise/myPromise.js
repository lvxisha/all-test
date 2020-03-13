/* class MyPromise{
    

} */
// const ab = new MyPromise('asw');

const MyPromise = (() => {
    const PENDING = 'pending',
          RESOLVED = 'resolved',
          REJECTED = 'rejected',
          PromiseValue = Symbol('PromiseValue'),//状态数据
          PromiseStatus = Symbol('PromiseStatus');//当前状态
    return class{
        /** 
         * @param {*} executor 未决阶段 （pending状态） 下的处理函数
        */
        constructor(executor) {
            this[PromiseStatus] = PENDING;
            this[PromiseValue] = undefined;
        }

    }
})()

// console.log(ab.constructor);