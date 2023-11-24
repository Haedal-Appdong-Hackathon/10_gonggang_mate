document.addEventListener('DOMContentLoaded', function () {
    createTimetable();
    document.getElementById('timetable').addEventListener('click', showModal);
    document.querySelector('.close').addEventListener('click', hideModal);
    document.getElementById('add-lecture-btn').addEventListener('click', addLecture);
});

function createTimetable() {
    const timetable = document.getElementById('timetable');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // 테이블 헤더 생성
    const headerRow = timetable.insertRow();
    headerRow.insertCell(); // 빈 셀
    for (const day of days) {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = day;
    }

    // 시간대별 행 생성
    for (let hour = 9; hour <= 18; hour++) {
        const row = timetable.insertRow();
        const timeCell = row.insertCell();
        timeCell.textContent = `${hour}:00 - ${hour + 1}:00`;

        for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
            const cell = row.insertCell();
            cell.setAttribute('data-day', days[dayIndex]);
            cell.setAttribute('data-hour', hour);
        }
    }
}

function showModal(event) {
    const cell = event.target;
    if (cell.tagName === 'TD' && cell.textContent.trim() === '') {
        const modal = document.getElementById('modal');
        modal.style.display = 'block';

        const daySelect = document.getElementById('day');
        const startTimeInput = document.getElementById('start-time');
        const endTimeInput = document.getElementById('end-time');
        const colorInput = document.getElementById('color');

        daySelect.value = cell.getAttribute('data-day');
        startTimeInput.value = `${cell.getAttribute('data-hour')}:00`;
        endTimeInput.value = `${parseInt(cell.getAttribute('data-hour')) + 1}:00`;
        colorInput.value = '#ff0000';
    }
}

function hideModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function addLecture() {
    const lectureInput = document.getElementById('lecture');
    const daySelect = document.getElementById('day');
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    const colorInput = document.getElementById('color');

    const lecture = lectureInput.value;
    const day = daySelect.value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
    const color = colorInput.value;

    const cell = document.querySelector(`[data-day='${day}'][data-hour='${parseInt(startTime)}']`);
    if (cell) {
        cell.textContent = lecture;
        cell.style.backgroundColor = color;
    }

    hideModal();
}
