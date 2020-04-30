var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var SnakeComponent = /** @class */ (function () {
    function SnakeComponent(rows, columns) {
        var _this = this;
        this.bodyPosition = [];
        this.rows = 0;
        this.columns = 0;
        this.alive = true;
        this.eats = function (direction, food) {
            /**
             * Snake eats the food.
             * If the head is in the same position as the food, then it has eaten it.
             * Returns whether there was food at that location.
             */
            if (_this.getHeadPosition().row != food.row)
                return false;
            if (_this.getHeadPosition().column != food.column)
                return false;
            if (direction === 'up')
                _this.bodyPosition = __spreadArrays(_this.bodyPosition, [{ row: (_this.bodyPosition[0].row - 1) % _this.rows, column: (_this.bodyPosition[0].column) % _this.columns }]);
            if (direction === 'down')
                _this.bodyPosition = __spreadArrays(_this.bodyPosition, [{ row: (_this.bodyPosition[0].row + 1) % _this.rows, column: (_this.bodyPosition[0].column) % _this.columns }]);
            if (direction === 'left')
                _this.bodyPosition = __spreadArrays(_this.bodyPosition, [{ row: (_this.bodyPosition[0].row) % _this.rows, column: (_this.bodyPosition[0].column - 1) % _this.columns }]);
            if (direction === 'right')
                _this.bodyPosition = __spreadArrays(_this.bodyPosition, [{ row: (_this.bodyPosition[0].row) % _this.rows, column: (_this.bodyPosition[0].column + 1) % _this.columns }]);
            return true;
        };
        this.getHeadPosition = function () {
            /**
             * Returns the first element of the body of the snake, that is, the head.
             */
            return _this.bodyPosition[0];
        };
        this.move = function (direction) {
            /**
             * Simplifies all the different variations of move into one method and checks to see if there snake is still alive.
             */
            if (direction == "up")
                _this.moveUp();
            else if (direction == "down")
                _this.moveDown();
            else if (direction == "left")
                _this.moveLeft();
            else if (direction == "right")
                _this.moveRight();
            // Iterate through all body and check to see if the head has collided with any bodyPart.
            // If collision has occurred, snake is no longer alive.
            for (var i = 1; i < _this.bodyPosition.length; i++) {
                if (_this.getHeadPosition().column === _this.bodyPosition[i].column &&
                    _this.getHeadPosition().row === _this.bodyPosition[i].row)
                    _this.alive = false;
            }
        };
        this.moveUp = function () {
            /**
             * Moves the snake up the y-axis.
             */
            var row = _this.bodyPosition[0].row - 1;
            if (row < 0)
                row = _this.rows;
            _this.bodyPosition = __spreadArrays([{ row: row, column: (_this.bodyPosition[0].column) % _this.columns }], _this.bodyPosition.slice(0, -1));
        };
        this.moveDown = function () {
            /**
             * Moves the snake down the y-axis.
             */
            var row = _this.bodyPosition[0].row + 1;
            if (row > _this.rows)
                row = 0;
            _this.bodyPosition = __spreadArrays([{ row: row, column: (_this.bodyPosition[0].column) % _this.columns }], _this.bodyPosition.slice(0, -1));
        };
        this.moveLeft = function () {
            /**
             * Moves the snake to the left in the x-axis.
             */
            var column = _this.bodyPosition[0].column - 1;
            if (column < 0)
                column = _this.columns;
            _this.bodyPosition = __spreadArrays([{ row: (_this.bodyPosition[0].row) % _this.rows, column: column }], _this.bodyPosition.slice(0, -1));
        };
        this.moveRight = function () {
            /**
             * Moves the snake to the left in the y-axis.
             */
            var column = _this.bodyPosition[0].column + 1;
            if (column < 0)
                column = _this.columns;
            _this.bodyPosition = __spreadArrays([{ row: (_this.bodyPosition[0].row) % _this.rows, column: column }], _this.bodyPosition.slice(0, -1));
        };
        this.bodyPosition = [{ row: Math.floor(rows / 2), column: Math.floor(columns / 2) }];
        this.rows = rows;
        this.columns = columns;
    }
    return SnakeComponent;
}());
export default SnakeComponent;
