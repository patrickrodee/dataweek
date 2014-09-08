var CURRENCYJSON={
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
    };