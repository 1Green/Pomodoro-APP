
var timeMin = 24;
var timeSec = 59;
var pomCount = 0;
var taskAdded = false
var timer;
var pauseTimer;

	


function recupInput(){
	
	var pushList = $("#task").val();
	
	if (pushList){
		$("#done").prepend("<li class='list-group-item'>" + pushList + "</li>");
		$("#task").val("");
		$("#task").css("border","1px solid #CCC");
		taskAdded = true;
		playButton[0].disabled = true;
		launchTimer(); 

	} else if (!pushList && taskAdded)	{
		playButton[0].disabled = true;
		launchTimer(); 
	
	} else if (pushList || !taskAdded) {
		$("#task").attr("placeholder","Please enter a task..");
		$("#task").css("border","2px solid tomato");
	}
}

function launchTimer() {
	
	
	timer = setTimeout(function() {
		$(".time").html(timeMin + " : " + timeSec);
		timeSec--;

		if ( timeSec < 0 ) {
			timeMin--;
			timeSec = 59;
		} 
		
		if (timeMin == 0 && timeSec == 0) {
			
			if (pomCount < 3 ) {
			
			timeMin = 4;
			timeSec = 59;

			
			} else {
				timeMin = 15;
				timeSec = 0;
			
			setTimeout(function() {
			$(".time").html("Time is UP !");
			$(".list-group-item").addClass("taskdone");}
			,1000);	

			setTimeout(function(){
			$(".time").html("15 Min Break ! ENJOY !")}
			,3000);
			
			setTimeout(function(){shortPauseTimer()}
			,6000);

			return;
			}
			
			setTimeout(function() {
			$(".time").html("Time is UP !");
			$(".list-group-item").addClass("taskdone");}
			,1000);
			
			setTimeout(function(){
			$(".time").html("5 Min Break !")}
			,3000);
			
			setTimeout(function(){shortPauseTimer()}
			,6000);
			
			return;
		}

		
		launchTimer();
	
	},1000)

}


function shortPauseTimer() {
		
	pauseTimer = setTimeout(function() {
		
		$(".time").html(timeMin + " : " + timeSec);
		timeSec--;

		if ( timeSec < 0 ) {
			timeMin--;
			timeSec = 59;
		} 
		if (timeMin == 0 && timeSec == 0) {
			timeMin = 24;
			timeSec = 59;
			setTimeout(function() {$(".time").html("Time is UP !");},1000);
			setTimeout(function(){$(".time").html("Waiting for task..")}, 3000);
			pomCount++;
			setTimeout(function(){playButton[0].disabled = false;},3000);
			taskAdded = false;
			return;
		}
		
		shortPauseTimer();
	
	},1000)

};



$(document).ready(function(){
	
	playButton = $("#play");
	

	playButton.click(function(){
		   recupInput();
	});

	$(document).keypress(function(e) {
    		if(e.which == 13 && !taskAdded) {
    			recupInput();
    			e.preventDefault();
  		  } else if (e.which == 13 && taskAdded) {
  		  	e.preventDefault();
  		  }
	});
	

	$("#pause").click(function(){
		
		playButton[0].disabled = false;
		clearTimeout(timer);
		clearTimeout(pauseTimer);

	});

	$("#stop").click(function(){

		playButton[0].disabled = false;
		clearTimeout(timer);
		clearTimeout(pauseTimer);
		timeMin = 24;
		timeSec = 59;
		pomCount = 0;
		taskAdded = false;
		$(".time").html("25:00");
		$("#done").empty();


	});

});





