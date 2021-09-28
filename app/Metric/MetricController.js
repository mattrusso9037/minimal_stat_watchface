import {metricConfig, MetricId} from './metricConfig';
import {HeartRate} from './HeartRate';
import {CanvasController} from './CanvasController';
import {Goal} from './Goal';
import document from 'document';

const DEFAULT_METRIC_INDEX = 0;
export class MetricController {
    /*
    * @param container This is the container element
    */
    constructor() {
        this.activeIndex = DEFAULT_METRIC_INDEX;
        this.container = document.getElementById('metric_container');
        this.heartRate = new HeartRate();
        this.element = new CanvasController(this.container);
        this.goal = new Goal();

        this.draw();
        this.initializeEventListeners();
    }

    getMetricById(id) {
        return metricConfig.find((metric) => metric.id === id);
    }

    draw() {
        this.setElementImage();
        this.setElementText();
    }

    toggleMetric() {
        const nextIndex = ++this.activeIndex;

        if (nextIndex > metricConfig.length - 1) {
            // this.sensors[metricConfig.length - 1].onStop();
            this.activeIndex = DEFAULT_METRIC_INDEX;
        } else {
            // this.sensors[this.activeIndex].onStop();
            this.activeIndex = nextIndex;
        }

        if (this.heartRateIsActive()) {
            this.heartRate.onStart();
        } else {
            this.heartRate.onStop();
        }

        this.draw();
    }

    heartRateIsActive() {
        return metricConfig[this.activeIndex].id === MetricId.Bpm;
    }

    getActiveMetric() {
        return metricConfig[this.activeIndex];
    }

    /**
     * Gets the value of the active metric
     * @returns {string|*}
     */
    getActiveStatValue() {
        switch (this.getActiveMetric().id) {
            case MetricId.Bpm:
                return this.heartRate.getLatestBpm();
            case MetricId.Steps:
                return this.goal.getSteps();
            case MetricId.Calories:
                return this.goal.getCalories();
            case MetricId.Distance:
                return this.goal.getDistanceByMiles();
            case MetricId.ZoneMinutes:
                return this.goal.getZoneMinutes();
            default:
                return 'Unsupported Stat';
        }
    }

    /**
     * Sets the label and value of the metric elements
     */
    setElementText() {
        this.element.getValue().text = this.getActiveStatValue() ?? '--';
        this.element.getLabel().text = this.getActiveMetric().label;
    }

    /**
     * Sets the metric image's src based on the active metric
     */
    setElementImage() {
        this.element.getStatIcon().href = `icons/${this.getActiveMetric().icon}`;
    }

    /**
     * Sets onClick event for container
     */
    initializeEventListeners() {
        this.container.addEventListener('click', () => this.toggleMetric());
    }
}
