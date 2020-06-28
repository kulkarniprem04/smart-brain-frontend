import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div className='white f4'>
            <div>
                {`${name} your rank is ...`}
            </div>
            <div>
                {entries}
            </div>
        </div>
    );
}

export default Rank;