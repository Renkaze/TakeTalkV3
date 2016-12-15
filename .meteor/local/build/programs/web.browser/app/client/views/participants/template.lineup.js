(function(){
Template.__checkName("lineup");
Template["lineup"] = new Template("Template.lineup", (function() {
  var view = this;
  return HTML.DIV({
    class: "main-content"
  }, "\n    ", HTML.DIV({
    class: "row"
  }, "\n        ", HTML.DIV({
    class: "col-md-8 col-md-offset-2"
  }, "\n            ", HTML.DIV({
    class: "panel panel-default"
  }, "\n                ", HTML.Raw('<div class="panel-heading"><span class="title">Line up to talk</span></div>'), "\n                ", HTML.DIV({
    class: "panel-body"
  }, "\n                    ", HTML.FORM({
    role: "form"
<<<<<<< HEAD
  }, "\n                        ", HTML.DIV({
    class: "form-group"
  }, "\n                            ", HTML.Raw('<label for="order">Order</label>'), "\n                            ", HTML.SELECT({
    name: "order",
    id: "order",
    class: "form-control"
  }, "\n                                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("ordres"));
  }, function() {
    return [ "\n                                    ", Spacebars.include(view.lookupTemplate("selectOrdre")), "\n                                " ];
  }), "\n                            "), "\n                        "), "\n\n                        ", HTML.Raw("<!-- Les informations importantes de la prise de parole de l'intervenant -->"), "\n                        ", HTML.Raw('<div class="form-group">\n                            <label for="keywords">Keywords</label>\n                            <input id="keywords" name="keywords" type="text" class="form-control" autofocus="">\n                        </div>'), "\n\n                        ", HTML.Raw('<div class="form-group">\n                            <label style="padding-right:5em">Speach time</label>\n                            <div class="am-radio inline">\n                                <input type="radio" class="timeButton" name="speachtime" id="300" value="300" checked="">\n                                <label for="300">5 minutes</label>\n                            </div>\n                            <div class="am-radio inline">\n                                <input type="radio" class="timeButton" name="speachtime" id="600" value="600">\n                                <label for="600">10 minutes</label>\n                            </div>\n                            <div class="am-radio inline">\n                                <input type="radio" class="timeButton" name="speachtime" id="plus" value="plus">\n                                <label for="plus">10 minutes +</label>\n                            </div>\n                            <div class="am-radio inline">\n                                <input type="radio" class="timeButton" name="speachtime" id="rapide" value="rapide">\n                                <label for="rapide">Quick line up</label>\n                            </div>\n                        </div>'), "\n\n                        ", HTML.DIV({
    class: "spacer text-right"
=======
  }, "\n                        ", HTML.Raw('<!-- <div class="form-group">\n                            <label for="order">Order</label>\n                            <select name="order" id="order" class="form-control">\n                                {{#each ordres}}\n                                    {{> selectOrdre}}\n                                {{/each}}\n                            </select>\n                        </div> -->'), "\n\n                        ", HTML.Raw("<!-- Les informations importantes de la prise de parole de l'intervenant -->"), "\n                        ", HTML.Raw('<div class="form-group">\n                            <label for="keywords">Keywords</label>\n                            <input id="keywords" name="keywords" type="text" class="form-control" autofocus="">\n                        </div>'), "\n\n                        ", HTML.Raw('<div class="form-group">\n                            <label style="padding-right:5em">Speach time</label>\n                            <div class="am-radio inline">\n                                <input type="radio" class="timeButton" name="speachtime" id="300" value="300" checked="">\n                                <label for="300">5 minutes</label>\n                            </div>\n                            <div class="am-radio inline">\n                                <input type="radio" class="timeButton" name="speachtime" id="600" value="600">\n                                <label for="600">10 minutes</label>\n                            </div>\n                            <div class="am-radio inline">\n                                <input type="radio" class="timeButton" name="speachtime" id="plus" value="plus">\n                                <label for="plus">10 minutes +</label>\n                            </div>\n                            <div class="am-radio inline">\n                                <input type="radio" class="timeButton" name="speachtime" id="rapide" value="rapide">\n                                <label for="rapide">Quick line up</label>\n                            </div>\n                        </div>'), "\n\n                        ", HTML.DIV({
    "class": "spacer text-right"
>>>>>>> ajout zone de text riche
  }, "\n                            ", Blaze.If(function() {
    return Spacebars.call(view.lookup("hasGuest"));
  }, function() {
    return [ "\n                                ", HTML.SPAN("Line up as : "), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), HTML.CharRef({
      html: "&nbsp;",
      str: " "
    }), "\n                                ", HTML.BUTTON({
      type: "submit",
      class: "btn btn-space btn-success lineUp",
      "user-id": function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "_id"));
      }
    }, Blaze.View("lookup:currentUser.name", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "name"));
    })), "\n                                ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("guests"));
    }, function() {
      return [ "\n                                    ", Spacebars.include(view.lookupTemplate("guestButton")), "\n                                " ];
    }), "\n                            " ];
  }, function() {
    return [ "\n                                ", HTML.BUTTON({
      type: "submit",
      class: "btn btn-space btn-success lineUp",
      "user-id": function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "_id"));
      }
    }, "Line Up"), "\n                            " ];
  }), "\n                            ", HTML.Raw('<button id="cancelLineup" name="cancelLineup" class="btn btn-space btn-danger">Cancel</button>'), "\n                        "), "\n                    "), "\n                "), "\n            "), "\n        "), "\n    "), "\n");
}));

Template.__checkName("guestButton");
Template["guestButton"] = new Template("Template.guestButton", (function() {
  var view = this;
  return HTML.BUTTON({
    type: "submit",
    class: "btn btn-space btn-success lineUp",
    "user-id": function() {
      return Spacebars.mustache(view.lookup("name"));
    }
  }, Blaze.View("lookup:name", function() {
    return Spacebars.mustache(view.lookup("name"));
  }));
}));

Template.__checkName("selectOrdre");
Template["selectOrdre"] = new Template("Template.selectOrdre", (function() {
  var view = this;
  return HTML.OPTION({
    value: function() {
      return Spacebars.mustache(view.lookup("."));
    }
  }, Blaze.View("lookup:.", function() {
    return Spacebars.mustache(view.lookup("."));
  }));
}));

}).call(this);
