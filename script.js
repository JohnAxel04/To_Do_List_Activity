// 1. Storage: Try to get data from the browser, or start with empty list []
let allEvents = JSON.parse(localStorage.getItem("todoData")) || [];
render();

// 2. Add an Event (The "Parent")
function addTask() {
    const input = document.getElementById("input");
    if (input.value === "") return;

    const newEvent = {
        title: input.value,
        tasks: [], // This is where child tasks go
        active: false
    };

    allEvents.push(newEvent);
    input.value = "";
    saveAndRefresh();
}

// 3. Add a Task (The "Child")
function addSubTask(eventIndex) {
    const taskText = prompt("Enter task for " + allEvents[eventIndex].title + ":");
    if (taskText) {
        allEvents[eventIndex].tasks.push(taskText);
        saveAndRefresh();
    }
}

// 4. The "Chef" - Builds the HTML to match your CSS
function render() {
    const list = document.getElementById("list");
    list.innerHTML = ""; // Clear list

    allEvents.forEach((event, eIndex) => {
        // Create the main Event LI
        const li = document.createElement("li");
        if (event.active) li.classList.add("active");
        
        // Add text and the "X" span from your CSS
        li.innerHTML = `
            ${event.title}
            <span onclick="deleteEvent(${eIndex})">\u00d7</span>
            <div class="addTask" onclick="addSubTask(${eIndex})">\u00d7</div>
        `;

        // Check if there are nested tasks to show
        if (event.tasks.length > 0) {
            const subUl = document.createElement("ul");
            event.tasks.forEach((task, tIndex) => {
                const subLi = document.createElement("li");
                subLi.className = "act"; // Matches your .act CSS
                subLi.innerHTML = `${task} <small onclick="deleteSubTask (${eIndex}, ${tIndex})"> (remove)</small>`;
                subUl.appendChild(subLi);
            });
            li.appendChild(subUl);
        }

        // Toggle "Active" (Checked) state when clicking the title
        li.addEventListener("click", function(e) {
            if (e.target.tagName === "LI") {
                allEvents[eIndex].active = !allEvents[eIndex].active;
                saveAndRefresh();
            }
        }, false);

        list.appendChild(li);
    });
}

// Helper functions
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