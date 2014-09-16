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
            "url":"ws://198.101.197.138:8888/",
            "method":"push"
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
            "url":"ws://198.101.197.138:8888/",
            "method":"pull"
        },
        "series":[
            {
                "values":[]
            }
        ]
    }
};