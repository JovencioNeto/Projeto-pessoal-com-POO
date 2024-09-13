class Product{
    constructor(){
        this.id = 1
        this.arrayProduct = []
        this.editID = null
    }

    save_product(){
        let product = this.lerDados()

        if(this.valid_Campos(product) == true){
            if(this.editID == null){
                this.add_Product(product)
            } else{
                this.update(this.editID, product)
            }
            
        }
        
        this.list_Table()
        this.cancel_product()
    }

    list_Table(){
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''
        for( let i = 0; i < this.arrayProduct.length; i++){
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_product = tr.insertCell()
            let td_value = tr.insertCell()
            let td_acoes = tr.insertCell()

            td_id.innerText = this.arrayProduct[i].id
            td_product.innerText = this.arrayProduct[i].name
            td_value.innerText = this.arrayProduct[i].value +'R$'

            td_id.classList.add('center')

            let imgEdit = document.createElement('i')
            imgEdit.classList.add('bi','bi-pencil')
            
            imgEdit.addEventListener('click', ()=>{
                this.edit_Product(this.edit_Product(this.arrayProduct[i]))
            })

            let imgDelet = document.createElement('i')
            imgDelet.classList.add('bi', 'bi-trash')

            imgDelet.addEventListener('click', ()=>{
                this.delete_Product(this.arrayProduct[i].id)
            })

            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelet)

        }
    }
    add_Product(product){
        product.value = parseFloat(product.value)
        this.arrayProduct.push(product)
        this.id++
    }

    update(id,product){
        for( let i = 0; i< this.arrayProduct.length; i++){
            if(this.arrayProduct[i].id == id){
                this.arrayProduct[i].name = product.name
                this.arrayProduct[i].value = product.value
            }
        }
    }
    edit_Product(data){

        this.editID = data.id

        document.getElementById('product').value = data.name
        document.getElementById('value').value = data.value

        document.getElementById('btn_add').innerText = 'Atualizar'
    }
    lerDados(){
        let product = {}

        product.id = this.id
        product.name = document.getElementById('product').value  
        product.value = document.getElementById('value').value

        return product
    }

    valid_Campos(product){
        let msg = ''

        if(product.name == ''){
            msg += '- Informe o nome do produto! \n'
        }

        if(product.value == ''){
            msg += '- Informe o preço do produto! \n'
        }

        if(msg != ''){
            alert(msg)
            return false
        }

        return true
    }
    cancel_product(){
        document.getElementById('product').value = ''
        document.getElementById('value').value = ''

        document.getElementById('btn_add').innerText = 'Salvar'
        this.editID = null
    }

    delete_Product(id){
        
        if(confirm(`Deseja realmente deletar o produto com ID ${id}?`)){
            let tbody = document.getElementById('tbody')

            for( let i = 0; i < this.arrayProduct.length; i++){
                if(this.arrayProduct[i].id == id){
                    this.arrayProduct.splice(i,1)
                    tbody.deleteRow(i)
                    this.list_Table()
                    break
                }
            }
        }
        
    }
}

const product = new Product()