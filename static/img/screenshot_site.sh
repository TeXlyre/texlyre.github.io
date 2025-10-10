google-chrome --headless --no-sandbox --hide-scrollbars \
  --window-size=1920,1080 \
  --incognito \
  --screenshot=temp.png \
  --virtual-time-budget=10000 \
  https://texlyre.github.io/codemirror-lang-latex/
convert temp.png -crop 1320x1080+300+0 +repage codemirror-lang-latex.png
rm temp.png

google-chrome --headless --no-sandbox --hide-scrollbars \
  --window-size=1920,1080 \
  --incognito \
  --screenshot=temp.png \
  --virtual-time-budget=10000 \
  https://texlyre.github.io/codemirror-lang-bib/
convert temp.png -crop 1320x1080+300+0 +repage codemirror-lang-bib.png
rm temp.png

google-chrome --headless --no-sandbox --hide-scrollbars \
  --window-size=1920,1080 \
  --incognito \
  --screenshot=temp.png \
  --virtual-time-budget=10000 \
  https://texlyre.github.io/wasm-latex-tools/
convert temp.png -crop 1320x1080+300+0 +repage wasm-latex-tools.png
rm temp.png

google-chrome --headless --no-sandbox --hide-scrollbars \
  --window-size=1920,1080 \
  --incognito \
  --screenshot=temp.png \
  --virtual-time-budget=10000 \
  https://texlyre.github.io/codemirror-latex-visual/
convert temp.png -crop 1320x1080+300+0 +repage codemirror-latex-visual.png
rm temp.png

google-chrome --headless --no-sandbox --hide-scrollbars \
  --window-size=1920,1080 \
  --incognito \
  --screenshot=temp.png \
  --virtual-time-budget=10000 \
  https://texlyre.github.io/vector-pdf-converter/
convert temp.png -crop 1320x1080+300+0 +repage vector-pdf-converter.png
rm temp.png

google-chrome --headless --no-sandbox --hide-scrollbars \
  --window-size=1920,1080 \
  --incognito \
  --screenshot=temp.png \
  --virtual-time-budget=10000 \
  https://texlyre.github.io/filepizza-client/
convert temp.png -crop 1320x1080+300+0 +repage filepizza-client.png
rm temp.png

google-chrome --headless --no-sandbox --hide-scrollbars \
  --window-size=1920,1080 \
  --incognito \
  --screenshot=temp.png \
  --virtual-time-budget=10000 \
  https://texlyre.github.io/texlyre-templates/
convert temp.png -crop 1320x1080+300+0 +repage texlyre-templates.png
rm temp.png
