//--------Form------------

let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

signinBtn.onclick = function(){
    nameField.style.maxHeight = "0";
    title.innerHTML = "sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

signupBtn.onclick = function(){
  nameField.style.maxHeight = "60px";
  title.innerHTML = "sign up";
  signupBtn.classList.remove("disable");
  signinBtn.classList.add("disable");
  
}

// -------- Sign Up (Send data to PHP) --------
document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault(); // stop normal submit

    const formData = new FormData(this);

    fetch("php/signup.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // show response from PHP

        // Switch to Sign In UI
        nameField.style.maxHeight = "0";
        title.innerHTML = "Sign In";
        signupBtn.classList.add("disable");
        signinBtn.classList.remove("disable");

        document.getElementById("form").reset();
    })
    .catch(error => {
        console.error("Error:", error);
    });
});


// -------- Sign In (Check from Database using PHP) --------
document.getElementById("signinBtn").addEventListener("click", function() {

    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    fetch("php/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `email=${email}&password=${password}`
    })
    .then(response => response.text())
    .then(data => {
        if (data.trim() === "success"){
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid credentials");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

