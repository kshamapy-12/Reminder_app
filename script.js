lucide.createIcons();

//create new cards
// store data in localStorage
// show data from localStorage
// handle the buttons
// handle the filters
if (window.lucide) {
  lucide.createIcons();
}

const addNote = document.querySelector('#add-note');
const formContainer = document.querySelector('.main');

// Form Element
const form = document.querySelector('form');

// Text Inputs
const imgUrlInput = document.querySelector('#imgUrl');
const fullNameInput = document.querySelector('#fullName');
const homeTownInput = document.querySelector('#homeTown');
const quickNoteInput = document.querySelector('#quickNote');

// Radio Inputs (Select individual radio buttons by ID)
const emergencyRadio = document.querySelector('#emergency');
const importantRadio = document.querySelector('#important');
const urgentRadio = document.querySelector('#urgent');
const noRushRadio = document.querySelector('#no-rush');

// Radio Inputs Group (Selects ALL radio buttons belonging to Category)
const categoryRadios = document.querySelectorAll('input[name="Category"]');

// Buttons
const closeBtn = document.querySelector('#closeForm');
const stackContainer = document.querySelector('#stack');


const prev = document.querySelector('#upBtn');
const next = document.querySelector('#downBtn');

const emerBtn = document.querySelector('#emerBtn');
const impBtn = document.querySelector('#impBtn');
const urgBtn = document.querySelector('#urgBtn');
const noRushBtn = document.querySelector('#noRushBtn');

emerBtn.addEventListener('click', function() {     
    const emergencyCard = stackContainer.querySelector('.stack-card[data-selected="Emergency"]');
    
    if (emergencyCard) {
        // Prepend moves the element to the front of stackContainer
        stackContainer.prepend(emergencyCard);
        
        // Re-run your stack position calculation to update visual styles
        updateStack(); 
    }
});

impBtn.addEventListener('click', function() {     
    const impCard = stackContainer.querySelector('.stack-card[data-selected="Important"]');
    
    if (impCard) {
        // Prepend moves the element to the front of stackContainer
        stackContainer.prepend(impCard);
        
        // Re-run your stack position calculation to update visual styles
        updateStack(); 
    }
});

urgBtn.addEventListener('click', function() {     
    const urgentCard = stackContainer.querySelector('.stack-card[data-selected="Urgent"]');
    
    if (urgentCard) {
        // Prepend moves the element to the front of stackContainer
        stackContainer.prepend(urgentCard);
        
        // Re-run your stack position calculation to update visual styles
        updateStack(); 
    }
});

noRushBtn.addEventListener('click', function() {     
    const noRushCard = stackContainer.querySelector('.stack-card[data-selected="No Rush"]');
    
    if (noRushCard) {
        // Prepend moves the element to the front of stackContainer
        stackContainer.prepend(noRushCard);
        
        // Re-run your stack position calculation to update visual styles
        updateStack(); 
    }
});



// Code starts here

function saveToLocalStorage(obj){

    //clear old localStorage data
   if(localStorage.getItem('tasks') === null){
    let oldTasks = [];
    oldTasks.push(obj);
   localStorage.setItem('tasks', JSON.stringify(oldTasks))
   } else{
    let oldTasks = localStorage.getItem('tasks');
    oldTasks = JSON.parse(oldTasks);
    oldTasks.push(obj);
    localStorage.setItem('tasks', JSON.stringify(oldTasks));
   }
   
}

addNote.addEventListener('click', function(){
    formContainer.style.display = 'flex';
})
closeBtn.addEventListener('click', function(){
    formContainer.style.display = 'none';
})

form.addEventListener('submit', function(e){
    e.preventDefault();

    let imgUrl = imgUrlInput.value.trim();
    let fullName = fullNameInput.value.trim();
    let homeTown = homeTownInput.value.trim();
    let purpose = quickNoteInput.value.trim();
   

       let selected = false;
    categoryRadios.forEach((inp) => {
        if(inp.checked){
            selected = inp.value;
        }
    })
    if(imgUrl === ''){
        alert('Enter valid URL Inputs');
        return;
    }
     if(fullName === ''){
        alert('Enter valid name Inputs');
        return;
    }
    if(homeTown === '')
    {
        alert('Enter valid home town Inputs');
        return;
    }
    if(purpose === '')
    {
        alert('Enter valid note Inputs');
        return;
    }
 if(!selected){
    alert('Please select a category');
    return;
 }
 saveToLocalStorage({
    imgUrl,
    fullName,
    homeTown,
    purpose,
    selected,
 });

 form.reset();
 formContainer.style.display = 'none';
showCard();
});

