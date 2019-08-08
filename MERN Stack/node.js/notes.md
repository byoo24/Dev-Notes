```javascript
const path = require('path');

// Base file name
console.log(path.basename(__filename));

// Directory name
console.log(path.dirname(__filename));

// File extension
console.log(path.extname(__filename));

// Create path object
console.log(path.parse(__filename));

// Concatenate paths
console.log(path.join(__dirname, 'test', 'hello.html'));
```



```javascript
const fs = require('fs');
const path = require('path');

// Create folder
fs.mkdir(path.join(__dirname, '/test'), {}, err => {
    if(err) throw err;
    console.log('Folder created...');
});


// Create and write to file
fs.writeFile(
    path.join(__dirname, '/test', 'hello.txt'), 
    'Hello World', 
    err => {
        if (err) throw err;
        console.log('File written to...');
});


// Read file
fs.readFile(
    path.join(__dirname, '/test', 'hello.txt'), 
    'utf8', 
    (err, data) => {
    if (err) throw err;
    console.log(data);
});
```


```javascript
const os = require('os');

// Platform
console.log(os.platform());

// CPU Arch
console.group(os.arch());

// CPU Core Info
console.log(os.cpus());

// Free memory
console.log(os.freemem());

// Free memory
console.log(os.totalmem());

// Uptime
console.log(os.uptime());
```



```javascript
const url = require('url');

const myUrl = new URL('http://mywebsite.com:8000/hello.html?id=100&status=active');


// Serialized URL
console.log(myUrl.href);
console.log(myUrl.toString());

// Host (root domain)
console.log(myUrl.host);

// Hostname (doesn't include the port)
console.log(myUrl.hostname);

// Pathname
console.log(myUrl.pathname);

// Serialized query
console.log(myUrl.search);

// Params object
console.log(myUrl.searchParams);


// Add param
myUrl.searchParams.append('abc', '123');
console.log(myUrl.searchParams);

// Loop through params
myUrl.searchParams.forEach((value, name) => console.log(`${name}: ${value}`));
```