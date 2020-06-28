import React from 'react';
import './Image.css';

const Image = ({imageURL, box}) => {
    return (
        <div className='centre ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='facedetectimage' src={imageURL} width='500px' height='auto' />
                <div className='bounding-box' style={{top: box.toprow, right: box.rightcol, bottom: box.bottomrow, left: box.leftcol}}></div>
            </div>
        </div>
    );
}

export default Image;