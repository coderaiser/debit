(function() {
    'use strict';
    
    var href        = window.location.href,
        request     = new XMLHttpRequest(),
        submitEl    = document.querySelector('[data-name="js-submit"]');
        
    
    submitEl.addEventListener('click', function(event) {
        var formElement = document.querySelector('[data-name="js-form"]'),
            formData = new FormData(formElement);
        
        put(formData, function(error, data) {
            if (error)
                console.log(error);
            else
                show(data);
        });
        
        event.preventDefault();
    });
    
    function show(data) {
        var el = document.querySelector('[data-name="js-result"]');
        
        el.classList.remove('hide');
        el.innerText = data;
    }
    
    function put(data, callback) {
        request.open('POST', href, true);
        
        request.addEventListener('error', function(event) {
            callback(event);
        });
        
        request.addEventListener('load', function(event) {
            if (request.status >= 200 && request.status < 400){
                callback(null, request.responseText);
            } else {
                callback(event);
            }
        });
        
        request.send(data);
    }
})();
