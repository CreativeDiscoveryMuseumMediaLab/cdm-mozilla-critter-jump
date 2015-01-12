//cut scene to play videos between game play
Critterer.CutScene = function(game){};

Critterer.CutScene.prototype = {

  create: function() {

      $.fancybox({
          //type          : 'iframe',
          maxWidth	    : 800,
          maxHeight	    : 600,
          fitToView	    : true,
          width		    : '70%',
          height		: '70%',
          autoSize	    : true,
          closeClick	: false,
          openEffect	: 'none',
          closeEffect	: 'none',
          href          : 'http://vimeo.com/99745068',
          helpers       : {
              media : {}
          }
      });

  },

  update: function() {}

};
