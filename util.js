import { question, Qnumber, optionFunction, timerId } from "./main.js";
import { allQuestions } from "./storage.js";

export let optionsArray = ["a", "b", "c", "d"]; //
let SubmitChecker = "not_Called";
let Level_Array = [
  "basicQuizQuestions",
  "intermediateQuizQuestions",
  "advancedQuizQuestions",
]; //
let difficultyLevel = "basicQuizQuestions";


export function addZero(getIt) {
  let store = getIt < 10 ? "0" + getIt : getIt;
  return store;
}


function correctAnswerGreen(){
  if(SubmitChecker == 'called'){

    let currentQuestionNumber = 'question' + parseInt(Qnumber.textContent); 
  let correctAnswer = allQuestions[difficultyLevel][currentQuestionNumber].correctAnswer;   
  
optionsArray.forEach(opt => {
  document.getElementById(opt).style.color='black';
})


  document.getElementById(correctAnswer).style.color = 'green'
  }

}




function checkUserAnswer(){
  let WholeAddress = ''
 
    
    let currentQuestionNumber = 'question'+ parseInt(Qnumber.textContent);
    
     WholeAddress =allQuestions[difficultyLevel][currentQuestionNumber].userAnswer ;

     
     if(WholeAddress != ''){
       document.getElementById('r'+WholeAddress).checked = true ;
       
    
    }
  

}











function untickRadios() {
  document.querySelectorAll(".optbutton").forEach((untick) => {
    untick.checked = false;
    //    function for unticking all radio after changing questions ;
  });
}















export function changeLevel(takeId) {
  difficultyLevel = takeId || "basicQuizQuestions";

  Qnumber.textContent = 1;
  question.textContent = allQuestions[difficultyLevel].question1.question;

  // just updating question to qu 1

  optionsArray.forEach((updateOpt) => {
    document.getElementById(updateOpt).textContent =
      allQuestions[difficultyLevel].question1.options[updateOpt];
  });
  // just updating options to qu 1

  Level_Array.forEach((normalIt) => {
    document.getElementById(normalIt).style.fontWeight = "normal";
    // this function for removing fontWeight from all elements
  });

  document.getElementById(takeId).style.fontWeight = "bolder";
  // and just make bolder to clicked Elements

  untickRadios();
  checkUserAnswer()
  correctAnswerGreen()
  if (SubmitChecker == "called") {
    submitFunc();
  }
}






















export function pageChanger(getbtnid) {
  // this function is based on current Q number

  let increaseQnumber = parseInt(Qnumber.textContent); // in this line we are retriving current q number
  let questionChange = "";
  if (getbtnid == "Next") {
    if (increaseQnumber <= 30) {
      if (increaseQnumber >= 30) {
        increaseQnumber = 0;
      }
      increaseQnumber++;
      Qnumber.textContent = increaseQnumber;
      
      questionChange = "question" + increaseQnumber;

      question.textContent =
        allQuestions[difficultyLevel][questionChange].question;

      optionsArray.forEach((updateOpt) => {
        document.getElementById(updateOpt).textContent =
          allQuestions[difficultyLevel][questionChange].options[updateOpt];
          untickRadios();
      checkUserAnswer()
      correctAnswerGreen()

      });

    }
  } else if (getbtnid == "previous") {
    if (increaseQnumber >= 1) {
      // decrease by 1 even if it is 1 wich make increamentQnumber 0

      if (increaseQnumber <= 1) {
        // and if we use only < then it will go out of its range

        increaseQnumber = 31; // 31 because we are imediatlly decreasing it it will become 30
      }

      increaseQnumber--;

      Qnumber.textContent = increaseQnumber;

      questionChange = "question" + increaseQnumber;

      question.textContent =
        allQuestions[difficultyLevel][questionChange].question;

      optionsArray.forEach((updateOpt) => {
        document.getElementById(updateOpt).textContent =
          allQuestions[difficultyLevel][questionChange].options[updateOpt];
      });
      untickRadios();
      checkUserAnswer()
      correctAnswerGreen()
    }
  }
}










export function navigation(buttonId) {
  // not based on current question it random

  let QuestionNumber = "question" + parseInt(buttonId.replace("btn", ""));

  Qnumber.textContent = buttonId.replace("btn", "");
  question.textContent = allQuestions[difficultyLevel][QuestionNumber].question;

  optionsArray.forEach((options) => {
    document.getElementById(options).textContent =
      allQuestions[difficultyLevel][QuestionNumber].options[options];
  });

  untickRadios();
  checkUserAnswer()
  correctAnswerGreen()
}












export function CheckAnswer(answerId) {
  let qnum = "question" + parseInt(Qnumber.textContent); // curent qnumber based

  allQuestions[difficultyLevel][qnum].userAnswer = answerId; // pushing selected value in userAnswer object ;
}














export function submitFunc() {
  SubmitChecker = "called";

  let Attempted = 0;
  let correct = 0;
  let wrong = 0;

  document
    .getElementById("OptionContainer")
    .removeEventListener("click", optionFunction); // stop listening clicks on options

  clearInterval(timerId); // stop timer

  document.getElementById("timerLabel").style.animation =
    "blink 2s infinite ease-in-out"; // apply blinking effect

  for (let i = 1; i <= 30; i++) {
    let currentQuestion = allQuestions[difficultyLevel]["question" + i]; // made it shorter adding whole address into currentQuestion GPT
    let ButtonsColorChange = document.getElementById(
      "btn" + currentQuestion.id
    );
    // let ButtonsColorChange = document.getElementById("btn" + currentQuestion.id);

    function updatecss(bgcolor, borderColor) {
      // using function instead of repeating same things  for changing buttons bgcolor and border
      ButtonsColorChange.style.backgroundColor = bgcolor;
      ButtonsColorChange.style.border = "2px solid " + borderColor;
      ButtonsColorChange.style.fontWeight = "bolder";
      ButtonsColorChange.style.color = borderColor;
    }

    if (currentQuestion.userAnswer == "") {
      Attempted++;

      updatecss("rgb(214, 214, 214)", "gray");
    } else if (currentQuestion.userAnswer == currentQuestion.correctAnswer) {
      correct++;
      updatecss("rgb(171, 241, 171)", "green");
    } else if (currentQuestion.userAnswer != currentQuestion.correctAnswer) {
      wrong++;

      updatecss("rgb(245, 148, 148)", "red");
    }
  }

  let NotAttempted = 30 - Attempted;

  
  document.getElementById("wrongAnswers").textContent = addZero(wrong);
  document.getElementById("correctAnswers").textContent = addZero(correct);
  document.getElementById("attemepedAnswers").textContent = addZero(NotAttempted);

  correctAnswerGreen()
}
