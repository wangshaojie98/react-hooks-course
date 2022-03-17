const glob = require('glob');

const globObj = new glob.Glob('*.html', {
  cwd: templates_root,
  sync: true
});