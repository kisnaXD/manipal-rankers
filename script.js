// Loading screen with 1-second gap after completion
setTimeout(() => {
    // After 1.5s loading + 1s gap (total 2.5s), hide loading and show content
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

optionElements.forEach(option => {
    option.addEventListener('click', () => {
        selected.textContent = option.textContent;
        if (option.textContent === 'Roll Number') {
            inputSection.style.width = '50vw';
            searchResults.style.display = 'none'; // Hide search results for roll number
        } else {
            inputSection.style.width = '45vw';
        }
        textInput.value = ''; // Clear input when switching
    });
});

// Search functionality
textInput.addEventListener('input', () => {
    const query = textInput.value.trim().toLowerCase();
    searchResults.innerHTML = '';
    
    if (selected.textContent === 'Name' && query.length >= 3) {
        const matches = students.filter(student => 
            student.name.toLowerCase().includes(query)
        );
        
        if (matches.length > 0) {
            matches.forEach(student => {
                const result = document.createElement('div');
                result.className = 'search-result';
                result.innerHTML = `
                    <div class="name">${student.name}</div>
                    <div class="details">${student.enrollmentNumber}, ${student.section}</div>
                `;
                result.addEventListener('click', () => {
                    textInput.value = student.name;
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

// Hide search results when clicking outside
document.addEventListener('click', (e) => {
    if (!inputSection.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});