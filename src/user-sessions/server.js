Meteor.methods({
  createUserSession: function(params) {
    var session = ClientSessions.findOne(this.sessionId);
    if (session) {
      var user = Auth.Encryptor.current.authenticateUser(params.email, params.password);
      if (user) {
        var userForSession = _.clone(user);
        // Don't send private stuff back to client
        delete userForSession.passwordDigest;
        session.set('user', user);
        if (params.remember === '1') {
          Meteor.call('rememberClientSession', this.sessionId);
        }
      }
    }
  }
});
