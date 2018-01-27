/**
 * Declare Preloader Class
 * @param game
 * @constructor
 */
Critterer.Preloader = function(game) {
    this.preload_bar = null;
    this.loader_lbl = null;
    this.game_play_btn = null;
    this.ready = false;
};

Critterer.Preloader.prototype = {

    /**
     * Implements preload()
     * preload all remaining game assets
     */
    preload: function () {
        this.load.json('levels', 'levels.json');
        this.background = this.add.sprite(0, 0, 'madagascar');
        this.loader_lbl = this.add.text(
            this.world.centerX,
            this.world.centerY - 50,
            "",
            {
                size: "32px",
                fill: "#FFF",
                align: "center"
            }
        );
        this.loader_lbl.anchor.setTo(0.5,0.5);

        this.preload_bar = this.add.sprite(this.world.centerX, this.world.centerY +50, 'preload_bar');
        this.preload_bar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preload_bar);

        // pre load assets for the rest of the game (e.g. Main Menu, Game, etc.)
        
        // Bugs
        this.load.image('scorpions', 'img/sprites/scorpion.png');
        this.load.image('flies', 'img/sprites/fly.png');
        this.load.image('cockroaches', 'img/sprites/cockroach.png');
        this.load.image('ants', 'img/sprites/ant.png');
        this.load.image('walking sticks', 'img/sprites/walking-stick.png');
        this.load.image('spiders', 'img/sprites/spider.png');
        
        //Locations
        this.load.image('madagascar_logo', 'img/madagascar_logo.png');
        this.load.image('madagascar', 'img/madagascar.png');
        this.load.image('mali_logo', 'img/mali_logo.png');
        this.load.image('mali', 'img/mali.png');
        this.load.image('canada_logo', 'img/canada_logo.png');
        this.load.image('canada', 'img/canada.png');
        this.load.image('terrarium', 'img/sandlot.png');
        this.load.image('plant1','img/plant1.png');
        this.load.image('plant2','img/plant2.png');
        this.load.image('plant3','img/plant3.png');
        this.load.image('plant4','img/plant4.png');
        this.load.image('plant5','img/plant5.png');

        //Menu Buttons and other assets
        this.load.image('critterer_logo', 'img/critterer-logo.png');
        this.load.image('next_btn', 'img/hud/ffwd.png');
        this.load.image('game_play_btn', 'img/hud/play-icon.png');
        this.load.image('btnPause', 'img/hud/pause.png');
	    this.load.image('panel', 'img/hud/pause-modal.png');
	    this.load.image('restart_btn', 'img/hud/restart-icon.png');
        this.load.image('menu_btn', 'img/hud/menu-icon.png');
        this.load.image('star-empty', 'img/hud/star-empty.png');
        this.load.image('star', 'img/hud/star.png');
        this.load.image('goodObj', 'img/hud/goodbugsign.png');
        this.load.image('one','img/hud/one.png');
        this.load.image('two','img/hud/two.png');
        this.load.image('three','img/hud/three.png');
        this.load.image('go','img/hud/go.png');
        this.load.image('jar','img/hud/jar.png');
        this.load.image('net','img/hud/net.png');
        this.load.image('scoreboard','img/hud/score.png');
        this.load.image('watch','img/hud/timerHolder.png');
        this.load.image('timeBar','img/hud/timerBar.png');
        this.load.image('clock','img/hud/clock.png');
        this.load.image('blank', 'img/hud/blank.png');
        this.load.image('cdm-logo', 'img/credits/cdmlogo.png');
        this.load.image('moz-logo', 'img/credits/moz-blue.png');

        //sound and music
        this.game.load.audio('whoosh', ['audio/whoosh.mp3', 'audio/whoosh.ogg']);
        this.game.load.audio('madagascar_sound', ['audio/rainforest.mp3', 'audio/rainforest.ogg']);
        this.game.load.audio('mali_sound', ['audio/desert.mp3', 'audio/desert.ogg']);
        this.game.load.audio('canada_sound', ['audio/forest.mp3', 'audio/forest.ogg']);
    },

    /**
     * Implements create()
     * once all assets are loaded, we can turn off cropping preload bar
     */
    create: function () {
        this.preload_bar.cropEnabled = false;
        this.loader_lbl.setText("Loading . . .");

        this.game.madagascar_sound = this.game.add.audio('madagascar_sound',1,true);
        this.game.madagascar_sound.addMarker('madagascar_start', 0, 61, 1, true);
        this.game.madagascar_sound.volume = 0.3;

        this.game.mali_sound = this.game.add.audio('mali_sound',1,true);
        this.game.mali_sound.addMarker('mali_start', 1, 6, 1, true);
        this.game.mali_sound.volume = 0.3;

        this.game.canada_sound = this.game.add.audio('canada_sound',1,true);
        this.game.canada_sound.addMarker('canada_start', 0, 76, 1, true);
        this.game.canada_sound.volume = 0.3;
        
        this.game.madagascar_sound.play('madagascar_start', 0, 0.3, true, false);
    },

    /**
     * Implements update()
     * the update method fires constantly when the create method is complete
     * simply let the game know all assets loaded. we're ready.
     */
    update: function () {
        this.ready = true;
        this.state.start('MainMenu');
    }
}
