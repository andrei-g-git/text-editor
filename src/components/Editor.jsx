import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { onClickSave } from '../js/onSubmit';
import FormController from '../js/FormController.js';
import { getStandardToolbarOptions } from '../js/toolbarOptions.js';
import { loadContentFromLocalStorage } from '../js/quillHandlers.js';
import '../css/Editor.css';

class Editor extends Component {
    constructor(){
        super()

        this.state = {
            title: "",
            consumedDownloadLink: true,
            consumedExportToken: true
        }
        this.quillEditor = null;
        this.downloadLink = null;
        this.formController = new FormController();
    }

    render() {
        return (
            <div>     {/* ??? */}
                <form
                    id="editor-form"
                    onSubmit={this.handleSubmit}        
                >
                    <input
                        id="title-field"
                        type="text"
                        value={this.state.title}
                        placeholder="title"
                        onChange={event => this.setState({title: event.target.value})}
                    />

                    <div 
                        id="quill-editor"
                    >
                    </div>

                    <label>Upload first!</label>
                    <button
                        id="save-button"
                        type="submit"
                    >
                        Export

                        <a 
                            id="save-button-link"
                            download="post.json"
                        >
                        </a>                         
                    </button>

                </form>                
            </div>
        );
    }

    componentDidMount(){
        this.quillEditor = new Quill(
            "#quill-editor",
            {
                modules: {
                    toolbar: getStandardToolbarOptions(),
                },
                theme: "snow"
            }
        );

        let newToolbar = this.quillEditor.getModule('toolbar');
        newToolbar.addHandler('image', this.overrideImageHandlerToAcceptPaths);


        loadContentFromLocalStorage(this.quillEditor);


        // document.addEventListener("keydown", function(event){ /////already has this functionality. also don't long press ctrl z or do anything continuously or it breaks
        //     if(event.ctrlKey && event.key === 'z'){
        //         loadContentFromLocalStorage(this.quillEditor);
        //     }
        // });
    }
    
    componentDidUpdate(){
        if(! this.state.consumedDownloadLink){
            document
                .getElementById("save-button-link")
                .click();

            this.setState({
                consumedDownloadLink: true
            })
        }

        const delta = this.quillEditor.getContents();
        const saveData = JSON.stringify(delta);
        localStorage.setItem("content", saveData);

        if(! this.state.consumedExportToken){
            //something about document find submit .click() or some shit this is too convoluted I'm ending this
        }
    }

    handleSubmit = event => {
        event.preventDefault();
    
        this.formController.onClickSave(this.quillEditor);
        this.setState({
            consumedDownloadLink: false
        })    
    }   
    
    
    //fuuuuckkkkk
    overrideImageHandlerToAcceptPaths = () => {
        var range = this.quillEditor.getSelection(); 
        var value = prompt('What is the image URL');
        if(value){
            this.quillEditor.insertEmbed(range.index, 'image', value, Quill.sources.USER);
        }    
    }

    // loadContentFromLocalStorage = (editor) =>{
    //     const localContent = localStorage.getItem("content");
    //     if(localContent.length){
    //         const delta = JSON.parse(localContent);
    //         this.quillEditor.setContents(delta);
    //     }
    // }
}

export default Editor;