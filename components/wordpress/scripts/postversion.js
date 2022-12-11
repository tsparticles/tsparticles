const fs = require('fs-extra');
const packageInfo = require('../package.json');
const readmeFilePath = './readme.txt';

fs.readFile(readmeFilePath, function (error, data) {
	if (error) {
		throw error;
	}

	const text = data.toString();

	const newValue = text.replace(
		/Stable tag:(\s+)\S+/gm,
		`Stable tag:$1${packageInfo.version}`
	);

	fs.writeFile(readmeFilePath, newValue, 'utf-8', function () {
		console.log(
			`readme updated successfully to version ${packageInfo.version}`
		);
	});
});

const pluginFilePath = './wordpress-particles.php';

fs.readFile(pluginFilePath, function (error, data) {
	if (error) {
		throw error;
	}

	const text = data.toString();

	const newValue = text.replace(
		/\* Version:(\s+)\S+/gm,
		`* Version:$1${packageInfo.version}`
	);

	fs.writeFile(pluginFilePath, newValue, 'utf-8', function () {
		console.log(
			`plugin file updated successfully to version ${packageInfo.version}`
		);
	});
});

const blockFilePath = '../src/block.json',
	blockFile = require(blockFilePath);

blockFile.version = packageInfo.version;

fs.writeFile(blockFilePath, JSON.stringify(blockFile), function () {
	console.log(
		`block file updated successfully to version ${packageInfo.version}`
	);
});
