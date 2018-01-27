/**
 * Declare MainMenu class
 * @param game
 * @constructor
 */
Critterer.LevelMaster = function(game) {

};
  
Critterer.LevelMaster.prototype = {
    init: function(levelData) {
        var levels = this.cache.getJSON('levels');
  
        if (!levelData) {
            levelData = {
                level: -1,
                round: -1,
                score: 0,
                cockroaches: 0,
                scorpions: 0,
                "walking sticks": 0,
                levels: levels
            };
        }
  
        this.levelData = levelData;
    },
    
    create: function() {
        this.decideLevelState();
    },

    decideLevelState: function() {

        // If current level == number of levels && current round == number of rounds
        if (this.levelData.level == (this.levelData.levels.length - 1) && 
            this.levelData.round == (this.levelData.levels[this.levelData.level].round.length - 1)) {
            this.game.state.start('Winner', true, false, this.levelData);

            // If current level is -1 Or current round == number of rounds
        }  else if (this.isFirstLevel() || this.levelData.round == (this.levelData.levels[this.levelData.level].round.length - 1)) {
            this.nextLevel();
        }  else {
            this.nextRound();
        }
    },

    nextLevel: function() {
        this.levelData.level++;

        this.levelData.score = 0;

        this.levelData.round = 0;
        this.game.state.start('LevelIntro', true, false, this.levelData);
    },

    nextRound: function() {
        this.levelData.round++;
        this.game.state.start('FunFacts', true, false, this.levelData);
    },

    isFirstLevel: function() {
        return this.levelData.level === -1;
    }

  };