const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";// './productos.json'
let listaProductos;
const categorias = ["burgers", "tacos", "salads", "desserts", "drinks&sides"];
const imgCarrito = "<img src=\"./img/carrito.png\" alt=\"Carrito de compras\" class=\"w-25 m-1 inline\">";
let order = [];

function addQuantity () {
  const amounts = document.getElementsByClassName("amount");
  const prices = document.getElementsByClassName("price");
  const quantities = document.getElementsByClassName("quantity");
  const total = document.getElementById("total");
  order[this.value].quantity++;
  amounts[this.value].textContent = (parseFloat(amounts[this.value].textContent) + parseFloat(prices[this.value].textContent)).toFixed(2);
  quantities[this.value].textContent = parseInt(quantities[this.value].textContent) + 1;
  total.textContent = "Total: $" + (parseFloat(total.textContent.split("$")[1]) + parseFloat(prices[this.value].textContent)).toFixed(2);
  const items = document.getElementById("carrito");
  let cont = items.textContent.split(" ");
  cont = parseInt(cont[0]);
  cont++;
  items.innerHTML = imgCarrito + cont + " items";
}

function reduceQuantity () {
  const amounts = document.getElementsByClassName("amount");
  const prices = document.getElementsByClassName("price");
  const quantities = document.getElementsByClassName("quantity");
  const total = document.getElementById("total");
  if (parseInt(quantities[this.value].textContent) === 1) {
    order.splice(this.value, 1);
    orderDetail();
  } else {
    order[this.value].quantity--;
    amounts[this.value].textContent = (parseFloat(amounts[this.value].textContent) - parseFloat(prices[this.value].textContent)).toFixed(2);
    quantities[this.value].textContent = parseInt(quantities[this.value].textContent) - 1;
    total.textContent = "Total: $" + (parseFloat(total.textContent.split("$")[1]) - parseFloat(prices[this.value].textContent)).toFixed(2);
  }
  const items = document.getElementById("carrito");
  let cont = items.textContent.split(" ");
  cont = parseInt(cont[0]);
  cont--;
  items.innerHTML = imgCarrito + cont + " items";
}

function cancelOrder () {
  order = [];
  orderDetail();
  const items = document.getElementById("carrito");
  items.innerHTML = imgCarrito + "0 items";
}

function confirmOrder () {
  // eslint-disable-next-line no-console
  console.log(order);
  // order = []
  // orderDetail()
}

function addItem () {
  const items = document.getElementById("carrito");
  let cont = items.textContent.split(" ");
  cont = parseInt(cont[0]);
  cont++;
  items.innerHTML = imgCarrito + cont + " items";
  const detail = this.value.split(";");
  const index = order.findIndex(element => element.description === detail[0]);
  if (index !== -1) {
    order[index].quantity++;
  } else {
    const p = {
      item: order.length + 1,
      quantity: 1,
      description: detail[0],
      unitPrice: detail[1]
    };
    order.push(p);
  }
}

function displayCategoria () {
  const index = categorias.findIndex((element) => element === this.id);
  const categoria = document.getElementById("categoria");
  categoria.textContent = listaProductos[index].name;
  crearCardsProductos(listaProductos[index].products);
}

