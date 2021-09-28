import {MetricController} from './Metric/MetricController';
import {ClockController} from './Clock/ClockController';
import {HEART_RATE_INTERVAL} from '../common/utils';
import {CanvasController} from './Metric/CanvasController';
import {peerSocket} from 'messaging';
import {inbox} from 'file-transfer';
import {SettingsController} from '../common/SettingsController';
import {display} from 'display';
import {MetricId} from './Metric/metricConfig';

const Metric = new MetricController();
const Clock = new ClockController();
const Settings = new SettingsController();
const Canvas = new CanvasController(Settings);
let tickInterval;

initSettings();
Clock.onStart();
initInterval(HEART_RATE_INTERVAL);

function initInterval(timeInMs) {
    tickInterval = setInterval(() => {
        if (display.on) {
            Metric.draw();
        }
    }, timeInMs);
}

peerSocket.onmessage = (event) => {
    /** @type {EventItem} */
    const item = event.data;
    console.log('Event: ', item.data);

    switch (item.id) {
        case 'PrimaryColor':
        case 'SecondaryColor':
            Settings.setThemeColor(item.id, item.data);
            Settings.save();
            Canvas.applyTheme();
            break;
    }
}

/**
 * Image File Transfer
 */
inbox.onnewfile = () => {
    let fileName;
    do {
        fileName = inbox.nextFile();
        if (fileName) {
            console.log('FNAME: ', fileName);
            const imagePath = `/private/data/${fileName}`;

            Settings.setBackgroundImage(imagePath);
            Settings.save();
            Canvas.getBackgroundImage().href = imagePath;
        }
    } while (fileName);
};

function shouldStartHeartrate() {
    return display.on && Metric.getActiveMetric().id === MetricId.Bpm;
}

/**
 * Display On/Off
 */
display.addEventListener('change', () => {
    if (shouldStartHeartrate()) {
        Metric.heartRate.onStart();
        initInterval(HEART_RATE_INTERVAL);
    } else {
        Metric.heartRate.onStop();
    }

    if (!display.on) {
        clearInterval(tickInterval);
    }
});

function initSettings() {
    Settings.load();
    Canvas.getBackgroundImage().href = Settings.getBackgroundImagePath();
    Canvas.applyTheme();
    Canvas.setDate();
}
