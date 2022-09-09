(function () {
    let lightSwitch = document.getElementById('lightSwitch');
    if (!lightSwitch) {
        return;
    }

    function toggleDarkMode(currentThemeMode) {
        var oldTheme = 'dark';
        var newTheme = 'light';
        
        if (currentThemeMode == 'dark') {
            var oldTheme = 'light';
            var newTheme = 'dark';
        }

        // var oldTheme_regex = new RegExp(oldTheme, "g");
        // var newTheme_regex = new RegExp(newTheme, "g");

        var current_lightitems = document.querySelectorAll("-light");
        var current_darkitems = document.querySelectorAll("-dark");

        current_lightitems.forEach(element => {
            element.className = element.className.replace("-light", "-dark");
        });

        current_darkitems.forEach(element => {
            element.className = element.className.replace("-dark", "-light");
        });

        localStorage.setItem('darkModeEnabled', newTheme);
    }
    
    function getSystemDefaultTheme() {
        const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
        if (darkThemeMq.matches) {
            return 'dark';
        }
            return 'light';
    }

    function onToggleMode() {
        if (lightSwitch.checked) { 
            toggleDarkMode("dark");
         } else {
            toggleDarkMode("light");
         }
    }

    function setup() {
        var settings = localStorage.getItem('darkModeEnabled');
        if (settings == null) { settings = getSystemDefaultTheme(); }

        if (settings == 'dark') { lightSwitch.checked = true; }

        lightSwitch.addEventListener('change', onToggleMode);
        onToggleMode();
    }

    setup();
})();