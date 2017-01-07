(function(){
Template.__checkName("home");
Template["home"] = new Template("Template.home", (function() {
  var view = this;
  return HTML.DIV({
    class: "main-content"
  }, "\n    ", HTML.DIV({
    class: "row"
  }, "\n        ", HTML.DIV({
    class: "col-xs-12 col-md-6 col-md-offset-3"
  }, "\n            ", HTML.DIV({
    class: "panel panel-default"
  }, "\n                ", HTML.DIV({
    class: "panel-heading"
  }, HTML.SPAN({
    class: "title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "homeTitle");
  }))), "\n                ", HTML.DIV({
    class: "panel-body"
  }, "\n                    ", HTML.P(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "homeBody");
  })), "\n                    ", HTML.DIV({
    class: "spacer text-right"
  }, "\n                        ", HTML.BUTTON({
    type: "button",
    class: "btn btn-space btn-primary btn-rounded btn-lg",
    id: "open"
  }, "\n                            ", HTML.A({
    style: "color:#fff",
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "create");
    }
  }, HTML.Raw('<i class="icon icon-left s7-users"></i>'), Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "openMeeting");
  })), "\n                        "), "\n                    "), "\n                "), "\n            "), "\n        "), "\n    "), "\n");
}));

}).call(this);
