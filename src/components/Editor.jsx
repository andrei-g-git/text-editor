import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { onClickSave } from '../js/onSubmit';
import FormController from '../js/FormController.js';
import { getStandardToolbarOptions } from '../js/toolbarOptions.js';
import '../css/Editor.css';

class Editor extends Component {
    constructor(){
        super()

        this.state = {
            title: "",
            consumedDownloadLink: true
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
                    <label>Standalone TextEditor</label>
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
                        Save

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
        newToolbar.addHandler('image', this.overrideImageHandlerToAcceptPaths)
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
}

export default Editor;