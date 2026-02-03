const fs = require('fs');
const path = require('path');

async function bundle() {
    const rootDir = __dirname;
    const htmlPath = path.join(rootDir, 'index.html');
    const cssPath = path.join(rootDir, 'styles.css');
    const jsPath = path.join(rootDir, 'script.js');
    const outputPath = path.join(rootDir, 'mockup_ely_morentin_standalone.html');

    let html = fs.readFileSync(htmlPath, 'utf8');
    const css = fs.readFileSync(cssPath, 'utf8');
    const js = fs.readFileSync(jsPath, 'utf8');

    // Embed CSS
    html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>\n${css}\n</style>`);

    // Embed JS
    html = html.replace('<script src="script.js"></script>', `<script>\n${js}\n</script>`);

    // Embed Images as Base64
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const replacements = [];

    while ((match = imgRegex.exec(html)) !== null) {
        const imgTag = match[0];
        const src = match[1];

        // Resolve path (handle ./ or plain filenames)
        const cleanSrc = src.replace(/^.\//, '');
        const imgPath = path.join(rootDir, cleanSrc);

        if (fs.existsSync(imgPath)) {
            const ext = path.extname(imgPath).substring(1);
            const base64 = fs.readFileSync(imgPath, 'base64');
            const dataUri = `data:image/${ext};base64,${base64}`;
            replacements.push({ src, dataUri });
        } else {
            console.warn(`Warning: Image not found ${imgPath}`);
        }
    }

    // Apply replacements
    for (const rep of replacements) {
        html = html.split(rep.src).join(rep.dataUri);
    }

    fs.writeFileSync(outputPath, html);
    console.log(`Standalone mockup created at: ${outputPath}`);
}

bundle().catch(console.error);
