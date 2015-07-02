$(document).ready(function(){
	$('.menubar').click(function(){
		$('.mainheader nav').slideToggle(400, function(){
			$('this').toggleClass('display')
		});
	})
});