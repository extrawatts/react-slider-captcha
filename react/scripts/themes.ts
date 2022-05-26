/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
fs.readFile('./src/style/light.css', 'utf8', (err: any, data: any) => {
  if (err) throw err;
  fs.writeFile(
    './src/style/light.ts',
    `const lightTheme = \`${data}\`;\nexport default lightTheme;\n`,
    (currentErr: any) => {
      if (currentErr) throw currentErr;
    },
  );
});

fs.readFile('./src/style/dark.css', 'utf8', (err: any, data: any) => {
  if (err) throw err;
  fs.writeFile(
    './src/style/dark.ts',
    `const darkTheme = \`${data}\`;\nexport default darkTheme;\n`,
    (currentErr: any) => {
      if (currentErr) throw currentErr;
    },
  );
});
