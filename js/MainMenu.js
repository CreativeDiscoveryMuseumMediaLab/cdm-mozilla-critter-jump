/**
 * Declare MainMenu class
 * @param game
 * @constructor
 */
Critterer.MainMenu = function(game) {

}

Critterer.MainMenu.prototype = {

        /**
         * Implements preload()
         */
        preload: function() {},
        create: function() {},
        update: function() {
                
        if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
        }

}