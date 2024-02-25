//URL pagina dettagli: 
let urlProduct = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2NkNTljNDM3MDAwMTkzYzM1ODUiLCJpYXQiOjE3MDg0MjQ0MDYsImV4cCI6MTcwOTYzNDAwNn0.7pnEfFyaGWnzxrpyVW2Q-zGhuVQsje_3xVCns5XUuXA"

//spinner
const spinner = document.getElementById("loadingSpinner");

//params:
let activeParams = window.location.search; 

let params = new URLSearchParams(activeParams);
let productId = params.get("id");

let productDetails;

window.onload = getDetails();

//* fetch sul prodotto specifico:
async function getDetails () {
    spinner.classList.toggle("d-none");
    try {
        let result = await fetch(`${urlProduct}${productId}`,  { headers: {"Authorization": key} });
        let json = await result.json();
        console.log(json);
        moreDetails(json);        
    } catch (error) {
        console.log("C'è un errore!")
    }
};

//* funzione che crea la card dettagli:
function moreDetails({ name, brand, description, imageUrl, price}) {
    spinner.classList.toggle("d-none");
    let imageBox = document.getElementById("imageProduct");

    let imageProduct = document.createElement("img");
    imageProduct.classList.add("w-100", "p-2");
    imageProduct.src = imageUrl;
    imageProduct.setAttribute("alt", "immagine_prodotto");
    imageBox.appendChild(imageProduct);

    let nameProduct = document.querySelector("h5.lato-bold.fs-3");
    nameProduct.innerText = name;

    let brandPrice = document.querySelectorAll("li h6");
    brandPrice[0].innerText = brand;
    brandPrice[1].innerText = price + " euro";

    let prodDescription = document.querySelector("li p.lato-light");
    prodDescription.innerText = description;

}