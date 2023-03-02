
let signup_form = document.getElementById('signup_form');
signup_form.addEventListener('submit', function (e) {
    e.preventDefault();

    let formData = new FormData(this);
 
    fetch("/adminsignup", {
        method: 'POST',
        body: formData
    }).then(res => res.json())
        .then(function (res) {
            if (res.msg == "done") {
                console.log("ye chl rha h")
                window.location.href = "http://localhost:3000/";
               
            } else if (res.msg == "adminsignup") {
                window.location.href = "http://localhost:3000/adminsignup"

            } else if (res.msg == "notverified") {
                window.location.href ="http://localhost:3000/";
            }
        }).catch(function (err) {
            console.log(err);
        })
}) 

