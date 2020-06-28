import React from 'react';
import './Imagelinkform.css';

const Imagelinkform = ({OnInputChange, OnButtonSubmit}) => {
    return (
        <div className='linkform'>
            <p className='f4'>
                {'This is the magic brain that detects the face in your image, try it'}
            </p>
            <div className='centre'>
                <div className='form pa4 br3 shadow-5 centre'>
                    <input className='f5 pa2 w-70 centre' type='text' onChange={OnInputChange} />
                    <button className='pa2 w-30 grow dib link ph3 pv2 black Detect' onClick={OnButtonSubmit} >
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Imagelinkform;