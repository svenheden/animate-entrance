var $ = require('jquery');
var throttle = require('lodash.throttle');

$.fn.animateEntrance = function(opts) {
    'use strict';

    var $elements = this;
    var $window = $(window);
    var eventNamespace;
    var settings;
    var eventString;

    settings = $.extend({
        className: 'has-entered',
        threshold: 0.5,
        throttle: 100
    }, opts);

    if (settings.threshold < 0.01 || settings.threshold > 1) {
        throw new Error('The threshold needs to be a number between 0.01 and 1.');
    }

    /**
     * Check if an element is in the viewport or has been scrolled past.
     * @return {Boolean}
     */
    var inView = function() {
        var $el = $(this);
        var elTop = $el.offset().top;
        var elHeight = $el.outerHeight();
        var breakpoint = (elTop + elHeight * settings.threshold);
        var viewed = ($window.scrollTop() + $window.height());

        return breakpoint <= viewed;
    };

    /**
     * Add the class name specified in the settings object to all elements
     * that's in the viewport or has been scrolled past. After that reduce the
     * element set to contain the elements that hasn't been viewed yet and if
     * there are no elements left unbind the event handler.
     */
    var addClassesAndReduceElementSet = function() {
        var $inView = $elements.filter(inView);

        $inView
            .addClass(settings.className)
            .trigger('entrance');

        $elements = $elements.not($inView);

        if ($elements.length === 0) {
            $window.off(eventNamespace);
        }
    };

    eventNamespace = '.' + $elements.selector.replace(/ /g, '');
    eventString = [
        'load' + eventNamespace,
        'scroll' + eventNamespace,
        'resize' + eventNamespace
    ].join(' ');

    $window.on(eventString, throttle(addClassesAndReduceElementSet, settings.throttle));

    return this;
};
