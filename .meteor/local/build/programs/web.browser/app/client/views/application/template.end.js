(function(){
Template.__checkName("end");
Template["end"] = new Template("Template.end", (function() {
  var view = this;
  return HTML.Raw('<div class="main-content">\n    <div class="row">\n        <div class="col-xs-12 col-md-6 col-md-offset-3">\n            <div class="panel panel-default">\n                <div class="panel-heading"><span class="title">Thank you for having choose TakeTalk!</span></div>\n                <div class="panel-body">\n                    <p>Here a summary of what happened during this meeting</p>\n                    <!--\n                    Endroit pour afficher les statistiques de fin de meeting et autres informations\n                        + Temps de parole de chaque participant\n                        + Temps de discussion pour chaque sujet\n                        + Le lien du document collaboratif\n                        + Export excel des stats\n                        + R�sultat du vote pour chaque sujet\n                        .....\n                    -->\n                </div>\n            </div>\n        </div>\n    </div>\n</div>');
}));

}).call(this);
