const forms=document.getElementById('#todoApp');
const todoName=document.getElementById('#name');
const tdoDescription=document.getElementById('#description');
const pending=document.getElementById('#remaining');
const doing=document.getElementById('#todoDone');

function savetodos(event){
    event.preventDefault()
    const name=event.target.name.value;
    const description=event.target.description.value;

    const store={
        name,
        description,
        isDone : false
    };

    axios.post('https://crudcrud.com/api/374bb9d0a8c949f299226daef39e74a5/dataTodo',store)
    .then((res) =>display(res.data))
    .catch((err) => console.log(err))
    
    console.log(store.description)
}
function display(store){
    if(store.name === '' || store.description === ''){
        alert('Please enter all fields to save todo Data');
    }
    else{
        const parent=document.querySelector('#remaining');
        const childele=document.createElement('li');
        childele.innerText = store.name+" : "+store.description
        parent.appendChild(childele)

        const deletetodo=document.createElement('input');
        deletetodo.type='button'
        deletetodo.value='X'
        childele.appendChild(deletetodo);

        deletetodo.onclick= () =>{
            const id=store._id;
            axios.delete('https://crudcrud.com/api/374bb9d0a8c949f299226daef39e74a5/dataTodo/' +id )
            .catch((err) =>console.log(err))
            parent.removeChild(childele);
        }

        const doneButton=document.createElement('input');
        doneButton.type='button'
        doneButton.value='Done'
        childele.appendChild(doneButton);
        doneButton.onclick = () =>{
            const doneThings=document.querySelector('#todoDone')
            var id=store._id;
            axios.get('https://crudcrud.com/api/374bb9d0a8c949f299226daef39e74a5/dataTodo/'+id)
            .then((res) =>{
                for(let i=0;i<res.data.length;i++){
                    if(res.data[i].isDone === true){
                        res.data[i].appendChild(doneThings)
                    }
                }
            })
            .catch((err) => console.log(err))
        }
    }
}
window.addEventListener("DOMContentLoaded", () =>{
    axios.get('https://crudcrud.com/api/374bb9d0a8c949f299226daef39e74a5/dataTodo')
        .then((res) =>{
            for(let i=0;i<res.data.length;i++){
                display(res.data[i]);
            }
        })
        .catch((err) => console.log(err))
})