const fs = require("fs-extra");
const readline = require("readline");
const templateFolderName = "template-shape";
const templateFolder = `./scripts/${templateFolderName}`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

rl.on("close", function() {
  console.log("Shape created successfully");
  process.exit(0);
});

rl.question("Shape name: ", (name) => {
  rl.question("Shape description: ", (description) => {
    fs.pathExists(templateFolder, (existsErr, exists) => {
      if (existsErr) {
        console.error(`Error while checking "${templateFolder}": ${existsErr}`);

        rl.close();

        return;
      }

      if (!exists) {
        console.error(`Folder "${templateFolder}" not found`);

        rl.close();

        return;
      }

      const destFolder = `./shapes/${name}`;

      fs.copy(templateFolder, destFolder, {
        overwrite: false,
        errorOnExist: true
      }, (copyErr) => {
        if (copyErr) {
          console.error(`Error copying "${templateFolderName}": ${copyErr}`);
        } else {
          console.log(`"${templateFolderName}" folder copied to "${destFolder.replace("./", "")}"`);

          fs.readFile(`${destFolder}/webpack.config.js`, "utf8", (readWebpackErr, webpackData) => {
            if (readWebpackErr) {
              console.error(`Error reading webpack.config.js: ${readWebpackErr}`);

              rl.close();

              return;
            }

            webpackData = webpackData.replace(/getEntry\("template"\)/g, `getEntry("${name}")`);
            webpackData = webpackData.replace(/tsParticles Template Shape/g, `tsParticles ${description} Shape`);

            fs.writeFile(`${destFolder}/webpack.config.js`, webpackData, "utf8", (writeWebpackErr) => {
              if (writeWebpackErr) {
                console.error(`Error writing webpack.config.js: ${writeWebpackErr}`);

                rl.close();

                return;
              }

              fs.readFile(`${destFolder}/package.dist.json`, "utf8", (readDistErr, distData) => {
                if (readDistErr) {
                  console.error(`Error reading package.dist.json: ${readDistErr}`);

                  rl.close();

                  return;
                }

                distData = distData.replace(/tsparticles-shape-template/g, `tsparticles-shape-${name}`);
                distData = distData.replace(/"directory": "shapes\/template"/g, `"directory": "shapes/${name}"`);
                distData = distData.replace(/"description": "tsParticles custom shape"/g, `"description": "tsParticles ${description} shape"`);
                distData = distData.replace(/tsparticles\.shape\.template\.min\.js/g, `tsparticles.shape.${name}.min.js`);

                fs.writeFile(`${destFolder}/package.dist.json`, distData, "utf8", (writeDistErr) => {
                  if (writeDistErr) {
                    console.error(`Error writing package.dist.json: ${writeDistErr}`);

                    rl.close();

                    return;
                  }

                  fs.readFile(`${destFolder}/package.json`, "utf8", (readPackageErr, packageData) => {
                    if (readPackageErr) {
                      console.error(`Error reading package.json: ${readPackageErr}`);

                      rl.close();

                      return;
                    }

                    packageData = packageData.replace(/tsparticles-shape-template/g, `tsparticles-shape-${name}`);
                    packageData = packageData.replace(/"directory": "shapes\/template"/g, `"directory": "shapes/${name}"`);
                    packageData = packageData.replace(/"description": "tsParticles custom shape"/g, `"description": "tsParticles ${description} shape"`);
                    packageData = packageData.replace(/tsparticles\.shape\.template\.min\.js/g, `tsparticles.shape.${name}.min.js`);

                    fs.writeFile(`${destFolder}/package.json`, packageData, "utf8", (writePackageErr) => {
                      if (writePackageErr) {
                        console.error(`Error writing package.json: ${writePackageErr}`);

                        rl.close();

                        return;
                      }

                      fs.readFile(`${destFolder}/src/shape.ts`, "utf8", (readShapeErr, shapeData) => {
                        if (readShapeErr) {
                          console.error(`Error reading src/shape.ts: ${readShapeErr}`);

                          rl.close();

                          return;
                        }

                        shapeData = shapeData.replace(/addShape\("shape",/g, `addShape("${name}",`);

                        fs.writeFile(`${destFolder}/src/shape.ts`, shapeData, "utf8", (writeShapeErr) => {
                          if (writeShapeErr) {
                            console.error(`Error writing src/shape.ts: ${writeShapeErr}`);

                            rl.close();

                            return;
                          }

                          rl.close();
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        }
      });
    });
  });
});