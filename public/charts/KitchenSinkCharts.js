var line_data_chart = {
	"data": {
    "type": "line",
        "id":"id0",
        "title": {
          "text": "Line Chart"
        },
        "plot":{},
        "scale-x":{
            "offset-start":"30px",
            "offset-end":"30px"
        },
        "series": [
            {
                "values": [5,10,15,5,10,5]
            },
            {
                "values": [2,1,6,3,10,8]
            },
            {
                "values": [12,6,8,11,10,12]
            }
        ]
    }
};

var bar_data_chart = {
	"data" : {
	    "type": "bar",
	    "title": {
	      "text": "Bar Chart"
	    },
	    "crosshair-x": {
	        "visible": 0
	    },
	    "plot":{
	        
	    },
	    "series": [
	        {
	            "values": [5,10,15,5,10,5]
	        },
	        {
	            "values": [2,4,6,8,10,12]
	        },
	        {
	            "values": [12,6,8,11,3,1]
	        },
	        {
	            "values": [1,5,1,2,3,15]
	        }
	    ]
	}
};

var area_data_chart = {
	"data" : {
    "type": "area",
    "title": {
        "text": "Area Chart"
    },
    "plot":{
        "aspect":"standard"
    },
    "series": [
        {
            "values": [5,10,15,5,10,5]
        },
        {
            "values": [2,1,6,3,3,4]
        },
        {
            "values": [12,6,8,11,1,5]
        }
    ]
}
};

var pie_data_chart = {
	"data" : {
    "type": "pie",
    "title": {
      "text": "Pie Chart"
    },
    "crosshair-x": {
        "visible": 0
    },
    "plot":{
    },
    "plotarea":{
        "margin":"45 30 30 30"
    },
    "series": [
        {
            "values": [5],
            "text":"Alaska"
        },
        {
            "values": [2],
            "text":"Maine"
        },
        {
            "values": [7],
            "text":"Texas"
        },
        {
            "values": [10],
            "text":"Wyoming"
        }
    ]
}
};

var scatter_data_chart = {
	"data" : {
    "type": "scatter",
    "title": {
        "text": "Scatter Chart"
    },
    "plot":{
        "marker":{
            "shadow":0
        }
    },
    "series": [
        {
            "values": [5,10,15,5,14,5]
        },
        {
            "values": [2,1,3,4,9,10]
        },
        {
            "values": [6,9,3,2,6,3]
        },
        {
            "values": [3,4,2,7,3,7]
        }
    ]
}
};

var radar_data_chart = {
	"data" : {
    "type": "radar",
    "title": {
        "text": "Radar Chart"
    },
    "plot":{  
    },
    "series": [
        {
            "values": [5,10,15,5,14,5]
        },
        {
            "values": [2,1,3,4,9,10]
        },
        {
            "values": [6,9,3,2,6,3]
        }
    ]
}
};

var radar_data_chart_series = {
    'data' : [
            {
            "values": [5,10,15,5,14,5]
        },
        {
            "values": [2,1,3,4,9,10]
        },
        {
            "values": [6,9,3,2,6,3]
        }
    ]
};

var radar_data_chart_mixed = {
            data : [
                {
                    "aspect":"line",
            "values": [5,10,15,5,14,5]
        },
        {
            "aspect":"dots",
            "values": [2,1,3,4,9,10]
        },
        {
            "aspect":"rose",
            "values": [6,9,3,2,6,3]
        }
            ]
        };

var stock_data_chart = {
	"data" : {
            "type": "stock",
            "title": {
              "text": "Stock Chart"
            },
            "plot":{},
            "-shapes":[
                {
                    "type":"rect",
                    "id":"candlestick",
                    "background-color":"white",
                    "height":9,
                    "width":9,
                    "border-color":"black",
                    "border-width":1,
                    "x":"5%",
                    "y":"10%",
                    "cursor":"hand",
                    "label":{
                        "text":"Candlestick",
                        "offset-y":"10%",
                        "offset-x":"3%",
                        "font-size":"9"
                    }
                },
                {
                    "type":"rect",
                    "id":"whisker",
                    "background-color":"white",
                    "height":9,
                    "width":9,
                    "border-color":"black",
                    "border-width":1,
                    "x":"25%",
                    "y":"10%",
                    "cursor":"hand",
                    "label":{
                        "text":"Whisker",
                        "offset-y":"10%",
                        "font-size":"9"
                    }
                }
            ],
            "series": [
                {
                "values":[
                [50,56,42,53],
                [35,45,31,41],
                [50,60,41,55],
                [49,57,48,56],
                [40,49,35,46]]
            },
            {
                "values":[
                [45,55,41,51],
                [18,34,16,20],
                [40,50,31,45],
                [59,67,58,66],
                [60,66,52,63]]
            },
            {
                "values":[
                [25,35,21,31],
                [38,54,36,40],
                [50,60,41,55],
                [39,47,38,46],
                [40,46,32,43]]
            }
            ]
        }
};

