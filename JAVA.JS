const ver = "V3.0.2";

let device = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
    apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
};

// User parameters (managed by main injector)
let user = {
    username: "Username",
    nickname: "Nickname",
    UID: 0
};

let loadedPlugins = [];

// Elements (created dynamically)
const unloader = document.createElement('unloader');
const dropdownMenu = document.createElement('dropDownMenu');
const watermark = document.createElement('watermark');
const statsPanel = document.createElement('statsPanel');
const splashScreen = document.createElement('splashScreen');

// Feature flags and configurations
window.features = {
    questionSpoof: true,
    videoSpoof: true,
    showAnswers: false,
    autoAnswer: false,
    customBanner: false,
    nextRecomendation: false,
    repeatQuestion: false,
    minuteFarmer: false,
    rgbLogo: false,
    darkMode: false, // Added dark mode flag
    onekoJs: false // Added Oneko.js flag
};
window.featureConfigs = {
    autoAnswerDelay: 3,
    customUsername: "",
    customPfp: ""
};

// Security measures
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J'))) {
        e.preventDefault();
    }
});

// Prevents console access attempts (less effective without obfuscation)
console.log(Object.defineProperties(new Error, {
    toString: { value: () => {(new Error).stack.includes('toString@') && location.reload();}},
    message: { get: () => location.reload(); }
}));

// Styles (consider using a stylesheet instead of inline styles)
document.head.appendChild(Object.assign(document.createElement("style"), {
    innerHTML: `@font-face{font-family:'MuseoSans';src:url('https://proxy.khanware.space/r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}`
}));
document.head.appendChild(Object.assign(document.createElement('style'), {
    innerHTML: `::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #555; }`
}));
document.querySelector("link[rel~='icon']").href = 'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ukh0rq22.png';

// EventEmitter class
class EventEmitter {
    constructor() { this.events = {}; }
    on(t, e) {
        "string" == typeof t && (t = [t]);
        t.forEach(t => {
            this.events[t] || (this.events[t] = []);
            this.events[t].push(e);
        });
    }
    off(t, e) {
        "string" == typeof t && (t = [t]);
        t.forEach(t => {
            this.events[t] && (this.events[t] = this.events[t].filter(t => t !== e));
        });
    }
    emit(t, ...e) { this.events[t] && this.events[t].forEach(t => { t(...e); }); }
    once(t, e) {
        "string" == typeof t && (t = [t]);
        let s = (...i) => { e(...i); this.off(t, s); };
        this.on(t, s);
    }
}
const plppdo = new EventEmitter();

new MutationObserver(mutationsList => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            plppdo.emit('domChanged');
        }
    }
}).observe(document.body, { childList: true, subtree: true });

// Utility functions
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => { const audio = new Audio(url); audio.play(); };
const checkCollision = (obj1, obj2) => !(obj1.right < obj2.left || obj1.left > obj2.right || obj1.bottom < obj2.top || obj1.top > obj2.bottom);
const findAndClickByClass = className => {
    const element = document.querySelector(`.${className}`);
    if (element) {
        element.click();
        sendToast(`⭕ Pressionando ${className}...`, 1000);
    }
};

// Toast notification function
function sendToast(text, duration = 5000, gravity = 'bottom') {
    Toastify({
        text: text,
        duration: duration,
        gravity: gravity,
        position: "center",
        stopOnFocus: true,
        style: { background: "#000000" }
    }).showToast();
}

// Splash screen functions
async function showSplashScreen() {
    splashScreen.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 0.5s ease;user-select:none;color:white;font-family:MuseoSans,sans-serif;font-size:30px;text-align:center;";
    splashScreen.innerHTML = '<span style="color:white;">KHANWARE</span><span style="color:#72ff72;">.SPACE</span>';
    document.body.appendChild(splashScreen);
    setTimeout(() => splashScreen.style.opacity = '1', 10);
}
async function hideSplashScreen() {
    splashScreen.style.opacity = '0';
    setTimeout(() => splashScreen.remove(), 1000);
}

// Resource loading functions
async function loadScript(url, label) {
    return fetch(url).then(response => response.text()).then(script => {
        loadedPlugins.push(label);
        eval(script);
    });
}
async function loadCss(url) {
    return new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.onload = () => resolve();
        document.head.appendChild(link);
    });
}

// Menu setup functions
function setupMenu() {
    // ... (rest of the setupMenu function remains largely the same)
}

// Main functions (feature implementations)
function setupMain() {
  // ... (rest of the setupMain function remains largely the same)
}


// Injection point and initialization
if (!/^https?:\/\/pt\.khanacademy\.org/.test(window.location.href)) {
    alert("❌ Khanware Failed to Injected!\n\nVocê precisa executar o Khanware no site do Khan Academy! (https://pt.khanacademy.org/)");
    window.location.href = "https://pt.khanacademy.org/";
}

showSplashScreen();

Promise.all([
    loadScript('https://raw.githubusercontent.com/adryd325/oneko.js/refs/heads/main/oneko.js', 'onekoJs'),
    loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin'),
    loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss'),
    loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin')
]).then(([onekoResult, darkReaderResult]) => {
    onekoEl = document.getElementById('oneko');
    if (onekoEl) {
        onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')";
        onekoEl.style.display = "none";
    }

    DarkReader.setFetchMethod(window.fetch);
    
    //Initialize DarkReader based on feature flag
    if(window.features.darkMode){
      DarkReader.enable();
    }


}).then(async () => {
    sendToast("🌿 Khanware injetado com sucesso!");
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');
    await delay(500);
    sendToast(`⭐ Bem vindo(a) de volta: ${user.nickname}`);
    loadedPlugins.forEach(plugin => sendToast(`🪝 ${plugin} Loaded!`, 2000, 'top'));
    hideSplashScreen();
    setupMenu();
    setupMain();
    console.clear();
});

//Nelson Ferreira © Todos os Direitos Reservados - 2024
