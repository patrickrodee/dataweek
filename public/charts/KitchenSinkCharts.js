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

var grid_data_chart = {
    "data": {
        "type":"grid",
        "title":{
            "text":"Grid"
        },
        "plotarea":{
            "margin":"50 40 40 40"
        },
        "options":{
            "header-row":true,
            "col-widths":["26%","26%","26%","22%"],
            "col-labels":["First","Last","DOB","Country"],
            "style":{
                ".th":{
                    "background-color":"#40beeb",
                    "align":"center",
                    "font-color":"#fff",
                    "font-size":"10px",
                    "font-family":"arial",
                    "border":"1px solid #999"
                },
                ".tr":{
                    "border":"1px solid #999",
                    "font-color":"#000000",
                    "font-size":"10px",
                    "font-family":"arial",
                    "padding":"6px"
                },
                ".tr_odd":{
                    "background-color":"#fbfbfb"
                },
                ".tr_even":{
                    "background-color":"#fff"
                },
                ".td":{
                    "align":"center",
                    "border":"1px solid #999"
                },
                ".td_0":{
                    "font-weight":"bold"
                }
            }
        },
        "series":[
            {
                "values":["Jon","Anderson","1/9/57","UK"]
            },
            {
                "values":["Steve","Hogarth","1/25/50","UK"]
            },
            {
                "values":["Jim","Carrey","6/12/72","US"]
            },
            {
                "values":["Paul","Hogan","10/22/56","AU"]
            },
            {
                "values":["Brenden","Morrow","1/16/79","CA"]
            },
            {
                "values":["Kate","Moss","1/16/74","UK"]
            },
            {
                "values":["David","Chokachi","1/16/68","US"]
            }
        ]
    }
};

var map_data_chart = {
    "data": {
    "title": {
          "text": "Map"
        },
        "shapes":[
            {
                "type":"zingchart.maps",
                "options":{
                    "id":"map",
                    "name":"usa",
                    "scale":true,
                    "x":0,
                    "y":"20px",
                    "width":"100%",
                    "height":"100%",
                    "style":{
                        "label":{
                            "visible":0
                        },
                        "tooltip":{
                            "visible":false   
                        }
                    }
                }
            }
        ]
    }
};

var chord_data_chart = {
    "data": {
    "graphset":[{
    "type":"chord",
    "title": {
          "text": "Chord Chart"
        },
    "plotarea":{
        "margin":"50 20 20 20"
    },
    "options":{
        "style":{
            "item":{
                "color":"black"
            },
            "label":{
                "color":"black"
            },
            "tick":{
                "color":"black"
            }
        }
    },
    "series":[
        {
            "values":[6637,5700,4789,2771],
            "text":"A",
            "background-color":"#40beeb"
        },
        {
            "values":[7737,2691,2202,7006],
            "text":"B",
             "background-color":"#305f74"
        },
        {
            "values":[8574,9898,4084,1765],
            "text":"C",
             "background-color":"#4492a8"
        },
        {
            "values":[5309,1602,8395,2908],
            "text":"D",
             "background-color":"#8e8e8e"
        }
    ]
}]}
};

var rankflow_data_chart = {
    "data": {
    "graphset":[{
        "type":"rankflow",
        "plotarea":{
            "margin":"40 20 20 20"
        },
        "title":{
            "text":"Rankflow Chart"
        },
        "scale-x":{
            "labels":["ON-TIME","CANCELED<br>FLIGHTS"],
            "values":["ON-TIME","CANCELED FLIGHTS"],
            "item":{
                "color":"black"
            }
        },
        "options":{
            "color-type":"palette",
            "palette":["#40beeb","#305f74","#4492a8","#8e8e8e","#dddddd","#83deff","#086893","#85bdcd"]
        },
        "series":[
            {
                "text":"Air West",
                "ranks":[3,4],
                "rank":1,
                "background-color":"#40beeb"
            },
            {
                "text":"Braniff",
                "ranks":[1,1],
                "rank":2,
                "background-color":"#305f74"
            },
            {
                "text":"Capital",
                "ranks":[6,2],
                "rank":3,
                "background-color":"#4492a8"
            },
            {
                "text":"Eastern",
                "ranks":[8,7],
                "rank":4,
                "background-color":"#8e8e8e"
            },
            {
                "text":"Galaxy",
                "ranks":[4,5],
                "rank":5,
                "background-color":"#dddddd"
            },
            {
                "text":"PSA",
                "ranks":[5,3],
                "rank":6,
                "background-color":"#83deff"
            },
            {
                "text":"Pan Am",
                "ranks":[2,6],
                "rank":7,
                "background-color":"#086893"
            },
            {
                "text":"Sunbird",
                "ranks":[7,8],
                "rank":8,
                "background-color":"#85bdcd"
            }
        ]
    }]}
};

