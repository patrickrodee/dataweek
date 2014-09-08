zingchart.shape_click = function(e) {
    console.log(e);
    zingchart.exec(e.id, 'modify', {
            object:"plot",
            data : {
                "aspect": e.shapeid
            }
        });
    if(e.shapeid=="radarline"){
        zingchart.exec(e.id,'modify',{
            object:'plot',
            data:{
                'aspect':'line'
            }
        });
        zingchart.exec(e.id,'setseriesdata',{
            data : [
            {
             
                "values": [
                        5,
                        10,
                        15,
                        5,
                        10,
                        5
                    ]
            },
            {
          
                "values": [
                        2,
                        4,
                        6,
                        8,
                        10,
                        12
                    ]
            }
            ]
        });
    }
    if(e.shapeid=="radararea"){
        zingchart.exec(e.id,'modify',{
            object:'plot',
            data:{
                'aspect':'area'
            }
        });
        zingchart.exec(e.id,'setseriesdata',{
            data : [
            {
               
                "values": [
                        5,
                        10,
                        15,
                        5,
                        10,
                        5
                    ]
            },
            {
              
                "values": [
                        2,
                        4,
                        6,
                        8,
                        10,
                        12
                    ]
            }
            ]
        });
    }
    if(e.shapeid=="radarrose"){
        zingchart.exec(e.id,'modify',{
            object:'plot',
            data:{
                'aspect':'rose'
            }
        });
        zingchart.exec(e.id,'setseriesdata',{
            data : [
            {
              
                "values": [
                        5,
                        10,
                        15,
                        5,
                        10,
                        5
                    ]
            },
            {
           
                "values": [
                        2,
                        4,
                        6,
                        8,
                        10,
                        12
                    ]
            }
            ]
        });
    }
    if(e.shapeid=="radardots"){
        zingchart.exec(e.id,'modify',{
            object:'plot',
            data:{
                'aspect':'dots'
            }
        });
        zingchart.exec(e.id,'setseriesdata',{
            data : [
            {                
                "values": [
                        5,
                        10,
                        15,
                        5,
                        10,
                        5
                    ]
            },
            {
                "values": [
                        2,
                        4,
                        6,
                        8,
                        10,
                        12
                    ]
            }
            ]
        });
    }
    if(e.shapeid=="3d")
        zingchart.exec(e.id, 'toggledimension',{graphid:e.graphid});
    if(e.shapeid=="piestandard"){
        zingchart.exec(e.id,'setseriesvalues',{
            values:[
                [5],
                [2],
                [7],
                [10]
            ]
        });
        zingchart.exec(e.id, 'modify', {
            data : {
                "type":"pie",
                "plot":{
                    "slice": 0
                }
            }
        });
    }
     if(e.shapeid=="piedonut"){
        zingchart.exec(e.id,'modify',{
            update:0,
            data : {
                "type":"pie",
                "plot":{
                    "slice": 50
                }
            }
        });
        zingchart.exec(e.id,'setseriesvalues',{
            update:0,
            values:[
                [5],
                [2],
                [7],
                [10]
            ]
        });
        zingchart.exec(e.id,'update');
    }
     if(e.shapeid=="pienested"){
        zingchart.exec(e.id,'setseriesvalues',{
            update:0,
            values:[
                [5,6,3,8],
                [8,3,5,1],
                [7,10,3,6],
                [3,9,9,5]
            ]
        });
        zingchart.exec(e.id, 'modify', {
            update:0,
            data : {
                "type": "nestedpie",
                "plot":{
                    "value-box":{
                        "visible":false
                    }
                }
            }
        });
        zingchart.exec(e.id, 'update');
    }
    if (e.shapeid=="radarmixed") {
        zingchart.exec(e.id, 'setseriesdata', {
            data : [
                {
                    "aspect":"dots",
                    "values": [
                        5,
                        10,
                        15,
                        5,
                        10,
                        5
                    ]
                },
                {
                    "aspect":"line",
                    "values": [
                        2,
                        4,
                        6,
                        8,
                        10,
                        12
                    ]
                }
            ]
        });
    }
};8