import React from 'react';

// Require Editor CSS files.

import 'froala-editor/css/froala_style.min.css';

import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

import './EditorComponent.css';

// Import all Froala Editor plugins;
import 'froala-editor/js/plugins.pkgd.min.js';

// Render Froala Editor component.

const defaultContent = `<div>
<section data-element_type="section" data-id="6dad7bdb">
  <div data-element_type="column" data-id="2fdea927">
    <div data-element_type="widget" data-id="1ae5ac6e" data-widget_type="heading.default">
      <h2>Buy Froala Editor</h2>
    </div>
    <div data-element_type="widget" data-id="19f12a3a" data-widget_type="heading.default">
      <h5>Powering web editing for customers ranging from startups to the world's largest companies.</h5>
      <p>
        <br>
        </p>
      </div>
    </div>
  </section>
  <section data-element_type="section" data-id="14f81af">
    <div data-element_type="column" data-id="7cf39a8">
      <div data-element_type="widget" data-id="1875aae" data-widget_type="html.default">
        <img src="https://froala.com/wp-content/uploads/2019/10/samsung.svg" alt="Samsung" height="25" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="25">
        <img data-fr-image-pasted="true" src="https://froala.com/wp-content/uploads/2019/10/apple.svg" alt="Apple" height="25" data-lazy-loaded="true" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="62">
        <img data-fr-image-pasted="true" src="https://froala.com/wp-content/uploads/2019/10/ibm.svg" alt="IBM" height="25" data-lazy-loaded="true" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="62">
        <img src="https://froala.com/wp-content/uploads/2019/10/amazon.svg" alt="Amazon" height="25" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="124">
        <img src="https://froala.com/wp-content/uploads/2019/10/ebay.svg" alt="Ebay" height="25" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="62">
        <img src="https://froala.com/wp-content/uploads/2019/10/intel.svg" alt="Intel" height="25" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="38">
        <img data-fr-image-pasted="true" alt="Netflix" src="https://froala.com/wp-content/uploads/2020/04/netflix.png" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" style="width: 10%;" width="10%" height="22">
        <img src="https://froala.com/wp-content/uploads/2019/10/cisco.svg" alt="Cisco" height="25" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="107">
        <img src="https://froala.com/wp-content/uploads/2019/10/thomson.png" alt="Thomson Reuters" height="25" data-ll-status="loaded" class="fr-fic fr-dii fr-draggable" width="107">
      </div>
      <p><br></p>
      <div data-element_type="widget" data-id="2f69551" data-widget_type="heading.default">We are proud to announce new flexibility with <strong>perpetual</strong> and <strong>annual</strong> plan options - perfect for any project or team!</div>
      </div>
    </section>
  </div>`;

  const froalaEditorConfig = {
    attribution: false,
    height: 400,
    quickInsertEnabled: false,
    imageDefaultWidth: 0,
    imageResizeWithPercent: true,
    imageMultipleStyles: false,
    imageOutputSize: true,
    imageRoundPercent: true,
    imageMaxSize: 1024 * 1024 * 2.5,
    imageEditButtons: [
      "imageReplace",
      "imageAlign",
      "imageRemove",
      "imageSize",
      "-",
      "imageLink",
      "linkOpen",
      "linkEdit",
      "linkRemove"
    ],
    imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
    imageInsertButtons: ["imageBack", "|", "imageUpload"],
    placeholderText: "Your content goes here!",
    colorsStep: 5,
    colorsText: [
      "#000000",
      "#2C2E2F",
      "#6C7378",
      "#FFFFFF",
      "#009CDE",
      "#003087",
      "#FF9600",
      "#00CF92",
      "#DE0063",
      "#640487",
      "REMOVE"
    ],
    colorsBackground: [
      "#000000",
      "#2C2E2F",
      "#6C7378",
      "#FFFFFF",
      "#009CDE",
      "#003087",
      "#FF9600",
      "#00CF92",
      "#DE0063",
      "#640487",
      "REMOVE"
    ],
    toolbarButtons: {
      moreText: {
        buttons: [
          "paragraphFormat",
          "|",
          "fontSize",
          "textColor",
          "backgroundColor",
          "insertImage",
          "alignLeft",
          "alignRight",
          "alignJustify",
          "formatOL",
          "formatUL",
          "indent",
          "outdent"
        ],
        buttonsVisible: 6
      },
      moreRich: {
        buttons: [
          "|",
          "bold",
          "italic",
          "underline",
          "insertHR",
          "insertLink",
          "insertTable"
        ],
        name: "additionals",
        buttonsVisible: 3
      },
      dummySection: {
        buttons: ["|"]
      },
      moreMisc: {
        buttons: ["|", "undo", "redo", "help", "|"],
        align: "right",
        buttonsVisible: 2
      }
    },
    tableEditButtons: [
      "tableHeader",
      "tableRemove",
      "tableRows",
      "tableColumns",
      "tableStyle",
      "-",
      "tableCells",
      "tableCellBackground",
      "tableCellVerticalAlign",
      "tableCellHorizontalAlign"
    ],
    tableStyles: {
      grayTableBorder: "Gray Table Border",
      blackTableBorder: "Black Table Border",
      noTableBorder: "No Table Border"
    },
    toolbarSticky: true,
    pluginsEnabled: [
      "align",
      "colors",
      "entities",
      "fontSize",
      "help",
      "image",
      "link",
      "lists",
      "paragraphFormat",
      "paragraphStyle",
      "save",
      "table",
      "wordPaste"
    ],
    events: {
      "image.beforeUpload": function (files: any, arg1: any, arg2: any) {
        var editor: any = this;
        if (files.length) {
          if (files[0].size / 1000 > 255) {
            alert("Image file size exceeded the limit");
            return false;
          } else {
            // Create a File Reader.
            var reader = new FileReader();
            // Set the reader to insert images when they are loaded.
            reader.onload = (e: any) => {
              var result = e.target.result;
              editor.image.insert(result, null, null, editor.image.get());
            };
            // Read image as base64.
            reader.readAsDataURL(files[0]);
          }
        }
        editor.popups.hideAll();
        // Stop default upload chain.
        return false;
      }
    }
  };

function EditorComponent (){

  // let config = {
  //   documentReady: true,
  //   heightMin: 300,
  //   events : {
  //     'contentChanged' : function(e: any, editor: any) {
  //       console.log('test');
  //     }
  //   }
  // };

  return (
    
    <div className="editor">
      <h2> Froala's React WYSIWYG Editor</h2>
     <FroalaEditorComponent 
      model={defaultContent} 
      config={froalaEditorConfig} 
      tag='textarea' 
    />
    {/* <FroalaEditorView
      model={defaultContent}  
    /> */}
    </div>
  );

}

export default EditorComponent;