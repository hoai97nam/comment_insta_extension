var ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/77.0.3865.90 Chrome/77.0.3865.90 Safari/537.36";
ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25";
var uaApp = "Instagram 10.2.2 Android (18/4.3; 320dpi; 720x1280; Huawei; HWEVA; EVA-L18; qcom; en_US)", targetPage = "https://*instagram.com*";
function rewriteUserAgentHeader(a) {
    a.requestHeaders.forEach(function (a) { "user-agent" == a.name.toLowerCase() && (a.value = ua, console.log("rewrite")) });
    return { requestHeaders: a.requestHeaders }
} function rewriteUserAgentHeaderApp(a) {
    a.requestHeaders.forEach(function (a) {
        "user-agent" == a.name.toLowerCase() && (a.value = uaApp, console.log("rewrite"))
    });
    return { requestHeaders: a.requestHeaders }
}
chrome.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader,
    { urls: ["https://www.instagram.com/*", "https://instagram.com/*"] },
    ["blocking", "requestHeaders"]);
chrome.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeaderApp, { urls: ["https://i.instagram.com/*"] },
    ["blocking", "requestHeaders"]);
chrome.runtime.setUninstallURL("https://www.fbmessagecleaner.com/GramBot/uninstall.php?version=" + chrome.runtime.getManifest().version + "&browser=chrome", function (a) { console.log(a) });
chrome.runtime.onMessage.addListener(function (a, b, c) {
    switch (a.req) {
        case ACTION_OWNER_ID: return console.log("start queryOwnerId"), b = "https://i.instagram.com/api/v1/users/" + encodeURIComponent(a.owner) + "/info/", fetch(b).then(function (a) { return a.json() }).then(function (a) { c(a) }), !0;
        case ACTION_SEND_MESSAGE:
            chrome.storage.local.set({ categories: a.cat }, function () { }),
            chrome.storage.local.set({ tempsattente: a.tempsattente }, function () { }),
            chrome.tabs.getSelected(null, function (b) {
                chrome.tabs.sendRequest(b.id, { type: "CheckLicence", req: a })
            })
    }
});
