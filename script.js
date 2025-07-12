const dropZone = document.getElementById('drop-zone');
const fontFile = document.getElementById('font-file');
const glyphContainer = document.getElementById('glyph-container');
const fontInfo = document.getElementById('font-info');
const controls = document.getElementById('controls');
const copyButton = document.getElementById('copy-button');
const downloadButton = document.getElementById('download-button');
let fontFaceStyle = null;
let currentGlyphs = [];
let currentFontFamily = '';
let currentFontStyle = '';

dropZone.addEventListener('click', () => fontFile.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    loadFont(file);
});

fontFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    loadFont(file);
});

copyButton.addEventListener('click', () => {
    const text = currentGlyphs.join('');
    navigator.clipboard.writeText(text).then(() => {
        alert('クリップボードにコピーしました。');
    }, () => {
        alert('クリップボードへのコピーに失敗しました。');
    });
});

downloadButton.addEventListener('click', () => {
    const text = currentGlyphs.join('');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentFontFamily}_${currentFontStyle}_glyph-list.txt`;
    a.click();
    URL.revokeObjectURL(url);
});

function loadFont(file) {
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            if (fontFaceStyle) {
                document.head.removeChild(fontFaceStyle);
            }

            const fontUrl = URL.createObjectURL(file);
            fontFaceStyle = document.createElement('style');
            fontFaceStyle.innerHTML = `
                @font-face {
                    font-family: 'user-loaded-font';
                    src: url('${fontUrl}');
                }
            `;
            document.head.appendChild(fontFaceStyle);

            const font = opentype.parse(e.target.result);
            currentFontFamily = font.names.fontFamily.en;
            currentFontStyle = font.names.fontSubfamily.en;
            fontInfo.textContent = `${currentFontFamily} - ${currentFontStyle}`;
            displayGlyphs(font);
            controls.style.display = 'block'; // Show controls
        } catch (err) {
            alert('フォントの解析に失敗しました: ' + err);
        }
    };
    reader.readAsArrayBuffer(file);
}

function displayGlyphs(font) {
    glyphContainer.innerHTML = '';
    currentGlyphs = [];
    for (let i = 0; i < font.numGlyphs; i++) {
        const glyph = font.glyphs.get(i);
        const char = String.fromCharCode(glyph.unicode);

        // グリフに輪郭データがあるか（空のグリフでないか）を確認
        const hasPath = glyph.path && glyph.path.commands.length > 0;

        // Unicode値を持ち、かつ空のグリフでない場合のみ表示
        if (char && hasPath) {
            currentGlyphs.push(char);

            const glyphDiv = document.createElement('div');
            glyphDiv.classList.add('glyph');

            const glyphChar = document.createElement('div');
            glyphChar.classList.add('glyph-char');
            glyphChar.style.fontFamily = 'user-loaded-font';
            glyphChar.textContent = char;

            const glyphName = document.createElement('div');
            glyphName.classList.add('glyph-name');
            glyphName.textContent = glyph.name;

            glyphDiv.appendChild(glyphChar);
            glyphDiv.appendChild(glyphName);
            glyphContainer.appendChild(glyphDiv);
        }
    }
}