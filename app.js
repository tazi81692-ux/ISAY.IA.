const defaultProducts=[
{name:"YA Essential Tee",price:399,category:"tshirt",sizes:"S / M / L / XL",description:"Heavyweight everyday tee."},
{name:"YA Signature Hoodie",price:699,category:"hoodie",sizes:"S / M / L / XL",description:"Relaxed premium hoodie."},
{name:"YA Utility Jacket",price:899,category:"jacket",sizes:"M / L / XL",description:"Structured outer layer."}
];
let products=JSON.parse(localStorage.getItem("yaProducts")||"null")||defaultProducts;
let cart=JSON.parse(localStorage.getItem("yaCart")||"[]");
const $=s=>document.querySelector(s);
function renderProducts(filter="all"){
 const list=filter==="all"?products:products.filter(p=>p.category===filter);
 $("#products").innerHTML=list.map((p,i)=>`<article class="card"><div class="card-img">${p.image?`<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover">`:"YA"}</div><div class="card-info"><h3>${p.name}</h3><div class="muted">${p.sizes||"Sizes available"}</div><div class="price">${p.price} MAD</div><button class="add" onclick="addToCart(${i})">ADD TO BAG</button></div></article>`).join("");
}
function addToCart(i){cart.push(products[i]);localStorage.setItem("yaCart",JSON.stringify(cart));renderCart();$("#drawer").classList.add("open")}
function renderCart(){
 $("#cartCount").textContent=cart.length;
 $("#cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><span>${p.name}</span><strong>${p.price} MAD</strong></div>`).join(""):"<p class='muted'>Your bag is empty.</p>";
 $("#cartTotal").textContent=cart.reduce((a,p)=>a+Number(p.price),0)+" MAD";
}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.filter)}));
$("#cartBtn").onclick=()=>$("#drawer").classList.add("open");
$("#closeCart").onclick=()=>$("#drawer").classList.remove("open");
$("#drawer").onclick=e=>{if(e.target.id==="drawer")$("#drawer").classList.remove("open")};
$("#checkout").onclick=()=>alert("Add your WhatsApp number in app.js to enable ordering.");
renderProducts();renderCart();
