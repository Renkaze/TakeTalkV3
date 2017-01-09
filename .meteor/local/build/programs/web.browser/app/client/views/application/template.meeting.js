(function(){
Template.__checkName("meeting");
Template["meeting"] = new Template("Template.meeting", (function() {
  var view = this;
  return [ HTML.Raw('<!-- <div class="page-head">\n    <h2>{{meeting}}</h2>\n</div> -->\n'), HTML.DIV({
    class: "main-content"
  }, "\n    ", HTML.DIV({
    class: "row"
  }, "\n        ", HTML.Raw("<!-- ********************************************* -->"), "\n        ", HTML.Raw("<!-- Bloc d'affichage des sujets � l'ordre du jour -->"), "\n        ", HTML.Raw("<!-- ********************************************* -->"), "\n        ", HTML.DIV({
    class: "col-md-4"
  }, "\n            ", HTML.DIV({
    class: "panel panel-default panel-heading-fullwidth panel-primary"
  }, "\n                ", HTML.Raw('<div class="panel-heading"><span class="title">Agenda</span></div>'), "\n                ", HTML.DIV({
    class: "panel-body"
  }, "\n                    ", HTML.DIV({
    class: "row"
  }, "\n                        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isReportLink"));
  }, function() {
    return [ "\n                            ", HTML.Comment(" Lien du document collaboratif "), "\n                            ", HTML.DIV({
      class: "col-md-12"
    }, "\n                                ", HTML.P(HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("reportLink"));
      },
      title: "Collaborative document",
      target: "_blank"
    }, Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "meetingLink");
    }))), "\n                            "), "\n                        " ];
  }), "\n                        ", HTML.Raw("<!-- Liste des sujets � l'ordre du jour -->"), "\n                        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("ordres"));
  }, function() {
    return [ "\n                            ", HTML.DIV({
      class: "col-md-11",
      style: "padding-right:0; margin-bottom:-10px"
    }, "\n                                ", HTML.DIV({
      class: "list-group"
    }, "\n                                    ", HTML.DIV({
      class: "list-group-item"
    }, "\n                                        ", Spacebars.include(view.lookupTemplate("ordre")), "\n                                    "), "\n                                "), "\n                            "), "\n                            ", HTML.Comment(" Actions possibles en rapport avec un sujet "), "\n                            ", HTML.DIV({
      class: "col-md-1",
      style: "padding-right:0"
    }, "\n                                ", HTML.Comment(" Actions "), "\n                            "), "\n                        " ];
  }), "\n                    "), "\n                "), "\n            "), "\n        "), "\n        ", HTML.Raw("<!-- ****************************************** -->"), "\n        ", HTML.Raw("<!-- Bloc d'affichage des interventions pr�vues -->"), "\n        ", HTML.Raw("<!-- ****************************************** -->"), "\n        ", HTML.DIV({
    class: "col-md-4"
  }, "\n            ", HTML.DIV({
    class: "panel panel-default panel-heading-fullwidth panel-primary"
  }, "\n                ", HTML.DIV({
    class: "panel-heading"
  }, HTML.SPAN({
    class: "title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "meetingLineUp");
  }))), "\n                ", HTML.DIV({
    class: "panel-body"
  }, "\n                    ", HTML.DIV({
    class: "row"
  }, "\n                        ", HTML.Raw("<!-- Bouton pour cr�er une demande d'intervention -->"), "\n                        ", HTML.DIV({
    class: "col-md-4"
  }, "\n                            ", HTML.INPUT({
    type: "button",
    class: "btn btn-primary",
    role: "button",
    id: "talkCancel",
    value: function() {
      return Spacebars.mustache(view.lookup("talk"));
    }
  }), "\n                        "), "\n                        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isAnimator"));
  }, function() {
    return [ "\n                            ", HTML.Comment(" Boutons de gestion du don de temps de parole "), "\n                            ", HTML.DIV({
      class: "col-md-8 text-right"
    }, "\n                                ", HTML.INPUT(HTML.Attrs({
      type: "button",
      class: "btn btn-primary",
      role: "button",
      id: "waitProceed",
      value: function() {
        return Spacebars.mustache(view.lookup("proceed"));
      }
    }, function() {
      return Spacebars.attrMustache(view.lookup("disabled"));
    })), "\n                                ", HTML.INPUT(HTML.Attrs({
      type: "button",
      class: "btn btn-primary",
      role: "button",
      id: "next",
      value: "Next"
    }, function() {
      return Spacebars.attrMustache(view.lookup("disabled"));
    })), "\n                            "), "\n                        " ];
  }), "\n                    "), "\n                    ", HTML.DIV({
    class: "row",
    id: "speech-list"
  }, "\n                        ", HTML.Raw('<div style="margin-top:10px"></div>'), "\n                        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("speeches"));
  }, function() {
    return [ "\n                            ", HTML.DIV({
      class: function() {
        return [ "speech-item ", Blaze.If(function() {
          return Spacebars.call(view.lookup("status"));
        }, function() {
          return "active";
        }) ];
      }
    }, "\n                              ", HTML.DIV({
      style: "margin-bottom:-10px; position:relative;"
    }, "\n                                  ", HTML.Comment(" Liste des interventions "), "\n                                  ", HTML.DIV({
      class: "list-group"
    }, "\n                                      ", HTML.DIV({
      class: function() {
        return [ "list-group-item", Blaze.If(function() {
          return Spacebars.call(view.lookup("status"));
        }, function() {
          return " active";
        }) ];
      }
    }, "\n                                          ", HTML.H4({
      class: "list-group-item-heading"
    }, "\n                                            ", Blaze.View("lookup:user", function() {
      return Spacebars.mustache(view.lookup("user"));
    }), "\n                                            ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("isTimeNull"), view.lookup("time"));
    }, function() {
      return [ "\n                                                ", Blaze.View("lookup:timeString", function() {
        return Spacebars.mustache(view.lookup("timeString"));
      }), "\n                                            " ];
    }, function() {
      return [ "\n                                                (", Blaze.View("lookup:timeLeft", function() {
        return Spacebars.mustache(view.lookup("timeLeft"));
      }), "/", Blaze.View("lookup:time", function() {
        return Spacebars.mustache(view.lookup("time"));
      }), ")\n                                            " ];
    }), "\n                                          "), "\n                                          ", HTML.P({
      class: "list-group-item-text"
    }, "\n                                              Subject: ", Blaze.View("lookup:orderChoose", function() {
      return Spacebars.mustache(view.lookup("orderChoose"));
    }), "\n                                              ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("isSubject"), view.lookup("_id"));
    }, function() {
      return [ "\n                                                  ", HTML.BR(), Blaze.View("lookup:_", function() {
        return Spacebars.mustache(view.lookup("_"), "meetingKeywords");
      }), " ", Blaze.View("lookup:subject", function() {
        return Spacebars.mustache(view.lookup("subject"));
      }), "\n                                              " ];
    }), "\n                                          "), "\n                                          ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isAnimator"));
    }, function() {
      return [ "\n                                              ", HTML.Comment(" Actions possibles en rapport avec une intervention "), "\n                                              ", HTML.DIV({
        style: "position:absolute; left:365px; bottom:38px;"
      }, "\n                                                  ", HTML.DIV({
        class: "input-group speechRemove",
        "speech-id": function() {
          return Spacebars.mustache(view.lookup("_id"));
        }
      }, "\n                                                      ", HTML.BUTTON({
        type: "button",
        class: "btn btn-danger btn-xs remove-speech"
      }, "\n                                                          ", HTML.SPAN({
        class: "glyphicon glyphicon-remove",
        "aria-hidden": "true"
      }), "\n                                                      "), "\n                                                  "), "\n                                              "), "\n                                          " ];
    }), "\n                                      "), "\n                                  "), "\n                                "), "\n                            "), "\n                        " ];
  }), "\n                    "), "\n                "), " ", HTML.Raw("<!-- panel-body -->"), "\n            "), "\n        "), "\n        ", HTML.Raw("<!-- ************************************************************** -->"), "\n        ", HTML.Raw("<!-- Bloc d'affichage des utilisateurs participants dans le meeting -->"), "\n        ", HTML.Raw("<!-- ************************************************************** -->"), "\n        ", HTML.DIV({
    class: "col-md-4"
  }, "\n            ", HTML.DIV({
    class: "panel panel-default panel-heading-fullwidth panel-primary"
  }, "\n                ", HTML.DIV({
    class: "panel-heading"
  }, HTML.SPAN({
    class: "title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "meetingMembers");
  }))), "\n                    ", HTML.DIV({
    class: "panel-body"
  }, "\n                        ", HTML.DIV({
    class: "row"
  }, "\n                        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("meetingUsers"));
  }, function() {
    return [ "\n                        ", HTML.Comment(" Liste des intervenant "), "\n                            ", HTML.DIV({
      class: "col-md-11",
      style: "padding-right:0; margin-bottom:-10px"
    }, "\n                                ", HTML.DIV({
      class: "list-group"
    }, "\n                                    ", HTML.DIV({
      class: "list-group-item"
    }, "\n                                        ", HTML.H4({
      class: "list-group-item-heading"
    }, Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    })), "\n                                        ", HTML.P("\n                                            ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("paroles"));
    }, function() {
      return [ "\n                                                ", Spacebars.include(view.lookupTemplate("parole")), "\n                                            " ];
    }), "\n                                        "), "\n                                    "), "\n                                "), "\n                            "), "\n                            ", HTML.Comment(" Actions possibles en rapport avec l'intervenant "), "\n                            ", HTML.DIV({
      class: "col-md-1",
      style: "padding-left:0"
    }, "\n                                ", Blaze.If(function() {
      return Spacebars.dataMustache(view.lookup("isSessionGuest"), view.lookup("name"));
    }, function() {
      return [ "\n                                    ", HTML.DIV({
        class: "input-group guestRemove",
        guest: function() {
          return Spacebars.mustache(view.lookup("name"));
        }
      }, "\n                                        ", HTML.BUTTON({
        type: "button",
        class: "btn btn-danger btn-xs removeGuest"
      }, "\n                                            ", HTML.SPAN({
        class: "glyphicon glyphicon-remove",
        "aria-hidden": "true"
      }), "\n                                        "), "\n                                    "), "\n                                " ];
    }), "\n                            "), "\n                        " ];
  }), "\n                    "), "\n                "), " ", HTML.Raw("<!-- panel-body -->"), "\n            "), "\n        "), "\n    "), " ", HTML.Raw("<!-- row des 3 colonnes -->"), "\n\n    ", HTML.Raw("<!-- Boutons d'actions de l'animateur-->"), "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("isAnimator"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "row"
    }, "\n        ", HTML.DIV({
      class: "col-md-6 col-md-offset-6"
    }, "\n            ", HTML.DIV({
      class: "panel panel-default panel-transparent"
    }, "\n                ", HTML.DIV({
      class: "panel-body"
    }, "\n                    ", HTML.P({
      class: "text-right"
    }, "\n                        ", HTML.BUTTON({
      type: "button",
      class: "btn btn-primary",
      "data-toggle": "modal",
      "data-target": "#localModal"
    }, Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "meetingAdd");
    })), "\n                        ", HTML.BUTTON({
      type: "button",
      class: "btn btn-primary",
      "data-toggle": "modal",
      "data-target": "#invitationModal"
    }, Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "meetingInvite");
    })), "\n                        ", HTML.BUTTON({
      type: "button",
      class: "btn btn-danger",
      role: "button",
      id: "closeMeeting"
    }, Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "meetingClose");
    })), "\n                    "), "\n                "), "\n            "), "\n        "), "\n    "), "\n    " ];
  }), "\n"), HTML.Raw("\n\n<!-- ************************************ -->\n<!-- Modal d'ajout d'un participant local -->\n<!-- ************************************ -->\n"), HTML.DIV({
    class: "modal fade",
    id: "localModal",
    tabindex: "-1",
    role: "dialog",
    "aria-labelledby": "localModalLabel"
  }, "\n    ", HTML.DIV({
    class: "modal-dialog",
    role: "document"
  }, "\n        ", HTML.DIV({
    class: "modal-content"
  }, "\n            ", HTML.DIV({
    class: "modal-header"
  }, "\n                ", HTML.Raw('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'), "\n                ", HTML.H4({
    class: "modal-title",
    id: "localModalLabel"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "meetingNewParticipant");
  })), "\n            "), "\n            ", HTML.DIV({
    class: "modal-body"
  }, "\n                ", HTML.FORM({
    role: "form",
    id: "localForm"
  }, "\n                    ", HTML.DIV({
    class: "form-group name-input-group"
  }, "\n                        ", HTML.LABEL({
    class: "control-label"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "meetingParticipantsName");
  })), "\n                        ", HTML.Raw('<div class="participantNameInput" rank="1">\n                            <div class="xs-mb-15">\n                                <input type="text" class="participantsName form-control" name="participantsName">\n                            </div>\n                        </div>'), "\n                    "), "\n                    ", HTML.DIV({
    class: "modal-footer"
  }, "\n                        ", HTML.BUTTON({
    type: "button",
    class: "btn btn-default",
    "data-dismiss": "modal"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "close");
  })), "\n                        ", HTML.BUTTON({
    id: "localSubmit",
    type: "submit",
    class: "btn btn-primary"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "add");
  })), "\n                    "), "\n                "), "\n            "), "\n        "), "\n    "), "\n"), HTML.Raw("\n\n<!-- **************************************** -->\n<!-- Modal d'ajout d'un participant ext�rieur -->\n<!-- **************************************** -->\n"), HTML.DIV({
    class: "modal fade",
    id: "invitationModal",
    tabindex: "-1",
    role: "dialog",
    "aria-labelledby": "invitationModalLabel"
  }, "\n    ", HTML.DIV({
    class: "modal-dialog",
    role: "document"
  }, "\n        ", HTML.DIV({
    class: "modal-content"
  }, "\n            ", HTML.DIV({
    class: "modal-header"
  }, "\n                ", HTML.Raw('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'), "\n                ", HTML.H4({
    class: "modal-title",
    id: "invitationModalLabel"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "meetingInvite");
  })), "\n            "), "\n            ", HTML.DIV({
    class: "modal-body"
  }, "\n                ", HTML.Raw('<!--\n                <h3>By QR Code</h3>\n                <div id="qrcode"></div>\n                 -->'), "\n                ", HTML.H3(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "meetingByMail");
  })), "\n                ", HTML.FORM({
    role: "form",
    id: "inviteForm"
  }, "\n                    ", HTML.DIV({
    class: "form-group email-input-group"
  }, "\n                        ", HTML.LABEL({
    class: "control-label"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "meetingParticipantsMail");
  })), "\n                        ", HTML.Raw('<div class="participantEmailInput" rank="1">\n                            <div class="input-group xs-mb-15"><span class="input-group-addon">@</span>\n                                <input class="participantsEmails form-control" name="participantsEmails" type="email" parsley-type="email">\n                            </div>\n                        </div>'), "\n                    "), "\n                    ", HTML.DIV({
    class: "modal-footer"
  }, "\n                        ", HTML.BUTTON({
    type: "button",
    class: "btn btn-default",
    "data-dismiss": "modal"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "close");
  })), "\n                        ", HTML.BUTTON({
    id: "inviteSubmit",
    type: "submit",
    class: "btn btn-primary"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "invite");
  })), "\n                    "), "\n                "), "\n            "), "\n        "), "\n    "), "\n"), HTML.Raw("\n\n<!-- ************************************************************************************************************* -->\n<!-- Modal de notification qui s'affiche sur le dashboard d'un intervenant auquel l'animateur a supprim� le speech -->\n<!-- ************************************************************************************************************* -->\n"), HTML.DIV({
    class: "modal fade",
    id: "speech-delete-modal",
    tabindex: "-1",
    role: "dialog",
    "aria-labelledby": "speech-delete-label"
  }, "\n    ", HTML.DIV({
    class: "modal-dialog",
    role: "document"
  }, "\n        ", HTML.DIV({
    class: "modal-content"
  }, "\n            ", HTML.DIV({
    class: "modal-header"
  }, "\n                ", HTML.Raw('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'), "\n                ", HTML.H4({
    class: "modal-title",
    id: "speech-delete-label"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "meetingInvite");
  }), " "), "\n            "), "\n            ", HTML.DIV({
    class: "modal-body"
  }, "\n                ", Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "meetingSpeechDeleted");
  }), "\n            "), "\n        "), "\n    "), "\n") ];
}));

Template.__checkName("ordre");
Template["ordre"] = new Template("Template.ordre", (function() {
  var view = this;
  return HTML.H4({
    class: "list-group-item-heading"
  }, HTML.B(Blaze.View("lookup:ordre", function() {
    return Spacebars.mustache(view.lookup("ordre"));
  })), " - ", Blaze.If(function() {
    return Spacebars.call(view.lookup("time"));
  }, function() {
    return [ Blaze.View("lookup:time", function() {
      return Spacebars.mustache(view.lookup("time"));
    }), " ", Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "meetingMinEstimated");
    }) ];
  }, function() {
    return [ " ", Blaze.View("lookup:_", function() {
      return Spacebars.mustache(view.lookup("_"), "meetingNoDuration");
    }) ];
  }));
}));

Template.__checkName("parole");
Template["parole"] = new Template("Template.parole", (function() {
  var view = this;
  return [ HTML.SPAN(Blaze.View("lookup:order", function() {
    return Spacebars.mustache(view.lookup("order"));
  }), " : ", Blaze.View("lookup:displayTime", function() {
    return Spacebars.mustache(view.lookup("displayTime"), view.lookup("time"));
  })), HTML.Raw("<br>") ];
}));

}).call(this);
