// DOM Elements
const input = document.getElementById('chapterInput');
const button = document.querySelector('button');
const list = document.querySelector('.list');

// Initialize chapters array from localStorage or empty array
let chaptersArray = getChapterList() || [];

// Populate the list on page load
chaptersArray.forEach(chapter => displayList(chapter));

// Button click event listener
button.addEventListener('click', () => {
    if (input.value.trim()) {
        displayList(input.value.trim());
        chaptersArray.push(input.value.trim());
        setChapterList();
        input.value = '';
        input.focus();
    }
});

// Function to display a chapter in the list
function displayList(item) {
    const li = document.createElement('li');
    li.textContent = item;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.addEventListener('click', () => deleteChapter(item));
    li.appendChild(deleteBtn);
    list.appendChild(li);
}

// Function to update localStorage
function setChapterList() {
    localStorage.setItem('chapters', JSON.stringify(chaptersArray));
}

// Function to retrieve chapters from localStorage
function getChapterList() {
    return JSON.parse(localStorage.getItem('chapters'));
}

// Function to delete a chapter
function deleteChapter(chapter) {
    // Remove the chapter from the array
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    // Update localStorage
    setChapterList();
    // Re-render the list
    list.innerHTML = '';
    chaptersArray.forEach(chapter => displayList(chapter));
}