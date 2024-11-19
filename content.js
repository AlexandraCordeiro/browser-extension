function applyFont() {
    const fontStyle = document.createElement("style");
    fontStyle.innerHTML = `
        @font-face {
            font-family: 'OpenDyslexic-Regular';
            src: url('${browser.runtime.getURL("fonts/OpenDyslexic-Regular.woff")}') format('woff');
            font-weight: normal;
            font-style: normal;
        }
        
        body, * {
            font-family: 'OpenDyslexic-Regular' !important;
        }
    `;
    document.head.appendChild(fontStyle);
}


function removeFont() {
    document.querySelectorAll("style").forEach((style) => {
        if (style.innerHTML.includes("OpenDyslexic-Regular")) {
            style.remove();
        }
    });
}

function enableDarkMode() {
    document.querySelector('html').style.filter = "invert(1) hue-rotate(180deg)"
    let media = document.querySelectorAll("img, picture, video");

    media.forEach(item => {
        item.style.filter = "invert(1) hue-rotate(180deg)";
    });
}

function disableDarkMode() {
    document.querySelector('html').style.filter = "invert(0) hue-rotate(0deg)"
    let media = document.querySelectorAll("img, picture, video");

    media.forEach(item => {
        item.style.filter = "invert(0) hue-rotate(0deg)";
    });
}

browser.runtime.onMessage.addListener((message) => {
    if (message.action === "applyFont") {
        applyFont();
        browser.storage.local.set({"fontApplied": "true"});
    } else if (message.action === "removeFont") {
        removeFont();
        browser.storage.local.set({"fontApplied": "false"});
    } else if (message.action === "darkMode") {
        enableDarkMode();
        browser.storage.local.set({"darkMode": "true"});
    } else if (message.action === "lightMode") {
        disableDarkMode();
        browser.storage.local.set({"darkMode": "false"});
    }
});

(async () => {
    const fontSettings = await browser.storage.local.get("fontApplied");
    if (fontSettings.fontApplied === "true") {
        applyFont();
    }

    const darkModeSettings = await browser.storage.local.get("darkMode");
    if (darkModeSettings.darkMode === "true") {
        enableDarkMode();
    }
})();