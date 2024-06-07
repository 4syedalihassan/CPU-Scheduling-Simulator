// script.js

document.addEventListener('DOMContentLoaded', (event) => {
    const resultTable = document.getElementById('resultTable');
    const ganttChart = document.getElementById('ganttChart');
    const averageTimes = document.getElementById('averageTimes');
    const algorithm = document.getElementById('algorithm');
    const arrivalTimes = document.getElementById('arrivalTimes');
    const burstTimes = document.getElementById('burstTimes');
    const timeQuantumField = document.getElementById('timeQuantumField');
    const timeQuantum = document.getElementById('timeQuantum');

    // Clear default selection and inputs
    algorithm.selectedIndex = -1;
    arrivalTimes.value = '';
    burstTimes.value = '';
    timeQuantumField.style.display = 'none';
    timeQuantum.value = '';

    // Default message in the output sections
    resultTable.innerHTML = '<tr><td colspan="6">Results will be shown here.</td></tr>';
    ganttChart.innerHTML = 'Gantt chart will be shown here.';
    averageTimes.innerHTML = '';
});

function toggleTimeQuantumField() {
    const algorithm = document.getElementById('algorithm').value;
    const timeQuantumField = document.getElementById('timeQuantumField');
    timeQuantumField.style.display = algorithm === 'rr' ? 'block' : 'none';
}

function solve() {
    const algorithm = document.getElementById('algorithm').value;
    const arrivalTimesInput = document.getElementById('arrivalTimes').value.trim();
    const burstTimesInput = document.getElementById('burstTimes').value.trim();

    if (!arrivalTimesInput || !burstTimesInput) {
        alert('Please enter both arrival times and burst times.');
        clearOutput();
        return;
    }

    if (!validateInput(arrivalTimesInput) || !validateInput(burstTimesInput)) {
        alert('Please enter valid integer values separated by spaces.');
        clearOutput();
        return;
    }

    const arrivalTimes = parseInput(arrivalTimesInput);
    const burstTimes = parseInput(burstTimesInput);

    if (arrivalTimes.length !== burstTimes.length) {
        alert('Arrival times and burst times must have the same length.');
        clearOutput();
        return;
    }

    let result;

    switch (algorithm) {
        case 'fcfs':
            result = solveFCFS(arrivalTimes, burstTimes);
            break;
        case 'sjf':
            result = solveSJF(arrivalTimes, burstTimes);
            break;
        case 'srtf':
            result = solveSRTF(arrivalTimes, burstTimes);
            break;
        case 'hrrn':
            result = solveHRRN(arrivalTimes, burstTimes);
            break;
        case 'rr':
            const timeQuantum = parseInt(document.getElementById('timeQuantum').value);
            if (isNaN(timeQuantum) || timeQuantum <= 0) {
                alert('Time Quantum must be a positive integer.');
                clearOutput();
                return;
            }
            result = solveRR(arrivalTimes, burstTimes, timeQuantum);
            break;
        default:
            result = [];
    }

    displayResult(result, algorithm);
}

function validateInput(inputString) {
    return inputString.split(' ').every(value => /^\d+$/.test(value));
}

function parseInput(inputString) {
    return inputString.split(' ').map(Number);
}

function displayResult(result, algorithm) {
    const resultTable = document.getElementById('resultTable');
    const ganttChart = document.getElementById('ganttChart');
    const averageTimes = document.getElementById('averageTimes');

    resultTable.innerHTML = '';
    ganttChart.innerHTML = '';

    if (result.length === 0) {
        clearOutput();
        return;
    }

    const tableHeader = `
        <tr>
            <th>Process ID</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Completion Time</th>
            <th>Turnaround Time</th>
            <th>Waiting Time</th>
        </tr>
    `;
    resultTable.innerHTML = tableHeader;

    let totalTurnaroundTime = 0;
    let totalWaitingTime = 0;
    let ganttData = [];

    result.forEach((process, i) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${process.id}</td>
            <td>${process.arrivalTime}</td>
            <td>${process.burstTime}</td>
            <td>${process.completionTime}</td>
            <td>${process.turnaroundTime}</td>
            <td>${process.waitingTime}</td>
        `;
        resultTable.appendChild(row);

        totalTurnaroundTime += process.turnaroundTime;
        totalWaitingTime += process.waitingTime;

        if (algorithm === 'fcfs' || algorithm === 'sjf' || algorithm === 'hrrn') {
            ganttData.push({
                id: process.id,
                start: process.completionTime - process.burstTime,
                stop: process.completionTime,
            });
        } else if (algorithm === 'srtf' || algorithm === 'rr') {
            ganttData = ganttData.concat(process.ganttChartInfo);
        }
    });

    const avgTurnaroundTime = (totalTurnaroundTime / result.length).toFixed(3);
    const avgWaitingTime = (totalWaitingTime / result.length).toFixed(3);

    averageTimes.innerHTML = `
        Average Turnaround Time: ${avgTurnaroundTime} <br>
        Average Waiting Time: ${avgWaitingTime}
    `;

    const jobContainer = document.createElement('div');
    jobContainer.className = 'jobContainer';
    const timeContainer = document.createElement('div');
    timeContainer.className = 'timeContainer';

    ganttData.sort((a, b) => a.start - b.start);

    let timeValues = [];
    ganttData.forEach((item, index) => {
        const jobDiv = document.createElement('div');
        jobDiv.className = 'job';
        jobDiv.innerText = item.id;
        jobContainer.appendChild(jobDiv);

        if (index === 0) {
            timeValues.push(item.start, item.stop);
        } else {
            timeValues.push(item.stop);
        }
    });

    timeValues.forEach((time, index) => {
        const timeDiv = document.createElement('div');
        timeDiv.className = 'time';
        timeDiv.innerText = time;
        timeContainer.appendChild(timeDiv);
    });

    ganttChart.appendChild(jobContainer);
    ganttChart.appendChild(timeContainer);
}

function clearOutput() {
    const resultTable = document.getElementById('resultTable');
    const ganttChart = document.getElementById('ganttChart');
    const averageTimes = document.getElementById('averageTimes');

    resultTable.innerHTML = '<tr><td colspan="6">Results will be shown here.</td></tr>';
    ganttChart.innerHTML = 'Gantt chart will be shown here.';
    averageTimes.innerHTML = '';
}