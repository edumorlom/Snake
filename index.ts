/*jshint esversion: 7*/
import Game from './Game.js';
import addSwipeEventListener from './SwipeGestureEventListener.js'

window.onload = (e: Event) => {
    let height: number = window.innerHeight;
    let width: number = window.innerWidth;
    let game: Game = new Game(height, width);

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.keyCode == 38) game.setDirection('up')
        else if (e.keyCode == 40) game.setDirection('down')
        else if (e.keyCode == 37) game.setDirection('left')
        else if (e.keyCode == 39) game.setDirection('right')
    });

    addSwipeEventListener(document,
        () => game.setDirection('up'),
        () => game.setDirection('down'),
        () => game.setDirection('left'),
        () => game.setDirection('right'),
        () => console.log("Tapped!")
    );
}