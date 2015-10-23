/**
 * Game logic
 * @param game
 * @constructor
 * @todo refactor initial game settings into constructor, and level handler (e.g. gravity, fireRate, etc)
 */
Critterer.Game = function (game) {

    // establish class wide scope variables
    //this.good_objects;
    //this.bad_objects;
    this.slashes;
    this.line;
    this.scoreLabel;
    this.points = [];
    this.anim;
};

var PausePanel = function(game, parent){
	// Super call to Phaser.Group
	Phaser.Group.call(this, game, parent);

	// Add the panel
	this.panel = this.create(this.game.width/2, 10, 'panel');
	this.panel.anchor.setTo(0.5, 0.5);

	// Add text
	this.pauseText = this.game.add.text(this.panel.x, this.panel.y - 90, 'Pause');
	this.pauseText.anchor.setTo(0.5, 0.5)
	this.add(this.pauseText);


	// Add play button
	this.btnPlay = this.game.add.button(
	    this.panel.x,
	    this.panel.y + 30,
	    'game_play_btn',
	    function(){
		this.game.state.getCurrentState().unpause()
	}, this);
	this.btnPlay.anchor.setTo(0.5, 0.5)
	this.add(this.btnPlay);

	// Place it out of bounds
	this.x = 0;
	this.y = -200;


    // Add Main Menu button
	this.btnMenu = this.game.add.button(
	    this.panel.x - 150,
	    this.btnPlay.y,
	    'menu_btn',
	    function(){
		this.game.state.start('MainMenu');
	}, this);
	this.btnMenu.anchor.setTo(0.5, 0.5)
	this.add(this.btnMenu);

	// Place it out of bounds
	this.x = 0;
	this.y = -200;


    // Add Restart button
	this.btnRestart = this.game.add.button(
	    this.panel.x + 150,
	    this.btnPlay.y,
	    'restart_btn',
	    function(){
		this.game.state.start('Game');
	}, this);
	this.btnRestart.anchor.setTo(0.5, 0.5)
	this.add(this.btnRestart);

	// Place it out of bounds
	this.x = 0;
	this.y = -200;
};

PausePanel.prototype = Object.create(Phaser.Group.prototype);
PausePanel.constructor = PausePanel;

PausePanel.prototype.show = function(){
	this.game.add.tween(this).to({y:this.game.height/2}, 500, Phaser.Easing.Bounce.Out, true);
};
PausePanel.prototype.hide = function(){
	this.game.add.tween(this).to({y:-200}, 200, Phaser.Easing.Linear.NONE, true);
};

