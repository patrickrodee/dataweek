var chartObjs=[LINEJSON, BARJSON, AREAJSON, PIEJSON, SCATTERJSON, RADARJSON, STOCKJSON, BUBBLEJSON, PIANOJSON, BULLETJSON, GAUGEJSON, FUNNELJSON, VENNJSON, PARETOJSON, MIXED, GRIDJSON, MAPJSON, CHORDJSON, RANKFLOWJSON, TREEMAPJSON, WORDCLOUDJSON, NETWORKJSON, RULE1JSON, CURRENCYJSON, PATTERNSJSON, ARROWSJSON, IMAGESJSON, SHAPESJSON, BARSTACKEDJSON, AREASTACKEDJSON, DRILLDOWN1JSON, DRILLDOWN2JSON, BIGCHART, TOOLTIPS, ZOOMING, SHARED, ANIMJSON];

var chartDivs=['line_chart', 'bar_chart', 'area_chart', 'pie_chart', 'scatter_chart', 'radar_chart', 'stock_chart', 'bubble_chart', 'piano_chart', 'bullet_chart', 'gauge_chart', 'funnel_chart', 'venn_chart', 'pareto_chart', 'mixed', 'grid_chart', 'map_chart', 'chord_chart', 'rankflow_chart', 'treemap_chart', 'wordcloud_chart', 'network_chart', 'rule1_chart', 'currency_chart', 'pattern_chart', 'arrows_chart', 'images_chart', 'shapes_chart', 'bar_stacked', 'area_stacked', 'drill_down1', 'drill_down2', 'bigchart', 'tooltips', 'zooming', 'shared', 'anim_chart'];

var markerType=['circle','triangle','square','diamond','trapezoid','rectangle','parallelogram','plus','cross','star5','rpoly5','gear5','ellipse','pie'];
var markerNum=1;
var numChartsRendered=0;
zingchart.load=function(){
    numChartsRendered++;
    console.log(numChartsRendered);
};

