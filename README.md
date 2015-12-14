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
* `then`: Callback for when the request is finished.


```javascript
function then (error, requestObject) { /* ... */ }
```

* `error`: An `Error` instance or `null` when there are no errors.
* `requestObject`: The finished `XMLHttpRequest` instance.
