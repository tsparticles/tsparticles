const fs = require('fs');
const mainPackage = require('../package.json');
const libPackage = './projects/ng-particles/package.json';

fs.readFile(libPackage, function (error, data) {
    if (error) {
        throw error;
    }

    const text = data.toString();

    const libObj = JSON.parse(text);

    libObj.version = mainPackage.version;
    libObj.peerDependencies.tsparticles = mainPackage.dependencies.tsparticles;

    fs.writeFile(libPackage, JSON.stringify(libObj, undefined, 2), 'utf-8', function () {
        console.log(`lib package.json updated successfully to version ${mainPackage.version}`);
    });
});
