const uploadInput = document.getElementById('image-upload');
const fileNameLabel = document.getElementById('file-name-label');  // Assuming you have an element for the filename
const imagePreview = document.getElementById('preview-image');
const previewsection =  document.getElementById('preview-section');
const previewimage = document.getElementById('image-preview');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');
const labeltiles = document.getElementById('label-tiles');
const labeltilesresult = document.getElementById('label-tiles-result');

// imagePreview.style.opacity = 0; 
// previewsection.style.opacity = 0; 
uploadInput.addEventListener('change', async (event) => {
  const selectedFile = event.target.files[0];

  if (!selectedFile) {
    console.error('No file selected');   

    return;
  }

  const fileName = selectedFile.name;
  fileNameLabel.textContent = fileName;
  imagePreview.style.opacity = 1;
  previewsection.style.opacity = 1;

  try {
    // Read the image file as data URL
    const reader = new FileReader();
    const imageDataPromise = new Promise((resolve, reject) => {
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(selectedFile);
    });

    // Create thumbnail image (optional)
    const thumbnailPromise = imageDataPromise.then(async (dataUrl) => {
      const img = new Image();
      img.src = dataUrl;
      await img.decode(); // Ensure image is loaded before processing

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const thumbnailWidth = 100; // Adjust as needed
      const thumbnailHeight = 100; // Adjust as needed

      canvas.width = thumbnailWidth;
      canvas.height = thumbnailHeight;
      ctx.drawImage(img, 0, 0, thumbnailWidth, thumbnailHeight);

      return canvas.toDataURL('image/jpeg'); // Or 'image/png'
    });

    // Send the image data to the API (async/await)
    const [base64Data, thumbnailData] = await Promise.all([imageDataPromise, thumbnailPromise]);
    const apiEndpoint = 'https://mizhtwr2eg.execute-api.ap-south-1.amazonaws.com/dev/sgVisualSearchDemo';

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // mode: 'cors', // Consider using CORS if applicable
      body: JSON.stringify({ imageData: base64Data, thumbnail: thumbnailData || null }) // Include thumbnail if available
    });

    console.log(response);
    // if (response.ok) {
      const data = await response.json();
      console.log(data);
      const imageUrls = data.body; // Access the image URLs from the response

      // Do something with the image URLs (e.g., display them)
      console.log(imageUrls);
    // } else {
    //   console.error('Error fetching image URLs:', response.statusText);
    // }
  } catch (error) {
    console.error('Error:', error);
    // Handle errors (display error message, etc.)
  } finally {
    // Optional: Reset UI elements after processing
    imagePreview.src = '';
    imagePreview.style.opacity = 0;
    previewsection.style.opacity = 0;
  }
});
// previewButton.addEventListener('click', () => {
//     imagePreview.style.display = 'flex';
//   });


searchButton.addEventListener('click', () => {
    // Simulate search results (replace with your actual API call)
    const imageUrls = ['Q4004_4_1.jpg', 'Q4012_4_2 (1).jpg', 'Q4012_4_2.jpg'];
  
    // Clear previous results
    resultsContainer.innerHTML = '';
    previewimage.style.opacity = 1; 
    labeltiles.style.opacity =1;
    labeltilesresult.style.opacity = 1;
    // Create image elements and append to results container
    imageUrls.forEach(imageUrl => {
      const img = document.createElement('img');
      img.src = imageUrl;
      resultsContainer.appendChild(img);
    });
  });
