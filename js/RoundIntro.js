/**
 * Declare levelintro class
 * @param game
 * @constructor
 */
Critterer.RoundIntro = function(game) {

};

Critterer.RoundIntro.prototype = {
    init: function(levelData, music) {
      this.levelData = levelData;
      this.music = music;
    },

    create: function() {
      var panel,
          objective,
          title,
          badCircle,
          goodCircle,
          goodText,
          badText,
          goodObj,
          badObj,
          play,
          playBtn,
          panel_tween_in,
          play_tween_in,
          current_level = this.levelData.level,
          current_round = this.levelData.round,
          goal = this.levelData.levels[current_level].round[current_round].goal,
          timer = this.levelData.levels[current_level].round[current_round].timer,
          capture = this.levelData.levels[current_level].goodObj,
          avoid = this.levelData.levels[current_level].badObj;

      // Add Text Styling
      var titleText = { font: "bold 36px Arial", fill: "#fff", align: "center"},
          objectiveText = { font: "bold 24px Arial", fill: "#000", align: "left", wordWrap: true, wordWrapWidth: (this.game.width/4)*3 -100},
          bugText = { font: "bold 24px Arial", fill: "#fff", align: "center"};

      // Add background for level
      this.game.add.sprite(0,0, this.levelData.levels[current_level].country);

      // Create Panel Group
      this.panelGroup = this.game.add.group();
      this.panelGroup.alpha = 0;

      // Create Panel
      panel = this.panelGroup.create(this.game.width/2, this.game.height/2, 'panel');
      panel.anchor.setTo(0.5,0.5);
      panel.width = (this.game.width/4)*3;
      panel.height = this.game.height;

      // Add Title to panel
      title = this.game.add.text(this.world.centerX, 90,"Objective",titleText);
      title.anchor.setTo(0.5);
      this.panelGroup.add(title);

      // Add Objective to panel
      objective = this.game.add.text((this.game.width - (this.game.width/4)*3)/2 + 60, 165,
        "You have " + timer + " seconds to capture as many " + capture  + " as possible.  Avoid the " + avoid + " at all cost; or the round is over.  You need to capture " + goal + " " + capture + " to advance to the next level." , objectiveText);
      this.panelGroup.add(objective);

      // Add Good Circle and Bug to Group
      goodCircle = this.game.add.graphics(50,70);
      goodCircle.lineStyle(6, 0xFFFFFF);
      goodCircle.beginFill(0x96C302, 1);
      goodCircle.drawCircle(300, 300, 200);
      this.panelGroup.add(goodCircle);

      goodObj = this.panelGroup.create(this.world.centerX - 130, this.world.centerY + 100, this.levelData.levels[current_level].goodObj);
      goodObj.anchor.setTo(0.5, 0.5);
      // this.panelGroup.add(goodObj);

      goodText = this.game.add.text(this.world.centerX - 130, this.world.centerY + 35,"Capture",bugText);
      goodText.anchor.set(0.5);
      this.panelGroup.add(goodText);

      // Add Bad Circle and Bug to Group
      badCircle = this.game.add.graphics(300, 70);
      badCircle.lineStyle(6, 0xFFFFFF);
      badCircle.beginFill(0xD45556, 1);
      badCircle.drawCircle(300, 300, 200);
      this.panelGroup.add(badCircle)

      badText = this.game.add.text(this.world.centerX + 115, this.world.centerY + 35,"Avoid",bugText);
      badText.anchor.set(0.5);
      this.panelGroup.add(badText);

      badObj = this.panelGroup.create(this.world.centerX + 115, this.world.centerY + 100, this.levelData.levels[current_level].badObj);
      badObj.anchor.setTo(0.5, 0.5);

      // Add Start Button
      this.playGroup = this.game.add.group();
      this.playGroup.x = this.game.width;

      playBtn = this.panelGroup.create(this.game.width + 20, this.game.height /2,'game_play_btn');
      playBtn.anchor.setTo(1, 0.5);
      playBtn.inputEnabled = true;
      playBtn.events.onInputDown.addOnce(this.fadeOut, this);
      this.playGroup.add(playBtn);

      // Start tween fade in
      panel_tween_in = this.game.add.tween(this.panelGroup).to({ alpha: 1 }, 1250, Phaser.Easing.Linear.None, true, 100);

      // Start Button bounce in
      play_tween_in = this.game.add.tween(this.playGroup).to({ x: 0 }, 1250, Phaser.Easing.Bounce.InOut, true, 500);      

    },
    
    fadeOut: function() {
      var panel_tween_out = this.game.add.tween(this.panelGroup).to({ alpha: 0 }, 1250, Phaser.Easing.Linear.None, true, 100);
      var play_tween_out = this.game.add.tween(this.playGroup).to({ x: this.game.width }, 1250, Phaser.Easing.Linear.None, true, 100);
      
      panel_tween_out.onComplete.add(this.startGame, this);
    },

    startGame: function () {
      this.game.state.start('Game', true, false, this.levelData);
    },

    update: function() {
      
    }
};