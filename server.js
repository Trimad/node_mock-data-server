var fs = require('fs');
var mock = fs.readFileSync('mock.json');
var mockData = JSON.parse(mock);

var express = require('express');

var app = express();

var server = app.listen(3000, listening);

function listening() {
  console.log("Listening...");
}

app.use(express.static('website'));
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
app.get('/add/:title/:status/:notes', addThis);

function addThis(request, response) {
  let data = request.params;
  let id = Number(length(mockData));
  let title = String(data.title);
  let status = Boolean(data.status);
  let notes = String(data.notes);

  let toBeWritten = {
    id: id,
    title: title,
    status: status,
    notes: notes

  }
  mockData[id] = toBeWritten;
  let temp = JSON.stringify(mockData, null, 2);
  fs.writeFile('mock.json', temp, finished);

  function finished(err) {
    response.send(toBeWritten);
    console.log('Successfully written.');
  }

}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
app.get('/all', sendAll);
function sendAll(request, response) {
  let data = {
    mock: mockData
  }
  response.send(data);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

app.get('/searchTitle/:title/', searchTitle);

function searchTitle(request, response) {

  let title = request.params.title;
  let reply;
  let found = false;

  for (let i = 0; i < mockData.length; i++) {
    if (mockData[i].title == title) {
      found = true;
      reply = {
        id: mockData[i].id,
        title: title,
        status: mockData[i].status,
        notes: mockData[i].notes
      }
      break;
    }

  }

  if (found) {
  } else {
    reply = {
      status: "not found",
      title: title
    }
  }
  response.send(reply);

}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
app.get('/searchID/:id/', searchID);

function searchID(request, response) {

  let id = request.params.id;
  let reply;
  let found = false;

  for (let i = 0; i < mockData.length; i++) {
    if (mockData[i].id == id) {
      found = true;
      reply = {
        id: id,
        title: mockData[i].title,
        status: mockData[i].status,
        notes: mockData[i].notes
      }
      break;
    }

  }

  if (found) {
  } else {
    reply = {
      status: "not found",
      title: title
    }
  }
  response.send(reply);

}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function length(obj) {
  return Object.keys(obj).length;
}