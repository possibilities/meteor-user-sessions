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
      var session = ClientSessions.findOne(this.clientId);
      if (session) {
        addUserToSession(user, session);
        if (params.remember === '1') {
          Meteor.call('rememberClientSession', this.clientId);
        }
      }
    }
  },
  createUser: function(params) {
    // TODO real validation
    if (UserSessionConfiguration.signUpLimit && (Users.find().count() >= UserSessionConfiguration.signUpLimit)) {
      return;
    }
    if (Users.find({ email: params.email }).count() > 0) {
      return;
    }
    if (params.password === params.passwordConfirmation) {
      var password = params.password;
      var passwordDigest = Auth.Encryptor.current.passwordHash(params.password);
      var userId = Users.insert({
        email: params.email,
        passwordDigest: passwordDigest
      });
      var session = ClientSessions.findOne(this.clientId);
      if (session) {
        var user = Users.findOne(userId);
        addUserToSession(user, session);
        if (params.remember === '1') {
          Meteor.call('rememberClientSession', this.clientId);
        }
      }
    }
  },
  isPlainText: function() {
    return Auth.Encryptor.current.name === 'plain';
  }
});
