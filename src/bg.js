/*
 *	Cookies interceptor
 *	Sergey Poterianski
 *	http://poterianski.ru/
 */
chrome.webRequest.onCompleted.addListener(
    // Grab requests
    function(details) {
        'use strict';
        add_request('request_complete', details);
        return {cancel: false};
    },
    {urls: ["http://*/*", "https://*/*"]}, ["responseHeaders"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        'use strict';
        add_request('before_headers', details);
        return {cancel: false};
    },
    {urls: ["http://*/*", "https://*/*"]}, ["requestHeaders"]
);


function add_request(eventType, details){
    'use strict';
    if(details.hasOwnProperty('responseHeaders')){
        for(var h in details.responseHeaders){
            if(!details.responseHeaders.hasOwnProperty(h)){
                continue;
            }
            if(!details.responseHeaders[h].hasOwnProperty('name') ||
                !details.responseHeaders[h].hasOwnProperty('value')){
                continue;
            }
            else if(details.responseHeaders[h].name.toString().toLowerCase() === 'set-cookie'){
                console.log(eventType, 'set-cookie', JSON.stringify(details.responseHeaders[h]));
                continue;
            }
        }
    }
    if(details.hasOwnProperty('requestHeaders')){
        for(var h in details.requestHeaders){
            if(!details.requestHeaders.hasOwnProperty(h)){
                continue;
            }
            if(!details.requestHeaders[h].hasOwnProperty('name') ||
               !details.requestHeaders[h].hasOwnProperty('value')){
                continue;
            }
            if(details.requestHeaders[h].name.toString().toLowerCase() === 'cookie'){
                console.log(eventType, 'cookies', JSON.stringify(details.requestHeaders[h]));
                continue;
            }
        }
    }
}
