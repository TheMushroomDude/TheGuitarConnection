const debugTools = document.getElementById('debugTools');
const debugLocalStorageValues = document.getElementById('debugLocalStorageValues');

window.onload = () => SetTools();

function SetTools(){
    if(debugTools === null || undefined) return;

    const modeStorageItem = localStorage.getItem('debugMode');
    const isActive = modeStorageItem === 'true';
    if(isActive){
        debugTools.style.display = '';
        let UpdateInfo = setInterval(() => {
            UpdateLocalStorageValues();
        }, 600)
    }
    else
        debugTools.style.display = 'none';
}

function UpdateLocalStorageValues(){
    if(debugLocalStorageValues === null || undefined) return;
    const StorageKeys = Object.keys(localStorage);
    let StringDisplay = `---Local Storage Values--- <br>`;

    StorageKeys.forEach(key => {
        StringDisplay += `${key}: ${localStorage[key]} <br>`;
    });
    debugLocalStorageValues.innerHTML = StringDisplay;
}