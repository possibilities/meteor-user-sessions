// Template methods and helpers

UserSessionHelpers = {};

UserSessionHelpers.currentUser = function() {
  var session, user;
  if ((session = ClientSessions.findOne()) && (user = session.get('user'))) {
    return user.email;        
  }
};

UserSessionHelpers.formData = function($form) {
  var form = $form.get(0);
  return form2js(form);
};

UserSessionHelpers.submitForm = function($form) {
  this.clearMessages();
  var formName = $form.data('method-name');
  Meteor.call(formName, this.formData($form));
  $form.closest('.modal').modal('hide');
};

UserSessionHelpers.submitOnReturn = function(e) {
  if (e.keyCode == 13) {
    var $form = $(e.target).closest('form');
    if ($form.length === 1) {
      e.preventDefault();
      UserSessionHelpers.submitForm($form);
    }
  }
};

UserSessionHelpers.clearMessages = function() {
  Session.set('userSessionSuccess', null);
  Session.set('userSessionError', null);    
};

UserSessionHelpers.commonActivatorEvents = {
  'click .modalActivator': function (e) {
    UserSessionHelpers.clearMessages();
    var $activator = $(e.target);
    var modalName = $activator.data('modal-name');
    $('#' + modalName + '.modal').modal('show').on('shown', function () {
      $(this).find('.focus').focus();
    });
  }
};

UserSessionHelpers.commonFormEvents = {
  'keydown form input': UserSessionHelpers.submitOnReturn,
  'click .modalSubmit': function(e) {
    e.preventDefault();
    var $form = $(e.target).closest('form');
    UserSessionHelpers.submitForm($form);
  }
};

Template.userSessionError.userSessionError = function() {
  return Session.get('userSessionError');
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
    Session.set('userSessionSuccess', "OK, you're logged out!");
  }
};
_.extend(Template.createSessionActivator.events, UserSessionHelpers.commonActivatorEvents);

Template.createUserActivator.events = {};
_.extend(Template.createUserActivator.events, UserSessionHelpers.commonActivatorEvents);

Template.createSessionForm.events = UserSessionHelpers.commonFormEvents;
Template.createUserForm.events = UserSessionHelpers.commonFormEvents;

Meteor.call('isPlainText', function(err, isPlainText) {
  Session.set('isPlainText', isPlainText);
});
