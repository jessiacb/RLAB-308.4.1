import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = 'YOUR_API_KEY_HERE';

axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  document.body.style.cursor = 'progress';
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  document.body.style.cursor = 'default';
  return response;
});

// fetch cat breeds 
export async function fetchBreeds() {
  try {
    const response = await axios.get('/breeds');
    return response.data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
  }
}

// fetch images by breed
export async function fetchImagesByBreed(breedId) {
  try {
    const response = await axios.get(`/images/search?breed_id=${breedId}&limit=5`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}
function updateProgress(event) {
    const progressBar = document.getElementById('progressBar');
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      progressBar.style.width = percentComplete + '%';
    }
  }
  
  axios.defaults.onDownloadProgress = updateProgress;
  