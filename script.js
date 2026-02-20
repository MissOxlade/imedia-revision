let currentMode = 'quiz';
let currentTopic = null;

function showMode(mode){
  currentMode = mode;
  document.getElementById('content').innerHTML='';
  renderTopics();
}

function renderTopics(){
  const topicsDiv = document.getElementById('topics');
  topicsDiv.innerHTML='';
  for(let topic in questionBank){
    const card=document.createElement('div');
    card.className='topic-card';
    card.innerText=topic;
    card.onclick=()=>openTopic(topic);
    topicsDiv.appendChild(card);
  }
}

function openTopic(topic){
  currentTopic=topic;
  if(currentMode==='quiz') renderQuiz();
  else renderFlashcards();
}

function renderQuiz(){
  const container=document.getElementById('content');
  container.innerHTML='';
  questionBank[currentTopic].quiz.forEach((q,i)=>{
    const box=document.createElement('div');
    box.className='question-box';
    box.innerHTML=`<h3>${q.q}</h3>`;

    if(q.type==='mcq'){
      const answers=document.createElement('div');
      answers.className='answers';
      q.options.forEach((opt,idx)=>{
        const btn=document.createElement('button');
        btn.innerText=opt;
        btn.onclick=()=>{
          if(idx===q.answer) btn.classList.add('correct');
          else btn.classList.add('wrong');
        };
        answers.appendChild(btn);
      });
      box.appendChild(answers);
    } else {
      box.innerHTML+=`<p><strong>${q.command||''} (${q.marks||''} marks)</strong></p>`;
      box.innerHTML+=`<textarea placeholder='Write your answer here...'></textarea>`;
    }
    container.appendChild(box);
  });
}

function renderFlashcards(){
  const container=document.getElementById('content');
  container.innerHTML='';
  questionBank[currentTopic].flashcards.forEach(card=>{
    const div=document.createElement('div');
    div.className='flashcard';
    div.innerText=card.front;
    div.onclick=()=>{
      div.innerText = div.innerText===card.front ? card.back : card.front;
    };
    container.appendChild(div);
  });
}

renderTopics();
