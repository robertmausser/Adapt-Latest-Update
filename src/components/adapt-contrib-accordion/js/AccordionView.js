import ComponentView from 'core/js/views/componentView';
import _ from 'underscore';

import Adapt from 'core/js/adapt';
class AccordionView extends ComponentView {

  preRender() {
    this.onClick = this.onClick.bind(this);
    this.listenTo(this.model.getChildren(), 'change:_isActive', this.onItemsActiveChange);
  }

  postRender() {
    // If an item is active add display: block; to start jquery animate state
    this.getItemElement(this.model.getActiveItem())?.find('.js-accordion-item-content')?.css('display', 'block');
    this.setReadyStatus();
    if (this.model.get('_setCompletionOn') !== 'inview') return;
    this.setupInviewCompletion();
  }

  onClick(event) {
    console.log(event.currentTarget.value);
    var index = $(event.currentTarget).parents('.js-accordion-item').data('index');
    console.log(index);
    // if(!this.model.getItem(index).get("_isVisited"))   {
      _.delay(function(){
        Adapt.trigger("audio:itemControl",this.$(`.item-audio-container.${this.model.get("_id")}-${index}`).data("audio-id"));

      }.bind(this),1000);
    
    // this.model.toggleItemState(index);
    this.model.toggleItemsState(index);
  }

  onItemsActiveChange(item, isActive) {
    this.toggleItem(item, isActive);
  }

  toggleItem(item, shouldExpand) {
    const $item = this.getItemElement(item);
    const $body = $item.children('.js-accordion-item-content').stop(true, true);
    if (!shouldExpand) {
      $body.slideUp(this.model.get('_toggleSpeed'));
      return;
    }
    $body.slideDown(this.model.get('_toggleSpeed'));
  }

  getItemElement(item) {
    if (!item) return;
    const index = item.get('_index');
    return this.$('.js-accordion-item').filter(`[data-index="${index}"]`);
  }

}

AccordionView.template = 'accordion.jsx';

export default AccordionView;