var bubble_data_chart = {
	"data" : {
    "type": "bubble",
    "title": {
      "text": "Bubble Chart"
    },
    "scale-y":{
      "offset-start":0,
      "offset-end":10
    },
    "plot":{
        "scaling":"sqrt"
    },
    "series": [
         {
            "values":[
                [5,6,2],
                [7,9,3],
                [7.5,8.5,2.5],
                [2.2,3,2.8],
                [1.2,1,4.8],
                [3.2,.2,2.8]
            ]
        },
        {
            "values":[
                [1,7.2,2],
                [3,4.5,3],
                [5.5,2.5,5.5],
                [3.2,2.4,2.8]
            ]
        },
        {   
            "values":[
                [3.4,5,8.2],
                [2,1,9],
                [8.3,8,7.3],
                [4.4,6.5,9],
                [7.1,3,7],
                [2,7,5],
                [1,4,6],
                [6.2,2,6.5],
                [4,8,6.5],
                [1,2.5,4.5],
                [2,8,5]
            ]
        },
    ]
}
};

var piano_data_chart = {
	"data" : {
            "type": "piano",
            "title": {
              "text": "Piano Chart"
            },
            "plot":{

            },
           
            "series": [
                {
                "values":[1,2,3,4],
                "text":"X"
            },
            {
                "values":[2,4,6,8],
                "text":"Y"
            },
            {
                "values":[4,8,12,16],
                "text":"Z"
            },
            {
                "values":[8,16,24,32],
                "text":"W"
            }
            ]
        }
};

var bullet_data_chart = {
    "data": {
        "type": "bullet",
        "title": {
          "text": "Bullet Chart"
        },
        "plot":{

        },
        "series": [
            {
                "values":[98,87,12,92,93],
                "goals":[90,75,25,80,90]
            },
            {
                "values":[76,62,25,52,48],
                "goals":[70,80,24,61,25]
            },
            {
                "values":[81,54,37,40,57],
                "goals":[62,70,29,54,41]
            }
        ]
    }
};

var gauge_data_chart = {
    "data": {
        "type": "gauge",
            "title": {
              "text": "Gauge Chart"
            },
            "plotarea": {
                "margin":"50 0 0 0"
            },
            "series": [
               {
                "values":[15],
                "animation":{
                        "method":5,
                        "effect":2,
                        "speed":3500
                    }
            },
            {
                "values":[62],
                "animation":{
                        "method":5,
                        "effect":2,
                        "speed":2500
                    }
            },
            {
                "values":[31],
                "animation":{
                        "method":5,
                        "effect":2,
                        "speed":2000
                    }
            },
            {
                "values":[80],
                "animation":{
                        "method":5,
                        "effect":2,
                        "speed":1500
                    }
            }
            ]
        }
};

var funnel_data_chart = {
    "data": {
      "type":"funnel",
      "title": {
        "text": "Funnel Chart"
      },
      "series":[
        {
          "values":[80]
        },
        {
          "values":[62]
        },
        {
          "values":[31]
        },
        {
          "values":[15]
        }
      ]
    }
};

var venn_data_chart = {
    "data": {
        "type":"venn",
        "title": {
              "text": "Venn Diagram"
            },
        "plotarea":{
            "margin":"45 40 0 0"
        },
        "series":[
            {
                "values":[100],
                "join":[5]
            },
            {
                "values":[70],
                "join":[5]
            },
            {
                "values":[90],
                "join":[5]
            }
        ]
    }
};

var pareto_data_chart = {
    "data": {
        "type":"pareto",
        "title": {
          "text": "Pareto Chart"
        },
        "plotarea":{
            "margin":"75 75 50 75"
        },
        "series":[
            {
                "type":"bar",
                "values":[46420,43450,23500,12510],
                "hover-state":{
                    "visible":false
                }
            },
            {
                "type":"line",
                "scales":"scale-x,scale-y-2"
            }
        ],
        "scale-x":{
            "values":["Platform","GUI","Runtime","Prod"]
        },
        "scale-y-2":{
            "range":"0:100:20"
        }
    }
};

var mixed_data_chart = {
    "data": {
        "type":"mixed",
        "title":{
            "text":"Mixed - XY",
            "height":"20px"
        },
        "plotarea":{
            "margin":"80 150 60 60"
        },
        "scale-y":{
            "line-color":"#7ca82b"
        },
        "-scale-y-2":{
            "values":"0:100:10",
            "line-color":"#1db0e1"
        },
        "-scale-x-2":{
            "values":"1:10:2"
        },
        "series":[
            {
                "values":[8,31,12,41,24,20,16,40,9],
                "type":"bar",
                "hover-state":{
                    "visible":0
                }
            },
            {
                "values":[11,26,7,44,11,28,42,26,13],
                "type":"line"
            }
        ]
    }
};