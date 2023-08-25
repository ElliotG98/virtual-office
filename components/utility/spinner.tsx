import React from 'react';

const Spinner: React.FC = () => (
    <div className="spinner">
        <div className="lds-roller">
            {/*Required for loading spinner do not remove divs */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            {/*Required for loading spinner do not remove divs */}
        </div>
    </div>
);

export default Spinner;