function renderCharts(){
    if(kstheme==kstheme1){
        GRIDJSON=GRIDJSON;
        CHORDJSON.graphset[0].series[0]['background-color']="#40beed";
        CHORDJSON.graphset[0].series[1]['background-color']="#305f74";
        CHORDJSON.graphset[0].series[2]['background-color']="#4492a8";
        CHORDJSON.graphset[0].series[3]['background-color']="#8e8e8e";
        CHORDJSON.graphset[0].options.style.item.color="black";
        CHORDJSON.graphset[0].options.style.label.color="black";
        CHORDJSON.graphset[0].options.style.tick.color="black";
        RANKFLOWJSON.graphset[0].options.palette=["#40beeb","#305f74","#4492a8","#8e8e8e","#dddddd","#83deff","#086893","#85bdcd"];
        RANKFLOWJSON.graphset[0]['scale-x'].item.color="black";
        for(var n=0;n<RANKFLOWJSON.graphset[0].series.length;n++){
            RANKFLOWJSON.graphset[0].series[n]['background-color']=RANKFLOWJSON.graphset[0].options.palette[n];
        }
        TREEMAPJSON.graphset[0].options.palette=["#40beeb","#305f74","#4492a8","#8e8e8e","#dddddd","#83deff","#086893","#85bdcd"];
        WORDCLOUDJSON.graphset[0].options.palette=["#40beeb","#305f74","#4492a8","#8e8e8e","#dddddd","#83deff","#086893","#85bdcd"];
    }

    if(kstheme==kstheme2){
        GRIDJSON=GRID2JSON;
        CHORDJSON.graphset[0].series[0]['background-color']="#196eed";
        CHORDJSON.graphset[0].series[1]['background-color']="#d94530";
        CHORDJSON.graphset[0].series[2]['background-color']="#fdb82b";
        CHORDJSON.graphset[0].series[3]['background-color']="#159755";
        CHORDJSON.graphset[0].options.style.item.color="black";
        CHORDJSON.graphset[0].options.style.label.color="black";
        CHORDJSON.graphset[0].options.style.tick.color="black";
        RANKFLOWJSON.graphset[0].options.palette=["#196eed","#d94530","#fdb82b","#159755","#8e8e8e","#a6c7f8","#f0b7af","#fee3ad","#a4d7bd"];
        RANKFLOWJSON.graphset[0]['scale-x'].item.color="black";
        for(var n=0;n<RANKFLOWJSON.graphset[0].series.length;n++){
            RANKFLOWJSON.graphset[0].series[n]['background-color']=RANKFLOWJSON.graphset[0].options.palette[n];
        }
        TREEMAPJSON.graphset[0].options.palette=["#196eed","#d94530","#fdb82b","#159755","#8e8e8e","#a6c7f8","#f0b7af","#fee3ad","#a4d7bd"];
        WORDCLOUDJSON.graphset[0].options.palette=["#196eed","#d94530","#fdb82b","#159755","#8e8e8e","#a6c7f8","#f0b7af","#fee3ad","#a4d7bd"];
    }

    if(kstheme==kstheme3){
        GRIDJSON=GRID3JSON;
        CHORDJSON.graphset[0].series[0]['background-color']="#808080";
        CHORDJSON.graphset[0].series[1]['background-color']="#40668c";
        CHORDJSON.graphset[0].series[2]['background-color']="#ffcc00";
        CHORDJSON.graphset[0].series[3]['background-color']="#bfbfbf";
        CHORDJSON.graphset[0].options.style.item.color="white";
        CHORDJSON.graphset[0].options.style.label.color="white";
        CHORDJSON.graphset[0].options.style.tick.color="white";
        RANKFLOWJSON.graphset[0].options.palette=["#808080","#40668c","#ffcc00","#bfbfbf","#8099b3","#dddddd","#bfccd9","#fff2bf"];
        RANKFLOWJSON.graphset[0]['scale-x'].item.color="white";
        for(var n=0;n<RANKFLOWJSON.graphset[0].series.length;n++){
            RANKFLOWJSON.graphset[0].series[n]['background-color']=RANKFLOWJSON.graphset[0].options.palette[n];
        }
        TREEMAPJSON.graphset[0].options.palette=["#808080","#40668c","#ffcc00","#bfbfbf","#8099b3","#dddddd","#bfccd9","#fff2bf"];
        WORDCLOUDJSON.graphset[0].options.palette=["#808080","#40668c","#ffcc00","#bfbfbf","#8099b3","#dddddd","#bfccd9","#fff2bf"];
    }

    $('#line_chart').waypoint(function() {
        zingchart.render({
            id : "line_chart",
            height:275, //4 rows
            width : 360,
            data : LINEJSON,
            defaults:kstheme
          });
        zingchart.render({
                id : "bar_chart",
                height:275, //4 rows
                width : 360,
                data : BARJSON,
                defaults:kstheme        
            });
        zingchart.render({
                id : "area_chart",
                height:275, //4 rows
                width : 360,
                data : AREAJSON,
                defaults:kstheme        
            });
    }, { offset: '100%',triggerOnce:true });

    $('#line_chart').waypoint(function() {
        zingchart.render({
            id : "pie_chart",
            height:275, //4 rows
            width : 360,
            data : PIEJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "scatter_chart",
            height:275, //4 rows
            width : 360,
            data : SCATTERJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "radar_chart",
            height:275, //4 rows
            width : 360,
            data : RADARJSON,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#stock_chart').waypoint(function() {
      zingchart.render({
            id : "stock_chart",
            height:275, //4 rows
            width : 360,
            data : STOCKJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "bubble_chart",
            height:275, //4 rows
            width : 360,
            data : BUBBLEJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "piano_chart",
            height:275, //4 rows
            width : 360,
            data : PIANOJSON,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#bullet_chart').waypoint(function() {
      zingchart.render({
            id : "bullet_chart",
            height:275, //4 rows
            width : 360,
            data : BULLETJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "gauge_chart",
            height:275, //4 rows
            width : 360,
            data : GAUGEJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "funnel_chart",
            height:275, //4 rows
            width : 360,
            data : FUNNELJSON,
            defaults:kstheme        
        });

    }, { offset: '100%',triggerOnce:true });

    $('#venn_chart').waypoint(function() {
        zingchart.render({
            id : "venn_chart",
            height:275, //4 rows
            width : 360,
            data : VENNJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "pareto_chart",
            height:275, //4 rows
            width : 360,
            data : PARETOJSON,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#mixed').waypoint(function() {
          zingchart.render({
          id : "mixed",
          width : '100%',
          height : "500",
          output : "svg",
          data : MIXED,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#grid_chart').waypoint(function() {
      zingchart.render({
            id : "grid_chart",
            height:275, //4 rows
            width : 360,
            data : GRIDJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "map_chart",
            height:275, //4 rows
            width : 360,
            data : MAPJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "chord_chart",
            height:275, //4 rows
            width : '100%',
            data : CHORDJSON,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#rankflow_chart').waypoint(function() {
      
        zingchart.render({
            id : "rankflow_chart",
            height:275, //4 rows
            width : 360,
            data : RANKFLOWJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "treemap_chart",
            height:275, //4 rows
            width : 360,
            data : TREEMAPJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "wordcloud_chart",
            height:275, //4 rows
            width : 360,
            data : WORDCLOUDJSON,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#network_chart').waypoint(function(){
        zingchart.render({
              id : "network_chart",
                width : '100%',
              height : "400",
              output : "svg",
              data : NETWORKJSON,
                defaults:kstheme        
            });
    }, { offset: '100%',triggerOnce:true });

    $('#rule1_chart').waypoint(function() {
      zingchart.render({
            id : "rule1_chart",
            height:275, //4 rows
            width : 360,
            data : RULE1JSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "currency_chart",
            height:275, //4 rows
            width : 360,
            data : CURRENCYJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "pattern_chart",
            height:275, //4 rows
            width : 360,
            data : PATTERNSJSON,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#arrows_chart').waypoint(function() {
      zingchart.render({
            id : "arrows_chart",
            height:275, //4 rows
            width : 360,
            data : ARROWSJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "images_chart",
            height:275, //4 rows
            width : 360,
            data : IMAGESJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "shapes_chart",
            height:275, //4 rows
            width : 360,
            data : SHAPESJSON,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#bar_stacked').waypoint(function() {
      zingchart.render({
            id : "bar_stacked",
            height:412, //4 rows
            width : 540,
            data : BARSTACKEDJSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "area_stacked",
            height:412, //4 rows
            width : 540,
            data : AREASTACKEDJSON,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#drill_down1').waypoint(function() {
      zingchart.render({
            id : "drill_down1",
            height:412, 
            width : 540,
            data : DRILLDOWN1JSON,
            defaults:kstheme        
        });
        zingchart.render({
            id : "drill_down2",
            height:412, 
            width : 540,
            data : DRILLDOWN2JSON,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#bigchart').waypoint(function() {
          zingchart.render({
          id : "bigchart",
            width : '100%',
          height : "750",
          output : "svg",
          data : BIGCHART,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#tooltips').waypoint(function() {
         zingchart.render({
      id : "tooltips",
        width : '100%',
      height : "400",
      output : "svg",
      data : TOOLTIPS,
        defaults:kstheme        
    });
    }, { offset: '100%',triggerOnce:true });

    $('#zooming').waypoint(function() {
        zingchart.render({
          id : "zooming",
            width : '100%',
          height : "400",
          output : "svg",
          data : ZOOMING,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#shared').waypoint(function() {
            zingchart.render({
          id : "shared",
            width : '100%',
          height : "600",
          output : "svg",
          data : SHARED,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });

    $('#anim_chart').waypoint(function() {
            zingchart.render({
          id : "anim_chart",
            width : '100%',
          height : "400",
          output : "svg",
          data : ANIMJSON,
            defaults:kstheme        
        });
    }, { offset: '100%',triggerOnce:true });
}
function bgColor(themeNo,chart){
    if(themeNo==1)
        chart.graphset[0]['background-color']="white";   
    if(themeNo==2)
        chart.graphset[0]['background-color']="#f9f9f9";  
    if(themeNo==3)
        chart.graphset[0]['background-color']="#000000";
}
function destroyCharts(themeNo){  

if (numChartsRendered>=1){
    LINEJSON=zingchart.exec('line_chart', 'getdata');
    bgColor(themeNo,LINEJSON);
}
if (numChartsRendered>=2){
    BARJSON=zingchart.exec('bar_chart', 'getdata');
    bgColor(themeNo,BARJSON);
}
if (numChartsRendered>=3){
    AREAJSON=zingchart.exec('area_chart', 'getdata');
    bgColor(themeNo,AREAJSON);
}
if (numChartsRendered>=4){
    PIEJSON=zingchart.exec('pie_chart', 'getdata');
    bgColor(themeNo,PIEJSON);
}
if (numChartsRendered>=5){
    SCATTERJSON=zingchart.exec('scatter_chart', 'getdata');
    bgColor(themeNo,SCATTERJSON);
}
if (numChartsRendered>=6){
    RADARJSON=zingchart.exec('radar_chart', 'getdata');
    bgColor(themeNo,RADARJSON);
}
if (numChartsRendered>=7){
    STOCKJSON=zingchart.exec('stock_chart', 'getdata');
    bgColor(themeNo,STOCKJSON);
}
if (numChartsRendered>=8){
    BUBBLEJSON=zingchart.exec('bubble_chart', 'getdata');
    bgColor(themeNo,BUBBLEJSON);
}
if (numChartsRendered>=9){
    PIANOJSON=zingchart.exec('piano_chart', 'getdata');
    bgColor(themeNo,PIANOJSON);
}
if (numChartsRendered>=10){
    BULLETJSON=zingchart.exec('bullet_chart', 'getdata');
    bgColor(themeNo,BULLETJSON);
}
if (numChartsRendered>=11){
    GAUGEJSON=zingchart.exec('gauge_chart', 'getdata');
    bgColor(themeNo,GAUGEJSON);
}
if (numChartsRendered>=12){
    FUNNELJSON=zingchart.exec('funnel_chart', 'getdata');
    bgColor(themeNo,FUNNELJSON);
}
if (numChartsRendered>=13){
    VENNJSON=zingchart.exec('venn_chart', 'getdata');
    bgColor(themeNo,VENNJSON);
}
if (numChartsRendered>=14){
    PARETOJSON=zingchart.exec('pareto_chart', 'getdata');
    bgColor(themeNo,PARETOJSON);
}
if (numChartsRendered>=15){
    MIXED=zingchart.exec('mixed', 'getdata');
    bgColor(themeNo,MIXED);
}
if (numChartsRendered>=16){
    GRIDJSON=zingchart.exec('grid_chart', 'getdata');
    bgColor(themeNo,GRIDJSON);
}
if (numChartsRendered>=17){
    MAPJSON=zingchart.exec('map_chart', 'getdata');
    bgColor(themeNo,MAPJSON);
}
if (numChartsRendered>=18){
    CHORDJSON=zingchart.exec('chord_chart', 'getdata');
    bgColor(themeNo,CHORDJSON);
}
if (numChartsRendered>=19){
    RANKFLOWJSON=zingchart.exec('rankflow_chart', 'getdata');
    bgColor(themeNo,RANKFLOWJSON);
}
if (numChartsRendered>=20){
    TREEMAPJSON=zingchart.exec('treemap_chart', 'getdata');
    bgColor(themeNo,TREEMAPJSON);
}
if (numChartsRendered>=21){
    WORDCLOUDJSON=zingchart.exec('wordcloud_chart', 'getdata');
    bgColor(themeNo,WORDCLOUDJSON);
}
if (numChartsRendered>=22){
    NETWORKJSON=zingchart.exec('network_chart', 'getdata');
    bgColor(themeNo,NETWORKJSON);
}
if (numChartsRendered>=23){
    BARSTACKEDJSON=zingchart.exec('bar_stacked', 'getdata');
    bgColor(themeNo,BARSTACKEDJSON);
}
if (numChartsRendered>=24){
    AREASTACKEDJSON=zingchart.exec('area_stacked', 'getdata');
    bgColor(themeNo,AREASTACKEDJSON);
}
if (numChartsRendered>=25){
    RULE1JSON=zingchart.exec('rule1_chart', 'getdata');
    bgColor(themeNo,RULE1JSON);
}
if (numChartsRendered>=26){
    CURRENCYJSON=zingchart.exec('currency_chart', 'getdata');
    bgColor(themeNo,CURRENCYJSON);
}
if (numChartsRendered>=27){
    PATTERNSJSON=zingchart.exec('pattern_chart', 'getdata');
    bgColor(themeNo,PATTERNSJSON);
}
if (numChartsRendered>=28){
    ARROWSJSON=zingchart.exec('arrows_chart', 'getdata');
    bgColor(themeNo,ARROWSJSON);
}
if (numChartsRendered>=29){
    IMAGESJSON=zingchart.exec('images_chart', 'getdata');
    bgColor(themeNo,IMAGESJSON);
}
if (numChartsRendered>=30){
    SHAPESJSON=zingchart.exec('shapes_chart', 'getdata');
    bgColor(themeNo,SHAPESJSON);
}
if (numChartsRendered>=31){
    SHARED=zingchart.exec('shared', 'getdata');
    bgColor(themeNo,SHARED);
}
if (numChartsRendered>=32){
    DRILLDOWN1JSON=zingchart.exec('drill_down1', 'getdata');
    bgColor(themeNo,DRILLDOWN1JSON);
}
if (numChartsRendered>=33){
    DRILLDOWN2JSON=zingchart.exec('drill_down2', 'getdata');
    bgColor(themeNo,DRILLDOWN2JSON);
}
if (numChartsRendered>=34){
    BIGCHART=zingchart.exec('bigchart', 'getdata');
    bgColor(themeNo,BIGCHART);
}
if (numChartsRendered>=35){
    TOOLTIPS=zingchart.exec('tooltips', 'getdata');
    bgColor(themeNo,TOOLTIPS);
}
if (numChartsRendered>=36){
    ZOOMING=zingchart.exec('zooming', 'getdata');
    bgColor(themeNo,ZOOMING);
}
if (numChartsRendered>=37){
    ANIMJSON=zingchart.exec('anim_chart', 'getdata');
    bgColor(themeNo,ANIMJSON);
}
numChartsRendered=0;
    for(var n=0;n<numChartsRendered;n++){
        zingchart.exec(chartDivs[n],'destroy');
    }


    /*
    

    zingchart.exec('line_chart','destroy');
    zingchart.exec('bar_chart','destroy');
    zingchart.exec('area_chart','destroy');
    zingchart.exec('pie_chart','destroy');
    zingchart.exec('scatter_chart','destroy');
    zingchart.exec('radar_chart','destroy');
    zingchart.exec('stock_chart','destroy');
    zingchart.exec('bubble_chart','destroy');
    zingchart.exec('piano_chart','destroy');
    zingchart.exec('bullet_chart','destroy');
    zingchart.exec('gauge_chart','destroy');
    zingchart.exec('funnel_chart','destroy');
    zingchart.exec('venn_chart','destroy');
    zingchart.exec('pareto_chart','destroy');
    zingchart.exec('mixed','destroy');
    zingchart.exec('grid_chart','destroy');
    zingchart.exec('map_chart','destroy');
    zingchart.exec('chord_chart','destroy');
    zingchart.exec('rankflow_chart','destroy');
    zingchart.exec('treemap_chart','destroy');
    zingchart.exec('wordcloud_chart','destroy');
    zingchart.exec('network_chart','destroy');
    zingchart.exec('rule1_chart','destroy');
    zingchart.exec('currency_chart','destroy');
    zingchart.exec('pattern_chart','destroy');
    zingchart.exec('arrows_chart','destroy');
    zingchart.exec('images_chart','destroy');
    zingchart.exec('shapes_chart','destroy');
    zingchart.exec('bar_stacked','destroy');
    zingchart.exec('area_stacked','destroy');
    zingchart.exec('drill_down1','destroy');
    zingchart.exec('drill_down2','destroy');
    zingchart.exec('bigchart','destroy');
    zingchart.exec('tooltips','destroy');
    zingchart.exec('zooming','destroy');
    zingchart.exec('shared','destroy');
    zingchart.exec('anim_chart','destroy');*/
};

function toggleClass(p){
    p.parent().children('.active').removeClass('active');
    p.toggleClass("active");
};

document.ready=function(){

    zingchart.loadModules('patterns');

//$(this).scrollTop(0);

var sharedLegend=0;
var previewBool=0;
var zoomSnapBool=1;
var scrollBool=0;
var legendItemBool=0,xAxisItemBool=0,yAxisItemBool=0,stickyBool=0,htmlModeBool=0,pie3dBool=0,funnelOrientation=0,bar3dBool=0;

renderCharts();

$('#lineInfo').popover({
  trigger: 'focus',
  html:true
});
$('#barInfo').popover({
  trigger: 'focus',
  html:true
});
$('#areaInfo').popover({
  trigger: 'focus',
  html:true
});
$('#pieInfo').popover({
  trigger: 'focus',
  html:true
});
$('#scatterInfo').popover({
  trigger: 'focus',
  html:true
});
$('#radarInfo').popover({
  trigger: 'focus',
  html:true
});
$('#stockInfo').popover({
  trigger: 'focus',
  html:true
});
$('#bubbleInfo').popover({
  trigger: 'focus',
  html:true
});
$('#pianoInfo').popover({
  trigger: 'focus',
  html:true
});
$('#bulletInfo').popover({
  trigger: 'focus',
  html:true
});
$('#gaugeInfo').popover({
  trigger: 'focus',
  html:true
});
$('#funnelInfo').popover({
  trigger: 'focus',
  html:true
});
$('#vennInfo').popover({
  trigger: 'focus',
  html:true
});
$('#paretoInfo').popover({
  trigger: 'focus',
  html:true
});
$('#mixedInfo').popover({
  trigger: 'focus',
  html:true
});
$('#gridInfo').popover({
  trigger: 'focus',
  html:true
});
$('#mapInfo').popover({
  trigger: 'focus',
  html:true
});
$('#chordInfo').popover({
  trigger: 'focus',
  html:true
});
$('#rankflowInfo').popover({
  trigger: 'focus',
  html:true
});
$('#treemapInfo').popover({
  trigger: 'focus',
  html:true
});
$('#wordcloudInfo').popover({
  trigger: 'focus',
  html:true
});
$('#networkInfo').popover({
  trigger: 'focus',
  html:true
});
$('#barRulesInfo').popover({
  trigger: 'focus',
  html:true
});
$('#currencyInfo').popover({
  trigger: 'focus',
  html:true
});
$('#arrowsInfo').popover({
  trigger: 'focus',
  html:true
});
$('#imagesInfo').popover({
  trigger: 'focus',
  html:true
});
$('#shapesInfo').popover({
  trigger: 'focus',
  html:true
});
$('#barStackInfo').popover({
  trigger: 'focus',
  html:true
});
$('#areaStackInfo').popover({
  trigger: 'focus',
  html:true
});
$('#drill1Info').popover({
  trigger: 'focus',
  html:true
});
$('#drill2Info').popover({
  trigger: 'focus',
  html:true
});
$('#bigInfo').popover({
  trigger: 'focus',
  html:true
});
$('#tooltipsInfo').popover({
  trigger: 'focus',
  html:true
});
$('#zoomingInfo').popover({
  trigger: 'focus',
  html:true
});
$('#sharedInfo').popover({
  trigger: 'focus',
  html:true
});
$('#animInfo').popover({
  trigger: 'focus',
  html:true
});
$('#patternInfo').popover({
  trigger: 'focus',
  html:true
});



$('#line1').click(function () {
    toggleClass($(this));
    zingchart.exec('line_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'segmented'
            }
        });
});

$('#line2').click(function () {
    toggleClass($(this));
    zingchart.exec('line_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'spline'
            }
        });
});

$('#line3').click(function () {
    toggleClass($(this));
    zingchart.exec('line_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'stepped'
            }
        });
});

$('#line4').click(function () {
    toggleClass($(this));
    zingchart.exec('line_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'jumped'
            }
        });
});

$('#line5').click(function () {
    zingchart.exec('line_chart', 'toggledimension');
});

$('#bar1').click(function () {
    toggleClass($(this));
    zingchart.exec('bar_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'standard'
            }
        });
});

$('#bar2').click(function () {
    toggleClass($(this));
    if(bar3dBool===0){
        $('#bar3d').parent().addClass('active');
        $('#bar2d').parent().removeClass('active');
        zingchart.exec('bar_chart', 'modify', {
            update:0,
                data : {
                    "type":"bar3d",
                    "plot":{
                        "aspect": 'cylinder'
                    }
                }
            });
        bar3dBool=1;
    } else{
        zingchart.exec('bar_chart','modify',{
            update:0,
            data:{
                "plot":{
                    "aspect":"cylinder"
                }
            }
        });
    }
    zingchart.exec('bar_chart','update');
});

$('#bar3').click(function () {
    toggleClass($(this));
    zingchart.exec('bar_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'cone'
            }
        });
});

$('#bar4').click(function () {
    toggleClass($(this));
    if(bar3dBool===0){
        $('#bar3d').parent().addClass('active');
        $('#bar2d').parent().removeClass('active');
        zingchart.exec('bar_chart', 'modify', {
            update:0,
                data : {
                    "type":"bar3d",
                    "plot":{
                        "aspect": 'pyramid'
                    }
                }
            });
        bar3dBool=1;
    } else{
        zingchart.exec('bar_chart','modify',{
            update:0,
            data:{
                "plot":{
                    "aspect":"pyramid"
                }
            }
        });
    }
    zingchart.exec('bar_chart','update');
});

$(document).on('change', 'input:radio[id^="bar3d"]', function (event) {
        toggleClass($(this));
        bar3dBool=1;
        zingchart.exec('bar_chart','modify',{
            data:{
                "type":"bar3d"
            }
        });
        zingchart.exec('bar_chart','update');
});

$(document).on('change', 'input:radio[id^="bar2d"]', function (event) {
        toggleClass($(this));
        bar3dBool=0;
        zingchart.exec('bar_chart','modify',{
            data:{
                "type":"bar"
            }
        });
        zingchart.exec('bar_chart','update');
});

$('#area1').click(function () {
    toggleClass($(this));
    zingchart.exec('area_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'standard'
            }
        });
});

$('#area2').click(function () {
    toggleClass($(this));
    zingchart.exec('area_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'spline'
            }
        });
});

$('#area3').click(function () {
    toggleClass($(this));
    zingchart.exec('area_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'stepped'
            }
        });
});

$('#area4').click(function () {
    zingchart.exec('area_chart', 'toggledimension');
});

$('#scatter1').click(function () {
    zingchart.exec('scatter_chart', 'modify',{
        data:{
            "plot":{
                "marker":{
                    "type":markerType[markerNum],
                    "shadow":0
                }
            }
        }
    });
    markerNum++;
    if (markerNum==markerType.length-1)
        markerNum=0;
});

$('#pie1').click(function () {
    toggleClass($(this));
    if(pie3dBool==1){
        zingchart.exec('pie_chart','setseriesvalues',{
                values:[
                    [5],
                    [2],
                    [7],
                    [10]
                ]
            });
            zingchart.exec('pie_chart', 'modify', {
                data : {
                    "type":"pie3d",
                    "plot":{
                        "slice": 0
                    }
                }
            });
    } else {
        zingchart.exec('pie_chart','setseriesvalues',{
                values:[
                    [5],
                    [2],
                    [7],
                    [10]
                ]
            });
            zingchart.exec('pie_chart', 'modify', {
                data : {
                    "type":"pie",
                    "plot":{
                        "slice": 0
                    }
                }
            });
    }
});

$('#pie2').click(function () {
    toggleClass($(this));
    if (pie3dBool==1){
        zingchart.exec('pie_chart','modify',{
                update:0,
                data : {
                    "type":"pie3d",
                    "plot":{
                        "slice": 50
                    }
                }
            });
            zingchart.exec('pie_chart','setseriesvalues',{
                update:0,
                values:[
                    [5],
                    [2],
                    [7],
                    [10]
                ]
            });
            zingchart.exec('pie_chart','update');
        } else{
            zingchart.exec('pie_chart','setseriesvalues',{
                update:0,
                values:[
                    [5],
                    [2],
                    [7],
                    [10]
                ]
            });
            zingchart.exec('pie_chart', 'modify', {
                update:0,
                data : {
                    "type":"pie",
                    "plot":{
                        "slice": 50
                    }
                }
            });
            zingchart.exec('pie_chart','update');
        }
});

$('#pie3').click(function () {
    toggleClass($(this));
    zingchart.exec('pie_chart','setseriesvalues',{
            update:0,
            values:[
                [5,6,3,8],
                [8,3,5,1],
                [7,10,3,6],
                [3,9,9,5]
            ]
        });
        zingchart.exec('pie_chart', 'modify', {
            update:0,
            data : {
                "type": "nestedpie",
                "plot":{
                    "slice":0,
                    "value-box":{
                        "visible":false
                    }
                }
            }
        });
        zingchart.exec('pie_chart', 'update');
});

$('#pie4').click(function () {
    zingchart.exec('pie_chart', 'toggledimension');
    pie3dBool=!pie3dBool;
});

$('#radar1').click(function () {
    toggleClass($(this));
    zingchart.exec('radar_chart','modify',{
            object:'plot',
            data:{
                'aspect':'line'
            }
        });
        zingchart.exec('radar_chart','setseriesdata',{
            data : [
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
        });
});

$('#radar2').click(function () {
    toggleClass($(this));
    zingchart.exec('radar_chart','modify',{
            object:'plot',
            data:{
                'aspect':'area'
            }
        });
        zingchart.exec('radar_chart','setseriesdata',{
            data : [
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
        });
});

$('#radar3').click(function () {
    toggleClass($(this));
    zingchart.exec('radar_chart','modify',{
            object:'plot',
            data:{
                'aspect':'rose'
            }
        });
        zingchart.exec('radar_chart','setseriesdata',{
            data : [
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
        });
});

$('#radar4').click(function () {
    toggleClass($(this));
    zingchart.exec('radar_chart','modify',{
            object:'plot',
            data:{
                'aspect':'dots'
            }
        });
        zingchart.exec('radar_chart','setseriesdata',{
            data : [
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
        });
});

$('#radar5').click(function () {
    toggleClass($(this));
    zingchart.exec('radar_chart', 'setseriesdata', {
            data : [
                {
                    "aspect":"line",
            "values": [5,10,15,5,14,5]
        },
        {
            "-aspect":"dots",
            "-values": [2,1,3,4,9,10]
        },
        {
            "aspect":"rose",
            "values": [6,9,3,2,6,3]
        }
            ]
        });
});

$('#stock1').click(function () {
    toggleClass($(this));
    zingchart.exec('stock_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'candlestick'
            }
        });
});

$('#stock2').click(function () {
    toggleClass($(this));
    zingchart.exec('stock_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'whisker'
            }
        });
});

$('#bubble1').click(function () {
    toggleClass($(this));
    zingchart.exec('bubble_chart', 'modify', {
            object:"plot",
            data : {
                "scaling": 'radius'
            }
        });
});

$('#bubble2').click(function () {
    toggleClass($(this));
    zingchart.exec('bubble_chart', 'modify', {
            object:"plot",
            data : {
                "scaling": 'area'
            }
        });
});

$('#bubble3').click(function () {
    toggleClass($(this));
    zingchart.exec('bubble_chart', 'modify', {
            object:"plot",
            data : {
                "scaling": 'sqrt'
            }
        });
});

$('#piano1').click(function () {
    toggleClass($(this));
    zingchart.exec('piano_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'size'
            }
        });
});

$('#piano2').click(function () {
    toggleClass($(this));
    zingchart.exec('piano_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'brightness'
            }
        });
});
$('#piano3').click(function () {
    toggleClass($(this));
    zingchart.exec('piano_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'horizontal'
            }
        });
});

$('#piano4').click(function () {
    toggleClass($(this));
    zingchart.exec('piano_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'vertical'
            }
        });
});

$('#bullet1').click(function () {
    toggleClass($(this));
    zingchart.exec('bullet_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'standard'
            }
        });
});

