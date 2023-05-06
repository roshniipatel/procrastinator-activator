const app = require('express').Router();
const uuid = require('../helper/uuid.js')

const fs = require('fs');
const util = require('util');

// promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// function to write data to the JSON file given a destination and some content
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// function to read data from a given a file and append some content
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// API notes | get route
app.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// API notes | post route
app.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const { title, text } = req.body;
  if (title && text) {
    console.log(req.body);
    // save in object
    const newNote = {
      title,
      text,
      id: uuid()
    };
    // reading and appending db.json file to existing content
    readAndAppend(newNote, './db/db.json');
    res.json(`note added successfully!`);
  } else {
    res.json('error in adding note')
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((data) => data.id !== noteId);
      // saving to filesystem
      writeFile('./db/db.json', result);
      // response for deleted notes
      res.json(`The selected note ${noteId} has been deleted 🗑️`);
    });
})

module.exports = app;