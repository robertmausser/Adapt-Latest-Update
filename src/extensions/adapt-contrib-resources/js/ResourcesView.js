import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';

export default class ResourcesView extends Backbone.View {

  className() {
    return 'resources';
  }

  initialize() {
    this.listenTo(Adapt, 'remove', this.remove);
    this.render();
  }

  events() {
    return {
      'click .js-resources-filter-btn-click': 'onFilterClicked',
      'click .resources-item-open': 'onOpenResource'
    };
  }

  render() {
    this.$el.html(Handlebars.templates.resources({
      model: this.model.toJSON(),
      resources: this.collection.toJSON()
    }));

    _.defer(() => {
      this.listenTo(Adapt, 'drawer:triggerCustomView', this.remove);
    });

    return this;
  }

  onFilterClicked(e) {
    this.$('.js-resources-filter-btn-click').removeClass('is-selected');

    let items;
    const filter = $(e.currentTarget).addClass('is-selected').attr('data-filter');
    if (filter === 'all') {
      items = this.$('.js-resources-item').removeClass('u-display-none');
    } else {
      this.$('.js-resources-item')
        .removeClass('u-display-none').not('.is-' + filter)
        .addClass('u-display-none');
      items = this.$('.js-resources-item.is-' + filter);
    }

    if (items.length < 0) return;
    a11y.focusFirst($(items[0]));
  }
  onOpenResource(evt) {
    var resourceLink = $(evt.currentTarget).attr("data-resource-link");
    if ($(evt.currentTarget).data("shouldopeninpopup")) {
      this.popupWindow(resourceLink, '_blank', window, '600', '500');
    }
  }
  popupWindow(url, windowName, win, w, h) {
    const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
    return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
  }


}
