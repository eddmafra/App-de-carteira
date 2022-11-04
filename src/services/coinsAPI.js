async function coinsAPI() {
  const API = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(API);
  const response = await request.json();
  return response;
}

export default coinsAPI;
