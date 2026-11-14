const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage();
  await pg.goto('file://' + path.join(__dirname, 'index.html')); await pg.evaluate(() => READY);
  fs.writeFileSync(process.argv[2], JSON.stringify(await pg.evaluate(() => getLines()), null, 1));
  await b.close();
})();
