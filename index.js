/*jshint esversion: 7*/
import Game from './Game.js';
window.onload = e => {
    var height = window.innerHeight;
    var width = window.innerWidth;
    var game = new Game(height, width);
    document.addEventListener('keydown', e => {
        if (e.keyCode == 38)
            game.setDirection('up');
        else if (e.keyCode == 40)
            game.setDirection('down');
        else if (e.keyCode == 37)
            game.setDirection('left');
        else if (e.keyCode == 39)
            game.setDirection('right');
    });
};