var treemap_data_chart = {
    "data": {
    "graphset":[{
            "type":"treemap",
            "plotarea":{
                "margin":"35 5 5 7"
            },
            "title": {
              "text": "Treemap"
            },
            "options":{
                "color-type":"palette",
                "palette":["#40beeb","#305f74","#4492a8","#8e8e8e","#dddddd","#83deff","#086893","#85bdcd"]
            },
            "series":[
                {
                    "text":"North America",
                    "background-color":"#40beeb",
                    "children":[
                        {
                            "text":"United States",
                            "children":[
                                {
                                    "text":"Texas",
                                    "value":21
                                },
                                {
                                    "text":"California",
                                    "value":53
                                }
                            ]
                        },
                        {
                            "text":"Canada",
                            "value":113
                        },
                        {
                            "text":"Mexico",
                            "value":78
                        }
                    ]
                },
                {
                    "text":"Europe",
                    "background-color":"#305f74",
                    "children":[
                        {
                            "text":"France",
                            "value":42
                        },
                        {
                            "text":"Spain",
                            "value":28
                        }
                    ]
                },
                {
                    "text":"Africa",
                    "children":[
                        {
                            "text":"Egypt",
                            "value":22
                        },
                        {
                            "text":"Congo",
                            "value":38
                        }
                    ]
                },
                {
                    "text":"Asia",
                    "children":[
                        {
                            "text":"India",
                            "value":92
                        },
                        {
                            "text":"China",
                            "value":68
                        }
                    ]
                },
                {
                    "text":"South America",
                    "children":[
                        {
                            "text":"Brazil",
                            "value":42
                        },
                        {
                            "text":"Argentina",
                            "value":28
                        }
                    ]
                },
                {
                    "text":"Australia (continent)",
                    "children":[
                        {
                            "text":"Australia (country)",
                            "value":121
                        },
                        {
                            "text":"New Zealand",
                            "value":24
                        }
                    ]
                }
            ]
        }]}
};

var wordcloud_data_chart = {
    "data": {
    "graphset":[{
            "type":"wordcloud",
            "title": {
              "text": "Wordcloud"
            },
            "plotarea":{
                "margin":"30 5"
            },
            "options":{
                "text":"Data Data Data Data Data Data Data Data Data Data Visualization Visualization Visualization Visualization Visualization Visualization Visualization Visualization Visualization HTML5 HTML5 HTML5 HTML5 HTML5 HTML5 HTML5 HTML5 JavaScript JavaScript JavaScript JavaScript JavaScript JavaScript JavaScript Charts Charts Charts Charts Charts Charts Piano Piano Piano Piano  Bar Bar Bar Bar Bar Bar  Line Line Line Line Line Line Area Area Area Area Area  ZingChart ZingChart ZingChart ZingChart ZingChart  Diagrams Diagrams Diagrams Diagrams Funnel Funnel Funnel Funnel Labels Labels Labels Labels Markers Markers Markers Pareto Pareto Pareto Pareto  ",
                
                "color-type":"palette",
                "palette":["#40beeb","#305f74","#4492a8","#8e8e8e","#83deff","#086893","#85bdcd"]

            }
       }]}
};

