var autodesk_chart_data = {
    "data": {
"graphset":[
    {
        "background-color": "#f5f5f5",  
        "alpha": 0.3,
        "type":"bar",
        "title":{
            "font-family": "Istok Web",
            "text":"Production Report",
            "background-image":"../images/autoGray.png",
            "background-repeat": "no-repeat",
            "background-position": "50% 0%",
            "background-alpha": 0.2,
            "color": "#5E5E5E"
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
                "alpha": 0.9
            },
            {
                "values":[8000,14000,24000,32000,35000],
                "text":"Model A20",
                "gradient-colors": "#376A19 #9EEE8D #4A7E38 #578D43 #20470D",
                "gradient-stops":"0.05 0.1 0.5 0.85 0.95",
                "fill-angle": 0,
                "alpha": 0.9
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
                    "text":"Production Report",
                    "color":"#666666",
                    "font-family": "Muli",
                    "background-color": "none",
                    "align": "left",
                    "x": "6%",
                    "y": "1%"
                },
                "plot":{
                    "value-box":{
                        "short":true,
                        "short-unit":"K",
                        "font-family":"Muli",
                        "color": "#666666"
                    }
                },
                "scale-x":{
                    "values":["2010","2011","2012","2013","2014<br>(Projected)"],
                    "item":{
                        "color": "#666666",
                        "font-family": "Muli"
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
                        "font-family": "Muli",
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
                        "font-family": "Muli",
                        "color":"#666666"
                    },
                    "background-color": "transparent",
                    "shadow": 0,
                    "border-color": "none",
                    "position": "5% 6%"
                },
                "series":[
                    {
                        "values":[28000,26000,19000,13000,13000],
                        "text":"Model A10",
                        "background-color": "#EC0C19 #910C11"
                    },
                    {
                        "values":[8000,14000,24000,32000,35000],
                        "text":"Model A20",
                        "background-color": "#1A9AF3 #074780"
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
                "title":{
                    "text":"Production Report",
                    "background-color":"#199cde",
                    "font-family":"Open Sans",
                    "font-size":"24px",
                    "offset-y":"5px"
                },
                "plot":{
                    "border-radius-top-left":10,
                    "border-radius-top-right":10,
                    "line-width":"1px"
                },
                "plotarea":{
                    "background-color":"#199cde",
                    "margin":"70px 60px 90px 80px"
                },
                "scale-x":{
                    "values":["2010","2011","2012","2013","2014<br>(Projected)"],
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
                "scale-y":{
                    "label":{
                        "text":"Units",
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
                    "y":"82%",
                    "x":"30%",
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
                        "values":[28000,26000,19000,13000,13000],
                        "text":"Model A10",
                        "background-color":"#243b80",
                        "alpha":0.6,
                        "legend-marker":{
                            "alpha":0.6
                        }
                    },
                    {
                        "values":[8000,14000,24000,32000,35000],
                        "text":"Model A20",
                        "background-color":"#f6fbfe",
                        "tooltip":{
                            "font-color":"#243b80"
                        }
                    }
                ]
            }
        ]
    }
};