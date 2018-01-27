/**
 * Declare levelintro class
 * @param game
 * @constructor
 */
Critterer.LevelIntro = function(game) {

};

Critterer.LevelIntro.prototype = {
  init: function(levelData) {
    this.levelData = levelData;
    if(this.levelData.level >= 1){
      this.game[this.levelData.levels[this.levelData.level - 1].country + '_sound'].stop();
      this.game[this.levelData.levels[this.levelData.level].country + '_sound']
        .play(this.levelData.levels[this.levelData.level].country + '_start', 0, 0.3, true, false);
    }
  },

  preload: function() {
    this.logo = null;
    this.play_btn = null;
  },

  /**
   * Implements create()
   */
  create: function() {
    
    var current_level = this.levelData.level,
        level_bg = this.levelData.levels[current_level].country,
        level_logo = this.levelData.levels[current_level].country + '_logo',
        play_btn;

    this.background = this.add.sprite(0, 0, level_bg);

    this.logo = this.add.sprite(this.world.centerX, this.world.centerY - 125, level_logo);
    this.logo.anchor.setTo(0.5, 0.5);
    this.logo.alpha = 0;

    var logo_tween = this.add.tween(this.logo);
    logo_tween.to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 100);


    this.play_btn = this.add.image(this.world.centerX, this.world.centerY + 60, 'game_play_btn');
    this.play_btn.anchor.setTo(0.5, 0.5);
    this.play_btn.alpha = 0;
    this.play_btn.inputEnabled = true;
    this.play_btn.events.onInputDown.addOnce(this.fadeOut, this);

    var play_tween = this.add.tween(this.play_btn);

    // sprite_name.to({x: x, y: y}, duration, easing, autostart, delay);
    play_tween.to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 1500);

  },

  fadeOut: function() {
    var play_tween_out = this.game.add.tween(this.play_btn).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 100);
    var logo_tween_out = this.game.add.tween(this.logo).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 100);
    
    logo_tween_out.onComplete.add(this.startGame, this);
  },

  startGame: function() {
    this.game.state.start('FunFacts', true, false, this.levelData);
  },

  update: function(){

  }
};