// import a from './a.js'
const fs = require('fs');
const path = require('path');
const adPath = path.resolve(__dirname,'./text.txt')
const content = fs.readFileSync(adPath,{
    encoding:"utf-8"
});

console.log(content)