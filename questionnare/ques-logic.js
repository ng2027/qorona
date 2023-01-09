function onYesClick() {
    // when yes button clicked to begin questionnaire, start modifying classes to begin animations
    document.getElementById("main-container").style.display="none";
    const question1 = document.getElementById("question1")
    question1.classList.add("slide-down-class")
    question1.style.top = "18%";
}

function onNoClick() {
    // when no button clicked to begin questionnaire, redirect back to index.html

    window.location.href="../index.html"
}

// function takes a "max" parameter and generates a random integer from 1 to that number
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // function parses input data and extracts necessary information once form is submitted
  function getFormValues() {
    var age = document.getElementById("age").value;
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value;
    var question2Elements = [
        "YesButton",
        "NoButton",
        "NotSureButton"
    ]
    for (i=0; i<3; i++) {
        var values = document.getElementById(question2Elements[i]).checked;
        // check which box is checked, store as answer
        if (values) {
            var question2Choice = document.getElementById(question2Elements[i]).value
        }
    }

    var experiences = document.querySelectorAll('input[type="checkbox"]');
    var experiences1 = [
        ["fever-chills", null],    
        ["cough", null],
        ["breath-short", null],
        ["breathing-difficulty", null],
        ["tiredness", null],
        ["aches", null],
        ["headaches", null],
        ["tasteSmell", null],
        ["throat", null],
        ["chest-pain", null]
    ]

    for (i=0; i<10; i++) {
        if (experiences[i].checked) {   
            experiences1[i][1] = true;
        }
    }
    var question4Elements = [
        "YesButton2",
        "NoButton2"
    ]
    for (i=0; i<2; i++) {
        var values = document.getElementById(question4Elements[i]).checked;
        if (values) {
            var question4Choice = document.getElementById(question4Elements[i]).value
        }
    }

    var sicknesses = String(document.getElementById("sicknesses").value);
    var info = [age, weight, height, question2Choice, experiences1, question4Choice, sicknesses]
    var percentage = calculatePercentage(info); // get percentage
    percentage *= 100
    return percentage 


}
function displayNewQuestion(questionid) {
    // this function manages the displaying of new questions once the right arrow is clicked. it handles the necessary class modifications in order to animate the new question into the correct position and remove the old one
    document.getElementById(questionid).classList.add("slide-left-class")

    // get next question, remove and add classes
    document.getElementById(`question${parseInt(questionid[questionid.length - 1]) + 1}`).classList.remove("slide-up-class")
    document.getElementById(`question${parseInt(questionid[questionid.length - 1]) + 1}`).classList.add("slide-down-class")
    document.getElementById(`question${parseInt(questionid[questionid.length - 1]) + 1}`).style.top="18%"
    if (questionid == "question5") {
        // if last question, display an animation - mostly to create suspense
        setTimeout(() => document.getElementById("dot1").style.display = "inline", 1500)
        setTimeout(() => document.getElementById("dot2").style.display = "inline", 2500)
        setTimeout(() => document.getElementById("dot3").style.display = "inline", 3500)
        setTimeout(() => document.getElementById("results-div").style.display="none", 4000)
        setTimeout(function() {
            var probability = getFormValues()
            document.getElementById("probability").innerText= probability.toFixed(1) + "%" // round probability to one decimal place
            document.getElementById("probability-result").style.display="inline";
            if (probability >= 60) {
                document.getElementById("request-a-test").style.display="inline";
                document.getElementById("probability").style.color="red";   
                // display probability as red if probability greater than or equal to 60%

            }
            else {
                document.getElementById("request-a-test1").style.display="inline";
                document.getElementById("probability").style.color="green";
                // display probability as green if probability is less than 60%

            }
        }, 5000)

    }
    // below lines manage the animation of the progress bar on the bottom of the webpage
    document.getElementById(`gb${parseInt(questionid[questionid.length - 1])}`).classList.add("slide-gb-up") 
    setTimeout(() =>  document.getElementById(`gb${parseInt(questionid[questionid.length - 1])}`).classList.remove("slide-gb-down"), 500)
}


