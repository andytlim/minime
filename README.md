# minime
Minifier for front-end assets

#### Install
```shell
npm install minime -g
```

#### Add minime.json to project
```javascript
{
    "jsRoot": "path/to/js",
    "jsMap": {
        "app.js" : [ "part1.js", "part2.js", ... ]
    },
    "cssRoot": "path/to/css",
    "cssMap": {
        "app.css" : [ "part1.css", "part2.css", ... ]
    }
}
```

#### Run 
```shell
minime
```
