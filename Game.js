/* jshint esversion: 7 */
import Snake from './Snake.js';
export default class Game {
    constructor(height, width) {
        this.snake = new Snake(0, 0);
        this.food = { row: 0, column: 0 };
        this.height = 0;
        this.width = 0;
        this.rows = 20;
        this.columns = 50;
        this.direction = 'up';
        this.speed = 75;
        this.score = 0;
        this.interval = 0;
        this.highScore = 0;
        this.scoreHTML = document.getElementById("score");
        this.highScoreHTML = document.getElementById("highScore");
        this.snakeBodyHTML = document.getElementById("snakeBody");
        this.foodHTML = document.getElementById("food");
        this.start = () => {
            this.snake = new Snake(this.rows, this.columns);
            this.interval = setInterval(this.gameOn, this.speed);
            this.drawFood();
        };
        this.gameOff = () => {
            clearInterval(this.interval);
            if (this.snakeBodyHTML)
                this.snakeBodyHTML.className = "fadeOutAnimation";
            if (this.foodHTML)
                this.foodHTML.className = "fadeOutAnimation";
            setTimeout(() => {
                var _a, _b;
                (_a = this.snakeBodyHTML) === null || _a === void 0 ? void 0 : _a.remove();
                (_b = this.foodHTML) === null || _b === void 0 ? void 0 : _b.remove();
                alert("You died! Play Again?");
                location.reload();
            }, 2000);
        };
        this.newFood = () => {
            return {
                row: (Math.floor(Math.random() * this.rows) % this.rows),
                column: (Math.floor(Math.random() * this.columns) % this.columns)
            };
        };
        this.gameOn = () => {
            this.snake.move(this.direction);
            if (this.snake.eats(this.direction, this.food)) {
                this.food = this.newFood();
                this.incrementScore(1);
            }
            if (!this.snake.alive)
                this.gameOff();
            else
                this.render();
        };
        this.incrementScore = (increment) => {
            this.score += increment;
            let score = document.getElementById('score');
            if (score)
                score.innerHTML = String(this.score);
            if (Number(localStorage.getItem('highScore')) <= this.score)
                this.updateHighScore();
        };
        this.updateHighScore = () => {
            this.highScore = this.score;
            localStorage.setItem("highScore", String(this.highScore));
            let highScore = document.getElementById("highScore");
            if (highScore)
                highScore.innerHTML = String(this.highScore);
        };
        this.render = () => {
            this.drawSnake();
            this.drawFood();
        };
        this.getCoordinate = (row, column) => {
            return {
                x: Math.floor((Math.floor(column) / this.columns) * this.width) % this.width,
                y: Math.floor((Math.floor(row) / this.rows) * this.height) % this.height
            };
        };
        this.setDirection = (direction) => {
            if (this.snake.bodyPosition.length > 1) {
                if (direction == 'up' && this.direction === 'down')
                    return;
                if (direction == 'down' && this.direction === 'up')
                    return;
                if (direction == 'left' && this.direction === 'right')
                    return;
                if (direction == 'right' && this.direction === 'left')
                    return;
            }
            if (this.direction != direction) {
                this.direction = direction;
                this.snake.move(direction);
                this.snake.hold = true;
                // setTimeout(() => { this.snake.hold = false }, this.speed);
            }
        };
        this.drawSnake = () => {
            var _a;
            (_a = this.snakeBodyHTML) === null || _a === void 0 ? void 0 : _a.remove();
            let htmlBody = document.getElementsByTagName("body")[0];
            this.snakeBodyHTML = document.createElement("div");
            this.snakeBodyHTML.style.position = "absolute";
            this.snakeBodyHTML.id = "snakeBody";
            htmlBody.prepend(this.snakeBodyHTML);
            for (let part of this.snake.bodyPosition) {
                let square = document.createElement("div");
                square.className = "square";
                let squareCoordinate = this.getCoordinate(part.row, part.column);
                square.style.left = squareCoordinate.x + 'px';
                square.style.top = squareCoordinate.y + 'px';
                this.snakeBodyHTML.append(square);
            }
        };
        this.drawFood = () => {
            var _a;
            (_a = this.foodHTML) === null || _a === void 0 ? void 0 : _a.remove();
            let htmlBody = document.getElementsByTagName("body")[0];
            this.foodHTML = document.createElement("div");
            this.foodHTML.className = "food";
            this.foodHTML.id = "food";
            let foodCoordinate = this.getCoordinate(this.food.row, this.food.column);
            this.foodHTML.style.left = foodCoordinate.x + 'px';
            this.foodHTML.style.top = foodCoordinate.y + 'px';
            htmlBody.append(this.foodHTML);
        };
        this.width = width;
        this.height = height;
        this.rows = Math.floor(this.height / 30);
        this.columns = Math.floor(this.width / 30);
        this.food = this.newFood();
        this.highScore = Number(localStorage.getItem("highScore")) || 0;
        if (this.highScoreHTML)
            this.highScoreHTML.innerHTML = String(this.highScore);
        this.start();
    }
}
