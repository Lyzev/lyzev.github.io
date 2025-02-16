(() => {
    // Flag verification and "Enter" key support
    const correctHash = '9ad6987fb7ad109ff0ec65a6ca22293f76ffa5db208d7394b73b1d7e6025f01f';
    const flagInput = document.getElementById('flag-input');
    const checkFlagButton = document.getElementById('check-flag');
    const flagResult = document.getElementById('flag-result');

    const checkFlag = () => {
        const flagHash = CryptoJS.SHA256(flagInput.value).toString();
        const isCorrect = flagHash === correctHash;
        flagResult.textContent = isCorrect
            ? 'Correct flag!'
            : 'Incorrect flag. Try inspecting the page.';
        flagResult.style.color = isCorrect ? 'green' : 'red';
    };

    checkFlagButton.addEventListener('click', checkFlag);
    flagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkFlag();
    });

    // Animate elements on scroll using IntersectionObserver
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) =>
                entry.target.classList.toggle('visible', entry.isIntersecting)
            );
        },
        { threshold: 0.1 }
    );
    animateElements.forEach((el) => observer.observe(el));

    // Auto-scrolling skills list
    const skillsList = document.querySelector('.skills-list');
    if (skillsList) {
        let scrollLeft = 0,
            direction = 1,
            lastTimestamp = 0;
        const scrollSpeed = 80,
            pauseDuration = 300;
        let isPaused = false,
            pauseEndTime = 0,
            isHovered = false;

        skillsList.addEventListener('mouseenter', () => (isHovered = true));
        skillsList.addEventListener('mouseleave', () => {
            isHovered = false;
            requestAnimationFrame(autoScroll);
        });

        function autoScroll(timestamp) {
            if (isHovered || (isPaused && timestamp < pauseEndTime)) {
                lastTimestamp = timestamp;
                return requestAnimationFrame(autoScroll);
            }
            isPaused = false;
            if (!lastTimestamp) lastTimestamp = timestamp;
            const delta = (timestamp - lastTimestamp) / 1000;
            lastTimestamp = timestamp;

            scrollLeft += scrollSpeed * direction * delta;
            const maxScrollLeft = skillsList.scrollWidth - skillsList.clientWidth;

            if (scrollLeft >= maxScrollLeft) {
                scrollLeft = maxScrollLeft;
                direction = -1;
                isPaused = true;
                pauseEndTime = timestamp + pauseDuration;
            } else if (scrollLeft <= 0) {
                scrollLeft = 0;
                direction = 1;
                isPaused = true;
                pauseEndTime = timestamp + pauseDuration;
            }
            skillsList.scrollLeft = scrollLeft;

            // Fade in/out effect
            const items = skillsList.querySelectorAll('li');
            items.forEach((item) => {
                const itemLeft = item.offsetLeft;
                const itemRight = itemLeft + item.clientWidth;
                const listLeft = skillsList.scrollLeft;
                const listRight = listLeft + skillsList.clientWidth;

                if (direction === 1) {
                    if (itemLeft > listLeft && itemLeft < listRight) {
                        item.classList.add('visible');
                    } else {
                        item.classList.remove('visible');
                    }
                } else {
                    if (itemRight > listLeft && itemRight < listRight) {
                        item.classList.add('visible');
                    } else {
                        item.classList.remove('visible');
                    }
                }
            });

            requestAnimationFrame(autoScroll);
        }
        requestAnimationFrame(autoScroll);
    }

    // Fetch and cache GitHub repo data
    const repoCards = document.querySelectorAll('.repo');
    if (repoCards.length) {
        const cacheKey = 'lyzevRepoCache';
        const cacheLifetime = 5 * 60 * 1000; // 5 minutes
        const cachedData = JSON.parse(localStorage.getItem(cacheKey) || '{}');
        const lastFetch = cachedData.lastFetch || 0;
        const now = Date.now();

        const applyCachedData = () => {
            repoCards.forEach((card) => {
                const starElem = card.querySelector('.star-count');
                const forkElem = card.querySelector('.fork-count');
                if (!starElem || !forkElem) return;
                const repoName = starElem.dataset.repo;
                if (cachedData[repoName]) {
                    starElem.textContent = cachedData[repoName].stars;
                    forkElem.textContent = cachedData[repoName].forks;
                }
            });
        };

        if (now - lastFetch < cacheLifetime) {
            applyCachedData();
        } else {
            repoCards.forEach((card) => {
                const starElem = card.querySelector('.star-count');
                const forkElem = card.querySelector('.fork-count');
                if (!starElem || !forkElem) return;

                const repo = starElem.dataset.repo;
                fetch(`https://api.github.com/repos/${repo}`)
                    .then((response) => response.json())
                    .then((data) => {
                        cachedData[repo] = {
                            stars: data.stargazers_count ?? 0,
                            forks: data.forks_count ?? 0,
                        };
                        starElem.textContent = cachedData[repo].stars;
                        forkElem.textContent = cachedData[repo].forks;
                        cachedData.lastFetch = now;
                        localStorage.setItem(cacheKey, JSON.stringify(cachedData));
                    })
                    .catch((error) =>
                        console.error('Error fetching repo data:', error)
                    );
            });
        }
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        const body = document.body;
        const icon = darkModeToggle.querySelector('i');

        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            icon.classList.replace('fa-sun', 'fa-moon');
        }

        darkModeToggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
            icon.classList.toggle('fa-sun');
            icon.classList.toggle('fa-moon');
        });
    }

    // This code is obfuscated to prevent cheating in the challenge ;)
    (function(_0x286def,_0x226709){var _0x2f4148=_0x286def();function _0x4d74bf(_0xd3c488,_0x37f4d9,_0x24be01,_0x479b28){return _0x5cf7(_0x479b28- -0x108,_0x24be01);}function _0x118871(_0x1bf541,_0x184ac1,_0x50c794,_0x598b64){return _0x5cf7(_0x1bf541- -0x15,_0x50c794);}while(!![]){try{var _0x45fdce=parseInt(_0x118871(0x96,0x98,0x91,0x7e))/0x1*(-parseInt(_0x4d74bf(-0x90,-0x90,-0x74,-0x86))/0x2)+-parseInt(_0x118871(0x68,0x73,0x6b,0x64))/0x3*(parseInt(_0x118871(0x7b,0x88,0x78,0x95))/0x4)+parseInt(_0x118871(0x83,0x81,0x93,0x80))/0x5*(-parseInt(_0x118871(0x8f,0xa5,0x9d,0xa5))/0x6)+parseInt(_0x4d74bf(-0x64,-0x5c,-0x6d,-0x66))/0x7*(-parseInt(_0x118871(0x7e,0x6e,0x8a,0x96))/0x8)+parseInt(_0x118871(0x88,0x73,0xa1,0x97))/0x9*(-parseInt(_0x118871(0x94,0xa2,0x8d,0xac))/0xa)+parseInt(_0x4d74bf(-0x80,-0x66,-0x7a,-0x68))/0xb+-parseInt(_0x4d74bf(-0x81,-0x65,-0x92,-0x79))/0xc*(-parseInt(_0x4d74bf(-0x8a,-0x90,-0x7f,-0x8e))/0xd);if(_0x45fdce===_0x226709)break;else _0x2f4148['push'](_0x2f4148['shift']());}catch(_0x27031f){_0x2f4148['push'](_0x2f4148['shift']());}}}(_0x35b1,0x4110e));var _0x2a0ea7=(function(){var _0x3bcfcc=!![];return function(_0x356be0,_0x54789b){var _0x96615f=_0x3bcfcc?function(){function _0x118f78(_0x462282,_0x216428,_0x17a677,_0x363ff){return _0x5cf7(_0x462282-0x3c6,_0x17a677);}if(_0x54789b){var _0xb0ae9=_0x54789b[_0x118f78(0x458,0x461,0x457,0x46f)](_0x356be0,arguments);return _0x54789b=null,_0xb0ae9;}}:function(){};return _0x3bcfcc=![],_0x96615f;};}()),_0x1a535c=_0x2a0ea7(this,function(){function _0x77b236(_0x7681e2,_0x565008,_0x1f63bd,_0x4daf56){return _0x5cf7(_0x565008-0x228,_0x1f63bd);}function _0x5e491a(_0x2d6967,_0x319a20,_0x2f6b31,_0x39c248){return _0x5cf7(_0x39c248-0x262,_0x2d6967);}return _0x1a535c[_0x77b236(0x29e,0x2b4,0x2cf,0x2c9)]()['search'](_0x5e491a(0x2f4,0x2dc,0x30e,0x2f7)+'+$')[_0x5e491a(0x2e7,0x2df,0x309,0x2ee)]()[_0x5e491a(0x2e8,0x2e3,0x301,0x2fe)+'r'](_0x1a535c)[_0x77b236(0x2d0,0x2d5,0x2e6,0x2e4)]('(((.+)+)+)'+'+$');});_0x1a535c();var _0xd123a=(function(){var _0xa031c2=!![];return function(_0x43b03f,_0x1bee91){var _0x2beec7=_0xa031c2?function(){function _0x746007(_0x37accf,_0xd9e82f,_0x3c7266,_0x4922fc){return _0x5cf7(_0x37accf- -0xa3,_0x4922fc);}if(_0x1bee91){var _0x2b084=_0x1bee91[_0x746007(-0x11,-0xf,0x5,-0xb)](_0x43b03f,arguments);return _0x1bee91=null,_0x2b084;}}:function(){};return _0xa031c2=![],_0x2beec7;};}()),_0x3916a0=_0xd123a(this,function(){var _0x101d4a;try{var _0x5381ff=Function(_0x42a3b8(-0xc0,-0xc5,-0xd4,-0xbb)+_0x42a3b8(-0xba,-0xb8,-0xc5,-0xb0)+(_0x22a168(-0x22c,-0x235,-0x246,-0x259)+'ctor(\x22retu'+'rn\x20this\x22)('+'\x20)')+');');_0x101d4a=_0x5381ff();}catch(_0x22d3f4){if(_0x22a168(-0x283,-0x27a,-0x269,-0x254)!==_0x42a3b8(-0xb8,-0xb0,-0xb4,-0x9e))_0x101d4a=window;else{var _0xdfb46b=_0x2da36e?function(){if(_0x533bd5){var _0x285cbe=_0x486db2['apply'](_0x596824,arguments);return _0x117631=null,_0x285cbe;}}:function(){};return _0x54aa71=![],_0xdfb46b;}}function _0x42a3b8(_0x419ac8,_0x3597d3,_0x34fe71,_0x50cb6d){return _0x5cf7(_0x419ac8- -0x145,_0x34fe71);}var _0x1fcfa9=_0x101d4a[_0x42a3b8(-0xa2,-0x88,-0x9f,-0x8b)]=_0x101d4a[_0x22a168(-0x24f,-0x23a,-0x249,-0x24c)]||{},_0x468989=['log','warn','info',_0x42a3b8(-0x99,-0xa0,-0x8c,-0x8c),_0x22a168(-0x270,-0x26e,-0x25e,-0x251),'table',_0x42a3b8(-0x9d,-0xa2,-0xb2,-0x98)];function _0x22a168(_0x2641fc,_0x19a25b,_0x1cfff9,_0x30708e){return _0x5cf7(_0x1cfff9- -0x2ec,_0x2641fc);}for(var _0x493998=0x0;_0x493998<_0x468989[_0x22a168(-0x259,-0x263,-0x256,-0x24f)];_0x493998++){var _0x9007f3=_0xd123a['constructo'+'r'][_0x22a168(-0x267,-0x242,-0x252,-0x24c)][_0x22a168(-0x251,-0x231,-0x242,-0x24c)](_0xd123a),_0xe84062=_0x468989[_0x493998],_0x14d693=_0x1fcfa9[_0xe84062]||_0x9007f3;_0x9007f3['__proto__']=_0xd123a[_0x42a3b8(-0x9b,-0x96,-0x84,-0x93)](_0xd123a),_0x9007f3[_0x42a3b8(-0xb9,-0xb6,-0xbc,-0xcc)]=_0x14d693[_0x22a168(-0x25d,-0x25f,-0x260,-0x26b)][_0x42a3b8(-0x9b,-0xab,-0x8c,-0xae)](_0x14d693),_0x1fcfa9[_0xe84062]=_0x9007f3;}});function _0x35b1(){var _0x3b16b7=['UgdGhpbmss','ZGRlbiBkZW','117434oRclzs','STqku','FnZSBoaWRl','return\x20(fu','VuY2UsIGhp','IGluIHNpbG','Aoc3R5bGVz','ZSBkYXRhIH','cyBtb3JlIH','nction()\x20','toString','VpQay','exception','12UQjXlS','4KuPfBX','J1dCBub3Qg','apply','846600YcHOKi','ClRoZSBpbW','(((.+)+)+)','length','Y3JldCByZX','1763805tcZKCj','oKU3RvcmVk','prototype','suspicious','constructo','9ItASkM','setItem','N0cyB3aGVy','4522309laoWEg','c2lnaHQsIG','28vPvwYc','console','6IiQPiI','zev.dev/su','{}.constru','spicious','trace','1474660urINQP','bind','7guIrgN','error','search','RoYW4geW91','My4gQ2x1ZT','20139600eEzWgN','d2hhdCB5b3','IGJsaW5rLg','1077789WqouZD','dXh4KToKSW','4gcGxhaW4g'];_0x35b1=function(){return _0x3b16b7;};return _0x35b1();}_0x3916a0();function _0x10af4f(_0x4c1425,_0x483fe7,_0x19f84f,_0x217966){return _0x5cf7(_0x19f84f- -0x342,_0x217966);}localStorage[_0x10af4f(-0x28b,-0x28d,-0x2a4,-0x29c)](_0x10af4f(-0x2a5,-0x28c,-0x2a7,-0x2a2),'NC4gQ2x1ZS'+_0x4a9975(-0xfa,-0xdd,-0x107,-0xee)+_0x4a9975(-0x10a,-0xe8,-0xed,-0xf8)+_0x10af4f(-0x2ab,-0x2b9,-0x2c3,-0x2ad)+_0x10af4f(-0x296,-0x287,-0x2a1,-0x294)+_0x10af4f(-0x2be,-0x2a9,-0x2b1,-0x2a7)+_0x4a9975(-0xe1,-0x10b,-0xeb,-0xfb)+_0x4a9975(-0xec,-0xfb,-0xe2,-0xf6)+_0x10af4f(-0x2be,-0x2a5,-0x2ae,-0x2bf)+_0x4a9975(-0xde,-0xee,-0xea,-0xf2)+_0x4a9975(-0x101,-0xff,-0xe3,-0xec)+_0x4a9975(-0xd3,-0xc8,-0xb9,-0xc8)+_0x10af4f(-0x2ab,-0x2d2,-0x2c6,-0x2dd)+'==');function _0x5cf7(_0x5eac8f,_0x569280){var _0x327525=_0x35b1();return _0x5cf7=function(_0x3916a0,_0xd123a){_0x3916a0=_0x3916a0-0x7a;var _0x8038cf=_0x327525[_0x3916a0];return _0x8038cf;},_0x5cf7(_0x5eac8f,_0x569280);}function _0x4a9975(_0x1fd0b8,_0x19e2ab,_0x564e54,_0x2ff356){return _0x5cf7(_0x2ff356- -0x176,_0x1fd0b8);}fetch('https://ly'+_0x10af4f(-0x29a,-0x2ad,-0x29d,-0x29c)+_0x4a9975(-0xc6,-0xdb,-0xea,-0xcf),{'headers':{'Suspicious':_0x4a9975(-0xba,-0xc2,-0xbf,-0xc7)+_0x10af4f(-0x2ae,-0x2b2,-0x2a9,-0x29d)+_0x4a9975(-0xf6,-0xf9,-0xf5,-0xef)+_0x4a9975(-0xf5,-0xfa,-0xf1,-0xf0)+_0x4a9975(-0xe4,-0x10b,-0xdd,-0xf5)+'VwLApBIHNl'+_0x4a9975(-0xd0,-0xee,-0xf8,-0xdf)+_0x10af4f(-0x295,-0x2bc,-0x2a3,-0x2b0)+_0x4a9975(-0xf1,-0xdb,-0xe4,-0xed)+'NsZWVwcy4='}});
})();
