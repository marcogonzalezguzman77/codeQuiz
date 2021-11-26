
//question objects 1,2,3,4,5
var question1= {
    sentence: "What is the structure of a function in javascript?",
    answer1: "function(var){  };",
    answer2: "funcion{    }(var);",
    answer3: "{function(var)};",
    answer4: "(function{var});",
    correctAnswer: 1
};

var question2= {
    sentence: "What is the meaning of CSS?",
    answer1: "Code Cascade Style",
    answer2: "Code Style Sheets",
    answer3: "Colors Code Style",
    answer4: "Code Comun Style",
    correctAnswer: 2
};

var question3= {
    sentence: "Which special character do we use to make comments in CSS?",
    answer1: "// comments //",
    answer2: "<!-- comments -->",
    answer3: "/* comments */",
    answer4: "# comments #",
    correctAnswer: 3
};

var question4= {
    sentence: "Which of the next code do we use to write a paragraph on HTML",
    answer1: "<para> paragraph </para>",
    answer2: "<pa> paragraph </pa>",
    answer3: "<b> paragraph </b>",
    answer4: "<p> paragraph </p>",
    correctAnswer: 4
};

var question5= {
    sentence: "Which of the next answers its a correct syntax of an Array on Javascript?",
    answer1: "var cars = ['Saab', 'Volvo', 'BMW']",
    answer2: "var cars = [Saab, Volvo, BMW]",
    answer3: "var cars = ['Saab'; 'Volvo'; 'BMW']",
    answer4: "var cars = ('Saab', 'Volvo', 'BMW')",
    correctAnswer: 1
};

var question6= {
  sentence: "What is the meaning of the word HTML?",
  answer1: "Highlevel Text Markup Lenguaje",
  answer2: "Hypertextual Markup Lenguaje",
  answer3: "Hypertext Markup Lenguaje",
  answer4: "Highlevel Textual Markup Lenguaje",
  correctAnswer: 3
};

var question7= {
  sentence: "Next sintax is an CSS element selector",
  answer1: "p { text-align:center }",
  answer2: ".p { text-align:center }",
  answer3: "#p { text-align:center }",
  answer4: "*p { text-align:center }",
  correctAnswer: 1
};

var question8= {
  sentence: "Right syntax of an object in Javascript",
  answer1: "const person = [firstName:'John', lastName:'Doe'];",
  answer2: "const person = {firstName:'John', lastName:'Doe'};",
  answer3: "const person = (firstName:'John', lastName:'Doe');",
  answer4: "const person = {firstName:'John'; lastName:'Doe'};",
  correctAnswer: 2
};


//section div selection
var questionsSection = document.querySelector("#questions-Section");
var highScoreSection = document.querySelector("#highScore-Section");

//var answerList = document.querySelector("#answer-list");

var questionLength = 8; //Quantity of questions
var score = 0; //variable use it for final Score
var correctAnswers = 0; //Correct Answers
var secondsLeftQuiz = 10*questionLength; //Time of the quiz (10 seconds per question)
var restTime = 5; //Rest 5 second per wrong question
var quizHighScores = [];

