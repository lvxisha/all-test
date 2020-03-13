const isOdd = function(num){
    return num % 2 !== 0;
}   

const isOddw = num => num % 2 == 0
console.log(isOddw(5))

const numbers = [3,4,6,23,8,29];
const result = numbers.filter( num => num % 2 === 0).map( num => num*2)
console.log(result)