var network_data_chart = {
    "data": {
        "graphset":[
            {
                    "title": {
                        "text": "Network Diagram"
                    },
                "layers":{
                    "graphset":false,
                    "graph":false,
                    "objects-bottom":false,
                    "static":false,
                    "guide":false,
                    "plotarea":false
                },
                "type":"diagram",
                "-plotarea":{
                    "margin":"0"
                },
                "tooltip":{
                    
                },
                "options":{
                    "type":"",
                    "layout":"tree-right",
                    "style":{
                        "link":{
                            "line-width":1,
                            "label":{
                                "font-size":9
                            }
                        },
                        "item":{
                            "size":15,
                            "border-width":1,
                            "hover-state":{
                                "background-color":"#f90"
                            }
                        }
                    },
                    "items":[
                        {
                            "id":"s5",
                            "type":"circle",
                            "text":"5",
                            "style":{
                                "tooltip":{
                                    "text":"Stage 5 - Start"
                                }
                            }
                        },
                        {
                            "id":"s12",
                            "type":"circle",
                            "text":"12",
                            "parent":"s5",
                            "parentlink":{
                                "text":"0,5<br>(1.0)",
                                "arrows":"00"
                            }
                        },
                        {
                            "id":"s1",
                            "type":"circle",
                            "text":"1",
                            "parent":"s12",
                            "parentlink":{
                                "text":"4,5<br>(1.0)",
                                "arrows":"01"
                            }
                        },
                        {
                            "id":"s7",
                            "type":"diamond",
                            "text":"7",
                            "parent":"s1",
                            "parentlink":{
                                "text":"5,2 (1.0)",
                                "arrows":"10"
                            }
                        },
                        {
                            "id":"s10",
                            "type":"triangle",
                            "text":"10",
                            "parent":"s7",
                            "style":{
                                "label":{
                                    "offset-y":5
                                }
                            },
                            "parentlink":{
                                "text":"6,2<br>(1.0)",
                                "arrows":"11"
                            }
                        },
                        {
                            "id":"s3",
                            "type":"circle",
                            "text":"3",
                            "parent":"s10",
                            "parentlink":{
                                "text":"7,0<br>(1.0)"
                            }
                        },
                        {
                            "id":"s8",
                            "type":"rectangle",
                            "text":"8",
                            "parent":"s3",
                            "parentlink":{
                                "text":"8,3<br>(1.0)"
                            }
                        },
                        {
                            "id":"s2",
                            "type":"trapezoid",
                            "text":"2",
                            "parent":"s8",
                            "parentlink":{
                                "text":"9,1<br>(0.9446254)"
                            }
                        },
                        {
                            "id":"s9",
                            "type":"circle",
                            "text":"9",
                            "parent":"s2",
                            "parentlink":{
                                "text":"10,2<br>(0.9446254)"
                            }
                        },
                        {
                            "id":"s11",
                            "type":"circle",
                            "text":"11",
                            "parent":"s9",
                            "style":{
                                "top-state":{
                                    "size":12
                                },
                                "tooltip":{
                                    "text":"Stage 11 - End"
                                }
                            },
                            "parentlink":{
                                "text":"11,0<br>(0.9446254)"
                            }
                        },
                        {
                            "id":"s4",
                            "type":"circle",
                            "text":"4",
                            "parent":"s8",
                            "parentlink":{
                                "text":"9,4 (0.055374593)"
                            }
                        },
                        {
                            "id":"s6",
                            "type":"circle",
                            "text":"6",
                            "parent":"s4",
                            "parentlink":{
                                "text":"10,2<br>(0.055374593)"
                            }
                        },
                        {
                            "id":"s0",
                            "type":"circle",
                            "text":"0",
                            "parent":"s6",
                            "style":{
                                "top-state":{
                                    "size":12
                                },
                                "tooltip":{
                                    "text":"Stage 0 - End"
                                }
                            },
                            "parentlink":{
                                "text":"11,0<br>(0.055374593)"
                            }
                        }
                    ]
                }
            }
        ]
    }
};

var bar_rules_data_chart = {
    "data": {
        "graphset":[
            {
                "type":"bar",
                "title":{
                    "text":"Bar Rules"
                },
                "plot":{
                    "rules":[
                        {
                            "rule":"%v > 0"
                        },
                        {
                            "rule":"%v < 0",
                            "background-color":"#cc3300"
                        }
                    ]
                },
                "series":[
                    {
                        "values":[50,-20,68,98,-35]
                    }
                ]
            }
        ]
    }
};

