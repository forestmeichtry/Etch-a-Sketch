function mouseOver(target, color) {
    target.style.backgroundColor = 'rgb(' +
        color[0] + ', ' +
        color[1] + ', ' +
        color[2] + ')';
}

function randomColor() {
    const color = [];

    for (let i = 0; i < 3; i++) {
        color.push(Math.floor(Math.random() * 256));
    }

    return color;
}

function createGrid(size, mainContainer) {
    while (mainContainer.child) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
    const color = randomColor();

    for (let i = 0; i < size * size; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('square');
        newDiv.style.width = (800 / size) + 'px';
        newDiv.style.height = (800 / size) + 'px';
        newDiv.addEventListener('mouseover', function(e){
            mouseOver(e.target, color);
        });
        mainContainer.appendChild(newDiv);
    }
}

const mainContainer = document.getElementById('main-container');
createGrid(60, mainContainer);