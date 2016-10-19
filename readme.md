### How to use:
```javascript
var train = require('./async-train/index.js');
function publish(message,cb){
	// note that this function must be async
	console.log(message);
	process.nextTick(cb);
}
```
### use of 'mapConcurrentLimit':

```javascript
function main(){
    var arr = [];
    for(var i=0;i<10000;i++){
        arr.push(i);
    }
    train.mapConcurrentLimit(arr,1000,publish,function(err,result){
       	if(err ) console.log(err);
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

```javascript
function main(){
    var arr = [];
    for(var i=0;i<10000;i++){
        arr.push(function(cb){
        	// this function must be async
        	console.log('Hello');
        	process.nextTick(cb());
        });
    }
    train.concurrentCallLimit(arr,1000,function(err,result){
       	if(err ) console.log(err);
       	else console.log(result);
    });
}
```


### use of concurrentCall:

```javascript
function main(){
    var arr = [];
    for(var i=0;i<10000;i++){
        arr.push(function(cb){
        	// this function must be async
        	console.log('Hello');
        	process.nextTick(cb());
        });
    }
    train.concurrentCall(arr,function(err,result){
       	if(err ) console.log(err);
       	else console.log(result);
    });
}
```