Critterer.Game.prototype = {
    

    preload: function () {

    },
    
    create: function () {
        this.score = 0;
        this.fireRate = 1000;
        this.nextFire = 0;
        this.paused = false;
        this.last_paused = false;
        
        //add background before other objects
        this.addBackground();
        
        //Makes the gravity system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 300;

        //creating groups of bugs
        good_objects = this.createGroup(4,'good');
        good_objects.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4], 15, true);
        good_objects.callAll('animations.play', 'animations', 'spin');
        bad_objects = this.createGroup(4, 'bad');
        bad_objects.callAll('animations.add', 'animations', 'walk',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 10, true);
        bad_objects.callAll('animations.play', 'animations', 'walk');
        
        slashes = this.add.graphics(0, 0);
        
        //Puts the label at the top of the screen
        scoreLabel = this.add.text(10, 10, 'Tip: get the green ones!');
        scoreLabel.fill = 'white';

        //gameoverpopup.fill = 'white';
        
        // Add a pause button
	this.btnPause = this.game.add.button(20, 20, 'btnPause', this.pauseGame, this);
        this.btnPause.inputEnabled = true;
        this.btnPause.events.onInputDown.addOnce(this.pauseGame, this);

	    // Let's build a pause panel
	    this.pausePanel = new PausePanel(this.game);
	    this.game.add.existing(this.pausePanel);
	this.pausePanel.hide();
    
        var launchX = Math.random() * 4;

        this.throwObject(launchX);
       
    },
    
    //function to add background
    addBackground: function(){
        // @todo Add borders to background
        
    },
    
    pauseGame: function(){
	   if(!this.paused){
           console.log("And we're trying to pause!");
		  // Show panel
		  this.paused = true;
		  this.pausePanel.show();
		  this.btnPause.alpha = 0;
          this.game.physics.arcade.gravity.x = 0;
           this.game.physics.arcade.gravity.y = 0;
           this.game.physics.arcade.gravity.z = 0;
	   }
    },

    unpause: function() {
        if(this.paused){
            this.paused = false;
            this.pausePanel.hide();
            this.btnPause.alpha = 1;
        }
        this.physics.arcade.gravity.y = 300;
    },

    //Used for making a group of sprites (In our case, bugs)
    createGroup: function (num, sprite) {
        var group = this.add.group();
        group.enableBody = true;
        group.physicsBodyType = Phaser.Physics.ARCADE;
        group.createMultiple(num, sprite);
        group.setAll('checkWorldBounds', true);
        group.setAll('outOfBoundsKill', true);
        return group;
        
    },
        
    //The the timer for launching bugs
    throwObject: function (launchX) {
        if (this.time.now > this.nextFire && good_objects.countDead() > 0 && bad_objects.countDead()>0) {
            this.nextFire = this.time.now + this.fireRate;
            this.throwGoodObject(launchX);
            if (Math.random()>.5) {
                this.throwBadObject(launchX);
            }
        }
        
    },

    //The bug launcher
    throwGoodObject: function (launchX) {
        var obj = good_objects.getFirstDead();
        obj.reset(this.world.centerX + Math.random() * 100 - Math.random() * 100, 600);
        obj.anchor.setTo(launchX, 0.5);
        obj.body.angularAcceleration = 100;
        this.physics.arcade.moveToXY(obj, this.world.centerX, this.world.centerY, 530);
    },
    
    throwBadObject: function(launchX) {
        var obj = bad_objects.getFirstDead();
        obj.reset(this.world.centerX + Math.random()*100 - Math.random()*100, 600);
	    obj.anchor.setTo(launchX, 0.5);
	    obj.body.angularAcceleration = 100;
	    this.physics.arcade.moveToXY(obj, this.world.centerX, this.world.centerY, 530);
    },
    

    update: function () {

        var num = Math.floor(Math.random() * 99) + 1; // this will get a number between 1 and 99;
        num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases

        if(!this.paused) {
            this.throwObject();
        }

        //This holds points for touchscreen movement
        //var points = [];

        this.points.push({
            x: this.input.x,
            y: this.input.y
        });
        this.points = this.points.splice(this.points.length - 10, this.points.length);

        if (this.points.length < 1 || this.points[0].x == 0) {
            return;
        }

        //For animation following you movement on the touchscreen.
        slashes.clear();
        slashes.beginFill(0xFFFFFF);
        slashes.alpha = .5;
        slashes.moveTo(this.points[0].x, this.points[0].y);
        for (var i = 1; i < this.points.length; i++) {
            slashes.lineTo(this.points[i].x, this.points[i].y);
        }
        slashes.endFill();

        //For handling collisions with an object
        if(!this.paused) {
            for (var i = 1; i < this.points.length; i++) {
                line = new Phaser.Line(this.points[i].x, this.points[i].y, this.points[i - 1].x, this.points[i - 1].y);

                good_objects.forEachExists(this.checkIntersects, this);
                bad_objects.forEachExists(this.checkIntersects, this);
            }
        }
        
        if(this.paused) {
            good_objects.forEachExists(this.holdFruit, this);
            bad_objects.forEachExists(this.holdFruit, this);
        }
        
        if(!this.paused && this.last_paused) {
            good_objects.forEachExists(this.dropFruit, this);
            bad_objects.forEachExists(this.dropFruit, this);
        }
        
        this.last_paused = this.paused;
    },

    // Validates a target hit
    // note: that it currently detects intersection of the mouse with the full
    // width and height of the object, so circles have a square shaped intersection
    // @todo find way to detect intersect with oddly shaped objects
    checkIntersects: function (fruit, callback) {
        var l1 = new Phaser.Line(fruit.body.right - fruit.width, fruit.body.bottom - fruit.height, fruit.body.right, fruit.body.bottom);
        var l2 = new Phaser.Line(fruit.body.right - fruit.width, fruit.body.bottom, fruit.body.right, fruit.body.bottom - fruit.height);
        l2.angle = 90;

        contactPoint = new Phaser.Point(0, 0);


        if (Phaser.Line.intersects(line, l1, true) ||
            Phaser.Line.intersects(line, l2, true)) {

            contactPoint.x = this.input.x;
            contactPoint.y = this.input.y;
            var distance = Phaser.Point.distance(contactPoint, new Phaser.Point(fruit.x, fruit.y));
            if (Phaser.Point.distance(contactPoint, new Phaser.Point(fruit.x, fruit.y)) > 110) {
                return;
            }

            if (fruit.parent == good_objects) {
                this.killFruit(fruit);
            } else {
                this.resetScore();
            }
        }

    },
    
    holdFruit: function(fruit, callback) {
        fruit.paused = true;
    },
    
    dropFruit: function(fruit, callback) {
        fruit.paused = false;
    },

    //Handles resetting the high score (and thus, the game)
    resetScore: function () {
        var highscore = Math.max(this.score, localStorage.getItem("highscore"));
        localStorage.setItem("highscore", highscore);

        good_objects.forEachExists(this.killFruit);
        bad_objects.forEachExists(this.killFruit);

        this.score = 0;
        scoreLabel.text = 'Game Over!\nHigh Score: ' + highscore;
        this.state.start('GameOver')
    },

    // @todo animate objects toward a backpack (shrink, spin, fade-out)
    killFruit: function (fruit) {
        fruit.kill();
        points = [];
        this.score++;
        scoreLabel.text = 'Score: ' + this.score;
        
        if(this.score == 10) {
            this.state.start('CutScene');
        }
    }
    
        
}; 
