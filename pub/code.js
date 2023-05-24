// Envia la petición get cuando carga la página
sendGetRequest('/files', function (response) {
  showFileList(response.files);
});

// Función para enviar una solicitud GET al servidor
function sendGetRequest(url, callback) {
    fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.error(error));
}

// Función para enviar una solicitud POST al servidor
function sendPostRequest(url, data, callback) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => console.error(error));
  }

