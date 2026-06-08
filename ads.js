(function() {
    const CONFIG = {
        enableHeaderAd: true,
        enableTopStickyAd: true
    };

    window.runAds = function() {
        window.open('https://braverybreezebinding.com/dyu6kzr44?key=703bc4908bfdd21b148e4fe03f9810cb', '_blank');
    };

    function injectAdIsolated(container, adKey, width, height, scriptSrc) {
        const iframe = document.createElement('iframe');
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.scrolling = 'no';
        
        // Logika Responsif: Jika layar < lebar iklan, maka scale down
        const screenWidth = window.innerWidth;
        if (screenWidth < width) {
            const scale = screenWidth / width;
            iframe.style.width = width + 'px';
            iframe.style.height = height + 'px';
            iframe.style.transform = `scale(${scale})`;
            iframe.style.transformOrigin = 'top center';
            container.style.height = (height * scale) + 'px';
        } else {
            iframe.style.width = width + 'px';
            iframe.style.height = height + 'px';
        }
        
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
        // Header Ad (Iklan di dalam tag header)
        if (CONFIG.enableHeaderAd) {
            const header = document.querySelector('header');
            if (header) {
                const headerAdContainer = document.createElement('div');
                headerAdContainer.style.cssText = 'display:flex; justify-content:center; align-items:center; flex-grow:1; max-width:320px; height:50px; overflow:hidden; margin-left:auto;';
                header.appendChild(headerAdContainer);
                injectAdIsolated(headerAdContainer, 'baa0afb18e2e70c00e4c1406e4824e4b', 320, 50, 'https://braverybreezebinding.com/baa0afb18e2e70c00e4c1406e4824e4b/invoke.js');
            }
        }

        // Top Sticky Ad (Iklan Sticky di bagian paling atas layar)
        if (CONFIG.enableTopStickyAd) {
            const topAdContainer = document.createElement('div');
            topAdContainer.id = 'sticky-ad-wrapper';
            
            // Posisi di top, z-index tinggi, box-sizing untuk responsif
            topAdContainer.style.cssText = 'position:fixed; top:0; left:50%; transform:translateX(-50%); z-index:10000; width:100%; max-width:728px; display:flex; justify-content:center; align-items:center; background-color:rgba(24, 36, 54, 0.9); box-shadow:0 4px 12px rgba(0,0,0,0.5); overflow:visible; box-sizing:border-box;';
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            // Tombol close pindah ke bawah iklan agar mudah diakses
            closeBtn.style.cssText = 'position:absolute; bottom:-25px; right:0; background:rgba(0,0,0,0.6); color:white; border:none; cursor:pointer; font-size:16px; padding:2px 8px; border-radius:0 0 4px 4px;';
            closeBtn.onclick = function() { 
                topAdContainer.style.display = 'none'; 
                document.body.style.paddingTop = '0px'; // Reset padding saat iklan ditutup
            };
            
            topAdContainer.appendChild(closeBtn);
            document.body.appendChild(topAdContainer);

            // Memberi ruang pada body agar konten tidak tertutup iklan
            document.body.style.paddingTop = '90px';

            injectAdIsolated(topAdContainer, '64e783bd557c30cbf66293b5c5fda05f', 728, 90, 'https://braverybreezebinding.com/64e783bd557c30cbf66293b5c5fda05f/invoke.js');
        }
    });
})();
