
(function() {
    const CONFIG = {
        enableHeaderAd: true,
        enableBottomStickyAd: true
    };

 
window.runAds = function() {
    window.open('https://braverybreezebinding.com/dyu6kzr44?key=703bc4908bfdd21b148e4fe03f9810cb', '_blank');
};

    function injectAdIsolated(container, adKey, width, height, scriptSrc) {
        const iframe = document.createElement('iframe');
        iframe.style.width = width + 'px';
        iframe.style.height = height + 'px';
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.scrolling = 'no';
        
        container.appendChild(iframe);
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        iframeDoc.open();
        iframeDoc.write(`
            <!DOCTYPE html>
            <html>
            <head><style>html, body { margin: 0; padding: 0; overflow: hidden; background: transparent; }</style></head>
            <body>
                <script type="text/javascript">
                    window.atOptions = { 'key' : '${adKey}', 'format' : 'iframe', 'height' : ${height}, 'width' : ${width}, 'params' : {} };
                </script>
                <script type="text/javascript" src="${scriptSrc}"></script>
            </body>
            </html>
        `);
        iframeDoc.close();
    }

    window.addEventListener('DOMContentLoaded', function() {
        
        if (CONFIG.enableHeaderAd) {
            const header = document.querySelector('header');
            if (header) {
                const headerAdContainer = document.createElement('div');
                headerAdContainer.style.cssText = 'display:flex; justify-content:center; align-items:center; flex-grow:1; max-width:320px; height:50px; overflow:hidden; margin-left:auto;';
                header.appendChild(headerAdContainer);
                injectAdIsolated(headerAdContainer, 'baa0afb18e2e70c00e4c1406e4824e4b', 320, 50, 'https://braverybreezebinding.com/baa0afb18e2e70c00e4c1406e4824e4b/invoke.js');
            }
        }

       
        if (CONFIG.enableBottomStickyAd) {
            const bottomAdContainer = document.createElement('div');
            bottomAdContainer.id = 'sticky-ad-wrapper';
            bottomAdContainer.style.cssText = 'position:fixed; bottom:0; left:50%; transform:translateX(-50%); z-index:9999; width:100%; max-width:728px; height:90px; display:flex; justify-content:center; align-items:center; background-color:rgba(24, 36, 54, 0.9); box-shadow:0 -4px 12px rgba(0,0,0,0.5); overflow:visible;';
            
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = 'position:absolute; top:-25px; right:0; background:rgba(0,0,0,0.6); color:white; border:none; cursor:pointer; font-size:16px; padding:2px 8px; border-radius:4px 4px 0 0;';
            closeBtn.onclick = function() { bottomAdContainer.style.display = 'none'; };
            
            bottomAdContainer.appendChild(closeBtn);
            document.body.appendChild(bottomAdContainer);

            injectAdIsolated(bottomAdContainer, '64e783bd557c30cbf66293b5c5fda05f', 728, 90, 'https://braverybreezebinding.com/64e783bd557c30cbf66293b5c5fda05f/invoke.js');
        }
    });
})();
