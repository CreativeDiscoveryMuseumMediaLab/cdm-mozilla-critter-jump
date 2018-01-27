/**
 * Game logic
 * @param game
 * @constructor
 * @todo refactor initial game settings into constructor, and level handler (e.g. gravity, fireRate, etc)
 */
Critterer.Game = function (game, parent) {

    // establish class wide scope variables
    this.good_objects;
    this.bad_objects;
    this.slashes;
    this.line;
    this.points = [];
    this.anim;
    this.score = 0;
    this.lives = 0;
    this.capture = '';
    this.levelData,
    this.title,
    this.desc,
    this.panelMenu,
    this.bg_mask,
    this.playBtn,
    this.nextBtn,
    this.restartBtn,
    this.menuBtn,
    this.levelData;
};

var panelMenu = function(game, parent) {
	// Super call to Phaser.Group
    Phaser.Group.call(this, game, parent);

    var backgroundColor = "0xffffff",
        backgroundOpacity = 0.5;

    // Set various font styles
    var titleText = { font: "bold 36px Arial", fill: "#fff", align: "center"},
        infoText = { font: "bold 24px Arial", fill: "#000", align: "left", wordWrap: true, wordWrapWidth: (this.game.width/4)*3 -100};

    // Add background bg_mask
    this.bg_mask = this.game.add.graphics(0,0);
    this.bg_mask.beginFill(backgroundColor, backgroundOpacity);
    this.bg_mask.x = 0;
    this.bg_mask.y = 0;
    this.bg_mask.drawRect(0, 0, this.game.width, this.game.height);
    this.add(this.bg_mask);

    // Add panel
    this.panel = this.create(0,0, 'panel');
    this.panel.anchor.setTo(0.5);
	this.panel.x = this.game.width/2;
	this.panel.y = this.game.height/2;
    this.add(this.panel);
    
    // Add header
	this.title = this.game.add.text(0,0, '', titleText);
	this.title.anchor.setTo(0.5)
    this.add(this.title);
    
    // Add info
    this.desc = this.game.add.text(0, 0, '', infoText);
	this.desc.anchor.setTo(0.5)
    this.add(this.desc);

    // Add play button
    this.playBtn = this.game.add.button(0, 0, 'game_play_btn');
    this.playBtn.anchor.setTo(0.5);
    this.playBtn.events.onInputDown.addOnce(function() {
        this.game.state.getCurrentState().unpause()
    }, this);
    this.add(this.playBtn);

    // Add next Button
    this.nextBtn = this.game.add.button(this.panel.x + 150, this.panel.y + 100, 'next_btn');
    this.nextBtn.anchor.setTo(0.5);
    this.nextBtn.events.onInputDown.addOnce(function() {
        this.game.state.start('LevelMaster', true, false, this.levelData)
    }, this);
    this.add(this.nextBtn);

    // Add Main Menu button
    this.menuBtn = this.game.add.button(this.panel.x - 150, this.nextBtn.y, 'menu_btn');
    this.menuBtn.anchor.setTo(0.5);
    this.menuBtn.events.onInputDown.addOnce(function() {
        this.game[this.levelData.levels[this.levelData.level].country + '_sound'].stop();
        this.game.state.start('MainMenu')
    }, this);
    this.add(this.menuBtn);

    // Add Level Restart Button
    this.restartBtn = this.game.add.button(0, 0, 'restart_btn');
    this.restartBtn.anchor.setTo(0.5);
    this.restartBtn.events.onInputDown.addOnce(function() {
        this.game.state.start('Game', true, false, this.levelData)
    }, this);
    this.add(this.restartBtn);

	// Place it out of bounds
	this.x = 0;
	this.y = -this.game.height;
}; 

panelMenu.prototype = Object.create(Phaser.Group.prototype);
panelMenu.constructor = panelMenu;

panelMenu.prototype.show = function(){
	this.game.add.tween(this).to({y:0}, 500, Phaser.Easing.Bounce.Out, true);
	this.game.add.tween(this.bg_mask).to({alpha: 1}, 500, Phaser.Easing.Bounce.Out, true);
};

