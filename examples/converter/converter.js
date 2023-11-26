function convertTemperature() {
    var inputTemp = document.getElementById("inputTemp").value;
    var selectType = document.getElementById("selectType").value;
    var giphy = document.getElementById("giphy");

    if (selectType === "C") {
        var outputTemp = (inputTemp * 9/5) + 32;
        document.getElementById("outputTemp").innerHTML = outputTemp.toFixed(2) + " F";
    } else if (selectType === "F") {
        var outputTemp = (inputTemp - 32) * 5/9;
        document.getElementById("outputTemp").innerHTML = outputTemp.toFixed(2) + " C";
    } else {
        alert("Please select a unit.");
    }

    if (selectType === "F") {
        giphy.innerHTML = "";
        if (outputTemp < 0) {
            var gif = new Image();
            gif.src = "https://media.giphy.com/media/KFUx0Rtz7p0HTzbJ7x/giphy.gif";
            giphy.appendChild(gif);
        } else if (outputTemp >= 0 && outputTemp <= 20) {
            var gif = new Image();
            gif.src = "https://media.giphy.com/media/oOJgH2a9Y4uW4SDjIf/giphy.gif";
            giphy.appendChild(gif);
        } else if (outputTemp > 20 && outputTemp < 30) {
            var gif = new Image();
            gif.src = "https://media.giphy.com/media/cn3RsQVenr8uPfVsK7/giphy.gif";
            giphy.appendChild(gif);
        } else if (outputTemp > 30) {
            var gif = new Image();
            gif.src = "https://media.giphy.com/media/P7JmDW7IkB7TW/giphy.gif";
            giphy.appendChild(gif);
        }
    }

    else if (selectType === "C") {
        giphy.innerHTML = "";
        if (outputTemp < 32) {
            var gif = new Image();
            gif.src = "https://media.giphy.com/media/KFUx0Rtz7p0HTzbJ7x/giphy.gif";
            giphy.appendChild(gif);
        } else if (outputTemp >= 32 && outputTemp <= 68) {
            var gif = new Image();
            gif.src = "https://media.giphy.com/media/oOJgH2a9Y4uW4SDjIf/giphy.gif";
            giphy.appendChild(gif);
        } else if (outputTemp >= 68 && outputTemp <= 86) {
            var gif = new Image();
            gif.src = "https://media.giphy.com/media/cn3RsQVenr8uPfVsK7/giphy.gif";
            giphy.appendChild(gif);
        } else if (outputTemp > 86) {
            var gif = new Image();
            gif.src = "https://media.giphy.com/media/P7JmDW7IkB7TW/giphy.gif";
            giphy.appendChild(gif);
        }
    }
}

