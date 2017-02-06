const exec = require('child_process').exec,
  ftpClient = require('ftp'),
  fs = require('fs'),
  async = require('async');

const ignoreFiles = ['.', '..', '.htaccess'];

let secret;

try {
  secret = require('../secret')
} catch (e) {
  console.log('Secret file with server credentials not found!');
  process.exit()
}

const connection = new ftpClient();

exec('gatsby build', (error, stdout, stderr) => {
  if (error) {
    console.log('Error while building Gatsby');
    process.exit();
  }

  console.log('Gatsby build complete!');

  exec('node scripts/generate-rss.js', (error, stdout, stderr) => {

    console.log('RSS generating complete!');

    connection.on('ready', () => {

      cleanServer( () => {

        console.log('Server cleaned');
        console.log('Starting upload');

        fs.readdir('public', (err, filenames) => {
          filenames.forEach( f => {

            if (fs.statSync('public/' + f).isDirectory()) {
              connection.mkdir(f, err => {
                if (err) {
                  console.log('error while creating directory');
                  process.exit();
                }

                fs.readdir('public/' + f, (err, filenames) => {

                  if (err) {
                    console.log('Error in readdir (inner)');
                    process.exit();
                  }

                  filenames.forEach( file => {
                    connection.put('public/' + f + '/' + file, f + '/' + file, err => {
                      if (err) console.log(err);
                      console.log(f + '/' + file);
                    })
                  });
                });
              })
            } else {
              connection.put('public/' + f, f, err => {
                if (err) console.log(err);
                console.log(f);
              });
            }
          });
          connection.end();
        });
      });
    });

    connection.connect({
      host: secret.HOST,
      user: secret.USERNAME,
      password: secret.PASSWORD
    });
  });
});

function cleanServer(finished) {
  connection.list( (err, files) => {
    if (err) {
      console.log('Error while listing ftp files');
      console.log(err);
      process.exit();
    }

    async.each(files, (f, cb) => {
      if ( ! ignoreFiles.includes(f.name)) {
        if (f.type === 'd') {
          connection.rmdir(f.name, true, (err) => {
            if (err) {
              console.log('Error while deleting directory');
              console.log(err);
            }
            cb();
          })
        } else {
          connection.delete(f.name, (err) => {
            if (err) {
              console.log('Error while deleting file');
              console.log(err);
            }
            cb();
          });
        }
      } else {
        cb();
      }
    }, err => {
      if (err) {
        console.log('Error occured while deleting server files');
        console.log(err);
      }

      finished();
    });
  });
}