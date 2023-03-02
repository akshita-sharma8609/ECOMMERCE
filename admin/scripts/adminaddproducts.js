
    let form = document.getElementById('admin_add_products');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
    
        let formData = new FormData(this);
     
        fetch("/addproductitems", {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(function (res) {
                if (res.msg == "done") {
                    console.log("ye chl rha h")
                    window.location.href = "http://localhost:3000/adminproducts";
                   
                } else if (res.msg == "undone") {
                    window.location.href = "http://localhost:3000/addproduct"
    
                } 
            }).catch(function (err) {
                console.log(err);
            })
    }) 
    
 