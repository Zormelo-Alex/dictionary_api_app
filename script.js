console.log("dom")
//selectors
const result = document.getElementById("result");
const sound = document.getElementById("sound")
const btn = document.getElementById("btn")

window.addEventListener("keypress", (e) =>{
    if(e.key == "Enter"){
        search();
    }
})

const search = () => {
    let input = document.getElementById("word").value
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+input)
     .then( response => response.json() )
     .then(data => {
         result.innerHTML = `
         <div class="word">
            <h3>${input}</h3>
            <button class="play" onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>${data[0].phonetics[0].text}</p>
        </div>
        <div class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
        </div>
        <div class="word-examples">
            ${data[0].meanings[0].definitions[0].example || ""}
        </div>
         `
         sound.setAttribute("src", `${data[0].phonetics[0].audio || data[0].phonetics[1].audio}`)
         //console.log(data)
         console.log(sound)
     })
     .catch(err => {
        result.innerHTML = `<p class="word">sorry... could't find the word you entered</p>`
        //console.log(err.message)
    }); 
}

function playSound(){
    sound.play();
}


//events

btn.addEventListener("click", search)