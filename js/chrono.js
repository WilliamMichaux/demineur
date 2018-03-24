var start = 0;
var end = 0;
var diff = 0;
var timerID;

function chrono() {
    end = new Date();
    diff = end - start;
    diff = new Date(diff);

    var sec = diff.getSeconds();
    var min = diff.getMinutes();

    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }

    $("#chrono").text(min + ":" + sec);
    timerID = setTimeout("chrono()",10);
}

function chronoStart() {
    start = new Date();
    chrono();
}

function chronoStop() {
    clearTimeout(timerID);
}

function chronoReset() {
    clearTimeout(timerID);
    $("#chrono").text("00:00");

}
