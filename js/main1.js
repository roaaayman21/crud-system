var productName = document.getElementById("ProductName");
var productPrice = document.getElementById("Price");
var productCat = document.getElementById("Category");
var productDesc = document.getElementById("Desc");
var searchProduct = document.getElementById('search');
var bAddProduct=document.getElementById('bAddProduct');
var bUpdateProduct=document.getElementById('bUpdateProduct');
var productContainer = [];

if (localStorage.getItem('myProducts') != null) {
    productContainer = JSON.parse(localStorage.getItem('myProducts'));
    display(productContainer);
} else {
    productContainer = [];
}

function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCat.value,
        description: productDesc.value
    };
    productContainer.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productContainer));
    
    display(productContainer);
    clear();
}

function clear() {
    productName.value = "";
    productPrice.value = "";
    productCat.value = "";
    productDesc.value = "";
}

function display(arrayContent) {
    var cartoona = "";
    for (var i = 0; i < arrayContent.length; i++) {
        cartoona += `
            <tr>
                <td>${arrayContent[i].name}</td>
                <td>${arrayContent[i].price}</td>
                <td>${arrayContent[i].category}</td>
                <td>${arrayContent[i].description}</td>
                <td class="text-center">
                    <button onclick='update(${i})' class="btn btn-dark">Update</button>
                    <button onclick='deleteProdect(${i})' class="btn btn-dark">Delete</button>
                </td>
            </tr>`;
    }
    document.getElementById("tbody").innerHTML = cartoona;
}

function searchProduct(value) {
    let cartoona ='';
    for(let i=0;i<productContainer.length;i++)
    {
        if(productContainer[i].category.toLowerCase().includes(value.toLowerCase()))
        {
            cartoona += `
            <tr>
                <td>${productContainer[i].name}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].category}</td>
                <td>${productContainer[i].description}</td>
                <td class="text-center">
                    <button onclick='update(${i})' class="btn btn-dark">Update</button>
                    <button onclick='deleteProdect(${i})' class="btn btn-dark">Delete</button>
                </td>
            </tr>`;
    }     }
    document.getElementById("tbody").innerHTML = cartoona;
}
function deleteProdect(indexDeleted){
    productContainer.splice(indexDeleted,1)
    localStorage.setItem("myProducts", JSON.stringify(productContainer))
    display(productContainer);
}

function update(index) {
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCat.value = productContainer[index].category;
    productDesc.value = productContainer[index].description;

    bUpdateProduct.setAttribute('data-index', index);

    
    bAddProduct.classList.add('d-none');
    bUpdateProduct.classList.remove('d-none');
}


bUpdateProduct.addEventListener('click', function () {

    const index = parseInt(bUpdateProduct.getAttribute('data-index'));

    productContainer[index].name = productName.value;
    productContainer[index].price = productPrice.value;
    productContainer[index].category = productCat.value;
    productContainer[index].description = productDesc.value;

    
    localStorage.setItem('myProducts', JSON.stringify(productContainer));

    clear();

    display(productContainer);

    bAddProduct.classList.remove('d-none');
    bUpdateProduct.classList.add('d-none');
});

