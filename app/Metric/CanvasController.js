import document from 'document';

export class CanvasController {
    constructor(settings) {
        this.statImage = document.getElementById('metric_img');
        this.statContainer = document.getElementById('active_stat_group');
        this.bckImg = document.getElementById('bck_img');
        this.clock = document.getElementById('time_container');
        this.date = document.getElementById('date_container');
        /*@type {SettingsController}*/
        this.settings = settings;
    }

    /**
     * Returns the image element within the stat container
     * @returns {Element}
     */
    getStatIcon() {
        return this.statImage;
    }

    getBackgroundImage() {
        return this.bckImg;
    }

    getClock() {
        return this.clock;
    }

    getValue() {
        return this.statContainer.children[0];
    }

    getLabel() {
        return this.statContainer.children[1];
    }

    getDate() {
        return this.date;
    }

    setDate() {
        const today = new Date();
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.date.text = `${weekDays[today.getDay()]} | ${months[today.getMonth()]} ${today.getDate()}`;
    }

    applyTheme() {
        const theme = this.settings.getTheme();
        this.getClock().style.fill = theme.PrimaryColor;
        // this.getValue().style.fill = theme.PrimaryColor;
        this.getStatIcon().style.fill = theme.PrimaryColor;

        this.getLabel().style.fill = theme.SecondaryColor;
        this.getDate().style.fill = theme.SecondaryColor;
    }

}