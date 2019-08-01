function foo(n) { // O(n)
    if (n === 1) return;
    foo(n - 1);
}


function foo(n) { // O(logn)
    if (n === 1) return;
    foo(n  / 2);
}

function foo(n) { // O(2^n)
    if (n === 1) return;
    foo(n - 1);
    foo(n - 1);
}

function foo(n) { // O(3^n)
    if (n === 1) return;
    foo(n - 1);
    foo(n - 1);
    foo(n - 1);
}

function foo(n) {   // O(2^n)
    if (n === 1 || n === 2) return 1;
    foo(n - 1);
    foo(n - 1);
}

function foo(n) {   // O(2^n)
    if (n === 1 || n === 2) return 1;
    foo(n - 2);
    foo(n - 2);
}

function foo(n) {   // O(2^n)
    if (n === 1 || n === 2) return 1;
    foo(n - 1);
    foo(n - 2);
}

function fib(n) {   // O(2^n)
    if (n === 1 || n === 2) return 1;
    return fib(n - 1) + fib(n - 2);
}
