import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

(async () => {
  fs.unlink('dist/index.html', (err) => {
    if (err) {
      console.error('Delete Fail' + err)
    }
  });
  // fs.copyFileSync('./manifest.json', './dist/manifest.json');
})();

