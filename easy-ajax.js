
(function () {
    
    var HTTP_STATUS_OK = 200;
    var READY_STATE_UNSENT = 0;
    var READY_STATE_OPENED = 1;
    var READY_STATE_HEADERS_RECEIVED = 2;
    var READY_STATE_LOADING = 3;
    var READY_STATE_DONE = 4;
    
    function ajax (method, url, options, then) {
        
        var timeout, data;
        
        var requestObject = XMLHttpRequest ?
            new XMLHttpRequest() :
            new ActiveXObject("Microsoft.XMLHTTP");
        
        options = options || {};
        
        if (typeof options === "function" && !then) {
            then = options;
            options = {};
        }
        
        then = then || function () {};
        data = ("data" in options) ? options.data : undefined;
        timeout = options.timeout;
        url += options.randomize ? "?random=" + Math.random() : "";
        
        requestObject.open(method, url, true);
        
        if (timeout) {
            
            requestObject.timeout = timeout;
            
            requestObject.ontimeout = function () {
                
                requestObject.abort();
                
                then(new Error("Connection reached timeout of " + timeout + " ms."), requestObject);
            };
        }
        
        requestObject.onreadystatechange = function() {
            
            var done, statusOk;
            
            done = requestObject.readyState === READY_STATE_DONE;
            
            if (done) {
                
                try {
                    statusOk = requestObject.status === HTTP_STATUS_OK;
                }
                catch (error) {
                    console.error(error);
                    statusOk = false;
                }
                
                if (statusOk) {
                    then(null, requestObject);
                }
                else {
                    then(new Error("AJAX request wasn't successful."), requestObject);
                }
            }
        };
        
        if (data) {
            requestObject.send(data);
        }
        else {
            requestObject.send();
        }
        
        return requestObject;
    }
    
    ajax.HTTP_STATUS_OK = HTTP_STATUS_OK;
    
    ajax.READY_STATE_UNSENT = READY_STATE_UNSENT;
    ajax.READY_STATE_OPENED = READY_STATE_OPENED;
    ajax.READY_STATE_HEADERS_RECEIVED = READY_STATE_HEADERS_RECEIVED;
    ajax.READY_STATE_LOADING = READY_STATE_LOADING;
    ajax.READY_STATE_DONE = READY_STATE_DONE;
    
    ajax.HTTP_METHOD_GET = "GET";
    ajax.HTTP_METHOD_POST = "POST";
    ajax.HTTP_METHOD_PUT = "PUT";
    ajax.HTTP_METHOD_DELETE = "DELETE";
    ajax.HTTP_METHOD_HEAD = "HEAD";
    
    ajax.get = function (url, options, then) {
        return ajax(ajax.HTTP_METHOD_GET, url, options, then);
    };
    
    ajax.post = function (url, data, options, then) {
        
        if (typeof options === "function" && !then) {
            then = options;
            options = {};
        }
        
        options.data = data;
        
        return ajax(ajax.HTTP_METHOD_POST, url, options, then);
    };
    
    if (typeof require === "function") {
        module.exports = ajax;
    }
    else {
        window.ajax = ajax;
    }
    
}());
