var Critterer = {};

//cut scene to play videos between game play
Critterer.CutScene = function(game){};

Critterer.CutScene.prototype = {

  create: function() {
    

    //Emporer Scorpion Video
    var Scorpions = <a class="fancybox" rel="group" href="https://vimeo.com/112414428&api=1&player_id=video1"><img src="https://vimeo.com/112414428&api=1&player_id=video1" alt="" /></a>;
    
    var Walking_Stick = <a class="fancybox" rel="group" href="https://vimeo.com/111256268&api=1&player_id=video2"><img src="https://vimeo.com/111256268&api=1&player_id=video2" alt="" /></a>;
    
    var Walking_Stick_Breathe = <a class="fancybox" rel="group" href="https://vimeo.com/111256267&player_id=video3"><img src="https://vimeo.com/111256267&player_id=video3" alt="" /></a>;&api=1&player_id=video1
    
    var Walking_Stick_do = <a class="fancybox" rel="group" href="https://vimeo.com/111256266&api=1&player_id=video4"><img src="https://vimeo.com/111256266&api=1&player_id=video4" alt="" /></a>;
    
    var Walking_Sticks_live = <a class="fancybox" rel="group" href="https://vimeo.com/111256265&api=1&player_id=video1"><img src="https://vimeo.com/111256265&api=1&player_id=video1" alt="" /></a>;
  },
  

  update: function() {}
  
      function test() {
        var values = [Scorpions,Walking_Stick,Walking_Stick_Breathe,Walking_Stick_do, Walking_Sticks_live],
            valueToUse = values[Math.floor(Math.random() * values.length)];
        // do something with the selected value
        $(document).ready(function() {
		$(valueToUse).fancybox();
    	});
    }
}; 


	$(document).ready(function() {
		$(".fancybox").fancybox();
	});
