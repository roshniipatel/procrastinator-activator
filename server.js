const express = require('express');
const path = require('path');
const api = require('./routes');
// const index = require('./routes/index.js')
// const fs = require('fs');
// const util = require('util');

// const api = require('/routes');

// const uuid = require('./helper/uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.use(api);
// app.use(html);

// app.use('/api', api)

// // promise version of fs.readFile
// const readFromFile = util.promisify(fs.readFile);

// // function to write data to the JSON file given a destination and some content
// const writeToFile = (destination, content) =>
//   fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
//     err ? console.error(err) : console.info(`\nData written to ${destination}`)
//   );

// // function to read data from a given a file and append some content
// const readAndAppend = (content, file) => {
//   fs.readFile(file, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const parsedData = JSON.parse(data);
//       parsedData.push(content);
//       writeToFile(file, parsedData);
//     }
//   });
// };

// API notes | get route
// app.get('/', (req, res) => {
//   console.info(`${req.method} request received for notes`);
//   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
// });

// API notes | post route
// app.post('/', (req, res) => {
//   console.info(`${req.method} request received to add a note`);
//   const { title, text } = req.body;
//   if (req.body) {
//     const newNote = {
//       title,
//       text,
//       note_id: uuid(),
//     };
//     // reading and appending db.json file to existing content
//     readAndAppend(newNote, './db/db.json');
//     res.json(`Note added successfully!`);
//   } else {
//     res.error('Error in adding note.');
//   }
// });

// // delete the notes when trash icon is clicked
// app.delete('/api/notes/:id', (req, res) => {
//   const noteId = req.params.id;
//   readFromFile('./db/db.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       const result = json.filter((data) => data.id !== noteId);
//       // saving to filesystem
//       writeFile('./db/db.json', result);
//       // response for deleted notes
//       res.json(`The selected note ${noteId} has been deleted 🗑️`);
//     });
// });

// get routes for html pages
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, './public/index.html'))
// );

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT} 🚀`)
);
 