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
        /**
         * What class name to add to the elements when they appear in the viewport or has been
         * scrolled past. This class is what should trigger the CSS animation.
         */
        className: 'has-entered',

        /**
         * The threshold should be a value between 0 and 1 and defines how much of the element that
         * has to be visible in the viewport for the CSS class specified in className to be added.
         * If we'd use a value of 0 the class would be added as soon as the element appears in the
         * bottom of the viewport. If we were to use the value of 1 the class would be added as
         * soon as the whole item is in the viewport.
         */
        threshold: 0.5,

        /**
         * Set throttle to a value greater than 0 to only call the class adding function at most
         * once per every X milliseconds.
         */
        throttle: 100
    }, opts);

    if (settings.threshold < 0 || settings.threshold > 1) {
        throw new Error('The threshold needs to be a number between 0 and 1.');
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
