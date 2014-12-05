Critterer.Preloader = function(game) {
    this.preload_bar = null;
    this.critterer_logo = null;
    this.ready = false;
}

Critterer.Preloader.prototype = {

    preload: function () {
        this.preload_bar = this.add.sprite(this.world.centerX, this.world.centerY +50, 'preload_bar');
        this.preload_bar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preload_bar);

        this.critterer_logo = this.add.sprite(this.world.centerX, this.world.centerY - 75, 'critterer_logo');
        this.critterer_logo.anchor.setTo(0.5, 0.5);
    },
    create: function () {
        this.preload_bar.cropEnabled = false;
    },
    update: function () {
        this.ready = true;
    }
}
