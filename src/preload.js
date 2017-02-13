var Uxkull = Uxkull || {};
 
//loading the game assets
Uxkull.Preload = function(){};
 
Uxkull.Preload.prototype = {
  preload: function() {
 
  	//load game assets
    this.load.image('neck_spr', '../assets/neck_img.png');
    this.load.image('pink_neck_spr', '../assets/pink_neck_img.png');

    this.load.image('head_spr', '../assets/owo_img.png');
    this.load.image('health_spr', '../assets/health_img.png')
    this.load.image('love_spr', '../assets/love_img.png')
    this.load.image('style_spr', '../assets/style_img.png')
    this.load.image('score_spr', '../assets/score_img.png')
    this.load.image('answer_box_spr', '../assets/answer_box_img.png')
    this.load.image('scrolling_background_spr', '../assets/scrolling_background_img.png');
    this.load.image('scrolling_foreground_spr', '../assets/scrolling_foreground_img.png');
    
    this.load.audio('ding', '../assets/sounds/ding.mp3');
    this.load.audio('coin', '../assets/sounds/coin.wav');
      
      
    //sprite sheets
    this.load.spritesheet('meteor_sheet', '../assets/meteor_spritesheet.png', 233, 400, 11);
      
    //load tilemaps
    this.load.tilemap('sections_tmap', '../assets/tilemaps/level01.json', null, Phaser.Tilemap.TILED_JSON);
      

  },
  create: function() {
  	this.state.start('Game', true, false, 0);
  }
};