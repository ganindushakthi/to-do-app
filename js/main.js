function initializeToolTips(){
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

initializeToolTips();

const btnAddElm = document.querySelector('#btn-add');
const txtTaskElm = document.querySelector('#txt-task');
let lastTaskId = 0;
let selectedTask = null;

class TaskItem {
    id;
    checked;
    #description;
    #liElm;

    get description(){
        return this.#description;
    }

    set description(value){
        this.#description = value;
        if (this.#liElm)
            this.#liElm.querySelector('label').innerText = value;
    }

    constructor(id, description, checked = false){
        this.id = id;
        this.checked = checked;
        this.description = description;
        this.#liElm = this.addItemToList();
        this.#liElm.querySelector(".delete").addEventListener('click', ()=>{
            this.#liElm.remove();
        });
        this.#liElm.querySelector(".edit").addEventListener('click', ()=>{
            txtTaskElm.value = this.description;
            btnAddElm.innerText = "UPDATE";
            txtTaskElm.focus();
            selectedTask = this;
        });
    }

    addItemToList(){
        const ulElm = document.querySelector("ul");
        const liElm = document.createElement('li');
        liElm.className = 'd-flex align-items-center justify-content-between py-2 px-3';
        liElm.innerHTML = `
            <div class="form-check">
                <input ${this.checked ? 'checked' : ''} 
                    class="form-check-input" type="checkbox" value="" id="chk-${this.id}">
                <label class="form-check-label" for="chk-${this.id}">
                    ${this.description}
                </label>
            </div>
            <div class="d-flex gap-3 fs-5">
                <i  data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    data-bs-title="Click to edit" 
                class="edit bi bi-pencil-fill"></i>
                <i data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    data-bs-title="Click to delete" 
                class="delete bi bi-trash-fill"></i>
            </div>          
        `;
        ulElm.prepend(liElm);
        // initializeToolTips();
        return liElm;
    }
}

btnAddElm.addEventListener('click', ()=> {
    const text = txtTaskElm.value.trim();
    if (text){
        if (selectedTask !== null){
            selectedTask.description = text;
            selectedTask = null;
            btnAddElm.innerText = "ADD";
        }else{
            new TaskItem(lastTaskId++, text);
        }
        txtTaskElm.value = '';
        txtTaskElm.focus();
    }else {
        txtTaskElm.focus();
        txtTaskElm.select();
    }
});

txtTaskElm.addEventListener('keypress', (e)=>{
    if (e.key === "Enter") btnAddElm.click();
});