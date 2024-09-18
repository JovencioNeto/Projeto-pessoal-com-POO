const button_add  = document.getElementById('btn_add')
const button_remove = document.getElementById('btn_remove')
let tbody = document.getElementById('tbody')

button_add.addEventListener('click', ()=>{
    product.save_product()
})

button_remove.addEventListener('click', ()=>{
    product.cancel_product()
})