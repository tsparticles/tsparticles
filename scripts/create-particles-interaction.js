const fs = require("fs-extra");
const readline = require("readline");
const templateFolderName = "template-particles-interaction";
const templateFolder = `./scripts/${templateFolderName}`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

rl.on("close", function() {
  console.log("Particles interaction created successfully");
  process.exit(0);
});

rl.question("Particles interaction name: ", (name) => {
  rl.question("Particles interaction description: ", (description) => {
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

      const destFolder = `./interactions/particles/${name}`;

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
            webpackData = webpackData.replace(/tsParticles Template Particles Interaction/g, `tsParticles ${description} Particles Interaction`);

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

                distData = distData.replace(/tsparticles-interaction-particles-template/g, `tsparticles-interaction-particles-${name}`);
                distData = distData.replace(/"directory": "interactions\/particles\/template"/g, `"directory": "interactions/particles/${name}"`);
                distData = distData.replace(/"description": "tsParticles custom particles interaction"/g, `"description": "tsParticles ${description} particles interaction"`);
                distData = distData.replace(/tsparticles\.interaction\.particles\.template\.min\.js/g, `tsparticles.interaction.particles.${name}.min.js`);

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

                    packageData = packageData.replace(/tsparticles-interaction-particles-template/g, `tsparticles-interaction-particles-${name}`);
                    packageData = packageData.replace(/"directory": "interactions\/particles\/template"/g, `"directory": "interactions/particles/${name}"`);
                    packageData = packageData.replace(/"description": "tsParticles custom particles interaction"/g, `"description": "tsParticles ${description} particles interaction"`);
                    packageData = packageData.replace(/tsparticles\.interaction\.particles\.template\.min\.js/g, `tsparticles.interaction.particles.${name}.min.js`);

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