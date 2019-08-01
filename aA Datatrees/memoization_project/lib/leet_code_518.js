// Work through this problem on https://leetcode.com/problems/coin-change-2/ and use the specs given there.
// Feel free to use this file for scratch work.


// function change(amount, coins, memo={}) {
//     let key = amount + '-' + coins;
//     if (key in memo) return memo[key];
//     if (amount === 0) return 1;

//     let currentCoin = coins[coins.length - 1];
//     let total = 0;

//     for (let qty = 0; qty * currentCoin <= amount; qty++){
//         total += change(amount - qty * currentCoin, coins.slice(0, -1), memo);
//     }

//     memo[key] = total;
//     return memo[key];
// }


function change(amount, coins) {
    const tab = new Array(amount + 1).fill(0);

    tab[0] = 1;

    for (const coin of coins) {
        for (let col = coin; col <= amount; col++) {
            tab[col] += tab[col - coin];
        }
    }

    return tab[amount];
}


console.log(change(500, [3,5,7,8,9,10,11]))


