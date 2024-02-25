// URL & KEY
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0N2NkNTljNDM3MDAwMTkzYzM1ODUiLCJpYXQiOjE3MDg0MjQ0MDYsImV4cCI6MTcwOTYzNDAwNn0.7pnEfFyaGWnzxrpyVW2Q-zGhuVQsje_3xVCns5XUuXA"

// INPUT UTILI:
let inputName = document.getElementById("productName");
let inputBrand = document.getElementById("productBrand");
let inputDescription = document.getElementById("productDescription");
let imageUrl = document.getElementById("productImageUrl");
let inputPrice = document.getElementById("productPrice");

// NODI UTILI:
const tableParent = document.getElementById("listOfProducts");

//ID COUNTER (in createTable e createCollapse):
let idCounter = 0; 


//* fetch GET al caricamento pagina per vedere prodotti già inseriti:
window.onload = getProducts();

//* POST button:
const newProductBtn = document.getElementById("saveNewProduct");
newProductBtn.onclick= newProduct;

//* funzione che raccoglie i dati forniti per creare nuovo prodotto:
function newProduct () {
    let newProduct = {
        "name": `${inputName.value}`, 
        "brand": `${inputBrand.value}`,
        "description": `${inputDescription.value}`,
        "imageUrl": `${imageUrl.value}`,
        "price": inputPrice.value
    };

    // controllo valorizzazione campi:
    if (inputName.value && inputBrand.value && inputDescription.value && imageUrl.value && inputPrice.value) {
        postProduct(newProduct);
    } else {
        let alertNo = document.getElementById("noProductAdded");
            alertNo.classList.toggle("d-none");
            setTimeout(() => {
                alertNo.classList.toggle("d-none");
            }, 3000);
    }
}

//* funzione che svuota input newProduct: 
function clearInput() {
    inputName.value = "";
    inputBrand.value = "";
    inputDescription.value = "";
    imageUrl.value = "";
    inputPrice.value = "";
}

//* fetch CREATE:
async function postProduct (newProduct) {
    try {
        let addedProd = await fetch(apiUrl, 
            {
                method: "POST", 
                headers: {
                    "Content-type": "application/json; charset=UTF-8", 
                    "Authorization": key
                },
                body: JSON.stringify(newProduct)
            });
            getProducts();
            clearInput(); 
        if (addedProd && newProduct) {
            let alertOk = document.getElementById("newProductAdded");
            alertOk.classList.toggle("d-none");
            setTimeout(() => {
                alertOk.classList.toggle("d-none");
            }, 3000);
        };
    } catch (error) {
        console.log("There's an error in your request!")
    }
}

//* fetch READ:
async function getProducts() {
        try {
            let result = await fetch(apiUrl, { headers: {"Authorization": key} });
            let json = await result.json();
            if (document.querySelector(".list-group-item")) { //! controllo per evitare che duplichi tutti gli el quando viene richiamata da POST
                tableParent.innerHTML = "";
            }
            json.forEach(prod => {
                createTable(prod); 
            });
        } catch (error) {
            console.log(error);
        }
}

//* funzione che crea tabella per visualizzare prodotti inseriti:
function createTable(prod) {
    // creo un LI: 
    let tableItem = document.createElement("li");
    tableItem.classList.add("list-group-item");
    tableParent.appendChild(tableItem);

    let productPrev = document.createElement("span");
    productPrev.innerText = `${prod.name}`;
    tableItem.appendChild(productPrev);

    //box buttons: 
    let buttonBox = document.createElement("div");
    tableItem.appendChild(buttonBox);

    // ID per ogni bottone: 
    let btnID = idCounter;
    idCounter++;

    //!bottone di modifica + funzione collapse
    let buttonModify = document.createElement("button");
    buttonModify.classList.add("modify-button", "me-3");
    buttonModify.setAttribute("data-bs-toggle", "collapse");
    buttonModify.setAttribute("data-bs-target", `#btn${btnID}`);
    buttonModify.setAttribute("aria-expanded", "false");
    buttonModify.setAttribute("aria-controls", `btn${btnID}`);
    buttonBox.appendChild(buttonModify);
    let iconModify = document.createElement("i");
    iconModify.classList.add("fa-solid", "fa-pen", "p-2");
    buttonModify.appendChild(iconModify);

    tableParent.appendChild(createCollapse(prod, btnID)); //richiamo la funzione che crea il corpo del collapse 
    
    let putBtn = document.getElementById(`modify${btnID}button`); // catturo il btn creato dalla funzione    
    putBtn.addEventListener("click", function takeValues() {       //! catturo i valori correnti degli input
        let modifyDetails = {
            "name": document.getElementById(`name${btnID}input`).value,
            "brand": document.getElementById(`brand${btnID}input`).value,
            "description": document.getElementById(`descr${btnID}input`).value,
            "imageUrl": document.getElementById(`img${btnID}input`).value,
            "price": document.getElementById(`price${btnID}input`).value
        };
        putProducts(prod, modifyDetails);
    }); 

    //bottone di elimina: 
    let buttonDelete = document.createElement("button");
    buttonDelete.classList.add("delete-button");
    buttonDelete.id = `delete${btnID}`
    buttonBox.appendChild(buttonDelete);
    let iconDelete = document.createElement("i");
    iconDelete.classList.add("fa-solid", "fa-trash", "p-2");
    buttonDelete.appendChild(iconDelete);

    let deleteBtn = document.getElementById(`delete${btnID}`); // catturo il btn creato dalla funzione
    deleteBtn.addEventListener("click", () => {
        deleteProduct(prod);
    });
}

