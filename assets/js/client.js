(function() {
    'use strict';
    
    window.addEventListener('load', function load() {
        var ID      = '542d66148f16fecd57241a1a',
            url     = ['https://app.debitoor.com/login/oauth2/authorize?client_id=', ID, '&response_type=code'].join(''),
            linkEl  = document.querySelector('[data-name=js-sign-in]');
        
        linkEl.href = url;
        
        window.removeEventListener('load', load);
    });
})();
