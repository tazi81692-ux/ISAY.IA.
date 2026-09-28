const DEFAULT=[
{name:"YA Essential Tee",price:399,category:"tshirt",sizes:"S / M / L / XL",description:"Heavyweight everyday tee."},
{name:"YA Signature Hoodie",price:699,category:"hoodie",sizes:"S / M / L / XL",description:"Relaxed premium hoodie."},
{name:"YA Utility Jacket",price:899,category:"jacket",sizes:"M / L / XL",description:"Structured outer layer."}
];
const PASS="YA2026";
const $=s=>document.querySelector(s);
let products=JSON.parse(localStorage.getItem("yaProducts")||"null")||DEFAULT;
function save(){localStorage.setItem("yaProducts",JSON.stringify(products));render();}
function render(){const box=$("#adminProducts");box.innerHTML=products.map((p,i)=>`<div class="admin-card">${p.image?`<img src="${p.image}" alt="">`:`<div class="card-img" style="height:220px">YA</div>`}<strong>${p.name}</strong><span class="muted">${p.price} MAD · ${p.category}</span><button onclick="removeProduct(${i})">DELETE</button></div>`).join("")}
function removeProduct(i){products.splice(i,1);save()}
$("#loginBtn").onclick=()=>{if($("#adminPassword").value===PASS){$("#loginBox").classList.add("hidden");$("#adminPanel").classList.remove("hidden");render()}else alert("Wrong password.")};
$("#productForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),file=f.get("image"),reader=new FileReader();reader.onload=()=>{products.unshift({name:f.get("name"),price:Number(f.get("price")),category:f.get("category"),sizes:f.get("sizes"),description:f.get("description"),image:reader.result});save();e.target.reset();alert("Added to this browser.")};reader.readAsDataURL(file)};
$("#resetBtn").onclick=()=>{products=DEFAULT;save()};
