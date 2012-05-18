Package.describe({
  summary: "Attach users to client-sessions"
});

Package.on_use(function (api) {
  api.use('liveui', 'client');
  api.use('templating', 'client');
  api.use('mongo-livedata', 'server');
  api.use('client-sessions', 'server');
  api.use('simple-secure', 'server');
  api.use('encryptors', 'server');

  // Vendored
  api.add_files('vendor/form2js.js', 'client');
  // Resources
  api.add_files('styles.css', 'client');
  api.add_files('templates.html', 'client');
  // Scripts
  api.add_files('client.js', 'client');  
  api.add_files('common.js', ['server', 'client']);
  api.add_files('server.js', 'server');
  api.add_files('client.js', 'client');
});
