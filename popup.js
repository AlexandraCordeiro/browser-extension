execute = false

var font = document.querySelector("input[name=font]");
var mode = document.querySelector("input[name=mode]");

font.addEventListener('change', changeFont);
mode.addEventListener('change', changeMode);

console.log(localStorage.getItem("darkMode"))
async function changeFont() {
    switchFont = !switchFont;
    const message = switchFont ? "applyFont" : "removeFont";
    console.log(message);

    const tabs = await browser.tabs.query({ url: ["http://*/*", "https://*/*"] });

    tabs.forEach(async (tab) => {
        try {
            await browser.tabs.executeScript(tab.id, { file: "content.js" });
            await browser.tabs.sendMessage(tab.id, { action: message });
        } catch (error) {
            console.warn(`Error ${tab.id}: ${error.message}`);
        }
    });
}
    
async function changeMode() {
    switchMode = !switchMode;
    const message = switchMode ? "darkMode" : "lightMode";
    console.log(message);

    const tabs = await browser.tabs.query({ url: ["http://*/*", "https://*/*"] });

    tabs.forEach(async (tab) => {
        try {
            await browser.tabs.executeScript(tab.id, { file: "content.js" });
            await browser.tabs.sendMessage(tab.id, { action: message });
        } catch (error) {
            console.warn(`Error ${tab.id}: ${error.message}`);
        }
    });
}

function goToLink() {
    console.log(this.id)
    let url
    switch(this.id) {
        case "pomodoro":
            url = "https://pomofocus.io/"
            break
        case "books":
            url = "https://www.digitalbook.io/"
            break
        case "list":
            url = "https://tweek.so/"
            break
        case "playlist":
            url = "https://www.youtube.com/@Lullablocks"
            break
    }
    window.open(url, '_blank').focus()
}


document.getElementById('pomodoro').onclick = goToLink;
document.getElementById('list').onclick = goToLink;
document.getElementById('books').onclick = goToLink;
document.getElementById('playlist').onclick = goToLink;


(async () => {
    if (!execute) {
        const fontSettings = await browser.storage.local.get("fontApplied");
        if (fontSettings.fontApplied === "true") {
            document.getElementById("font-id").checked = true
            switchFont = true            
        }
        else {
            switchFont = false
        }
    
        const darkModeSettings = await browser.storage.local.get("darkMode");
        if (darkModeSettings.darkMode === "true") {
            document.getElementById("dark-mode-id").checked = true
            switchMode = true
        }
        else {
            switchMode = false
        }

        execute = true
    }
})();