$('#bullet2').click(function () {
    toggleClass($(this));
    zingchart.exec('bullet_chart', 'modify', {
            object:"plot",
            data : {
                "aspect": 'cone'
            }
        });
});

$('#funnel1').click(function () {
    if(funnelOrientation==0){
    zingchart.exec('funnel_chart', 'modify', {
            update:0,
            data : {
                "type": "hfunnel",
                "plotarea":{
                    "margin-left":"40px",
                    "margin-right":"40px"    
                }
            }
        });
    zingchart.exec('funnel_chart','update');
}
else {
    zingchart.exec('funnel_chart', 'modify', {
            update:0,
            data : {
                "type": "vfunnel",
                "plotarea":{
                    "margin-left":"100px",
                    "margin-right":"100px"    
                }
            }
        });
    zingchart.exec('funnel_chart','update');
}
funnelOrientation=!funnelOrientation;
});


$('#rules1').click(function () {
        toggleClass($(this));
    zingchart.exec('rule1_chart', 'setdata', {
            data : RULE1JSON
        });
});

$('#rules2').click(function () {
        toggleClass($(this));
    zingchart.exec('rule1_chart', 'setdata', {
            data : RULE2JSON
        });
});

$('#rules3').click(function () {
        toggleClass($(this));
    zingchart.exec('rule1_chart', 'setdata', {
            data : RULE3JSON
        });
});