panelMenu.prototype.hide = function(){
	this.game.add.tween(this).to({y: this.game.height * -1.5}, 200, Phaser.Easing.Linear.NONE, true);
};
panelMenu.prototype.updateEndMenu = function(status, bug, count, level){
    var stat = '',
        desc = '',
        centerX = this.game.width / 2,
        centerY = this.game.height / 2;

    // Pass in level Data
    this.levelData = level;

    // Update panel size
    this.panel.width = (this.game.width/4) * 3;
    this.panel.height =this.game.height;

    // disable next level button
    this.nextBtn.enabled = true;
    this.nextBtn.visible = true;

    // Show, move, and enable play button
    this.playBtn.enabled = false;
    this.playBtn.visible = false;

    // Move restart Button
    this.restartBtn.enabled = true;
    this.restartBtn.visible = true;
    this.restartBtn.x = centerX + 75;
    this.restartBtn.y = centerY + 100;

    // Enable and show menu button
    this.menuBtn.visible = true;
    this.menuBtn.enabled = true;
    this.menuBtn.x = centerX - 75;
    this.menuBtn.y = centerY + 100;

    if (status == "win") {
        desc = 'Congratulations!  You caught ' + count + ' ' + bug +'.  Let\'s See how many more critters we can catch.';
        stat = 'Winner!';

        this.nextBtn.enabled = true;
        this.nextBtn.visible = true;
        
        this.restartBtn.x = centerX;
        this.restartBtn.y = centerY + 100;

        this.menuBtn.x = centerX - 150;
        this.menuBtn.y = centerY + 100;

        // Enable on win/disable on lose next level button
        this.nextBtn.x = centerX + 150;
        this.nextBtn.y = centerY + 100;

    } else if (status == 'lose') {
        desc = 'Oh No!  You broke all of your nets.  Let\'s give it another try.';
        stat = 'Good Try!';
        
        this.nextBtn.enabled = false;
        this.nextBtn.visible = false;

    } else {
        desc = 'Time\'s up!  There just aren\'t enough hours in a day.  Why don\'t we get up bright and early tomorrow and try again.';
        stat = 'Time\'s up!';
    }

        // Update Title position and text
        this.title.x = centerX;
        this.title.y = centerY - 180;
        this.title.text = stat;
    
        //update description
        this.desc.x = centerX;
        this.desc.y = centerY - 60;
        this.desc.text = desc;
};

panelMenu.prototype.updatePauseMenu = function(level){

    this.levelData = level;

    var centerX = this.game.width / 2,
        centerY = this.game.height / 2;

    // Update panel size
    this.panel.width = centerX;
    this.panel.height = centerY;

    // Update Title position and text
    this.title.x = centerX;
    this.title.y = centerY - 85;
    this.title.text = 'Pause';

    // Show, move, and enable play button
    this.playBtn.x = centerX;
    this.playBtn.y = centerY + 30;
    this.playBtn.enabled = true;
    this.playBtn.visible = true;

    // Move Menu button
    this.menuBtn.x = centerX - 150;    
    this.menuBtn.y = centerY + 30;
    this.menuBtn.enabled = true;
    this.menuBtn.visible = true;

    // Move restart Button
    this.restartBtn.x = centerX + 150;
    this.restartBtn.y = centerY + 30;
    this.restartBtn.enabled = true;
    this.restartBtn.visible = true;

    // Disable and hide next level button
    this.nextBtn.enabled = false;
    this.nextBtn.visible = false;
}

