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
        preload: function() {
            //this.critterer_logo = null;
        },

        /**
         * Implements create()
         */
        create: function() {

            //this.critterer_logo = this.add.sprite(this.world.centerX, this.world.centerY - 75, 'critterer_logo');
            //this.critterer_logo.anchor.setTo(0.5, 0.5);

        },

        /**
         * Implements update()
         */
        update: function() {
                
            if(this.game.input.activePointer.justPressed()) {
              this.game.state.start('Game');
            }

        }

}