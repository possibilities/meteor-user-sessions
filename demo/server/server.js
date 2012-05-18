// Demo only accepts 1 signup beyond the users added here

UserSessionConfiguration.signUpLimit = 3;

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
