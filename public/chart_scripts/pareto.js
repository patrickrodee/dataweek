var PARETOJSON={
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
};