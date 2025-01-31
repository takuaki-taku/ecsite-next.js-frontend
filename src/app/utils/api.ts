const fetchWithToken = async (url, options = {}) => {
    const accessToken = localStorage.getItem('access_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
    };
    const response = await fetch(url, { ...options, headers });
  
    if (!response.ok) {
      // エラーレスポンスを処理
      const errorData = await response.json();
      throw new Error(errorData.detail || `API request failed with status ${response.status}`);
    }
  
    return response.json();
  };
  
  export default fetchWithToken;