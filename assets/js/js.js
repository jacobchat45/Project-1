// JAVASCRIPT FOR NOTES

let notesInput = document.querySelector("#search-input")
let notesButton = document.querySelector("#search-button");
let notesBody = document.querySelector("#history");
let clearNotes = document.querySelector("#clear-button");
let notificationEl = document.querySelector("#notification-amount")
let inputResult;
let returnedData;
let notes = [];

function init(){  
  let storedNotes = JSON.parse(localStorage.getItem("notes"));
  if(storedNotes !== null){
    notes = storedNotes;
  };

  renderStoredNotes(this);
  notification()
}

init();

  notesButton.addEventListener("click", function(event){
    event.preventDefault();
   inputResult = notesInput.value;
    console.log(inputResult); 
    addNotes(inputResult);
    notes.push(inputResult);
    notification();
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
        notification()
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
  notification();
}
function addNotes(input){
  let newNote = document.createElement("div");
  newNote.setAttribute("class", "added-note");
  
  newNote.innerHTML = input;
  notesBody.append(newNote);
  noteFunctionality(newNote);

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
      let newResult = document.createElement("div");

      let resultsText = document.createElement("div");
      resultsText.innerHTML = topResult.title;
      let titleURL = "https://en.wikipedia.org/wiki/" + topResult.title;
      newResult.append(resultsText);
   
      let resultsMain = document.createElement("div");
      resultsMain.innerHTML = topResult.snippet + "...";
      newResult.append(resultsMain);
      let linkHolder = document.createElement("a");
      linkHolder.setAttribute("href", titleURL);
      linkHolder.setAttribute("id", "wikipedia-link");
      linkHolder.setAttribute("target", "_blank");
      linkHolder.innerHTML = "Click to read more...";
      newResult.append(linkHolder);
      resultsBody.setAttribute("class", "wiki-item");
    resultsBody.prepend(newResult);
// example url with returned json results: 
// https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=ronaldo&format=json
// use to analyse structure of returned results

    })
   }
);
// Calender API
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
  });
  calendar.render();
});

// Notification Bell
function notification (){
  let notes= JSON.parse(localStorage.getItem("notes"))
  if(!notes){
    return
  }
  notificationEl.innerHTML = notes.length
}
notification()