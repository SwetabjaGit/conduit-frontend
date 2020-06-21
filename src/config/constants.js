let serverUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000/socialape-d8699/asia-east2/api'
  : 'https://asia-east2-socialape-d8699.cloudfunctions.net/api';

console.log({ serverUrl });

module.exports = {
  API_BASE_URL: serverUrl,
  SCREAMS_URL: serverUrl + '/scream/screams',
  SCREAMS_PAGE_SIZE: 7,
};