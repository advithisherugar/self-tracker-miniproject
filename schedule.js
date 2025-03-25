document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const eventModal = document.getElementById("eventModal");
    const closeModal = document.querySelector(".close");
    const eventTitleInput = document.getElementById("eventTitle");
    const saveEventBtn = document.getElementById("saveEvent");

    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem("events")) || {}; // Load events from local storage

    function renderCalendar() {
        calendar.innerHTML = "";
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        monthYear.textContent = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

        for (let i = 0; i < firstDay; i++) {
            let emptyDiv = document.createElement("div");
            calendar.appendChild(emptyDiv);
        }

        for (let day = 1; day <= lastDate; day++) {
            let dateDiv = document.createElement("div");
            dateDiv.classList.add("date");
            dateDiv.textContent = day;

            let fullDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;

            // Highlight if there's an event
            if (events[fullDate]) {
                dateDiv.style.backgroundColor = "#87CEFA";
                dateDiv.innerHTML += `<br><small>${events[fullDate]}</small>`;
            }

            // Open modal when clicking on a date
            dateDiv.addEventListener("click", () => openModal(fullDate));

            calendar.appendChild(dateDiv);
        }
    }

    function openModal(date) {
        eventModal.style.display = "block";
        eventTitleInput.value = events[date] || "";
        saveEventBtn.onclick = () => saveEvent(date);
    }

    function saveEvent(date) {
        const eventText = eventTitleInput.value.trim();
        if (eventText) {
            events[date] = eventText; // Add event
        } else {
            delete events[date]; // Remove event if input is empty
        }
        localStorage.setItem("events", JSON.stringify(events)); // Save to local storage
        eventModal.style.display = "none";
        renderCalendar(); // Refresh the calendar
    }

    closeModal.addEventListener("click", () => eventModal.style.display = "none");

    prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});



