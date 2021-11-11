const urlInput = document.getElementById('url-input');
const resultWrapper = document.getElementById('result-wrapper');

// ===================
// Utility functions
// ===================
const isValidUrl = (url) => {
  const pattern = /^(?:\w+?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

  return pattern.test(url);
};

const getSample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const postUrl = async (url) => { // mocked server response
  const exists = getSample([true, false]);
  const type = exists ? getSample(['file', 'folder']) : null;

  return Promise.resolve({ data: { url, exists, type } });
};

const throttle = (fn, delay = 1000) => { // throttles function calls
  let lastCall = 0;

  return (...args) => {
    const now = new Date().getTime();

    if (now - lastCall < delay) return;
    lastCall = now;

    fn(...args);
  };
};

// ===================
// DOM manipulation
// ===================
const resultTemplate = (data) => `
  <h2>Result</h2>

  <div id="result-container">
    URL: ${data.url} <br />
    Exists: ${data.exists} <br />
    Type: ${data.type}
  </div>
`;

const updateResult = ({ data }) => {
  resultWrapper.innerHTML = resultTemplate(data);
};

const updateFormValidity = () => {
  const { value } = urlInput;

  if (value.length === 0) {
    urlInput.classList.remove('is-invalid');
    urlInput.classList.remove('is-valid');
  } else if (isValidUrl(value)) {
    urlInput.classList.remove('is-invalid');
    urlInput.classList.add('is-valid');
  } else {
    urlInput.classList.remove('is-valid');
    urlInput.classList.add('is-invalid');
  }
};

const handleUrlInput = async (event) => {
  resultWrapper.innerHTML = '';

  updateFormValidity();

  const { value } = event.target;
  if (isValidUrl(value)) {
    postUrl(value)
      .then(updateResult)
      .catch((err) => err);
  }
};

// ===================
// Event listeners
// ===================
urlInput.oninput = handleUrlInput;
