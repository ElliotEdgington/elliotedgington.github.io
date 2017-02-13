Pink_Worm = function(game){
    Phaser.Sprite.call(this, game, GAMEWIDTH/2, -20, 'head_spr');
    this.game = game;
    this.move = 1;
    this.y_limit = 0;
    this.neck_grp = this.game.add.group();
    this.anchor.setTo(0.5,0.5);
    this.scale.setTo( 0.8, 0.8);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
}

Pink_Worm.prototype = Object.create(Phaser.Sprite.prototype);
Pink_Worm.prototype.constructor = Pink_Worm;

Pink_Worm.prototype.update = function(){ 
    
    
    if(this.game.state == this.game.game_states.QUESTION){
        if(this.y_limit < 200) this.y_limit += 1;
    }
    
        
    if(this.game.state == this.game.game_states.GAME){
        if(this.y_limit > -80) this.y_limit -= 1;
    }

    this.game.physics.arcade.moveToPointer(this, 30, this.game.input.activePointer, 1000);
    this.y = this.y_limit;
    // this handles the snakes wiggly neck
    this.neck_grp.forEach(function(neck){
        neck.y -= neck.height/10;
        if(neck.y < -20){
            neck.destroy();
        }
        
    });
        
    var neck_spr = this.game.add.sprite(this.x, this.y, 'pink_neck_spr');
    neck_spr.anchor.setTo(0.5, 0.5);
    neck_spr.scale.setTo(0.8, 0.8);
    this.neck_grp.add(neck_spr);
}

Pink_Worm.prototype.reset = function(){
    this.y_limit = 0;
}