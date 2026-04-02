'use strict';

const fs = require('fs');

const copyFile = (source, destination) => {
  if (!source || !destination) {
    throw new Error('Both source and destination are required');
  }

  if (source === destination) {
    return;
  }

  if (!fs.existsSync(source)) {
    throw new Error('Source file does not exist');
  }

  if (fs.statSync(source).isDirectory()) {
    throw new Error('Source is a directory, not a file');
  }

  if (fs.existsSync(destination) && fs.statSync(destination).isDirectory()) {
    throw new Error('Destination is a directory, not a file');
  }

  fs.copyFileSync(source, destination);
};

const [sourceFile, destinationFile] = process.argv.slice(2);

try {
  copyFile(sourceFile, destinationFile);
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err.message);
  process.exit(1);
}
