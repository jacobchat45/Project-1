let notesInput = document.querySelector("#search-input")
let notesButton = document.querySelector("#search-button");
let inputResult;
let returnedData;
// this gets the value of what's submitted inside the form and then calls the getWeather function
  notesButton.addEventListener("click", function(event){
    event.preventDefault();
   inputResult = notesInput.value;
    console.log(inputResult); 
    // add call to add notes function here
  }
    
  )

