define([
    'coreJS/adapt',
    'coreViews/notifyView'
], function(Adapt, NotifyView) {

    var orig = {
        //onCloseButtonClicked:NotifyView.prototype.onCloseButtonClicked,
        onKeyUp:NotifyView.prototype.onKeyUp
    };

    //NotifyView.prototype.onCloseButtonClicked = function(options) {
      //  if (navigator.onLine !== false || !Adapt.course.get('_offline')._modal) {
       //     window.close();
         //   orig.onCloseButtonClicked.apply(this, arguments);
       // }
//};

    NotifyView.prototype.onKeyUp = function(options) {
        if (navigator.onLine !== false || !Adapt.course.get('_offline')._modal) {
            orig.onKeyUp.apply(this, arguments);
        }
    };
});
