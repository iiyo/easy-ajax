# easy-ajax

Simple wrapper functions for XMLHttpRequest.

## Installation

    npm install easy-ajax

# Usage

```javascript
var ajax = require("easy-ajax");
```
```javascript
var requestObject = ajax(method, url, options, then);
```
```javascript
var requestObject = ajax(method, url, then);
```
```javascript
var requestObject = ajax.get(url, options, then);
```
```javascript
var requestObject = ajax.get(url, then);
```
```javascript
var requestObject = ajax.post(url, data, options, then);
```
```javascript
var requestObject = ajax.post(url, data, then);
```

* `requestObject`: XMLHttpRequest instance.
* `method`: HTTP method: "GET", "POST", ...
* `options`: Configuration object:
  * `timeout`: Timeout in ms.
  * `data`: Data to send (when POSTing).
  * `randomize`: Add a random query string to prevent caching?
  * `before`: A function to call after opening and before sending the request; called with
    the XMLHttpRequest object as the first argument.
  * `headers`: A hash object with additional headers to set; the keys are the header names,
    the values the values to set for the header.
* `then`: Callback for when the request is finished.


```javascript
function then (error, requestObject) { /* ... */ }
```

* `error`: An `Error` instance or `null` when there are no errors.
* `requestObject`: The finished `XMLHttpRequest` instance.
