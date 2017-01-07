(function(){
Template.__checkName("tutorial");
Template["tutorial"] = new Template("Template.tutorial", (function() {
  var view = this;
  return [ HTML.Raw('<aside class="page-aside">\n    <div class="am-scroller nano has-scrollbar">\n        <div class="nano-content" tabindex="0" style="right: -17px;">\n            <div class="content">\n                <h2>Menu</h2>\n              <!--  <p>This is the <b>aside</b> content, you can easily add content and components to this element.</p>-->\n            </div>\n        </div>\n        <div class="nano-pane" style="display: none;"><div class="nano-slider" style="height: 268px; transform: translate(0px, 0px);"></div></div></div>\n</aside>\n'), HTML.DIV({
    class: "page-head",
    style: "left:250px"
  }, "\n    ", HTML.H2(Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "tutoTitle");
  })), "\n"), "\n", HTML.DIV({
    class: "main-content"
  }, "\n    ", HTML.DIV({
    class: "row"
  }, "\n        ", HTML.DIV({
    class: "col-xs-12 col-md-8 col-md-offset-3"
  }, "\n            ", HTML.DIV({
    class: "panel panel-default"
  }, "\n                ", HTML.DIV({
    class: "panel-heading"
  }, HTML.SPAN({
    class: "title"
  }, Blaze.View("lookup:_", function() {
    return Spacebars.mustache(view.lookup("_"), "tutoBodyTitle");
  }))), "\n                ", HTML.Raw('<div class="panel-body">\n                    <!--<p>List of the functonalities</p>-->\n                    <!-- Ici un possible tutoriel si vous avez le temps de vous ennuyer -->\n                </div>'), "\n            "), "\n        "), "\n    "), "\n") ];
}));

}).call(this);
