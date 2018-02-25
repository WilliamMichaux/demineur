var startTime;
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

    document.getElementById("chrono").innerHTML = min + ":" + sec;
    timerID = setTimeout("chrono()",10);
}

function chronoStart() {
    start = new Date();
    console.log("coucou");
    chrono();
}

function chronoStop() {
    clearTimeout(timerID);
}

function chronoReset() {
    clearTimeout(timerID);
    document.getElementById("chrono").innerHTML = "00:00";

}
