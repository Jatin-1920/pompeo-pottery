const cartButton = document.querySelectorAll('.add-to-cart')
let itemshop = document.querySelector('.itemofpurchase')
let totale = document.querySelector('.total')
let finalMoney = document.querySelector('.total-price')
let cartItem = []




function updateCartTotalPrice() {
    let totalPrice = 0
    cartItem.forEach(item=>{
totalPrice += item.price
    })
    return totalPrice
}

function updateCart(product){
  for(let i=0; i<cartItem.length; i++){
    if(cartItem[i].class===product.class){
        cartItem[i].count += 1
    cartItem[i].price = Math.round(cartItem[i].countPrice * cartItem[i].count)
 return
    }
}
cartItem.push(product)
}


function displayItem(e){
    const html = cartItem.map(x=>
      `
       <div class="Cart-col" id="${x.id}">
       <img src="${x.img}">
       <div class="cart-Price">
           <span class="cart-Title text-m fw900">${x.name}</span>
           <span class="text-m fw900 cartPrice">$ ${x.price}</span>
           <span id="button" ><i class="fa fa-trash" id="${x.id}" ></i></span>
       </div>
       <div class="cart-col-flex">
       <button class="minus"  >-</button>
       <span class="counted">${x.count}</span>
       <button class="plus">+</button>
       </div>

</div>
       `).join("")
       itemshop.innerHTML = html
finalMoney.innerHTML ='$' + updateCartTotalPrice()

       if(itemshop.innerHTML===""){
           totale.style.display = "none"
        }else{
            totale.style.display = "flex"
        }
    
}

function addToCart(e){
  
    const img = e.currentTarget.parentElement.previousElementSibling.firstElementChild.src;
    let title = e.currentTarget.parentElement.firstElementChild.textContent
const price =     parseFloat(e.currentTarget.parentElement.firstElementChild.nextElementSibling.textContent.replace('$',""))

    let cart = {
        name:title,
        id: Date.now(),
         price,
        img:img,
        count:1,
        countPrice:price,
        class:title,
    }

    // items.push(cart)
   updateCart(cart)
 
    itemshop.dispatchEvent(new CustomEvent("itemsUpdated"));
    alert(`Your ${title} added to the cart`)


}






function eventLocalStorage(){
    localStorage.setItem('cartItem',JSON.stringify(cartItem))
}

function getLocale(){
   const restore =  JSON.parse(localStorage.getItem('cartItem'))
   if(restore.length){
    cartItem = restore
    itemshop.dispatchEvent(new CustomEvent("itemsUpdated"));
   }
}

function deleteItems(id){
    console.log('Delete items')
    cartItem = cartItem.filter((item)=>item.id !==id)
    itemshop.dispatchEvent(new CustomEvent("itemsUpdated"));

}


function increment(id) {
    let selectedItem =id
    let search = cartItem.find(x=>x.id===selectedItem)
    if(search)
    {
        search.count +=1
    }
    itemshop.dispatchEvent(new CustomEvent("itemsUpdated"));
    calculation(id)
    deleted(id)
    }
    function decrement(id) {
        let selectedItem  =id
    let search = cartItem.find(x=>x.id===selectedItem)
    if(search.count===0) {
      deleteItems(id)
    }
    else{
        search.count -=1
    }
    itemshop.dispatchEvent(new CustomEvent("itemsUpdated"));
    calculation(id)
    deleted(id)
    }
    
    function calculation(id) {
        let search = cartItem.find(x=>x.id===id)
        search.price = search.count*search.countPrice
        itemshop.dispatchEvent(new CustomEvent("itemsUpdated"));
    }

function deleted(id) {
const selectedItem = id
const search = cartItem.find(x=>x.id===selectedItem)
if(search.count === 0) {
    cartItem = cartItem.filter(item=>item.id!==id)
}
itemshop.dispatchEvent(new CustomEvent("itemsUpdated"));
        }

cartButton.forEach(item=>item.addEventListener("click",addToCart))
itemshop.addEventListener("itemsUpdated",displayItem)
itemshop.addEventListener("itemsUpdated",eventLocalStorage)
itemshop.addEventListener("click",(e)=>{
    const id = parseInt(e.target.id)
    if(e.target.matches("i")){
        deleteItems(id)
    }
    
})


getLocale()

