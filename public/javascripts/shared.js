/********* THEME PATHS *********/
this.default_theme = "../themes/dataweek.txt";
this.googlish_theme = "../themes/googlish.txt";
this.oceanic_theme = "../themes/oceanic.txt";
this.gotham_theme = "../themes/gotham.txt";

/********* IMAGE PATHS *********/
// Only for images files needed inside charts
// Not for full images reference outside charts
this.auto_gray  = "../images/autoGray.png";
this.logo_sm    = "../images/logo-sm.png";
this.ocean_wave = "../images/ocean-wave.jpg";
this.black      = "../images/black.png";
this.black40    = "../images/black40.png";
this.red        = "../images/red.png";
this.red40      = "../images/red40.png";

// zingchart.MODULESDIR = './lib/modules/';
zingchart.loadModules('maps,maps-usa');
zingchart.loadModules('patterns');


function generateRandomNumbers(nodes) {
    	var values, m1, m2, s;
        values = [];
        m1 = 10+40*Math.random();
        m2 = 10+40*Math.random();
        s = 40+160*Math.random();
        for (var n=0;n<nodes+1;n++) {
            v = s*Math.exp(Math.abs(n-nodes/2)/nodes)*Math.sin(n/(nodes/(m1)))*Math.cos(n/(nodes/m2));
            v = parseFloat(v.toFixed(2));
            values.push(v)
        }
        return values;
}