define(["coreJS/adapt"], function (Adapt) {


    var Backbone = require('backbone');

    var menuBackground = Backbone.View.extend({

        className: "extension",

        initialize: function () { }
    });

    Adapt.on("pageView:ready", function () {
        if (!Adapt.course.get('_menuBackground')) return;
        if (Adapt.course.get('_menuBackground')._menuHeader._applyToPage || !(Adapt.course.get('_menuBackground')._menuHeader._link === "")) {
            $('.page-header').css('background', 'url(' + Adapt.course.get('_menuBackground')._menuHeader._link + ')');
            $('.page-header').css('background-size', 'cover');
            $('.page-header').attr({ 'role': 'img', 'aria-label': "" });
        }
    });
    Adapt.on("menuView:ready", function () {
        if (!Adapt.course.get('_menuBackground')) return;
        if (!(Adapt.course.get('_menuBackground')._menuHeader._link === "")) {
            $('.menu__header').css('background', 'url(' + Adapt.course.get('_menuBackground')._menuHeader._link + ')');
            $('.menu__header').css('background-size', 'cover');
            // $('.menu__header').attr({ 'role': 'img', 'aria-label': "" });
        }
        if (!(Adapt.course.get('_menuBackground')._backgroundLink === "")) {
            $('.menu__inner').css('background', 'url(' + Adapt.course.get('_menuBackground')._backgroundLink + ')');
            //$('.menu-container-inner').css('padding-bottom', '22%');
            $('.menu__inner').css('background-size', 'cover');
            $('.menu__inner').css('background-position-y', '300px');
        }
    });

    return menuBackground;
});
