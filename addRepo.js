const cors = require('cors');
const express = require('express');
const fs = require('fs');
const request = require('request');

const app = express();

const key = 'e15728aa0ce76e9e3384719f7a62bbb510bd7437';

const options = {
  // uri: 'https://api.github.com/user/repos',
  uri: 'https://api.github.com/orgs/NCBI-Hackathons/repos',
  method: 'POST',
  headers: { 'User-Agent': 'brianzelip' },
  auth: { bearer: key },
  body: JSON.stringify({
    name: 'github-auto-repo4',
    description: 'This is the fourth iteration of this work.',
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
