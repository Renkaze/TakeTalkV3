/** The events that home template contains */
Template.home.events({
    //Redirection vers la page de création de meeting
    'click #open': function(e){
      console.log("J'ai cliqué");
        Router.go('create');
    }
});
