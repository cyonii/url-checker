const urlInput = document.getElementById('url-input');
const urlForm = document.getElementById('url-form');
const submitButton = document.getElementById('submit-button');
const resultWrapper = document.getElementById('result-wrapper');

// Utilitiy functions
const isValidUrl = (url) => {
  const pattern = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  return url.match(pattern) !== null;
};

const postUrl = async (data) => {
  const types = ['file', 'folder'];

  if (Math.round(Math.random() * 1) === 1) {
    return Promise.resolve({
      data: {
        exists: true,
        url: data.url,
        type: types[Math.floor(Math.random() * types.length)],
      },
    });
  }

  return Promise.reject(Error('Not found'));
};