$('#currency1').click(function () {
        toggleClass($(this));
    zingchart.exec('currency_chart', 'modify', {
            data : {
                "utc":true,
                "timezone":-7,
                "subtitle":{
                    "text":"US Dollar - PDT",
                    "rtl":0
                },
                "scale-y":{
                    "format":"$%v",
                }
            }
        });
});

$('#currency2').click(function () {
        toggleClass($(this));
    zingchart.exec('currency_chart', 'modify', {
            data : {
                "utc":true,
                "timezone":0,
                "subtitle":{
                    "text":"Euro - UTC",
                    "rtl":0
                },
                "scale-y":{
                    "format":"€%v",
                }
            }
        });
});

$('#currency3').click(function () {
        toggleClass($(this));
    zingchart.exec('currency_chart', 'modify', {
            data : {
                "subtitle":{
                    "text":"Indian Rupee - RTL lol",
                    "rtl":1
                },
                "scale-y":{
                    "format":"₹%v",
                }
            }
        });
});

$('#images1').click(function () {
    zingchart.exec('images_chart', 'modify', {
            data : {
                "images":[{
                    "src":"kitchen/logo-sm.png",
                    "x":"5%",
                    "y":"90%",
                    "shadow":1,
                    "border-radius":5,
                    "shadow-offset":0,
                    "shadow-distance":0,
                    "shadow-alpha":0.7
                }]
            }
        });
});

