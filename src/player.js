Player = function(game){
    Phaser.Sprite.call(this, game, GAMEWIDTH/2, GAMEHEIGHT - 200, 'head_spr');
    this.game = game;
    this.time_to_pointer = 400;
    this.speed = 100;
    this.y_limit = 360
    
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);      
    this.scale.setTo( 0.8, 0.8);
    this.body.setCircle(this.width/2, 16, 20);
    this.body.collideWorldBounds = true;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
    //call collision handler
    this.collisions();
    
    this.game.physics.arcade.moveToPointer(this, this.speed, this.game.input.activePointer, this.time_to_pointer);
    if(this.y < GAMEHEIGHT - this.y_limit){
        this.y  = GAMEHEIGHT - this.y_limit;
    }
    
    // this handles the snakes wiggly neck
    this.game.neck_grp.forEach(function(neck){
        neck.y += neck.height/10;
        if(neck.y > GAMEHEIGHT + 20){
            neck.destroy();
        }
        
    });
    
    var neck_spr = this.game.add.sprite(this.x, this.y, 'neck_spr');
    neck_spr.anchor.setTo(0.5, 0.5);
    neck_spr.scale.setTo(0.8, 0.8);
    this.game.neck_grp.add(neck_spr);
}


Player.prototype.die = function(){
    this.y_limit -= 1;
    this.body.collideWorldBounds = false;
}


Player.prototype.collisions = function(){
    // score item collisions
    this.game.physics.arcade.overlap(this, this.game.world_grp, this.overlapped, null, this);
    this.game.physics.arcade.overlap(this, this.game.question_grp, this.overlapped, null, this);
}


Player.prototype.overlapped = function(player, col_obj){
    var name = col_obj.collidedWith();
    if(name === 'Obstacle'){
        this.game.player_stats.health -= 1;
        this.game.updateHealth();
    }
}