import React from 'react';
import './addmenu.css';


class AddMenu extends React.Component {
    render() {
        return (
            <div>
                <div id="top-banner">
                    <p id="title">BookEat - Edit menu</p>
                </div>
                <form>
                <div className='row'>
                        <label className="col-md-4">Food Name</label>
                        <input className="col-md-8" type="text"></input>
                    </div>
                    <div className='row'>
                        <label className="col-md-4">Price</label>
                        <input className="col-md-8" type="text"></input>
                    </div>
                    <div className='row'>
                        <label className="col-md-4">Food type</label>
                        <input className="col-md-8" type="text"></input>
                    </div>
                    
                    <label className="col-md-4">Food Description</label>
                    <textarea></textarea>
                    <div className='row'>
                        <label className="col-md-4">Food Picture</label>
                        <input className="col-md-8" type="file"></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddMenu;