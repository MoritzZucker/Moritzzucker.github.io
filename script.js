const typewriterText = document.querySelector('.typewriter-text');
const developerTypes = [
    'Web-Developer',
    'App-Developer',
    'Software-Developer'
];
let currentIndex = 0;

function typewriter(text, i = 0) {
    if (i < text.length) {
        typewriterText.textContent += text.charAt(i);
        setTimeout(() => typewriter(text, i + 1), 100);
    } else {
        setTimeout(() => {
            typewriterText.textContent = '';
            currentIndex = (currentIndex + 1) % developerTypes.length;
            typewriter(developerTypes[currentIndex]);
        }, 2000);
    }
}

typewriter(developerTypes[currentIndex]);