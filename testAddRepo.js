const express = require('express');
const request = require('request');

const app = express();

const key = '';

const options = {
  uri: 'https://api.github.com/orgs/NCBI-Hackathons/repos',
  method: 'POST',
  headers: { 'User-Agent': 'brianzelip' },
  auth: { bearer: key },
  body: JSON.stringify({
    name: 'github-redo-deploy-robot',
    description: 'hi there err body!',
    license_template: 'mit'
  })
};

request(options, function(error, response, body) {
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

// curl -d '{"name":"grdr-test", "description":"nothing to see here", "license_template": "mit"}' -u brianzelip:1816e13913b177df519c4b36288ce88f699cd41e https://api.github.com/orgs/NCBI-Hackathons/repos
