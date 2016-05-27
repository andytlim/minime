# minime
Minifier for front-end assets
  
#### Add minime.json to project
```javascript
{
    "jsRoot": "path/to/js",
    "jsMap": {
        "target.js" : [ "component-1.js", "component-2.js" ]
    },
    "cssRoot": "path/to/css",
    "cssMap": {
        "target.css" : [ "component-1.css", "component-2.css" ]
    }
}
```

#### Run 
```shell
minime
```