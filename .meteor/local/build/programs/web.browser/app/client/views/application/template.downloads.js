(function(){
Template.__checkName("downloads");
Template["downloads"] = new Template("Template.downloads", (function() {
  var view = this;
  return [ HTML.DIV({
    class: "page-head"
  }, "\n    ", HTML.H2(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "downloadTitle");
  })), "\n"), "\n", HTML.DIV({
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
    return Spacebars.mustache(view.lookup("_"), "downloadBodyTitle");
  }))), "\n                ", HTML.DIV({
    class: "panel-body"
  }, "\n                    ", HTML.P(HTML.A({
    href: "/Presentation_V1.pdf"
  }, "V1- ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "presentationApp");
  }))), "\n                    ", HTML.P(HTML.A({
    href: "/Presentation_V2.pdf"
  }, "V2- ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "presentationApp");
  }))), "\n                "), "\n            "), "\n        "), "\n    "), "\n") ];
}));

}).call(this);
