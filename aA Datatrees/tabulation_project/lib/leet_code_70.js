// Work through this problem on https://leetcode.com/problems/climbing-stairs/ and use the specs given there.
// Feel free to use this file for scratch work.

// function climbStairs(n) {

//     let tab = Array(n + 1).fill(0);

//     tab[0] = 1;

//     for (let step = 1; step <= n; step++) {
//         for (let col = 0; col < tab.length; col++) {
//             let res = tab[col - step] || 0;
//             tab[col] += res;
//         }
//     }
//     console.log(tab);
//     return tab[n];
// }


var climbStairs = function (n) {
    let table = new Array(n + 1).fill(0);

    table[0] = 1;

    // console.log(table);

    for (let col = 1; col < table.length; col++) {
        for (let step = 1; step <= 2; step++) {
            if (step <= col) {
                table[col] += table[col - step];
            }
            console.log(table);
        }
    }

    return table[table.length - 1];
};


console.log(climbStairs(2));