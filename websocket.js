#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    response.writeHead(404);
    response.end();
});
server.listen(8888, function() {
    console.log((new Date()) + ' Server is listening on port 8888');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }

	var type = '',  method = '', status = 0;
	
    var connection = request.accept('zingchart', request.origin);
    
    connection.on('message', function(message) {
        
    	function startFeed() {
	    	console.log('start feed');
	    	status = 1;
	    	if (method == 'push') {
	    		sendFeedData();
    		}
    	}
    	
    	function stopFeed() {
			console.log('stop feed');
    		status = 0;
    	}
    
    	function sendFeedData() {
    		if (method == 'push') {
    			var ts = (new Date()).getTime();
				var data = {
					"scale-x" : ts,
					"plot0" : [ts, parseInt(10+100*Math.random(), 10)]
				};
				console.log('sending feed data (push)');
				//console.log(data);
				connection.sendUTF(JSON.stringify(data));
				if (status == 1) {
					iFeedTick = setTimeout(sendFeedData, 500);
				}
			} else if (method == 'pull') {
				var data = [];
				var ts = (new Date()).getTime();
				for (var i=-5;i<=0;i++) {

					data.push({
						"scale-x" : ts + i*500,
						"plot0" : [ts + i*500, parseInt(10+100*Math.random(), 10)]
					});
				}
				console.log('sending feed data (pull)');
				connection.sendUTF(JSON.stringify(data));
			}
		}
		
		function sendFullData() {
			var data = {
				type : "bar",
				series : [
					{
						values : [
							[(new Date()).getTime(), parseInt(10+100*Math.random(), 10)]
						]
					}
				]
			};
			console.log('sending full data');
			connection.sendUTF(JSON.stringify(data));
			if (status == 1) {
				if (method == 'push') {
					setTimeout(sendFullData, 2000);
				}
			}
		}
    
        if (message.type === 'utf8') {
	        console.log('************************ ' + message.utf8Data);
            switch (message.utf8Data) {
            	case 'zingchart.full':
            		type = 'full';
            		break;
            	case 'zingchart.feed':
            		type = 'feed';
            		break;
            	case 'zingchart.push':
            		method = 'push';
            		break;
            	case 'zingchart.pull':
            		method = 'pull';
            		break;
            	case 'zingchart.startfeed':
            		startFeed();
            		break;
        		case 'zingchart.stopfeed':
   					stopFeed();
   					break;
				case 'zingchart.getdata':
					status = 1;
					if (type == 'full') { 
						sendFullData();
					} else if (type == 'feed') {
						sendFeedData();
					}
					break;
            }         
            
        }
    });
    
    connection.on('close', function(reasonCode, description) {
    	status = 0;
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
