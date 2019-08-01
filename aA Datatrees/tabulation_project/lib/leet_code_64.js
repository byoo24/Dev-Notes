// Work through this problem on https://leetcode.com/problems/minimum-path-sum/ and use the specs given there.
// Feel free to use this file for scratch work.

var minPathSum = function (grid) {

    let row = grid.length - 1;
    let col = grid[row].length - 1;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (i === 0 && j === 0) continue;
            let prevUp = (i === 0) ? Infinity : grid[i - 1][j];
            let prevLeft = (j === 0) ? Infinity : grid[i][j - 1];

            grid[i][j] += Math.min(prevUp, prevLeft);
        }
    }

    return grid[row][col];
};