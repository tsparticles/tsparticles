const fs = require("fs-extra");
const readline = require("readline");
const templateFolderName = "template-external-interaction";
const templateFolder = `./scripts/${templateFolderName}`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

rl.on("close", function() {
  console.log("External interaction created successfully");
  process.exit(0);
});

rl.question("External interaction name: ", (name) => {
  rl.question("External interaction description: ", (description) => {
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

      const destFolder = `./interactions/external/${name}`;

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
            webpackData = webpackData.replace(/tsParticles Template External Interaction/g, `tsParticles ${description} External Interaction`);

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

                distData = distData.replace(/tsparticles-interaction-external-template/g, `tsparticles-interaction-external-${name}`);
                distData = distData.replace(/"directory": "interactions\/external\/template"/g, `"directory": "interactions/external/${name}"`);
                distData = distData.replace(/"description": "tsParticles custom external interaction"/g, `"description": "tsParticles ${description} external interaction"`);
                distData = distData.replace(/tsparticles\.interaction\.external\.template\.min\.js/g, `tsparticles.interaction.external.${name}.min.js`);

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

                    packageData = packageData.replace(/tsparticles-interaction-external-template/g, `tsparticles-interaction-external-${name}`);
                    packageData = packageData.replace(/"directory": "interactions\/external\/template"/g, `"directory": "interactions/external/${name}"`);
                    packageData = packageData.replace(/"description": "tsParticles custom external interaction"/g, `"description": "tsParticles ${description} external interaction"`);
                    packageData = packageData.replace(/tsparticles\.interaction\.external\.template\.min\.js/g, `tsparticles.interaction.external.${name}.min.js`);

                    fs.writeFile(`${destFolder}/package.json`, packageData, "utf8", (writePackageErr) => {
                      if (writePackageErr) {
                        console.error(`Error writing package.json: ${writePackageErr}`);

                        rl.close();

                        return;
                      }

                      fs.readFile(`${destFolder}/src/Interactor.ts`, "utf8", (readInteractorErr, interactorData) => {
                        if (readInteractorErr) {
                          console.error(`Error reading src/Interactor.ts: ${readInteractorErr}`);

                          rl.close();

                          return;
                        }

                        interactorData = interactorData.replace(/super\(container, "interactor"\);/g, `super(container, "${name}");`);

                        fs.writeFile(`${destFolder}/src/Interactor.ts`, interactorData, "utf8", (writeInteractorErr) => {
                          if (writeInteractorErr) {
                            console.error(`Error writing src/Interactor.ts: ${writeInteractorErr}`);

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