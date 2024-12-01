const version = "V3.0.2";

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent);
const isAppleDevice = /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent);

const user = {
    username: "Username",
    nickname: "Nickname",
    UID: 0
};

let loadedPlugins = [];

// Feature configuration (improved organization)
const features = {
    questionSpoof: true,
    videoSpoof: true,
    showAnswers: false,
    autoAnswer: false,
    customBanner: false,
    nextRecommendation: false, // Corrected typo
    repeatQuestion: false,
    minuteFarmer: false,
    rgbLogo: false,
    darkMode: true, // Added default for dark mode
    onekoJs: false // Added onekoJS as a feature
};

const featureConfigs = {
    autoAnswerDelay: 3,
    customUsername: "",
    customPfp: ""
};


// Event emitter (simplified)
class EventEmitter {
    constructor() { this.events = {}; }
    on(event, listener) { (this.events[event] || (this.events[event] = [])).push(listener); }
    off(event, listener) { this.events[event] = this.events[event]?.filter(l => l !== listener); }
    emit(event, ...args) { this.events[event]?.forEach(listener => listener(...args)); }
}
const eventEmitter = new EventEmitter();


// Utility functions
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = (url, onError = () => {}) => {
    const audio = new Audio(url);
    audio.play().catch(onError); // Add error handling
};
const checkCollision = (rect1, rect2) => !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);

function createElementWithStyle(tagName, innerHTML, style) {
    const element = document.createElement(tagName);
    element.innerHTML = innerHTML;
    Object.assign(element.style, style);
    return element;
}

// ... (rest of the functions with improved names and structure) ...


//Main Function refactor
function setupMain() {
    // ... (Functions for spoofing, auto-answering, etc. - refactor to be smaller and cleaner)

    //Example of a refactored function
    function applyAutoAnswer() {
        const baseClasses = ["_1tuo6xk", "_ssxvf9l", "_1f0fvyce", "_rz7ls7u", "_1yok8f4", "_1e5cuk2a"];
        let classToCheck = [...baseClasses];
        if (features.nextRecommendation) { isMobile ? classToCheck.push("_ixuggsz") : classToCheck.push("_1kkrg8oi"); }
        if (features.repeatQuestion) classToCheck.push("_1abyu0ga");
        classToCheck.forEach(className => {
            const element = document.querySelector(`.${className}`);
            if (element) {
                element.click();
                if (element.textContent === 'Mostrar resumo') { sendToast("🎉 Exercício concluido!", 3000); playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav'); }
            }
        });
    }

    // ... (rest of the main functions) ...
}

// ... (rest of the code with improvements)

//Plugin loading refactor.
async function loadPlugin(url, pluginName, onload) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${pluginName}: ${response.status} ${response.statusText}`);
      }
      const script = document.createElement('script');
      script.src = url;
      script.onload = onload;
      script.onerror = () => {
        console.error(`Error loading ${pluginName}`);
      }
      document.body.appendChild(script);
      loadedPlugins.push(pluginName);
    } catch (error) {
      console.error(`Failed to load plugin ${pluginName}: ${error}`);
      // Handle the error appropriately, e.g., display a message to the user.
    }
  }

//Load Plugins
loadPlugin('https://raw.githubusercontent.com/adryd325/oneko.js/refs/heads/main/oneko.js', 'onekoJs', () => {
  const onekoEl = document.getElementById('oneko');
  onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')";
  onekoEl.style.display = "none";
})
loadPlugin('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin', () => {
    DarkReader.setFetchMethod(window.fetch);
    DarkReader.enable();
});
loadPlugin('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin', async () => {
  //...
})