var currency_data_chart = {
    "data": {
        "type":"line",
        "utc":true,
        "timezone":-7,
        "title":{
            "text":"Currency - Time"
        },
        "subtitle":{
            "text":"US Dollar - PDT"
        },
        "scale-y":{
            "min-value":"auto",
            "format":"$%v",
            "decimals":2,
            "label":{
                "text":"Stock Price"
            }
        },
        "scale-x":{
            "step":"day",
            "max-items":4,
            "min-value":"1408226922000",
            "transform":{
                "type":"date",
                "all":"%M %d<br>%h:%i %A",
                "item":{
                    "visible":false
                }
            },
            "zooming":1
        },
        "tooltip":{
            "text":"%k<br><br>Open: $%node-value-stock-open<br>High: $%node-value-stock-high<br>Low: $%node-value-stock-low<br>Close: $%node-value-stock-close",
            "decimals":2,
            "text-align":"left"
        },
        "plot":{
            "-max-nodes":60,
            "mode":"fast",
            "exact":1
        },
        "plotarea":{
            "margin":"70 50 50 90"
        },
        "series":[
            {
                "values":[[1408226922000,[213,280,128,216]],
                [1408313322000,[233,306,158,226]],
                [1408399722000,[233,306,158,226]],
                [1408486122000,[226,281,157,209]],
                [1408572522000,[209,254,136,211]],
                [1408658922000,[211,270,167,214]],
                [1408745322000,[214,283,159,240]],
                [1408831722000,[214,283,159,240]],
                [1409004522000,[240,305,170,238]],
                [1409090922000,[238,311,198,264]],
                [1409177322000,[264,337,215,289]],
                [1409263722000,[289,356,245,261]],
                [1409350122000,[261,301,213,250]],
                [1409436522000,[261,301,213,250]]]
            }
        ]
    }
};

var patterns_data_chart = {
    "data": {
        "type":"bar",
        "title":{
            "text":"Patterns"
        },
        "crosshair-x":{
            "visible":0
        },
        "plot":{
            
        },
        "series":[
            {
                "values":[5,10],
                "background-image":"PATTERN_WIDE_UPWARD_DIAGONAL"
            },
            {
                "values":[2,5],
                "background-image":"PATTERN_SHADE_25"
            },
            {
                "values":[12,6],
                "background-image":"PATTERN_LIGHT_VERTICAL"
            },
            {
                "values":[1,5],
                "background-image":"PATTERN_SHINGLE"
            }
        ]
    }
};

var arrows_data_chart = {
    "data": {
        "type": "scatter",
            "title": {
              "text": "Arrows"
            },
            "plot":{},
            "scale-x":{
            },
            "series": [
                {
                    "values": [4,5,8,4,9,10,7,8,9]
                }
            ],
            "arrows":[
            {
                "background-color":"#305f74",
                "alpha":.02,
                "border-width":"0px",
                "from":{
                    "hook":"node:plot=0,index=0"
                },
                "to":{
                    "hook":"node:plot=0,index=8"
                },
                "size":"3px"

            }
        ]
    }
};

var images_data_chart = {
    "data": {
        "type": "bar",
            "title": {
              "text": "Images"
            },
            "plot":{
                "background-image": ocean_wave
            },
            "scale-x":{
            },
            "series": [
            {
                "values": [4,5,8,4,9,10,7,8,9]
            }
        ]
    }
};

var shapes_data_chart = {
    "data": {
        "type": "line",
        "title": {
          "text": "Shapes"
        },
        "plot":{

        },
        "scale-x":{
            "offset-start":"30px",
            "offset-end":"30px"
        },
        "series": [
            {
                "values": [5,10,15,5,10,5]
            }
        ],
        "shapes":[
            {
                "type":"plus",
                "line-width":10,
                "line-color":"#8e8e8e",
                "size":20,
                "x":80,
                "y":80
            },
            {
                "type":"rect",
                "background-color":"#305f74",
                "height":40,
                "width":40,
                "x":120,
                "y":130
            },
            {
                "type":"star7",
                "background-color":"#4492a8",
                "size":18,
                "x":210,
                "y":80
            },
            {
                "type":"triangle",
                "background-color":"#85bdcd",
                "size":20,
                "x":300,
                "y":120
            },
        ]
    }
};

var stacked_data_chart = {
    "update": 0,
    "data": {
        "type":"bar",
        "stacked":true,
        "stack-type":"normal",
        "title": {
          "text": "Bar Stacked"
        },
        "series":[
            {
                "values":[11,16,7,14,11]
            },
            {
                "values":[28,35,22,35,30]
            },
            {
                "values":[14,21,29,19,31]
            }
        ]
    }
};

var barstack01 = {
    "update": 0,
    "data": [{
                "values":[11,16,7,14,11],
                "stack":1
            },
            {
                "values":[28,35,22,35,30],
                "stack":2
            },
            {
                "values":[14,21,29,19,31],
                "stack":2
            }
        ]
};

var barstack02 = {
    "update": 0,
    "data": [{
            "values":[11,16,7,14,11],
            "stack":1
        },
        {
            "values":[28,35,22,35,30],
            "stack":1
        },
        {
            "values":[14,21,29,19,31],
            "stack":1
        }]
};

var barstack03 = {
    "update": 0,
    "data": [
            {
                "values":[11,16,7,14,11],
                "stack": 1
            },
            {
                "values":[28,35,22,35,30],
                "stack": 1
            },
            {
                "values":[14,21,29,19,31],
                "stack": 1
            }
        ]
};

var area_stacked_data_chart = {
    "data": {
        "type":"area",
        "stacked":true,
        "stack-type":"normal",
        "title": {
          "text": "Area Stacked",
        },
        "series":[
            {
                "values":[11,16,7,14,11]
            },
            {
                "values":[28,35,22,35,30]
            },
            {
                "values":[14,21,29,19,31]
            }
        ]
    }
};

var drilldown_data_chart = {
    "data": {
        "history":{
            "y":"40px"
        },
        "graphset":[
            {
                "id":"d1",
                "type":"pie",
                "title":{
                    "text":"New Chart Drill Down - History"
                },
                "subtitle":{
                    "y":"40px",
                    "text":"Click a category to view tools!"
                },
                "plot":{
                    "detach":false,
                    "hover-state":{
                        "visible":false
                    },
                },
                "series":[
                    {
                        "text":"Dev Tools",
                        "values":[15],
                        "url":"/charts/drilldown/Dev.txt",
                        "target":"graph=d1"
                    },
                    {
                        "text":"Security Tools",
                        "values":[10],
                        "url":"/charts/drilldown/Security.txt",
                        "target":"graph=d1"
                    },
                    {
                        "text":"Data Management",
                        "values":[25],
                        "url":"/charts/drilldown/Data.txt",
                        "target":"graph=d1"
                    },
                    {
                        "text":"Visualization Tools",
                        "values":[20],
                        "url":"/charts/drilldown/Visualization.txt",
                        "target":"graph=d1"
                    },
                    {
                        "text":"Site Performance",
                        "values":[25],
                        "url":"/charts/drilldown/Site.txt",
                        "target":"graph=d1"
                    }
                ],
                "tooltip":{
                    "text":"%v %",
                    "shadow":false
                }
            }
        ]
    }
};

var parent_data_chart = {
    "data": {
        "graphset":[
            {
                "id":"years",
                "x":"0%",
                "y":"0%",
                "width":"100%",
                "height":"40%",
                "type":"bar",
                "title":{
                    "text":"Parent Child Drilldown",
                },
                "plotarea":{
                    "margin":"50 30 40 50"
                },
                "scale-x":{
                    "values":"1994:2014",
                    "max-items":99,
                    "guide":{
                        "visible":false
                    }
                },
                "plot":{
                    "bars-overlap":"100%",
                    "rules":[]
                },
                "scale-y":{
                    "values":"0:150:25",
                    "min-value":0,
                    "guide":{
                        "visible":false
                    }
                },
                "series":[
                    {
                        "values":[81,106,110,114,133,108,101,120,116,113,123,130,132,124,128,122,115,104,123,146,113],
                        "url":"kitchen/chart_scripts/data-months.php?year=%scale-key-value&filepath=kitchen/chart_scripts",
                        "target":"graph=months",
                        "z-index":1,
                    },
                    {
                        "values":[150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150],
                        "background-color":"#E8E7E8",
                        "maxTrackers":0,
                        "z-index":0
                    }
                ]
            },
            {
                "id":"months",
                "x":"0%",
                "y":"40%",
                "width":"100%",
                "height":"30%",
                "type":"null",
                "labels":[
                    {
                        "text":"Click on a YEAR above to view monthly stats",
                        "width":400,
                        "height":40,
                        "margin":"auto auto",
                        "border-width":1,
                        "border-radius":2,
                        "padding":20,
                        "background-color":"#f9f9f9"
                    }
                ]
            },
            {
                "id":"days",
                "x":"0%",
                "y":"70%",
                "width":"100%",
                "height":"30%",
                "type":"null",
                "labels":[
                    {
                        "text":"Click on a MONTH above to view daily stats",
                        "width":400,
                        "height":40,
                        "height":40,
                        "margin":"auto auto",
                        "border-width":1,
                        "border-radius":2,
                        "padding":20,
                        "background-color":"#f9f9f9"
                    }
                ]
            }
        ]
    }
};

