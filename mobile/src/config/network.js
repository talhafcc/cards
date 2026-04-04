export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://192.168.4.77:3000";

// Keep socket endpoint explicit so it can differ from REST when needed.
export const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL || API_BASE_URL;
