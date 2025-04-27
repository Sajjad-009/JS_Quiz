import { pageChanger,CheckAnswer,changeLevel,navigation,optionsArray,submitFunc,addZero } from "./util.js";
import { allQuestions } from "./storage.js";


export let question = document.getElementById("question");
export let Qnumber = document.getElementById("Qnumber");

export let timerId = null ;

export let optionFunction ;




document.querySelector("#startbtn").addEventListener("click", () => {

// hiding start button & bolding basic ==================================

  document.querySelector("#startBtnContaine").style.display = "none"
  document.getElementById('basicQuizQuestions').style.fontWeight = 'bolder'

// making all question and options = 1 ===========================

  question.textContent = allQuestions.basicQuizQuestions.question1.question;
  Qnumber.textContent = allQuestions.basicQuizQuestions.question1.id;

  optionsArray.forEach(opt => {
      document.getElementById(opt).textContent = allQuestions.basicQuizQuestions.question1.options[opt];

  });

  // timer ===========================


    let secondes = 60 ;
    let minuates = 19 ;
  timerId = setInterval(()=>{
secondes--;

if(secondes < 0){
    secondes = 60 ;
    minuates--;
}

document.querySelector('#seconds').textContent = addZero(secondes);
document.querySelector('#minuates').textContent = addZero(minuates);

    if(minuates == 0 && secondes == 0){
        clearInterval(timerId);
      document.getElementById('OptionContainer').removeEventListener('click',optionFunction);
      document.getElementById('timerLabel').textContent = 'Time out' ;
        submitFunc();
    }

  },1000)
});


document.getElementById("OptionContainer").addEventListener('click', optionFunction =  (event)=>{




  //  answer checking  options==================================
    let catchAnswer = event.target.id;
    
    if(event.target.className == 'optbutton'){
      
      CheckAnswer(catchAnswer.replace('r',''));
    
  }
})


document.querySelector('.level-buttons').addEventListener('click',(event)=>{




  // level changing=================================
    let levelName = event.target.id;
if(levelName){

  changeLevel(levelName);
}
   

    
})



document.getElementById("pageControler").addEventListener("click", (event) => {


// Next and previouse==============================
  let sendbtnId = event.target.id;

  pageChanger(sendbtnId);
});





document.getElementById('questionNumbers').addEventListener('click', (event)=>{


  // jumping buttons============================
let takeButtonId = event.target.id;


if(event.target.className == 'buttons'){
navigation(takeButtonId);
}
})


document.getElementById('submit').addEventListener('click',()=>{

  // submiting ==========================
  submitFunc();
})




document.getElementById('navigate').addEventListener('click',()=>{

 document.getElementsByClassName('aside')[0].classList.toggle('Show')
})