function displayPreviousQuestion(questionid) {
    // this function manages the events and animations that occur should the user choose to return to previous questions
        document.getElementById(questionid).classList.add("slide-up-class") 
        document.getElementById(`question${parseInt(questionid[questionid.length - 1]) + 1}`).style.top="-70%" 
        // document.getElementById(questionid).style.top="-70%" 

        setTimeout(() => document.getElementById(`question${parseInt(questionid[questionid.length - 1]) + 1}`).classList.remove("slide-up-class"), 500)
        document.getElementById(`question${parseInt(questionid[questionid.length - 1]) - 1}`).classList.add("slide-right-class")
        setTimeout(() => document.getElementById(questionid).classList.remove("slide-down-class"), 500)
        setTimeout(() => document.getElementById(`question${parseInt(questionid[questionid.length - 1]) - 1}`).classList.remove("slide-left-class"), 500)
        // setTimeout(() => document.getElementById(`question${parseInt(questionid[questionid.length - 1]) - 1}`).classList.remove("slide-right-class"), 500)
        setTimeout(() =>  document.getElementById(`gb${parseInt(questionid[questionid.length - 1]) - 1}`).classList.add("slide-gb-down"), 500)
        setTimeout(() =>  document.getElementById(`gb${parseInt(questionid[questionid.length - 1]) - 1}`).classList.remove("slide-gb-up"), 500)
        setTimeout(() =>  document.getElementById(`gb${parseInt(questionid[questionid.length - 1]) - 1}`).style.top="100%")
    }


function calculatePercentage(information) {
    // this function calculates the percentage probability by setting weighed values to each answer given to it by the user.
    // these values are not random. scientific research has been done to decide on these values.
    // the form is designed not to give too high of a percentage - it is not meant to be a decisive way for the user 
    // to determine if they have COVID-19. it is only meant to be used as a guide

    // future plans: 
    // as more people use Qorona, artificial intelligence can be applied here such that the website can determine the weighed values on its own/
    var percentageMultiplier = 0
    if ((0 <= information[0]) && (information[0] <= 4)) {
        percentageMultiplier += 0.0213
        console.log("added 0.0213 - age 0-4")
    }
    else if ((18 < information[0]) && (information[0] <= 29)) {
        percentageMultiplier += 0.0638
        console.log("added 0.0639 - age 18-29")

    }
    else if (information[0] >= 29) {
        percentageMultiplier += 0.0426
        console.log("added 0.0426 - age >= 29")

    }

    if (information[1] > 100) {
        percentageMultiplier += 0.0213
        console.log("added 0.0213 - weight > 100")

    }
    if (information[3].toLowerCase() == "yes") {
        percentageMultiplier += 0.0638
        console.log("added 0.0638 - 6 feet contact")

    }
    var allTrue = [];
    console.log(information[4])
    for (i in information[4]) {
        console.log("running information4 loop")
        if (information[4][i][1] == true) {
            allTrue.push(information[4][i][0])
        }
    }
    for (b in allTrue) {
        console.log(allTrue)
        if (allTrue[b] == "fever-chills") {
            percentageMultiplier += 0.0346
            console.log("added 0.0346 - fever and chills")

        }
        else if (allTrue[b] == "cough") {
            percentageMultiplier += 0.0488
            console.log("added 0.0488 - cough")

        }
        else if (allTrue[b] == "breath-short") {
            percentageMultiplier += 0.02596
            console.log("added 0.02596 - breath short")

        }
        else if (allTrue[b] == "breathing-difficulty") {
            percentageMultiplier += 0.02596
            console.log("added 0.02596 - breath difficult")

        }
        else if (allTrue[b] == "tiredness") { 
            percentageMultiplier += 0.0191
            console.log("added 0.0191 - tiredness")

        }
        else if (allTrue[b] == "aches") {
            percentageMultiplier += 0.0694
            console.log("added 0.0694 - muscle saches")

        }
        else if (allTrue[b] == "headache") {
            percentageMultiplier += 0.01745
            console.log("added 0.01745 - headache")

        } 
        else if (allTrue[b] == "tasteSmell") {
            percentageMultiplier += 0.2038
            console.log("added 0.2038 - taste smell")

        }
        else if (allTrue[b] == "throat") {
            percentageMultiplier += 0.01745
            console.log("added 0.01745 - throat")

        }
        else if (allTrue[b] == "chest-pain") {
            percentageMultiplier += 0.0086
            console.log("added 0.0086 - chest pain")
        }
    }

    if ("fever-chills" in allTrue && "cough" in allTrue) {
        percentageMultiplier += 0.2694
        console.log("added 0.2694 - fever chills and cough")

    }
    

    if (information[5] == "yes") { 
        percentageMultiplier += 0.1
        console.log("added 0.1 - some nasal shit")

    }


    if (information[6].includes("cancer")) {
        percentageMultiplier += 0.05
        console.log("added 0.05 - cancer")

    }
    if (information[6].includes("diabetes") && information[6].includes("type") && information[6].includes("2")) {
        percentageMultiplier += 0.05
        console.log("added 0.05 - diabetes")

    }
    if (information[6].includes("liver")) {
        percentageMultiplier += 0.05
        console.log("added 0.05 - liver")

    }

    if ((information[6].includes("cystic")) && (information[6].includes("fibrosis"))) {
        percentageMultiplier += 0.05
        console.log("added 0.05 - cystic")

    }
    return percentageMultiplier
}


