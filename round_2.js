//Quesion 1: var vs let vs const

//let and const are block scoped
//meaning

{
  var a = "hello";
}

console.log(a); //hello

{
  let a = "hello";
  //const a = 'hello';
}

console.log(a); //a is not defined, will only work if log is inside {}

var a = 5;
var a = 10; //ok

let a = 5;
let a = 10; //undefined, already declared; same as const

let a = 5;
a = 10; // ok

const a = 5;
a = 10; // const cannot be re-initialied

var a; // ok wo a value
let a //ok
const a //not ok


//Question 2: setTimeOut output
function a() {
    for(var i=0; i < 3; i++){
        setTimeout(function log(){
            console.log(i);//what is logged?
        }, i * 1000);
    }
}

a();//3 (3 times)
//not 0 1 2, because of var is not block scope, var is a function scope
//the first 0 is not showing because setTimeout only runs after the complete code has ran successfully

//how it runs
//i
//i
//i

//then settime out is finished, js engine is going to print all these values

//the last time js engine encounter the value of i is 3
//so
//3
//3
//3

//so the solution here is using let instead of var
function a() {
    for(let i=0; i < 3; i++){
        setTimeout(function log(){
            console.log(i);//what is logged?
        }, i * 1000);
    }
}

a();//0,1,2
//let is block scoped, 

{
    i = 0
}
{
    i = 1
}
{
    i = 2
}


//Question 3: explain call, Apply and Bind

var person = {
    name: "Mike",
    hello: function (thing) {
        console.log(this.name + "says hello" + thing);
    }
}

var alterEgo = {
    name: "Miguel"
}

person.hello('world');//Mike says hello world

person.hello.call(alterEgo, 'world');//Miguel says hello world
person.hello.apply(alterEgo, ['world']);//Miguel says hello world

const newHello = person.hello.bind(alterEgo);//bind don't take context. It returns a function

newHello("world") //Miguel says hello world


//Question 5: Composition Polyfill
function addFive(a){
    return a + 5;
}

function subStractTwo(a){
    return a - 2;
}

function multiplyFour(a){
    return a * 4;
}

//pupose
//const evaluate = compose(addFive, subStractTwo, multiplyFour);

//console.log(evaluate(5));//23
//multiply -> substract -> add

//implementation
const compose = (...functions) => {//take all the functions, ... because we don't know how many functions user supply us
    return (args) => {//take arguments for return function
       return functions.reduceRight((arg,fn)=>fn(arg),args)//args is the initial value (5)
    }
}

const evaluate = compose(addFive, subStractTwo, multiplyFour);
console.log(evaluate(5));//23

//pipe is from left to right, suggest to try ourselves


//Question 6: Implement Promise.all
function showText(text, time) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(text)
        }, time);
    })
}

Promise.all([showText('hello', 1000), Promise.resolve('hi')]).then((value) => console.log(value))
//['hello', 'hi], it wait the first promise to complete and runs the second promise

//what if one promise fail
Promise.all([showText('hello', 1000), Promise.resolve('hi'), Promise.reject('8')]).then((value) => console.log(value))
//all promises failed

/////
function myPromiseAll(promises){
    let result = [];
    return new Promise((resolve, reject)=>{
        promises.forEach((p, index) => {
            p.then((res)=>{
                result.push(res);
                if(index === promises.length -1) {
                    resolve(result);
                }
            }).catch((err)=>reject(err))
        })
    })
}

myPromiseAll([
    showText('hello', 1000),
    Promise.resolve('hi'),
    //Promise.reject('8'),
]).then((value) => console.log(value))