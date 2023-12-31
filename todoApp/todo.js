const forms=document.getElementById('todoApp');
const todoName=document.getElementById('name');
const tdoDescription=document.getElementById('description');
const pending=document.getElementById('remaining');
const doing=document.getElementById('todoDone');

function savetodos(event){
    event.preventDefault()
    const name=event.target.name.value;
    const description=event.target.description.value;
    const isDone=false;
    const store={
        name,
        description,
        isDone
    };

    axios.post('https://crudcrud.com/api/e80896a6d6384c3c9a7cea3052f6f02c/dataTodo',store)
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
            axios.delete('https://crudcrud.com/api/e80896a6d6384c3c9a7cea3052f6f02c/dataTodo/' +id )
            .catch((err) =>console.log(err))
            parent.removeChild(childele);
        }

        const doneButton=document.createElement('input');
        doneButton.type='button'
        doneButton.value='Done'
        childele.appendChild(doneButton);
        doneButton.onclick = () =>{
            const doneThings=document.querySelector('#todoDone')
            //This is to display when the todo is done
            parent.removeChild(childele);
            const doneOne=document.createElement('li');
            doneOne.textContent = `${store.name} - ${store.description}`;
            doneThings.appendChild(doneOne)
            const id=store._id;
            axios.
                put(`https://crudcrud.com/api/e80896a6d6384c3c9a7cea3052f6f02c/dataTodo/${id}`,
                { 
                    isDone: true,
                    name: store.name,
                    description: store.description,
                })
                .then((res) =>console.log(res))
        }
    }
}
window.addEventListener("DOMContentLoaded", () =>{
    axios.get('https://crudcrud.com/api/e80896a6d6384c3c9a7cea3052f6f02c/dataTodo')
        .then((res) =>{
            for(let i=0;i<res.data.length;i++){
                if(res.data[i].isDone === true){
                    displayDone(res.data[i])
                }
                else{
                    display(res.data[i]);
                }
            }
        })
        .catch((err) => console.log(err))
})
function displayDone(afterTodoDone) {
    const doneOne = document.createElement('li');
    const doneThings=document.querySelector('#todoDone')
    doneOne.textContent = `${afterTodoDone.name} - ${afterTodoDone.description}`;
    doneThings.appendChild(doneOne);
}
