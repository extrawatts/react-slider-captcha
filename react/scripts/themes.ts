import * as fs from "fs";

fs.readFile("./src/style/light.css", "utf8", (err, data) => {
  if (err) throw err;
  fs.writeFile(
    "./src/style/light.ts",
    `const lightTheme = \`${data}\`;\nexport default lightTheme;\n`,
    (err) => {
      if (err) throw err;
    } // eslint-disable-line no-shadow
  );
});

fs.readFile("./src/style/dark.css", "utf8", (err, data) => {
  if (err) throw err;
  fs.writeFile(
    "./src/style/dark.ts",
    `const darkTheme = \`${data}\`;\nexport default darkTheme;\n`,
    (err) => {
      if (err) throw err;
    } // eslint-disable-line no-shadow
  );
});
