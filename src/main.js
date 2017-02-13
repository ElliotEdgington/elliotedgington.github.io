var Uxkull = Uxkull || {};
var GAMEWIDTH = 600;
var GAMEHEIGHT = 800;
Uxkull.game = new Phaser.Game(GAMEWIDTH , GAMEHEIGHT, Phaser.AUTO, 'Wiggly Worm');

Uxkull.game.state.add('Boot', Uxkull.Boot);
Uxkull.game.state.add('Preload', Uxkull.Preload);
Uxkull.game.state.add('MainMenu', Uxkull.MainMenu);
Uxkull.game.state.add('Game', Uxkull.Game);

Uxkull.game.state.start('Boot');
