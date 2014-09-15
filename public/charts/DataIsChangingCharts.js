var pushing_data_chart = {
	"data":{
		"type":"line",
	    "scale-x":{
            "transform":{
                "type":"date",
                "all":"%D, %d %M %Y<br>%h:%i %A"
            }
        },
        "scale-y":{},
	    "series":[
	        {
	            "values":[]
	        }
	    ]
	}
};

var pushing_data_chart_go = {
	"data": {
        "type":"line",
        "scale-x":{
            "transform":{
                "type":"date",
                "all":"%D, %d %M %Y<br>%h:%i %A"
            }
        },
        "scale-y":{},
        "refresh":{
            "interval":5,
            "type":"feed",
            "max-ticks":20,
            "transport":"websockets",
            "url":"ws://localhost:8888/",
            "method":"push"
        },
        "series":[
            {
                "values":[]
            }
        ]
    }
};

var pulling_data_chart_go = {
	"data": {
        "type":"line",
        "scale-x":{
            "transform":{
                "type":"date",
                "all":"%D, %d %M %Y<br>%h:%i %A"
            }
        },
        "scale-y":{},
        "refresh":{
            "interval":5,
            "type":"feed",
            "max-ticks":20,
            "transport":"websockets",
            "url":"ws://localhost:8888/",
            "method":"pull"
        },
        "series":[
            {
                "values":[]
            }
        ]
    }
};

var pulling_data_chart = {
	"data": {
		"graphset":[
		    {
		        "type":"line",
		        "scale-x":{
		            
		        },
		        "series":[
		            {
		                "values":[],
		                "stack":1
		            }
		        ]
		    }
		]
	}
};