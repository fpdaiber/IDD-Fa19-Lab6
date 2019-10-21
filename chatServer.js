/*
chatServer.js
Author: David Goedicke (da.goedicke@gmail.com)
Closley based on work from Nikolas Martelaro (nmartelaro@gmail.com) as well as Captain Anonymous (https://codepen.io/anon/pen/PEVYXz) who forked of an original work by Ian Tairea (https://codepen.io/mrtairea/pen/yJapwv)
*/

var express = require('express'); // web server application
var app = express(); // webapp
var http = require('http').Server(app); // connects http library to server
var io = require('socket.io')(http); // connect websocket library to server
var serverPort = 8000;
var chosen = 0;


//---------------------- WEBAPP SERVER SETUP ---------------------------------//
// use express to create the simple webapp
app.use(express.static('public')); // find pages in public directory

// start the server and say what port it is on
http.listen(serverPort, function() {
  console.log('listening on *:%s', serverPort);
});
//----------------------------------------------------------------------------//


//---------------------- WEBSOCKET COMMUNICATION -----------------------------//
// this is the websocket event handler and say if someone connects
// as long as someone is connected, listen for messages
io.on('connect', function(socket) {
  console.log('a new user connected');
  var questionNum = 0; // keep count of question, used for IF condition.
  socket.on('loaded', function() { // we wait until the client has loaded and contacted us that it is ready to go.

    socket.emit('answer', "Hi there, I'm Nigel."); //We start with the introduction;
    setTimeout(timedQuestion, 4000, socket, "What is your name?"); // Wait a moment and respond with a question.

  });
  socket.on('message', (data) => { // If we get a new message from the client we process it;
    console.log(data);
    questionNum = bot(data, socket, questionNum); // run the bot function with the new message
  });
  socket.on('disconnect', function() { // This function  gets called when the browser window gets closed
    console.log('user disconnected');
  });
});
//--------------------------CHAT BOT FUNCTION-------------------------------//
function bot(data, socket, questionNum) {
  var input = data; // This is generally really terrible from a security point of view ToDo avoid code injection
  var answer;
  var question;
  var waitTime;

  /// These are the main statments that make up the conversation.
  if (questionNum == 0) {
    answer =  ' So, ' + input + ', I\'m your travel assistant. Let\'s find your next vacation destination'
    waitTime = 4000;
    question = 'What do you prefer, relaxing or exploring?'; // load next question
  } else if (questionNum == 1) {
    answer = 'Really, ' + input + '? Me, too!' ; // output response
    waitTime = 4000;
    question = 'Do you like going far?';
  } else if (questionNum == 2) {
    if (input.toLowerCase() == 'yes') {
      answer = 'Perfect!';
      chosen = 1; // go far
    } else {
      answer = 'Oh, too bad. I still got you!';
      chosen = 0; // go not far
      }
    waitTime = 3000;
    question = 'Are you a resort person?'; // load next question
    console.log(chosen);
 } else if (questionNum == 3) {
   answer = 'Ok cool, ' + input + ' it is.';
   if (input.toLowerCase() == 'yes') {
     chosen = chosen + 10; // resort
   } else {
     answer = 'Oh, too bad. I still got you!';
     chosen = chosen + 0; // no resort
     }
   waitTime = 4000;
   question = 'Do you prefer beach over mountain?'; // load next question
   console.log(chosen);
} else if (questionNum == 4) {
   answer = 'Alright, I feel you!';
   if (input.toLowerCase() == 'yes') {
     chosen = chosen + 100; // beach
   } else {
     answer = 'Oh, too bad. I still got you!';
     chosen = chosen + 0; // mountain
   }
   waitTime = 4000;
   question = 'Where do you live?'; // load next question
   console.log(chosen);
 } else if (questionNum == 5) {
   answer = input + '! What a great place. I\'ll keep that in mind.';
   waitTime = 4000;
   question = 'Ok, do you wanna see what I have found for you?'; // load next question
   console.log(chosen);
} else if (questionNum == 6) {
   if (chosen == 0) {
     answer = 'Ok here\'s what I have found: \n The Blue Ridge Mountains! It\'s close, lot\'s of small cabins and great mountains for hiking.'; // not far, no resort, no beach
 } else if (chosen == 1) {
       answer = 'Ok here\'s what I have found: \n The Rockies! It\'s far from your place, lot\'s of small cabins and great mountains for hiking.'; // far, no resort, no beach
 } else if (chosen == 10) {
       answer = 'Ok here\'s what I have found: \n Mohonk Mountain Resort! It\'s not far from your place, has a great resort with spa and everything and great mountains for hiking.'; // not far, resort, no beach
 } else if (chosen == 100) {
       answer = 'Ok here\'s what I have found: \n Asbury Park! It\'s not far from your place, has small B&B\'s and a nice beach.'; // not far, no resort, beach
 } else if (chosen == 110) {
       answer = 'Ok here\'s what I have found: \n Hilton Head! It\'s not far from your place, has great resorts and a nice beach.'; // not far, resort, beach
 } else if (chosen == 111) {
       answer = 'Ok here\'s what I have found: \n Bali! It\'s far from your place, has wonderful resorts and the best beaches.'; // far, resort, beach
 } else if (chosen == 11) {
       answer = 'Ok here\'s what I have found: \n St. Moritz, Switzerland! It\'s far from your place, has wonderful resorts and great mountains.'; // far, resort, no beach
 } else if (chosen == 101) {
       answer = 'Ok here\'s what I have found: \n Tulum, Mexico! It\'s far from your place, has small B&B\'s and a nice beach.'; // far, no resort, beach
 }
   waitTime = 7000;
   question = 'Do you like what I found?'; // load next question
 } else if (questionNum == 7) {
   if (input.toLowerCase() === 'yes') {
     answer = 'Awesome, glad I could help!'
   } else {
     answer = 'Oh, sorry to hear. Maybe next time!';
   }
   waitTime = 0;
   question = '';
 } else {
    answer = 'I have nothing more to say! Gotta go, see ya! :)'; // output response
    waitTime = 0;
    question = '';
  }


  /// We take the changed data and distribute it across the required objects.
  socket.emit('answer', answer);
  setTimeout(timedQuestion, waitTime, socket, question);
  return (questionNum + 1);
}

function timedQuestion(socket, question) {
  if (question != '') {
    socket.emit('question', question);
  } else {
    //console.log('No Question send!');
  }

}
//----------------------------------------------------------------------------//
