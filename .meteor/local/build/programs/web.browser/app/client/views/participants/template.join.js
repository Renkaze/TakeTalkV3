(function(){
Template.__checkName("join");
Template["join"] = new Template("Template.join", (function() {
  var view = this;
  return HTML.DIV({
    class: "main-content"
  }, HTML.DIV({
    class: "row"
  }, HTML.DIV({
    class: "col-md-8 col-md-offset-2"
  }, "\n    ", HTML.DIV({
    class: "panel panel-default"
  }, "\n        ", HTML.DIV({
    class: "panel-heading"
  }, HTML.SPAN({
    class: "title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "joinTitle");
  }))), "\n        ", HTML.DIV({
    class: "panel-body"
  }, "\n            ", Blaze.If(function() {
    return Spacebars.call(view.lookup("joinError"));
  }, function() {
    return [ "\n                ", HTML.Comment(" Alerte d�clanch�e lors d'une erreur lors du remplissage du formulaire "), "\n                ", HTML.DIV({
      role: "alert",
      class: "alert alert-danger alert-dismissible"
    }, "\n                    ", HTML.BUTTON({
      type: "button",
      "data-dismiss": "alert",
      "aria-label": "Close",
      class: "close"
    }, HTML.SPAN({
      "aria-hidden": "true",
      class: "s7-close"
    })), "\n                    ", HTML.SPAN({
      class: "icon s7-close-circle"
    }), "\n                    ", HTML.STRONG("!"), " ", Blaze.View("lookup:joinError", function() {
      return Spacebars.mustache(view.lookup("joinError"));
    }), "\n                "), "\n            " ];
  }), "\n            ", HTML.FORM({
    role: "form"
  }, "\n                ", HTML.DIV({
    class: "form-group"
  }, "\n                    ", HTML.LABEL({
    for: "participantName"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "joinName");
  })), "\n                    ", HTML.Raw('<input id="participantName" name="participantName" type="text" class="form-control" required="" autofocus="">'), "\n                "), "\n                ", HTML.DIV({
    class: "form-group"
  }, "\n                    ", HTML.LABEL({
    for: "pass"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "joinPwd");
  })), "\n                    ", HTML.Raw('<input id="pass" name="pass" type="password" class="form-control" required="">'), "\n                "), "\n\n                ", HTML.DIV({
    class: "spacer text-right"
  }, "\n                    ", HTML.BUTTON({
    id: "join",
    type: "submit",
    name: "join",
    class: "btn btn-space btn-primary",
    disabled: "disabled"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "joinSubmit");
  })), "\n                "), "\n            "), "\n        "), "\n    "), "\n")));
}));

}).call(this);
