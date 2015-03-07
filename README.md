Operative
======

My gulp tasks...

## License ##

Operative is released under the [WTFPL](http://www.wtfpl.net/txt/copying/)

## How it works ? ##

This will bump your package, commit changes and add a tag.
Before commits are pushed to repo, your javascript source files will be yuidoc'd and pushed to your gh-pages branch...

```javascript
var gulp = require('gulp');
require('dreadcast-operative/release')(gulp);
```