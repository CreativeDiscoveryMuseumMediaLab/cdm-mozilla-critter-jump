/**
 * Game logic
 * @param game
 * @constructor
 * @todo refactor initial game settings into constructor, and level handler (e.g. gravity, fireRate, etc)
 */
Critterer.Game = function (game) {

    // establish class wide scope variables
    this.good_objects;
    this.bad_objects;
    this.slashes;
    this.line;
    this.scorelabel; 
    this.gameoverpopup;
    this.points = [];

    // initial game settings
    this.score = 0;
    this.fireRate = 1000;
    this.nextFire = 0;

};

Critterer.Game.prototype = {


    preload: function () {

    },

    create: function () {

        //These are green circles that represent what will be bugs
        var bmd = this.add.bitmapData(100, 100);
        bmd.ctx.fillStyle = '#00ff00';
        bmd.ctx.arc(50, 50, 50, 0, Math.PI * 2);
        bmd.ctx.fill();
        this.cache.addBitmapData('good', bmd);
        
        //These are the red circles that will be bad, sinister bugs that end our game
        var bmd = this.add.bitmapData(64,64);
	    bmd.ctx.fillStyle = '#ff0000';
	    bmd.ctx.arc(32,32,32, 0, Math.PI * 2);
	    bmd.ctx.fill();
	    this.cache.addBitmapData('bad', bmd);

        //Makes the gravity system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 300;

        good_objects = this.createGroup(4, this.cache.getBitmapData('good'));
        bad_objects = this.createGroup(4, this.cache.getBitmapData('bad'));

        slashes = this.add.graphics(0, 0);

        //Puts the label at the top of the screen
        scorelabel = this.add.text(10, 10, 'Tip: Do not hit the red ones!');
        
        
        scorelabel.fill = 'white';
        
        if(this.score == 20) {
            this.state.start('gameoverpopup');
        }
        
        gameoverpopup = this.add.text(260, 265, 'Game Over! Please Try again!')

        gameoverpopup.fill = 'white';
        
        // Add a pause button
	    this.btnPause = this.game.add.button(20, 20, 'btnPause', this.pauseGame, this);

	    // Let's build a pause panel
	    this.pausePanel = new PausePanel(this.game);
	    this.game.add.existing(this.pausePanel);
    
        var launchX = Math.random() * 4;

        this.throwObject(launchX);
    },

    //Used for making a group of sprites (In our case, bugs)
    createGroup: function (numItems, sprite) {
        var group = this.add.group();
        group.enableBody = true;
        group.physicsBodyType = Phaser.Physics.ARCADE;
        group.createMultiple(numItems, sprite);
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
        //obj.body.angularAcceleration = 100;
        this.physics.arcade.moveToXY(obj, this.world.centerX, this.world.centerY, 530);
    },
    
    throwBadObject: function(launchX) {
	    var obj = bad_objects.getFirstDead();
        obj.reset(this.world.centerX + Math.random()*100 - Math.random()*100, 600);
	    obj.anchor.setTo(launchX, 0.5);
	    //obj.body.angularAcceleration = 100;
	    this.physics.arcade.moveToXY(obj, this.world.centerX, this.world.centerY, 530);
},

    update: function () {

        var num = Math.floor(Math.random() * 99) + 1; // this will get a number between 1 and 99;
        num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases

        this.throwObject();

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
        for (var i = 1; i < this.points.length; i++) {
            line = new Phaser.Line(this.points[i].x, this.points[i].y, this.points[i - 1].x, this.points[i - 1].y);

            good_objects.forEachExists(this.checkIntersects, this);
            bad_objects.forEachExists(this.checkIntersects, this);
        }
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

        console.log(this.input.x);

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

    //Handles resetting the high score (and thus, the game)
    resetScore: function () {
        var highscore = Math.max(this.score, localStorage.getItem("highscore"));
        localStorage.setItem("highscore", highscore);

        good_objects.forEachExists(this.killFruit);
        bad_objects.forEachExists(this.killFruit);

        this.score = 0;
        gameoverpopup.text = 'Game Over Better Luck Next Time!\nHigh Score: ' + highscore;
    },

    // @todo animate objects toward a backpack (shrink, spin, fade-out)
    killFruit: function (fruit) {
        fruit.kill();
        points = [];
        this.score++;
        scorelabel.text = 'Score: ' + this.score;
        
        if(this.score == 20) {
            this.state.start('gameoverpopup');
        }
    
    }

}; 