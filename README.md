decaf-hogan
===========

Twitter's fast mustache/handlebars template engine for decaf.

## Installation

```
$ bower install git://github.com/decafjs/decaf-hogan
```

## Basic Usage

```javascript
var Hogan = require('decaf-hogan').Hogan,
	template = Hogan.compile('hello {{name}}');

    console.log(template.render({ name: 'Hogan' }));
```

Outputs:
```
hello Hogan
```

## Paritals

The compile() method of Hogan allows a second argument to be provided that is a hash of partial template names to compiled partial templates.

```javascript
var Hogan = require('decaf-hogan').Hogan,
	partial = Hogan.compile('hello {{name}}'),
    template = '{{> arbitrary_partial_name }}';

    console.log(template.render({ name: 'Hogan' }, { arbitrary_partial_name: parital }));
```

Outputs:
```
hello Hogan
```

## TemplateManager

This module provides a TemplateManager helper class.  TemplateManager is a proxy (hash) for your templates and partials.  TemplateManager is instantiated like this:

```javascript
var TemplateManager = require('decaf-hogan').TemplateManager,
	templateManager = new TemplateManager('views');
```

This creates an instance of TemplateManager that serves templates and partials from the relative path "views".  This is quite powerful as the following example demmonstrates:

./views/pages/home.hbs:
```handlebars
<html>
{{> partials/header }}
<body>
<h1>{{ title }}</h1>
</body>
</html>
```

./views/partials/header.hbs:
```handlebars
<head>
<title>{{title}}</title>
</head>
```
The following program:

```javascript
var TemplateManager = require('decaf-hogan').TemplateManager,
	templateManager = new TemplateManager('views');

    templateManager['pages/home'].render({ title: 'example'}, templateManager);
```

outputs:
```html
<html>
<head>
<title>example</title>
</head>
<body>
<h1>example</h1>
</body>
</html>
```

Any access to a member of templateManager is intercepted by the proxy.  The name of the member is assumed to be a path relative to the template path passed to the TemplateManager constructor.  TemplateManager watches the files in the template path; if they are changed on disk, they are loaded and recompiled automatically.  Passing the templateManager instance to the template render function as the second argument allows the proxy to process requests for partials.
