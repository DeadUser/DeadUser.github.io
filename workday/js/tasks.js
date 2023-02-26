const tasks = [
    { name: 'Answer a Mail', color: 'var(--element1)', count: 7 },
    { name: 'Git Commit', color: 'var(--element2)', count: 7 },
    { name: 'Read a Guide', color: 'var(--element3)', count: 6 }
];

const workBoxesContainer = document.getElementById('work-boxes');
const doneBoxesContainer = document.getElementById('done-boxes');

// Generate Boxes
for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    for (let j = 1; j <= tasks[i].count; j++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.backgroundColor = task.color;
        box.innerText = task.name;
        box.addEventListener('click', () => { moveBox(box); });
        workBoxesContainer.appendChild(box);
    }
}

// Move Box
function moveBox(box) {
    if (box.parentNode === workBoxesContainer) {
        doneBoxesContainer.appendChild(box);
    } else {
        workBoxesContainer.appendChild(box);
    }
}