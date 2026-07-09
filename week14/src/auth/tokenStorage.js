const ACCESS_KEY = "access";
const REFRESH_KEY = "refresh";

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

// localStorage에 저장
export const setToken = ({ accessToken, refreshToken }) => {
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
}

// localStorage에서 토큰 지우는 함수 (로그아웃시 사용)
export const clearTokens = () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
}