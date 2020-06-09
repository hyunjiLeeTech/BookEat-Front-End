import React from 'react';
import './addreview.css';


class AddReview extends React.Component {
    render() {
        return (
            <div>
                <div id="top-banner">
                    <p id="title">BookEat - Edit Review</p>
                </div>
                <form>
                <div className='row'>
                        <label className="col-md-4">Satifcation</label>
                        <p className="col-md-8">&#9733;&#9733;&#9734;&#9734;&#9734;</p>
                    </div>
                    <div className='row'>
                        <label className="col-md-4">Service</label>
                        <p className="col-md-8">&#9733;&#9733;&#9734;&#9734;&#9734;</p>
                    </div>
                    <div className='row'>
                        <label className="col-md-4">Environment</label>
                        <p className="col-md-8">&#9733;&#9734;&#9734;&#9734;&#9734;</p>
                    </div>
                    <div className='row'>
                        <label className="col-md-4">Food</label>
                        <p className="col-md-8">&#9733;&#9734;&#9734;&#9734;&#9734;</p>
                    </div>
                    
                    <label className="col-md-4">Comment</label>
                    <textarea></textarea>
                    <div className='row'>
                        <label className="col-md-4">Picture</label>
                        <input className="col-md-8" type="file"></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddReview;