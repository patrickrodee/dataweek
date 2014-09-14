var standard_chart_data = {
    "data": {
        "graphset":[
            {
                "type":"bar",
                "title":{
                    "text":"Production Report"
                },
                "plot":{
                    "border-radius-top-left":5,
                    "border-radius-top-right":5
                },
                "scale-x":{
                    "values":["2010","2011","2012","2013","2014<br>(Projected)"]
                },
                "scale-y":{
                    "label":{
                        "text":"Units"
                    },
                    "multiplier":true
                },
                "legend":{

                },
                "series":[
                    {
                        "values":[28000,26000,19000,13000,13000],
                        "text":"Model A10"
                    },
                    {
                        "values":[8000,14000,24000,32000,35000],
                        "text":"Model A20"
                    }
                ]
            }
        ]
    }
};

var autodesk_chart_data = {
    "data": {
        "graphset":[
            {
                "background-color": "#f5f5f5",  
                "alpha": 0.3,
                "type":"bar",
                 "title":{
                    "font-family":"Istok Web",
                    "text":"PRODUCTION REPORT",
                    "font-color":"#5E5E5E",
                    "border-right":"1px solid #dfdfdf",
                    "border-left":"1px solid #dfdfdf",
                    "gradient-colors":"#eeeeee #ffffff #fbfbfb #dfdfdf #aaaaaa",
                    "gradient-stops":"0.05 0.2 0.3 0.85 0.98"
                },
                "plot":{
                    "border-radius-top-left":5,
                    "border-radius-top-right":5,
                    "bar-width": "90%",
                    "bar-space": "0%",
                    "bars-overlap":"10%"
                },
                "scale-x":{
                    "values":["2010","2011","2012","2013","2014<br>(Projected)"],
                    "line-color": "#5e5e5e",
                    "item":{
                        "color": "#5e5e5e",
                        "font-family": "Istok Web",
                    },
                    "tick":{
                        "line-color": "#5e5e5e"
                    },
                    "guide":{
                        "visible":false
                    }
                },
                "scale-y":{
                    "label":{
                        "text":"Units",
                        "color": "#5e5e5e",
                        "font-family": "Istok Web",
                    },
                    "multiplier":true,
                    "line-color": "#5e5e5e",
                    "item":{
                        "color": "#5e5e5e",
                        "font-family": "Istok Web",
                    },
                    "tick":{
                        "line-color": "#5e5e5e"
                    },
                    "guide":{
                        "visible":false
                    }
                },
                "legend":{
                    "layout": "horizontal",
                    "background-color": "none",
                    "shadow": 0,
                    "border-color": "none",
                    "item":{
                        "color": "#5E5E5E",
                        "font-family": "Istok Web",
                    },
                    "marker":{
                        "border-color": "none",
                        "border-radius-top-left": 3,
                        "border-radius-top-right": 3,
                        "border-radius-bottom-left": 3,
                        "border-radius-bottom-right": 3
                    },
                    "position": "50% 8%"
                },
                "series":[
                    {
                        "values":[28000,26000,19000,13000,13000],
                        "text":"Model A10",
                        "gradient-colors": "#1E8A80 #B1EAF0 #5D9796 #3FA292 #1A696B",
                        "gradient-stops":"0.05 0.1 0.5 0.85 0.95",
                        "fill-angle": 0,
                        "alpha": 0.9,
                        "tooltip":{
                            "gradient-colors": "#1E8A80 #B1EAF0 #5D9796 #3FA292 #1A696B",
                            "gradient-stops":"0.05 0.1 0.5 0.85 0.95",
                            "shadow":0,
                            "border-color":"#1E8A80",
                            "border-width":2,
                            "border-radius":2
                        }
                    },
                    {
                        "values":[8000,14000,24000,32000,35000],
                        "text":"Model A20",
                        "gradient-colors": "#376A19 #9EEE8D #4A7E38 #578D43 #20470D",
                        "gradient-stops":"0.05 0.1 0.5 0.85 0.95",
                        "fill-angle": 0,
                        "alpha": 0.9,
                        "tooltip":{
                            "gradient-colors": "#376A19 #9EEE8D #4A7E38 #578D43 #20470D",
                            "gradient-stops":"0.05 0.1 0.5 0.85 0.95",
                            "shadow":0,
                            "border-color":"#376A19",
                            "border-width":2,
                            "border-radius":2
                        }
                    }
                ]
            }
        ]
    }
};

var tesla_chart_data = {
    "data": {
        "graphset":[
            {
                "background-color":"none",
                "type":"bar",
                "title":{
                    "text":"PRODUCTION REPORT",
                    "font-color":"#666666",
                    "background-color": "none",
                    "align": "left",
                    "x": "6%",
                    "y": "1%"
                },
                "plot":{
                    "value-box":{
                        "short":true,
                        "short-unit":"K",
                        "color": "#666666"
                    }
                },
                "scale-x":{
                    "values":["2010","2011","2012","2013","2014<br><b>Projected</b>"],
                    "item":{
                        "color": "#666666",
                    },
                    "guide":{
                        "visible":0
                    },
                    "line-color": "#DEDEDE",
                    "line-width": 1,
                    "tick":{
                        "visible": 0
                    }
                },
                "scale-y":{
                    "label":{
                        "text":"Units Produced",
                        "color": "#666666"
                    },
                    "item":{
                        "visible": 0
                    },
                    "line-color": "none",
                    "tick":{
                        "visible": 0
                    },
                    "guide":{
                        "line-color": "#DEDEDE",
                        "line-style": "solid"
                    }
                },
                "legend":{
                    "layout":"horizontal",
                    "item":{
                        "color":"#666666"
                    },
                    "marker":{
                        "border-color":"#fff",
                        "border-width":1
                    },
                    "background-color": "transparent",
                    "shadow": 0,
                    "border-color": "none",
                    "position": "5% 7%"
                },
                "series":[
                    {
                        "values":[28000,26000,19000,13000,13000],
                        "text":"Model A10",
                        "background-color": "#EC0C19 #910C11",
                        "rules":[
                            {
                                "rule":"%i == 4",
                                "background-image":"PATTERN_WEAVE",
                            }
                        ],
                        "tooltip":{
                            "text":"<b>%t</b><br>Production Year: <b>%k</b><br>Units Produced: <b>%v</b>",
                            "shadow":0,
                            "background-color": "#910C11 #EC0C19",
                            "text-align":"left",
                            "border-radius":2,
                            "border-width":1,
                            "border-color":"#fff"
                        }
                    },
                    {
                        "values":[8000,14000,24000,32000,35000],
                        "text":"Model A20",
                        "background-color": "#1A9AF3 #074780",
                        "rules":[
                            {
                                "rule":"%i == 4",
                                "background-image":"PATTERN_WEAVE",
                            }
                        ],
                        "tooltip":{
                            "text":"<b>%t</b><br>Production Year: <b>%k</b><br>Units Produced: <b>%v</b>",
                            "shadow":0,
                            "background-color": "#074780 #1A9AF3",
                            "text-align":"left",
                            "border-radius":2,
                            "border-width":1,
                            "border-color":"#fff"
                        }
                    }
                ]
            }
        ]
    }
};

var paypal_chart_data = {
    "data": {
        "graphset":[
            {
                "type":"bar",
                "background-color":"#199cde",
                "border-radius-top-left":"8px",
                "border-radius-top-right":"8px",
                "border-radius-bottom-left":"8px",
                "border-radius-bottom-right":"8px",
                "title":{
                    "text":"Production Report",
                    "height":"40px",
                    "background-color":"none",
                    "font-size":"22px",
                    "font-family":"Open Sans",
                    "font-color":"#fff",
                    "text-align":"center",
                    "border-radius-top-left":"10px",
                    "border-radius-top-right":"10px"
                },
                "plot":{
                    "border-radius-top-left":10,
                    "border-radius-top-right":10,
                    "line-width":"1px",
                    "hover-state":{
                        "alpha":1
                    }
                },
                "plotarea":{
                    "background-color":"#fff",
                    "margin":"70px 60px 80px 80px"
                },
                "scale-x":{
                    "values":["2010","2011","2012","2013","2014<br>(Projected)"],
                    "item":{
                        "font-color":"#fff"
                    },
                    "line-color":"#fff",
                    "line-width":"1px",
                    "tick":{
                        "line-width":0
                    },
                    "guide":{
                        "visible":false
                    }
                },
                "scale-y":{
                    "values":"0:40000:5000",
                    "max-labels":9,
                    "background-color":"#fff",
                    "label":{
                        "text":"Units",
                        "font-color":"#fff"
                    },
                    "multiplier":true,
                    "item":{
                        "rules":[
                            {
                            "rule":"%i%2==0",
                            "font-color":"#fff"
                            },
                            {
                            "rule":"%i%2==1",
                            "visible":false
                            }
                        ]
                    },
                    "line-color":"#fff",
                    "line-width":"1px",
                    "tick":{
                        "visible":false
                    },
                    "guide":{
                        "line-width":"1px",
                        "line-color":"#fff",
                        "line-style":"solid",
                        "items":[
                            {
                                "background-color":"#199CDE",
                                "alpha":1
                            },
                            {
                                "background-color":"#199CDE",
                                "alpha":0.9
                            }
                        ]
                    }
                },
                "legend":{
                    "layout":"h",
                    "y":"87%",
                    "x":"30%",
                    "background-color":"none",
                    "border-width":0,
                    "shadow":0,
                    "toggle-action":"remove",
                    "item":{
                        "font-color":"#fff"
                    },
                    "marker":{
                        "type":"circle",
                        "size":6,
                        "border-width":"1px",
                        "border-color":"#fff"
                    }
                },
                "series":[
                    {
                        "values":[28000,26000,19000,13000,13000],
                        "text":"Model A10",
                        "background-color":"#243b80",
                        "alpha":0.8,
                        "tooltip":{
                            "text":"<b>%t</b><br>Year: %k<br>Units: %v",
                            "background-color":"#243b80",
                            "font-color":"#f6fbfe",
                            "shadow":0,
                            "border-radius":10,
                            "text-align":"left",
                            "width":"20%"
                        },
                        "legend-marker":{
                            "alpha":0.6
                        }
                    },
                    {
                        "values":[8000,14000,24000,32000,35000],
                        "text":"Model A20",
                        "background-color":"#f6fbfe",
                        "alpha":0.8,
                        "tooltip":{
                            "text":"<b>%t</b><br>Year: %k<br>Units: %v",
                            "background-color":"#f6fbfe",
                            "font-color":"#243b80",
                            "shadow":0,
                            "border-radius":10,
                            "text-align":"left",
                            "width":"20%"
                        }
                    }
                ]
            }
        ]
    }
};

var nike_chart_data = {
    "data": {
    
        "graphset":[
            {
                "type":"bar",
                "background-color":"#898d95 #4f4f4f",
                "border-radius-top-left":13,
                "border-radius-top-right":13,
                "border-radius-bottom-right":10,
                "border-radius-bottom-left":10,
                "title":{
                    "text":"PRODUCTION REPORT.",
                    "text-align":"right",
                    "background-color":"#f7f7f7 #e3e3e9",
                    "font-family":"Passion One",
                    "font-size":"24px",
                    "font-color": "#4f4f4f",
                    "border-radius-top-left":10,
                    "border-radius-top-right":10
                },
                "plot":{
                    "border-radius-top-left":10,
                    "border-radius-top-right":10,
                    "value-box":{
                        "visible":true,
                        "font-color":"#fff",
                        "placement":"in",
                        "font-angle":-90,
                        "offset-y":"20px",
                        "font-size":"10px",
                        "font-weight":"normal"

                    }
                },
                "plotarea":{
                    "background-color":"#6c6e72",
                    "margin":"80px 60px 60px 80px"
                },
                "scale-x":{
                    "values":["2010","2011","2012","2013","2014<br>(PROJECTED)"],
                    "item":{
                        "font-color":"#fff"
                    },
                    "line-color":"#fff",
                    "line-width":"1px",
                    "tick":{
                        "visible":false
                    },
                    "guide":{
                        "line-width":"1px",
                        "line-color":"#fff",
                        "line-style":"solid",
                        "alpha":0.2
                    },
                    "markers":[
                        {
                            "type":"area",
                            "range":[4,5],
                            "background-color":"fff",
                            "alpha":0.3
                        }

                    ]
                },
                "scale-y":{
                    "label":{
                        "text":"UNITS",
                        "font-color":"#fff",
                        "offset-x":"-10px"
                    },
                    "multiplier":true,
                    "item":{
                        "font-color":"#fff"
                    },
                    "line-color":"#fff",
                    "line-width":"1px",
                    "tick":{
                        "visible":false
                    },
                    "guide":{
                        "line-width":"1px",
                        "line-color":"#fff",
                        "line-style":"solid",
                        "alpha":0.2
                    }
                },
                "legend":{
                    "layout":"h",
                    "background-color":"none",
                    "border-width":0,
                    "shadow":0,
                    "toggle-action":"remove",
                    "item":{
                        "font-color":"#fff",
                    },
                    "marker":{
                        "type":"circle",
                        "size":6,
                        "-border-width":"1px",
                        "-border-color":"#fff"
                    }
                },
                "series":[
                    {
                        "values":[28761,26340,19291,13856,13124],
                        "text":"MODEL A10",
                        "background-color":"#38353c",
                        "background-image":"images/black40.png",
                        "background-fit":"x"
                    },
                    {
                        "values":[8124,14298,24346,32282,35934],
                        "text":"MODEL A20",
                        "background-color":"#a50617",
                        "background-image":"images/red40.png",
                        "background-fit":"x"
                    }
                ]
            }
        ]
    }
};