Critterer.Game.prototype = {
    init: function(levelData) {
        this.levelData = levelData;
    },
    preload: function () {
        var logo;
        var tween;
        this.current_level = this.levelData.level;
        this.current_round = this.levelData.round;
        this.goal = this.levelData.levels[this.current_level].round[this.current_round].goal;
        this.lives = this.levelData.levels[this.current_level].round[this.current_round].nets;
        this.timer = this.levelData.levels[this.current_level].round[this.current_round].timer;
        this.timerTotal = this.levelData.levels[this.current_level].round[this.current_round].timer;
    },
    
    create: function () {

        this.whoosh = this.game.add.audio('whoosh');

        this.background = this.add.sprite(0, 0, this.levelData.levels[this.levelData.level].country);
        this.background.width = this.game.width + 8;

        this.score = 0;
        this.fireRate = 1000;
        this.nextFire = 0;
        this.nextSec = 0;
        this.paused = true;
        this.last_paused = false;
        this.countDown = 4;

        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'three');
        this.logo.anchor.setTo(0.5);
        this.logo.alpha = 1;
        //  Create our tween. This will fade the sprite to alpha 1 over the duration of 2 seconds
        tween = this.game.add.tween(this.logo).to( { alpha: 1 }, 1250, Phaser.Easing.alpha, true, 0, this.countDown);
        
        tween.onStart.add(this.onStart, this);
        tween.onLoop.add(this.onLoop, this);
        tween.onComplete.add(this.onComplete, this);
        
        //add score
        this.scoreboard = this.game.add.sprite(20,20,'scoreboard');
        this.scoreboard.scale.setTo(.18);

        //add timer
        this.blank = this.game.add.sprite(58, this.game.height/2 + 90, 'blank');
        this.blank.scale.setTo(.25, .23);
        this.blank.anchor.setTo(0.5,1);

        this.watch = this.game.add.sprite(59, this.game.height/2 + 90, 'timeBar');
        this.watch.scale.setTo(.25, .23);
        this.watch.anchor.setTo(0.5,1);

        this.timerBar = this.game.add.sprite(60, this.game.height/2 -30,'watch');
        this.timerBar.scale.setTo(.225);
        this.timerBar.anchor.setTo(0.5);

        this.clock = this.game.add.sprite(0,this.timerBar.height + 180,'clock');
        this.clock.scale.setTo(2.2);
        this.clock.anchor.setTo(0.5,0);

        this.timerBar.addChild(this.clock);

        //add Jar
        this.captured = this.game.add.group();
        this.jar = this.captured.create(this.game.width, this.game.height, 'jar');
        this.jar.anchor.setTo(1);
        this.jar.scale.setTo(.08);
        this.capturedBug = this.captured.create(this.game.width - 75, this.game.height - 15, this.levelData.levels[this.levelData.level].goodObj);
        this.capturedBug.anchor.setTo(0,1);
        this.capturedBug.scale.setTo(.6);
        
        //add net
        this.net = this.game.add.sprite(this.game.width + 120, this.game.height + 45, 'net');
        this.net.anchor.setTo(1);
        this.net.angle = 5;
        
        // add lives
        this.life_icons = []
        for (var i =0; i < this.lives; i++ ){
            this.lifeGroup = this.game.add.group();
            var life = this.game.add.graphics(this.game.width - (i*70) - 50, 60);
                life.beginFill(0xD45556, 1);
                life.drawCircle(0, 0, 60);
                this.lifeGroup.add(life);

            var icon = this.lifeGroup.create(this.game.width - (i* 70) - 45, 60, 'net');
                icon.anchor.setTo(0.5);
                icon.scale.setTo(.1);
                icon.angle = 5;
            this.life_icons.push(this.lifeGroup);
        }
        console.log(this.life_icons);

        
        //Makes the gravity system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 300;

        //creating groups of bugs
        good_objects = this.createGroup(4,this.levelData.levels[this.levelData.level].goodObj);
        bad_objects = this.createGroup(4, this.levelData.levels[this.levelData.level].badObj);

        slashes = this.add.graphics(0, 0);
        
        //Puts the label at the top of the screen
        scoreLabel = this.add.text(125, 47, this.score + ' / ' + this.goal);
        scoreLabel.fill = 'white';
        
        // Add a pause button
	    this.btnPause = this.game.add.button(5, this.game.height - 110, 'btnPause', this.pauseGame, this);
        this.btnPause.inputEnabled = true;
        this.btnPause.scale.setTo(1.3);
        this.btnPause.events.onInputDown.addOnce(this.pauseGame, this);
        
        // Build panel
        this.panelMenu = new panelMenu(this.game);
	    this.game.add.existing(this.panelMenu);
	    this.panelMenu.hide();
    
        var launchX = Math.random() * 4;

        this.throwObject(launchX);
    },

    // Set time between countdown tweens to 0
    onStart: function() {
        tween.delay(0);
    },
    
    // Loop through countdown
    onLoop: function() {
        this.countDown--;

        if (this.countDown === 3) {
            
            this.logo.loadTexture('two')

        } else if (this.countDown === 2) {
            
            this.logo.loadTexture('one');

        } else if (this.countDown === 1) {
            this.logo.loadTexture('go');
        } else {
            this.logo.destroy();
        }
    },
    
    // Unpause game after countdown
    onComplete: function() {
        this.paused = false;
    },
    
    // Pause Game
    pauseGame: function(){
        if(!this.paused){
            
            this.music.pause();
            this.game[this.levelData.levels[this.levelData.level].country + '_sound'].pause();
            this.paused = true;
            this.panelMenu.updatePauseMenu(this.levelData);
            this.panelMenu.show();
            this.btnPause.alpha = 0;
            this.game.physics.arcade.gravity.x = 0;
            this.game.physics.arcade.gravity.y = 0;
            this.game.physics.arcade.gravity.z = 0;
	   }
    },

    // Unpause Game
    unpause: function() {
        if(this.paused){

            this.game[this.levelData.levels[this.levelData.level].country + '_sound'].resume();
            this.paused = false;
            this.panelMenu.hide();
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

    //countdown
    timeLeft: function() {

        if(this.time.now > this.nextSec) {
            this.nextSec = this.time.now + 1000;
            this.timer--;
            this.add.tween(this.watch.scale).to({ x: .25, y: .22 * (this.timer/this.timerTotal)}, 0, Phaser.Easing.linear, true, 0);
            if(this.timer < 0) {
                this.resetScore();
            }
        }
    },

    endOfRound: function() {

        this.paused = true;
        this.panelMenu.show();
        this.game.physics.arcade.gravity.x = 0;
        this.game.physics.arcade.gravity.y = 0;
        this.game.physics.arcade.gravity.z = 0;
    },

    update: function(){

        var num = Math.floor(Math.random() * 99) + 1; // this will get a number between 1 and 99;
        num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases

        if(!this.paused) {
            this.throwObject();
            this.timeLeft();
        }

        //This holds points for touchscreen movement
        var points = [];

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
            good_objects.forEachExists(this.holdBug, this);
            bad_objects.forEachExists(this.holdBug, this);
        }
        
        if(!this.paused && this.last_paused) {
            good_objects.forEachExists(this.dropBug, this);
            bad_objects.forEachExists(this.dropBug, this);
        }
        
        this.last_paused = this.paused;
    },

    // Validates a target hit
    // note: that it currently detects intersection of the mouse with the full
    // width and height of the object, so circles have a square shaped intersection
    // @todo find way to detect intersect with oddly shaped objects
    checkIntersects: function (bug, callback) {
        var l1 = new Phaser.Line(bug.body.right - bug.width, bug.body.bottom - bug.height, bug.body.right, bug.body.bottom);
        var l2 = new Phaser.Line(bug.body.right - bug.width, bug.body.bottom, bug.body.right, bug.body.bottom - bug.height);
        l2.angle = 90;

        contactPoint = new Phaser.Point(0, 0);


        if (Phaser.Line.intersects(line, l1, true) ||
            Phaser.Line.intersects(line, l2, true)) {

            contactPoint.x = this.input.x;
            contactPoint.y = this.input.y;
            var distance = Phaser.Point.distance(contactPoint, new Phaser.Point(bug.x, bug.y));
            if (Phaser.Point.distance(contactPoint, new Phaser.Point(bug.x, bug.y)) > 110) {
                return;
            }

            if (bug.parent == good_objects) {
                this.killBug(bug,"good");
            } else {
                this.lives--;
                console.log(this.lives);
                this.killBug(bug);
                this.life_icons[this.lives].visible = false;
                if (this.lives <= 0){
                    this.resetScore();
                } 
            }
            this.whoosh.play();
        }
    },
    
    holdBug: function(bug, callback) {
        bug.paused = true;
    },
    
    dropBug: function(bug, callback) {
        bug.paused = false;
    },

    //Handles resetting the score (and thus, the game)
    resetScore: function () {
        var status = '';

        if (this.score >= this.goal && this.lives > 0){
            status = 'win'
            this.levelData[this.levelData.levels[this.levelData.level].goodObj]+=this.score;
        } else {
            status = 'lose'
        }

        this.panelMenu.updateEndMenu(
            status,
            this.levelData.levels[this.levelData.level].goodObj,
             this.score,
             this.levelData
        );


        this.endOfRound();
        
        good_objects.forEachExists(this.killBug);
        bad_objects.forEachExists(this.killBug);

        this.score = 0;
        scoreLabel.text = this.score + ' / ' + this.goal; 
    },

    killBug: function (bug, type) {
        if (type == 'good'){
            points = [];
            this.score++;
            scoreLabel.text = this.score + ' / ' + this.goal;
        }
        bug.kill();

    }
}; 
