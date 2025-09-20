const darkThemeCSS = document.getElementById('darkTheme');
const toggleThemeDebug = document.getElementById('toggleThemeDebug');
const toggleThemeSwitch = document.getElementById('toggleThemeSwitch');

SetupClientTheme();

function SetupClientTheme(){
    LoadTheme();
    toggleThemeDebug.onclick = () => ToggleTheme();
    toggleThemeSwitch.onclick = () => ToggleTheme();
}

function LoadTheme() {
    const darkThemeEnabled = localStorage.getItem('darkTheme') === 'true';
    darkThemeCSS.disabled = !darkThemeEnabled;
    toggleThemeDebug.checked = darkThemeEnabled;
    if(toggleThemeSwitch !== null)
        toggleThemeSwitch.checked = darkThemeEnabled;
}

function ToggleTheme(){
    const toggleThemeCheck = localStorage.getItem('darkTheme') === 'true';
    localStorage.setItem('darkTheme', (!toggleThemeCheck).toString());
    LoadTheme();
}
