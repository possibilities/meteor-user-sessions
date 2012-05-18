// Template methods and helpers

UserSessionHelpers = {
  getFormData: function() {
    var form = $('form').get(0);
    return form2js(form);
  },
  currentUser: function() {
    var session = ClientSessions.findOne();
    if (session) {
      var user = session.get('user');
      if (user) {
        return user.email;        
      }
    }
  },
  submitSignInForm: function() {
    Session.set('userSessionError', null);
    Meteor.call('createUserSession', this.getFormData());
    $('#modalSignInForm').modal('hide').on('hidden', function() {
      Session.set('userSessionSuccess', "You've successfully signed in!");
    });
  },
  submitOnReturn: function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      UserSessionHelpers.submitSignInForm();
    }
  }
};

UserSessionHelpers.currentUser = UserSessionHelpers.currentUser;
Template.signInModalActivator.currentUser = UserSessionHelpers.currentUser;

// Events

Template.signInModalActivator.events = {
  'click #signInModalActivator': function (e) {
    Session.set('userSessionSuccess', null);
    Session.set('userSessionError', null);
    $('#modalSignInForm').modal('show').on('shown', function () {
      $('#userEmail').focus();
    })
  },
  'click #signOutButton': function (e) {
    Meteor.call('forgetClientSession');
    Session.set('userSessionSuccess', "OK, you're logged out!");
  }
};

Template.modalSignInForm.events = {
  'keydown #userPassword': UserSessionHelpers.submitOnReturn,
  'keydown #userEmail': UserSessionHelpers.submitOnReturn,
  'keydown #userRemember': UserSessionHelpers.submitOnReturn,
  'click #signInButton': function(e) {
    e.preventDefault();
    UserSessionHelpers.submitSignInForm();
  }
};