var big_data_chart = {
    "data": {
        "graphset":[
        {
        "type":"mixed",
        "title":{
            "text":"Big Chart",
        },
        "subtitle":{
            "text":"Subtitle",
            "align":"left",
            "background-color":"#8e8e8e",
            "y":"28px"
        },
        "source":{
                    "text":"Source: Some Website"
        },
        "legend":{
            "layout":"x2",
            "width":"200px",
            "alpha":1,
            "shadow":0,
            "max-items":2,
            "overflow":"page",
            "draggable":true,
            "minimize":true,
            "header":{
                "text":"Legend Info"
            },
            "footer":{
                "text":"- Click Box Icon in Header to Minimize<br>- Click and Drag Cross Icon to Drag",
                "font-size":"8px"
            },
            "icon":{
                "line-color":"white"    
            }
        },
        "plotarea":{
            "margin":"160px 200px 130px 90px"
        },
        "scale-x":{
            "values":["January","February","March","April","May","June","July","August","September","October","November","December"],
            "zooming":true,
            "guide":{
                    "line-style":"solid"
                },
            "label":{
                "text":"X label"
                },
            "markers":[
                {
                 "type":"area",
                 "range":[7,8],
                 "background-color":"#ccc",
                 "label":{
                        "text":"Area<br>Marker",
                        "offset-y":-415,
                        "offset-x":10,
                        "angle":0,
                        "background-color":"white",
                        "border-radius":3,
                        "alpha":0.8
                    }
                }
                ]
        },
        "scale-x-2":{
            "values":["1","2","3","4","5","6","7","8","9","10"],
            "guide":{
                "visible":false    
            },
            "label":{
                "text":"X-2 label"
                },
            "zooming":true
        },
        "scale-y":{
            "zooming":true,
            "guide":{
                    "line-style":"solid"
                },
            "label":{
                "text":"Y label"
                },
            "minor-ticks":3,
            "minor-tick":{
                    "placement":"cross",
                    "size":6
                },
            "minor-guide":{
                    "line-width":"1px",
                    "line-style":"dashed",
                    "line-segement-size":"1px",
                    "line-gap-size":"6px",
                    "alpha":0.7
                },
            "markers":[
                {
                    "type":"line",
                    "range":[25],
                    "line-color":"blue",
                    "alpha":1,
                    "line-width":2,
                    "label":{
                        "text":"Line Marker",
                        "offset-x":-80,
                        "offset-y":8,
                        "background-color":"blue",
                        "font-color":"white",
                        "font-size":10,
                        "callout":true,
                        "callout-position":"right"
                        }
                }
            ]
        },
        "scale-y-2":{
            "values":"0:100:10",
            "format":"%v%",
            "zooming":true,
            "guide":{
                "visible":false    
            },
            "label":{
                "text":"Y-2 label"
                }
        },
        "scale-y-3":{
            "values":"0:50:10",
            "decimals":2,
            "zooming":true,
            "guide":{
                "visible":false    
            },
            "label":{
                "text":"Y-3 label"
                }
        },
        "scale-y-4":{
            "values":"0:1000000:100000",
            "format":"$%v",
            "multiplier":true,
            "zooming":true,
            "guide":{
                "visible":false    
            },
            "label":{
                "text":"Y-4 label"
                }
        },
        "scroll-x":{
            "bar":{
                "height":"8px",
                "background-color":"black"
            }
        },
        "scroll-y":{
            "bar":{
                "width":"8px",
                "background-color":"black"
            }
        },
        "crosshair-x":{
                    "plot-label":{
                        "visible":false

                    }
                },
        "crosshair-y":{
                    
                },
        "preview":{
                "position":"50% 98%",
                "margin":"10,50,10,50",
                "height":50
            },
        "plot":{

        },
        "arrows":[
                {
                    "from":{
                        "x":"80%",
                        "y":"25%"
                    },
                    "to":"node:plot=3,index=8",
                    "background-color":"#333",
                    "border-radius":"3px",
                    "border-width":0,
                    "text":"Good!",
                    "font-size":"10px",
                    "font-color":"white",
                    "size":"3px"
                }
            ],
        "labels":[
            {      
                    "text":"View External<br>Report",
                    "url":"www.google.com",
                    "target":"_blank",
                    "offset-y":"-35px",
                    "hook":"node:plot=2,index=4",
                    "font-color":"#000",
                    "background-color":"#ccc",
                    "padding":5,
                    "border-radius":"3px",
                    "callout":true,
                    "callout-height":"10px",
                    "callout-width":"15px",
                    "underline":true
            }
        ],
        "series":[
            {
                "type":"line",
                "values":[69,68,54,80,70,74,90,70,72,68,49,69],
                "text":"Apple"
            },
            {   
                "type":"line",
                "values":[51,53,47,60,48,52,75,52,55,47,60,48],
                "text":"Microsoft"
            },
            {
                "type":"bar",
                "values":[42,43,30,40,31,48,55,46,48,32,38,38],
                "text":"Oracle",
                "tooltip":{
                    "text":"The number being shown is the percentage of the node when compared to its plot",
                    "width":"200px",
                    "wrap-text":1    
                },
                "value-box":{
                        "placement":"in",
                        "offset-y":10,
                        "font-color":"white",
                        "text":"%pper%",
                        "decimals":1,
                        "font-angle":90,
                        "offset-y":"22px"
                    }
            },
            {
                "type":"bar",
                "values":[25,15,26,21,24,26,33,15,41,25,22,24],
                "text":"Dell",
                "tooltip":{
                    "text":"The number being shown above the bar is the value of the node",
                    "width":"200px",
                    "wrap-text":1        
                },
                "value-box":{
                        "placement":"top",
                        "font-color":"black",
                        "bold":true,
                        "offset-y":4
                    }
            }
        ]
    }
    ]
    }
};

var tooltips_data_chart = {
    "data": {
        "type":"bar",
        "title":{
            "text":"Standard Tooltips"
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
};

var tooltips_data_chart_STANDARD = {
    "data": {
        "title": {
            "text": "Standard Tooltips"
        },
        "tooltip":{
            "text":"Student %k<br>%t Percentile: %v",
            "text-align":"left",
            "sticky":0,
            "shadow":0,
            "border-radius":5,
            "x":null,
            "y":null
        }
    }
};

var tooltips_data_chart_FIXED = {
    "data": {
        "title": {
            "text": "Fixed Tooltips"
        },
        "tooltip":{
            "text":"Student %k<br>%t Percentile: %v",
            "text-align":"left",
            "sticky":0,
            "shadow":0,
            "border-radius":5,
            "x":"88%",
            "y":"32%",
            "height":null
        }
    }
};
