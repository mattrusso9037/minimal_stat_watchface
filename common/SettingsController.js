import * as fs from 'fs';

const SETTINGS_FILE = 'settings.cbor';
const SETTINGS_TYPE = 'cbor';
const DEFAULT_SETTINGS = {
    backgroundImagePath: '',
    PrimaryColor: 'white',
    SecondaryColor: 'white',
}

export class SettingsController {
    constructor() {
        this.settings = null;
    }

    save() {
        fs.writeFileSync(SETTINGS_FILE, this.settings, SETTINGS_TYPE);
    }

    load() {
        try {
            this.settings = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
        } catch (e) {
             this.settings = DEFAULT_SETTINGS;
        }
    }

    getBackgroundImagePath() {
        if (this.settings === null) {
            this.load();
        }
        return this.settings.backgroundImagePath;
    }
    /**
     *
     * @param imgPath {string}
     */
    setBackgroundImage(imgPath) {
        this.settings.backgroundImagePath = imgPath;
    }

    setThemeColor(colorKey, value) {
        this.settings[colorKey] = value;
    }

    getTheme() {
        return {
            PrimaryColor: this.settings.PrimaryColor ?? DEFAULT_SETTINGS.PrimaryColor,
            SecondaryColor: this.settings.SecondaryColor ?? DEFAULT_SETTINGS.SecondaryColor,
        }
    }
}