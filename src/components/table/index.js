import header from "./bestsellers-header";
import data from "./data";


export default class Table {
    subElements = {};
    wrapper = null;


    onClick = (event) => {
        const deleteEl = event.target.closest("[data-element=handleDelete]");
        const editEl = event.target.closest("[data-element=handleEdit]");

        if (editEl) {
            this.editElement(event);
        }

        if (deleteEl) {
            this.removeElement(event);
        }

    }

    removeElement(event) {
        const id = event.target.closest('.table__content-row').dataset.id;
        this.data = [...this.data].filter((item) => item.id !== id);
        event.target.closest('.table__content-row').remove();
    }

    onEdit = (event) => {
        event.preventDefault();
        const { productForm } = this.subElements;
        const allowedFields = Object.keys(this.defaultForm);
        const getValue = (field) => productForm.querySelector(`[name=${field}]`).value;

        const item = this.subElements[this.id];
        const productData = this.data.find((item) => item.id == this.id);

    
        for (const field of allowedFields) {
            const value = getValue(field);
            item.querySelector(`[data-element=${field}]`).textContent = field === 'price' ? parseInt(value) : value;
            productData[field] = value;
        }



        productForm.remove();
        this.wrapper = null;
        this.subElements.productForm = null;
        this.id = null;
    }


    onForm = (event) => {
        const addEl = event.target.closest("[data-element=handleAdd]");

        if (addEl) {

            if (this.wrapper !== null) {
                return;
            }
            this.createForm();
            
            const { productForm } = this.subElements;

            productForm.addEventListener('submit', this.onSave);

        }
    }

    onSave = (event) => {
        event.preventDefault();
        const allowedFields = Object.keys(this.defaultForm);
        const { productForm, body } = this.subElements;


        const getValue = (field) => productForm.querySelector(`[name=${field}]`).value;
        const data = {}

        for (const field of allowedFields) {
            if (field === 'title') {
                data.id = getValue(field);
            }
            data[field] = getValue(field);
        }
        
        const wrapper = document.createElement('div');
        wrapper.classList = 'table__content-body-row table__content-row';
        wrapper.dataset.element = `${data.id}`;
        wrapper.dataset.id = `${data.id}`
        wrapper.innerHTML = this.getTableRow(data);
        
        body.append(wrapper);


        productForm.remove();
        this.wrapper = null;
        this.subElements.productForm = null;
        this.id = null;
    }

    constructor() {
        this.headerConfig = header;
        this.data = data;
        this.render();
        this.defaultForm = {
            title: '',
            price: 0,
        }
        this.id = null;
    }

    render() {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.getTemplate();
        this.element = wrapper.firstElementChild;

        this.subElements = this.getSubElements();
        this.initEventListeners();
    }

    initEventListeners() {
        const { tableContent, tableHeader } = this.subElements;

        tableContent.addEventListener('click', this.onClick);
        tableHeader.addEventListener('click', this.onForm);
    }

    removeEventListeners() {
        document.removeEventListener('click', this.onClick);
        document.removeEventListener('click', this.onForm);
        document.removeEventListener('submit', this.onEdit);
    }

    createForm() {
        this.wrapper = document.createElement('div');
        this.wrapper.innerHTML = this.getFormGroup();

        this.element.append(this.wrapper.firstElementChild);
        this.subElements.productForm = this.element.querySelector('[data-element=productForm');
    }


    setFormData(item) {
        const { productForm } = this.subElements;

        const allowedFields = Object.keys(this.defaultForm);


        for (const field of allowedFields) {
            const name = productForm.querySelector(`[name="${field}"]`);
            if (name !== null) {
                name.value = item[field] || this.defaultForm[field]
            }
        }

        productForm.addEventListener('submit', this.onEdit)
    }


    editElement(event) {
        if (this.wrapper !== null) {
            return;
        }

        this.id = event.target.closest('.table__content-row').dataset.id;
        const item = this.data.find((item) => item.id === this.id);

        this.createForm();
        this.setFormData(item);
    }

    getSubElements() {
        const elements = this.element.querySelectorAll('[data-element]')
        for (const item of elements) {
            this.subElements[item.dataset.element] = item;
        }
        return this.subElements;
    }


    getTableHeader() {
        return ` <div class="table__content-header-row  table__content-row">
        ${this.headerConfig.map((item) => this.getHeaderRow(item)).join('')}
        </div>`
    }

    getHeaderRow({ id, title }) {
        return `<div class="table__content-cell" data-id="${id}"><span>${title}</span></div>`
    }


    getTableBody(data) {
        return `<div class="table__content-body" data-element="body">
        ${this.getTableRows(data)}
        </div>`
    }

    getTableRows(data) {
        return data.map((item) => `
        <div class="table__content-body-row table__content-row" data-element="${item.id}" data-id="${item.id}">${this.getTableRow(item)}</div>
        `).join('');
    }


    getTableRow(item) {
        console.log(item);
        const cells = this.headerConfig.map(({ id, template }) => {
            return {
                id,
                template,
            }
        })

        return cells.map(({ id, template }) => {
            return template
                ? template()
                : ` <div class="table__content-cell" data-element="${id}">${item[id]}</div>`
        }).join('');
    }

    getFormGroup() {
        return `<form class="form-group" data-element="productForm">
        <label for="name" class="form-group__label">Название</label>
        <div class="form-group__input">
            <input class="form-group__control" name="title" type="text" id="name" required placeholder="Name product">
        </div>
        <label for="price" class="form-group__label">Стоимость</label>
        <div class="form-group__input">
            <input class="form-group__control" name="price" type="number" id="price" required placeholder="Price count">
        </div>
        <div class="form-group__buttons">
            <button  name="save" class="button button_primary">
                Save
             </button>
             <input  name="reset" class="button button_primary" type="reset" value="Reset">
        </div>
    </form>`
    }


    getTemplate() {
        return `
            <div class="container" data-element="tableEdit">
                <div class="table__header table__content-row" data-element="tableHeader">
                    <div class="table__title table__header-title">Products</div>
                    <div></div>
                    <div class="table__icon table__header-icon">
                        <img src="./assets/icons/handleAdd.svg" class="table__icon-img" data-element="handleAdd" alt="">
                    </div>
                </div>
                <div class="table__content" data-element="tableContent">
                   ${this.getTableHeader()}
                   ${this.getTableBody(this.data)}
                </div>
            </div>`
    }



    remove() {
        if (this.element) {
            this.element.remove();
        }
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = null;
    }


}