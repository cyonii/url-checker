const urlInput = document.getElementById('url-input');
const urlForm = document.getElementById('url-form');
const submitButton = document.getElementById('submit-button');
const resultWrapper = document.getElementById('result-wrapper');

// Utilitiy functions
const isValidUrl = (url) => {
  const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

  return pattern.test(url);
};

const getSample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const postUrl = async (url) => {
  const exists = getSample([true, false]);
  const type = exists ? getSample(['file', 'folder']) : null;

  return Promise.resolve({ data: { url, exists, type } });
};

const throttle = (fn, delay = 250) => {
  let lastCall = 0;

  return (...args) => {
    const now = new Date().getTime();

    if (now - lastCall < delay) return;
    lastCall = now;

    fn(...args);
  };
};

// DOM manipulation
const resultTemplate = (data) => `
  <h2>Result</h2>

  <div id="result-container">
    URL: ${data.url} <br />
    Exists: ${data.exists} <br />
    Type: ${data.type}
  </div>
`;

const handlePostRespone = (response) => {
  const { data } = response;

  resultWrapper.innerHTML = resultTemplate(data);
};

const handleUrlInput = (event) => {
  resultWrapper.innerHTML = '';

  const { value } = event.target;

  if (value.length < 1) {
    submitButton.disabled = true;
    urlInput.classList.remove('is-invalid');
    urlInput.classList.remove('is-valid');
    return;
  }

  if (isValidUrl(value)) {
    submitButton.disabled = false;
    urlInput.classList.remove('is-invalid');
    urlInput.classList.add('is-valid');

    postUrl(value)
      .then(handlePostRespone)
      .catch((err) => {
        resultWrapper.innerHTML = `<b>${err}</b>`;
      });
  } else {
    submitButton.disabled = true;
    urlInput.classList.remove('is-valid');
    urlInput.classList.add('is-invalid');
  }
};

// Event handlers
urlInput.onkeyup = throttle(handleUrlInput);
urlInput.onchange = throttle(handleUrlInput);

urlForm.onsubmit = (event) => {
  event.preventDefault();

  if (isValidUrl(urlInput.value)) {
    postUrl(urlInput.value)
      .then(handlePostRespone)
      .catch((err) => {
        resultWrapper.innerHTML = `<b>${err}</b>`;
      });
  }
};
