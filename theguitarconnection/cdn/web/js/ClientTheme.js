const darkThemeCSS = document.getElementById('darkTheme');
const toggleThemeDebug = document.getElementById('toggleThemeDebug');

LoadTheme();
toggleThemeDebug.onclick = () => ToggleTheme();

function LoadTheme() {
    const darkThemeEnabled = localStorage.getItem('darkTheme') === 'true';
    darkThemeCSS.disabled = !darkThemeEnabled;
    toggleThemeDebug.checked = darkThemeEnabled;
}

function ToggleTheme(){
    const toggleThemeDebugChecked = toggleThemeDebug.checked;
    localStorage.setItem('darkTheme', toggleThemeDebugChecked.toString());
    LoadTheme();
}