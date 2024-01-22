
let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');

export const saveTokens = (newAccessToken, newRefreshToken) => {
    accessToken = newAccessToken;
    refreshToken = newRefreshToken;
    localStorage.setItem('accessToken',newAccessToken)
    localStorage.setItem('refreshToken',newRefreshToken)
}

export const clearTokens = () => {
    accessToken = null
    refreshToken = null
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

export const getAccessToken = () => accessToken;

export const getRefreshToken = () => refreshToken;

export const setAccessToken = (token) =>{localStorage.setItem('accessToken', token)};

export const setRefreshToken = (rtoken) =>{localStorage.setItem('refreshToken', rtoken)};