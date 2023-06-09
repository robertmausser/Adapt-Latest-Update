import Adapt from 'core/js/adapt';
import Visua11ySettingsView from './Visua11ySettingsView';
import notify from 'core/js/notify';

class AnimationsButtonView extends Backbone.View {

  attributes() {
    return {
      'aria-label': Adapt.visua11y.config._button.navigationAriaLabel,
      'title': Adapt.visua11y.config._button.navigationAriaLabel,
      'data-order': (Adapt.course.get('_globals')?._extensions?._visua11y?._navOrder || 0)
    };
  }

  tagName() {
    return 'button';
  }

  className() {
    return 'btn-icon nav__btn visua11y-btn';
  }

  events() {
    return {
      click: 'onClick'
    };
  }

  initialize() {
    this.onNotifyClosed = this.onNotifyClosed.bind(this);
    this.onNotifyClicked = this.onNotifyClicked.bind(this);
    this.render();
  }

  render() {
    const template = Handlebars.templates.visua11yButton;
    const data = {
      _globals: Adapt.course?.get('_globals')
    };
    this.$el.html(template(data));
    this.$el.prop('title', 'Accessibility Settings');
        
  }

  onClick(event) {
    if (event && event.preventDefault) event.preventDefault();
    const config = Adapt.course.get('_visua11y');
    Adapt.visua11y.settingsPrompt = notify.popup({
      //body: config.body,
      //title: config.title,
      _view: new Visua11ySettingsView(),
      _classes: 'is-visua11ysettings',
      _showCloseButton: config._showCloseButton || false
    });
    this.render();
    Adapt.visua11y.settingsPrompt.$el.on('click', this.onNotifyClicked);
    Adapt.trigger('visua11y:opened');
    this.listenTo(Adapt, 'notify:closed', this.onNotifyClosed);
  }

  onNotifyClicked(event) {
    const $target = $(event.target);
    const isChild = ($target.parents('.notify__popup-inner').length !== 0);
    if (isChild) return;
    Adapt.visua11y.settingsPrompt.closeNotify();
  }

  onNotifyClosed(notify) {
    if (notify !== Adapt.visua11y.settingsPrompt) return;
    Adapt.visua11y.settingsPrompt.$el.off('click', this.onNotifyClicked);
    Adapt.visua11y.settingsPrompt = null;
    this.stopListening(Adapt, 'notify:closed', this.onNotifyClosed);
  }

}

export default AnimationsButtonView;
