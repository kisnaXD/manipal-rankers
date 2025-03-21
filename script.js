// Loading screen with 1-second gap after completion
setTimeout(() => {
    setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none';
        document.querySelector('.main-content').style.display = 'block';
        startTypewriter();
    }, 1000);
}, 1500);

// Typewriter effect
const words = ['details', 'name', 'roll number'];
let wordIndex = 0;
let charIndex = 0;
let currentWord = '';
let isDeleting = false;
const typewriterElement = document.querySelector('.typewriter');

function type() {
    if (!isDeleting && charIndex <= words[wordIndex].length) {
        currentWord = words[wordIndex].substring(0, charIndex);
        typewriterElement.textContent = currentWord;
        charIndex++;
    } else if (isDeleting && charIndex >= 0) {
        currentWord = words[wordIndex].substring(0, charIndex);
        typewriterElement.textContent = currentWord;
        charIndex--;
    }

    if (!isDeleting && charIndex > words[wordIndex].length) {
        setTimeout(() => { isDeleting = true; }, 1000);
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
    }

    setTimeout(type, isDeleting ? 100 : 150);
}

function startTypewriter() {
    type();
}

// Static database with more entries
const students = [
    { name: "Aarav Patel", section: "A", enrollmentNumber: "231001" },
    { name: "Aarti Sharma", section: "B", enrollmentNumber: "231002" },
    { name: "Bhavya Singh", section: "C", enrollmentNumber: "231003" },
    { name: "Chaitanya Kumar", section: "A", enrollmentNumber: "231004" },
    { name: "Divya Gupta", section: "B", enrollmentNumber: "231005" },
    { name: "Esha Verma", section: "C", enrollmentNumber: "231006" },
    { name: "Farhan Khan", section: "A", enrollmentNumber: "231007" },
    { name: "Gauri Desai", section: "B", enrollmentNumber: "231008" },
    { name: "Harsh Jain", section: "C", enrollmentNumber: "231009" },
    { name: "Ishaan Reddy", section: "A", enrollmentNumber: "231010" }
];

// Custom dropdown functionality
const dropdown = document.querySelector('.custom-dropdown');
const selected = document.querySelector('.dropdown-selected');
const options = document.querySelector('.dropdown-options');
const optionElements = document.querySelectorAll('.option');
const inputSection = document.querySelector('.input-section');
const textInput = document.querySelector('.text-input');
const searchResults = document.querySelector('.search-results');
const errorMessage = document.querySelector('.error-message');
const closeBtn = document.querySelector('.close-btn');
const enterBtn = document.querySelector('.enter-btn');

optionElements.forEach(option => {
    option.addEventListener('click', () => {
        selected.textContent = option.textContent;
        if (option.textContent === 'Roll Number') {
            inputSection.style.width = '50vw';
        } else {
            inputSection.style.width = '45vw';
        }
        textInput.value = '';
        searchResults.style.display = 'none';
    });
});

// Search functionality
textInput.addEventListener('input', () => {
    const query = textInput.value.trim().toLowerCase();
    searchResults.innerHTML = '';
    
    if (query.length >= 3) {
        let matches = [];
        if (selected.textContent === 'Name') {
            matches = students.filter(student => 
                student.name.toLowerCase().includes(query)
            );
        } else if (selected.textContent === 'Roll Number') {
            matches = students.filter(student => 
                student.enrollmentNumber.includes(query)
            );
        }
        
        if (matches.length > 0) {
            matches.forEach(student => {
                const result = document.createElement('div');
                result.className = 'search-result';
                result.innerHTML = `
                    <div class="name">${student.name}</div>
                    <div class="details">${student.enrollmentNumber}, ${student.section}</div>
                `;
                result.addEventListener('click', () => {
                    textInput.value = selected.textContent === 'Name' ? student.name : student.enrollmentNumber;
                    searchResults.style.display = 'none';
                });
                searchResults.appendChild(result);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    } else {
        searchResults.style.display = 'none';
    }
});

// Function to show error message
function showError() {
    const query = textInput.value.trim().toLowerCase();
    const exists = students.some(student => 
        student.name.toLowerCase() === query || 
        student.enrollmentNumber === query
    );
    
    if (!exists) {
        errorMessage.classList.remove('hide');
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
            errorMessage.classList.add('hide');
        }, 4000);
    }
}

// Enter key and button functionality
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        showError();
    }
});

enterBtn.addEventListener('click', () => {
    showError();
});

// Close button functionality
closeBtn.addEventListener('click', () => {
    errorMessage.classList.remove('show');
    errorMessage.classList.add('hide');
});

// Hide search results when clicking outside
document.addEventListener('click', (e) => {
    if (!inputSection.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});