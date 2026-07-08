// ==========================================
// 1. CONTACT FORM VALIDATION
// ==========================================

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate Name
    if (fullName === '' || fullName.length < 3) {
        showError('nameError', 'Name must be at least 3 characters long.');
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
    }

    // Validate Phone
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        showError('phoneError', 'Phone number must be exactly 10 digits.');
        isValid = false;
    }

    // Validate Subject
    if (subject === '') {
        showError('subjectError', 'Subject cannot be empty.');
        isValid = false;
    }

    // Validate Message
    if (message === '') {
        showError('messageError', 'Message cannot be empty.');
        isValid = false;
    }

    // IF EVERYTHING IS VALID - Show Loading Animation
    if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnLoader = document.getElementById('btnLoader');
        
        // Disable button and show loader
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        
        // Simulate sending data (wait 2 seconds)
        setTimeout(() => {
            // Hide loader and show success message
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            
            successMessage.style.display = 'block';
            contactForm.reset();
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }, 2000);
    }
});

// Helper function to show error
function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}

// Helper function to clear all errors
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-msg');
    errorElements.forEach(el => el.innerText = '');
}


// ==========================================
// 2. DYNAMIC TO-DO LIST (DOM MANIPULATION)
// ==========================================

const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

function addTask() {
    const taskText = todoInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.innerText = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = 'Delete';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    todoInput.value = '';

    // Add event listeners to new elements
    span.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    deleteBtn.addEventListener('click', function() {
        li.remove();
    });
}

addTodoBtn.addEventListener('click', addTask);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});