function orderDetail () {
  const categoria = document.getElementById("categoria");
  categoria.textContent = "Order detail";
  const contenido = document.getElementById("productos");
  contenido.className = "";
  contenido.innerHTML = "";
  const tabla = document.createElement("table");
  tabla.className = "table table-striped";
  const tablaH = document.createElement("thead");
  tablaH.innerHTML = "<tr><th>Item</th><th>Qty.</th><th>Description</th><th>Unit Price</th><th>Amount</th><th>Modify</th></tr>";
  const tablaB = document.createElement("tbody");
  let tr;
  let td;
  let btnGroup;
  let btn1;
  let btn2;
  let total = 0;
  for (let i = 0; i < order.length; i++) {
    const element = order[i];
    const amount = element.unitPrice * element.quantity;
    tr = document.createElement("tr");
    td = document.createElement("td");
    tr.innerHTML = "<td>" + element.item + "</td><td class=\"quantity\">" + element.quantity + "</td><td>" + element.description + "</td><td class=\"price\">" + element.unitPrice + "</td><td class=\"amount\">" + amount + "</td>";
    total += amount;
    btnGroup = document.createElement("div");
    btnGroup.className = "row-cols-2 d-inline-flex";
    btn1 = document.createElement("button");
    btn1.className = "btn btn-secondary m-1";
    btn1.textContent = "+";
    btn1.onclick = addQuantity;
    btn1.value = i;
    btn2 = document.createElement("button");
    btn2.className = "btn btn-secondary m-1";
    btn2.textContent = "-";
    btn2.onclick = reduceQuantity;
    btn2.value = i;
    btnGroup.appendChild(btn1);
    btnGroup.appendChild(btn2);
    td.appendChild(btnGroup);
    tr.appendChild(td);
    tablaB.appendChild(tr);
  }
  const row = document.createElement("div");
  row.className = "row w-100";
  const col1 = document.createElement("div");
  col1.className = "col-10";
  const col2 = document.createElement("div");
  col2.className = "col-2";
  const p = document.createElement("p");
  p.className = "bold";
  p.id = "total";
  p.textContent = "Total: $" + total;
  col1.appendChild(p);
  btnGroup = document.createElement("div");
  btnGroup.className = "row-cols-2 d-inline-flex";
  btnGroup.innerHTML = "<button class=\"btn btn-outline-dark cancel m-1 p-1\" data-bs-toggle=\"modal\" data-bs-target=\"#cancelModel\">Cancel</button>" +
  "<button id=\"confirm\" class=\"btn btn-outline-dark confirm m-1 p-1 w-75\">Confirm order</button>";
  col2.appendChild(btnGroup);
  row.appendChild(col1);
  row.appendChild(col2);
  tabla.appendChild(tablaH);
  tabla.appendChild(tablaB);
  contenido.appendChild(tabla);
  contenido.appendChild(row);
  document.getElementById("confirm").onclick = confirmOrder;
  document.getElementById("cancel").onclick = cancelOrder;
}

function crearCardsProductos (productos) {
  const contenido = document.getElementById("productos");
  contenido.className = "row row-cols-4";
  contenido.innerHTML = "";
  let col;
  let card;
  let img;
  let cardBody;
  let cardTitle;
  let cardText;
  let cardPrice;
  let cardButton;
  productos.forEach(element => {
    col = document.createElement("div");
    col.className = "col";
    card = document.createElement("div");
    card.className = "card h-100";
    img = document.createElement("img");
    img.src = element.image;
    img.className = "card-img-top";
    img.alt = "Imagen del producto";
    cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardTitle = document.createElement("h5");
    cardTitle.className = "card-title bold";
    cardTitle.textContent = element.name;
    cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = element.description;
    cardPrice = document.createElement("p");
    cardPrice.className = "card-text bold";
    cardPrice.textContent = element.price;
    cardButton = document.createElement("button");
    cardButton.className = "btn btn-dark";
    cardButton.textContent = "Add to car";
    cardButton.onclick = addItem;
    cardButton.value = element.name + ";" + element.price;
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardButton);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    contenido.appendChild(col);
  });
}

const promise = new Promise(function (resolve, reject) {
  fetch(url).then(function (response) {
    response.text().then((text) => {
      resolve(text);
    });
  }).catch((err) => {
    reject(err);
  });
});

promise.then((text) => {
  listaProductos = JSON.parse(text);
  crearCardsProductos(listaProductos[0].products);
  categorias.forEach(element => {
    document.getElementById(element).onclick = displayCategoria;
  });
  document.getElementById("carrito").onclick = orderDetail;
});
