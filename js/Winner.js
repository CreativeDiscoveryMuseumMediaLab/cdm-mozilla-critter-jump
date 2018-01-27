Critterer.Winner = function (game) {
};

var credits = function(game, parent) {

    // Super call to Phaser.Group
    Phaser.Group.call(this, game, parent);

    var backgroundColor = "0xffffff",
        backgroundOpacity = 0.9;

    // Add background bg_mask
    this.bg_mask = this.game.add.graphics(0,0);
    this.bg_mask.beginFill(backgroundColor, backgroundOpacity);
    this.bg_mask.x = 0;
    this.bg_mask.y = 0;
    this.bg_mask.drawRect(0, 0, this.game.width, this.game.height);
    this.add(this.bg_mask);

    // Place it out of bounds
	this.x = 0;
	this.y = -this.game.height;
}

credits.prototype = Object.create(Phaser.Group.prototype);
credits.constructor = credits;

credits.prototype.show = function(){

    this.creditsPanel = this.game.add.tween(this);
    this.creditsPanel.to({y:0}, 500, Phaser.Easing.Bounce.Out, true);
    
    this.panel = this.game.add.tween(this.bg_mask);
    this.panel.to({alpha: 1}, 500, Phaser.Easing.Bounce.Out, true);
    this.panel.onComplete.add(this.cdmShow, this);

};

credits.prototype.hide = function(){
	this.game.add.tween(this).to({y: this.game.height * -1.5}, 200, Phaser.Easing.Linear.NONE, true);
};

credits.prototype.cdmShow = function() {
    
    // Set various font styles
    var titleText = { font: "bold 36px Arial", fill: "#000", align: "center"};
    var linkText = { font: "bold 36px Arial", fill: "#E19B3E", align: "center"};

    var title = this.game.add.text(this.game.width/2,-this.game.height,"Critterer brought\nto you by", titleText);
        title.anchor.setTo(0.5);

    var logo = this.game.add.sprite(this.game.width/2, this.game.height/2, "cdm-logo");
        logo.anchor.setTo(0.5);
        logo.alpha = 0;

    var title_in = this.game.add.tween(title).to({y: 100}, 1000, Phaser.Easing.Linear.NONE, true, 500);
    var logo_in = this.game.add.tween(logo).to({alpha: 1}, 2000, Phaser.Easing.Linear.NONE, true, 700);

    var title_out = this.game.add.tween(title).to({y: -this.game.height}, 500, Phaser.Easing.Linear.NONE);
        title_out.delay(3500);
    var logo_out = this.game.add.tween(logo).to({alpha: 0}, 1000, Phaser.Easing.Linear.NONE);
        logo_out.delay(2300);

    var titleMoz = this.game.add.text(this.game.width/2,-this.game.height,"Made possible by\n a grant from", titleText);
        titleMoz.anchor.setTo(0.5);

    var logoMoz = this.game.add.sprite(this.game.width/2, this.game.height/2, "moz-logo");
        logoMoz.anchor.setTo(0.5);
        logoMoz.alpha = 0;

    var titleMoz_in = this.game.add.tween(titleMoz).to({y: 100}, 1000, Phaser.Easing.Linear.NONE);
        titleMoz_in.delay(500);
    var logoMoz_in = this.game.add.tween(logoMoz).to({alpha: 1}, 2000, Phaser.Easing.Linear.NONE);
        logoMoz_in.delay(500);

    var titleMoz_out = this.game.add.tween(titleMoz).to({y: -this.game.height}, 500, Phaser.Easing.Linear.NONE);
        titleMoz_out.delay(3500);
    var logoMoz_out = this.game.add.tween(logoMoz).to({alpha: 0}, 1000, Phaser.Easing.Linear.NONE);
        logoMoz_out.delay(2300);        

    var titleMaps = this.game.add.text(this.game.width/2,-this.game.height,"Critters and coding created by the\n Creative Discovery Museum MAPs\n\nTo find out how to become a MAP visit", titleText);
        titleMaps.anchor.setTo(0.5);

        var titleMaps_in = this.game.add.tween(titleMoz).to({y: this.game.height/2}, 1000, Phaser.Easing.Linear.NONE);
        titleMaps_in.delay(500);

    var mapsLink = this.game.add.text(this.game.width/2, this.game.height/2 + titleMaps.height/2 + 40,"Become a museum Map volunteer", linkText);
        mapsLink.anchor.setTo(0.5);
        mapsLink.inputEnabled = true;
        mapsLink.alpha = 0;
        mapsLink.events.onInputDown.add(link, this);
        mapsLink.events.onInputOver.add(hover, this);
        mapsLink.events.onInputOut.add(out, this);

    var titleMaps_in = this.game.add.tween(titleMaps).to({y: this.game.height/2 - 60}, 1000, Phaser.Easing.Linear.NONE);
        titleMaps_in.delay(500);

    var mapsLink_in = this.game.add.tween(mapsLink).to({alpha: 1}, 1000, Phaser.Easing.Linear.NONE);
        mapsLink_in.delay(500);

    title_in.chain(title_out);
    logo_in.chain(logo_out);
    title_out.chain(titleMoz_in);
    logo_out.chain(logoMoz_in);
    titleMoz_in.chain(titleMoz_out);
    logoMoz_in.chain(logoMoz_out);
    titleMoz_out.chain(titleMaps_in);
    logoMoz_out.chain(mapsLink_in);

    function link() {
        window.open("http://cdmfun.org/volunteer-opportunities-for-teens", "_blank");
    }
    function hover() {
        mapsLink.fill = "#CA6765";
        mapsLink.input.useHandCursor = true;
    }
    function out() {
        mapsLink.fill = "#E19B3E";
    }
    
};

