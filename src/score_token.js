Score_Token = function( game, x, y, score){
    Phaser.Sprite.call(this, game, x, y -350, 'score_spr');
    this.score = score;
    this.sound = this.game.add.audio('coin');
    
    this.anchor.setTo( 0.5, 0.5);
    this.scale.setTo(0.2,0.2);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
}

Score_Token.prototype = Object.create(Phaser.Sprite.prototype);
Score_Token.prototype.constructor = Score_Token;


Score_Token.prototype.collidedWith = function(){
    this.game.player_stats.score += this.score;
    this.sound.play();
    this.destroy();
}