(function(){/**
<<<<<<< HEAD
* This methods alows us to send an e-mail to someone
* @param {string} to - The receiver's e-mail
* @param {string} from - The sender's e-mail
* @param {string} subject - The e-mail's header
* @param {string} text - The e-mail's body
=======
 * This methods alows us to send an e-mail to someone
 * @param {string} to - The receiver's e-mail
 * @param {string} from - The sender's e-mail
 * @param {string} subject - The e-mail's header
 * @param {string} text - The e-mail's body
>>>>>>> simplification UI & add Zone text report meeting
*/
Meteor.methods({
  //Envoi d'email aux utilisateurs invités
  sendEmail: function(to, from, subject, text) {
    check([to, from, subject, text], [String]);
    this.unblock();
    Email.send({to: to, from: from, subject: subject, text: text});
  },

  //Permet de réinitiliser la base de données
<<<<<<< HEAD
<<<<<<< HEAD
  resetAll: function() {
    Session.set("meetingId", "");
    Session.set("userId", "");
    Speeches.remove({});
    Users.remove({});
    Meetings.remove({});
  }
});
=======
  // resetAll: function() {
  //     Session.set("meetingId", "");
  //     Session.set("userId", "");
  //     Speeches.remove({});
  //     Users.remove({});
  //     Meetings.remove({});
  // }
});

}).call(this);
<<<<<<< HEAD
>>>>>>> simplification UI & add Zone text report meeting

}).call(this);
=======
>>>>>>> version meteor
=======
  // resetAll: function() {
  //     Session.set("meetingId", "");
  //     Session.set("userId", "");
  //     Speeches.remove({});
  //     Users.remove({});
  //     Meetings.remove({});
  // }
});

}).call(this);
>>>>>>> 298f81063a0c3cabba57b2734c858f7319c695c6
