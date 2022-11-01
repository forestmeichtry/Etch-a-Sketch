function mouseOver(target, color) {
    if (target.style.backgroundColor != '') {
        colorValues = target.style.backgroundColor.match(/\d+/g);
        target.style.backgroundColor = 'rgb(' +
            Math.floor(colorValues[0] * .8) + ', ' +
            Math.floor(colorValues[1] * .8) + ', ' +
            Math.floor(colorValues[2] * .8) + ')';
    } else {
        target.style.backgroundColor = color;
    }
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
        (255 - colorValues[1]) + ', ' +
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

function createGrid(size, fadeIn) {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.lastChild);
    }

    // Selects a random rgb color and changes the page elements to match
    const colors = randomColor();
    const button = document.getElementById('button');
    button.style.backgroundColor = colors[0];
    button.style.color = colors[1];
    const shakeButton = document.getElementById('shake-button');
    shakeButton.style.backgroundColor = colors[0];
    shakeButton.style.color = colors[1];
    mainContainer.style.borderColor = colors[1];
    

    for (let i = 0; i < size * size; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('square');
        newDiv.style.width = (800 / size) + 'px';
        newDiv.style.height = (800 / size) + 'px';
        newDiv.addEventListener('mouseover', function(e){
            mouseOver(e.target, colors[0]);
        });

        if (fadeIn) {
            newDiv.style.animation = "fade-in 2s"
        }
        mainContainer.appendChild(newDiv);
    }
}

// Applies a shaking animation to the main grid and a falling animation to each square
// A new grid with the same dimensions is created after the animation completes
function shakeGrid() {
    mainContainer.classList.add("shake");
    let children = mainContainer.children;
    const refArray = [];

    for (let i = 0; i < children.length; i++) {
        refArray[i] = i;
    }
    
    for (let i = refArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = refArray[i];
        refArray[i] = refArray[j];
        refArray[j] = k;
    }

    delayIncrement = 3 / children.length;
    let delay = delayIncrement;
    for (let i = 0; i < refArray.length; i++) {
        if (Math.random() * 2 > 1) {
            children[refArray[i]].style.animation = "pop-left 1s";
            children[refArray[i]].style.animationFillMode = "forwards";
        } else {
            children[refArray[i]].style.animation = "pop-right 1s";
            children[refArray[i]].style.animationFillMode = "forwards";
        }

        children[refArray[i]].style.animationDelay = delay + 's';
        delay += delayIncrement;
    }

    setTimeout(function () {
        createGrid(Math.sqrt(children.length), true);
        mainContainer.classList.remove("shake");
    }, 5000);
}

const mainContainer = document.getElementById('main-container');
createGrid(60, false);