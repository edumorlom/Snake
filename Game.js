/* jshint esversion: 7 */
import Snake from './Snake.js';
var Game = /** @class */ (function () {
    function Game(height, width) {
        var _this = this;
        this.snake = new Snake(0, 0);
        this.food = { row: 0, column: 0 };
        this.height = 0;
        this.width = 0;
        this.rows = 30;
        this.columns = 50;
        this.direction = 'up';
        this.speed = 150;
        this.score = 0;
        this.interval = 0;
        this.highScore = 0;
        this.scoreHTML = document.getElementById("score");
        this.highScoreHTML = document.getElementById("highScore");
        this.snakeBodyHTML = document.getElementById("snakeBody");
        this.foodHTML = document.getElementById("food");
        this.start = function () {
            _this.snake = new Snake(_this.rows, _this.columns);
            _this.interval = setInterval(_this.gameOn, _this.speed);
            _this.drawFood();
        };
        this.gameOff = function () {
            clearInterval(_this.interval);
            if (_this.snakeBodyHTML)
                _this.snakeBodyHTML.className = "fadeOutAnimation";
            if (_this.foodHTML)
                _this.foodHTML.className = "fadeOutAnimation";
            setTimeout(function () {
                var _a, _b;
                (_a = _this.snakeBodyHTML) === null || _a === void 0 ? void 0 : _a.remove();
                (_b = _this.foodHTML) === null || _b === void 0 ? void 0 : _b.remove();
                alert("You died! Play Again?");
                location.reload();
            }, 2000);
        };
        this.newFood = function () {
            return {
                row: Math.floor(Math.random() * _this.rows),
                column: Math.floor(Math.random() * _this.rows)
            };
        };
        this.gameOn = function () {
            _this.snake.move(_this.direction);
            if (_this.snake.eats(_this.direction, _this.food)) {
                _this.food = _this.newFood();
                _this.incrementScore(1);
            }
            if (!_this.snake.alive)
                _this.gameOff();
            else
                _this.render();
        };
        this.incrementScore = function (increment) {
            _this.score += increment;
            var score = document.getElementById('score');
            if (score)
                score.innerHTML = String(_this.score);
            console.log(localStorage.getItem('highScore'));
            if (Number(localStorage.getItem('highScore')) <= _this.score)
                _this.updateHighScore();
        };
        this.updateHighScore = function () {
            _this.highScore = _this.score;
            localStorage.setItem("highScore", String(_this.highScore));
            var highScore = document.getElementById("highScore");
            if (highScore)
                highScore.innerHTML = String(_this.highScore);
        };
        this.render = function () {
            _this.drawSnake();
            _this.drawFood();
        };
        this.getCoordinate = function (row, column) {
            return {
                x: Math.floor((column / _this.columns) * _this.width) % _this.width,
                y: Math.floor((row / _this.rows) * _this.height) % _this.height
            };
        };
        this.setDirection = function (direction) {
            if (_this.snake.bodyPosition.length > 1) {
                if (direction == 'up' && _this.direction === 'down')
                    return;
                if (direction == 'down' && _this.direction === 'up')
                    return;
                if (direction == 'left' && _this.direction === 'right')
                    return;
                if (direction == 'right' && _this.direction === 'left')
                    return;
            }
            _this.direction = direction;
        };
        this.drawSnake = function () {
            var _a;
            (_a = _this.snakeBodyHTML) === null || _a === void 0 ? void 0 : _a.remove();
            var htmlBody = document.getElementsByTagName("body")[0];
            _this.snakeBodyHTML = document.createElement("div");
            _this.snakeBodyHTML.style.position = "absolute";
            _this.snakeBodyHTML.id = "snakeBody";
            htmlBody.append(_this.snakeBodyHTML);
            for (var _i = 0, _b = _this.snake.bodyPosition; _i < _b.length; _i++) {
                var part = _b[_i];
                var square = document.createElement("div");
                square.className = "square";
                var squareCoordinate = _this.getCoordinate(part.row, part.column);
                square.style.left = squareCoordinate.x + 'px';
                square.style.top = squareCoordinate.y + 'px';
                _this.snakeBodyHTML.append(square);
            }
        };
        this.drawFood = function () {
            var _a;
            (_a = _this.foodHTML) === null || _a === void 0 ? void 0 : _a.remove();
            var htmlBody = document.getElementsByTagName("body")[0];
            _this.foodHTML = document.createElement("div");
            _this.foodHTML.className = "food";
            _this.foodHTML.id = "food";
            var foodCoordinate = _this.getCoordinate(_this.food.row, _this.food.column);
            _this.foodHTML.style.left = foodCoordinate.x + 'px';
            _this.foodHTML.style.top = foodCoordinate.y + 'px';
            htmlBody.append(_this.foodHTML);
        };
        this.width = width;
        this.height = height;
        this.food = this.newFood();
        this.highScore = Number(localStorage.getItem("highScore")) || 0;
        if (this.highScoreHTML)
            this.highScoreHTML.innerHTML = String(this.highScore);
        this.start();
    }
    return Game;
}());
export default Game;
