# minime
Minifier for front-end assets

#### Install
```shell
npm install minime -g
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