function showCard(){
  if (!stackContainer) return;
  stackContainer.innerHTML = '';

    let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    allTasks.forEach((task) => {

// Main Card Container
 const mainCard = document.createElement('div');
 mainCard.id = 'mainCard';
    mainCard.className = 'stack-card col-start-1 row-start-1 rounded-2xl bg-white shadow-lg p-5 w-90 transition-all duration-300';
  // 2. Image Wrapper & Image
  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'w-20 h-20 rounded-full overflow-hidden shadow-lg';

  const dispImg = document.createElement('img');
  dispImg.id = 'dispImg';
  dispImg.src = task.imgUrl;
  dispImg.alt = 'image alt text';
  dispImg.className = 'object-fit';
  imgWrapper.appendChild(dispImg);

  // 3. Name Heading
  const dispName = document.createElement('h2');
  dispName.id = 'dispName';
  dispName.className = 'text-lg font-semibold pt-3';
  dispName.textContent = task.fullName;

  // 4. Hometown Row
  const homeTownRow = document.createElement('div');
  homeTownRow.className = 'flex justify-between items-center pt-1';

  const dispHomeTown = document.createElement('p');
  dispHomeTown.id = 'dispHomeTown';
  dispHomeTown.className = 'text-sm text-slate-500';
  dispHomeTown.textContent = 'Home Town';

  const dispPlace = document.createElement('p');
  dispPlace.id = 'dispPlace';
  dispPlace.className = 'text-sm text-slate-500';
  dispPlace.textContent = task.homeTown;

  homeTownRow.appendChild(dispHomeTown);
  homeTownRow.appendChild(dispPlace);

  // 5. Purpose Row
  const purposeRow = document.createElement('div');
  purposeRow.className = 'flex justify-between items-center';

  const dispPurpose = document.createElement('p');
  dispPurpose.id = 'dispPurpose';
  dispPurpose.className = 'text-sm text-slate-500';
  dispPurpose.textContent = 'Purpose';

  const dispTimes = document.createElement('p');
  dispTimes.id = 'dispTimes';
  dispTimes.className = 'text-sm text-slate-500';
  dispTimes.textContent = task.purpose;

  purposeRow.appendChild(dispPurpose);
  purposeRow.appendChild(dispTimes);

  // 6. Action Buttons Container
  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'gap-3 flex flex-wrap mt-3';

  // Call Button
  const callBtn = document.createElement('button');
  callBtn.id = 'callBtn';
  callBtn.className = 'flex gap-2 bg-black px-5 py-3 rounded-full text-white shadow-sm active:scale-95';

  const callIcon = document.createElement('i');
  callIcon.setAttribute('data-lucide', 'phone');
  callBtn.appendChild(callIcon);
  callBtn.appendChild(document.createTextNode(' Call'));

  // Message Button
  const msgBtn = document.createElement('button');
  msgBtn.id = 'msgBtn';
  msgBtn.className = 'flex gap-2 bg-slate-200 px-5 py-3 rounded-full text-black shadow-sm active:scale-95';

  const msgIcon = document.createElement('i');
  msgIcon.setAttribute('data-lucide', 'message-circle');
  msgBtn.appendChild(msgIcon);
  msgBtn.appendChild(document.createTextNode(' message'));

  buttonWrapper.appendChild(callBtn);
  buttonWrapper.appendChild(msgBtn);

  // 7. Append all sections to main card
  mainCard.appendChild(imgWrapper);
  mainCard.appendChild(dispName);
  mainCard.appendChild(homeTownRow);
  mainCard.appendChild(purposeRow);
  mainCard.appendChild(buttonWrapper);

stackContainer.appendChild(mainCard);

    });
    updateStack();
    if (window.lucide) {
    lucide.createIcons();
  }
}
showCard();
function updateStack(){
    const cards = stackContainer.querySelectorAll('.stack-card');
for(let i=0; i<3; i++){
    const card = cards[i];
    if(!card) break;
 let zIndex = 40 - i * 10;
    let translateY = i * 12;
    let scale = 1 - i * 0.02; 
    card.style.zIndex = zIndex;
    card.style.transform = `translateY(${translateY}px) scale(${scale})`;
    card.style.opacity = `${scale}`;
}

}

prev.addEventListener('click', () => {
    let lastChild = stackContainer.lastElementChild;
    if(lastChild){
        stackContainer.insertBefore(lastChild, stackContainer.firstElementChild);
        // update
        updateStack();
    }
})
next.addEventListener('click', () => {
    let fisrtChild = stackContainer.firstElementChild;
    if(fisrtChild){
        stackContainer.appendChild(fisrtChild);
        // update
        updateStack();
    }
})


