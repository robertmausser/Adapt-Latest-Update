/*
 * adapt-tooltip
 * License -
 */
define(function(require) {
    var Adapt = require('core/js/adapt');
    var CONFIG = require('./conf');
    var $tooltip = null;
    var $targetEle = null;

    function setUptoolTip() {
        window.tooltip = onMouseEnter;
        window.tooltipFocus = onMouseEnter;
    };

    var onMouseEnter = function(evt) {
        $targetEle = $(this);
        
        var tip = $targetEle.attr('data-title');
        if($targetEle.attr('data-type') != undefined && $targetEle.attr('data-type') != 'undefined') {
            tip += $targetEle.find('.pagelevelprogress__indicator-bar')[0].style.width;
        }
        if (!tip || tip == '') return false;
        $tooltip = $('<div id="tooltip" role="tooltip"></div>');
        var lazyLayout = _.debounce(showTooltip, 200);
        $tooltip.css('opacity', 0).html(tip).appendTo('body');
        showTooltip();
        $(window).resize(_.bind(lazyLayout, this));
        $targetEle.on('mouseleave', removeTooltip);
        $targetEle.on('focusout', removeTooltip);
        $tooltip.on('click',removeTooltip);
        $(window).on('click scroll', removeTooltip);
    };

    function showTooltip() {
        if (!$tooltip || !$targetEle) return;
        setUptoolTipWidth();
        var targetEleLeft = $targetEle.offset().left;
        var targetEleTop = $targetEle[0].getBoundingClientRect().top;
        var targetEleWidth = $targetEle.outerWidth();
        var targetEleHeight = $targetEle.outerHeight();

        var tooltipWidth = $tooltip.outerWidth();
        var tooltipHeight = $tooltip.outerHeight();

        var posLeft = targetEleLeft + (targetEleWidth / 2) - (tooltipWidth / 2);
        var posTop = targetEleTop - tooltipHeight - CONFIG.POSIONFROMTEXT;

        if (posLeft < 0) {
            posLeft = targetEleLeft + targetEleWidth / 2 - CONFIG.POSIONFROMTEXT;
            $tooltip.addClass('left');
        } else {
            $tooltip.removeClass('left');
        }

        if (posLeft + tooltipWidth > $(window).width()) {
            posLeft = targetEleLeft - tooltipWidth + targetEleWidth / 2 + CONFIG.POSIONFROMTEXT;
            $tooltip.addClass('right');
        } else {
            $tooltip.removeClass('right');
        }

        if (posTop < 0) {
            var posTop = targetEleTop + targetEleHeight + targetEleTop;
            $tooltip.addClass('top');
        } else {
            $tooltip.removeClass('top');
        }

        $tooltip.css({
            left: posLeft,
            top: posTop
        }).animate({
            top: '+=' + CONFIG.ANIMATE_TOP,
            opacity: 1
        }, CONFIG.DURATION, CONFIG.EASING);

    };
    function setUptoolTipWidth() {
        if ($(window).width() < $tooltip.outerWidth() * CONFIG.PADDINGFACTOR) {
            $tooltip.css('max-width', $(window).width() / 2);
        } else {
            $tooltip.css('max-width', CONFIG.MAX_WIDTH);
        }
    };

    function removeTooltip() {
        $('#tooltip').remove();
        /*$tooltip.remove(); animate({
            top: '-=' + CONFIG.ANIMATE_TOP,
            opacity: 0
        }, CONFIG.DURATION, CONFIG.EASING, function() {
            $(this).remove();
            $tooltip = null;
            $targetEle = null;
        }); */
    };

    Adapt.on("app:dataReady", function() {
        var tooltip = Adapt.course.get('_tooltip')
        if (tooltip && tooltip._isEnabled) {
            setUptoolTip();
        }
    });
    Adapt.on("menuView:postRender menuItemView:postRender pageView:postRender", function() {
        var globalTooltip = Adapt.course.get('_tooltip') && Adapt.course.get('_tooltip').globalTooltip;
        _.delay( () => {
            _.each( globalTooltip, (tooltip, index) => { 
                _.each($(tooltip.selector), (ele) => {
                    if (!$(ele).parent().hasClass('tooltip-span')) {
                        $(ele).wrap(`<span id="tooltip-span-${index}" class="tooltip-span" data-title="${tooltip.text}" data-rel="tooltip" data-type="${tooltip.type}" onmouseenter="tooltip.call(this)" onfocusin="tooltipFocus.call(this)"></span>`);
                    }
                })            
            })
        }, 1000);
    });
});

