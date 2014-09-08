var TOOLTIPS = {
    "type":"bar",
	"title":{
		"text":"Tooltips"
	},
    "legend":{ 
    },
	"plotarea":{
        "margin":"70 140 70 70"
	},
	"scaleX":{
        "values":["116","123","147","150","167","175","181","202","207","215"],
        "label":{
            "text":"Student Number"
            },
            "flat":false,
            "tooltip":{
                "visible":0,
            	"text":"Stuff",
            	"background-color":"white"
            	}
	},
	"scaleY":{
        "format":"%v%",
        "label":{
            "text":"Percentile"
            }
	},
	"plot":{

	},
    "tooltip":{
       "text":"Student %k<br>%t Percentile: %v",
        "text-align":"left",
        "shadow":0,
        "border-radius":5,
        "sticky":0
    },

	"series":[
		{
			"values":[69,68,54,48,70,74,98,70,72,68],
			"text":"Math"
		},
		{
			"values":[51,53,47,60,48,52,75,52,55,47],
			"text":"Reading"
		},
		{
			"values":[42,43,30,40,31,48,55,46,48,32],
			"text":"Logic"
		}
	]
}