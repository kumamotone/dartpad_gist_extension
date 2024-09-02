// ページが完全に読み込まれたら実行する
document.addEventListener('DOMContentLoaded', () => {
  // ボタンの追加
  const publishButton = document.createElement('button');
  publishButton.innerText = 'Publish to Gist';
  publishButton.style.position = 'fixed';
  publishButton.style.top = '10px';
  publishButton.style.right = '100px';
  publishButton.style.zIndex = '1000';
  document.body.appendChild(publishButton);

  // ボタンのクリックイベント
  publishButton.addEventListener('click', () => {
      const codeMirrorElement = document.querySelector('.CodeMirror');

      if (!codeMirrorElement || !codeMirrorElement.CodeMirror) {
          alert('Couldn\'t find the CodeMirror Editor. Maybe DartPad is updated. Please contact the developer.');
          return;
      }

      const code = codeMirrorElement.CodeMirror.getValue();

      chrome.storage.local.get('githubToken', (data) => {
          const token = data.githubToken;
          if (!token) {
              alert('GitHub Token is not set. Please set it in the extension popup.');
              return;
          }

          // Gistの作成リクエスト
          fetch('https://api.github.com/gists', {
              method: 'POST',
              headers: {
                  'Authorization': `token ${token}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  description: "DartPad Gist",
                  public: true,
                  files: {
                      "main.dart": {
                          "content": code
                      }
                  }
              })
          })
          .then(response => response.json())
          .then(data => {
              if (data.id) {
                  const gistId = data.id;
                  const dartPadUrl = `https://dartpad.dev/?id=${gistId}`;
                  window.open(dartPadUrl, '_blank');
              } else {
                  alert('Failed to create Gist. Please check your token or try again later.');
                  console.error('Error:', data);
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('An error occurred while creating the Gist.');
          });
      });
  });
});