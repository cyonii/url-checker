const urlInput = document.getElementById('url-input');
const urlForm = document.getElementById('url-form');
const submitButton = document.getElementById('submit-button');
const resultWrapper = document.getElementById('result-wrapper');

// Utilitiy functions
const isValidUrl = (url) => {
  const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

  return url.match(pattern) !== null;
};

const postUrl = async (url) => {
  const types = ['file', 'folder'];

  if (Math.round(Math.random() * 1) === 1) {
    return Promise.resolve({
      data: {
        url,
        exists: true,
        type: types[Math.floor(Math.random() * types.length)],
      },
    });
  }

  return Promise.reject(Error('Not found'));
};

// DOM manipulation
const resultTemplate = (data) => `
  <div id="result-wrapper">
    <h2>Result</h2>

    <div id="result-container">
      URL: ${data.url} <br />
      Exists: ${data.exists} <br />
      Type: ${data.type}
    </div>
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

    postUrl(value.trim())
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
urlInput.onkeyup = handleUrlInput;
urlInput.onchange = handleUrlInput;
urlForm.onsubmit = (event) => {
  event.preventDefault();

  if (isValidUrl(urlInput.value)) {
    postUrl(urlInput.value.trim())
      .then(handlePostRespone)
      .catch((err) => {
        resultWrapper.innerHTML = `<b>${err}</b>`;
      });
  }
};
