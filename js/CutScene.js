//cut scene to play videos between game play
Critterer.CutScene = function(game){};

Critterer.CutScene.prototype = {

  create: function() {

var Scorpions = "https://vimeo.com/112414428"
var Walking_Stick = "https://vimeo.com/111256268"
var Walking_Stick_Breathe = "https://vimeo.com/111256267"
var Walking_Stick_do = "https://vimeo.com/111256266"
var Walking_Sticks_live = "https://vimeo.com/111256265"

//addes the randomizer
    function picker() {
        var values = [Scorpions,Walking_Stick,Walking_Stick_Breathe,Walking_Stick_do, Walking_Sticks_live],
            valueToUse = values[Math.floor(Math.random() * values.length)];
		  
      // fancybox normally opens via a click event
      // here we are calling the fancybox on load
      $.fancybox({
          maxWidth	    : 800,
          maxHeight	    : 600,
          fitToView	    : true,
          width		    : '70%',
          height		: '70%',
          autoSize	    : true,
          closeClick	: false,
          openEffect	: 'none',
          closeEffect	: 'none',
          href          : valueToUse,
          helpers       : {
              media : {}
          }
      });
    });

  },

  update: function() {}{
     
  };