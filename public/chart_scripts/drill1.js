var DRILLDOWN1JSON = {
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
                    "url":"./charts/drilldown/Dev.txt",
                    "target":"graph=d1"
                },
                {
                    "text":"Security Tools",
                    "values":[10],
                    "url":"./charts/drilldown/Security.txt",
                    "target":"graph=d1"
                },
                {
                    "text":"Data Management",
                    "values":[25],
                    "url":"./charts/drilldown/Data.txt",
                    "target":"graph=d1"
                },
                {
                    "text":"Visualization Tools",
                    "values":[20],
                    "url":"./charts/drilldown/Visualization.txt",
                    "target":"graph=d1"
                },
                {
                    "text":"Site Performance",
                    "values":[25],
                    "url":"./charts/drilldown/Site.txt",
                    "target":"graph=d1"
                }
            ],
            "tooltip":{
                "text":"%v %",
                "shadow":false
            }
        }
    ]
};