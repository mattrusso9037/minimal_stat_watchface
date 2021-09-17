import {settingsStorage} from 'settings';
import * as messaging from 'messaging';
import {EventItem} from './EventItem';
import {outbox} from 'file-transfer';
import {device} from 'peer';
import {ImageItem} from "../common/ImageItem";

settingsStorage.setItem('screenWidth', device.screen.width);
settingsStorage.setItem('screenHeight', device.screen.height);

settingsStorage.onchange = (evt) => {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        switch (evt.key) {
            case 'PrimaryColor':
            case 'SecondaryColor':
                const item = new EventItem(evt.key, JSON.parse(evt.newValue))

                console.log('DATA: ', item);
                messaging.peerSocket.send(item);
                break;
            case 'image':
                compressAndTransferImage(evt.newValue);
                break;
        }
    }
}

/**
 * Compress photo and initiate file transfer.
 * @param settingsValue
 * @returns {Promise<void>}
 */
async function compressAndTransferImage(settingsValue) {
    const imageData = JSON.parse(settingsValue);
    const item = new ImageItem(imageData.imageUri);

    await item.compress();

    const fileTransfer = await outbox.enqueue(`${Date.now()}.jpg`, item.buffer);

    console.log(`Enqueued ${fileTransfer.name}`);
}