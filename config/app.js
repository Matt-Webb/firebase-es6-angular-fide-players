'use strict';

module.exports = {
    db: {
        firebase: {
            databaseURL: 'https://mychessrating.firebaseio.com/',
            serviceAccount: './secure/mychessrating-35b25418f350.json'
        },
        fide: {
            url: 'http://ratings.fide.com/download/players_list_xml.zip',
            folder: './data/',
            xmlFile: 'players_list_xml_foa.xml'
        }
    },
    cron : "/1 * * * * *",
    logger : {
      appenders: [
        {
          type: "console"
        },
        {
          type: "file",
          filename: "./log/app.log",
          maxLogSize: 20480,
          backups: 3,
          category : "app"
        },
        {
          type: "logLevelFilter",
          level: "ERROR",
          appender: {
            type: "file",
            filename: "./log/errors.log"
          }
        }
      ]
    }
};
