import React, { useState, Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor.jsx';

class Main extends Component{
    constructor(){
        super()

        this.inputFile = React.createRef();
    }

    render(){
        return (
            <div>
                <Editor></Editor>

                <input 
                    type='file' 
                    id='file' 
                    ref={this.inputFile} 
                    style={{display: 'none'}}
                    onChange={this.handleFileSelection}
                />

                <button 
                    onClick={this.handleUploadClick}
                >
                    Upload
                </button>
            </div>

        )
    }

    handleUploadClick = () => {
       this.inputFile.current.click();
    };

    handleFileSelection = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = readerEvent => {
            const content = readerEvent.target.result;
            localStorage.setItem("oldPosts", content);
        }
    }
}

export default Main;