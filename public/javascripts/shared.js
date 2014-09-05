$(document).ready(function() {
	resizeElements();
});
$(window).resize(function() {
	resizeElements();
});

function resizeElements() {
	var totalHeight = $(window).height()-100;
	var totalWidth = $(window).width()-100;
	var headerHeight = $('header').height();
	$('.container').css('height', totalHeight);
	$('.container').css('width', totalWidth);
	$('.container').css('padding', '25px');
	$('.container').css('margin', '25px');
	$('.navigation').css('height', totalHeight-82);
	$('.navigation').css('overflow','scroll');
}

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