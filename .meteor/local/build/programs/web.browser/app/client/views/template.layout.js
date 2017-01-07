(function(){
Template.__checkName("layout");
Template["layout"] = new Template("Template.layout", (function() {
  var view = this;
  return [ HTML.HEAD("\n    ", HTML.Raw('<meta charset="utf-8">'), "\n    ", HTML.Raw('<meta http-equiv="X-UA-Compatible" content="IE=edge">'), "\n    ", HTML.Raw('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">'), "\n    ", HTML.Raw('<meta name="description" content="TakeTalk is an application to manage your meetings by coordinate time speech">'), "\n    ", HTML.Raw('<link rel="icon" href="/public/favicon2.jpeg">'), "\n    ", HTML.TITLE(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "mainTitle");
  })), "\n\n    ", HTML.Raw('<!--[if lt IE 9]>\n    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>\n    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>\n    <![endif]-->'), "\n  "), "\n  ", HTML.BODY({
    "cz-shortcut-listen": "true"
  }, "\n\n    ", HTML.DIV({
    class: "am-wrapper am-nosidebar-left"
  }, "\n      ", HTML.NAV({
    class: "navbar navbar-default navbar-fixed-top am-top-header",
    style: "background-color:#00838F"
  }, "\n        ", HTML.DIV({
    class: "container-fluid"
  }, "\n          ", HTML.DIV({
    class: "navbar-header"
  }, "\n            ", HTML.DIV({
    class: "page-title"
  }, "\n              ", HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), Spacebars.kw({
        route: "home"
      }));
    },
    class: "navbar-brand title-font"
  }, "TakeTalk"), "\n            "), "\n          "), "\n          ", HTML.Raw('<a href="#" data-toggle="collapse" data-target="#am-navbar-collapse" class="am-toggle-top-header-menu collapsed">\n            <span class="icon s7-angle-down"></span>\n          </a>'), "\n          ", HTML.DIV({
    id: "am-navbar-collapse",
    class: "collapse navbar-collapse"
  }, "\n            ", HTML.UL({
    class: "nav navbar-nav am-nav-right"
  }, "\n              ", HTML.LI(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), Spacebars.kw({
        route: "home"
      }));
    }
  }, HTML.Raw('<span class="glyphicon glyphicon-home" aria-hidden="true"></span>'))), "\n              ", HTML.LI(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), Spacebars.kw({
        route: "tutorial"
      }));
    }
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "tuto");
  }))), "\n              ", HTML.LI(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), Spacebars.kw({
        route: "downloads"
      }));
    }
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "downloads");
  }))), "\n              ", HTML.LI(HTML.H2(Blaze.View("lookup:meeting", function() {
    return Spacebars.mustache(view.lookup("meeting"));
  }))), "\n              ", HTML.LI(HTML.A({
    href: function() {
      return Spacebars.mustache(view.lookup("pathFor"), Spacebars.kw({
        route: "groups"
      }));
    }
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "groups");
  }))), "\n\n              ", HTML.Raw("<!-- langue-->"), "\n              ", HTML.LI({
    class: "dropdown"
  }, "\n                ", HTML.A({
    href: "#",
    "data-toggle": "dropdown",
    role: "button",
    "aria-expanded": "false",
    class: "dropdown-toggle"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "lang");
  }), "\n                  ", HTML.Raw('<span class="angle-down s7-angle-down" aria-hidden="true"></span>'), "\n                "), "\n                ", HTML.UL({
    role: "menu",
    class: "dropdown-menu"
  }, "\n                  ", HTML.LI(Spacebars.include(view.lookupTemplate("i18n_buttons"))), "\n                "), "\n              "), "\n              ", HTML.Raw("<!--fin -->"), "\n\n              ", HTML.Raw('<!-- Pour l\'ajout d\'un menu d�roulant\n              <li class="dropdown">\n              <a href="#" data-toggle="dropdown" role="button" aria-expanded="false" class="dropdown-toggle">Services\n              <span class="angle-down s7-angle-down" aria-hidden="true"></span>\n            </a>\n            <ul role="menu" class="dropdown-menu">\n            <li><a href="{{pathFor route=\'tutorial\'}}">Tutorial</a></li>\n            <li><a href="{{pathFor route=\'downloads\'}}">Downloads</a></li>\n          </ul>\n        </li>\n      -->'), "\n    "), "\n    ", HTML.Raw("<!-- tom start-->"), "\n\n\n\n    ", HTML.UL({
    class: "nav navbar-nav navbar-right"
  }, "\n      ", Spacebars.include(view.lookupTemplate("loginButtons")), "\n    "), "\n    ", HTML.Raw("<!-- tom end-->"), "\n  "), "\n"), "\n"), "\n", HTML.DIV({
    class: "am-content"
  }, "\n  ", Spacebars.include(view.lookupTemplate("yield")), "\n"), "\n", HTML.Raw("<footer>\n  <p>\n    <!-- Ici ajout d'informations pour le footer (plan du site, formulaire de contact, copyrights....) -->\n  </p>\n</footer>"), "\n"), "\n", HTML.SCRIPT({
    type: "text/javascript"
  }, "\n$(document).ready(function(){\n  //initialize the javascript\n  //App.init();\n\n  //Runs prettify\n  prettyPrint();\n});\n"), "\n") ];
}));

}).call(this);
