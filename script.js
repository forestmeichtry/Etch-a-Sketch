function mouseOver() {
    this.style.backgroundColor = 'blue';
}

function createGrid(size, mainContainer) {
    while (mainContainer.child) {
        mainContainer.removeChild(mainContainer.firstChild);
    }

    for (let i = 0; i < size * size; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('square');
        newDiv.style.width = (800 / size) + 'px';
        newDiv.style.height = (800 / size) + 'px';
        newDiv.addEventListener('mouseover', mouseOver);
        mainContainer.appendChild(newDiv);
    }
}

const mainContainer = document.getElementById('main-container');
createGrid(60, mainContainer);