"use strict";
document.addEventListener("DOMContentLoaded", init);

function init() {
    var submitButton = document.getElementById("submit");

    submitButton.addEventListener('click', processAndPost, false);

    // This function retrieveData, sanitizes input and sends Data to nova server
    function processAndPost(event) {
        event.preventDefault();

        function retrieveData() {
            var name       = document.getElementById("name").value,
                email      = document.getElementById("email").value,
                country    = document.getElementById("country").value,
                passportNo = document.getElementById("passportNo").value;

            var formData = {name: name, email: email, country: country, passportNo: passportNo};
            return formData;
        }

        function sanitizeInput(formData) {
            // sanitize the input here, for now just return the data
            return formData;
        }

        function validateInput(formData) {
            // validate the input here, for now just return the data
            return formData;
        }

        function sendData(validatedData) {
            var xhr = new XMLHttpRequest();

            xhr.addEventListener("load", function (event) { // on success

                //window.parent.postMessage(event.target.responseText, document.referrer);
                //window.parent.postMessage(event.target.responseText, "http://localhost:3000/");

                // this will post message on the parent window
                window.parent.postMessage(event.target.responseText, "https://lender-server.herokuapp.com/");
            });

            xhr.addEventListener("error", function (event) { // on error
                alert('Error retrieving data');
            });

            xhr.open("POST", "/api/handleRequest");  // We setup our request
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xhr.send(JSON.stringify(validatedData));
        }

        // would add unit testing in a separate module for the following functions, use TDD usually,
        var retrievedData = retrieveData(),
            sanitizedData = sanitizeInput(retrievedData),
            validatedData = validateInput(sanitizedData);

        sendData(validatedData);
    }
}