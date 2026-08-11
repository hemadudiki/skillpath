const fromSkill = document.getElementById("fromSkill");
const toSkill = document.getElementById("toSkill");
const result = document.getElementById("result");

// Load skills from our Java backend
fetch("/api/skills")
    .then(response => response.json())
    .then(skills => {

        skills.forEach(skill => {

            const option1 = document.createElement("option");
            option1.value = skill;
            option1.textContent = skill;

            const option2 = document.createElement("option");
            option2.value = skill;
            option2.textContent = skill;

            fromSkill.appendChild(option1);
            toSkill.appendChild(option2);
        });

    })
    .catch(error => {
        result.innerHTML = "Unable to load skills. Please try again.";
        console.error(error);
    });


// Find path between two skills
function findPath() {

    const from = fromSkill.value;
    const to = toSkill.value;

    if (from === "" || to === "") {
        result.innerHTML = "Please select both skills.";
        return;
    }

    if (from === to) {
        result.innerHTML = "Please select two different skills.";
        return;
    }

    result.innerHTML = "Finding your learning path...";

    fetch(`/api/path?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
        .then(response => response.json())
        .then(data => {

            if (data.length === 0) {
                result.innerHTML =
                    "No learning path found between these skills.";
                return;
            }

            const path = data[0].path;

            let html = "<h3>Learning Path</h3>";
            html += '<div class="path">';

            path.forEach((skill, index) => {

                html += `<span>${skill}</span>`;

                if (index < path.length - 1) {
                    html += '<span class="arrow">&rarr;</span>';
                }

            });

            html += "</div>";

            result.innerHTML = html;
        })
        .catch(error => {

            result.innerHTML =
                "Something went wrong while finding the path.";

            console.error(error);
        });
}