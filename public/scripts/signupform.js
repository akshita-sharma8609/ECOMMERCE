
let signup_form = document.getElementById('signup_form');
signup_form.addEventListener('submit', function (e) {
    e.preventDefault();

    let formData = new FormData(this);
 
    fetch("/signup", {
        method: 'POST',
        body: formData
    }).then(res => res.json())
        .then(function (res) { 
            if (res.msg == "done") {
                console.log("ye chl rha h")
                window.location.href = "http://localhost:3000/";
               
            } else if (res.msg == "signup") {
                let error = document.getElementById('error');
                error.innerText = res.err;
                let email = document.getElementById('email');
                email.value = '';
                let password = document.getElementById('password');
                password.value = '';
                let address = document.getElementById('address');
                address.value = '';

                // window.location.href = "http://localhost:3000/signup"

            } else if (res.msg == "notverified") {
                window.location.href ="http://localhost:3000/";
            }
        }).catch(function (err) {
            console.log(err);
        })
})



