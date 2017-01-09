(function(){
Template.__checkName("create");
Template["create"] = new Template("Template.create", (function() {
  var view = this;
  return [ HTML.DIV({
    class: "page-head"
  }, "\n    ", HTML.H2(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "createTitle");
  })), "\n"), "\n", HTML.DIV({
    class: "main-content"
  }, "\n    ", HTML.DIV({
    class: "row"
  }, "\n        ", HTML.DIV({
    class: "col-md-8 col-md-offset-2"
  }, "\n            ", HTML.DIV({
    class: "panel panel-default"
  }, "\n                ", HTML.DIV({
    class: "panel-heading"
  }, HTML.SPAN({
    class: "title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "createTitle");
  }))), "\n                ", HTML.DIV({
    class: "panel-body"
  }, "\n                    ", HTML.FORM({
    role: "form",
    id: "create-form"
  }, "\n\n                        ", HTML.DIV({
    class: "form-group"
  }, "\n                          ", HTML.LABEL({
    for: "animatorName"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "createAnimatorName");
  })), "\n                          ", HTML.INPUT({
    id: "animatorName",
    name: "animatorName",
    type: "text",
    class: "form-control",
    value: function() {
      return Spacebars.mustache(view.lookup("authorName"));
    },
    required: "",
    autofocus: ""
  }), "\n                        "), "\n\n                        ", HTML.DIV({
    class: "form-group"
  }, "\n                            ", HTML.LABEL({
    for: "animatorEmail"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "createMail");
  })), "\n                            ", HTML.DIV({
    class: "input-group"
  }, HTML.Raw('<span class="input-group-addon">@</span>'), "\n                                ", HTML.INPUT({
    id: "animatorEmail",
    name: "animatorEmail",
    type: "email",
    "parsley-type": "email",
    class: "form-control",
    value: function() {
      return Spacebars.mustache(view.lookup("authorAdress"));
    },
    required: ""
  }), "\n                            "), "\n                        "), "\n\n                        ", HTML.DIV({
    class: "form-group"
  }, "\n                            ", HTML.LABEL({
    for: "meetingName"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "createMeetingName");
  })), "\n                            ", HTML.Raw('<input id="meetingName" name="meetingName" type="text" class="form-control" required="">'), "\n                        "), "\n\n                        ", HTML.DIV({
    class: "form-group"
  }, "\n                            ", HTML.LABEL({
    for: "reportLink"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "createLink");
  })), "\n                            ", HTML.Raw('<input id="reportLink" name="reportLink" type="url" class="form-control">'), "\n                        "), "\n\n                        ", HTML.Raw('<div class="form-group">\n                            <label>Agenda</label>\n                            <div class="agenda-group" rank="1">\n                                <div class="row">\n                                    <div class="col-sm-9 xs-mb-15"><div class="input-group">\n                                        <span class="input-group-addon"><i class="glyphicon glyphicon-list-alt"></i></span>\n                                        <input class="agenda-name-input form-control" name="ordreDuJour" type="text">\n                                    </div></div>\n                                    <div class="col-sm-3 xs-mb-15"><div class="input-group">\n                                        <input min="1" parsley-type="number" class="agenda-time-input form-control" name="ordreDuJourTemps" type="number">\n                                        <span class="input-group-addon">min</span>\n                                    </div></div>\n                                </div>\n                            </div>\n                        </div>'), "\n\n                        ", HTML.DIV({
    class: "form-group participant-email-group"
  }, "\n                            ", HTML.LABEL(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "createParticipantsMail");
  })), "\n\n                            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("members"));
  }, function() {
    return [ "\n\n                              ", HTML.DIV({
      class: "participant-email",
      rank: function() {
        return Spacebars.mustache(view.lookup("@index"));
      }
    }, "\n                                  ", HTML.DIV({
      class: "input-group xs-mb-15"
    }, HTML.SPAN({
      class: "input-group-addon"
    }, "@"), "\n                                      ", HTML.INPUT({
      class: "participant-email-input form-control",
      name: "participantsEmails",
      type: "email",
      "parsley-type": "email",
      value: function() {
        return Spacebars.mustache(view.lookup("."));
      }
    }), "\n                                  "), "\n                              "), "\n\n                            " ];
  }), "\n                            ", HTML.DIV({
    class: "participant-email",
    rank: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("members"), "length"));
    }
  }, "\n                                ", HTML.Raw('<div class="input-group xs-mb-15"><span class="input-group-addon">@</span>\n                                    <input class="participant-email-input form-control" name="participantsEmails" type="email" parsley-type="email">\n                                </div>'), "\n                            "), "\n                        "), "\n                        ", HTML.DIV({
    class: "spacer text-right"
  }, "\n                            ", HTML.BUTTON({
    type: "submit",
    class: "btn btn-space btn-primary"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "createMeeting");
  })), "\n                        "), "\n                    "), "\n                "), "\n            "), "\n        "), "\n    "), "\n") ];
}));

}).call(this);
