import { me as appbit } from "appbit";

export const METRIC_UPDATE_INTERVAL = 1000;
// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

/**
 * Checks if user has granted a given permission
 * @param permissionKey
 * @returns {*}
 */
export function hasPermission(permissionKey) {
  return appbit.permissions.granted(permissionKey);
}

export const Setting = {
  Theme: 'theme',
};

export function getSetting(key) {
  return Setting[key];
}
