Package.describe({
  summary: "A smart package for authentication and tracking users across requests (based on client-sessions)"
});

Package.on_use(function (api) {
  api.use('liveui', 'client');
  api.use('templating', 'client');
  api.use('mongo-livedata', 'server');
  api.use('client-sessions', 'server');
  api.use('simple-secure', 'server');
  api.use('encryptors', 'server');
  api.use('template-override', 'client');
  api.use('ui-helpers', 'client');

  // Resources
  api.add_files('templates.html', 'client');
  // Scripts
  api.add_files('filters.js', 'server');  
  api.add_files('client.js', 'client');  
  api.add_files('common.js', ['server', 'client']);
  api.add_files('server.js', 'server');
  api.add_files('client.js', 'client');
});
