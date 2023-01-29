import {v4 as uuidV4} from 'uuid'
// console.log(uuidV4());
type Item = {
  id : string,
  title : string,
  isComplete : boolean,
  createdAt : Date
}
const list = document.getElementById('list') as HTMLUListElement | null
const input = document.getElementById('newItem-title') as HTMLInputElement | null
const form = document.getElementById('newItem-form') as HTMLFormElement | null

let List : Item[] = loadTasks()
List.forEach(addToList)
form?.addEventListener('submit', e => {
  e.preventDefault()
     
  if(input?.value == '' || input?.value == null) return

  const newItem : Item = {
    id : uuidV4(),
    title : input?.value,
    isComplete : false,
    createdAt : new Date()
  }
  List.push(newItem)
  addToList(newItem)
  saveItems()
  input.value = ""
})

function addToList(item : Item) : boolean{
  const listItem = document.createElement('li')
  listItem.setAttribute('style','margin:0.5rem;')
  listItem.setAttribute('id',item.id)
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  const itemBox = document.createElement('div')
  const deleteButton = document.createElement('button')
  deleteButton.append('delete')
  deleteButton.setAttribute('id',item.id)
  deleteButton.addEventListener('click',(e : Event)=>{
      let button = e.target as HTMLButtonElement
      let id =  button.id
      
    List = List.filter((i)=> i.id !== id)
    let li = document.getElementById(id)
    if(li){
      li.remove()
    }    
    saveItems()
  })
  checkbox.addEventListener('change', ()=>{
    item.isComplete = checkbox.checked
    saveItems()
  })
  checkbox.type = 'checkbox'
  checkbox.checked = item.isComplete
  label.append(checkbox,item.title)
  itemBox.append(label,deleteButton)
  itemBox.setAttribute('style','display:flex; flex-direction: row; justify-content: space-between;')
  listItem.append(itemBox)
  list?.append(listItem)
  return true
}

function saveItems(){
  localStorage.setItem('List', JSON.stringify(List))
}

function loadTasks() : Item[]{
const listJson = localStorage.getItem('List')
if(listJson == null) return []
return JSON.parse(listJson)
}