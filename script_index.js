// URL & KEY
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2NkNTljNDM3MDAwMTkzYzM1ODUiLCJpYXQiOjE3MDg0MjQ0MDYsImV4cCI6MTcwOTYzNDAwNn0.7pnEfFyaGWnzxrpyVW2Q-zGhuVQsje_3xVCns5XUuXA"

// NODE UTILE:
let productRow = document.getElementById("productSection"); 


// * GET in HOMEPAGE
window.onload = getProducts();

async function getProducts () {
    try {
        let result = await fetch(apiUrl, { headers: {"Authorization": key} });
        let json = await result.json();
        json.forEach(prod => {
            createCards(prod);
        });        
    } catch (error) {
        console.log(error);
    }
} 

//funzione che crea cards:
function createCards ( { name, brand, description, imageUrl, price, _id }) {    

    let productCol = document.createElement("div");
    productCol.classList.add("col-12", "col-sm-6", "col-md-3", "col-lg-3");

    productRow.appendChild(productCol); 

    let productCard = document.createElement("div"); 
    productCard.classList.add("card", "h-100", "hover-zoom");

    productCol.appendChild(productCard);

    let cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top", "img-fluid");
    cardImage.src = imageUrl;

    productCard.appendChild(cardImage);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "lato-bold");
    cardTitle.innerText = name;

    let cardBrand = document.createElement("h6");
    cardBrand.innerText = brand;

    let cardPrice = document.createElement("h6");
    cardPrice.innerText = price + " €";

    let cardDescription = document.createElement("p");
    cardDescription.classList.add("lato-light", "ellipsis");
    cardDescription.innerText = description;

    let linkTo = document.createElement("a");
    linkTo.classList.add("product-page-link");
    linkTo.innerText = "Dettagli prodotto";
    linkTo.target = "_blank";
    linkTo.href = `/details.html?id=${_id}`;

    productCard.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardBrand);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(linkTo);
}

