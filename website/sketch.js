function setup() {

  console.log("Running...");
  //createCanvas(300, 300);
  noLoop();
  var button = select('#submit');
  button.mousePressed(submitData);

}
/*
function analyzeThis() {
  var txt = select('#textinput').value();

  var data = {
    text: txt
  }
  httpPost('analyze/', data, 'json', dataPosted, postErr);
}

function dataPosted(result) {
  console.log(result);
}

function postErr(err) {
  console.log(err);
}
*/
function submitData() {
  var title = select('#title').value();
  var status = select('#status').value();
  var notes = select('#notes').value();

  loadJSON('add/' + title + '/' + status + '/' + notes, finished);

  function finished(data) {
    console.log(data);
  }

}
