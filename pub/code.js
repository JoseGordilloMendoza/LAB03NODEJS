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

// Función para mostrar la lista de archivos Markdown
function showFileList(files) {
  const fileList = document.getElementById('file-list');
  fileList.innerHTML = "";

  files.forEach((file) => {
    const listItem = document.createElement('li');
    listItem.textContent = file;
    fileList.appendChild(listItem);
  });
}

// Manejar la creación de un nuevo archivo Markdown
const createForm = document.getElementById('create-form');
createForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const filenameInput = document.getElementById('filename');
  const contentInput = document.getElementById('content');
  // Se elimina los espacios en blanco al principio de las variables para evitar problemas
  const filename = filenameInput.value.trim();
  const content = contentInput.value.trim();

  // Se asegura que ambos campos no esten vacios
  if (filename && content) {
    const data = { filename: filename, content: content };
    sendPostRequest('/setfile', data, function (response) {
      console.log(response.message);
      filenameInput.value = '';
      contentInput.value = '';
      sendGetRequest('/files', function (response) {
        showFileList(response.files);
      });
    }); 
  }
  // Manejar el clic en un archivo Markdown de la lista
      const fileList = document.getElementById('file-list');
      fileList.addEventListener('click', function (event) {
          console.log("funciona :V");
        const filename = event.target.textContent;
        sendGetRequest(`/gethtml?nombre=${filename}`, function (response) {
          showMarkdownContent(response.htmlContent);
        });
      });
  
  // Función para mostrar el contenido HTML de un archivo Markdown
      function showMarkdownContent(htmlContent) {
        const markdownContent = document.getElementById('markdown-content');
        markdownContent.innerHTML = htmlContent;
      }
});
