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
    }

    $.fn.shhide = function (classes) {
        var element = this;
        element.addClass(classes);
        var duration = element.css('animation-duration');
        duration = duration.replace("s", "");
        duration = parseFloat(duration);
        setTimeout(function () {
            element.hide();
        }, duration * 1000)
    }

//    $.fn.moveTo = function (target, options) {
//        var parent = $(options.parent || "body");
//        var element = this.css("visibility", "hidden");
//        var css1 = {
//            position: "absolute",
//            top: element.offset().top,
//            width: element.width(),
//            height: element.height(),
//            left: element.offset().left
//        }
//        element.css(css1);
//    }

    var transitionTime = function (element) {
        var time = $(element).css("transition-duration").replace("s", "");
        time = parseFloat(time) * 1000;
        return time;
    }

    $.fn.animateAnchor = function (options) {
        var options = options || {};
        var parent = $(options.parent || "body");
        var movingClass = options.movingClass || 'moving';
        var element = this.css("visibility", "hidden");

        var css1 = {
            top: element.offset().top,
            width: element.width(),
            height: element.height(),
            left: element.offset().left
        }


        var clone = element.clone().css({
            position: "absolute",
            visibility: "visible"
        });

        parent.append(clone);
        clone.css(css1).addClass(movingClass);

        new Promise(function (resolve) {
            if (typeof options.target === 'function') {
                options.target().then(function (targetElement) {
                    var target = $(targetElement);
                    var css2 = {
                        top: target.offset().top,
                        width: target.width(),
                        height: target.height(),
                        left: target.offset().left
                    }
                    resolve(css2);
                })
            } else {
                var target = $(options.target);
                setTimeout(function () {
                    var css2 = {
                        top: target.offset().top,
                        width: target.width(),
                        height: target.height(),
                        left: target.offset().left
                    }
                    resolve(css2);
                })
            }
        }).then(function (css) {
            clone.css(css)
            var time = transitionTime(clone);
            setTimeout(function () {
                clone.remove();
                if (options.onComplete) {
                    options.onComplete();
                }
            }, time)
        })

    }

})(jQuery)