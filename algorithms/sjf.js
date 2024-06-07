// algorithms/sjf.js

function solveSJF(arrivalTimes, burstTimes) {
    let n = arrivalTimes.length;
    let processes = arrivalTimes.map((at, i) => ({
        id: String.fromCharCode(65 + i),
        arrivalTime: at,
        burstTime: burstTimes[i],
        completionTime: 0,
        turnaroundTime: 0,
        waitingTime: 0,
        ganttChartInfo: []
    }));

    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let completed = 0;

    while (completed < n) {
        let eligibleProcesses = processes.filter(p => p.arrivalTime <= currentTime && p.completionTime === 0);
        if (eligibleProcesses.length === 0) {
            currentTime++;
            continue;
        }
        eligibleProcesses.sort((a, b) => a.burstTime - b.burstTime);
        let process = eligibleProcesses[0];

        let startTime = currentTime;
        currentTime += process.burstTime;
        process.completionTime = currentTime;
        process.turnaroundTime = process.completionTime - process.arrivalTime;
        process.waitingTime = process.turnaroundTime - process.burstTime;

        process.ganttChartInfo.push({
            id: process.id,
            start: startTime,
            stop: currentTime,
        });

        completed++;
    }

    return processes;
}