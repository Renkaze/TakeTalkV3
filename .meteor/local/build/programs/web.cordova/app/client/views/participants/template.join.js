(function(){
Template.__checkName("join");
Template["join"] = new Template("Template.join", (function() {
  var view = this;
  return HTML.DIV({
    "class": "main-content"
  }, HTML.DIV({
    "class": "row"
  }, HTML.DIV({
    "class": "col-md-8 col-md-offset-2"
  }, "\n    ", HTML.DIV({
    "class": "panel panel-default"
  }, "\n        ", HTML.Raw('<div class="panel-heading"><span class="title">Join a meeting</span></div>'), "\n        ", HTML.DIV({
    "class": "panel-body"
  }, "\n            ", Blaze.If(function() {
    return Spacebars.call(view.lookup("joinError"));
  }, function() {
    return [ "\n                ", HTML.Comment(" Alerte d�clanch�e lors d'une erreur lors du remplissage du formulaire "), "\n                ", HTML.DIV({
      role: "alert",
      "class": "alert alert-danger alert-dismissible"
    }, "\n                    ", HTML.BUTTON({
      type: "button",
      "data-dismiss": "alert",
      "aria-label": "Close",
      "class": "close"
    }, HTML.SPAN({
      "aria-hidden": "true",
      "class": "s7-close"
    })), "\n                    ", HTML.SPAN({
      "class": "icon s7-close-circle"
    }), "\n                    ", HTML.STRONG("!"), " ", Blaze.View("lookup:joinError", function() {
      return Spacebars.mustache(view.lookup("joinError"));
    }), "\n                "), "\n            " ];
  }), "\n            ", HTML.Raw('<form role="form">\n                <div class="form-group">\n                    <label for="participantName">Your name</label>\n                    <input id="participantName" name="participantName" type="text" class="form-control" required="" autofocus="">\n                </div>\n                <div class="form-group">\n                    <label for="pass">Meeting\'s password</label>\n                    <input id="pass" name="pass" type="password" class="form-control" required="">\n                </div>\n\n                <div class="spacer text-right">\n                    <button id="join" type="submit" name="join" class="btn btn-space btn-primary" disabled="disabled">Join</button>\n                </div>\n            </form>'), "\n        "), "\n    "), "\n")));
}));

}).call(this);
