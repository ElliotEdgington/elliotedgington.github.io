Situation_Manager = function(scene, game, style){
    this.scene = scene;
    this.game = game;
    this.style = style;
    this.question_txt = this.scene.add.text(GAMEWIDTH/2, 100);
    this.question_txt.anchor.setTo(0.5,0);
    this.question_txt.setStyle(this.style);
    
    this.sound = this.game.add.audio('ding');
    
    
    this.effects = {
        REMOVE_LOVE  : "Remove_Love",
        REMOVE_STYLE : "Remove_Style",
        ADD_LOVE     : "Add_Love",
        ADD_STYLE    : "Add_Style",
        REMOVE_ALL_STYLE : "Remove_All_Style",
        REMOVE_ALL_LOVE : "Remove_All_Style"
    }
};


Situation_Manager.prototype.checkSituation = function(score,sit){
    switch(sit){
        case 5:
            if(score > 3000) this.nextSituation(this.scene.level_data.situation);
            break;
        case 7:
            if(score > 7000) this.nextSituation(this.scene.level_data.situation);
            break;
        case 9:
            if(score > 13000) this.nextSituation(this.scene.level_data.situation);
            break;
        case 11:
            if(score > 18000) this.nextSituation(this.scene.level_data.situation);
            break;
    }
}

Situation_Manager.prototype.getSituation = function(situation){
    //this is a big switch meethod returning an array of Question, answer1, answer2 , effect1, effect2
    switch(situation){
        case 1:
            this.question = "This is a story of a very wiggly worm, in a quest to find its one and only true counterpart...";
            this.answer1  = "What?";
            this.answer2  = "Okay.";
            this.reaction1= "Another wiggly worm."
            this.reaction2= "Another wiggly worm!"
            this.effect1  =  0;
            this.effect2  =  0;
            break;
        case 2:
            this.question = "The pink wiggly worm looked like an angle with wings";
            this.answer1  = "Nice.";
            this.answer2  = "Nice!";
            this.reaction1= "Nice indeed...";
            this.reaction2= "Nice indeed!";
            this.effect1  =  0;
            this.effect2  =  0;
            break;
        case 3:
            this.question = "Pink asked 'why so glum chum?'";
            this.answer1  = "I lack you in my life";
            this.answer2  = "I'm so lonely :(";
            this.reaction1= "'I don't even know you..'";
            this.reaction2= "'That's a shame'";
            this.effect1  =  this.effects.REMOVE_STYLE;
            this.effect2  =  this.effects.REMOVE_LOVE;
            break;
        case 4:
            this.question = "Pink then said 'I'll see you around!'";
            this.answer1  = "Nice!";
            this.answer2  = "Eh..";
            this.reaction1= "'bye ;~)'";
            this.reaction2= "'wow rude'";
            this.effect1  =  this.effects.ADD_STYLE;
            this.effect2  =  this.effects.REMOVE_LOVE;
            break;
        case 5:
            this.question = "The Pink wiggly worm wondered why you were following it around?";
            this.answer1  = "Because i'm a stalker";
            this.answer2  = "Bc gurl you thicc";
            this.reaction1= ":/";
            this.reaction2= ";)";
            this.effect1  =  this.effects.REMOVE_STYLE;
            this.effect2  =  this.effects.ADD_STYLE;
            break;
        case 6:
            this.question = "'Please stop following me.'";
            this.answer1  = "Never!";
            this.answer2  = "Okay.";
            this.reaction1= ":////";
            this.reaction2= "Oh fine then, its not like I liked you or anything";
            this.effect1  =  0;
            this.effect2  =  this.effects.REMOVE_ALL_STYLE;
            break;
        case 7:
            this.question = "Can't you say anything nice?";
            this.answer1  = "Your teeth are like stars";
            this.answer2  = "I love your eyes";
            this.reaction1= "They come out at night :(";
            this.reaction2= "Because I can see myself in them :((";
            this.effect1  =  this.effects.REMOVE_LOVE;
            this.effect2  =  this.effects.REMOVE_STYLE;
            break;
        case 8:
            this.question = "Why are you so mean to me?";
            this.answer1  = "Because I hate you.";
            this.answer2  = "Because I secretly like you.";
            this.reaction1= ";_;";
            this.reaction2= "ohh youuu";
            this.effect1  =  this.effects.REMOVE_ALL_LOVE;
            this.effect2  =  this.effects.ADD_LOVE;
            break;  
        case 9:
            this.question = "Do you want to go to dinner with me?";
            this.answer1  = "Bon appetit";
            this.answer2  = "Osteoporosis";
            this.reaction1= "eh, okay then";
            this.reaction2= "Now thats more like it ;)";
            this.effect1  =  this.effects.REMOVE_STYLE;
            this.effect2  =  this.effects.ADD_STYLE;
            break;
        case 10:
            this.question = "What do you want to do?";
            this.answer1  = "Go home";
            this.answer2  = "( ͡° ͜ʖ ͡°)";
            this.reaction1= ";_;";
            this.reaction2= "ooh...";
            this.effect1  =  this.effects.REMOVE_LOVE;
            this.effect2  =  this.effects.ADD_LOVE;
            break;
        case 11:
            this.question = "Wiggle me in places I've never been wiggled before";
            this.answer1  = "I'm 18+";
            this.answer2  = "I'm under 18";
            this.reaction1= "Suuuure you are.";
            this.reaction2= ":///////";
            this.effect1  =  this.effects.ADD_LOVE;
            this.effect2  =  this.effects.REMOVE_ALL_STYLE;
            break;
        case 12:
            this.question = "Wow that back massage really did my bones good";
            this.answer1  = "But worms don't have bo-";
            this.answer2  = "Nice could you give me one";
            this.reaction1= ">:( did you just assume my bone structure";
            this.reaction2= "Lol no";
            this.effect1  =  this.effects.REMOVE_STYLE;
            this.effect2  =  0;
            break;
        case 13:
            this.question = "Infact, I would like another massage";
            this.answer1  = "Another one.";
            this.answer2  = "You're so needy";
            this.reaction1= "and anuther one.";
            this.reaction2= "ugh all wiggly worms are the same.";
            this.effect1  =  this.effects.ADD_STYLE;
            this.effect2  =  this.effects.REMOVE_STYLE;
            break;
    }
}


