(function () {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.querySelector('.loading-text');
    const languages = ["Hola", "Bonjour", "Hallo", "Ciao", "Hello"];
    let index = 0;
    const minDisplayTime = 400 * languages.length;
    const startTime = Date.now();

    function changeText() {
        loadingText.style.opacity = '0';
        setTimeout(() => {
            loadingText.textContent = languages[index];
            loadingText.style.opacity = '1';
            index = (index + 1) % languages.length;
        }, 100);
    }

    const interval = setInterval(changeText, 400);

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