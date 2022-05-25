"use strict";(self.webpackChunklist_editor=self.webpackChunklist_editor||[]).push([[856],{919:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const s=[{id:"title",title:"Name"},{id:"price",title:"Price"},{id:"action",title:"Action",template:()=>'<div class="table__content-cell table__content-cell-icons">\n    <div class="table__icon">\n        <img src="./assets/icons/handleEdit.svg" class="table__icon-img" data-element="handleEdit" alt="edit">\n    </div>\n    <div class="table__icon">\n        <img src="./assets/icons/handleDelete.svg" class="table__icon-img" data-element="handleDelete" alt="delete">\n    </div>\n</div>'}],i=[{id:"Iphone",title:"IPhone",price:6e4},{id:"Sumsung",title:"Sumsung",price:6e4},{id:"Huawei",title:"Huawei",price:6e4},{id:"OOOOOOOoOOh Eldeen Ringg",title:"Elden Ring",price:1e6}];function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class r{removeElement(e){const t=e.target.closest(".table__content-row").dataset.id;this.data=[...this.data].filter(e=>e.id!==t),e.target.closest(".table__content-row").remove()}constructor(){l(this,"subElements",{}),l(this,"wrapper",null),l(this,"onClick",e=>{const t=e.target.closest("[data-element=handleDelete]");e.target.closest("[data-element=handleEdit]")&&this.editElement(e),t&&this.removeElement(e)}),l(this,"onEdit",e=>{e.preventDefault();const{productForm:t}=this.subElements,n=Object.keys(this.defaultForm),s=e=>t.querySelector(`[name=${e}]`).value,i=this.subElements[this.id],l=this.data.find(e=>e.id==this.id);for(const e of n){const t=s(e);i.querySelector(`[data-element=${e}]`).textContent="price"===e?parseInt(t):t,l[e]=t}t.remove(),this.wrapper=null,this.subElements.productForm=null,this.id=null}),l(this,"onForm",e=>{if(e.target.closest("[data-element=handleAdd]")){if(null!==this.wrapper)return;this.createForm();const{productForm:e}=this.subElements;e.addEventListener("submit",this.onSave)}}),l(this,"onSave",e=>{e.preventDefault();const t=Object.keys(this.defaultForm),{productForm:n,body:s}=this.subElements,i=e=>n.querySelector(`[name=${e}]`).value,l={};for(const e of t)"title"===e&&(l.id=i(e)),l[e]=i(e);const r=document.createElement("div");r.classList="table__content-body-row table__content-row",r.dataset.element=""+l.id,r.dataset.id=""+l.id,r.innerHTML=this.getTableRow(l),s.append(r),n.remove(),this.wrapper=null,this.subElements.productForm=null,this.id=null}),this.headerConfig=s,this.data=i,this.render(),this.defaultForm={title:"",price:0},this.id=null}render(){const e=document.createElement("div");e.innerHTML=this.getTemplate(),this.element=e.firstElementChild,this.subElements=this.getSubElements(),this.initEventListeners()}initEventListeners(){const{tableContent:e,tableHeader:t}=this.subElements;e.addEventListener("click",this.onClick),t.addEventListener("click",this.onForm)}removeEventListeners(){document.removeEventListener("click",this.onClick),document.removeEventListener("click",this.onForm),document.removeEventListener("submit",this.onEdit)}createForm(){this.wrapper=document.createElement("div"),this.wrapper.innerHTML=this.getFormGroup(),this.element.append(this.wrapper.firstElementChild),this.subElements.productForm=this.element.querySelector("[data-element=productForm")}setFormData(e){const{productForm:t}=this.subElements,n=Object.keys(this.defaultForm);for(const s of n){const n=t.querySelector(`[name="${s}"]`);null!==n&&(n.value=e[s]||this.defaultForm[s])}t.addEventListener("submit",this.onEdit)}editElement(e){if(null!==this.wrapper)return;this.id=e.target.closest(".table__content-row").dataset.id;const t=this.data.find(e=>e.id===this.id);this.createForm(),this.setFormData(t)}getSubElements(){const e=this.element.querySelectorAll("[data-element]");for(const t of e)this.subElements[t.dataset.element]=t;return this.subElements}getTableHeader(){return` <div class="table__content-header-row  table__content-row">\n        ${this.headerConfig.map(e=>this.getHeaderRow(e)).join("")}\n        </div>`}getHeaderRow(e){let{id:t,title:n}=e;return`<div class="table__content-cell" data-id="${t}"><span>${n}</span></div>`}getTableBody(e){return`<div class="table__content-body" data-element="body">\n        ${this.getTableRows(e)}\n        </div>`}getTableRows(e){return e.map(e=>`\n        <div class="table__content-body-row table__content-row" data-element="${e.id}" data-id="${e.id}">${this.getTableRow(e)}</div>\n        `).join("")}getTableRow(e){console.log(e);return this.headerConfig.map(e=>{let{id:t,template:n}=e;return{id:t,template:n}}).map(t=>{let{id:n,template:s}=t;return s?s():` <div class="table__content-cell" data-element="${n}">${e[n]}</div>`}).join("")}getFormGroup(){return'<form class="form-group" data-element="productForm">\n        <label for="name" class="form-group__label">Название</label>\n        <div class="form-group__input">\n            <input class="form-group__control" name="title" type="text" id="name" required placeholder="Name product">\n        </div>\n        <label for="price" class="form-group__label">Стоимость</label>\n        <div class="form-group__input">\n            <input class="form-group__control" name="price" type="number" id="price" required placeholder="Price count">\n        </div>\n        <div class="form-group__buttons">\n            <button  name="save" class="button button_primary">\n                Save\n             </button>\n             <input  name="reset" class="button button_primary" type="reset" value="Reset">\n        </div>\n    </form>'}getTemplate(){return`\n            <div class="container" data-element="tableEdit">\n                <div class="table__header table__content-row" data-element="tableHeader">\n                    <div class="table__title table__header-title">Products</div>\n                    <div></div>\n                    <div class="table__icon table__header-icon">\n                        <img src="./assets/icons/handleAdd.svg" class="table__icon-img" data-element="handleAdd" alt="">\n                    </div>\n                </div>\n                <div class="table__content" data-element="tableContent">\n                   ${this.getTableHeader()}\n                   ${this.getTableBody(this.data)}\n                </div>\n            </div>`}remove(){this.element&&this.element.remove()}destroy(){this.remove(),this.element=null,this.subElements=null}}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}class o{constructor(){a(this,"subElements",{}),a(this,"components",{})}render(){const e=document.createElement("div");return e.innerHTML=this.getTemplate(),this.element=e.firstElementChild,this.subElements=this.getSubElements(),this.initComponents(),this.renderComponents(),this.element}initComponents(){const e=new r;this.components={table:e}}renderComponents(){Object.keys(this.components).forEach(e=>{console.log(e);const t=this.subElements[e],{element:n}=this.components[e];t.append(n)})}getSubElements(){const e=this.element.querySelectorAll("[data-element]");for(const t of e)this.subElements[t.dataset.element]=t;return this.subElements}removeEventListeners(){this.removeEventListeners()}remove(){this.element&&this.element.remove()}destroy(){this.remove(),this.element=null,this.subElements=null;for(const e of Object.values(this.components))e.destroy()}getTemplate(){return'\n        <div>\n        <div class="table" data-element="table">\n\n        </div>\n        </div>\n        '}}}}]);
//# sourceMappingURL=editor-index-js-856.js.map