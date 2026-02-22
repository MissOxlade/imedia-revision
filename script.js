let currentMode = 'quiz';

function showMode(mode){
  currentMode = mode;
  renderAll();
}

function toggleSection(element){
  const content = element.nextElementSibling;
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

function renderAll(){
  const container = document.getElementById('topics');
  container.innerHTML = '';

  for(const unit in questionBank){
    const unitWrapper = document.createElement('div');
    unitWrapper.className = 'topic-card';

    const unitHeader = document.createElement('h1');
    unitHeader.innerText = unit;
    unitHeader.style.cursor = 'pointer';

    const unitContent = document.createElement('div');
    unitContent.style.display = 'none';

    unitHeader.onclick = () => toggleSection(unitHeader);

    for(const ta in questionBank[unit]){
      const taHeader = document.createElement('h2');
      taHeader.innerText = ta;
      taHeader.style.cursor = 'pointer';

      const taContent = document.createElement('div');
      taContent.style.display = 'none';

      taHeader.onclick = () => toggleSection(taHeader);

      for(const sub in questionBank[unit][ta]){
        const subHeader = document.createElement('h3');
        subHeader.innerText = sub;
        subHeader.style.cursor = 'pointer';

        const subContent = document.createElement('div');
        subContent.style.display = 'none';
        subContent.className = 'question-box';

        subHeader.onclick = () => toggleSection(subHeader);

        if(currentMode === 'quiz'){
          questionBank[unit][ta][sub].quiz.forEach(q=>{
            const qDiv = document.createElement('div');
            qDiv.innerHTML = `<p><strong>${q.q}</strong></p>`;
            if(q.command){
              qDiv.innerHTML += `<p>${q.command} (${q.marks} marks)</p>`;
            }

            if(q.type === 'mcq'){
              q.options.forEach((opt,i)=>{
                const btn = document.createElement('button');
                btn.innerText = opt;
                btn.onclick = ()=>{
                  if(i===q.answer){ btn.classList.add('correct'); }
                  else{ btn.classList.add('wrong'); }
                };
                qDiv.appendChild(btn);
              });
            } else {
              qDiv.innerHTML += `<textarea placeholder='Write your answer...'></textarea>`;

              if(q.markScheme){
                const msBtn = document.createElement('button');
                msBtn.innerText = 'Show Mark Scheme';
                const msDiv = document.createElement('div');
                msDiv.style.display='none';
                msDiv.innerHTML = q.markScheme.join('<br>');
                msBtn.onclick = ()=>{
                  msDiv.style.display = msDiv.style.display==='none'?'block':'none';
                };
                qDiv.appendChild(msBtn);
                qDiv.appendChild(msDiv);
              }

              if(q.modelAnswer){
                const maBtn = document.createElement('button');
                maBtn.innerText = 'Show Model Answer';
                const maDiv = document.createElement('div');
                maDiv.style.display='none';
                maDiv.innerText = q.modelAnswer;
                maBtn.onclick = ()=>{
                  maDiv.style.display = maDiv.style.display==='none'?'block':'none';
                };
                qDiv.appendChild(maBtn);
                qDiv.appendChild(maDiv);
              }
            }

            subContent.appendChild(qDiv);
          });
        } else {
          questionBank[unit][ta][sub].flashcards.forEach(card=>{
            const cardDiv = document.createElement('div');
            cardDiv.className='flashcard';
            cardDiv.innerText = card.front;
            cardDiv.onclick = ()=>{
              cardDiv.innerText = cardDiv.innerText===card.front ? card.back : card.front;
            };
            subContent.appendChild(cardDiv);
          });
        }

        taContent.appendChild(subHeader);
        taContent.appendChild(subContent);
      }

      unitContent.appendChild(taHeader);
      unitContent.appendChild(taContent);
    }

    unitWrapper.appendChild(unitHeader);
    unitWrapper.appendChild(unitContent);
    container.appendChild(unitWrapper);
  }
}

renderAll();
