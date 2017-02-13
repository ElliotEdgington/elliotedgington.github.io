Level_Generator = function(scene, game){
    this.game = game;
    this.scene = scene;
    this.createLevels();
    //when this object reaches a certain y value a new section is created
    this.trigger_obj = this.game.add.sprite(0, -75);
    this.game.physics.enable(this.trigger_obj, Phaser.Physics.ARCADE);
    this.trigger_obj.collidedWith = function(){};
    this.trigger_obj.vip = true;
    this.scene.world_grp.add(this.trigger_obj);
};

Level_Generator.prototype.createLevels = function(){
    this.map = this.game.add.tilemap('sections_tmap');
}

Level_Generator.prototype.createLine = function(){
    var randomLayer = this.game.rnd.integerInRange(0, this.map.layers.length-1);
    this.map.forEach(this.createObjects, this, 0, 0, this.map.width, this.map.height, randomLayer);
}

//manualy creating objects from index
Level_Generator.prototype.createObjects = function(tile){
    var posX = tile.x * this.map.tileWidth + (tile.width/2);
    var posY = tile.y * this.map.tileHeight;
    switch(tile.index){
        case 1:
            var score_token = this.game.add.existing(new Score_Token(this.scene, posX, posY, 240));
            this.scene.world_grp.add(score_token);
            break;
        case 2:
            var meteor = this.game.add.existing(new Obstacle(this.game, posX, posY, 0.9));
            this.scene.world_grp.add(meteor);
            break;
        case 3:
            var meteor = this.game.add.existing(new Obstacle(this.game, posX, posY, 0.6));
            this.scene.world_grp.add(meteor);
            break;
        case 4:
            var meteor = this.game.add.existing(new Obstacle(this.game, posX, posY, 0.4));
            this.scene.world_grp.add(meteor);
            break
    }
}

