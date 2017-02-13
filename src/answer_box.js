Answer_Box = function(game, x, style){
    Phaser.Sprite.call(this, game, x, 0, 'answer_box_spr');
    this.game = game;
    this.alpha = 0.3;
    this.style = style
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.text = this.game.add.text(this.x + this.width/2, 185);
    this.text.anchor.setTo(0.5,0);
    this.game.question_grp.add(this.text);
}

Answer_Box.prototype = Object.create(Phaser.Sprite.prototype);
Answer_Box.prototype.constructor = Answer_Box;

Answer_Box.prototype.addText = function(text){
    this.answer = text;
    this.text.setText(text);
    this.text.setStyle(this.style);
    this.text.bringToTop();
}

Answer_Box.prototype.collidedWith = function(){
    if(this.visible){
        this.alpha+=0.005;
        if(this.alpha >=1){
            //play ding sound
            this.game.situation_manager.answer(this.answer);
            this.alpha = 0.3;
        }
    }

}