/* Name: Data
Description: This file will hanlde all the data and file system related works
Author: Sonet Adhikary
Date: 11 Sep,2022 */

// Dependencies
const fs = require('fs');
const path = require('path');

// Module scaffolding
const crud = {};

// Base directory of the data folder

crud.baseDir = path.join(__dirname, '../.data/');

// Write data to file

crud.writeData = (folderName, fName, data, callBack) => {
  fs.open(`${crud.baseDir}/${folderName}/${fName}.json`, 'wx', (err1, fd) => {
    if (!err1 && fd) {
      // Convert data to string
      const stringData = JSON.stringify(data);
      //   write data to file and close it
      fs.writeFile(fd, stringData, (err2) => {
        if (!err2) {
          fs.close(fd, (err3) => {
            if (!err3) {
              callBack(null, 'File successfully clossed');
            } else {
              callBack('Error happend closeing the file');
            }
          });
        } else {
          callBack('Error happend while writting on file.File may already exist');
        }
      });
    } else {
      callBack('Error happend while writting on file.File may already exist');
    }
  });
};

// Read data from file

crud.readData = (folderName, fName, callBack) => {
  fs.readFile(`{crud.baseDir}/${folderName}/${fName}.json`, 'utf-8', (err, data) => {
    callBack(err, data);
  });
};

// Update existing file
crud.updateData = (folderName, fName, data, callBack) => {
  // open file for updating
  fs.open(`${crud.baseDir}/${folderName}/${fName}.json`, 'r+', (err1, fd) => {
    if (!err1 && fd) {
      const stringData = JSON.stringify(data);
      fs.ftruncate(fd, (err2) => {
        if (!err2) {
          // write new data and close file
          fs.writeFile(fd, stringData, (err3) => {
            if (!err3) {
              fs.close(fd, (err4) => {
                if (!err4) {
                  callBack('Successfully updated the file');
                } else {
                  callBack('Error:Closeing file');
                }
              });
            } else {
              callBack('Error:Writting to file');
            }
          });
        } else {
          callBack('Error: Truncateing file');
        }
      });
    } else {
      callBack('Error Updating:File may not exist');
    }
  });
};

// Delete doc file
crud.deleteFile = (folderName, fName, callBack) => {
  // Delete the file
  fs.unlink(`${crud.baseDir}/${folderName}/${fName}.json`, (err) => {
    if (!err) {
      callBack('Successfully deleted the file');
    } else {
      callBack('Error deleting file.File may not exist');
    }
  });
};

module.exports = crud;
