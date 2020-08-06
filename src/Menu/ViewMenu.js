import React, { Component } from 'react'
import MainContainer from "../component/Style/MainContainer";
import "./EditMenu.js"
import ds from "../Services/dataService"

import serverAddress from '../Services/ServerUrl';



class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //Oringin
            menus: [{
            }],
            resId: props.resId,
            menuPicture: "",
            menuName: "",
            menuPrice: "",
            menuDescript: "",


        };

        this.renderMenuInfo = this.renderMenuInfo.bind(this);

    }


    componentWillMount() {
        this.queryMenus();
    }

    queryMenus() {
        ds.getMenusCustomer(this.state.resId).then((res) => {
            console.log(res.menus);
            this.setState({
                menus: res.menus
            })
        })
    }

    renderMenuInfo() {
        var rows = [];
        console.log("this is state menu: " + this.state.menus);
        if (typeof this.state.menus != "undefined") {

            for (var menu of this.state.menus) {
                rows.push(
                    <tr key={rows}>
                            <td>  <img src={serverAddress + '/getImage/' + menu.menuImageId} style={{ maxHeight: '50%', maxWidth: '50%' }}/></td>
                        <td>{menu.menuName}</td>
                        <td></td>
                        <td>{menu.menuDescript}</td>
                        <td>{menu.menuPrice}</td>

                    </tr>
                )
            }
        }
        return rows;
    }

    render() {
        return (
            <MainContainer>
                <table id='menus' className="table table-striped col-md-12">
                    <thead>
                        <tr>
                            <th></th>
                            <th >Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th >Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderMenuInfo()}
                    </tbody>
                </table>

            </MainContainer>
        );
    }
}




export default Menu;

