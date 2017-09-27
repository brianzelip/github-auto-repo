const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// via https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// When client hits my-site.glitch.me/addRepo, log body data from the form submit
app.post('/addRepo', function(req, res) {
  console.log('req', req.body, typeof req.body);
  const [repoType, parentOrg, repoName, repoDesc, newUserList] = [
    req.body.repoType,
    req.body.parentOrg,
    req.body.repoName,
    req.body.repoDesc,
    req.body.newUserList
  ];
  const uri =
    repoType === 'organization'
      ? `https://api.github.com/orgs/${parentOrg}/repos`
      : `https://api.github.com/user/repos`;

  const newUserKeys = Object.getOwnPropertyNames(req.body).filter(property =>
    property.includes('newUser')
  );

  const newUsers = newUserKeys.map(key => req.body[key]);

  const key = process.env.GHTOKEN;

  console.log(
    'req',
    req.body,
    repoType,
    repoDesc,
    repoName,
    Object.getOwnPropertyNames(req.body),
    uri,
    newUserKeys,
    newUsers
  );

  const addRepoOptions = {
    uri: uri,
    method: 'POST',
    headers: { 'User-Agent': 'brianzelip' },
    auth: { bearer: key },
    body: JSON.stringify({
      name: repoName,
      description: repoDesc,
      license_template: 'mit'
    })
  };

  request(addRepoOptions, function(error, response, body) {
    if (error) {
      return `ERROR!: ${error}`;
    } else if (response.statusCode === 200) {
      console.log('GitHub api was successfully queried 🎉\n');

      return;
    } else {
      return `Problem! Status code = ${response.statusCode}, response = ${response}`;
    }
  });

  setTimeout(function() {
    newUsers.map(user => {
      const options = {
        uri: `https://api.github.com/repos/${parentOrg}/${repoName}/collaborators/${user}`,
        method: 'PUT',
        headers: { 'User-Agent': 'brianzelip' },
        auth: { bearer: key },
        body: JSON.stringify({
          permission: 'admin'
        })
      };
      // console.log(
      //   `owner: ${owner}, repo: ${repo}, user: ${user}, of users: ${users}`
      // );
      // body: JSON.stringify({
      //   name: 'github-auto-repo3',
      //   description: 'This is the third iteration of this work.',
      //   license_template: 'mit'
      // })
      return request(options, function(error, response, body) {
        if (error) {
          return `ERROR!: ${error}`;
        } else if (response.statusCode === 200) {
          console.log('GitHub api was successfully queried 🎉\n');
          // fs.writeFile('.data/data.json', body, (err) => {
          //   if (err) throw err;
          //   console.log(`.data/data.json was successfully written 🎉\n`);
          // });
          // let timestamp = new Date();
          // const logEntry = `NCBI-Hackathons repos data refresh happened at ${timestamp} 🎉\n`;
          // console.log(`timestamp is ${timestamp}`);
          // fs.appendFile('.data/data.log', logEntry, (err) => {
          //   if (err) throw err;
          //   console.log(`The timestamp ${timestamp} was appended to .data/data.log 🎉\n`);
          // })
          return;
        } else {
          return `Problem! Status code = ${response.statusCode}, response = ${response}`;
        }
      });
    });
  }, 10000);

  res.send(req.body);
});
