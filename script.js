
let allEvents = JSON.parse(localStorage.getItem("todoData")) || [];
render();


function addTask() {
    const input = document.getElementById("input");
    if (input.value === "") return;

    const newEvent = {
        title: input.value,
        tasks: [], 
        active: false
    };

    allEvents.push(newEvent);
    input.value = "";
    saveAndRefresh();
}


function addSubTask(eventIndex) {
    const taskText = prompt("Enter task for " + allEvents[eventIndex].title + ":");
    if (taskText) {
        allEvents[eventIndex].tasks.push(taskText);
        saveAndRefresh();
    }
}


function render() {
    const list = document.getElementById("list");
    list.innerHTML = ""; // Clear list

    allEvents.forEach((event, eIndex) => {

        const li = document.createElement("li");
        if (event.active) li.classList.add("active");
        

        li.innerHTML = `
            ${event.title}
            <span onclick="deleteEvent(${eIndex})">\u00d7</span>
            <div class="addTask" onclick="addSubTask(${eIndex})">\u00d7</div>
        `;


        if (event.tasks.length > 0) {
            const subUl = document.createElement("ul");
            event.tasks.forEach((task, tIndex) => {
                const subLi = document.createElement("li");
                subLi.className = "act"; 
                subLi.innerHTML = `${task} <small onclick="deleteSubTask (${eIndex}, ${tIndex})"> (remove)</small>`;
                subUl.appendChild(subLi);
            });
            li.appendChild(subUl);
        }


        li.addEventListener("click", function(e) {
            if (e.target.tagName === "LI") {
                allEvents[eIndex].active = !allEvents[eIndex].active;
                saveAndRefresh();
            }
        }, false);

        list.appendChild(li);
    });
}


function saveAndRefresh() {
    localStorage.setItem("todoData", JSON.stringify(allEvents));
    render();
}

function deleteEvent(index) {
    allEvents.splice(index, 1);
    saveAndRefresh();
}

function deleteSubTask(eIdx, tIdx) {
    allEvents[eIdx].tasks.splice(tIdx, 1);
    saveAndRefresh();

}
