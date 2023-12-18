import enviroments from ".";
export function linkVigilio() {
    return "https://www.yonatan-vigilio.com";
}
export function NoProfileImage() {
    return `${enviroments.VITE_URL}/images/settings/no-profile.webp`;
}
export function logoImage() {
    return `${enviroments.VITE_URL}/images/logo.png`;
}

// map
export const coordMaps = { lat: -11.854602, lng: -77.071552 };
