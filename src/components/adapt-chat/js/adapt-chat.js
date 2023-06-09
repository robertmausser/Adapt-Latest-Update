define(function (require) {

  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');

  var Chat = ComponentView.extend({

    events: {
      "click .chat-next": "nextItem"
    },

    preRender: function () {
      this.model.set("_stage", -1);
      this.setupButton();
    },

    postRender: function () {
      if (!this.model.get("_isComplete") || this.model.get("_isResetOnRevisit")) this.setupListItems();
      this.setReadyStatus();
    },

    setupButton: function () {
      var _button = this.model.get("_button") || {};

      if (!_button.startText) _button.startText = "Click here to begin";
      if (!_button.continueText) _button.continueText = "Next";

      this.model.set("_button", _button);
    },

    setupListItems: function () {
      var $chatItems = this.$(".chat-lines");
      //$chatItems.height($chatItems.height());
      var $items = this.$(".chat-line");
      var wWin = $(window).width();
      var context = this;
      $items.each(function (i) {
        var $el = $items.eq(i);
        var animateLeft;
        if (context.model.get("_singleParticipant")) {
          animateLeft = true;
        } else {
          animateLeft = context.model.get("_items")[i]._participant != 0;
        }
        var offset = $el.offset();
        offset.left = animateLeft ? -($el.outerWidth() + 10) : wWin + 10;
        $el.offset(offset).hide();
      });
      this.$(".chat-button").show();
      _.each(this.model.get('_items'), function (item, index) {
        context.setImage(index, item);
      });
    },

    setImage: function (index, item) {
      var $icon = this.$('.chat-icon-inner').get(index);
      $($icon).attr('src', this.model.get('_participants')[item._participant]._icon);
      var $name = this.$('.chat-icon-name').get(index);
      $($name).html(this.model.get('_participants')[item._participant].name);
    },

    nextItem: function () {
      var stage = this.model.get("_stage") + 1;
      this.setStage(stage);
    },

    setStage: function (stage) {
      this.model.set("_stage", stage);
      this.$(".chat-next").hide();
      var context = this;
      Adapt.log.debug(context.model.get("_items")[stage]._timeToShow);
      setTimeout(function () {
        if (context.model.get("_items")[stage]._button._isEnabled || stage === 0) {
          var continueText = context.model.get("_items")[stage]._button.buttonText || "Start";
          context.$(".chat-next").html(continueText);
        }
        context.showNextStage(stage);
      }, context.model.get("_items")[stage]._timeToShow * 1000);
    },

    showNextStage: function (stage) {
      var $item = this.$(".chat-line").eq(stage);
      $item.show();
      var h = $item.outerHeight(true);
      this.$(".chat-button").css({
        top: "+=" + h
      });
      setTimeout(function () {
        $item.css({
          left: 0
        });
      }, 250);

      if (this.model.get("_items").length - 1 === stage) { // reached the end
        this.onComplete();
        this.$('.chat-icon-name').show().a11y_focus();
      } else if (this.checkNextButton(stage + 1)) { // show next button after x seconds
        this.$(".chat-next").show();
      } else { // show next item after x seconds
        this.nextItem();
      }
    },

    checkNextButton: function (nextStage) {
      return this.model.get("_items")[nextStage]._button._isEnabled;
    },

    onComplete: function () {

      var $button = this.$(".chat-button");
      $button.css({
        top: $(window).height()
      });
     setTimeout(function () {
        $button.remove();
      }, 500);

      this.setCompletionStatus();
    }
  });

  Adapt.register('chat', Chat);

  return Chat;

});
