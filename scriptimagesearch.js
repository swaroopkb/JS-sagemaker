const uploadInput = document.getElementById('image-upload');
const fileNameLabel = document.getElementById('file-name-label');  // Assuming you have an element for the filename
const imagePreview = document.getElementById('preview-image');
const previewsection = document.getElementById('preview-section');
const previewimage = document.getElementById('image-preview');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');
const labeltiles = document.getElementById('label-tiles');
const labeltilesresult = document.getElementById('label-tiles-result');

// imagePreview.style.opacity = 0; 
// previewsection.style.opacity = 0; 
uploadInput.addEventListener('change', (event) => {
  const selectedFile = event.target.files[0];
  const fileName = selectedFile.name;

  if (selectedFile) {
    const reader = new FileReader();
    //  imagePreview.src = '';
    fileNameLabel.textContent = fileName;
    imagePreview.style.opacity = 1;
    previewsection.style.opacity = 1;
    reader.onload = (e) => {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Desired thumbnail dimensions
        const thumbnailWidth = 100;  // Adjust as needed
        const thumbnailHeight = 100; // Adjust as needed

        canvas.width = thumbnailWidth;
        canvas.height = thumbnailHeight;
        ctx.drawImage(img, 0, 0, thumbnailWidth, thumbnailHeight);

        imagePreview.src = canvas.toDataURL('image/jpeg');  // Or 'image/png'
      };
      img.src = e.target.result;
      const base64Data = e.target.result;
      // Replace with your API endpoint and other necessary logic
      const apiEndpoint = 'https://mizhtwr2eg.execute-api.ap-south-1.amazonaws.com/default/sgVisualSearchDemo';

      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageData: base64Data })
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
    reader.readAsDataURL(selectedFile);
    imagePreview.style.opacity = 1;
    previewsection.style.opacity = 1;
  } else {
    fileNameLabel.textContent = '';
    imagePreview.src = '';
    imagePreview.style.opacity = 0;
    previewsection.style.opacity = 0;


    // imagePreview.style.display = 'none'; // Hide the image preview
  }

  // Update the label or textbox with the filename
  // For label
  // fileNameLabel.value = fileName;       // For textbox (if using one)
});

// previewButton.addEventListener('click', () => {
//     imagePreview.style.display = 'flex';
//   });
function uploadImage() {
  const fileInput = document.getElementById('imageUpload');

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64Data = e.target.result;

      // Replace with your API endpoint and other necessary logic
      const apiEndpoint = 'https://your-api-gateway-endpoint';

      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageData: base64Data })
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };

    reader.readAsDataURL(file);
  }
}

searchButton.addEventListener('click', () => {
  // Simulate search results (replace with your actual API call)
  const imageUrls = ['santiago.jpg', 'rio_upano.jpg', 'Q4012_4_2.jpg'];

  // Clear previous results
  resultsContainer.innerHTML = '';
  previewimage.style.opacity = 1;
  labeltiles.style.opacity = 1;
  labeltilesresult.style.opacity = 1;
  // Create image elements and append to results container
  imageUrls.forEach(imageUrl => {
    // const img = document.createElement('img');
    // img.src = imageUrl;
    // resultsContainer.appendChild(img);
    const col = document.createElement('div');
    col.classList.add('col-md-4'); // Adjust column size as needed
    const card = document.createElement('div');
    card.classList.add('card');


    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body',
      'shadow', 'p-4');

    const img = document.createElement('img');
    img.src = imageUrl;
    img.classList.add('img-fluid', 'shadow',);
    cardBody.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(img);
    resultsContainer.appendChild(col);
  });
});