## Run N number of async tasks in parallel. As soon as one task is completed it will automatically schedule the next async task. 

##Hence, it always runs N number of async tasks in parallel.

#####Optimum CPU utilisation.

# Installation:

```javascript
$ npm install async-train
```

# How to use:

```javascript
var train = require('./async-train/index.js');
function publish(message,cb){
	// note that this function must be async
	console.log(message);
	process.nextTick(cb);
}
```
### use of mapConcurrentLimit:
mapConcurrentLimit takes array or objects as its first argument, second argument is limit and the third is async function on which all the objects are applied and the last one is callback  which returns all the results after completing all tasks. 


mapConcurrentLimit executes N tasks in parallel where N is the limit as shown in example.

```javascript
function main(){
    var arr = [];
    var limit = 1000;
    for(var i=0;i<10000;i++){
        arr.push(i);
    }
    train.mapConcurrentLimit(arr,limit,publish,function(err,result){
       	if(err) console.log(err);
       	else console.log(result);
    });
}
```


### use of mapConcurrent:

```javascript
function main(){
    var arr = [];
    for(var i=0;i<10000;i++){
        arr.push(i);
    }
    train.mapConcurrent(arr,publish,function(err,result){
       	if(err ) console.log(err);
       	else console.log(result);
    });
}
```

### use of concurrentCallLimit:
concurrentCallLimit takes array of functions or tasks as its argument, second is limit , third is callback which returns all the results after completing all tasks. 


concurrentCallLimit executes N tasks in parallel where N is the limit as shown in example.

```javascript
function main(){
    var arr = [];
    var limit = 1000;
    for(var i=0;i<10000;i++){
        arr.push(function(cb){
        	// this function must be async
        	console.log('Hello');
        	process.nextTick(cb);
        });
    }
    train.concurrentCallLimit(arr,limit,function(err,result){
       	if(err ) console.log(err);
       	else console.log(result);
    });
}
```


### use of concurrentCall:
concurrentCallLimit takes array of functions or tasks as its first argument, second argument is callback which returns all the results after completing all tasks. 


concurrentCallLimit runs all tasks in parallel.

```javascript
function main(){
    var arr = [];
    for(var i=0;i<10000;i++){
        arr.push(function(cb){
        	// this function must be async
        	console.log('Hello');
        	process.nextTick(cb);
        });
    }
    train.concurrentCall(arr,function(err,result){
       	if(err ) console.log(err);
       	else console.log(result);
    });
}
```