// Delete everything when the demo starts

Users.remove({});
ClientSessions.remove({});
ClientSessionKeys.remove({});

// Make some data

if (Users.find({ email: 'farf@farf.com' }).count() === 0) {
  Users.insert({
    email: 'farf@farf.com',
    passwordDigest: Auth.Encryptor.current.passwordHash('farffarf123')
  });
}

if (Users.find({ email: 'moof@moof.com' }).count() === 0)
{
  Users.insert({
    email: 'moof@moof.com',
    passwordDigest: Auth.Encryptor.current.passwordHash('moofmoof123')
  });
}

Meteor.methods({
  isPlainText: function() {
    return Auth.Encryptor.current.name === 'plain';
  }
});
