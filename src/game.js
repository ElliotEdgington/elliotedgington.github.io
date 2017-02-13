var Uxkull = Uxkull || {};

Uxkull.Game = function(){};
 
Uxkull.Game.prototype = {
    
  init: function(highscore){
      this.highscore = highscore;
  },
    
  create: function() {
      
      this.level_data = {
          fall_speed: 180 ,
          max_speed : 200 ,
          level     : 1   ,
          situation : 1  
      };
      this.game_states = {
          QUESTION : "Question",
          GAME     : "Runner"  ,
          LOSE    : "Lose"
      };
      this.player_stats = {
          score  : 0,
          style  : 4,
          love   : 4,
          health : 5
      };
      
      this.state = null;
      this.question_style = {font: "24px Tahoma", fill: "#3454de", wordWrap: true, wordWrapWidth: 200, align: "center"};
      this.answer_style = {font: "28px Tahoma", fill: "#849bff", wordWrap: true, wordWrapWidth: 140, align: "center"};
      this.lose_style = {font: "32px Tahoma", fill: "#6d88ff", wordWrap: true, wordWrapWidth: 400, align: "center"};
      
      //layers
      this.scrolling_bg = this.add.tileSprite( 0, 0, 600, 1600, 'scrolling_background_spr');
      
      this.question_grp = this.add.group();
      this.answer_box1 = this.add.existing(new Answer_Box(this, 0, this.answer_style));
      this.answer_box2 = this.add.existing(new Answer_Box(this, GAMEWIDTH - 200, this.answer_style));
      this.question_grp.add(this.answer_box1);
      this.question_grp.add(this.answer_box2);
      this.question_grp.callAll('kill');
      
      this.neck_grp = this.add.group();
      
      this.world_grp = this.add.group();
      
      this.player_obj = this.add.existing(new Player(this));
      
      this.scrolling_fg = this.add.tileSprite( 0, 0, 600, 1600, 'scrolling_foreground_spr');
      
      
      this.pink = this.add.existing(new Pink_Worm(this));
      
      
      //GUI for state GAME
      this.score_txt = this.add.text(10, 10, this.player_stats.score, this.lose_style);
      
      this.health_grp = this.add.group();
      for(var i = 0; i < this.player_stats.health; ++i){
          var health = this.add.sprite(280 + 60*i, 30, 'health_spr');
          health.scale.setTo(0.22, 0.22);
          this.health_grp.add(health);
      }
      
      //GUI for state QUESTION
      this.style_grp = this.game.add.group();
      for(var i = 0; i < this.player_stats.style; ++i){
          var style = this.add.sprite(320 + 60*i, 30, 'style_spr');
          style.scale.setTo(0.22, 0.22);
          this.style_grp.add(style);
      }
      
      this.love_grp = this.game.add.group();
      for(var i = 0; i < this.player_stats.love; ++i){
          var love = this.add.sprite(320 + 60*i, 80, 'love_spr');
          love.scale.setTo(0.22, 0.22);
          this.love_grp.add(love);
      }
      
      //GUI for state LOSE
      this.lose_txt = this.add.text(GAMEWIDTH/2, GAMEHEIGHT/2, "You Lose...", this.lose_style);
      this.lose_txt.anchor.setTo(0.5,0.5);
      this.lose_txt.kill();
      
      
      //Game managers
      this.level_generator = new Level_Generator(this ,this.game);
      this.situation_manager = new Situation_Manager(this, this.game, this.question_style);
      
      
      //incrementing game score -- nchange this  to a lower interval
      this.game.time.events.loop(Phaser.Timer.QUARTER, this.increaseFallspeed, this);
      
      //starts the game off
      this.changeStates(this.game_states.QUESTION);
      this.situation_manager.nextSituation(this.level_data.situation);
  },
    
  update: function() {
      //scroll background
      this.scrolling_bg.tilePosition.y += this.level_data.fall_speed / 200;
      this.scrolling_fg.tilePosition.y += this.level_data.fall_speed / 50;
      
      //create new section when trigger reaches point
      if(this.level_generator.trigger_obj.y > 320){
          this.createSection();
          this.level_generator.trigger_obj.y = -80;
      }
      
      if(this.state == this.game_states.GAME){
          
          this.player_stats.score += 1;
          this.score_txt.setText(this.player_stats.score);
          //check loss
          this.checkLose();
          //checks if a new situation is ready
          this.situation_manager.checkSituation(this.player_stats.score, this.level_data.situation);
          
          //have the objects fall from the sky at fallspeed;
          this.world_grp.forEach(function(item){
              item.body.velocity.y = this.level_data.fall_speed;
              if(item.y > GAMEHEIGHT + 400){
                  item.destroy();
              }
          }, this);
        
      }
      else if(this.state == this.game_states.QUESTION){
          //check loss
          this.checkLose();
          this.updateStats();
          //fade out world objects
          this.world_grp.forEach(function(item){
              if(!item.vip) item.destroy();
          });
      }
      else if(this.state == this.game_states.LOSE){
          this.player_obj.die();
          this.lose_txt.alpha += 0.005;
          if(this.lose_txt.alpha >= 1) this.lose_txt.alpha = 1;
      }
  },
    
  render: function(){
  },

  increaseFallspeed: function(){
      if(this.state == this.game_states.GAME &&
         this.level_data.fall_speed <= this.level_data.max_speed){
          this.level_data.fall_speed += 1;
      }
  },

  updateHealth: function(){
      this.health_grp.callAll('kill');
      for(var i = 0; i < this.player_stats.health; ++i){
          this.health_grp.children[i].revive();
      }
  },
    
  updateStats: function(){
      if(this.player_stats.love > 4) this.player_stats.love = 4;
      if(this.player_stats.style > 4) this.player_stats.style = 4;

      
      this.love_grp.callAll('kill');
      for(var i = 0; i < this.player_stats.love; ++i){
          this.love_grp.children[i].revive();
      }
      
      this.style_grp.callAll('kill');
      for(var i = 0; i < this.player_stats.style; ++i){
          this.style_grp.children[i].revive();
      }
  },
  createSection: function(){
      if(this.state == this.game_states.GAME) 
          this.level_generator.createLine();
  },
    
    
  changeStates: function(state){
      //set visibility of objects according to state
      this.state = state;
      if(state == this.game_states.GAME){
          this.health_grp.visible = true;
          this.score_txt.visible = true;
          this.style_grp.visible = false;
          this.love_grp.visible = false;
      }
      else if(state == this.game_states.QUESTION){
          this.health_grp.visible = false;
          this.score_txt.visible = false;
          this.style_grp.visible = true;
          this.love_grp.visible = true;
          this.pink.reset();
      }
  },
  
  checkLose: function(){
      var loss = false;
      var text = "";
      if(this.player_stats.health <= 0){
          loss = true;
          text = "You love meteors more than anything else...";
      }
      else if(this.player_stats.style <= 0){
          loss = true;
          text = "Too little style to keep going on in life :(";
      }
      else if(this.player_stats.love <= 0){
          loss = true;
          text = "You feel too lonely to continue...";
      }
      //
      if(loss){
          this.changeStates(this.game_states.LOSE);
          if(this.player_stats.score > this.highscore) this.highscore = this.player_stats.score;
          this.lose_txt.setText(text + "\n Score: " + this.player_stats.score +
                               "\n Highscore: " + this.highscore);
          this.lose_txt.revive();
          this.lose_txt.alpha = 0;

          this.game.time.events.add(Phaser.Timer.SECOND*8, this.restart, this);

      }
  },
  restart: function(){
        this.game.state.restart(true, false, this.highscore);
  }
    

};