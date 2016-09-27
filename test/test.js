const parallel = require('../index.js');

function testMapConcurrent(){
	function toPass(item,callback){
		process.nextTick(function(){callback(null,item+" hello")});
	}
	function toPass1(item,callback){
		process.nextTick(function(){callback(null,item+" hello")});
	}
	var arr = ['Hi','Hello','1','2','3'];
	parallel.mapConcurrentLimit(arr,1,toPass,function(err,results){
		console.log(err,results);
	});
	var arr1 = {'name':'Kundan',
		'job':'Nothing',
		'salary':'-1$'
	}
	parallel.mapConcurrentLimit(arr1,1,toPass,function(err,results){
		console.log(err,results);
	});
}

testMapConcurrent();