# minime
Minifier for front-end assets

#### Install
```shell
npm install minime -g
```

#### Updates
- Redesigned minime.json. Please see new format below!
- The command now has the following options 

| Option  | Description |
| --- | --- | 
| -f [location] | minime.json location (if unspecified, will use current directory) | 
| -r | create all folders in path if they do not exist | 
| -p | js files will be minified (default: concat, uglify only) | 

- Please use the new version and let me know if you would like any better enhancements

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
