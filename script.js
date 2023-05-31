 $(function(){
  
      var   cart =$('.cart-icon')
      var removeCart = $('.remove-cart')
var menu =$('.menu')
var removeBtn = $('.remove')
menu.on('click', function(){
    $('.primary-navigation').css({
        transform:'translateY(0%)'
})
    $(this).fadeOut(100)
    removeBtn.fadeIn(600)

})
removeBtn.on('click',function(){
$('.primary-navigation').css({transform:'translateY(-200%)'})
$(this).fadeOut(100)
menu.fadeIn(600)
})

var li = $('li')
li.on('click',function(){
    $(this).addClass('active')
})
cart.on('click',function(){
    $('.cart-item').css({
        transform:'translateX(0%)',
})
})

$('.add-to-cart').on('click', function(){
    $('.cart-item').css({
        transform:'translateX(0%)',
})
})
removeCart.on('click',function(){
    $('.cart-item').css({
        transform:'translateX(-100%)',
})
})


})