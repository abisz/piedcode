const exec = require('child_process').exec,
  ftpClient = require('ftp'),
  fs = require('fs');

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

      connection.rmdir('', true, err => {
        if (err) {
          console.log('Error while cleaning server');
          process.exit();
        }

        console.log('Server cleaned');

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
