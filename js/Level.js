// js/Level.js
Critterer.Level = function(game){
   this.good_objects,
		this.bad_objects,
		this.slashes,
		this.line,
		this.scoreLabel;
		this.score = 0;
        this.points = [];	
        this.fireRate = 1000;
        this.nextFire = 0;
        this.contactPoint = new Phaser.Point(0,0);
   
};

Critterer.Level.prototype = {
    
    
  preload: function() {
       
    
  },
    
  create: function() {
      
    var bmd = this.add.bitmapData(100,100);
	bmd.ctx.fillStyle = '#00ff00';
	bmd.ctx.arc(50,50,50, 0, Math.PI * 2);
	bmd.ctx.fill();
	this.cache.addBitmapData('good', bmd);

	var bmd = this.add.bitmapData(64,64);
	bmd.ctx.fillStyle = '#ff0000';
	bmd.ctx.arc(32,32,32, 0, Math.PI * 2);
	bmd.ctx.fill();
	this.cache.addBitmapData('bad', bmd);
    
      
    this.physics.startSystem(Phaser.Physics.ARCADE);
	this.physics.arcade.gravity.y = 300;

	good_objects = this.createGroup(4, this.cache.getBitmapData('good'));
	bad_objects = this.createGroup(4, this.cache.getBitmapData('bad'));

	slashes = this.add.graphics(0, 0);

	scoreLabel = this.add.text(10,10,'Tip: get the green ones!');
	scoreLabel.fill = 'white';

	//emitter = this.add.emitter(0, 0, 300);
	//emitter.makeParticles('ball');
	//emitter.gravity = 300;
	//emitter.setYSpeed(-400,400);

	this.throwObject();
  },
    
  createGroup: function(numItems, sprite) {
	var group = this.add.group();
	group.enableBody = true;
	group.physicsBodyType = Phaser.Physics.ARCADE;
	group.createMultiple(numItems, sprite);
	group.setAll('checkWorldBounds', true);
	group.setAll('outOfBoundsKill', true);
	return group;
},

  throwObject: function() {
      console.log(this.nextFire);
      //console.log('Can you even get here?');
	if (this.time.now > this.nextFire && good_objects.countDead()>0 && bad_objects.countDead()>0) {
		this.nextFire = this.time.now + this.fireRate;
        
		this.throwGoodObject();
		//if (Math.random()>.5) {
			//this.throwBadObject();
		//}
	}
},

throwGoodObject: function() {
    console.log('Are you even trying?');
	var obj = good_objects.getFirstDead();
	obj.reset(this.world.centerX + Math.random()*100-Math.random()*100, 600);
	obj.anchor.setTo(0.5, 0.5);
	//obj.body.angularAcceleration = 100;
	this.physics.arcade.moveToXY(obj, this.world.centerX, this.world.centerY, 530);
},

/*throwBadObject: function() {
	var obj = bad_objects.getFirstDead();
	obj.reset(this.world.centerX + Math.random()*100-Math.random()*100, 600);
	obj.anchor.setTo(0.5, 0.5);
	//obj.body.angularAcceleration = 100;
	this.physics.arcade.moveToXY(obj, this.world.centerX, this.world.centerY, 530);
},*/

  update: function() {
    this.throwObject();
      
      var points = [];

	points.push({
		x: this.input.x,
		y: this.input.y
	});
	points = points.splice(points.length-10, points.length);
	//this.add.sprite(this.input.x, this.input.y, 'hit');

	if (points.length<1 || points[0].x==0) {
		return;
	}

	slashes.clear();
	slashes.beginFill(0xFFFFFF);
	slashes.alpha = .5;
	slashes.moveTo(points[0].x, points[0].y);
	for (var i=1; i<points.length; i++) {
		slashes.lineTo(points[i].x, points[i].y);
	} 
	slashes.endFill();

	for(var i = 1; i< points.length; i++) {
		line = new Phaser.Line(points[i].x, points[i].y, points[i-1].x, points[i-1].y);
		this.debug.geom(line);

		good_objects.forEachExists(checkIntersects);
		bad_objects.forEachExists(checkIntersects);
	}
  },


checkIntersects: function(fruit, callback) {
	var l1 = new Phaser.Line(fruit.body.right - fruit.width, fruit.body.bottom - fruit.height, fruit.body.right, fruit.body.bottom);
	var l2 = new Phaser.Line(fruit.body.right - fruit.width, fruit.body.bottom, fruit.body.right, fruit.body.bottom-fruit.height);
	l2.angle = 90;

	if(Phaser.Line.intersects(line, l1, true) ||
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

resetScore: function() {
	var highscore = Math.max(score, localStorage.getItem("highscore"));
	localStorage.setItem("highscore", highscore);

	good_objects.forEachExists(killFruit);
	bad_objects.forEachExists(killFruit);

	score = 0;
	scoreLabel.text = 'Game Over!\nHigh Score: '+highscore;
	// Retrieve
}

}; 