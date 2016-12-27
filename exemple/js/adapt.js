(function(window, document) {
    'use strict';
    var adapt = {};
    (function() {
        var viewportEl = document.querySelector('meta[name="viewport"]'),
            dpr = window.devicePixelRatio || 1,
            maxWidth = 640,
            designWidth = 0;
        dpr = dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1);
        document.documentElement.setAttribute('data-dpr', dpr);
        adapt.dpr = dpr;

        document.documentElement.setAttribute('max-width', maxWidth);
        adapt.maxWidth = maxWidth;

        if (designWidth) {
            document.documentElement.setAttribute('design-width', designWidth);
        }
        adapt.designWidth = designWidth;

        var scale = 1 / dpr,
            content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';

        if (viewportEl) {
            viewportEl.setAttribute('content', content);
        } else {
            viewportEl = document.createElement('meta');
            viewportEl.setAttribute('name', 'viewport');
            viewportEl.setAttribute('content', content);
            document.head.appendChild(viewportEl);
        }

    })();

    adapt.px2rem = function(px, designWidth) {
        if (!designWidth) {
            designWidth = parseInt(adapt.designWidth, 10);
        }

        return parseInt(px, 10) / 10;
    }

    adapt.rem2px = function(rem, designWidth) {
        if (!designWidth) {
            designWidth = parseInt(adapt.designWidth, 10);
        }
        return rem  * (designWidth / 10);
    }

    adapt.mresize = function() {

        var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;

        if (adapt.maxWidth && (innerWidth / adapt.dpr > adapt.maxWidth)) {
            innerWidth = adapt.maxWidth * adapt.dpr;
        }

        if (!innerWidth) {
            return false; }

        document.documentElement.style.fontSize = (innerWidth /10) + 'px';

        adapt.callback && adapt.callback();

    };

    adapt.mresize();


    window.addEventListener('resize', function() {
        clearTimeout(adapt.tid);
        adapt.tid = setTimeout(adapt.mresize, 30);
    }, false);


    window.addEventListener('load', adapt.mresize, false);



    setTimeout(function() {
        adapt.mresize();
    }, 300)

    window.adapt = adapt;

})(window, document);
