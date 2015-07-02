# animate-entrance

[![NPM version][npm-image]][npm-url]

> A jQuery plugin for animating the entrances of DOM elements as they appear in the viewport.


## Install

```
$ npm install --save animate-entrance
```


## Usage

```js
$('.selector').animateEntrance({
    className: 'is-entered',
    threshold: 0.5,
    throttle: 100
});
```


## Options

### className
What class name to add to the elements when they appear in the viewport or has been scrolled past. This class is what should trigger the CSS animation. Default: `has-entered`.

### threshold
The threshold should be a value between 0 and 1 and defines how much of the element that has to be visible in the viewport for the CSS class specified in `className` to be added. If we'd use a value of 0, the class would be added as soon as the element appears in the bottom of the viewport. If we were to use the value of 1, the class would be added as soon as the whole item is in the viewport. Default: `0.5`.

### throttle
Set `throttle` to a value greater than 0 to only call the class adding function at most once per every `throttle` milliseconds. Default: `100`.


## License

MIT © [Jonathan Persson](https://github.com/jonathanp)

[npm-url]: https://npmjs.org/package/animate-entrance
[npm-image]: https://badge.fury.io/js/animate-entrance.svg