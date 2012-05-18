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

// To override a template you have to pull in the supporting methods
// TODO: Figure out how to not need this
Template.signInActivator.currentUser = UserSessionHelpers.currentUser;
Template.signInActivator.events = Template.createSessionActivator.events;
Template.signInForm.events = Template.createSessionForm.events;
Template.signInForm.plainTextWarning = Template.createSessionForm.plainTextWarning;

Template.demo.userSessionSuccess = function() {
  return Session.get('userSessionSuccess');
};

// Animations

DemoHelpers = {
  successFadeOutAfter: function(afterSeconds) {
    if (this.timeoutId) Meteor.clearTimeout(this.timeoutId);
    this.timeoutId = Meteor.setTimeout(function() {
      $('#userSessionSuccess').fadeOut('fast', function() {
        if (!this.timeoutId) Session.set('userSessionSuccess');
      });
    }, afterSeconds);
  }
}

// Subscriptions

Meteor.autosubscribe(function() {
  // Deal with fading out success message some time after it's displayed
  var message = Session.get('userSessionSuccess');
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
      $('#createSessionActivator').focus();
    }
  });
});

// Get github fork me graphic loaded. Found that client subscriptions sometimes
// don't start if the image is in the DOM from the start.
Meteor.defer(function() {
  $forkMe = $('img.forkMe');
  var src = $forkMe.data('src');
  $forkMe.attr('src', src);
});
