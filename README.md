# ChatBot

*A lab report by Fabio Daiber*

## In this Report

To submit your lab, fork [this repository](https://github.com/FAR-Lab/IDD-Fa18-Lab6). You'll need to upload any code you change into your fork, as well as upload a video of a friend or classmate using your chatbot.

## Make the ChatBot your own

Here's my uploaded file: [chatServer.js](https://github.com/fpdaiber/IDD-Fa19-Lab6/edit/master/chatServer.js)

I've created a vacay recommendation bot. I've used the template from David and set up my own questions. Every question has a counter ```chosen``` based on the response to determine a good vacation option: 

```if (input.toLowerCase() == 'yes') {
      answer = 'Perfect!';
      chosen = 1; // go far
    } else {
      answer = 'Oh, too bad. I still got you!';
      chosen = 0; // go not far
      }
   ```
 After all question have been answered, I show the best destination according to the answers on the previous questions: 
 
 ```
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
```

## Record someone trying out your ChatBot

![alt text](https://drive.google.com/open?id=1E8sS1INRfo13kd-c0FpHDqSqLq7FcWGy)

[Bil trying my bot](https://drive.google.com/open?id=1B2bvWDs5jQKEXDW1z-UQV0byoN2_Ec1F)

---
Starter code by [David Goedicke](mailto:da.goedicke@gmail.com), closely based on work by [Nikolas Martelaro](mailto:nmartelaro@gmail.com) and [Captain Anonymous](https://codepen.io/anon/pen/PEVYXz), who forked original work by [Ian Tairea](https://codepen.io/mrtairea/pen/yJapwv).
