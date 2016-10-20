function checkIfArray(arr){
	return Object.prototype.toString.call(arr) === '[object Array]';
}

function checkIfNumber(n){
	return Object.prototype.toString.call(n) === '[object Number]';
}

function checkIfObject(obj){
	return Object.prototype.toString.call(obj) === '[object Object]';
}

function checkIfFunction(func){
	return Object.prototype.toString.call(func) === '[object Function]';
}


function getReturnObj(arr){
	var toReturn;
	if(checkIfArray(arr))
		toReturn=[];
	else if(checkIfObject(arr))
		toReturn={};
	return toReturn;
}

function getKeyQueue(arr){
	var keyQueue = [];
	for(var key in arr){
		if(arr.hasOwnProperty(key)){
			keyQueue.push(key);
		}
	}
	return keyQueue;
}

	
function runInParallelLimit(arr,limit,callback){
	if(!arr || !limit || !checkIfNumber(limit))
		return;
	var toReturn = getReturnObj(arr);
	if(!toReturn)
		return;
	var keyQueue = getKeyQueue(arr);
	if(keyQueue.length==0)
		return callback(toReturn,null);
	var numberOfFunctionToEnvoke=keyQueue.length;
	var numberOfFunctionReturned=0;
	if(limit==-1)
		limit=numberOfFunctionToEnvoke;
	limit=Math.min(limit,keyQueue.length);
	for(var i=0;i<limit;i++){
		var key = keyQueue.pop();
		if(key)
			evaluateFunction(key);
	}
	var callbackCalled=false;
	function evaluateFunction(key){
		var func = arr[key];
		func.call(this,function(err,data){
			if(err){
				if(!callbackCalled){
					callbackCalled=true;
					return callback(err,null);
				}
			}
			else{
				if(callbackCalled)
					return;
				numberOfFunctionReturned++;
				toReturn[key]=data;
				console.log('toReturn',toReturn);
				console.log('data is',data);
				var newKey = keyQueue.pop();
				if(newKey) evaluateFunction(newKey);
				else if(numberOfFunctionReturned==numberOfFunctionToEnvoke) return callback(null,toReturn);
			}
		});
	}
}

function runInParallel(arr,callback){
	runInParallelLimit(arr,-1,callback);
}

function runMapInParallelLimit(arr,limit,func,callback){
	if(!arr || !checkIfNumber(limit) || !func || !checkIfFunction(func))
		return;
	var toReturn = getReturnObj(arr);
	if(!toReturn)
		return;
	var keyQueue = getKeyQueue(arr);
	if(keyQueue.length==0)
		return callback(toReturn,null);
	var numberOfFunctionToEnvoke=keyQueue.length;
	var numberOfFunctionReturned=0;
	if(limit==-1)
		limit=numberOfFunctionToEnvoke;
	limit=Math.min(limit,keyQueue.length);
	for(var i=0;i<limit;i++){
		var key = keyQueue.pop();
			evaluateFunction(key);
	}
	var callbackCalled = false;
	function evaluateFunction(key){
		func.call(this,arr[key],function(err,data){
			if(err){
				if(!callbackCalled){
					callbackCalled=true;
					return callback(err,null);
				}
			}
			else{
				if(callbackCalled){
					return;
				}
				numberOfFunctionReturned++;
				toReturn[key]=data;
				var newKey = keyQueue.pop();
				if(newKey) evaluateFunction(newKey);
				else if(numberOfFunctionReturned==numberOfFunctionToEnvoke){
					return callback(null,toReturn);
				}
			}
		});
	}	
}

function runMapInParallel(arr,func,callback){
	runMapInParallelLimit(arr,-1,func,callback);
}

exports.mapConcurrent=runMapInParallel;
exports.mapConcurrentLimit=runMapInParallelLimit;
exports.concurrentCall = runInParallel;
exports.concurrentCallLimit = runInParallelLimit;

