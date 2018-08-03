export default function (editor, opt = {}) {
  const c = opt;
  let bm = editor.BlockManager;
  let blocks = c.blocks;
  let stylePrefix = c.stylePrefix;
  const flexGrid = c.flexGrid;
  const basicStyle = c.addBasicStyle;
  const clsRow = `${stylePrefix}row`;
  const clsCell = `${stylePrefix}cell`;
  const styleRow = flexGrid ? `
    .${clsRow} {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
      padding: 10px;
    }
    @media (max-width: 768px) {
      .${clsRow} {
        flex-wrap: wrap;
      }
    }` : `
    .${clsRow} {
      display: table;
      padding: 10px;
      width: 100%;
    }
    @media (max-width: 768px) {
      .${stylePrefix}cell, .${stylePrefix}cell30, .${stylePrefix}cell70 {
        width: 100%;
        display: block;
      }
    }`;
  const styleClm = flexGrid ? `
    .${clsCell} {
      min-height: 75px;
      flex-grow: 1;
      flex-basis: 100%;
    }` : `
    .${clsCell} {
      width: 8%;
      display: table-cell;
      height: 75px;
    }`;
  const styleClm30 = `
  .${stylePrefix}cell30 {
    width: 30%;
  }`;
  const styleClm70 = `
  .${stylePrefix}cell70 {
    width: 70%;
  }`;

  const step = 0.2;
  const minDim = 1;
  const currentUnit = 1;
  const resizerBtm = { tl: 0, tc: 0, tr: 0, cl: 0, cr:0, bl:0, br: 0, minDim };
  const resizerRight = { ...resizerBtm, cr: 1, bc: 0, currentUnit, minDim, step };

  // Flex elements do not react on width style change therefore I use
  // 'flex-basis' as keyWidth for the resizer on columns
  if (flexGrid) {
    resizerRight.keyWidth = 'flex-basis';
  }

  const rowAttr = {
    class: clsRow,
    'data-gjs-droppable': `.${clsCell}`,
    'data-gjs-resizable': resizerBtm,
    'data-gjs-name': 'Row',
  };

  const colAttr = {
    class: clsCell,
    'data-gjs-draggable': `.${clsRow}`,
    'data-gjs-resizable': resizerRight,
    'data-gjs-name': 'Cell',
  };

  if (flexGrid) {
    colAttr['data-gjs-unstylable'] = ['width'];
    colAttr['data-gjs-stylable-require'] = ['flex-basis'];
  }

  // Make row and column classes private
  const privateCls = [`.${clsRow}`, `.${clsCell}`];
  editor.on('selector:add', selector =>
    privateCls.indexOf(selector.getFullName()) >= 0 && selector.set('private', 1))

  const attrsToString = attrs => {
    const result = [];

    for (let key in attrs) {
      let value = attrs[key];
      const toParse = value instanceof Array || value instanceof Object;
      value = toParse ? JSON.stringify(value) : value;
      result.push(`${key}=${toParse ? `'${value}'` : `"${value}"`}`);
    }

    return result.length ? ` ${result.join(' ')}` : '';
  }

  const toAdd = name => blocks.indexOf(name) >= 0;
  const attrsRow = attrsToString(rowAttr);
  const attrsCell = attrsToString(colAttr);

  toAdd('column1') && bm.add('column1', {
    label: c.labelColumn1,
    category: "Grid",
    attributes: {class:'gjs-fonts gjs-f-b1'},
    content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
      </div>
      ${ basicStyle ?
        `<style>
          ${styleRow}
          ${styleClm}
        </style>`
        : ''}`
  });

  toAdd('column2') && bm.add('column2', {
    label: c.labelColumn2,
    attributes: {class:'gjs-fonts gjs-f-b2'},
    category: "Grid",
    content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      ${ basicStyle ?
        `<style>
          ${styleRow}
          ${styleClm}
        </style>`
        : ''}`
  });

  toAdd('column3') && bm.add('column3', {
    label: c.labelColumn3,
    category: "Grid",
    attributes: {class:'gjs-fonts gjs-f-b3'},
    content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      ${ basicStyle ?
        `<style>
          ${styleRow}
          ${styleClm}
        </style>`
        : ''}`
  });

  toAdd('column3-7') && bm.add('column3-7', {
    label: c.labelColumn37,
    category: "Grid",
    attributes: {class:'gjs-fonts gjs-f-b37'},
    content: `<div ${attrsRow}>
        <div ${attrsCell} style="${flexGrid ? 'flex-basis' : 'width'}: 30%;"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex-basis' : 'width'}: 70%;"></div>
      </div>
      ${ basicStyle ?
        `<style>
          ${styleRow}
          ${styleClm}
          ${styleClm30}
          ${styleClm70}
        </style>`
        : ''}`
  });

  toAdd('text') && bm.add('text', {
    label: c.labelText,
    category: c.category,
    attributes: {class:'gjs-fonts gjs-f-text'},
    content: {
      type:'text',
      content:'Insert your text here',
      style: {padding: '10px' },
      activeOnRender: 1
    },
  });

  toAdd('link') && bm.add('link', {
    label: c.labelLink,
    category: c.category,
    attributes: {class:'fa fa-link'},
    content: {
      type:'link',
      content:'Link',
      style: {color: '#d983a6'}
    },
  });

  toAdd('image') && bm.add('image', {
    label: c.labelImage,
    category: "Extra",
    attributes: {class:'gjs-fonts gjs-f-image'},
    content: {
      style: {color: 'black'},
      type:'image',
      activeOnRender: 1
    },
  });

  toAdd('video') && bm.add('video', {
    label: c.labelVideo,
    category: "Extra",
    attributes: {class:'fa fa-youtube-play'},
    content: {
      type: 'video',
      src: 'img/video2.webm',
      style: {
        height: '350px',
        width: '615px',
      }
    },
  });

  toAdd('map') && bm.add('map', {
    label: c.labelMap,
    category: "Extra",
    attributes: {class:'fa fa-map-o'},
    content: {
      type: 'map',
      style: {height: '350px'}
    },
  });

  //h1
  toAdd('h1-block') && bm.add('h1-block', {
    label: c.labelHead1,
    content: '<h1>HEADING 1</h1>',
    category: 'Heading',
    attributes: {
      title: 'Insert h1 block',
      class: 'fa fa-header'
    }
  });

  //h2
  toAdd('h2-block') && bm.add('h2-block', {
    label: c.labelHead2,
    content: '<h2>HEADING 2</h2>',
    category: 'Heading',
    attributes: {
      title: 'Insert h2 block',
      class: 'fa fa-header'
    }
  });

  //h3
  toAdd('h3-block') && bm.add('h3-block', {
    label: c.labelHead3,
    content: '<h3>HEADING 3</h3>',
    category: 'Heading',
    attributes: {
      title: 'Insert h3 block',
      class: 'fa fa-header'
    }
  });

  //h4
  toAdd('h4-block') && bm.add('h4-block', {
    label: c.labelHead4,
    content: '<h4>HEADING 4</h4>',
    category: 'Heading',
    attributes: {
      title: 'Insert h4 block',
      class: 'fa fa-header'
    }
  });

  //html-codeName
  toAdd('html-code') && bm.add("html-code", {
    label: c.labelHtml,
    category: "Custom",
    attributes: {class: "fa fa-code"},
    content: '<div data-html-code>Edit my HTML content</div>'
  });

  addHTMLCodeEditor();
  addHTMLCodeComponent();

  function addHTMLCodeEditor() {
    editor.Commands.add("open-html-code-editor", {
      run: function(editor, sender, data) {
        var component = editor.getSelected();

        var codeViewer = editor.CodeManager.getViewer("CodeMirror").clone();
        codeViewer.set({
          codeName: "htmlmixed",
          theme: "hopscotch",
          readOnly: false
        });

        var modalContent = document.createElement("div");

        var editorTextArea = document.createElement("textarea");

        var saveButton = document.createElement("button");
        saveButton.innerHTML = "Save";
        saveButton.className = "gjs-btn-prim";
        saveButton.style = "margin-top: 8px;";
        saveButton.onclick = function() {
          component.set("content", "");
          component.components(codeViewer.editor.getValue());
          editor.Modal.close();
        };

        modalContent.appendChild(editorTextArea);
        modalContent.appendChild(saveButton);

        codeViewer.init(editorTextArea);

        var htmlContent = document.createElement("div");
        htmlContent.innerHTML = component.toHTML();
        htmlContent = htmlContent.firstChild.innerHTML;
        codeViewer.setContent(htmlContent);

        editor.Modal
          .setTitle("Edit HTML")
          .setContent(modalContent)
          .open();

        codeViewer.editor.refresh();
      }
    });
  };

  function addHTMLCodeComponent() {
    var defaultType = editor.DomComponents.getType('default');

    var _initToolbar = defaultType.model.prototype.initToolbar;

    editor.DomComponents.addType('html-code', {
      model: defaultType.model.extend({
        initToolbar(args) {
          _initToolbar.apply(this, args);

          var toolbar = this.get("toolbar");
          toolbar.push({
              attributes: { "class": "fa fa-code" },
                command: "open-html-code-editor"
          });
          this.set("toolbar", toolbar);
        }
      }, {
        isComponent: function(el) {
          if (typeof el.hasAttribute == "function" && el.hasAttribute("data-html-code")) {
            return {type: "html-code"};
          }
        }
      }),
      view: defaultType.view
    });
  };



}
