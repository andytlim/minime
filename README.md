# minime
Minifier for front-end assets

#### Install
```shell
npm install minime -g
```

#### Suggested folder setup 
```shell
# Right now minime only supports 1 js and 1 css root, future enhancements will expand to any number of directories
/assets
    /js
    /css
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

#### Improvements?
-  Please shoot any suggestions you have to andytlim@gmail.com. Or better yet, help contribute!
