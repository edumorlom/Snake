export default class SnakeComponent {
  bodyPosition: Array<{ row: number, column: number }> = []
  rows: number = 0;
  columns: number = 0;
  alive: boolean = true;

  constructor(rows: number, columns: number) {
    this.bodyPosition = [{ row: Math.floor(rows / 2), column: Math.floor(columns / 2) }]
    this.rows = rows
    this.columns = columns
  }

  eats = (direction: string, food: {row: number, column: number}): boolean => {
    /**
     * Snake eats the food.
     * If the head is in the same position as the food, then it has eaten it.
     * Returns whether there was food at that location.
     */
    if (this.getHeadPosition().row != food.row) return false
    if (this.getHeadPosition().column != food.column) return false

    if (direction === 'up') this.bodyPosition = [...this.bodyPosition, {row: (this.bodyPosition[0].row - 1) % this.rows, column: (this.bodyPosition[0].column) % this.columns }]
    if (direction === 'down')this.bodyPosition = [...this.bodyPosition, {row: (this.bodyPosition[0].row + 1) % this.rows, column: (this.bodyPosition[0].column) % this.columns}]
    if (direction === 'left')this.bodyPosition = [...this.bodyPosition, {row: (this.bodyPosition[0].row) % this.rows, column: (this.bodyPosition[0].column - 1) % this.columns}]
    if (direction === 'right') this.bodyPosition = [...this.bodyPosition, {row: (this.bodyPosition[0].row) % this.rows, column: (this.bodyPosition[0].column + 1) % this.columns}]
    return true
  }

  getHeadPosition = () => {
    /**
     * Returns the first element of the body of the snake, that is, the head.
     */
    return this.bodyPosition[0]
  }

  move = (direction: string) => {
    /**
     * Simplifies all the different variations of move into one method and checks to see if there snake is still alive.
     */
    if (direction == "up") this.moveUp()
    else if (direction == "down") this.moveDown()
    else if (direction == "left") this.moveLeft()
    else if (direction == "right") this.moveRight()

    // Iterate through all body and check to see if the head has collided with any bodyPart.
    // If collision has occurred, snake is no longer alive.
    for (let i: number = 1; i < this.bodyPosition.length; i++){
      if (this.getHeadPosition().column === this.bodyPosition[i].column &&
      this.getHeadPosition().row === this.bodyPosition[i].row) this.alive = false
    }
  }

  moveUp = () => {
    /**
     * Moves the snake up the y-axis.
     */
    let row = this.bodyPosition[0].row - 1
    if (row < 0) row = this.rows
    this.bodyPosition = [{row: row, column: (this.bodyPosition[0].column) % this.columns}, ...this.bodyPosition.slice(0, -1)]
  }

  moveDown = () => {
    /**
     * Moves the snake down the y-axis.
     */
    let row = this.bodyPosition[0].row + 1;
    if (row > this.rows) row = 0
    this.bodyPosition = [{row: row, column: (this.bodyPosition[0].column) % this.columns}, ...this.bodyPosition.slice(0, -1)]
  }

  moveLeft = () => {
    /**
     * Moves the snake to the left in the x-axis.
     */
    let column = this.bodyPosition[0].column - 1
    if (column < 0) column = this.columns
    this.bodyPosition = [{row: (this.bodyPosition[0].row) % this.rows, column: column}, ...this.bodyPosition.slice(0, -1)]
  }

  moveRight = () => {
    /**
     * Moves the snake to the left in the y-axis.
     */
    let column = this.bodyPosition[0].column + 1
    if (column < 0) column = this.columns
    this.bodyPosition = [{row: (this.bodyPosition[0].row) % this.rows, column: column}, ...this.bodyPosition.slice(0, -1)]
  }
}