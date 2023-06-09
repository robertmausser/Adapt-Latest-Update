define(["coreJS/adapt"], function (Adapt) {


    var Backbone = require('backbone');

    var pageHeaderBackground = Backbone.View.extend({

        className: "extension",

        initialize: function () { }
    });

    Adapt.on("pageView:ready", function (view) {
        var headerBackground = view.model.get('_pageHeaderBackground');
        if (!headerBackground || !headerBackground._isEnabled) return;

        var $pageHeader = view.$el.find('.page__header');
        var $pageHeaderContent = view.$el.find('.page__header-inner');
        if (headerBackground.pageHeaderBackgroundLink) {
            $pageHeader.css('background', 'url(' + headerBackground.pageHeaderBackgroundLink + ')');
            //$pageHeader.css({ 'background-size': 'cover', 'background-repeat': 'no-repeat' });
        }
        if (headerBackground.pageHeaderTitleImage && headerBackground.pageHeaderTitleImage.src) {
            $pageHeader.addClass("page-header-title-image image-align-" + headerBackground.pageHeaderTitleImage.alignment);
            var $div = $('<div class="page-header-image-inner">');
            var $titleImage = $('<img>');
            var isIE = Adapt.device.browser == 'microsoft edge' || Adapt.device.browser == 'internet explorer';
            var titleImageSource = isIE ? headerBackground.pageHeaderTitleImage.fallbackPageHeaderTitleImage : headerBackground.pageHeaderTitleImage.src;
            $titleImage.attr('src', titleImageSource);
            $div.append($titleImage);
            $pageHeaderContent.append($div);
        }

    });

    return pageHeaderBackground;
});
