import Constants from "expo-constants";

let SERVER_IP = "localhost"; // fallback

if (Constants.expoConfig?.hostUri) {
  SERVER_IP = Constants.expoConfig.hostUri.split(":")[0];
}

export const API_URL = `http://${SERVER_IP}:5050/api`;
