document.addEventListener('DOMContentLoaded', function () {
    const correctHash = '9ad6987fb7ad109ff0ec65a6ca22293f76ffa5db208d7394b73b1d7e6025f01f';
    const flagInput = document.getElementById('flag-input');
    const checkFlagButton = document.getElementById('check-flag');
    const flagResult = document.getElementById('flag-result');

    checkFlagButton.addEventListener('click', function () {
        const flag = flagInput.value;
        const flagHash = CryptoJS.SHA256(flag).toString();

        if (flagHash === correctHash) {
            flagResult.textContent = 'Correct flag!';
            flagResult.style.color = 'green';
        } else {
            flagResult.textContent = 'Incorrect flag. Try inspecting the page.';
            flagResult.style.color = 'red';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const skillsList = document.querySelector('.skills-list');
    let scrollAmount = 0;
    const scrollStep = 2;
    const scrollInterval = 50;
    const pauseDuration = 1000;
    let direction = 1;
    let isPaused = false;

    function autoScroll() {
        if (isPaused) {
            setTimeout(autoScroll, scrollInterval);
            return;
        }
        scrollAmount += scrollStep * direction;
        if (scrollAmount >= skillsList.scrollWidth - skillsList.clientWidth || scrollAmount <= 0) {
            direction *= -1;
            setTimeout(autoScroll, pauseDuration);
            return;
        }
        skillsList.scrollTo({
            left: scrollAmount, behavior: 'smooth'
        });
        setTimeout(autoScroll, scrollInterval);
    }

    skillsList.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    skillsList.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    setTimeout(autoScroll, scrollInterval);
});

document.addEventListener('DOMContentLoaded', function () {
    const repoCards = document.querySelectorAll('.repo');
    const cacheKey = 'lyzevRepoCache';
    const cacheLifetime = 5 * 60 * 1000; // 5 minutes in milliseconds
    const cachedData = JSON.parse(localStorage.getItem(cacheKey) || '{}');
    const lastFetch = cachedData.lastFetch || 0;
    const now = Date.now();

    function applyCachedData() {
        repoCards.forEach(card => {
            const starCountElement = card.querySelector('.star-count');
            const forkCountElement = card.querySelector('.fork-count');
            if (!starCountElement || !forkCountElement) return;
            const repoName = starCountElement.getAttribute('data-repo');
            if (cachedData[repoName]) {
                starCountElement.textContent = cachedData[repoName].stars;
                forkCountElement.textContent = cachedData[repoName].forks;
            }
        });
    }

    if (now - lastFetch < cacheLifetime) {
        applyCachedData();
    } else {
        repoCards.forEach(card => {
            const starCountElement = card.querySelector('.star-count');
            const forkCountElement = card.querySelector('.fork-count');
            if (!starCountElement || !forkCountElement) return;

            const repo = starCountElement.getAttribute('data-repo');
            fetch('https://api.github.com/repos/' + repo)
                .then(response => response.json())
                .then(data => {
                    if (!cachedData[repo]) {
                        cachedData[repo] = {};
                    }
                    cachedData[repo].stars = data.stargazers_count ?? 0;
                    cachedData[repo].forks = data.forks_count ?? 0;

                    starCountElement.textContent = cachedData[repo].stars;
                    forkCountElement.textContent = cachedData[repo].forks;

                    cachedData.lastFetch = now;
                    localStorage.setItem(cacheKey, JSON.stringify(cachedData));
                })
                .catch(error => console.error('Error fetching repo data:', error));
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-sun', 'fa-moon');
    }

    darkModeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    localStorage.setItem('suspicious', 'NC4gQ2x1ZSAoc3R5bGVzdXh4KToKSW4gcGxhaW4gc2lnaHQsIGJ1dCBub3Qgd2hhdCB5b3UgdGhpbmssClRoZSBpbWFnZSBoaWRlcyBtb3JlIHRoYW4geW91IGJsaW5rLg==');
    fetch('https://cors-anywhere.herokuapp.com/suspicious', {
        headers: {
            'Suspicious': 'My4gQ2x1ZToKU3RvcmVkIGluIHNpbGVuY2UsIGhpZGRlbiBkZWVwLApBIHNlY3JldCByZXN0cyB3aGVyZSBkYXRhIHNsZWVwcy4='
        }
    });
});