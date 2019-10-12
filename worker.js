var workCallback = null;
self.onmessage = function(e) {
	var task = e.data.task;
    var id = task.id;
    workCallback = function() {
    	self.postMessage({result: "Finished", id: id});
    };
    processRecursive(task.tick, task.message.split(""))
    self.postMessage({result: "Started", id: id});
}


function processRecursive(tick, message) {
	if (message.length == 0) {
		workCallback()
		return;
	}

    var bit = message.shift();
    var d = new Date();
    if (bit == "1") {
    	// busy wait
	    var date = new Date();
	    do { var curDate = new Date(); }
	    while (curDate - date < tick);
        processRecursive(tick, message);
    } else {
    	// passive wait
        setTimeout(function () {
        	processRecursive(tick, message); },
        	tick);
    }
}