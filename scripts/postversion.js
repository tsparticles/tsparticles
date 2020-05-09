const fs = require('fs');
const packageInfo = require('../package.json');
const filePath = './tsParticles.nuspec';

fs.readFile(filePath, function (error, data) {
    if (error) {
        throw error;
    }

    const text = data.toString();

    const newValue = text.replace(/<version>(.*)<\/version>/gm, `<version>${packageInfo.version}</version>`);

    fs.writeFile(filePath, newValue, 'utf-8', function () {
        console.log(`nuspec updated successfully to version ${packageInfo.version}`);
    });
});