$('#images2').click(function () {
            toggleClass($(this));
    zingchart.exec('images_chart', 'modify', {
            data : {
                "plot":{
                    "background-image":"kitchen/ocean-wave.jpg"
                },
                "plotarea":{
                    "background-image":null
                }
            }
        });
});

$('#images3').click(function () {
            toggleClass($(this));
    zingchart.exec('images_chart', 'modify', {
            data : {
                "plotarea":{
                    "background-image":"kitchen/ocean-wave.jpg"
                },
                "plot":{
                    "background-image":null
                }
            }
        });
});

$('#barstack1').click(function () {
            toggleClass($(this));
	zingchart.exec('bar_stacked', 'setseriesdata', {
			update:0,
            data : [{
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
        });
	zingchart.exec('bar_stacked', 'modify', {
			update:0,
            data : {
                "stack-type": 'normal'
            }
        });
	zingchart.exec('bar_stacked','update');
});

$('#barstack2').click(function () {
            toggleClass($(this));
	zingchart.exec('bar_stacked', 'setseriesdata', {
            data : [{
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
                }]
        });
});

$('#barstack3').click(function () {
            toggleClass($(this));
	zingchart.exec('bar_stacked', 'setseriesdata', {
			update:0,
            data : [{
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
        });
	zingchart.exec('bar_stacked', 'modify', {
			update:0,
            data : {
                "stack-type": '100%'
            }
        });
	zingchart.exec('bar_stacked','update');
});

$('#areastack1').click(function () {
            toggleClass($(this));
	zingchart.exec('area_stacked', 'modify', {
            data : {
                "stack-type": 'normal'
            }
        });
});

$('#areastack2').click(function () {
            toggleClass($(this));
	zingchart.exec('area_stacked', 'modify', {
            data : {
                "stack-type": '100%'
            }
        });
});

$('#shared1').toggle(function(){
	console.log(sharedLegend);
	zingchart.exec('shared', 'modify', {
		graphid:0,
		object:'legend',
            data : {
                "shared":sharedLegend
            }
        });
	zingchart.exec('shared', 'modify', {
		graphid:1,
		object:'legend',
            data : {
                "shared":sharedLegend
            }
        });
	zingchart.exec('shared', 'modify', {
		graphid:2,
		object:'legend',
            data : {
                "shared":sharedLegend
            }
        });
	sharedLegend=!sharedLegend;
});

$('#shared2').click(function () {
	zingchart.exec('shared', 'modify', {
            data : {
                "stack-type": '100%'
            }
        });
});

$('#shared3').click(function () {
	zingchart.exec('shared', 'modify', {
            data : {
                "stack-type": 'normal'
            }
        });
});

$('#mixed1').click(function () {
    toggleClass($(this));
    zingchart.exec('mixed', 'setdata', {
            data:{
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
        });
});

$('#mixed2').click(function () {
    toggleClass($(this));
    zingchart.exec('mixed','setdata',{
        data:{

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
            "line-color":"#999"
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
                "values":[44,11,28,42,26,13,11,26,7],
                "type":"line"
            },
            {
                "values":[10,22,8,12,29,6,15,21,25],
                "type":"area"
            }
        ]

}
    });
});

$('#mixed3').click(function () {
    toggleClass($(this));
     zingchart.exec('mixed','setdata',{
        data:{
        "type":"mixed",
        "title":{
            "text":"Mixed - XY",
            "height":"20px"
        },
        "plotarea":{
             "margin":"80 150 60 60"
        },
        "scale-y":{
            "line-color":"#7ca82b",
            "label":{
                "text":"Y-Axis Bar Values"
            }
        },
        "scale-y-2":{
            "values":"0:100:10",
            "line-color":"#1db0e1",
            "label":{
                "text":"Y2-Axis Line Value"
            }
        },
        "scale-y-3":{
            "values":"0:100:10",
            "line-color":"#cc3300",
            "label":{
                "text":"Y3-Axis Line Value"
            }
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
                "values":[26,13,11,26,7,44,11,28,42],
                "type":"line",
                "scales":"scale-x,scale-y-2"
            },
            {
                "values":[80,72,69,56,45,61,75,80,32],
                "type":"line",
                "scales":"scale-x,scale-y-3"
            }
        ]

}
    });
});

$('#mixed4').click(function () {
    toggleClass($(this));
     zingchart.exec('mixed','setdata',{
        data:{

        "type":"mixed",
        "title":{
            "text":"Mixed - XY",
            "height":"20px"
        },
        "plotarea":{
             "margin":"80 150 60 60"
        },
        "scale-y":{
            "line-color":"#7ca82b",
            "label":{
                "text":"Y-Axis Bar Values"
            }
        },
        "scale-y-2":{
            "values":"0:100:10",
            "line-color":"#1db0e1",
            "label":{
                "text":"Y2-Axis Line Value"
            }
        },
        "scale-y-3":{
            "values":"0:1000:100",
            "line-color":"#cc3300",
            "label":{
                "text":"Y3-Axis Line Value"
            }
        },
        "scale-x":{
            "values":["1","2","3","4","5","6","7","8","9"]
        },
        "scale-x-2":{
            "values":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            "line-color":"#cc3300"
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
                "values":[16,23,21,36,17,14,11,28,32],
                "type":"line",
                "scales":"scale-x,scale-y-2"
            },
            {
                "values":[730,813,910,820,760,640,811,720,940,803,710,690],
                "type":"line",
                "scales":"scale-x-2,scale-y-3"
            }
        ]

}
    });
});

$('#mixed5').click(function () {
    toggleClass($(this));
     zingchart.exec('mixed','setdata',{
        data:{

        "type":"mixed",
        "title":{
            "text":"Mixed - XY",
            "height":"20px"
        },
        "labels":[
            {
                "text": "Up to 9-Y and 9-X Axis",
                "x":"70%",
                "y":"18%",
                "text-align":"left",
                "background-color":"#fff",
                "border-radius":"6px",
                "padding":"10px"
            }
        ],
        "plotarea":{
             "margin":"80 150 60 60"
        },
        "scale-y":{
            "line-color":"#7ca82b",
            "label":{
                "text":"Y-Axis Bar Values"
            }
        },
        "scale-y-2":{
            "values":"0:100:10",
            "line-color":"#1db0e1",
            "label":{
                "text":"Y2-Axis Line Value"
            }
        },
        "scale-y-3":{
            "values":"0:1000:100",
            "line-color":"#cc3300",
            "label":{
                "text":"Y3-Axis Line Value"
            }
        },
        "scale-y-4":{
            "values":"0:10000:1000",
            "line-color":"#f9c332",
            "label":{
                "text":"Y4-Axis Line Value"
            }
        },
        "scale-x":{
            "values":["1","2","3","4","5","6","7","8","9"]
        },
        "scale-x-2":{
            "values":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            "line-color":"#f9c332"
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
                "values":[26,13,11,26,7,44,11,28,42],
                "type":"line",
                "scales":"scale-x,scale-y-2"
            },
            {
                "values":[180,320,490,500,650,501,705,500,402],
                "type":"line",
                "scales":"scale-x,scale-y-3"
            },
            {
                "values":[7300,8103,9010,8200,7600,6400,8101,7020,9040,8003,7010,6900],
                "type":"line",
                "scales":"scale-x-2,scale-y-4"
            }
        ]

}
    });
});

