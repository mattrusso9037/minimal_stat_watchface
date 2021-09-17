import { preferences } from 'user-settings';
import * as util from '../../common/utils';
import document from 'document';
import clock from 'clock';

export class ClockController {
    constructor() {
        this.clock = clock;
        this.container = document.getElementById('time_container');
        // Update the clock every minute
        this.clock.granularity = 'seconds';
    }

    onStart() {
        // Update the <text> element every tick with the current time
        this.clock.ontick = (evt) => {
            const today = evt.date;
            let hours = today.getHours();
            if (preferences.clockDisplay === '12h') {
                // 12h format
                hours = hours % 12 || 12;
            } else {
                // 24h format
                hours = util.zeroPad(hours);
            }
            const mins = util.zeroPad(today.getMinutes());

            this.container.text = `${hours}:${mins}`;
        }
    }
}