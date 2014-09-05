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