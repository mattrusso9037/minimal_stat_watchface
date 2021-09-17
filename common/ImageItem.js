import { Image } from 'image';

export class ImageItem {
    constructor(uri) {
        this.uri = uri;
        this.buffer = null;
        this.IMAGE_QUALITY = 80;
    }

    async compress() {
        const image = await Image.from(this.uri);

        this.buffer = await image.export('image/jpeg', {
            background: '#FFFFFF',
            quality: this.IMAGE_QUALITY
        });
    }
}