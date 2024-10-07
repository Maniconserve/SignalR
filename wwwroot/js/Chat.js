"use strict";

// Create the connection to the SignalR hub
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// Disable the send button until the connection is established
document.getElementById("sendButton").disabled = true;

// Define what happens when a message is received from the server
connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li"); // Create a new list item (li)
    li.textContent = `${user} says: ${message}`; // Use backticks for template literals
    document.getElementById("messagesList").appendChild(li); // Add the new message to the list
});

// Start the connection and enable the send button once connected
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

// Add click event listener to the send button
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault(); // Prevent the form from submitting
});
