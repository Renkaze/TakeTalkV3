Groups = new Meteor.Collection('groups');

Groups.allow({
  insert: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return !! userId;
  }
 });

 Meteor.methods({
     groupInsert: function(groupAttributes) {
         check(Meteor.userId(), String);
         check(groupAttributes, {
             name: String,
             members: [String]
         });

         var user = Meteor.user();
         var group = _.extend(groupAttributes, {
             userId: user._id,
             author: user.emails,
             submitted: new Date()
         });
         var groupId = Groups.insert(group);
         return {
             _id: groupId
         };
     }
 });
