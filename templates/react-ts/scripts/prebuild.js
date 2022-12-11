const fs = require('fs-extra');
const mainPackage = require('../package.json');
const libPackage = './template.json';

fs.readFile(libPackage, function (error, data) {
    if (error) {
        throw error;
    }

    const text = data.toString();

    const libObj = JSON.parse(text);

    console.log(libObj);

    libObj.package.dependencies["react-particles"] = mainPackage.dependencies["react-particles"].replace("", "");
    libObj.package.dependencies["tsparticles"] = mainPackage.dependencies["tsparticles"].replace("", "");
    libObj.package.dependencies["tsparticles-engine"] = mainPackage.dependencies["tsparticles-engine"].replace("", "");

    fs.writeFile(libPackage, JSON.stringify(libObj, undefined, 2), 'utf-8', function () {
        console.log(`template.json dependencies updated successfully`);
    });
});