$(document).on('change', 'input:radio[id^="zooming1"]', function (event) {
        zingchart.exec('zooming','modify',{
            data:{
                "scale-x":{
                    "zooming":1
                },
                "scale-y":{
                    "zooming":0
                }
            }
        });
    });
$(document).on('change', 'input:radio[id^="zooming2"]', function (event) {
        zingchart.exec('zooming','modify',{
            data:{
                "scale-x":{
                    "zooming":0
                },
                "scale-y":{
                    "zooming":1
                }
            }
        });
    });
$(document).on('change', 'input:radio[id^="zooming3"]', function (event) {
        zingchart.exec('zooming','modify',{
            data:{
                "scale-x":{
                    "zooming":1
                },
                "scale-y":{
                    "zooming":1
                }
            }
        });
    });
$(document).on('change', 'input:checkbox[id^="zooming4"]', function (event) {
        if(previewBool==0){
            zingchart.exec('zooming','modify',{
                data:{
                    "preview":{
                        "live":1
                    },
                    "plotarea":{
                        "margin":"70 70 110 100"
                    }
                }
            });
        }
        else{
            var chartState=zingchart.exec('zooming','getdata');
            console.log(chartState);
            delete chartState.graphset[0].preview;
            chartState.graphset[0].plotarea.margin="70 70 70 100";
            zingchart.exec('zooming','setdata',{
                data:chartState
            });
        }
        previewBool=!previewBool;
    });
