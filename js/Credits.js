Critterer.GameOver = function (game) {
};

Critterer.GameOver.prototype = {

    init: function(levelData) {
        this.levelData = levelData;
    },
    
    preload: function () {
        this.panel = null;
        this.preload_bar = null;
        this.loader_lbl = null;
        this.game_play_btn = null;
        this.ready = false;
    },

    create: function (game, parent) {

        // Get background for level
        this.background = this.game.add.sprite(0,0, this.levelData.levels[this.levelData.level].background);
        this.background.width = this.game.width;

        // Draw mask
        var backgroundColor = "0xffffff";
        var backgroundOpacity = 0.5;
        this.end_bg = this.add.graphics(0,0);
        this.end_bg.beginFill(backgroundColor, backgroundOpacity);
        this.end_bg.x = 0;
        this.end_bg.y = 0;
        this.end_bg.drawRect(0, 0, this.game.width, this.game.height);

        // Add the panel
        this.panel = this.add.sprite(game.width/2, game.height/2, 'panel');
        this.panel.anchor.setTo(0.5, 0.5);
        this.panel.width = (this.game.width/4)*3;
        this.panel.height = this.game.height;
    
        // Add text
        this.endText = this.add.text(this.panel.x, this.panel.y - 175, 'Game Over');
        this.endText.anchor.setTo(0.5, 0.5);

        // Add stars
        this.star = this.game.add.sprite(
            this.panel.x - 115,
            this.panel.y - 50,
            'star-empty');
        this.star.anchor.setTo(0.5, 0.5);
        this.star1 = this.game.add.sprite(
            this.panel.x,
            this.panel.y - 50,
            'star-empty');
        this.star1.anchor.setTo(0.5, 0.5);
        this.star2 = this.game.add.sprite(
            this.panel.x + 115,
            this.panel.y - 50,
            'star-empty');
        this.star2.anchor.setTo(0.5, 0.5);

        // Add points
        this.score = this.add.text(this.panel.x, this.panel.y +15, this.game.score);

        // Add menu button
        this.btnMenu = this.game.add.button(
            this.panel.x - 150,
            this.panel.y + 125,
            'menu_btn',
            function(){
            this.game.state.start('MainMenu')
        }, this);
        this.btnMenu.anchor.setTo(0.5, 0.5);

        // // Add replay button
        this.btnReplay = this.game.add.button(
            this.panel.x,
            this.panel.y + 125,
            'restart_btn',
            function(){
            this.game.state.start('Game', true, false, this.levelData);
        }, this);
        this.btnReplay.anchor.setTo(0.5, 0.5)
        
        // // Add replay button
        this.btnNext = this.game.add.button(
            this.panel.x + 150,
            this.panel.y + 125,
            'next_btn',
            function(){
            this.game.state.start('LevelMaster', true, false, this.levelData);
        }, this);
        this.btnNext.anchor.setTo(0.5, 0.5)
        
    },
    
    update: function () {
        this.ready = true;
    }
}