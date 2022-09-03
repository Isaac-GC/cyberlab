// Refresh the page with the updated view if
//  the module gets updated
var moduleSelect = document.getElementById('changeModuleSelect');

moduleSelect.onchange = function() {
    window.location.pathname = moduleSelect.value;
}


function openLabTaskModule() {
    
}