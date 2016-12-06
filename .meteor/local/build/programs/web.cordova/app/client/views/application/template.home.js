(function(){
Template.__checkName("home");
Template["home"] = new Template("Template.home", (function() {
  var view = this;
  return HTML.DIV({
    "class": "main-content"
  }, "\n    ", HTML.DIV({
    "class": "row"
  }, "\n        ", HTML.DIV({
    "class": "col-xs-12 col-md-6 col-md-offset-3"
  }, "\n            ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n                ", HTML.Raw('<div class="panel-heading"><span class="title">TakeTalk is your new companion app!</span></div>'), "\n                ", HTML.DIV({
    "class": "panel-body"
  }, "\n                    ", HTML.Raw("<p>With TakeTalk manage your contributors' speech time to make the best out of your meetings!</p>"), "\n                    ", HTML.DIV({
    "class": "spacer text-right"
  }, "\n                        ", HTML.BUTTON({
    type: "button",
    "class": "btn btn-space btn-primary btn-rounded btn-lg",
    id: "open"
  }, "\n                            ", HTML.A({
    style: "color:#fff",
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), "create");
    }
  }, HTML.Raw('<i class="icon icon-left s7-users"></i>'), " Open a meeting"), "\n                        "), "\n                    "), "\n                "), "\n            "), "\n        "), "\n    "), "\n");
}));

}).call(this);
