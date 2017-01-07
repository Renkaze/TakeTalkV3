(function(){
Template.__checkName("end");
Template["end"] = new Template("Template.end", (function() {
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
    return Spacebars.mustache(view.lookup("_"), "endThanks");
  }))), "\n                ", HTML.DIV({
    class: "panel-body"
  }, "\n                    ", HTML.P(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "endSum");
  })), "\n                    ", HTML.Raw("<!--\n                    Endroit pour afficher les statistiques de fin de meeting et autres informations\n                        + Temps de parole de chaque participant\n                        + Temps de discussion pour chaque sujet\n                        + Le lien du document collaboratif\n                        + Export excel des stats\n                        + R�sultat du vote pour chaque sujet\n                        .....\n                    -->"), "\n                "), "\n            "), "\n        "), "\n    "), "\n");
}));

}).call(this);
