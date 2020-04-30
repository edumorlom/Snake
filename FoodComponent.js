var Food = /** @class */ (function () {
    function Food(rows, columns) {
        this.position = { row: 0, column: 0 };
        this.position = {
            row: Math.floor(Math.random() * rows),
            column: Math.floor(Math.random() * columns)
        };
    }
    return Food;
}());
export default Food;
