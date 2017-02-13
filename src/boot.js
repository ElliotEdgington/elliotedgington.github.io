var Uxkull = Uxkull || {};
 
Uxkull.Boot = function(){};
 
Uxkull.Boot.prototype = {
  preload: function() {

  },
  create: function() {
    this.game.stage.backgroundColor = '#66b3ff';
 
    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    //physics
    this.physics.startSystem(Phaser.Physics.ARCADE);

 
    this.state.start('Preload');
  }
};