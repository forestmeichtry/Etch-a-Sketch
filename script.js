function mouseOver(target, color) {
    target.style.backgroundColor = color;
}

// Generates a random color and its opposing color
function randomColor() {
    const colorValues = [];

    for (let i = 0; i < 3; i++) {
        colorValues.push(Math.floor(Math.random() * 256));
    }
    
    let color = 'rgb(' +
        colorValues[0] + ', ' +
        colorValues[1] + ', ' +
        colorValues[2] + ')';

    let opposingColor = 'rgb(' +
        (255 - colorValues[0]) + ', ' +
        ( 255 - colorValues[1]) + ', ' +
        (255 - colorValues[2]) + ')';

    return [color, opposingColor];
}

// Prompts the user to enter a number between 1 and 100.
// Then creates a new grid of that size
function sizePrompt() {
    const alertBox = document.getElementById('alert');
    let size = prompt("Enter a size for your new grid (1-100)");

    if (size != null) {
        // If the input is not valid an alert message is displayed
        if (isNaN(size) || size < 1 || size > 100) {
            alertBox.style.display = 'flex';
        } else {
            createGrid(size);
        }
    }
}

function createGrid(size) {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.lastChild);
    }

    // Selects a random rgb color and changes the page elements to match
    const colors = randomColor();
    const button = document.getElementById('button');
    button.style.backgroundColor = colors[0];
    button.style.color = colors[1];
    mainContainer.style.borderColor = colors[1];
    

    for (let i = 0; i < size * size; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('square');
        newDiv.style.width = (800 / size) + 'px';
        newDiv.style.height = (800 / size) + 'px';
        newDiv.addEventListener('mouseover', function(e){
            mouseOver(e.target, colors[0]);
        });
        mainContainer.appendChild(newDiv);
    }
}

const mainContainer = document.getElementById('main-container');
createGrid(60);