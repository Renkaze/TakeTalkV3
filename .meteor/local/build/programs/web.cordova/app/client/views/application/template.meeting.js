(function(){
Template.__checkName("meeting");
Template["meeting"] = new Template("Template.meeting", (function() {
  var view = this;
  return [ HTML.Raw('<!-- <div class="page-head">\n  <h2>{{meeting}}</h2>\n</div> -->\n<!-- include libraries(jQuery, bootstrap) -->\n'), HTML.DIV({
    "class": "main-content"
  }, "\n  ", HTML.DIV({
    "class": "row"
  }, "\n    ", HTML.Raw("<!-- ********************************************* -->"), "\n    ", HTML.Raw("<!-- Bloc d'affichage des sujets � l'ordre du jour -->"), "\n    ", HTML.Raw("<!-- ********************************************* -->"), "\n    ", HTML.Raw('<div class="col-md-8">\n      <div class="panel panel-default panel-heading-fullwidth panel-primary">\n        <div class="panel-heading"><span class="title">Meeting Report</span></div>\n        <div class="panel-body">\n          <div id="textareaRich">\n            Your Report\'s Meetings !!\n          </div>\n        </div>\n      </div>\n    </div>'), "\n\n    ", HTML.DIV({
    "class": "col-md-4"
  }, "\n      ", HTML.Raw("<!-- ****************************************** -->"), "\n      ", HTML.Raw("<!-- Bloc d'affichage des interventions pr�vues -->"), "\n      ", HTML.Raw("<!-- ****************************************** -->"), "\n      ", HTML.DIV({
    "class": "row-md-4"
  }, "\n        ", HTML.DIV({
    "class": "panel panel-default panel-heading-fullwidth panel-primary"
  }, "\n          ", HTML.Raw('<div class="panel-heading"><span class="title">People lining up</span></div>'), "\n          ", HTML.DIV({
    "class": "panel-body"
  }, "\n            ", HTML.DIV({
    "class": "row"
  }, "\n              ", HTML.Raw("<!-- Bouton pour cr�er une demande d'intervention -->"), "\n              ", HTML.DIV({
    "class": "col-md-4"
  }, "\n                ", HTML.INPUT({
    type: "button",
    "class": "btn btn-primary",
    role: "button",
    id: "talkCancel",
    value: function() {
      return Spacebars.mustache(view.lookup("talk"));
    }
  }), "\n              "), "\n              ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isAnimator"));
  }, function() {
    return [ "\n              ", HTML.Comment(" Boutons de gestion du don de temps de parole "), "\n              ", HTML.DIV({
      "class": "col-md-8 text-right"
    }, "\n                ", HTML.INPUT(HTML.Attrs({
      type: "button",
      "class": "btn btn-primary",
      role: "button",
      id: "waitProceed",
      value: function() {
        return Spacebars.mustache(view.lookup("proceed"));
      }
    }, function() {
      return Spacebars.attrMustache(view.lookup("disabled"));
    })), "\n                ", HTML.INPUT(HTML.Attrs({
      type: "button",
      "class": "btn btn-primary",
      role: "button",
      id: "next",
      value: "Next"
    }, function() {
      return Spacebars.attrMustache(view.lookup("disabled"));
    })), "\n              "), "\n              " ];
  }), "\n            "), "\n            ", HTML.DIV({
    "class": "row",
    id: "speech-list"
  }, "\n              ", HTML.Raw('<div style="margin-top:10px"></div>'), "\n              ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("speeches"));
  }, function() {
    return [ "\n              ", HTML.DIV({
      "class": function() {
        return [ "speech-item ", Blaze.If(function() {
          return Spacebars.call(view.lookup("status"));
        }, function() {
          return "active";
        }) ];
      }
    }, "\n                ", HTML.DIV({
      style: "margin-bottom:-10px; position:relative;"
    }, "\n                  ", HTML.Comment(" Liste des interventions "), "\n                  ", HTML.DIV({
      "class": "list-group"
    }, "\n                    ", HTML.DIV({
      "class": function() {
        return [ "list-group-item", Blaze.If(function() {
          return Spacebars.call(view.lookup("status"));
        }, function() {
          return " active";
        }) ];
      }
    }, "\n                      ", HTML.H4({
      "class": "list-group-item-heading"
    }, "\n                        ", Blaze.View("lookup:user", function() {
      return Spacebars.mustache(view.lookup("user"));
    }), "\n                        ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("isTimeNull"), view.lookup("time"));
    }, function() {
      return [ "\n                        ", Blaze.View("lookup:timeString", function() {
        return Spacebars.mustache(view.lookup("timeString"));
      }), "\n                        " ];
    }, function() {
      return [ "\n                        (", Blaze.View("lookup:timeLeft", function() {
        return Spacebars.mustache(view.lookup("timeLeft"));
      }), "/", Blaze.View("lookup:time", function() {
        return Spacebars.mustache(view.lookup("time"));
      }), ")\n                        " ];
    }), "\n                      "), "\n                      ", HTML.Comment(' <p class="list-group-item-text">\n                        Subject: {{orderChoose}}\n                        {{#if isSubject _id}}\n                        <br/>Keywords: {{subject}}\n                        {{/if}}\n                      </p> '), "\n                      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isAnimator"));
    }, function() {
      return [ "\n                      ", HTML.Comment(" Actions possibles en rapport avec une intervention "), "\n                      ", HTML.DIV({
        style: "position:absolute; left:365px; bottom:20px;"
      }, "\n                        ", HTML.DIV({
        "class": "input-group speechRemove",
        "speech-id": function() {
          return Spacebars.mustache(view.lookup("_id"));
        }
      }, "\n                          ", HTML.BUTTON({
        type: "button",
        "class": "btn btn-danger btn-xs remove-speech"
      }, "\n                            ", HTML.SPAN({
        "class": "glyphicon glyphicon-remove",
        "aria-hidden": "true"
      }), "\n                          "), "\n                        "), "\n                      "), "\n                      " ];
    }), "\n                    "), "\n                  "), "\n                "), "\n              "), "\n              " ];
  }), "\n            "), "\n          "), " ", HTML.Raw("<!-- panel-body -->"), "\n        "), "\n      "), "\n\n\n\n      ", HTML.Raw("<!-- ************************************************************** -->"), "\n      ", HTML.Raw("<!-- Bloc d'affichage des utilisateurs participants dans le meeting -->"), "\n      ", HTML.Raw("<!-- ************************************************************** -->"), "\n      ", HTML.DIV({
    "class": "row-md-4"
  }, "\n        ", HTML.DIV({
    "class": "panel panel-default panel-heading-fullwidth panel-primary"
  }, "\n          ", HTML.Raw('<div class="panel-heading"><span class="title">People on this meeting</span></div>'), "\n          ", HTML.DIV({
    "class": "panel-body"
  }, "\n            ", HTML.DIV({
    "class": "row"
  }, "\n              ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("users"));
  }, function() {
    return [ "\n              ", HTML.Comment(" Liste des intervenant "), "\n              ", HTML.DIV({
      "class": "col-md-11",
      style: "padding-right:0"
    }, "\n                ", HTML.DIV({
      "class": "list-group"
    }, "\n                    ", HTML.H4({
      "class": "list-group-item-heading"
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n                    ", HTML.P("\n                      ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("paroles"));
    }, function() {
      return [ "\n                      ", Spacebars.include(view.lookupTemplate("parole")), "\n                      " ];
    }), "\n                    "), "\n                "), "\n              "), "\n              ", HTML.Comment(" Actions possibles en rapport avec l'intervenant "), "\n              ", HTML.DIV({
      "class": "col-md-1",
      style: "padding-left:0"
    }, "\n                ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("isSessionGuest"), view.lookup("name"));
    }, function() {
      return [ "\n                ", HTML.DIV({
        "class": "input-group guestRemove",
        guest: function() {
          return Spacebars.mustache(view.lookup("name"));
        }
      }, "\n                  ", HTML.BUTTON({
        type: "button",
        "class": "btn btn-danger btn-xs removeGuest"
      }, "\n                    ", HTML.SPAN({
        "class": "glyphicon glyphicon-remove",
        "aria-hidden": "true"
      }), "\n                  "), "\n                "), "\n                " ];
    }), "\n              "), "\n              " ];
  }), "\n            "), "\n          "), " ", HTML.Raw("<!-- panel-body -->"), "\n        "), "\n      "), "\n      ", HTML.Raw("<!--End People on meeting -->"), "\n\n      ", HTML.Raw('<!--Start Agenda\n      <div class="row-md-4">\n        <div class="panel panel-default panel-heading-fullwidth panel-primary">\n          <div class="panel-heading"><span class="title">Agenda</span></div>\n          <div class="panel-body">\n            <div class="row">\n              {{#if isReportLink}}\n              <div class="col-md-12">\n                <p><a href="{{reportLink}}" title="Collaborative document" target="_blank">Link of the report</a></p>\n              </div>\n              {{/if}}\n              {{#each ordres}}\n              <div class="col-md-11" style="padding-right:0; margin-bottom:-10px">\n                <div class="list-group">\n                  <div class="list-group-item">\n                    {{> ordre}}\n                  </div>\n                </div>\n              </div>\n              <div class="col-md-1" style="padding-right:0">\n              </div>\n              {{/each}}\n            </div>\n          </div>\n        </div>\n      </div>\n    End Agenda-->'), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isAnimator"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      "class": "row-md-4"
    }, "\n              ", HTML.BUTTON({
      type: "button",
      "class": "btn btn-primary",
      "data-toggle": "modal",
      "data-target": "#localModal"
    }, "Add local participant"), "\n              ", HTML.BUTTON({
      type: "button",
      "class": "btn btn-primary",
      "data-toggle": "modal",
      "data-target": "#invitationModal"
    }, "Invite participants"), "\n              ", HTML.BUTTON({
      type: "button",
      "class": "btn btn-danger",
      role: "button",
      id: "closeMeeting"
    }, "Close meeting"), "\n\n  "), "\n    " ];
  }), "\n    "), "\n\n  "), " ", HTML.Raw("<!-- row des 3 colonnes -->"), "\n\n  ", HTML.Raw("<!-- Boutons d'actions de l'animateur-->"), "\n\n"), HTML.Raw('\n\n<!-- ************************************ -->\n<!-- Modal d\'ajout d\'un participant local -->\n<!-- ************************************ -->\n<div class="modal fade" id="localModal" tabindex="-1" role="dialog" aria-labelledby="localModalLabel">\n  <div class="modal-dialog" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title" id="localModalLabel">New Local Participant</h4>\n      </div>\n      <div class="modal-body">\n        <form role="form" id="localForm">\n          <div class="form-group name-input-group">\n            <label class="control-label">Participants\' Name</label>\n            <div class="participantNameInput" rank="1">\n              <div class="xs-mb-15">\n                <input type="text" class="participantsName form-control" name="participantsName">\n              </div>\n            </div>\n          </div>\n          <div class="modal-footer">\n            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n            <button id="localSubmit" type="submit" class="btn btn-primary">Add</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- **************************************** -->\n<!-- Modal d\'ajout d\'un participant ext�rieur -->\n<!-- **************************************** -->\n<div class="modal fade" id="invitationModal" tabindex="-1" role="dialog" aria-labelledby="invitationModalLabel">\n  <div class="modal-dialog" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title" id="invitationModalLabel">Invite Participants</h4>\n      </div>\n      <div class="modal-body">\n        <!--\n        <h3>By QR Code</h3>\n        <div id="qrcode"></div>\n      -->\n      <h3>By email address</h3>\n      <form role="form" id="inviteForm">\n        <div class="form-group email-input-group">\n          <label class="control-label">Your participants\' e-mails</label>\n          <div class="participantEmailInput" rank="1">\n            <div class="input-group xs-mb-15"><span class="input-group-addon">@</span>\n              <input class="participantsEmails form-control" name="participantsEmails" type="email" parsley-type="email">\n            </div>\n          </div>\n        </div>\n        <div class="modal-footer">\n          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n          <button id="inviteSubmit" type="submit" class="btn btn-primary">Invite</button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n</div>\n\n<!-- ************************************************************************************************************* -->\n<!-- Modal de notification qui s\'affiche sur le dashboard d\'un intervenant auquel l\'animateur a supprim� le speech -->\n<!-- ************************************************************************************************************* -->\n<div class="modal fade" id="speech-delete-modal" tabindex="-1" role="dialog" aria-labelledby="speech-delete-label">\n  <div class="modal-dialog" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title" id="speech-delete-label">Invite Participants</h4>\n      </div>\n      <div class="modal-body">\n        Your speech have been deleted\n      </div>\n    </div>\n  </div>\n</div>') ];
}));

Template.__checkName("ordre");
Template["ordre"] = new Template("Template.ordre", (function() {
  var view = this;
  return HTML.H4({
    "class": "list-group-item-heading"
  }, HTML.B(Blaze.View("lookup:ordre", function() {
    return Spacebars.mustache(view.lookup("ordre"));
  })), " - ", Blaze.If(function() {
    return Spacebars.call(view.lookup("time"));
  }, function() {
    return [ Blaze.View("lookup:time", function() {
      return Spacebars.mustache(view.lookup("time"));
    }), " min estimated" ];
  }, function() {
    return " no duration scheduled";
  }));
}));

Template.__checkName("parole");
Template["parole"] = new Template("Template.parole", (function() {
  var view = this;
  return [ HTML.SPAN("Speech Duration : ", Blaze.View("lookup:displayTime", function() {
    return Spacebars.mustache(view.lookup("displayTime"), view.lookup("time"));
  })), HTML.Raw("<br>") ];
}));

}).call(this);
