UserSessionFilters = {
  loadUser: function loadUser() {
    if (this.clientId) {
      var session = ClientSessions.findOne(this.clientId);
      if (session) {
        this.user = session.get('user');
      }
    }
  },
  requireUser: function requireUser() {
    if (!this.user) {
      throw new Meteor.Error(500, "You have to be logged in to do that!");
    } else if (!this.user._id) {
      throw new Meteor.Error(500, "You don't have permission to do that!");
    }
  },
  // Not really a filter but didn't have a better place for it
  addTo: function(methods) {
    var methodNames = _.keys(methods);

    Filter.methods([
      UserSessionFilters.loadUser, { only: methodNames },
      UserSessionFilters.requireUser, { only: methodNames }
    ]);

    return methods;
  }
};
