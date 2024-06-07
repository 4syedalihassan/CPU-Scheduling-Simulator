// srtf.js

function solveSRTF(arrivalTimes, burstTimes) {
    const n = arrivalTimes.length;
    const processIds = Array.from({ length: n }, (_, i) => String.fromCharCode(65 + i));
    const processes = arrivalTimes.map((arrivalTime, index) => ({
        id: processIds[index],
        arrivalTime,
        burstTime: burstTimes[index],
        remainingTime: burstTimes[index],
        completionTime: 0,
        turnaroundTime: 0,
        waitingTime: 0,
        ganttChartInfo: [],
    }));

    let time = 0;
    let completed = 0;
    let minRemainingTime = Infinity;
    let shortest = null;
    let check = false;

    while (completed !== n) {
        for (let j = 0; j < n; j++) {
            if (processes[j].arrivalTime <= time && processes[j].remainingTime < minRemainingTime && processes[j].remainingTime > 0) {
                minRemainingTime = processes[j].remainingTime;
                shortest = j;
                check = true;
            }
        }

        if (!check) {
            time++;
            continue;
        }

        processes[shortest].remainingTime--;
        minRemainingTime = processes[shortest].remainingTime === 0 ? Infinity : processes[shortest].remainingTime;

        if (processes[shortest].remainingTime === 0) {
            completed++;
            check = false;
            processes[shortest].completionTime = time + 1;
            processes[shortest].turnaroundTime = processes[shortest].completionTime - processes[shortest].arrivalTime;
            processes[shortest].waitingTime = processes[shortest].turnaroundTime - processes[shortest].burstTime;
        }

        const ganttChartLength = processes[shortest].ganttChartInfo.length;
        if (ganttChartLength > 0 && processes[shortest].ganttChartInfo[ganttChartLength - 1].stop === time) {
            processes[shortest].ganttChartInfo[ganttChartLength - 1].stop = time + 1;
        } else {
            processes[shortest].ganttChartInfo.push({ id: processes[shortest].id, start: time, stop: time + 1 });
        }

        time++;
    }

    return processes;
}