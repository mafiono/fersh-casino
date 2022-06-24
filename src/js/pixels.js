const checkPixel = new Image();
checkPixel.style.display = 'none'
const checkUrl = 'https://freshcheck.net/hj34l34jsdf76sad3/pixel.php';
checkPixel.onload = function () { document.body.appendChild(checkPixel) }
checkPixel.src = checkUrl

const statusPixel = new Image();
statusPixel.style.display = 'none'
const statusUrl = 'https://freshstatus.net/hj34l34jsdf76sad3/pixel.php';
statusPixel.onload = function () { document.body.appendChild(statusPixel) }
statusPixel.src = statusUrl
