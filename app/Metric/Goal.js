import { today } from 'user-activity';
import {hasPermission} from '../../common/utils';
import {AbstractMetric} from './AbstractMetric';

export class Goal extends AbstractMetric {
    constructor() {
        super();
        this.permissionKey = 'access_activity';
    }

    convertMetersToMiles(meters) {
        const MILE_DIVISOR = 1609;
        return (meters / MILE_DIVISOR).toFixed(2);
    }

    getCalories() {
        if (hasPermission(this.permissionKey)) {
            return today.adjusted.calories;
        }
        return '--';
    }

    getSteps() {
        if (hasPermission(this.permissionKey)) {
            return today.adjusted.steps;
        }
        return '--';
    }

    getDistanceByMiles() {
        if (hasPermission(this.permissionKey)) {
            return this.convertMetersToMiles(today.adjusted.distance);
        }
        return '--';
    }

    getZoneMinutes() {
        if (hasPermission(this.permissionKey)) {
            return today.adjusted.activeZoneMinutes.total;
        }
    }

    hasPermissions() {

    }

    onStart() {
        // super.onStart();
    }

    onStop() {
        // super.onStop();
    }
}