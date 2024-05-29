document.addEventListener("DOMContentLoaded", function () {
    // Create title
    const title = document.createElement('h1');
    title.id = 'title';
    title.innerText = 'Calculator';
    document.body.appendChild(title);

    // Create description
    const description = document.createElement('p');
    description.id = 'description';
    description.innerText = 'A simple calculator to perform basic arithmetic operations.';
    document.body.appendChild(description);

    // Create responsive table
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-responsive';
    const table = document.createElement('table');
    table.className = 'table table-bordered';
    tableContainer.appendChild(table);
    document.body.appendChild(tableContainer);

    // Create calculator container
    const container = document.createElement('div');
    container.className = 'container mt-5';
    
    const row = document.createElement('div');
    row.className = 'row justify-content-center';
    
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6';
    
    const calculator = document.createElement('div');
    calculator.className = 'card';
    
    const display = document.createElement('input');
    display.id = 'result';
    display.className = 'form-control';
    display.readOnly = true;
    
    const buttons = [
        { id: '1', text: '1' }, { id: '2', text: '2' }, { id: '3', text: '3' }, { id: 'divide', text: '/' }, { id: 'clear', text: 'C' },
        { id: '4', text: '4' }, { id: '5', text: '5' }, { id: '6', text: '6' }, { id: 'multiply', text: '*' }, { id: 'memoryAdd', text: 'M+' },
        { id: '7', text: '7' }, { id: '8', text: '8' }, { id: '9', text: '9' }, { id: 'subtract', text: '-' }, { id: 'memorySubtract', text: 'M-' },
        { id: '0', text: '0' }, { id: 'decimal', text: '.' }, { id: 'equal', text: '=' }, { id: 'add', text: '+' }, { id: 'memoryClear', text: 'MC' }
    ];
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'card-body';
    
    buttons.forEach(buttonInfo => {
        const button = document.createElement('button');
        button.id = buttonInfo.id;
        button.innerText = buttonInfo.text;
        button.className = 'btn btn-light m-1';
        button.onclick = () => handleButtonClick(buttonInfo.text);
        buttonContainer.appendChild(button);
    });
    
    calculator.appendChild(display);
    calculator.appendChild(buttonContainer);
    col.appendChild(calculator);
    row.appendChild(col);
    container.appendChild(row);
    document.body.appendChild(container);
    
    // Create pagination buttons
    const buttonDiv = document.createElement('div');
    buttonDiv.id = 'buttons';
    buttonDiv.className = 'd-flex justify-content-center';
    document.body.appendChild(buttonDiv);
    
    // Event listener for keyboard inputs
    document.addEventListener('keydown', (event) => {
        if (event.key >= '0' && event.key <= '9') {
            handleButtonClick(event.key);
        } else if (event.key === 'Enter') {
            handleButtonClick('=');
        } else if (['+', '-', '*', '/', '.'].includes(event.key)) {
            handleButtonClick(event.key);
        } else if (event.key === 'Backspace') {
            handleButtonClick('C');
        } else {
            alert('Only numbers are allowed');
        }
    });
});

let memory = 0;

function handleButtonClick(text) {
    const display = document.getElementById('result');
    if (!display) return;

    if (text === 'C') {
        display.value = '';
    } else if (text === '=') {
        try {
            display.value = eval(display.value);
        } catch {
            display.value = 'Error';
        }
    } else if (text === 'M+') {
        memory += parseFloat(display.value) || 0;
        localStorage.setItem('memory', memory);
    } else if (text === 'M-') {
        memory -= parseFloat(display.value) || 0;
        localStorage.setItem('memory', memory);
    } else if (text === 'MC') {
        memory = 0;
        localStorage.setItem('memory', memory);
    } else {
        display.value += text;
    }
}