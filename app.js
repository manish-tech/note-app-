let addBtn = document.querySelector("#addBtn");

showNotes()

//if user add a note,store it in localstorage
addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let addText = document.querySelector("#addTxt");
    let addTitle = document.querySelector("#addTitle");

    //All different Notes,stored in a array
    let notesCollection = localStorage.getItem("notes");
    let notesCollectionTitles = localStorage.getItem("titles");
    if (notesCollection === null) {
        notesObj = [];
    }
    else {
        //returns array object(array of myObj)
        notesObj = JSON.parse(notesCollection);
    }

    let myObj = {
        text:addText.value,
        title:addTitle.value
    }



    //push new Note to arrary
    notesObj.push(myObj);
    //whole set of notes is stored in localStorage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addTitle.value = "";
    showNotes();
})

//this function fetches data from localStorage and displays it
function showNotes() {
    let notesCollection = localStorage.getItem("notes");
    

    if (notesCollection === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesCollection);
        
    }

    let html = ``;
    let notes = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesObj.forEach(function (ele,index) {

            html += `<div class="noteCard card my-2 mx-3" style="width: 18rem;" >
        <div class ="card-body" >
            <h5 class="card-title"><strong>${ele.title}</strong> </h5>
            <hr>

            <p class="card-text">${ele.text}</p>
            <button id = "${index}" onClick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
                </div>`

                

        });
        
    }
    else{
        notes.innerHTML = "Enter a Note";
    }
    
    notes.innerHTML = html;
    // let notesChildren = notes.children;
    // // console.log(notesChildren[0]);

    // if (notesCollection.length != 0) {
    //     notesObj.forEach(function (ele, index) {
    //         let textNode = document.createTextNode(ele);
    //         notesChildren[index].children[1].appendChild(textNode);    
    //     })
    // }
}

//delete a note data in localStorage due to onclick 
function deleteNote(index){
    let notesCollection = localStorage.getItem("notes");
    
    if(notesCollection === null){
        notesObj = [];
        
    } 
    else{
        notesObj = JSON.parse(notesCollection);
        
    }
    notesObj.splice(index,1);
    
    localStorage.setItem("notes",JSON.stringify(notesObj));
    
    showNotes();
}

//search functionality , considering all cards paragraph

let searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input",function (){
    
    let inputValue = searchBar.value;
    
    let allCards = document.querySelectorAll(".noteCard");
    console.log(allCards);
    Array.from(allCards).forEach(function(element){
        let text = element.getElementsByTagName("p")[0].innerText;
        if(text.includes(inputValue)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})

