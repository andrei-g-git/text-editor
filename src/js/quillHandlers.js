import { Quill } from 'react-quill';

function overrideImageHandler(){
    // const input = document.createElement('input');
    // input.setAttribute('type', 'file'); //file is from outside the function, no idea where
    // input.setAttribute('accept', 'image/*');
    // input.click();
    // input.onchange = () => {
    //     if (/^image\//.test(file.type)) {
    //         //not sure what tf I'm supposed to do with this
    //     }        
    // }
}

const overrideImageHandlerToAcceptPaths = (quill) =>{
    var range = quill.getSelection();
    var value = prompt('What is the image URL');
    if(value){
        quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }    
}
export{
    overrideImageHandler,
    overrideImageHandlerToAcceptPaths
}