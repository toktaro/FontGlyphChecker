# Font Glyph Checker

A simple web tool to check the glyphs contained in a font file.

This application allows you to easily view all the characters (glyphs) included in a font file (.ttf, .otf, .woff, .woff2) directly in your browser.

## Live Demo

**You can try the application here:**

**[https://<your-github-username>.github.io/<your-repository-name>/](https://<your-github-username>.github.io/<your-repository-name>/)**

*Please replace the link above with your actual GitHub Pages URL after deployment.*

## Screenshot

![App Screenshot](./screenshot.png)
*Please replace this with an actual screenshot of the application.*

## Features

- **Font File Upload**: Upload fonts via drag & drop or file selection.
- **Glyph Display**: Displays all glyphs contained in the font.
- **Live Font Rendering**: Renders each glyph using the uploaded font itself.
- **Copy to Clipboard**: Copies all characters as a single string to the clipboard.
- **Download as Text**: Downloads the complete character list as a `.txt` file.
- **No Server Required**: Runs entirely in the browser.

## How to Use

1.  Clone this repository or download the files.
2.  Open the `index.html` file in your web browser.

For more stable performance, it is recommended to run a simple local web server.
```bash
python3 -m http.server
```
Then, open `http://localhost:8000` in your browser.

## Technologies Used

- HTML
- CSS
- Plain JavaScript
- [opentype.js](https://github.com/opentypejs/opentype.js)

## Author

- toktaro

## License

This project is provided under a custom license. See the [LICENSE](LICENSE) file for details.
