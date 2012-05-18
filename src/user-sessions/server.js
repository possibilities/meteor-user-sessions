UserSessionConfiguration = {};

var addUserToSession = function(user, session) {
  var userForSession = _.clone(user);
  delete userForSession.passwordDigest;
  session.set('user', user);
};

Meteor.methods({
  createSession: function(params) {
    var user = Auth.Encryptor.current.authenticateUser(params.email, params.password);
    if (user) {
      // Don't send private stuff back to client
      var session = ClientSessions.findOne(this.sessionId);
      if (session) {
        addUserToSession(user, session);
        if (params.remember === '1') {
          Meteor.call('rememberClientSession', this.sessionId);
        }
      }
    }
  },
  createUser: function(params) {
    if (UserSessionConfiguration.signUpLimit && (Users.find().count() < UserSessionConfiguration.signUpLimit)) {
      if (params.password === params.passwordConfirmation) {
        var password = params.password;
        var passwordDigest = Auth.Encryptor.current.passwordHash(params.password);
        var userId = Users.insert({
          email: params.email,
          passwordDigest: passwordDigest
        });
        var session = ClientSessions.findOne(this.sessionId);
        if (session) {
          var user = Users.findOne(userId);
          addUserToSession(user, session);
          if (params.remember === '1') {
            Meteor.call('rememberClientSession', this.sessionId);
          }
        }
      }
    }
  },
  isPlainText: function() {
    return Auth.Encryptor.current.name === 'plain';
  }
});

Meteor.call('isPlainText', function(err, isPlainText) {
  Session.set('isPlainText', isPlainText);
});
