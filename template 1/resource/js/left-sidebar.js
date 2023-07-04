console.clear();

let selectedTheme = document.querySelector('.sidebar').getAttribute('theme');
let isCollapsed = document.querySelector('.sidebar').hasAttribute('collapsed');

const sidebar = document.querySelector('.sidebar');
const toggles = document.querySelectorAll('.toggle__input');
const collapseToggle = document.querySelector('.collapse-toggle');

// Listen to theme toggle change
toggles.forEach((toggle) => {
  toggle.addEventListener('click', handleToggleChange)
});

// Set correct theme and trigger theme update
function handleToggleChange(event) {
  selectedTheme = event.target.value;
  updateTheme();
}

// Update theme
function updateTheme() {
  sidebar.setAttribute('theme', selectedTheme);
}

collapseToggle.addEventListener('click', handleCollapseToggleClick);

function handleCollapseToggleClick() {
  isCollapsed = !isCollapsed;
  updateCollapsedState();
}

function updateCollapsedState() {
  isCollapsed
    ? sidebar.setAttribute('collapsed', '')
    : sidebar.removeAttribute('collapsed');
}