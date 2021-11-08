const obj = require ('./logger',)
obj.log('shashank')
obj.welcome()
console.log(obj.url)
console.log("---------------------------------------")

const obj2 = require('./util/helper')
 obj2.printDate()
obj2.printMonth()
obj2.batchInfo()
console.log("---------------------------------------")

const obj3 = require('../validator/formatter')
obj3.trm("  shashank   ")
obj3.change("SHASHANK")
obj3.upper("shashank")

console.log("---------------------------------------");


const  obj4 = require('lodash')  
console.log(obj4.chunk(['jan', 'feb', 'mar', 'apr','may','jun','jul','aug','sep','oct','nov','dec'], 3))
console.log(obj4.tail([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]))
console.log(obj4.union([2], [1, 2],[1,2,3],[1,2,3,4],[1,2,3,4,5]))
console.log(obj4.fromPairs([["horror","theshining"], ["drama","titanic"], ["thiriller","shutter island"], ["fantasy","panslabyrinth"]]))
