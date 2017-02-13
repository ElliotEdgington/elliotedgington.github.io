Obstacle = function(game, x, y, scale){
    Phaser.Sprite.call(this, game, x, y -350, 'meteor_sheet');
    
    this.animations.add('fall');
    this.animations.play('fall', 24, true);
    
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo( 0.5, 1);
    this.body.setSize( 100, 75, 75, this.height - 110);
    this.scale.setTo( scale, scale);
}

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;


Obstacle.prototype.collidedWith = function(){
    //explosion?
    this.destroy();
    return 'Obstacle';
}