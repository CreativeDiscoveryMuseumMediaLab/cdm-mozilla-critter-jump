/**
 * Declare levelintro class
 * @param game
 * @constructor
 */
Critterer.FunFacts = function(game) {
};

Critterer.FunFacts.prototype = {
    init: function(levelData, music) {
      this.levelData = levelData;
      this.music = music;
    },
    
    create: function() {

      // Set up variables
      var titleText = { font: "bold 36px Arial", fill: "#fff", align: "center"},
          factText = { font: "bold 24px Arial", fill: "#000", align: "left", wordWrap: true, wordWrapWidth: (this.game.width/4)*3 -100},
          current_level = this.levelData.level,
          facts = this.levelData.levels[current_level].Facts,
          playbtn,
          panel,
          fact = Math.floor(Math.random() * facts.length),
          title,
          question;

    
      // Add background for level
      this.game.add.sprite(0,0, this.levelData.levels[current_level].country);

      // create panel group
      this.panelGroup = this.game.add.group();
      this.panelGroup.alpha = 0;

      // Add panel for fact
      panel = this.panelGroup.create(this.game.width/2, this.game.height/2, 'panel');
      panel.width = (this.game.width/4)*3;
      panel.height = this.game.height;
      panel.anchor.setTo(0.5,0.5);

      // Add title
      title = this.game.add.text(this.world.centerX, 90,"Fun Facts", titleText)
      title.anchor.setTo(0.5);
      this.panelGroup.add(title);

      // Add question
      question = this.game.add.text((this.game.width - (this.game.width/4)*3)/2 + 60, 200, facts[fact].Question , factText);
      this.panelGroup.add(question);

      // Add Fact
      fact = this.game.add.text((this.game.width - (this.game.width/4)*3)/2 + 60, 260, facts[fact].Answer ,factText);
      this.panelGroup.add(fact);

      // Add Play Button
      play_btn = this.panelGroup.create(this.world.centerX, this.panelGroup.height - 120, 'game_play_btn');
      play_btn.anchor.setTo(0.5, 0.5);
      play_btn.scale.setTo(.75);
      play_btn.inputEnabled = true;
      play_btn.events.onInputDown.addOnce(this.fadeOut, this);

      var panel_tween_in = this.game.add.tween(this.panelGroup)
          .to({ alpha: 1 }, 1250, Phaser.Easing.Linear.None, true, 100);

    },

    fadeOut: function() {
      var panel_tween_out = this.game.add.tween(this.panelGroup)
          .to({ alpha: 0 }, 1250, Phaser.Easing.Linear.None, true, 100);
      
      panel_tween_out.onComplete.add(this.startGame, this);
    },

    startGame: function() {
      this.game.state.start('RoundIntro', true, false, this.levelData, this.music);
    }
};