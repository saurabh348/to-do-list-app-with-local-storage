const itemsArray = localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):[]

function displayDate() {
    let date = new Date();
    date = date.toDateString().split(" ");
    console.log(date)
    document.querySelector('#date').innerHTML = "Date: " + date[1] + " " + date[2] + " " + date[3]
}
function createItem(input) {
    console.log("Input Length ",input.value.length)
    if(input.length!=0){
        itemsArray.push(input.value);
    input.value="";
    localStorage.setItem("items", JSON.stringify(itemsArray));
    }
    else{
        alert("Empty String not allowed")
    }
    
    
    
}
function deleteItem(i){
    itemsArray.splice(i,1);
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload();

        
}
function activateDeleteListeners(){

    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i)=>{
        db.addEventListener('click', ()=>{
            deleteItem(i)

        })
        
    })

    
}


function activateEditListeners(){
    let editBtn = document.querySelectorAll(".editBtn");
    let updateController = document.querySelectorAll(".update-controller");
    let inputs = document.querySelectorAll(".input-controller textarea");
    editBtn.forEach((eb, i)=>{

        eb.addEventListener('click', ()=>{
            updateController[i].style.display = 'block'; 
            inputs[i].disabled = false;
            
        })
    })

}

function updateItem( item ,i){
    itemsArray[i] = item;
    localStorage.setItem("items", JSON.stringify(itemsArray))
    // inputs[i].disabled = true;
    location.reload();   

}
function activateSaveListeners(){
    let saveBtn = document.querySelectorAll(".saveBtn");
    let inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb, i)=>{
        sb.addEventListener("click", ()=>{
                updateItem(inputs[i].value, i ) ;     

        })
    })

}


function cancelItem(){
    // location.reload()  ===> does not work
 



}
function activateCancelListeners(){
    let updateController = document.querySelectorAll(".update-controller");
    let item = document.querySelectorAll(".item")
    let inputs = document.querySelectorAll(".input-controller textarea");
    let cancelBtn = document.querySelectorAll(".cancelBtn");

    cancelBtn.forEach((cb,i)=>{
        cb.addEventListener("click",()=>{
            inputs[i].disabled= true;
   
            updateController[i].style.display = "none"
            item[i].reload();  //working but throwing error
            
        
        })
    })


}
function displayItems(){
    let items =""
   
    console.log("inside display item",itemsArray)
    for(let i=0;i<itemsArray.length;i++){
        console.log("during iteratin: ", itemsArray)
        items += `
    <div class="item">
    <div class="input-controller"> 
    <textarea disabled>${itemsArray[i]}</textarea>
         <div class="edit-controller">
             <i class="fa-solid fa-check deleteBtn"></i>
             <i class="fa-solid fa-pen-to-square editBtn"></i>
         </div>
     </div>

    <div class="update-controller">
        <button class="saveBtn"> Save </button>
        <button class="cancelBtn"> Cancel </button>
    </div > 
    </div>
    ` 
    }


    document.querySelector(".to-do-list").innerHTML = items
    activateDeleteListeners();
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}

let enter = document.querySelector("#enter")
enter.addEventListener("click", function () {
    let input = document.querySelector("#input");
    createItem(input)
    location.reload()
    
})






window.onload = function() {
    displayDate();
    displayItems();
}