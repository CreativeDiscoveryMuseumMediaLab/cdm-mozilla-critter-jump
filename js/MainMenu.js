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
            this.critterer_logo = null;
            this.main_menu_play_btn = null;
        },

        /**
         * Implements create()
         */
        create: function() {

            this.critterer_logo = this.add.sprite(this.world.centerX, this.world.centerY - 75, 'critterer_logo');
            this.critterer_logo.anchor.setTo(0.5, 0.5);
            this.critterer_logo.alpha = 0;

            var logo_tween = this.add.tween(this.critterer_logo);

            // sprite_name.to({x: x, y: y}, duration, easing, autostart, delay);
            logo_tween.to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 100);

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