// TODO: What is the purpose of this function?
function renderQuestions() {
    // TODO: Describe the functionality of the following two lines of code.
    
    //Initiate the time Quiz
    setTimeQuiz();

    //var incorrectAnwers = 0;
    //Delete the Question Card div
    questionsSection.innerHTML = "";
    
    for (var n = 1; n <=questionLength ; n++) {      
      //n is the number of the questions

      //Creat 5 questions divs for card questions
      var questionCardDiv = document.createElement("div");
      questionCardDiv.setAttribute("id","question-Card-"+n);
      questionCardDiv.setAttribute("class",'card');
      questionCardDiv.setAttribute("style",'display: none'); //hide all the divs
      questionsSection.appendChild(questionCardDiv);

      //Create a paragraph with the question
      var p = document.createElement("p");
      p.innerHTML = "<span>"+eval('question'+n+'.sentence')+"<span>";   
      p.setAttribute("data-index-p", n);
      //p.setAttribute("style", 'display:none;');
      questionCardDiv.appendChild(p);
      
      //Create a 'ul' element for the answers list
      var ul = document.createElement("ul");      
      ul.setAttribute("data-index-q", n);
      //p.setAttribute("style", 'display:none;');
      questionCardDiv.appendChild(ul);

      var answerLength = 4;
      //Cicle for the 4 answers
      for (var m=1; m<=answerLength; m++){
        //m is the number of the answer
        var li = document.createElement("li");
        li.textContent = eval('question'+n+'.answer'+m); //Text Content of the n answer
        li.setAttribute("data-index-a", m);    //Value of the answer
        //li.setAttribute("style", 'display:none;');
        ul.appendChild(li);       
      }//End cicle for '4 answers'


      //Im expecting a click on the answers
      ul.addEventListener("click", function(event) {
        //console.log("entro al eventListener");
        var element = event.target;    
        //console.log("element ", element);

        // if the click element is li (the answers)
        if (element.matches("li") === true) {
          var indexAnsw = element.getAttribute("data-index-a");
          var indexQuest = element.parentElement.getAttribute("data-index-q");
          //console.log("indexAnsw: ",indexAnsw," indexQuest: ",indexQuest);
          
          //if the index of the click answer is equal to the right answer 
          if (eval('question'+indexQuest+'.correctAnswer') == indexAnsw){
            console.log('Correct! Question number ',indexQuest);
            displayAnswerResult(indexQuest,'correct');
            //document.getElementById('answer-Result').innerHTML = 'Answer Question '+indexQuest+ ' was Correct!';
            correctAnswers += 1; //counter for calculating the score
          } else{
            console.log('Incorrect! Question number ', indexQuest);
            displayAnswerResult(indexQuest,'incorrect');
            //document.getElementById('answer-Result').innerHTML = 'Answer Question '+indexQuest+ ' was Incorrect!';
            secondsLeftQuiz = secondsLeftQuiz - restTime;
            console.log('secondsLeftQuiz',secondsLeftQuiz);
           
          } //End of if-else correct answer

          
          var nextIndex = parseInt(indexQuest)+1;
          //if nextIndex is not the last question display it
          if (nextIndex < (questionLength+1)){
            //Go to the next question div
            //none display actual div
            var actualQuestion = document.querySelector("#question-Card-"+indexQuest);
            actualQuestion.setAttribute("style", 'display:none;');
            //display the next div
            var nextQuestion = document.querySelector("#question-Card-"+nextIndex);
            nextQuestion.setAttribute("style", 'display:block;');  

          } else { //if it is the last question
            
            console.log('it was the last question');
            
            finishTheQuiz();
            
          }

         
        } //End if matches li
      });//End ul.addEventListener
    }//End for-->5 questions

    //Display the first question div
    var initialQuestion = document.querySelector("#question-Card-"+1);
    initialQuestion.setAttribute("style", 'display:block;');

    //Put empty value on initials input
    document.getElementById('initials-Name').value = "";


  }//End function renderQuestions()

  function beginQuiz(){
    renderQuestions();
  }
  
  //save the score on the localstorage
  function saveScore(score){
    
    var initialsName = document.getElementById('initials-Name').value;
    console.log('Save score in local storage: ',initialsName,' ',score);

    //After save put 'on' the higscore section div
    document.getElementById('allDone-Section').style.display = "none";
    //document.getElementById('highScore-Section').style.display = "block";


    //Get the values of the quizHighScores from localstorage
    var storedQuizHighScores = JSON.parse(localStorage.getItem("quizHighScores"));
    console.log('quizHighScores on localStorage',storedQuizHighScores);

    //var storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedQuizHighScores !== null) {
      quizHighScores = storedQuizHighScores;
      console.log('quizHighScores on volatil storage',quizHighScores);
    }

    //put values on the array quizHighScores
    quizHighScores.push(initialsName+' - '+score);    
    console.log('New Score Array on volatil',quizHighScores);

    //Save on local storage the quisHighScores Array
    localStorage.setItem("quizHighScores", JSON.stringify(quizHighScores));

    renderHighScores();

  }
  
  function goBack(){
    //since the begenning
    window.location.reload();
  }

  function clearHighScores(){
    console.log('inner fucntion clearHighScores');
    localStorage.removeItem('quizHighScores');
    quizHighScores = [];
    renderHighScores();
  }

  function renderHighScores(){
    //clean the HighScores information
    highScoreSection.innerHTML = "";
    document.getElementById('highScore-Section').style.display = "block";

    //Creat 5 questions divs for card questions
    var highCardDiv = document.createElement("div");
    highCardDiv.setAttribute("id","high-Card");
    highCardDiv.setAttribute("class",'card');
    highCardDiv.setAttribute("style",'display: block'); //hide all the divs
    highScoreSection.appendChild(highCardDiv);

    //Create a paragraph with the question
    var h = document.createElement("h1");
    h.textContent = "HighScores";      
    highCardDiv.appendChild(h);
    
    //Create a 'ul' element for the answers list
    var ul = document.createElement("ul");
    highCardDiv.appendChild(ul);

     //Get the values of the quizHighScores from localstorage
    var storedQuizHighScores = JSON.parse(localStorage.getItem("quizHighScores"));
    //console.log('quizHighScores on localStorage for Render',storedQuizHighScores);

    //var storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedQuizHighScores !== null) {
      quizHighScores = storedQuizHighScores;
      console.log('quizHighScores on volatil storage for render',quizHighScores);
    } else {
      var li = document.createElement("li");
      //console.log('quizHighScores ',m,' ',quizHighScores[m])
      li.textContent = "There is no scores";
      li.setAttribute("style","cursor: default;");         
      ul.appendChild(li);   
    }
    
    var highLength = quizHighScores.length;    
    //Cicle for the 4 answers
    for (var m=0; m < highLength; m++){
      //m is the number of the answer
      var li = document.createElement("li");
      li.setAttribute("style","cursor: default;");
      //console.log('quizHighScores ',m,' ',quizHighScores[m])
      li.textContent = quizHighScores[m];         
      ul.appendChild(li);       
    }//End cicle for '4 answers'

    //Create a Go Back Button
    var button = document.createElement("input");
    button.setAttribute("class","button");
    button.setAttribute("type","button");
    button.setAttribute("value","Go Back");
    button.setAttribute("onclick","goBack()");
    
    highCardDiv.appendChild(button);

     //Create a Clear HighScore Button
     var button = document.createElement("input");
     button.setAttribute("class","button");
     button.setAttribute("type","button");
     button.setAttribute("value","Clear HighScores");
     button.setAttribute("onclick","clearHighScores()");
     
     highCardDiv.appendChild(button);
    

  }

  function displayAnswerResult(indexQuest,result){
    if (result == 'correct'){
      document.getElementById('answer-Result').innerHTML = 'Answer Question '+indexQuest+ ' was Correct!';
      setTimeResult();
    }
    if (result == 'incorrect'){
      document.getElementById('answer-Result').innerHTML = 'Answer Question '+indexQuest+ ' was Incorrect!';
      setTimeResult();
    }
  }


  function setTimeResult() {
    var secondsLeftResult = 2;
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeftResult--; //reduce the sencons left
      //here we can make repetitions      
      //make an action ----> display any value  
      if(secondsLeftResult === 0) { //here we stop the repetitions
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function after x seconds
        sendMessageResult();
      }
  
    }, 1000);
  }
  
  // Function call, after n seconds
  function sendMessageResult() {
    //timeEl.textContent = " ";
    document.getElementById('answer-Result').innerHTML = "";
  
  }


  function setTimeQuiz() {    
    //console.log('into the setTimeQuiz');
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeftQuiz--; //reduce the sencons left
      //here we can make repetitions      
      //make an action ----> display any value  
      document.getElementById('time').innerHTML = "Time: " +secondsLeftQuiz;

      if(secondsLeftQuiz <= 0) { //here we stop the repetitions
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        document.getElementById('time').innerHTML = "Time is Over";
        // Calls function after x seconds
        finishTheQuiz();
      }
  
    }, 1000);
  }
  
  // Function call, after n seconds
  function finishTheQuiz() {
    secondsLeftQuiz = 0; //
    document.getElementById('time').innerHTML = "";
    //calculate the score
    score = (correctAnswers*100)/questionLength;
    console.log('Score: ',score);

    //Display the final score div and not display the questions cards
    for (var n = 1; n <=questionLength ; n++) {             
      var lastQuestion = document.querySelector("#question-Card-"+n);
      lastQuestion.setAttribute("style", 'display:none;');
    }
    var allDoneSection = document.querySelector("#allDone-Section");
    allDoneSection.setAttribute("style", 'display:block;');

    /* Submit and save the final score */
    document.getElementById('final-Score').innerHTML = "Your final score is: "+score;
    var submitButton = document.querySelector("#submit-Button");
    submitButton.setAttribute("onclick",'saveScore('+score+')')

  
  }
