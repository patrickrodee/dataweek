		{
			"id" : "months",
			"width" : "100%",
			"x" : "0%",
			"y" : "40%",
			"height" : "30%",
			"type" : "bar",
			"-background-color":"#f4f6fc",
			"plotarea" : {
				"margin":"25 30 40 50"
			},
			"plot":{
			"bars-overlap":"100%",
			},
			"scale-x" : {
				"-line-color":"#AFB2AF",
            	"-line-width":"2px",
            	"values" : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "-tick":{
                "line-color":"#AFB2AF",
                "line-width":"1px"
            },
            "item":{
                "-font-color":"#59514E"
            },
            "guide":{
				"visible":false	
			}
			},
			"scale-y" : {
				
				"values":"0:100:25",
				"-line-color":"#AFB2AF",
				"-tick":{
                	"line-color":"#AFB2AF",
               		 "line-width":"2px"
            },
            "item":{
                "-font-color":"#59514E",
                "padding":"4px"
            },
             "guide":{
				"visible":false	
			}
			},
			"tooltip":{
			"text":"%v",
                    "-shadow-color":"#fff"
                },
			"series" : [
				{
					"values" : [
					<?php
					$s = '';
					for ($i=0;$i<12;$i++) {
						$s .= intval(50 + rand(-20, 40)) . ',';
 					}
 					echo substr($s, 0, -1);
					?>
					],
					"url" : "<?php echo $_GET['filepath']; ?>/data-days.php?monthindex=%node-index&monthname=%scale-key-value&year=<?php echo $_GET['year']; ?>",
					"-background-color" : "#B0DB07 #8CB206",
					"-border-width":"2px",
                "-border-color":"#fff",
					"z-index":1,
					"target" : "graph=days"
				},
				{
				"values":[100,100,100,100,100,100,100,100,100,100,100,100],
				"background-color":"#E8E7E8",
                "maxTrackers":0,
                "z-index":0
				}
			],
			"labels" : [
				{
					"x" : 50,
					"y" : 0,
					"color":"black",
	                "background-color":"white",
	                "alpha":0.8,
	                "border-radius-bottom-left":5,
	                "border-radius-bottom-right":5,
	                "border-right":"1px solid #ddd",
	                "border-left":"1px solid #ddd",
	                "border-bottom":"1px solid #ddd",
					"text" : "Monthly stats for <?php echo $_GET['year']; ?>"
				}
			]
		}