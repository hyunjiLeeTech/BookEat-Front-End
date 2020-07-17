import React, { Component } from 'react'
import MainContainer from "../component/Style/MainContainer";
import "./EditMenu.js"
import { Link } from 'react-router-dom'

const regExpPrice = RegExp(
    /(\d+\.\d{2,2})/g
);

const formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach((val) => {
        if (val.length > 0) {
            isValid = false;
        } else {
            isValid = true;
        }
    });

    Object.values(rest).forEach((val) => {
        if (val === null) {
            isValid = false;
        } else {
            isValid = true;
        }
    });

    return isValid;
};

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // Oringin
            // menus: [{
            //     id: 1, MenuPicture: "picture",
            //     menuName: "Noodle",
            //     menuPrice: "25.50",
            //     menuDescript: "gooooooood!!!!!",
            // }
            menuName: "",
            menuPrice: "",
            menuDescript: "",

            // For testing - after connecting with DB, delete
            menus: [{
                id: 1, MenuPicture: "picture",
                menuName: "Noodle",
                menuPrice: "25.50",
                menuDescript: "gooooooood!!!!!",
            },
            {
                id: 2, MenuPicture: "picture",
                menuName: "Noodle",
                menuPrice: "25.50",
                menuDescript: "gooooooood!!!!!",
            },
            {
                id: 3, MenuPicture: "picture",
                menuName: "Noodle",
                menuPrice: "25.50",
                menuDescript: "goooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooood!!!!!",
            }],
            // image: null,
            isError: {
                MenuPicture: '&#160;',
                menuName: '&#160;',
                menuPrice: '&#160;',
                menuDescript: '&#160;'
            }
        };
        this.onImageChange = this.onImageChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTableData = this.renderTableData.bind(this);

    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
        }
    };

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };
        switch (name) {
            case "menuName":
                isError.menuName =
                    value.length >= 2 && value.length <= 32 ? "&#160;" : "Atleast 2 character required";
                break;
            case "menuPrice":
                isError.menuPrice =
                    regExpPrice.test(value) ? "&#160;" : "Atleast 1 character required";
                break;
            case "menuDescript":
                isError.menuDescript =
                    value.length >= 5 && value.length <= 100 ? "&#160;" : "Atleast 5 character required";
                break;
            default:
                break;
        }
        this.setState({
            isError,
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("saved")
        if (formValid(this.state)) {
            console.log(this.state)
        } else {
            console.log("Form is invalid!");
        }
    };



    renderTableData() {
        return this.state.menus.map((menu, index) => {
            const { id, MenuPicture, menuName, menuPrice, menuDescript } = menu
            return (
                <tr key={id}>
                    <td  >
                        {MenuPicture}
                    </td>

                    <tr>{menuName}</tr>
                    <tr>{menuPrice}</tr>
                    <tr>{menuDescript}</tr>

                    <td >
                        <div className="form-group row">
                            {/* <Link to="/EditMenu"> */}
                            <button
                                type="button"
                                className="btn btn-primary btn-sm mr-sm-2"
                                data-toggle="modal"
                                href="#EditMenu"
                            >
                                Edit
                    </button>
                            {/* </Link> */}
                        </div>
                    </td>
                    <td >
                        <div className="form-group row">
                            <button
                                type="button"
                                className="btn btn-primary btn-sm mr-sm-2"
                            >
                                Delete
                    </button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    render() {
        const { isError } = this.state;
        return (
            <MainContainer>
                <form onSubmit={this.handleSubmit} id="addMenu">
                    <div>
                        <div className="form-inline form-group mt-sm-4">
                            <h3> Add Menu </h3>
                            <button type="submit" className="btn btn-primary ml-sm-5"> Save </button>
                        </div>

                        {/* add menu */}
                        <div id="menu">
                            <div className="row">
                                <div className="col-sm-3 border">
                                    <container>
                                        <row>
                                            <input type="file" name="menuPicture" onChange={this.onImageChange} />
                                            {/* <col xs={10} md={10} /> */}
                                            <img src={this.state.image} />
                                            {/* <Cropper 
                                                ref='cropper'
                                                src={PATH_TO_IMAGE_SOURCE}
                                                aspectRatio={16 / 9} 
                                            />  
                                            https://www.kurzor.net/blog/uploading-and-resizing-images-part1*/}
                                        </row>
                                    </container>
                                </div>
                                <div className="col-sm-9 border">
                                    <div className="col container-fluid">
                                        <div className="form-inline">
                                            <label htmlFor="menuName" className="col-sm-2 border-0">Name </label>
                                            <input type="text" id="menuName" name="menuName" className="form-control col-smd-10 mt-sm-2" value={this.state.menuName}
                                                className={isError.menuName.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required
                                            />
                                        </div>
                                        <div className=" form-inline">
                                            <label htmlFor="menuPrice" className="col-sm-2 border-0">Price</label>
                                            <input type="text" id="menuPrice" name="menuPrice" className="form-control col-sm-10 mt-sm-2" placeholder="price format: 12.30" value={this.state.menuPrice}
                                                className={isError.menuPrice.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required />
                                        </div>
                                        <div className="form-inline">
                                            <label htmlFor="menuDescript" className="col-sm-2 border-0">Description</label>
                                            <input required type="text" id="menuDescript" name="menuDescript" className="form-control col-sm-10 mt-sm-2 mb-sm-2" value={this.state.menuDescript}
                                                className={isError.menuDescript.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>


                {/* Menu List */}
                <h3><br />
                    <br />Menu List</h3>
                <table id='menus' className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col.sm.3">Image</th>
                            <th scope="col">Menu Detail</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </MainContainer>
        );
    }
}

export default Menu;

