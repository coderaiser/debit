(function() {
    'use strict';
    
    var href        = window.location.href,
        request     = new XMLHttpRequest(),
        uploadEl    = document.querySelector('[data-name="js-upload"]'),
        submitEl    = document.querySelector('[data-name="js-submit"]'),
        loadEl      = document.querySelector('[data-name="js-load"]');
    
    uploadEl.addEventListener('change', function() {
        submitEl.disabled = !uploadEl.value;
    });
    
    submitEl.addEventListener('click', function(event) {
        var formElement = document.querySelector('[data-name="js-form"]'),
            formData = new FormData(formElement);
        
        loadEl.classList.remove('hiden');
        
        put(formData, function(error, data) {
            loadEl.classList.add('hiden');
            show(error, data);
        });
        
        event.preventDefault();
    });
    
    function show(error, data) {
        var el          = document.querySelector('[data-name="js-result"]');
        
        if (error) {
            el.classList.remove('alert-success');
            el.classList.add('alert-danger');
        } else {
            el.classList.remove('alert-danger');
            el.classList.add('alert-success');
        }
        
        el.innerText = data || error.message;
    }
    
    function put(data, callback) {
        request.open('POST', href, true);
        
        request.addEventListener('load', function() {
            var error,
                readyState  = request.readyState,
                status      = request.status;
            
            if (readyState === 4) {
                if (status !== 200)
                    error = {
                        message: request.responseText
                    };
                
                callback(error, request.responseText);
            }
        });
        
        request.send(data);
    }
})();