$(document).on('change', 'input:checkbox[id^="zooming5"]', function (event) {
        if(scrollBool==0){
            zingchart.exec('zooming','zoomto',{
                xmin:0,
                xmax:25
            });
            zingchart.exec('zooming','modify',{
                data:{
                    "scroll-x":{},
                    "scroll-y":{}
                }
            });
        }
        else{
            var chartState=zingchart.exec('zooming','getdata');
            console.log(chartState);

            delete chartState.graphset[0]['scroll-x'];
            delete chartState.graphset[0]['scroll-y'];

            console.log(chartState);

            zingchart.exec('zooming','setdata',{
                data:chartState
            });
        }
        scrollBool=!scrollBool;
    });

$('#zooming6').click(function(){
    zingchart.exec('zooming','zoomto',{
        xmin:0,
        xmax:25
    });
});

$('#zooming8').click(function(){
    zingchart.exec('zooming','zoomin',{
        zoomx:1,
        zoomy:1
    });
});

$('#zooming9').click(function(){
    zingchart.exec('zooming','zoomout',{
        zoomx:1,
        zoomy:1
    });
});

$('#zooming10').click(function(){
    zingchart.exec('zooming','viewall');
});

$(document).on('change', 'input:checkbox[id^="zooming7"]', function (event) {
        zingchart.exec('zooming','modify',{
                data:{
                    "scale-x":{
                        "zoom-snap":zoomSnapBool
                    },
                    "scale-y":{
                        "zoom-snap":zoomSnapBool
                    }
                }
            });
        zoomSnapBool=!zoomSnapBool;
    });

$(document).on('change', 'input:radio[id^="line3d"]', function (event) {
        toggleClass($(this));
        zingchart.exec('line_chart','modify',{
            data:{
                "type":"line3d"
            }
        });
        zingchart.exec('line_chart','update');
});
$(document).on('change', 'input:radio[id^="line2d"]', function (event) {
        toggleClass($(this));
        zingchart.exec('line_chart','modify',{
            data:{
                "type":"line"
            }
        });
        zingchart.exec('line_chart','update');
});

$(document).on('change', 'input:radio[id^="area3d"]', function (event) {
        toggleClass($(this));
        zingchart.exec('area_chart','modify',{
            data:{
                "type":"area3d"
            }
        });
        zingchart.exec('area_chart','update');
});
$(document).on('change', 'input:radio[id^="area2d"]', function (event) {
        toggleClass($(this));
        zingchart.exec('area_chart','modify',{
            data:{
                "type":"area"
            }
        });
        zingchart.exec('area_chart','update');
});
$(document).on('change', 'input:radio[id^="pie3d"]', function (event) {
        toggleClass($(this));
        zingchart.exec('pie_chart','modify',{
            data:{
                "type":"pie3d"
            }
        });
        zingchart.exec('pie_chart','update');
        pie3dBool=!pie3dBool;
});
$(document).on('change', 'input:radio[id^="pie2d"]', function (event) {
        toggleClass($(this));
        zingchart.exec('pie_chart','modify',{
            data:{
                "type":"pie"
            }
        });
        zingchart.exec('pie_chart','update');
        pie3dBool=!pie3dBool;
});

//Standard tooltips
$(document).on('change', 'input:radio[id^="tooltips1"]', function (event) {
        zingchart.exec('tooltips','modify',{
            data:{
                "tooltip":{
                    "text":"Student %k<br>%t Percentile: %v",
                    "text-align":"left",
                    "shadow":0,
                    "border-radius":5,
                    "x":null,
                    "y":null
                }
            }
        });
});

//Fixed tooltips
$(document).on('change', 'input:radio[id^="tooltips2"]', function (event) {
        $('#tooltips3').parent().removeClass("active");
        $('#tooltips4').parent().removeClass("active");
        $('#tooltips5').parent().removeClass("active");
        $('#tooltips7').parent().removeClass("active");
        if(legendItemBool==1){
            zingchart.exec('tooltips','modify',{
                data:{
                    "legend":{
                        "tooltip":{
                            "visible":0,
                            "text":"Legend Tooltip",
                            "height":null
                        }
                    }
                }
            });
            legendItemBool=0;
        }
        if(xAxisItemBool==1){
        zingchart.exec('tooltips','modify',{
            data:{
                "scaleX":{
                    "tooltip":{
                        "visible":0,
                        "text":"X-Axis Tooltip",
                        "background-color":"white",
                        "border-radius":5,
                        "height":null
                    }
                }
            }
        });
        xAxisItemBool=0;
        }
        if(yAxisItemBool==1){
        zingchart.exec('tooltips','modify',{
            data:{
                "scaleY":{
                    "tooltip":{
                        "visible":0,
                        "text":"Y-Axis Tooltip",
                        "background-color":"white",
                        "border-radius":5,
                        "height":null
                    }
                }
            }
        });
        yAxisItemBool=0;
        }
        if(htmlModeBool==1){
        zingchart.exec('tooltips','modify',{
            data:{
                "tooltip":{
                    "text":"Student %k<br>%t Percentile: %v",
                    "text-align":"left",
                    "shadow":0,
                    "border-radius":5,
                    "sticky":0,
                    "x":null,
                    "y":null,
                    "height":null
                }
            }
        });
        htmlModeBool=0;
        }
        zingchart.exec('tooltips','modify',{
            data:{
                "tooltip":{
                    "text":"Student %k<br>%t Percentile: %v",
                    "text-align":"left",
                    "shadow":0,
                    "border-radius":5,
                    "x":"88%",
                    "y":"32%",
                    "height":null
                }
            }
        });
});

//Legend tooltips
$(document).on('change', 'input:checkbox[id^="tooltips3"]', function (event) {
    if(htmlModeBool==0){
        zingchart.exec('tooltips','modify',{
            data:{
                "tooltip":{
                    "text":"Student %k<br>%t Percentile: %v",
                    "text-align":"left",
                    "shadow":0,
                    "border-radius":5,
                    "x":null,
                    "y":null
                }
            }
        });
    }
    $('#tooltips1').parent().addClass('active');
    $('#tooltips2').parent().removeClass('active');
    if(legendItemBool==0){
        zingchart.exec('tooltips','modify',{
            data:{
                "legend":{
                    "tooltip":{
                        "visible":1,
                        "text":"Legend Tooltip",
                        "height":null
                    }
                }
            }
        });
    }
    else{
        zingchart.exec('tooltips','modify',{
            data:{
                "legend":{
                    "tooltip":{
                        "visible":0,
                        "text":"Legend Tooltip",
                        "height":null
                    }
                }
            }
        });
    }
    legendItemBool=!legendItemBool;
});

