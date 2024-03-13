const tasks = [
    { name: '15m', color: 'var(--element1)', count: 15 },
    { name: '30m', color: 'var(--element2)', count: 8 },
    { name: '60m', color: 'var(--element4)', count: 5 }
];

const workBoxesContainer = document.getElementById('work-boxes');
const doneBoxesContainer = document.getElementById('done-boxes');

// Generate Boxes
let boxes = [];
for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    for (let j = 1; j <= tasks[i].count; j++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.backgroundColor = task.color;
        box.innerText = task.name;
        box.addEventListener('click', () => { moveBox(box); });
        boxes.push(box);
    }
}

shuffle(boxes);

boxes.forEach(box => workBoxesContainer.appendChild(box));


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Move Box
function moveBox(box) {
    if (box.parentNode === workBoxesContainer) {
        doneBoxesContainer.appendChild(box);
    } else {
        workBoxesContainer.appendChild(box);
    }
}