import {HeartRateSensor} from 'heart-rate';
import {hasPermission} from '../../common/utils';
import {AbstractMetric} from './AbstractMetric';

export class HeartRate extends AbstractMetric {
    constructor() {
        super();
        this.currentBpm = null;
        this.sensor = new HeartRateSensor({frequency: 1});
        this.initSensor();
    }

    initSensor() {
        if (this.hasSensor() && hasPermission('access_heart_rate')) {
            this.onStart();
        }
    }

    onStart() {
        this.sensor.addEventListener('reading', this.onRead);
        this.sensor.start();
    }

    onStop() {
        this.currentBpm = null;
        this.sensor.stop();
        this.sensor.removeEventListener('reading', this.onRead);
    }

    /**
     * This is an arrow function to prevent this scoping issues. Since onRead uses this.sensor, it needs to use
     * the "this" from its parent.
     */
    onRead = () => {
        this.currentBpm = this.sensor.heartRate;
    }

    hasSensor() {
        return HeartRateSensor !== undefined;
    }

    getLatestBpm() {
        return this.currentBpm;
    }
}