//X-axis tooltips
$(document).on('change', 'input:checkbox[id^="tooltips4"]', function (event) {
    if(htmlModeBool==0){
        zingchart.exec('tooltips','modify',{
            data:{
                "tooltip":{
                    "text":"Student %k<br>%t Percentile: %v",
                    "text-align":"left",
                    "shadow":0,
                    "border-radius":5,
                    "x":null,
                    "y":null,
                    "height":null
                }
            }
        });
    }
    $('#tooltips1').parent().addClass('active');
    $('#tooltips2').parent().removeClass('active');
    if(xAxisItemBool==0){
        zingchart.exec('tooltips','modify',{
            data:{
                "scaleX":{
                    "tooltip":{
                        "visible":1,
                        "text":"X-Axis Tooltip",
                        "background-color":"white",
                        "border-radius":5,
                        "border-width":1,
                        "border-color":"#ddd",
                        "height":20
                    }
                }
            }
        });
    }
    else{
        zingchart.exec('tooltips','modify',{
            data:{
                "scaleX":{
                    "tooltip":{
                        "visible":0,
                        "text":"X-Axis Tooltip",
                        "height":null
                    }
                }
            }
        });
    }
    xAxisItemBool=!xAxisItemBool;
});

//Y-axis tooltips
$(document).on('change', 'input:checkbox[id^="tooltips5"]', function (event) {
    if(htmlModeBool==0){
        zingchart.exec('tooltips','modify',{
            data:{
                "tooltip":{
                    "text":"Student %k<br>%t Percentile: %v",
                    "text-align":"left",
                    "shadow":0,
                    "border-radius":5,
                    "x":null,
                    "y":null,
                    "height":null
                }
            }
        });
    }
    $('#tooltips1').parent().addClass('active');
    $('#tooltips2').parent().removeClass('active');
    if(yAxisItemBool==0){
        zingchart.exec('tooltips','modify',{
            data:{
                "scaleY":{
                    "tooltip":{
                        "visible":1,
                        "text":"Y-Axis Tooltip",
                        "background-color":"white",
                        "border-radius":5,
                        "border-width":1,
                        "border-color":"#ddd",
                        "height":20
                    }
                }
            }
        });
    }
    else{
        zingchart.exec('tooltips','modify',{
            data:{
                "scaleY":{
                    "tooltip":{
                        "visible":0,
                        "text":"Y-Axis Tooltip",
                        "background-color":"white",
                        "border-radius":5,
                        "height":null
                    }
                }
            }
        });
    }
    yAxisItemBool=!yAxisItemBool;
});

//Sticky tooltips
$(document).on('change', 'input:checkbox[id^="tooltips6"]', function (event) {
    if(stickyBool==0){
        zingchart.exec('tooltips','modify',{
            data:{
                "tooltip":{
                    "text":"Student %k<br>%t Percentile: %v",
                    "text-align":"left",
                    "shadow":0,
                    "border-radius":5,
                    "sticky":1,
                    "timeout":2000,
                    "height":null
                }
            }
        });
    }
    else{
        zingchart.exec('tooltips','modify',{
            data:{
                "tooltip":{
                    "text":"Student %k<br>%t Percentile: %v",
                    "text-align":"left",
                    "shadow":0,
                    "border-radius":5,
                    "sticky":0,
                    "height":null
                }
            }
        });
    }
    stickyBool=!stickyBool;
});

//HTML mode tooltips
$(document).on('change', 'input:checkbox[id^="tooltips7"]', function (event) {
    $('#tooltips1').parent().addClass('active');
    $('#tooltips2').parent().removeClass('active');
    if(htmlModeBool==0){
        zingchart.exec('tooltips','modify',{
            data:{
                "tooltip":{
                    "html-mode":1,
                    "height":85,
                    "border-radius":5,
                    "shadow":0,
                    "x":null,
                    "y":null,
                    "text":"<style>th {border:1px solid #999;text-align:center;font-size:14px;padding:6px;}td{border:1px solid #999;text-align:center;font-size:14px;padding:10px;}</style><table style='border-radius:5px;'><thead><tr><th style='font-size:16px;'>%t</th></tr></thead><tbody><tr><td style='font-size:13px;'>%v%</td></tr></tbody></table>"
                }
            }
        });
    } else {
        zingchart.exec('tooltips','modify',{
            data:{
                "tooltip":{
                    "text":"Student %k<br>%t Percentile: %v",
                    "text-align":"left",
                    "shadow":0,
                    "border-radius":5,
                    "sticky":0,
                    "x":null,
                    "y":null,
                    "height":null
                }
            }
        });
    }
    htmlModeBool=!htmlModeBool;
});

/*$('button').click(function(){
           $(this).addClass('active');
      });*/

$('#render').click(function() {
    zingchart.exec('anim_chart', 'setdata', {data : data()});
});

function data() {
    return {
        "graphset" : [
            {
                "title":{
                    "text":"Animation"
                },
                "plotarea":{
                },
                "tooltip":{
                },
                "scale-x":{
                    "zooming":1
                },
                "scale":{
                    "size-factor":0.9
                },
                "type":$('#chart').val(),
                "plot":{
                    "exact":1,
                    "shadow":1,
                    "alpha":1,
                    "shadow-distance":1,
                    "stacked":ZC._i_($('#stacked').val()),
                    "line-width":2,
                    "slice-start":15,
                    "animation":{
                        "delay":10,
                        "effect":$('#effect').val(),
                        "speed":$('#speed').val(),
                        "method":$('#method').val(),
                        "sequence":$('#sequence').val(),
                        "attributes":{
                        }
                    },
                    "value-box" : {
                        "visible":0,
                        "text":"%v",
                        "background-color":"#fff",
                        "border-color":"#999",
                        "border-width":2,
                        "border-radius":10,
                        "padding":10,
                        "placement":"out"
                    },
                    "marker" : {
                        "type" : "circle"
                    }
                },
                "series":[
                    {
                        "values":values($('#chart').val())
                    },{
                        "values":values($('#chart').val())
                    },{
                        "values":values($('#chart').val())
                    },{
                        "values":values($('#chart').val())
                    }
                ]
            }
        ]
    };
}

function values(sType) {
    var d = [], iLen;
    switch (sType) {
        case 'line':
        case 'area':
            iLen = 10;
            break;
        case 'bar':
            iLen = 6;
            break;
        case 'hbar':
            iLen = 6;
            break;
        case 'pie':
        case 'nestedpie':
            iLen = 4;
            break;
        case 'scatter':
        case 'bubble':
            var iLen = 16;
            break;
    }
    switch (sType) {
        case 'line':
        case 'area':
        case 'bar':
        case 'hbar':
        case 'pie':
        case 'nestedpie':
            for (var i=0;i<iLen;i++) {
                d.push(50+ZC._i_(150*Math.random()));
            }
            break;
        case 'scatter':
            for (var i=0;i<iLen;i++) {
                d.push([i, 50+ZC._i_(150*Math.random())]);
            }
            break;
        case 'bubble':
            for (var i=0;i<iLen;i++) {
                d.push([i, 50+ZC._i_(150*Math.random()), 10+ZC._i_(20*Math.random())]);
            }
            break;
    }
    return d;
}


}