Critterer.Winner.prototype = {

    init: function(levelData) {
        this.levelData = levelData;
    },
    
    preload: function () {
        this.allBugs = {};
    },

    create: function (game, parent) {

        // Get background for level
        this.background = this.game.add.sprite(0,0, 'terrarium');

        this.bugGroup = this.game.add.group();
        // Create bug group
        var bugNames = ["cockroaches","scorpions","walking sticks"];
        var counts = [];

        for (bug in bugNames){
            var bugCount = this.levelData[bugNames[bug]];

            for (var i=0; i< bugCount; i++) {
                var posX = Math.floor(Math.random() * this.game.width);
                var posY = Math.floor(Math.random() * this.game.height);
                var rotation = Math.floor(Math.random() * 360);
                var size = Math.random() + 1;

                this.allBugs[bugNames[bug] + i ] = this.bugGroup.create(posX, posY, bugNames[bug]);
                this.allBugs[bugNames[bug] + i ].angle = rotation;
                this.allBugs[bugNames[bug] + i ].scale.setTo(size);
            }
        }

        // create plant group
        this.plants = this.game.add.group();
        var plant2 = this.plants.create(60,this.game.height/2 + 40,'plant2');
        var plant1 = this.plants.create(-60,this.game.height/2 + 80,'plant1');
        var plant4 = this.plants.create(-20,-35,'plant4');
        var plant5 = this.plants.create(this.game.width - 175,-75,'plant5');
        var plant3 = this.plants.create(this.game.width - 175, -75,'plant3');

        // Get bug total count
        for (count in bugNames) {
            var bugCount = this.levelData[bugNames[count]];
            counts.push({
                bug: bugNames[count],
                count: bugCount
            })
        }

        // Sort bugs by count
        counts.sort(function(a,b) {
            return a.count - b.count;
        });

        var x = { font: "bold 36px Arial", fill: "#fff", align: "center"};
        var countText = { font: "bold 72px Arial", fill: "#fff", align: "center"};
        this.bug1Group = this.game.add.group();
        this.bug1Group.x = -this.game.width;
        this.bug2Group = this.game.add.group();
        this.bug2Group.x = -this.game.width;
        this.bug3Group = this.game.add.group();
        this.bug3Group.x = -this.game.width;

        // Add Good Circle and Bug to Group

        var goodCircleSqaure = this.game.add.graphics(0, 0);
        goodCircleSqaure.lineStyle(6, 0xFFFFFF);
        goodCircleSqaure.beginFill(0xE19B3E, 1);
        goodCircleSqaure.drawRoundedRect(140, 60, (this.game.width/2) * (counts[0].count/counts[2].count) + 150, 130,  64.9);
        this.bug1Group.add(goodCircleSqaure);

        goodCircle = this.game.add.graphics(0, 0);
        goodCircle.lineStyle(6, 0xFFFFFF);
        goodCircle.beginFill(0x96C302, 1);
        goodCircle.drawCircle(200, 125, 130);
        this.bug1Group.add(goodCircle);

        goodCircleBug = this.game.add.sprite(200,125,counts[0].bug);
        goodCircleBug.anchor.setTo(0.5);
        this.bug1Group.add(goodCircleBug);

        goodCircleTextx = this.game.add.text(300, 125,'X', x);
        this.bug1Group.add(goodCircleTextx);

        goodCircleText = this.game.add.text(330, 100, counts[0].count, countText);
        this.bug1Group.add(goodCircleText);

        var bug1Group_in = this.game.add.tween(this.bug1Group).to({x: 0}, 2000, Phaser.Easing.Bounce.Out, true, 100);

        // Add Good Circle and Bug to Group
        var goodCircleSqaure1 = this.game.add.graphics(0, 0);
        goodCircleSqaure1.lineStyle(6, 0xFFFFFF);
        goodCircleSqaure1.beginFill(0xE19B3E, 1);
        goodCircleSqaure1.drawRoundedRect(140, 210, (this.game.width/2) * (counts[1].count/counts[2].count) + 150, 130,  64.9);
        this.bug2Group.add(goodCircleSqaure1);

        goodCircle1 = this.game.add.graphics(0,0);
        goodCircle1.lineStyle(6, 0xFFFFFF);
        goodCircle1.beginFill(0x96C302, 1);
        goodCircle1.drawCircle(200, 275, 130);
        this.bug2Group.add(goodCircle1);

        goodCircleBug1 = this.game.add.sprite(200,275,counts[1].bug);
        goodCircleBug1.anchor.setTo(0.5);
        this.bug2Group.add(goodCircleBug1);

        goodCircleText1x = this.game.add.text(300, 275,'X', x);
        this.bug2Group.add(goodCircleText1x);

        goodCircleText1 = this.game.add.text(330, 250, counts[1].count, countText);
        this.bug2Group.add(goodCircleText1);

        var bug2Group_in = this.game.add.tween(this.bug2Group).to({x: 0}, 2000, Phaser.Easing.Bounce.Out, true, 500);

        // Add Good Circle and Bug to Group
        var goodCircleSqaure2 = this.game.add.graphics(0, 0);
        goodCircleSqaure2.lineStyle(6, 0xFFFFFF);
        goodCircleSqaure2.beginFill(0xE19B3E, 1);
        goodCircleSqaure2.drawRoundedRect(140, 360, (this.game.width/2) + 150, 130,  64.9);
        this.bug3Group.add(goodCircleSqaure2);
        
        goodCircle2 = this.game.add.graphics(0, 0);
        goodCircle2.lineStyle(6, 0xFFFFFF);
        goodCircle2.beginFill(0x96C302, 1);
        goodCircle2.drawCircle(200, 425, 130);
        this.bug3Group.add(goodCircle2);

        goodCircleBug2 = this.game.add.sprite(200,425,counts[2].bug);
        goodCircleBug2.anchor.setTo(0.5);
        this.bug3Group.add(goodCircleBug2);

        goodCircleText2x = this.game.add.text(300, 425,'X', x);
        this.bug3Group.add(goodCircleText2x);

        goodCircleText2 = this.game.add.text(330, 400, counts[2].count, countText);
        this.bug3Group.add(goodCircleText2);

        var bug3Group_in = this.game.add.tween(this.bug3Group).to({x: 0}, 2000, Phaser.Easing.Bounce.Out, true, 1000);
       
        // Add menu button
        this.btnMenu = this.game.add.button(
            this.game.width - 80,
            this.game.height/2,
            'next_btn',
            function(){
                this.btnMenu.visible = false;
                this.credits.show();
        }, this);
        this.btnMenu.anchor.setTo(0.5, 0.5);
        
         // Build panel
         this.credits = new credits(this.game);
         this.game.add.existing(this.credits);
         this.credits.hide();
    },
    
    update: function() {
    
    }
};