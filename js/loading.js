(function () {
    const body = document.body;

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.querySelector('.loading-text');
    const languages = [
        "Hello",     // English
        "Hola",      // Spanish
        "Bonjour",   // French
        "Hallo",     // German
        "Ciao",      // Italian
        "Привет",    // Russian
        "你好",      // Chinese
        "Olá",       // Portuguese
        "مرحبا",     // Arabic
        "नमस्ते",    // Hindi
        "こんにちは", // Japanese
        "안녕하세요"  // Korean
    ];
    let index = 1;
    const timePerLanguage = 500;
    const minDisplayTime = timePerLanguage * 5;
    const startTime = Date.now();

    function changeText() {
        loadingText.textContent = languages[index];
        index = (index + 1) % languages.length;
    }

    const interval = setInterval(changeText, timePerLanguage);

    window.addEventListener('load', function () {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minDisplayTime - elapsedTime;

        if (sessionStorage.getItem('pageLoadedBefore')) {
            clearInterval(interval);
            loadingScreen.style.opacity = '0';
            setTimeout(function () {
                loadingScreen.style.display = 'none';
            }, 500);
        } else {
            setTimeout(function () {
                clearInterval(interval);
                loadingScreen.style.opacity = '0';
                setTimeout(function () {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, Math.max(remainingTime, 0));
            sessionStorage.setItem('pageLoadedBefore', 'true');
        }
    });
})();