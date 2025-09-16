const debugTools = document.getElementById('debugTools');

window.onload = () => SetTools();

function SetTools(){
    if(debugTools === null || undefined) return;

    const modeStorageItem = localStorage.getItem('debugMode');
    const isActive = modeStorageItem === 'true';
    if(isActive)
        debugTools.style.display = '';
    else
        debugTools.style.display = 'none';
}