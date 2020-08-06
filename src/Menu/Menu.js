import React, { Component } from 'react'
import MainContainer from "../component/Style/MainContainer";
import "./EditMenu.js"
import ds from "../Services/dataService"
// import { Link } from 'react-router-dom'
import $ from "jquery";
import FullscreenError from '../component/Style/FullscreenError'
import serverAddress from '../Services/ServerUrl';
import FullScrrenLoading from '../component/Style/FullscreenLoading';

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
            //Oringin
            menus: [{
            }],

            menuPicture: "",
            menuName: "",
            menuPrice: "",
            menuDescript: "",
            disabled: true,
            contenteditable: false,

            isError: {
                MenuPicture: '&#160;',
                menuName: '&#160;',
                menuPrice: '&#160;',
                menuDescript: '&#160;'
            },
            resultsErr: false,
            isLoading: false
        };
        this.onImageChange = this.onImageChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.addMenuWithImage = this.addMenuWithImage.bind(this);
        this.editMenuWithImage = this.editMenuWithImage.bind(this);
        this.renderMenuInfo = this.renderMenuInfo.bind(this);
        this.menuItemEditButton = this.menuItemEditButton.bind(this);
        this.menuItemDeleteButton = this.menuItemDeleteButton.bind(this);
        this.handleChangeInList = this.handleChangeInList.bind(this);
    }

    onImageChange = (event, index) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            // this.setState({
            //   image: URL.createObjectURL(img)
            // });
            if (index !== undefined) {//in menu item  TRY YOUR BEST REWRITE THIS CODE 
                this.state.menus[index].MenuPicture = URL.createObjectURL(img)
                this.state.menus[index].image = img
                this.forceUpdate();
            } else {
                this.setState({
                    // image: URL.createObjectURL(img),
                    image: event.target.files[0]
                })
            }

        }
    };


    handleChangeInList(e, index) {
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
        this.state.menus[index][e.target.id] = e.target.value; //Set state does not allow to set an object inside of an array
        this.forceUpdate(); //forcing udpate the UI
    }

    handleChange = (e) => {
        console.log(this.state)
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
        console.log([e.target.id]);
        console.log([e.target.value]);
        this.setState({
            isError,
            [e.target.id]: e.target.value,
        });
    };

    componentWillMount() {
        this.queryMenus();
    }

    async queryMenus() {
        this.setState({ isLoading: true })
        this.setState({ menus: [] })
        let menuContents = await ds.getMenus();
        menuContents = menuContents.menus;

        if (typeof menuContents !== 'undefined') {

            for (var i = 0; i < menuContents.length; i++) {
                if (typeof menuContents[i].menuImageId !== 'undefined') {
                    console.log(menuContents[i].menuImageId);
                    var imageId = { imageId: menuContents[i].menuImageId };
                    menuContents[i].menuPicture = await ds.getImage(imageId);
                    console.log("get image success");
                } else {
                    menuContents[i].menuPicture = {
                        isImage: false,
                        file: ''
                    }
                }
            }

            this.setState({
                menus: menuContents
            });
        }
        console.log("Result of query menus")
        console.log(menuContents);
        this.setState({ isLoading: false })
    }

    async addMenuWithImage(state) {
        this.setState({ isLoading: true })

        console.log(this);
        const formData = new FormData();
        formData.append('menuImage', state.image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        var menuImageId = await ds.addMenuImage(formData, config);
        state.menuImageId = menuImageId;
        console.log(state);
        await ds.addMenu(state).then(() => {

        }).finally(async (res) => {
            await this.queryMenus();
            this.setState({ isLoading: false })

        })

    }

    async editMenuWithImage(state) {
        this.setState({ isLoading: true })

        console.log(state);
        if (state.isImage) {
            await ds.deleteMenuImage();
        }

        const formData = new FormData();
        formData.append('menuImage', state.image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        var menuImageId = await ds.editMenuImage(formData, config);
        state.menuImageId = menuImageId;
        console.log("afer ds.editmenuimage");
        await ds.editMenu(state).then(() => {
            console.log('edit menu fullfilled')
            this.queryMenus();

        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.setState({ isLoading: true })
        })
    }

    renderMenuInfo() {
        var rows = [];
        console.log("this is state menu: " + this.state.menus);
        if (typeof this.state.menus != "undefined") {

            for (var menu of this.state.menus) {
                rows.push(
                    <tr key={rows}>
                        <td>{menu.menuName}</td>
                        <td>{menu.menuPrice}</td>
                        <td>{menu.menuDescript}</td>
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
            }
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("saved")
        if (formValid(this.state)) {
            console.log(this.state)
            this.addMenuWithImage(this.state);

        } else {
            console.log("Form is invalid!");
        }
    };

    menuItemDeleteButton(index) {
        var menu = this.state.menus[index];
        if (menu.menuPicture.isImage != false) {
            ds.deleteMenuImage(menu.menuImageId);
        }

        ds.deleteMenu(menu).then(() => {
            this.queryMenus();
        })
    }

    menuItemEditButton(index) {
        //console.log(this.state.menus);
        console.log(this.state.menus[index])

        this.state.menus[index].contenteditable = !this.state.menus[index].contenteditable;

        if (!this.state.menus[index].contenteditable) {
            //this.editMenuWithImage(this.state.menus[index]); // contain the back-end logic for edit menu with image. need to be tested after the front-end side of issue fixed
            //ds.editMenu(this.state.menus[index]);
            //console.log('call edit menu')
            this.editMenuWithImage(this.state.menus[index])
            //$('#EditResultModal').modal('show') //Show the modal 
        }
        // this.forceUpdate();
        //this.setState({});
        this.callModal(index);
    }

    //this.state.menus[index]
    //Edit profile - button
    callModal(index) {
        this.setState(state => {
            this.setState(state =>
                //     {
                //     return {
                //         // edit: !state.edit
                //     };
                // },

                () => {
                    if (this.state.menus[index].contenteditable) {
                        $('this.state.menus[index].#save_edit_btn').attr("data-toggle", 'modal').attr("data-target", '#EditResultModal').attr('type', 'button')
                    }
                    else {
                        $('this.state.menus[index].#save_edit_btn').attr("data-toggle", '').attr("data-target", '').attr("type", '')
                    }
                });
        })
    }




    renderTableData() {
        console.log(this.state.menus);
        return this.state.menus.map((menu, index) => {
            const { id, MenuPicture, menuName, menuPrice, menuDescript } = menu
            return (
                <tr key={index} id={'menurow' + index}>
                    {/* <td>{MenuPicture}</td> */}
                    <td contentEditable={(this.state.contenteditable)} >

                        {/* <row> 
                <input type="file" name="menuPicture" disabled={(this.state.disabled)}
                  onChange={this.onImageChange} />
                <img src={this.state.image} />
                 </row>   */}
                        <container>
                            <row>
                                <input type="file" name="MenuPicture" id="MenuPicture" defaultValue={MenuPicture}
                                    onChange={(e) => this.onImageChange(e, index)} disabled={(!this.state.menus[index].contenteditable)} />
                                {/* {
                                        !this.state.menus[index].contenteditable ? <img id={"menuImage" + index} style={{ maxHeight: '100%', maxWidth: '100%' }} src={"http://localhost:5000/getimage/" + this.state.menus[index].menuImageId} />
                                            : null
                                    } */}
                                {
                                    this.state.menus[index].contenteditable ?

                                        <img id={"MenuPicture" + index} style={{ maxHeight: '100%', maxWidth: '100%' }} src={this.state.menus[index].MenuPicture} />
                                        :

                                        <div>
                                            sadfsadfsdf
                                            <img id={"MenuPicture" + index} style={{ maxHeight: '100%', maxWidth: '100%' }} src={serverAddress + '/getImage/' + this.state.menus[index].menuImageId} />

                                        </div>
                                }



                            </row>
                        </container>

                    </td>

                    {/* <tr>{menuName}</tr>
                    <tr>{menuPrice}</tr>
                    <tr>{menuDescript}</tr> */}
                    <td>
                        <div className="col container-fluid">
                            {/* <td contentEditable={(this.state.menus[index].contenteditable)} > */}
                            <div className="form-inline">
                                <input type="text" id={"menuName"+index} name="menuName" defaultValue={menuName} onChange={(e) => this.handleChangeInList(e, index)}
                                    className="border-none" disabled={(!this.state.menus[index].contenteditable)} />
                            </div>

                            {/* </td> */}

                            {/* <td contentEditable={(this.state.menus[index].contenteditable)}> */}
                            <div className="form-inline">
                                <input type="text" id={"menuPrice"+index} name="menuPrice" defaultValue={menuPrice} onChange={(e) => this.handleChangeInList(e, index)}
                                    className="border-none" disabled={(!this.state.menus[index].contenteditable)} />
                            </div>

                            {/* </td> */}

                            {/* <div className="form-group" > */}
                            {/* <td contentEditable={(this.state.menus[index].contenteditable)}> */}
                            <div className="form-inline">
                                <textarea row="3" id={"menuDescript"+index} name="menuDescript" defaultValue={menuDescript} onChange={(e) => this.handleChangeInList(e, index)}
                                    className="form-control border-none " disabled={(!this.state.menus[index].contenteditable)} />
                            </div>

                            {/* </td> */}
                            {/* </div> */}

                        </div>
                    </td>
                    <td >
                        <div className="form-group row">
                            {/* <Link to="/EditMenu"> */}
                            <button
                                button id='save_edit_btn'
                                type="button"
                                className="btn btn-primary btn-sm mr-sm-2"
                                onClick={() => this.menuItemEditButton(index)}
                            //data-toggle="modal" data-target="#EditResultModal"
                            >
                                {this.state.menus[index].contenteditable ? "Save Change" : "Edit"}
                            </button>
                            {/* </Link> */}
                        </div>
                    </td>
                    <td >
                        <div className="form-group row">
                            <button
                                button id='delete_btn'
                                type="button"
                                className="btn btn-primary btn-sm mr-sm-2"
                                onClick={() => this.menuItemDeleteButton(index)}
                                data-toggle="modal" data-target="#DeleteResultModal"
                            >
                                Delete
                    </button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    handleClick() {
        this.setState({ disabled: !this.state.disabled })
        this.setState({ contenteditable: !this.state.contenteditable })
        this.changeText();
    }



    render() {
        const { isError } = this.state;
        return (
            <MainContainer>
                {this.state.resultsErr
                    ?
                    FullscreenError("An error occured, please try again later")
                    :
                    null
                }
                {this.state.isLoading ?
                    FullScrrenLoading({ type: 'balls', color: '#000' }) : null
                }
                <form onSubmit={this.handleSubmit} id="addMenu">
                    <div className="form-inline form-group mt-sm-4">
                        <h3> Add Menu </h3>
                        <button type="submit" className="btn btn-primary ml-sm-5"
                            data-toggle="modal" data-target="#menuAddResultModal"> Save </button>
                    </div>

                    {/* add menu */}
                    <div id="menu">
                        <div className="row">
                            <div className="col-sm-3 border">
                                <container>
                                    <row>
                                        <input type="file" name="menuPicture" id="menuPicture" onChange={this.onImageChange} />
                                        <img src={this.state.image ? URL.createObjectURL(this.state.image) : null} style={{ maxHeight: '100%', maxWidth: '100%' }} />


                                        {/* <input type="file" name="menuPicture" onChange={this.onImageChange} />
                                        <img src={this.state.image} style={{ maxHeight: '100%', maxWidth: '100%' }} /> */}
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
                                        <textarea row="3" required type="text" id="menuDescript" name="menuDescript" className="form-control col-sm-10 mt-sm-2 mb-sm-2" value={this.state.menuDescript}
                                            className={isError.menuDescript.length > 6 ? "is-invalid form-control" : "form-control"} onChange={this.handleChange} required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>


                {/* Menu List */}
                <h3><br />
                    <br />Menu List</h3>
                {/* <div className="col-md-12"> */}
                <table id='menus' className="table table-striped col-md-12">
                    <thead>
                        <tr>
                            <th >Image</th>
                            <th className="col-md-2">Menu Detail</th>
                            <th ></th>
                            <th></th>

                            {/* <th className="col-md-3">Image</th>
                <th className="col-md-5" >Menu Detail</th>
                <th className="col-md-2">Edit</th>
                <th className="col-md-2">Delete</th> */}

                            {/* <th scope="col.sm.3" class="col-sm-3">Image</th>
                <th scope="col">Menu Detail</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.renderMenuInfo()} */}
                        {this.renderTableData()}
                    </tbody>
                </table>
                {/* </div> */}

                {/* addMenuModal */}
                <div
                    className="modal fade"
                    id="menuAddResultModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="menuAddResultModalLabel"
                    aria-hidden="true"
                >

                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="menuAddResultModalLabel">
                                    Add Menu
                            </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="alert alert-warning" id="munuAddResultText">
                                    Please Wait...
                  </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                >
                                    Close
                  </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EditMenuModal */}

                <div
                    className="modal fade"
                    id="EditResultModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="EditResultModal"
                    aria-hidden="true"
                >

                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="EditResultModal">
                                    Edit Menu
                            </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="alert alert-warning" id="EditResultModalText">
                                    Please Wait...
                  </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                >
                                    Close
                  </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DeleteMenuModal */}

                <div
                    className="modal fade"
                    id="DeleteResultModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="DeleteResultModal"
                    aria-hidden="true"
                >

                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="DeleteResultModal">
                                    Delete Menu
                            </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="alert alert-warning" id="DeleteResultModalText">
                                    Please Wait...
                  </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                >
                                    Close
                  </button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        );
    }
}




export default Menu;

