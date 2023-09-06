const txtInp = document.getElementById('txtInp')
const list  = document.getElementById('list')
const listCon  = document.getElementById('todoList')
const cancelBtn  = document.getElementById('cancelBtn')


const children = document.body.children


txtInp.addEventListener('keypress', (event)=>{
    if(event.key == 'Enter'){
        if(txtInp.value !== ''){
            addTodo(txtInp.value)
            txtInp.value = ''
        }
        
    }
})



function addTodo(value){
    const list = getList()
    const listObj = {
        id: Math.floor(Math.random() * 10000),
        content: value,
    }
    console.log(listObj)
    const listEl = createList(listObj.id, listObj.content)
    listCon.append(listEl)
    list.push(listObj)
    saveList(list)
    

}



function createList(id, content){
    const element = document.createElement('div')
    element.classList.add('list')
    const pEl = document.createElement('p')
    pEl.classList.add('listTxt')
    pEl.textContent = content
    const canBtn = document.createElement('button')  
    canBtn.classList.add('cancelBtn')
    canBtn.textContent = 'X'
    canBtn.addEventListener('click', () => {
        const warning  = confirm("Do you want the note deleted?")
        if(warning){
            deleteNote(id, element)
        }
    })
    element.append(pEl, canBtn)
    return element

}


function deleteNote(id, element){
    const list = getList()
    const target = list.filter(list => {
        list.id  === id
    })[0]
    const index = list.indexOf(target)
    list.splice(index, 1)
    saveList(list)
    listCon.removeChild(element)


}

function saveList(list){
    localStorage.setItem("todo-List", JSON.stringify(list))
}


getList().forEach(element => {
    const listEl = createList(element.id, element.content)
    listCon.append(listEl)

});




function getList(){
    return JSON.parse(localStorage.getItem("todo-List") || "[]")
}