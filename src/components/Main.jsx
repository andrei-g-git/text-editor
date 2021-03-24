import React, { useState, Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from './Editor.jsx';
import '../css/Main.css';
import hamburger from '../assets/hamburger.png';
class Main extends Component{
    constructor(){
        super()

        this.state={
            showMainContextMenu: false,
            notifyEditorCounter: 0,
            notifyExportCounter: 0
        }

        this.inputFile = React.createRef();
    }

    render(){
        return (
            <div id="main">

            <div id="menu-wrapper">
                <img
                    id="hamburger-menu"
                    src={hamburger}
                    alt="n/a"
                    onClick={this.handleBurgerClick}
                >
                </img>

                {
                    this.state.showMainContextMenu
                    ?
                        <ul
                            id="main-context"
                            onMouseLeave={this.closeMainMenuContext}
                        >
                            <li
                                className="main-menu-item"
                                onClick={this.saveContent}
                            >
                                Save
                            </li>
                            <li 
                                className="main-menu-item" 
                                onClick={this.handleUploadClick}
                            >
                                Import
                            </li>
                            <li className="main-menu-item" >Export</li>
                        </ul>
                    :
                        <div></div>
                }
            </div>
                <Editor 
                    notifyCounter={this.state.notifyEditorCounter}
                    notifyExportCounter={this.state.notifyExportCounter}
                >
                </Editor>

                <input 
                    type='file' 
                    id='file' 
                    ref={this.inputFile} 
                    style={{display: 'none'}}
                    onChange={this.handleFileSelection}
                />

                <button 
                    id="upload-button"
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

    handleBurgerClick = () =>{
        const show = ! this.state.showMainContextMenu;
        this.setState({
            showMainContextMenu: show
        });
    }

    closeMainMenuContext = () => {
        this.setState({
            showMainContextMenu: false
        });
    }

    saveContent = () =>{
        this.setState({
            notifyEditorCounter: this.state.notifyEditorCounter + 1
        })
    }
}

export default Main;