document.addEventListener("DOMContentLoaded", function () {
    const jobTitles = ["Web Developer", "App Developer", "Web Designer"];
    let index = 0;

    function updateJobTitle() {
        const jobTitleElement = document.getElementById("job-title");
        if (!jobTitleElement) return;

        const currentText = jobTitles[index];
        let i = 0;

        // Höhe des h1-Elements speichern
        const originalHeight = jobTitleElement.clientHeight + "px";

        function type() {
            if (i < currentText.length) {
                jobTitleElement.innerHTML += currentText.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(deleteText, 1000);
            }
        }

        function deleteText() {
            if (i >= 0) {
                const truncatedText = currentText.substring(0, i);
                jobTitleElement.innerHTML = truncatedText + "&nbsp;"; // Non-Breaking Space
                i--;
                setTimeout(deleteText, 50);
            } else {
                // Feste Höhe für das h1-Element setzen
                jobTitleElement.style.height = originalHeight;
                index = (index + 1) % jobTitles.length;
                setTimeout(updateJobTitle, 500);
            }
        }

        type();
    }

    updateJobTitle();
});

