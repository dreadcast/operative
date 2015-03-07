Operative
======

My gulp tasks...

## License ##

Operative is released under the [WTFPL](http://www.wtfpl.net/txt/copying/)

## How it works ? ##

This will bump your package, commit changes and add a tag.
Before commits are pushed to repo, your javascript source files will be yuidoc'd and pushed to your gh-pages branch...

### Your gulpfile.js###

```javascript
var gulp = require('gulp');
require('dreadcast-operative/release')(gulp);
```

In your console, type `gulp release:ghpages -patch`
Replace "patch" with "minor" or "major", according to your semver.


## Available tasks ##

* doc:build
* doc:move
* doc:checkoutGhPages
* doc:copy
* doc:commit
* doc:push
* doc:checkoutMaster
* doc:publish
* version:bump
* version:commit
* version:tag
* version:bumptag
* version:push
* version:full
* release:ghpages
* release:docs
* release:default
