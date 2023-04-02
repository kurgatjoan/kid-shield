var SigninForm = document.getElementById("SignInForm");
var SignUpForm = document.getElementById("SignUpform");
var Indicator = document.getElementById("Indicator");
let signupBtn = document.getElementById("registerBtn");
let signinBtn = document.getElementById("signinBtn");

function signup() {
  SignUpForm.style.transform = "translateX(0px)";
  SignInForm.style.transform = "translateX(0px)";
  Indicator.style.transform = "translateX(100px)";
}

if (signupBtn) {
  signupBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const _user = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    signUp(_user)
      .then((_res) => {
        if (_res.message || _res.error) {
          console.log("+++")
          alert(_res.message || _res.error);
        }
        window.location.href = "/";
        console.log("res: ", _res);
      })
      .catch((_err) => {
        console.log(_err);
        alert("Sorry! An error occured. Please try again.");
      });

    console.log("user: ", _user);
  });
}

function signin() {
  SignUpForm.style.transform = "translateX(300px)";
  SignInForm.style.transform = "translateX(300px)";
  Indicator.style.transform = "translateX(0px)";
}
if (signinBtn) {
  signinBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const _user = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    Login(_user)
      .then((_res) => {
        if (_res.message || _res.error) {
          alert(_res.message || _res.error);
        }
        window.location.href = "/";
        console.log("res: ", _res);
      })
      .catch((_err) => {
        console.log(_err);
        alert("Sorry! An error occured. Please try again.");
      });
    // usersignin(_user)
    //   .then((_res) => {
    //     console.log("ss: ", _res);
    //   })
    //   .catch((_err) => {
    //     console.log("err: ", _err);
    //   });
  });
}

// var website = document.getElementById("LoginForm");
var add_website = document.getElementById("add_website");
var remove_website = document.getElementById("remove_website");

if (add_website) {
  add_website.addEventListener("click", function () {
    const _site = {
      name: document.getElementById("name").value,
      url: document.getElementById("url").value,
    };

    addToBlockList(_site)
      .then((_res) => {
        if (_res.errorMessage) return alert(_res.errorMessage);
        alert("successfully updated");
        window.location.reload();
      })
      .catch((_err) => {
        console.log(_err);
        alert("Sorry! An error occured. Please try again.");
      });

    // var newWebsite = document.createElement("input");
    // newWebsite.setAttribute("type", "text");
    // newWebsite.setAttribute("name", "website[]");
    // newWebsite.setAttribute("class", "website");
    // newWebsite.setAttribute("siz", 50);
    // newWebsite.setAttribute("placeholder", "Add Website");
    // website.appendChild(newWebsite);
  });
}

if (remove_website) {
  remove_website.addEventListener("click", function () {
    // var input_tags = website.getElementsByTagName("input");
    // if (input_tags.length > 2) {
    //   website.removeChild(input_tags[input_tags.length - 1]);
    // }
    const _site = {
      name: document.getElementById("name").value,
      url: document.getElementById("url").value,
    };

    deleteFromBlockList(_site)
      .then((_res) => {
        if (_res.errorMessage) return alert(_res.errorMessage);
        alert("successfully updated");
        window.location.reload();
      })
      .catch((_err) => {
        console.log(_err);
        alert("Sorry! An error occured. Please try again.");
      });
    console.log(_site);
  });
}
