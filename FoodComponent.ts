export default class Food {
  position: {row: number, column: number} = {row: 0, column: 0}
  constructor(rows: number, columns: number) {
    this.position = {
      row: Math.floor(Math.random() * rows),
      column: Math.floor(Math.random() * columns)
    }
  }
}