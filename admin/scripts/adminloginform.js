
let login_form = document.getElementById('login_form');
login_form.addEventListener('submit', function (e) {
    e.preventDefault();

    let formData = new FormData(this);
 
    fetch("/adminlogin", {
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
            }else if (res.msg == "becomeseller") {
                window.location.href ="http://localhost:3000/adminsignup";
            }
        }).catch(function (err) {
            console.log(err);
        })
})

