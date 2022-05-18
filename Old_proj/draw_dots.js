
document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    var dot, eventDoc, doc, body, pageX, pageY;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are, calculate pageX/Y - logic taken from jQuery
    // Calculate pageX/Y if missing and clientX/Y available
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop	|| body && body.scrollTop	|| 0) -
            (doc && doc.clientTop	|| body && body.clientTop	|| 0 );
    }

    // Add a dot to follow the cursor
    dot = document.createElement('div');
    dot.className = "myClass";
    dot.style.left = event.pageX + "px"; // upper left point
    dot.style.top = event.pageY + "px"; // upper right point
    document.body.appendChild(dot);
}