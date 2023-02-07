// JAVASCRIPT FOR NOTES

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

  notesButton.addEventListener("click", function(event){
    event.preventDefault();
   inputResult = notesInput.value;
    console.log(inputResult); 
    addNotes(inputResult);
    notes.push(inputResult);
  }
    
  )


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


// END NOTES JAVASCRIPT

////////////////////////////////////////////////////////////////////////////////////////////////////



// "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchResult}&format=json"

const wikiSearchInput = document.querySelector("#search-input-wiki");
const wikiSearchButton = document.querySelector("#search-wiki");

wikiSearchButton.addEventListener("click", function(event){
  event.preventDefault();
  let searchValue = wikiSearchInput.value;
  console.log(searchValue);
   
  let queryURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" + searchValue;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
      let topResult = response.query.search[0];
      console.log(topResult);
      let resultsBody = document.querySelector("#history-wiki");
      let resultsText = document.createElement("div");
      resultsText.innerHTML = topResult.title;
      resultsBody.append(resultsText);
// example url with returned json results: 
// https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=ronaldo&format=json
// use to analyse structure of returned results
    })
   }
);