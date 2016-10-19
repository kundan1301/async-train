How to use:
var train = require('./async-train/index.js');
function publish(message,cb){
	// note that this function must be async
	console.log(message);
	process.nextTick(cb);
}

use of 'mapConcurrentLimit':

function main(){
    var arr = [];
    for(var i=0;i<10000;i++){
        arr.push(i);
    }
    async.mapConcurrentLimit(arr,1000,publish,function(err,result){
       	if(err ) console.log(err);
       	else console.log(result);
    });
}

use of mapConcurrent:

function main(){
    var arr = [];
    for(var i=0;i<10000;i++){
        arr.push(i);
    }
    async.mapConcurrent(arr,publish,function(err,result){
       	if(err ) console.log(err);
       	else console.log(result);
    });
}


use of concurrentCallLimit:
function main(){
    var arr = [];
    for(var i=0;i<10000;i++){
        arr.push(function(cb){
        	// this function must be async
        	console.log('Hello');
        	process.nextTick(cb());
        });
    }
    async.concurrentCallLimit(arr,1000,function(err,result){
       	if(err ) console.log(err);
       	else console.log(result);
    });
}

use of concurrentCall:
function main(){
    var arr = [];
    for(var i=0;i<10000;i++){
        arr.push(function(cb){
        	// this function must be async
        	console.log('Hello');
        	process.nextTick(cb());
        });
    }
    async.concurrentCall(arr,function(err,result){
       	if(err ) console.log(err);
       	else console.log(result);
    });
}

