define(function (require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var Flipper = ComponentView.extend({
        shouldPrevEnabled: true,
        events: {
            "click .flipper-item-next-button": "onNextBtnClick",
            "click .flipper-item-previous-button": "onPreviousBtnClick",
            "click .flipper-item-complete-button": "onCompleteBtnClick"
        },

        preRender: function () {
            this.listenTo(this.model, 'change:_stage', this.playAudio)
            this.model.get("_items")[0]?._audio ? this.model.get("_items")[0]._audio._autoplayWhenOnScreen = true : '';

            this.model.set("_stage", 0);
            this.locked = false;
        },

        playAudio: function(state){

            Adapt.trigger("audio:itemControl",`${this.model.get("_id")}-${this.model.get("_stage")}`);
        },
        
        postRender: function () {
            var $container = this.$(".flipper-container");
            var stage = this.model.get("_stage")

            if (stage === 0 && !this.model.get("_isComplete")) {
                this.$(".flipper-item-previous-button").attr("disabled", true);
            }
            if (this.model.get("width")) {
                $container.width(this.model.get("width"));
            }
            $container.imageready(this.onImageReady.bind(this));
            this.$(".flipper.stage-0").on('inview.componentView', this.onFlipperWidgetInview.bind(this));
        },

        onFlipperWidgetInview: function (event, visible, visiblePartX, visiblePartY) {
            if (!visible) return;
            switch (visiblePartY) {
                case 'top':
                    this.hasSeenTop = true;
                    break;
                case 'bottom':
                    this.hasSeenBottom = true;
                    break;
                case 'both':
                    this.hasSeenTop = this.hasSeenBottom = true;
            }
            if (!this.hasSeenTop || !this.hasSeenBottom) return;
            Adapt.trigger("audio:itemControl", `${this.model.get("_id")}-${this.model.get("_stage")}`);
            this.$(".flipper.stage-0").off('inview.componentView');
        },

        onImageReady: function () {
            this.setItemNextVisibility();
            this.setItemHeights();
            this.setReadyStatus();
        },

        setItemHeights: function () {
            if (this.model.get("_equalHeights") === false) return;
            var $items = this.$(".flipper-item");
            var hMax = _.reduce($items, function (hMax, el) {
                var h = $(el).outerHeight();
                return h > hMax ? h : hMax;
            }, 0);
            $items.height(hMax);
            this.$(".flipper-container").height(hMax);
        },

        setItemNextVisibility: function () {
            var stage = this.model.get("_stage");
            var rx = /state-\d+/;
            _.each(this.$(".flipper-item"), function (el, i) {
                if (stage === i) {
                    el.className = el.className.replace(rx, 'state-1');
                    $(el).attr("aria-hidden", "false");
                } else if (stage - 1 === i || (stage === 0 && i === this.model.get('_items').length - 1)) {
                    el.className = el.className.replace(rx, 'state-2');
                    $(el).attr("aria-hidden", "true");
                } else {
                    el.className = el.className.replace(rx, 'state-0');
                    $(el).attr("aria-hidden", "true");
                }
            }, this);
        },

        setItemPreviousVisibility: function () {
            var stage = this.model.get("_stage");
            var rx = /state-\d+/;
            _.each(this.$(".flipper-item"), function (el, i) {
                if (stage === i) {
                    el.className = el.className.replace(rx, 'state-1');
                    $(el).attr("aria-hidden", "false");
                } else if (stage + 1 === i || (stage === 0 && i === this.model.get('_items').length)) {
                    el.className = el.className.replace(rx, 'state-2');
                    $(el).attr("aria-hidden", "true");
                } else {
                    el.className = el.className.replace(rx, 'state-0');
                    $(el).attr("aria-hidden", "true");
                }
            }, this);
        },

        onNextBtnClick: function () {

            if (this.locked) return;
            this.setLock();
            var numItems = this.model.get("_items").length;
            var stage = this.model.get("_stage") + 1;
            console.log("next btn stage" + stage);
            this.$(".flipper").removeClass("prev-direction");
            this.$(".flipper").addClass("next-direction");
            this.setStage(stage);
            if (!stage == 0 && this.shouldPrevEnabled) {
                this.$(".flipper-item-previous-button").removeAttr("disabled");
            }
            _.delay(function () { this.$(".state-1 > .flipper-item-title").attr("tabindex", 0).focus(); }.bind(this), 1000);

            if (numItems - 1 === stage) {
                this.setCompletionStatus();

            }
        },

        onPreviousBtnClick: function () {

            if (this.locked) return;
            this.setLock();
            var firstStage = this.model.get("_stage");
            var stage = this.model.get("_stage") - 1;
            var numItems = this.model.get("_items").length;

            if (firstStage === 0) {
                stage = numItems - 1;
            }
            if (stage == 0 && this.shouldPrevEnabled) {
                this.$(".flipper-item-previous-button").attr("disabled", true);
            }

            this.$(".flipper").removeClass("next-direction");
            this.$(".flipper").addClass("prev-direction");

            this.model.set("_stage", stage);
            var flipper = this.$(".flipper")[0];
            flipper.className = flipper.className.replace(/stage-\d+/, "stage-" + stage);


            this.setItemPreviousVisibility();
            _.delay(function () { this.$(".state-1 > .flipper-item-title").attr("tabindex", 0).focus(); }.bind(this), 1000);

        },

        onCompleteBtnClick: function () {

            if (this.locked) return;
            this.setLock();
            var stage = this.model.get("_stage") + 1;
            var numItems = this.model.get("_items").length;
            if (stage === numItems) {
                stage = 0;
            }
            this.setStage(stage);
            this.$(".flipper-item-previous-button").removeAttr("disabled");
            this.$(".state-1 > .flipper-item-title").attr("tabindex", 0).addClass("flipperFocus");

            this.shouldPrevEnabled = false;
            this.setCompletionStatus();
        },

        setLock: function () {
            var $flipper = this.$(".flipper");
            $flipper.addClass("animating");
            this.locked = true;
            setTimeout(function () {
                $flipper.removeClass("animating");
                this.locked = false;
            }.bind(this), 600);
        },

        setStage: function (stage) {
            this.model.set("_stage", stage);
            var flipper = this.$(".flipper")[0];
            flipper.className = flipper.className.replace(/stage-\d+/, "stage-" + stage);
            this.setItemNextVisibility();
        }

    });

    Adapt.register('flipper', Flipper);

    return Flipper;

});
