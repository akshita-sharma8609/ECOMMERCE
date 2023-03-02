
let products_container = document.getElementById("products_container");
let loadmore = document.getElementById("loadmore");
let last_i=5;
//xml request to fetch all the products data that is stored in products.txt file
let xhttps = new XMLHttpRequest();
xhttps.open('GET', "/getproductitems");
xhttps.send();

let data; //to store the data of products

xhttps.addEventListener("load", function () {
    data = xhttps.responseText;
    if (data.length > 0) {
        data = JSON.parse(data)
    }
    else data = [];

    for (let i = 0; i < 5; i++) {
        createCard(data[i]); //create a card to display the data of a product
    }

})


//creates the card to display on UI
function createCard(obj) {

    let main_div = document.createElement("div");
    main_div.setAttribute('class', "item");
    main_div.setAttribute('id',`div${obj.productid}`)
    // main_div.classList.add("item");

    let detail_div = document.createElement("div");
    detail_div.setAttribute('class', "detail_div");
    let html = `<h2>${obj.productname}</h2>
                <h3>Rs. ${obj.productprice}/-</h3>
                <a href="#" class="viewdetails" id="${obj.productid}" onclick="viewDetails(this.id)">View Details...</a>
                <p id="d${obj.productid}" style="display:none;">${obj.description}</p>`

    detail_div.innerHTML = html;

    main_div.innerHTML = `<img class="cross" id="c${obj.productid}" src="../icons/cross2.png" onclick="delpopup(this.id)">
                        <img class="product_img" id="i${obj.productid}"src="${obj.productimg}">
                        ${detail_div.innerHTML}`

    products_container.appendChild(main_div)

}

//on clicking the view details link a popup msg will appear and description of the product will be displayed
function viewDetails(id) {

    //shows the description
    let p = document.getElementById(`d${id}`);
    p.style.display = "block";

    //hides the view detail link
    let a = document.getElementById(id);
    a.style.display = "none";

    //creating popup of card
    let main_div = document.getElementById(`div${id}`);
    main_div.classList.add('popup');
    main_div.style.pointerEvents="visible";
    main_div.classList.remove('item');
    
    let img = document.getElementById(`i${id}`);
    img.classList.add("img_popup");
    img.classList.remove("product_img");

    let cross = document.getElementById(`c${id}`);
    cross.style.display="block";

    document.body.style.pointerEvents="none";
}

//when cross icon on popup msg will be clicked the popup msg will convert back into card
function delpopup(id){
    
    let num_id = id.substring(1, id.length);

    let main_div= document.getElementById(`div${num_id}`)
    main_div.classList.remove('popup');
    main_div.classList.add('item');

    let cross = document.getElementById(id);
    cross.style.display="none";

    let viewdetail = document.getElementById(num_id);
    viewdetail.style.display="block";
    let descp = document.getElementById(`d${num_id}`);
    descp.style.display="none";

    let img = document.getElementById(`i${num_id}`);
    img.classList.add("product_img");
    img.classList.remove("img_popup");
    document.body.style.pointerEvents="visible";
}


//displaying more products when load more button is clicked
loadmore.addEventListener("click", function () {
    
    for (let i = last_i; i < last_i+5; i++) {
        if(i<data.length) createCard(data[i]);
        else {
            loadmore.style.display="none";
            break;
        }
    }
    last_i+=5;
})

