let notesInput = document.querySelector("#search-input")
let notesButton = document.querySelector("#search-button");
let notesBody = document.querySelector("#history");
let clearNotes = document.querySelector("#clear-button");
let inputResult;
let returnedData;
let notes = [];

function init(){  
  let storedNotes = JSON.parse(localStorage.getItem("notes"));
  if(storedNotes !== null){
    notes = storedNotes;
  };

  renderStoredNotes(this);
}

init();
// this gets the value of what's submitted inside the form and then calls the getWeather function
  notesButton.addEventListener("click", function(event){
    event.preventDefault();
   inputResult = notesInput.value;
    console.log(inputResult); 
    addNotes(inputResult);
    notes.push(inputResult);
  }
    
  )
// let notesClicked = false;
// clearNotes.addEventListener("click", function(event){
//   event.preventDefault();
//    if(notesClicked === false){
//     notesClicked = true;
//      notesBody.remove();
//    }
//    else{
//     notesClicked = false;
//     addNotes();
//    }
   
   
// });

function noteFunctionality(note){
      let clearButton = document.createElement("button");
      clearButton.setAttribute("type", "submit");
      clearButton.setAttribute("class", "btn remove-button");
      clearButton.innerHTML = "X"

         clearButton.addEventListener("click", function(event){
           event.preventDefault();
        this.parentElement.remove();
        let element = event.target;
        let index = element.parentElement.getAttribute("added-note");
        notes.splice(index, 1);
        saveNotes();
        renderStoredNotes();
      });
      note.append(clearButton);

      let saveButton = document.createElement("button");
      saveButton.setAttribute("type", "submit");
      saveButton.setAttribute("class", "btn save-button");
      saveButton.innerHTML = "save";

      saveButton.addEventListener("click", function(event){
            saveNotes(note);
      });

      note.append(saveButton);
}

function saveNotes(){
  localStorage.setItem("notes", JSON.stringify(notes));
}
function addNotes(input){
  let newNote = document.createElement("div");
  newNote.setAttribute("class", "added-note");
  
  newNote.innerHTML = input;
  notesBody.append(newNote);
  noteFunctionality(newNote);
  
}

function setNoteStorage(note){

}

function renderStoredNotes(){


  for(let i = 0; i < notes.length; i++){
    let note = notes[i];
    let newNote = document.createElement("div");
    newNote.setAttribute("class", "added-note");
    newNote.innerHTML = note;
    notesBody.append(newNote);
    noteFunctionality(newNote);
  }
}
