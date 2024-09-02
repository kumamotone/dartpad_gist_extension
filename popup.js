document.addEventListener('DOMContentLoaded', () => {
  // 既に保存されているトークンを取得して表示する
  chrome.storage.local.get('githubToken', (data) => {
      if (data.githubToken) {
          document.getElementById('token').value = data.githubToken;
      }
  });

  // トークン保存ボタンのイベントリスナー
  document.getElementById('save').addEventListener('click', () => {
      const token = document.getElementById('token').value;
      if (token) {
          chrome.storage.local.set({ githubToken: token }, () => {
              alert('Token saved successfully!');
          });
      } else {
          alert('Please enter a GitHub Token before saving.');
      }
  });

  // Gist公開ボタンのイベントリスナー
  document.getElementById('publish').addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: () => {
                return Array.from(document.querySelectorAll('.CodeMirror-line'))
                .map(line => line.textContent)
                .join('\n')
                .replace(/\u00A0/g, ' ')  // ノーブレークスペース (160) を通常のスペースに変換
                .replace(/\u200B/g, '')   // ゼロ幅スペース (8203) を削除
                .replace(/[^\x00-\x7F]/g, ''); // それ以外の非ASCII文字を削除
            }
          }, (results) => {
              const code = results[0].result;
              if (code) {
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
              } else {
                  alert('Couldn\'t find the CodeMirror Editor or it\'s not initialized. Please make sure DartPad is loaded correctly.');
              }
          });
      });
  });
});