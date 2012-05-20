// Template methods and helpers

UserSessionHelpers = {};

UserSessionHelpers.currentUser = function() {
  var session, user;
  if ((session = ClientSessions.findOne()) && (user = session.get('user'))) {
    return user.email;        
  }
};

Template.successMessage.successMessage = function() {
  return Session.get('successMessage');
};

Template.createSessionForm.plainTextWarning = function() {
  var isPlainText = Session.get('isPlainText');
  if (isPlainText) {
    return "This server does not have bcrypt installed so passwords are stored in plain text! DON'T STORE ANYTHING IMPORTANT OR USE A SENSITIVE PASSWORD.";
  }
};

Template.createSessionActivator.currentUser = UserSessionHelpers.currentUser;
Template.createUserActivator.currentUser = UserSessionHelpers.currentUser;
Template.createSessionForm.plainTextWarning = Template.createSessionForm.plainTextWarning;
Template.createUserForm.plainTextWarning = Template.createSessionForm.plainTextWarning;

// Events

Template.createSessionActivator.events = {
  'click #signOutButton': function (e) {
    Meteor.call('forgetClientSession');
    Session.set('successMessage', "OK, you're logged out!");
  }
};
_.extend(Template.createSessionActivator.events, UIHelpers.activatorEvents);

Template.createUserActivator.events = {};
_.extend(Template.createUserActivator.events, UIHelpers.activatorEvents);

Template.createSessionForm.events = UIHelpers.formEvents;
Template.createUserForm.events = UIHelpers.formEvents;

Meteor.call('isPlainText', function(err, isPlainText) {
  Session.set('isPlainText', isPlainText);
});
