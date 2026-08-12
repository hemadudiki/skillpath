const fromSkill = document.getElementById("fromSkill");
const toSkill = document.getElementById("toSkill");
const result = document.getElementById("result");

// Load skills for "From Skill"
fetch("/api/skills")
    .then(response => response.json())
    .then(skills => {

        skills.forEach(skill => {

            const option = document.createElement("option");
            option.value = skill;
            option.textContent = skill;

            fromSkill.appendChild(option);
        });

    })
    .catch(error => {
        result.innerHTML = "Unable to load skills. Please try again.";
        console.error(error);
    });

// Load targets for "To Skill / Target"
fetch("/api/targets")
    .then(response => response.json())
    .then(targets => {

        targets.forEach(target => {

            const option = document.createElement("option");
            option.value = target;
            option.textContent = target;

            toSkill.appendChild(option);
        });

    })
    .catch(error => {
        result.innerHTML = "Unable to load targets. Please try again.";
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