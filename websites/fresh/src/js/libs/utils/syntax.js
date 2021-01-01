import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass';

export function highlightHtml() {
    const htmlHighlights = document.querySelectorAll('.textarea_html');

    if (typeof (htmlHighlights) != 'undefined' && htmlHighlights != null) {
        for (var i = 0, len = htmlHighlights.length; i < len; i++) {
            CodeMirror.fromTextArea(htmlHighlights[i], {
                lineNumbers: false,
                mode: 'htmlmixed',
                theme: 'shadowfox'
            });
        }
    }
}

export function highlightCss() {
    const cssHighlights = document.querySelectorAll('.textarea_css');

    if (typeof (cssHighlights) != 'undefined' && cssHighlights != null) {
        for (var i = 0, len = cssHighlights.length; i < len; i++) {
            CodeMirror.fromTextArea(cssHighlights[i], {
                lineNumbers: true,
                mode: 'css',
                theme: 'shadowfox'
            });
        }
    }
}

export function highlightSass() {
    const sassHighlights = document.querySelectorAll('.textarea_sass');

    if (typeof (sassHighlights) != 'undefined' && sassHighlights != null) {
        for (var i = 0, len = sassHighlights.length; i < len; i++) {
            CodeMirror.fromTextArea(sassHighlights[i], {
                lineNumbers: true,
                mode: 'sass',
                theme: 'shadowfox'
            });
        }
    }
}

export function highlightJavascript() {
    const javascriptHighlights = document.querySelectorAll('.textarea_javascript');

    if (typeof (javascriptHighlights) != 'undefined' && javascriptHighlights != null) {
        for (var i = 0, len = javascriptHighlights.length; i < len; i++) {
            CodeMirror.fromTextArea(javascriptHighlights[i], {
                lineNumbers: true,
                mode: 'javascript',
                theme: 'material'
            });
        }
    }
}

export function copyCode() {
    const copyButtons = document.querySelectorAll('.copy-code-button');

    if (typeof (copyButtons) != 'undefined' && copyButtons != null) {
        for (var i = 0, len = copyButtons.length; i < len; i++) {
            copyButtons[i].addEventListener('click', function () {
                const self = this;
                const target = self.dataset.copy;
                const txt = document.getElementById(target);
                let value = txt.value.trimStart().trimEnd();
                value = value.replace(/(^\s*)|(\s*$)/gi, "");
                value = value.replace(/[ ]{2,}/gi, " ");
                value = value.replace(/\n /, "\n");

                var id = "mycustom-clipboard-textarea-hidden-id";
                var existsTextarea = document.getElementById(id);

                if (!existsTextarea) {
                    console.log("Creating textarea");
                    var textarea = document.createElement("textarea");
                    textarea.id = id;
                    // Place in top-left corner of screen regardless of scroll position.
                    textarea.style.position = 'fixed';
                    textarea.style.top = 0;
                    textarea.style.left = 0;

                    // Ensure it has a small width and height. Setting to 1px / 1em
                    // doesn't work as this gives a negative w/h on some browsers.
                    textarea.style.width = '1px';
                    textarea.style.height = '1px';

                    // We don't need padding, reducing the size if it does flash render.
                    textarea.style.padding = 0;

                    // Clean up any borders.
                    textarea.style.border = 'none';
                    textarea.style.outline = 'none';
                    textarea.style.boxShadow = 'none';

                    // Avoid flash of white box if rendered for any reason.
                    textarea.style.background = 'transparent';
                    document.querySelector("body").appendChild(textarea);
                    console.log("The textarea now exists :)");
                    existsTextarea = document.getElementById(id);
                } else {
                    console.log("The textarea already exists :3")
                }

                existsTextarea.value = value;
                existsTextarea.select();

                try {
                    var status = document.execCommand('copy');
                    if (!status) {
                        console.error("Cannot copy text");
                    } else {
                        console.log("The text is now on the clipboard");
                        self.textContent = 'Copied';
                        setTimeout(function () {
                            self.textContent = 'Copy';
                        }, 1000);
                    }
                } catch (err) {
                    console.log('Unable to copy.');
                }

            });
        }
    }
}