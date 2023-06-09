define([
    'coreJS/adapt',
    './adapt-offlineNotifyExtension'
],function(Adapt) {

    var configDefaults = {
        "_isEnabled":false,
        "_notifyWhenOffline":true,
        "_notifyWhenOnline":false,
        "_modal":false,
        "_offlineMessageTitle":"Warning",
        "_offlineMessageBody":"You are not online",
        "_onlineMessageTitle":"Information",
        "_onlineMessageBody":"You are online"
    };

    var OfflineView = Backbone.View.extend({
        events: {
            'click':'onClick'
        },

        initialize:function() {
            this.listenTo(Adapt, 'notify:opened', this.onNotifyOpened);
            this.listenTo(Adapt, 'notify:closed', this.onNotifyClosed);

            //$(window).on('online', _.bind(this.onNotifiedOnline, this));
            $(window).on('offline', _.bind(this.onNotifiedOffline, this));
            $(window.parent).on('beforeunload', _.bind(this.onNotifiedOffline, this));

            if (navigator.onLine === false) this.onNotifiedOffline();
        },

        pauseAV:function() {
            // for Flash video
            $('embed object').each(function(index, el) {if (el.pauseMedia) el.pauseMedia();});
            // for HTML5 video
            $('video').each(function(index, el) {if (el.pause) el.pause();});
            // for audio
            Adapt.trigger('audio:stop');
        },

        triggerOnlinePopup:function() {
            var config = Adapt.course.get('_offline');
            var alertObject = {
                _classes: 'online',
                title: config._onlineMessageTitle,
                body: config._onlineMessageBody,
                _isCancellable: true
            };

            if (this.notifyView) this.notifyView.closeNotify();

            this.pauseAV();

            Adapt.trigger('notify:popup', alertObject);
        },

        triggerOfflinePopup:function() {
            var config = Adapt.course.get('_offline');
            var alertObject = {
                _classes: 'offline' + (config._modal ? ' modal' : ''),
                title: config._offlineMessageTitle,
                body: config._offlineMessageBody,
                _isCancellable: true
            };

            if (this.notifyView) this.notifyView.closeNotify();

            this.pauseAV();

            Adapt.trigger('notify:popup', alertObject);
        },

        onNotifyOpened:function(notifyView) {
            this.notifyView = notifyView;
        },

        onNotifyClosed:function() {
            this.notifyView = null;
        },

        onNotifiedOnline:function() {
            var config = Adapt.course.get('_offline');
            this.$el.removeClass('offline modal');
            if (config._notifyWhenOnline) this.triggerOnlinePopup();
            else if (this.notifyView) this.notifyView.closeNotify();
        },

        onNotifiedOffline:function() {
            var config = Adapt.course.get('_offline');
            this.$el.addClass('offline' + (config._modal ? ' modal' : ''));
            if (config._notifyWhenOffline) this.triggerOfflinePopup();
            else if (this.notifyView) this.notifyView.closeNotify();
        },

        onClick:function() {
            navigator.onLine ? this.triggerOnlinePopup() : this.triggerOfflinePopup();
        }
    });

    function setup() {
        new OfflineView({el:$('.navigation-logo')});
    }

    Adapt.on('adapt:initialize', function() {
        var config = _.extend({}, configDefaults, Adapt.course.get('_offline'));
        Adapt.course.set('_offline', config);

        if (config._isEnabled) setup();
    });
});