'use strict';

const http = require('http');
const fs = require('fs');
const AdmZip = require('adm-zip');

class FidePlayerService {

    constructor(properties) {
        this.properties = properties;
        this.fide = properties.db.fide;
    }

    download(fileName) {
        const that = this;
        return new Promise(function(fulfill, reject) {
            try {
                let file = fs.createWriteStream(that.fide.folder + '/' + fileName);
                http.get(that.fide.url, function(response) {
                    response.pipe(file);
                    file.on('finish', function() {
                        file.close();
                        fulfill(fileName);
                    });
                }).on('error', function(err) {
                    fs.unlink(that.fide.folder);
                    reject(new Error(err));
                });
            } catch (err) {
                reject(new Error(err));
            }
        });
    }

    extract(file) {
        const that = this;
        return new Promise(function(fulfill, reject) {

            if (file.indexOf('.zip') === -1) {
                reject(new Error('File must be stored as a .zip'));
            }

            let zip = new AdmZip(that.fide.folder + '/' + file);
            let zipEntries = zip.getEntries();

            zipEntries.forEach(function(zipEntry) {
                if (zipEntry.entryName === that.fide.xmlFile) {
                    try {
                        console.log('extracting file!');
                        zip.extractEntryTo(that.fide.xmlFile, that.fide.folder, false, true);
                        console.log('extract complete');
                        fulfill('Extract complete.');
                    } catch (err) {
                        reject(new Error(err));
                    }
                } else {
                    console.log('error!!');
                    reject(new Error('Unable to match file'));
                }
            });
        });
    }
}

module.exports = FidePlayerService;