## Introduction

Welcome to the documentation for Twig, the flexible, fast, and secure template engine for PHP and also for JavaScript.

Twig is both designer and developer friendly by sticking to PHP's principles and adding functionality useful for templating environments.

The key-features are:

- Fast: Twig compiles templates down to plain optimized PHP/JS code. The overhead compared to regular PHP/JS code was reduced to the very minimum.
- Secure: Twig has a sandbox mode to evaluate untrusted template code. This allows Twig to be used as a template language for applications where users may modify the template design.
- Flexible: Twig is powered by a flexible lexer and parser. This allows the developer to define their own custom tags and filters, and to create their own DSL.
- Twig is used by many Open-Source projects like Symfony, Drupal8, eZPublish, phpBB, Matomo, OroCRM; and many frameworks have support for it as well like Slim, Yii, Laravel, and Codeigniter — just to name a few.

### Twig Reference Documentation

- [Twing Documentation](https://twing.nightlycommit.com/known_issues.html)
- [Twig Reference
  ](https://twig.symfony.com/doc/3.x/#reference)

## Getting Started

### Installation

```
npm install kstpl
```

### Load the library

```js
const KsTpl = require("kstpl");
```

### Create your template files

- File: index.twig

```twig
<div>
    {% for item in list %}

        {% if item.twig %}

            {% include 'simple.item.twig' with { 'item': item }  %}

        {% else %}

            {% include 'simple.item.html' with { 'name': item.name, 'age': item.age } %}

        {% endif %}

    {% endfor %}
</div>
```

- File: simple.item.twig

```twig
<h1> TWIG_{{ item.name ~ ':' ~ item.age }} </h1>
```

- File: simple.item.html

```twig
<h2> STRI_{{name}}:{{age}} </h2>
```

### Configure the library

```js
KsTpl.configure({
  ext: "twig", // template extension by default
  path: "./templates/", // path to templates
  default: "twing", // the default driver to use
});
```

### Define your data

```js
const data = {
  list: [
    { name: "Mat", age: 3, twig: true },
    { name: "Deg", age: 4, twig: false },
    { name: "Ste", age: 5, twig: true },
  ],
};
```

### Build the HTML from data and templates

```js
const htmlOutput = await KsTpl.render("index", data);
```

### Expected result

```html
<div>
  <h1>TWIG_Mat:3</h1>
  <h2>STRI_Deg:4</h2>
  <h1>TWIG_Ste:5</h1>
</div>
```

## Advanced topics

### Define Filters

Filters allow adding extra functionality to the template engine in a simple way based on pipes.

```twig
{{ 'TWING'|lower }}

{# will output: twing #}
```

When called by the template, the executor receives the left side of the filter (before the pipe |) as second argument and the arguments passed within parentheses () as rest arguments.

```js
const filters = {
  double: {
    handler: (context, value) => {
      return Promise.resolve(parseInt(value) * 2);
    },
  },
  isNumber: {
    handler: (context, value) => {
      return Promise.resolve(typeof value === "number");
    },
  },
};
```

The handler is a function that takes an instance of TwingExecutionContext as first parameter, the value to filter as second parameter and the specific parameters of the filter as rest parameters, and returns a Promise that resolve to the filtered result.

```twig
{{ 15|double }}

{# will output: 30 #}
```

Filters can be created setting a new property in the the filters list into the config options.

```js
const html = await KsTpl.compile(template, data, { filters });
```

### Define Functions

Functions are defined in the exact same way as filters, but you need to use the **functions** property.

```js
const functions = {
  sum: {
    params: [{ name: "left" }, { name: "right" }],
    handler: (context, left, right) => {
      return Promise.resolve(parseInt(left) + parseInt(right));
    },
  },
};
```

Filters can be created setting a new property in the the filters list into the config options.

```js
const html = await KsTpl.compile(template, data, { functions });
```

```twig
{{ sum(10, 5) }}

{# will output: 15 #}
```

It is also possible to combine **Filters** and **Functions**:

```js
const html = await KsTpl.compile(template, data, { functions, filters });
```

```twig
{{ sum(10, 5)|double }}

{# will output: 30 #}
```


