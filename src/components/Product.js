class Product {
    constructor() {
        this.arrayProduct = []
        this.editID = null
        this.initializeId() // Inicializa o ID
    }

    initializeId() {
        // Se não há produtos, o ID começa em 1
        this.id = this.arrayProduct.length > 0
            ? Math.max(...this.arrayProduct.map(product => product.id)) + 1
            : 1
    }

    save_product() {
        let product = this.lerDados()

        if (this.valid_Campos(product)) {
            if (this.editID === null) {
                this.add_Product(product)
            } else {
                this.update(this.editID, product)
            }

            this.list_Table()
            this.cancel_product()
        }
    }

    list_Table() {
        let tbody = document.getElementById('tbody')
        tbody.innerHTML = ''
        for (let i = 0; i < this.arrayProduct.length; i++) {
            let tr = tbody.insertRow()

            let td_id = tr.insertCell()
            let td_product = tr.insertCell()
            let td_value = tr.insertCell()
            let td_acoes = tr.insertCell()

            td_id.innerText = this.arrayProduct[i].id
            td_product.innerText = this.arrayProduct[i].name
            td_value.innerText = this.arrayProduct[i].value + 'R$'

            td_id.classList.add('center')

            let imgEdit = document.createElement('i')
            imgEdit.classList.add('bi', 'bi-pencil')

            imgEdit.addEventListener('click', () => {
                this.edit_Product(this.arrayProduct[i])
            })

            let imgDelet = document.createElement('i')
            imgDelet.classList.add('bi', 'bi-trash')

            imgDelet.addEventListener('click', () => {
                this.delete_Product(this.arrayProduct[i].id)
            })

            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelet)
        }
    }

    add_Product(product) {
        product.id = this.getNextId() // Atribuir o próximo ID disponível
        this.arrayProduct.push(product)
        this.initializeId() // Atualizar o ID para o próximo produto
    }

    getNextId() {
        // Retorna o próximo ID disponível
        return this.id
    }

    update(id, product) {
        let index = this.arrayProduct.findIndex(p => p.id === id)
        if (index !== -1) {
            this.arrayProduct[index] = product
        }
    }

    edit_Product(data) {
        this.editID = data.id

        document.getElementById('product').value = data.name
        document.getElementById('value').value = data.value

        const button_add = document.getElementById('button_add')
        button_add.innerText = 'Atualizar'

        button_add.removeEventListener('click', this.updateProductHandler)
        button_add.addEventListener('click', this.updateProductHandler.bind(this))
    }

    updateProductHandler() {
        this.save_product()
    }

    lerDados() {
        return {
            id: this.id,
            name: document.getElementById('product').value,
            value: parseFloat(document.getElementById('value').value)
        }
    }

    valid_Campos(product) {
        let msg = ''

        if (product.name === '') {
            msg += '- Informe o nome do produto! \n'
        }

        if (isNaN(product.value) || product.value <= 0) {
            msg += '- Informe um preço válido para o produto! \n'
        }

        if (msg !== '') {
            alert(msg)
            return false
        }

        return true
    }

    cancel_product() {
        document.getElementById('product').value = ''
        document.getElementById('value').value = ''

        this.editID = null
    }

    delete_Product(id) {
        if (confirm(`Deseja realmente deletar o produto com ID ${id}?`)) {
            this.arrayProduct = this.arrayProduct.filter(product => product.id !== id)
            this.list_Table()
            this.initializeId()
        }
    }
}

const product = new Product()
