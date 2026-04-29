// 🔐 PROTECT PAGE
if(!localStorage.getItem("user")){
  window.location="login.html";
}

// 👤 SHOW USER NAME
window.onload = () => {
  const username = localStorage.getItem("username");
  if(username){
    document.getElementById("welcomeUser").innerText = "Welcome, " + username;
  }

  display(listings);
};
const listings = [];

const cities = ["Mumbai","Delhi","Hyderabad","Bangalore"];
const titles = [
  "Sea View Villa","Modern Apartment","Cozy Cottage","Luxury Penthouse",
  "Lake Resort","City Loft","Garden Home","Beach Bungalow",
  "Mountain Stay","Service Apartment","Smart Home","Family Suite",
  "Heritage Stay","Nature Cottage","Skyline Flat","Budget Room",
  "Business Stay","2BHK Flat","Luxury Home","Sunset Villa"
];

// CREATE 20
for(let i=0;i<20;i++){
  listings.push({
    title: titles[i],
    price: Math.floor(Math.random()*5000)+2000,
    city: cities[i%4],
    type: i%2==0?"Day":"Night",
    rating:(Math.random()*1+4).toFixed(1),
    reviews:Math.floor(Math.random()*200)+50,
    distance:Math.floor(Math.random()*5)+1,
    superhost:Math.random()>0.5,
    image:`images/house${i+1}.jpg`
  });
}

const container = document.getElementById("listings");

// DISPLAY
function display(data){
  container.innerHTML="";

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  data.forEach((item,index)=>{
    const isSaved = wishlist.find(x=>x.title===item.title);

    container.innerHTML+=`
    <div class="col-md-4 mb-4">
      <div class="card">

        <img src="${item.image}">

        <div class="card-body">

          ${item.superhost ? `<span class="badge-host">SUPERHOST</span>` : ""}

          <h5>${item.title}</h5>

          <p>${item.city} • ${item.distance} km</p>

          <p>⭐ ${item.rating} · ${item.reviews}</p>

          <p><b>₹${item.price}</b></p>

          <div class="d-flex justify-content-between">

            <button onclick='view(${JSON.stringify(item)})' class="btn btn-primary btn-sm">View</button>

            <i onclick="toggleWishlist(${index})"
               class="bi bi-heart-fill wishlist ${isSaved?"active":""}">
            </i>

          </div>

        </div>
      </div>
    </div>`;
  });
}

// FILTER
function search(){
  const city=document.getElementById("city").value;
  const price=document.getElementById("price").value;
  const type=document.getElementById("type").value;

  const filtered=listings.filter(item=>{
    return (!city || item.city===city) &&
           (!price || item.price<=price) &&
           (!type || item.type===type);
  });

  display(filtered);
}

// VIEW
function view(item){
  localStorage.setItem("selected",JSON.stringify(item));
  window.location="listing.html";
}

// WISHLIST
function toggleWishlist(index){
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const item = listings[index];

  const exists = wishlist.find(x=>x.title===item.title);

  if(exists){
    wishlist = wishlist.filter(x=>x.title!==item.title);
  } else {
    wishlist.push(item);
  }

  localStorage.setItem("wishlist",JSON.stringify(wishlist));
  display(listings);
}

// DARK MODE
function toggleDark(){
  document.body.classList.toggle("dark");
}

// LOGOUT
function logout(){
  localStorage.removeItem("user");
  localStorage.removeItem("username");
  window.location="login.html";
}
// INIT
display(listings);