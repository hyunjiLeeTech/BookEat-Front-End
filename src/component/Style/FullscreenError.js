import React from 'react';
// import ReactLoading from 'react-loading';
import './FullscreenError.css'

const FullScrrenLoading = (msg) => (
	<div id="fullScreenErrorWrapper">
        <div id="fullScreenErrorMsg">
<h2>{msg}</h2>
        </div>
    </div>
    
);

export default FullScrrenLoading;