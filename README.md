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
        /src
    /css
        /src
```

#### Add minime.json to project
```javascript
{
    "js": [
        {
            "source": <path>,
            "target": <path>,
            "map": {
                <targetFileName>: [<sourceFileName>, ...]
            }
        }, 
        ...
    ],
    "css": [
        {
            "source": <path>,
            "target": <path>,
            "map": {
                <targetFileName>: [<sourceFileName>, ...]
            }
        }, 
        ...
    ]
}
```

#### Run 
```shell
minime
```

#### Improvements?
-  Please shoot any suggestions you have to andytlim@gmail.com. Or better yet, help contribute!