//* funzione che crea la collapsed area:
function createCollapse (prod, btnID) {
    //modale di modifica
    let collapseBox = document.createElement("div");
    collapseBox.classList.add("collapse");
    collapseBox.id = `btn${btnID}`;

    let inputCard = document.createElement("div");
    inputCard.classList.add("card", "card-body");
    collapseBox.appendChild(inputCard);

    let inputRow = document.createElement("div");
    inputRow.classList.add("row", "g-2");
    inputCard.appendChild(inputRow);

    //!name input:
    let nameCol = document.createElement("div");
    nameCol.classList.add("col-md-6");
    inputRow.appendChild(nameCol);

    let nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.classList.add("form-control")
    nameInput.id = `name${btnID}input`;
    nameInput.value = prod.name;
    nameCol.appendChild(nameInput);

    //!brand input:
    let brandCol = document.createElement("div");
    brandCol.classList.add("col-md-6");
    inputRow.appendChild(brandCol);

    let brandInput = document.createElement("input");
    brandInput.setAttribute("type", "text");
    brandInput.classList.add("form-control")
    brandInput.id = `brand${btnID}input`;
    brandInput.value = prod.brand;
    brandCol.appendChild(brandInput);

    //!descr input:
    let descrCol = document.createElement("div");
    descrCol.classList.add("col-12");
    inputRow.appendChild(descrCol);

    let descrInput = document.createElement("input");
    descrInput.setAttribute("type", "text");
    descrInput.classList.add("form-control")
    descrInput.id = `descr${btnID}input`;
    descrInput.value = prod.description;
    descrCol.appendChild(descrInput);

    //!img input:
    let imgCol = document.createElement("div");
    imgCol.classList.add("col-12");
    inputRow.appendChild(imgCol);

    let imgInput = document.createElement("input");
    imgInput.setAttribute("type", "text");
    imgInput.classList.add("form-control")
    imgInput.id = `img${btnID}input`;
    imgInput.value = prod.imageUrl;
    imgCol.appendChild(imgInput);

    //!price input:
    let priceCol = document.createElement("div");
    priceCol.classList.add("col-12");
    inputRow.appendChild(priceCol);

    let priceInput = document.createElement("input");
    priceInput.setAttribute("type", "number");
    priceInput.classList.add("form-control")
    priceInput.id = `price${btnID}input`;
    priceInput.value = prod.price;
    priceCol.appendChild(priceInput);

    //todo bottone MODIFICA:
    let btnCol = document.createElement("div");
    btnCol.classList.add("col-4");
    inputRow.appendChild(btnCol);

    let saveModify = document.createElement("button");
    saveModify.setAttribute("type", "button");
    saveModify.classList.add("modify-button", "me-2");
    saveModify.id = `modify${btnID}button`;
    btnCol.appendChild(saveModify);
    let spanModify = document.createElement("span");
    spanModify.classList.add("p-2");
    spanModify.innerText = "Conferma modifiche";
    saveModify.appendChild(spanModify);

    //todo bottone ANNULLA:
    let btnCol2 = document.createElement("div");
    btnCol2.classList.add("col-4");
    inputRow.appendChild(btnCol2);

    let annullaModify = document.createElement("button");
    annullaModify.setAttribute("type", "button");
    annullaModify.setAttribute("data-bs-toggle", "collapse");
    annullaModify.setAttribute("data-bs-target", `#btn${btnID}`);
    annullaModify.classList.add("delete-button");
    btnCol.appendChild(annullaModify);
    let spanAnnulla = document.createElement("span");
    spanAnnulla.classList.add("p-2");
    spanAnnulla.innerText = "Annulla";
    annullaModify.appendChild(spanAnnulla);

    return collapseBox
}

//* fetch UPDATE: 
async function putProducts (prod, modifyDetails) {
    try {
        let modifiedProd = await fetch(apiUrl + prod._id, 
            {
                method: "PUT", 
                headers: {
                    "Content-type": "application/json; charset=UTF-8", 
                    "Authorization": key
                },
                body: JSON.stringify(modifyDetails)
            });
            tableParent.innerHTML = "";
            getProducts();
        if (modifiedProd && putProducts) {
            let alertOk = document.getElementById("productModified");
            alertOk.innerText = "Il prodotto è stato modificato!"
            alertOk.classList.toggle("d-none");
            setTimeout(() => {
                alertOk.classList.toggle("d-none");
            }, 3000);
        }
    } catch (error) {
        console.log("There's an error in your request!")
    }
}

//* fetch DELETE: 
async function deleteProduct (prod) {
    try {
        await fetch(apiUrl + prod._id, 
            {
                method: "DELETE", 
                headers: { 
                    "Authorization": key
                }
            });
            tableParent.innerHTML = "";
            getProducts();
            if (deleteProduct) {
                let alertOk = document.getElementById("ProductDeleted");
                alertOk.innerText = "Il prodotto è stato eliminato con successo!"
                alertOk.classList.toggle("d-none");
                setTimeout(() => {
                    alertOk.classList.toggle("d-none");
                }, 3000);
            }
    } catch (error) {
        console.log("There's an error in your request!")
    }
}