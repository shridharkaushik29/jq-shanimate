(function ($) {

    $.fn.shremove = function (classes) {
        var element = this;
        element.addClass(classes);
        var duration = element.css('animation-duration');
        duration = duration.replace("s", "");
        duration = parseFloat(duration);
        setTimeout(function () {
            element.remove();
        }, duration * 1000)
//        originalRemove;
    }

})(jQuery)