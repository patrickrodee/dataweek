var RULE3JSON={
    "graphset":[
        {
            "type":"bar",
            "title":{
                "text":"Value Box Rules"
            },
            "plot":{
                "value-box":{
                    "placement":"top-in",
                    "shadow":"0",
                    "rules":[
                        {
                            "rule":"%v > 0",
                            "visible":"true",
                            "color":"#fff",
                            "background-color": "none"
                        },
                        {
                            "rule":"%v < 0",
                            "visible":"true",
                            "color":"#fff",
                            "background-color":"#cc3300",
                            "border-radius":"4px"
                            
                        }
                    ]
                }
            },
            "series":[
                {
                    "values":[50,-24,68,98,-35],
                    "background-color":"#85bdcd"
                }
            ]
        }
    ]
};