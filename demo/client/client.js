// Utils

Date.prototype.addDays = function(days) {
  this.setDate(this.getDate() + days);
  return this;
};

// Template methods and helpers

Template.demo.sessionId = function() {
  var session = ClientSessions.findOne();
  if (session) {  
    return session.latestKey;
  }
};

Template.demo.rememberUntil = function() {
  var session = ClientSessions.findOne();
  if (session && session.rememberedAt) {
    var until = new Date(session.rememberedAt).addDays(session.rememberForNDays);
    return moment(until).fromNow();
  }
};

Template.demo.currentUser = UserSessionHelpers.currentUser;

Template.demo.successMessage = function() {
  return Session.get('successMessage');
};

Template.errorMessage.errorMessage = function() {
  return Session.get('errorMessage');
};

Template.modalSignInForm.plainTextWarning = function() {
  var isPlainText = Session.get('isPlainText');
  if (isPlainText) {
    return "This server does not have bcrypt installed so passwords are stored in plain text! DON'T STORE ANYTHING IMPORTANT OR USE A SENSITIVE PASSWORD.";
  }
};

// On startup

Meteor.startup(function() {
  // $(function() {
  //   $('#signInModalActivator').focus();
  // });
});

// Animations

DemoHelpers = {
  successFadeOutAfter: function(afterSeconds) {
    if (this.timeoutId) Meteor.clearTimeout(this.timeoutId);
    this.timeoutId = Meteor.setTimeout(function() {
      $('#successMessage').fadeOut('fast', function() {
        if (!this.timeoutId) Session.set('successMessage');
      });
    }, afterSeconds);
  }
}

// Subscriptions

Meteor.autosubscribe(function() {
  // Deal with fading out success message some time after it's displayed
  var message = Session.get('successMessage');
  if (message) {
    $('#setUserNameInput').focus();
    DemoHelpers.successFadeOutAfter(7000);
  }
});

Meteor.autosubscribe(function() {
  var user = UserSessionHelpers.currentUser();
  Meteor.defer(function() {
    if (user) {
      $('#signOutButton').focus();
    } else {
      $('#signInModalActivator').focus();
    }
  });
});

Meteor.call('isPlainText', function(err, isPlainText) {
  Session.set('isPlainText', isPlainText);
});

// Get github fork me graphic loaded. Found that client subscriptions sometimes
// don't start if the image is in the DOM from the start.
Meteor.defer(function() {
  $forkMe = $('img.forkMe');
  var src = $forkMe.data('src');
  $forkMe.attr('src', src);
});
