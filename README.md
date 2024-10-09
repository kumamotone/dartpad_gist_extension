# DartPad Gist Publisher Chrome Extension

This Chrome extension allows users to easily publish code snippets from DartPad to GitHub Gists directly from their browser.

## Features

- Securely save your GitHub token within the extension
- Publish Dart code snippets from DartPad to GitHub Gists with a single click
- View links to both the created Gist and its DartPad equivalent
- Adds a "Publish to Gist" button directly on DartPad for easy access

## Installation

1. Clone this repository or download the ZIP file and extract it.
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

### Getting a GitHub Token

Before using the extension, you need to create a GitHub Personal Access Token:

1. Go to your GitHub account settings.
2. Click on "Developer settings" in the left sidebar.
3. Select "Personal access tokens" and then "Tokens (classic)".
4. Click "Generate new token" and select "Generate new token (classic)".
5. Give your token a descriptive name.
6. For scopes, select at least "gist" to allow the extension to create gists.
7. Click "Generate token" at the bottom of the page.
8. Copy the generated token immediately. You won't be able to see it again!

### Using the Extension

1. Click on the extension icon in your Chrome toolbar to open the popup.
2. Paste your GitHub token in the provided field and click "Save Token".
3. Navigate to DartPad (https://dartpad.dev).
4. To publish a code snippet:
   - Option 1: Click the "Publish to Gist" button added to the DartPad interface
   - Option 2: Click the "Publish to Gist" button in the extension popup
5. After publishing, a new tab with the DartPad URL of your published Gist will open automatically.

## Development

This extension is built using HTML, CSS, and JavaScript. The main files are:

- `popup.html`: The UI for the extension popup
- `popup.js`: The JavaScript logic for the popup
- `content.js`: Injects the "Publish to Gist" button into DartPad and handles the publishing process
- `background.js`: Handles background processes and communication
- `manifest.json`: Extension configuration file

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.