Situation_Manager.prototype.doNext = function(){
    this.question_txt.destroy();
    this.scene.level_data.situation += 1;
    switch(this.situation){
        case 1:
            this.nextSituation(this.scene.level_data.situation);
            break;
        case 2:
            this.nextSituation(this.scene.level_data.situation);
            break;
        case 3:
            this.nextSituation(this.scene.level_data.situation);
            break;
        case 4:
            this.scene.level_data.fall_speed = 160;
            this.scene.level_data.max_speed  = 220;
            this.scene.changeStates(this.scene.game_states.GAME);
            break;
        case 5:
            this.nextSituation(this.scene.level_data.situation);
            break;
        case 6:
            this.scene.level_data.fall_speed = 270;
            this.scene.level_data.max_speed  = 300;
            this.scene.changeStates(this.scene.game_states.GAME);
            break;
        case 7:
            this.nextSituation(this.scene.level_data.situation);
            break;
        case 8:
            this.scene.level_data.fall_speed = 370;
            this.scene.level_data.max_speed  = 400;
            this.scene.changeStates(this.scene.game_states.GAME);
            break;
        case 9:
            this.nextSituation(this.scene.level_data.situation);
            break;
        case 10:
            this.scene.level_data.fall_speed = 400;
            this.scene.level_data.max_speed  = 470;
            this.scene.changeStates(this.scene.game_states.GAME);
            break;
        case 11:
            this.nextSituation(this.scene.level_data.situation);
            break;
        case 12:
            this.nextSituation(this.scene.level_data.situation);
            break;
        case 13:
            this.scene.level_data.fall_speed = 450;
            this.scene.level_data.max_speed  = 500;
            this.scene.changeStates(this.scene.game_states.GAME);
            break; 
    }
}

Situation_Manager.prototype.doEffect= function(effect){
    switch(effect){
        case this.effects.ADD_LOVE:
            this.scene.player_stats.love += 1;
            break;
        case this.effects.REMOVE_LOVE:
            this.scene.player_stats.love -= 2;
            break;
        case this.effects.ADD_STYLE:
            this.scene.player_stats.style += 1;
            break;
        case this.effects.REMOVE_STYLE:
            this.scene.player_stats.style -= 2;
            break;
        case this.effects.REMOVE_ALL_STYLE:
            this.scene.player_stats.style -= 4;
            break;
        case this.effects.REMOVE_ALL_LOVE:
            this.scene.player_stats.love -= 4;
            break;
    }
}

Situation_Manager.prototype.nextSituation = function(situation){
    this.scene.changeStates(this.scene.game_states.QUESTION);
    this.situation = situation;
    this.getSituation(situation);
    //uses vars from getSituation();
    this.scene.answer_box1.addText(this.answer1, this.style);
    this.scene.answer_box2.addText(this.answer2, this.style);
    this.scene.question_grp.callAll('revive');
    
    //couldnt get object variable up top working :/
    this.question_txt = this.scene.add.text(GAMEWIDTH/2, 120, this.question, this.style);
    this.question_txt.anchor.setTo(0.5,0);
}

Situation_Manager.prototype.answer = function(answer){
    this.sound.play();
    this.scene.question_grp.callAll('kill');
    this.game.time.events.add(Phaser.Timer.SECOND * 4, this.doNext, this);
    if(answer === this.answer1){
        this.doEffect(this.effect1);
        this.question_txt.setText(this.reaction1);
    }
    else if (answer === this.answer2){
        this.doEffect(this.effect2);
        this.question_txt.setText(this.reaction2);
    }else{
        console.log("Something went wrong with the answer system");
    }
}