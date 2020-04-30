/* jshint esversion: 7 */
import Snake from './Snake.js'
export default class Game {
    snake: Snake = new Snake(0, 0);
    food: {row: number, column: number} = {row: 0, column: 0}
    height: number = 0;
    width: number = 0;
    rows: number = 30;
    columns: number = 50;
    direction: string = 'up';
    speed: number = 150;
    score: number = 0;
    interval: number = 0;
    highScore: number = 0;
    scoreHTML = document.getElementById("score");
    highScoreHTML = document.getElementById("highScore")
    snakeBodyHTML = document.getElementById("snakeBody")
    foodHTML = document.getElementById("food")


    constructor(height: number, width: number) {
        this.width = width;
        this.height = height;
        this.food = this.newFood()
        this.highScore = Number(localStorage.getItem("highScore")) || 0
        if (this.highScoreHTML) this.highScoreHTML.innerHTML = String(this.highScore)
        this.start();
    }

    start = () => {
        this.snake = new Snake(this.rows, this.columns)
        this.interval = setInterval(this.gameOn, this.speed)
        this.drawFood()
    }

    gameOff = () => {
        clearInterval(this.interval)
        if (this.snakeBodyHTML) this.snakeBodyHTML.className = "fadeOutAnimation"
        if (this.foodHTML) this.foodHTML.className = "fadeOutAnimation"
        setTimeout(() => {
            this.snakeBodyHTML?.remove()
            this.foodHTML?.remove()
            alert("You died! Play Again?")
            location.reload()
        }, 2000)
    }

    newFood = () => {
        return {
            row: Math.floor(Math.random() * this.rows),
            column: Math.floor(Math.random() * this.rows)
          }
    }

    gameOn = () => {
        this.snake.move(this.direction)
        if (this.snake.eats(this.direction, this.food)) {
            this.food = this.newFood()
            this.incrementScore(1)
        }
        if (!this.snake.alive) this.gameOff()
        else this.render()
    }

    incrementScore = (increment: number) => {
        this.score += increment
        let score = document.getElementById('score')
        if (score) score.innerHTML = String(this.score)
        console.log(localStorage.getItem('highScore'))
        if (Number(localStorage.getItem('highScore')) <= this.score) this.updateHighScore()
    }

    updateHighScore = () => {
        this.highScore = this.score;
        localStorage.setItem("highScore", String(this.highScore))
        let highScore = document.getElementById("highScore")
        if (highScore) highScore.innerHTML = String(this.highScore)
    }

    render = () => {
        this.drawSnake()
        this.drawFood()
    }


    getCoordinate = (row: number, column: number): { x: number, y: number } => {
        return {
            x: Math.floor((column / this.columns) * this.width) % this.width,
            y: Math.floor((row / this.rows) * this.height) % this.height
        }
    }

    setDirection = (direction: string) => {
            if (this.snake.bodyPosition.length > 1) {
            if (direction == 'up' && this.direction === 'down') return
            if (direction == 'down' && this.direction === 'up') return
            if (direction == 'left' && this.direction === 'right') return
            if (direction == 'right' && this.direction === 'left') return
        }
        this.direction = direction
    }


    drawSnake = () => {
        this.snakeBodyHTML?.remove()
        let htmlBody: HTMLElement = document.getElementsByTagName("body")[0]
        this.snakeBodyHTML = document.createElement("div")
        this.snakeBodyHTML.style.position = "absolute"
        this.snakeBodyHTML.id = "snakeBody"
        htmlBody.append(this.snakeBodyHTML)

        for (let part of this.snake.bodyPosition) {
            let square: HTMLElement = document.createElement("div")
            square.className = "square"
            let squareCoordinate: { x: number, y: number } = this.getCoordinate(part.row, part.column)

            square.style.left = squareCoordinate.x + 'px'
            square.style.top = squareCoordinate.y + 'px'
            this.snakeBodyHTML.append(square)
        }
    }

    drawFood = () => {
        this.foodHTML?.remove()
        let htmlBody: HTMLElement = document.getElementsByTagName("body")[0]
        this.foodHTML = document.createElement("div")
        this.foodHTML.className = "food"
        this.foodHTML.id = "food"
        let foodCoordinate: { x: number, y: number } = this.getCoordinate(this.food.row, this.food.column)
        this.foodHTML.style.left = foodCoordinate.x + 'px'
        this.foodHTML.style.top = foodCoordinate.y + 'px'
        htmlBody.append(this.foodHTML)
    }
}
