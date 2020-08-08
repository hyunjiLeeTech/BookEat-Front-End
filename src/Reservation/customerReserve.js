import React, { Component } from 'react'
// import { NavLink, Link } from 'react-router-dom'
import dataService from '../Services/dataService';
import MainContainer from '../component/Style/MainContainer';
import $ from 'jquery';
import Layout from '../component/RestaurantLayout/Layout'
import { Animated } from 'react-animated-css';
import Axios from 'axios';
import authHeader from '../Services/authHeader';
import { withRouter } from "react-router";
import moment from 'moment'
import { FaLessThanEqual } from 'react-icons/fa';
class Reserve extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numofpeople: this.props.match.params.numOfPeople ? this.props.match.params.numOfPeople: 0 ,
            dateTime: new Date(),
            date: this.props.match.params.date? moment(new Date(this.props.match.params.date + ' 01:00')).format('YYYY-MM-DD') : moment().add(1, 'd').format('YYYY-MM-DD'),
            time: this.props.match.params.time ? this.props.match.params.time : '12:30',
            resId: this.props.match.params.id, //FIXME FOR DEBUG
            tablestatus: false,
            tables: [],
            formIsVisible: true,
            tableIsVisible: false,
            resultIsVisible: false,
            selectedtableId: '',
            result: {},
            rorminfo: {
                OwnerAccount: "",
                Managers: ""
            },
            menuItems: [],
            selectedMenuItems: new Set(),
            isUpdate: this.props.match.params.isUpdate === 'true'? true : false,
            reservation: {},
            reservationId: this.props.match.params.isUpdate === 'true' ? this.props.match.params.reservationId : '',
            isLoading: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.back = this.back.bind(this);
        this.book = this.book.bind(this);
        this.setTableId = this.setTableId.bind(this);
        this.getRoRmInfo = this.getRoRmInfo.bind(this);
        this.getMenuInfo = this.getMenuInfo.bind(this);
        this.renderMenuItems = this.renderMenuItems.bind(this);
        this.renderForm = this.renderForm.bind(this);
        console.log(new Date(this.props.match.params.date))
    }

    componentWillMount(){

    }

    setTableId(id) {
        this.setState({
            selectedtableId: id
        })
    }

    getRoRmInfo() {//TODO: only for testing, should be deleted in production envinroment.
        Axios.post("http://localhost:5000/Restaurant/getRestaurantOwnerAndManagerViaRestaurantId", { restaurantId: this.state.resId }, { headers: authHeader() }).then(res => {
            console.log(res)
            this.setState({
                rorminfo: {
                    OwnerAccount: res.data.Owner.account,
                    Managers: res.data.Managers
                }
            })
        })
    }

    componentDidMount() {
        this.getRoRmInfo();
        this.getMenuInfo();
    }

    handleSubmit(e) {
        // var react = this;
        e.preventDefault();
        var numofpeople = $('#numofpeople').val();
        var resId = this.state.resId;
        var dateTime = new Date(Date.parse(this.state.date + ' ' + this.state.time));
        this.setState({
            resId: resId,
            dateTime: dateTime,
            numofpeople: numofpeople
        })
        dataService.getTableStatus({
            resId: resId,
            numOfPeople: numofpeople,
            dateTime: dateTime
        }).then(res => {
            this.setState({
                formIsVisible: false,
                tables: res.tables
            })
            setTimeout(() => {
                this.setState({
                    tableIsVisible: true,
                })
            }, 500)

            console.log(this.state)
        }).catch(err => {
            console.log(err)
        })
    }
    renderForm() {
        const dateChange = (e) =>{
            e.preventDefault();
            var value = e.target.value;
            this.setState({date: value})
        }
        const numofpeopleChange = (e) =>{
            e.preventDefault();
            var value = e.target.value;
            this.setState({numofpeople: value})
        }
        return (
            <form onSubmit={this.handleSubmit} className="needs-validation" noValidate>
                <div className="page-header text-left" style={{ marginTop: '10%' }}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <h3>Please provide your information to reserve</h3>
                    </Animated>
                </div>
                <div className="col-xs-12 col-md-12 ">

                    <div className="form-group row">
                        <label htmlFor="numofpeople" className="col-sm-2 col-form-label" > Number of people </label>
                        <div className="col-sm-6">
                            <input type="number" id="numofpeople" name="numofpeople" placeholder="Number of People"
                                className='form-control' required value={this.state.numofpeople} onChange={numofpeopleChange}/>
                            {/* <span className="valid-feedback"></span> */}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="date" className="col-sm-2 col-form-label" > Date </label>
                        <div className="col-sm-6">
                            <input type="date" id="date" name="date" placeholder="date"
                                value={this.state.date} onChange={dateChange} className='form-control' required />
                            {/* <span className="valid-feedback"></span> */}
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="time" className="col-sm-2 col-form-label" > Time </label>
                        <div className="col-sm-6">
                            {/* <input type="text" id="time" name="time" placeholder="time"
                                className='form-control' required />
                            <span className="valid-feedback"></span> */}
                            {this.renderTimeOption(this.state.date)}
                        </div>
                    </div>
                    {this.renderMenuItems(this.state.menuItems)}
                    <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#signResultModal" >Next</button>
                </div>
            </form>
        )
    }

    back() {
        this.setState({
            formIsVisible: true,
            tableIsVisible: false,
        })
        setTimeout(() => {
            this.setState({
                tablestatus: false,
            })

            while (this.state.tables.length > 0) {
                this.state.tables.pop();
            }
        }, 500)
    }

    book() {
        console.log(this.state);
        dataService.customersReserve({
            numOfPeople: this.state.numofpeople,
            dateTime: this.state.dateTime,
            tableId: this.state.selectedtableId,
            comments: this.state.comments,
            menuItems: Array.from(this.state.selectedMenuItems),
        }).then(res => {
            if (res.errcode === 0) {
                console.log(res)
                this.setState({
                    tableIsVisible: false,
                    tablestatus: false,
                })



                setTimeout(() => {
                    this.setState({
                        resultIsVisible: true,
                        result: res.reservation,
                    })
                }, 500)
            }

        }).catch(err => {
            console.log(err)
        })
    }

    getMenuInfo(){
        var id = this.state.resId;
        dataService.getMenusCustomer(id).then(res=>{
            console.log(res.menus)
            this.setState({
                menuItems: res.menus,
            })
        }).catch(err=>{
            console.log(err)
        })
    }    

    renderTimeOption(date) {
        var options = [
            <option {...(new Date(date + ' 0:00') < new Date() ? { disabled: true } : {})} value="00:00">12:00 AM</option>,
            <option {...(new Date(date + ' 0:30') < new Date() ? { disabled: true } : {})} value="00:30">12:30 AM</option>,
            <option {...(new Date(date + ' 1:00') < new Date() ? { disabled: true } : {})} value="01:00">1:00 AM</option>,
            <option {...(new Date(date + ' 1:30') < new Date() ? { disabled: true } : {})} value="01:30">1:30 AM</option>,

            <option {...(new Date(date + ' 7:00') < new Date() ? { disabled: true } : {})} value="07:00">7:00 AM</option>,
            <option {...(new Date(date + ' 7:30') < new Date() ? { disabled: true } : {})} value="07:30">7:30 AM</option>,
            <option {...(new Date(date + ' 8:00') < new Date() ? { disabled: true } : {})} value="08:00">8:00 AM</option>,
            <option {...(new Date(date + ' 8:30') < new Date() ? { disabled: true } : {})} value="08:30">8:30 AM</option>,
            <option {...(new Date(date + ' 9:00') < new Date() ? { disabled: true } : {})} value="09:00">9:00 AM</option>,
            <option {...(new Date(date + ' 9:30') < new Date() ? { disabled: true } : {})} value="09:30">9:30 AM</option>,
            <option {...(new Date(date + ' 10:00') < new Date() ? { disabled: true } : {})} value="10:00">10:00 AM</option>,
            <option {...(new Date(date + ' 10:30') < new Date() ? { disabled: true } : {})} value="10:30">10:30 AM</option>,
            <option {...(new Date(date + ' 11:00') < new Date() ? { disabled: true } : {})} value="11:00">11:00 AM</option>,
            <option {...(new Date(date + ' 11:30') < new Date() ? { disabled: true } : {})} value="11:30">11:30 AM</option>,
            <option {...(new Date(date + ' 12:00') < new Date() ? { disabled: true } : {})} value="12:00">12:00 PM</option>,
            <option {...(new Date(date + ' 12:30') < new Date() ? { disabled: true } : {})} value="12:30">12:30 PM</option>,
            <option {...(new Date(date + ' 13:00') < new Date() ? { disabled: true } : {})} value="13:00">1:00 PM</option>,
            <option {...(new Date(date + ' 13:30') < new Date() ? { disabled: true } : {})} value="13:30">1:30 PM</option>,
            <option {...(new Date(date + ' 14:00') < new Date() ? { disabled: true } : {})} value="14:00">2:00 PM</option>,
            <option {...(new Date(date + ' 14:30') < new Date() ? { disabled: true } : {})} value="14:30">2:30 PM</option>,
            <option {...(new Date(date + ' 15:00') < new Date() ? { disabled: true } : {})} value="15:00">3:00 PM</option>,
            <option {...(new Date(date + ' 15:30') < new Date() ? { disabled: true } : {})} value="15:30">3:30 PM</option>,
            <option {...(new Date(date + ' 16:00') < new Date() ? { disabled: true } : {})} value="16:00">4:00 PM</option>,
            <option {...(new Date(date + ' 16:30') < new Date() ? { disabled: true } : {})} value="16:30">4:30 PM</option>,
            <option {...(new Date(date + ' 17:00') < new Date() ? { disabled: true } : {})} value="17:00">5:00 PM</option>,
            <option {...(new Date(date + ' 17:30') < new Date() ? { disabled: true } : {})} value="17:30">5:30 PM</option>,
            <option {...(new Date(date + ' 18:00') < new Date() ? { disabled: true } : {})} value="18:00">6:00 PM</option>,
            <option {...(new Date(date + ' 18:30') < new Date() ? { disabled: true } : {})} value="18:30">6:30 PM</option>,
            <option {...(new Date(date + ' 19:00') < new Date() ? { disabled: true } : {})} value="19:00">7:00 PM</option>,
            <option {...(new Date(date + ' 19:30') < new Date() ? { disabled: true } : {})} value="19:30">7:30 PM</option>,
            <option {...(new Date(date + ' 20:00') < new Date() ? { disabled: true } : {})} value="20:00">8:00 PM</option>,
            <option {...(new Date(date + ' 20:30') < new Date() ? { disabled: true } : {})} value="20:30">8:30 PM</option>,
            <option {...(new Date(date + ' 21:00') < new Date() ? { disabled: true } : {})} value="21:00">9:00 PM</option>,
            <option {...(new Date(date + ' 21:30') < new Date() ? { disabled: true } : {})} value="21:30">9:30 PM</option>,
            <option {...(new Date(date + ' 22:00') < new Date() ? { disabled: true } : {})} value="22:00">10:00 PM</option>,
            <option {...(new Date(date + ' 22:30') < new Date() ? { disabled: true } : {})} value="22:30">10:30 PM</option>,
            <option {...(new Date(date + ' 23:00') < new Date() ? { disabled: true } : {})} value="23:00">11:00 PM</option>,
            <option {...(new Date(date + ' 23:30') < new Date() ? { disabled: true } : {})} value="23:30">11:30 PM</option>,
        ];

        const timeChange = (e)=>{
            e.preventDefault()
            const value = e.target.value;
            console.log(value)
            this.setState({time: value})            
        }

        return (
            <select
                className="custom-select"
                id="time"
                name="time"
                value={this.state.time}
                onChange={timeChange}
                required
            >
                <option value="">Time</option>
                {options}
            </select>
        )



    }

    renderMenuItems(items){
        var tr = [];
        var reactThis = this;
        var handler = function(e){
            if(e.target.checked){
                reactThis.state.selectedMenuItems.add(e.target.value);
            }else{
                reactThis.state.selectedMenuItems.delete(e.target.value);
            }
            console.log(reactThis.state.selectedMenuItems)
        }
        for(var item of items){
            tr.push(
                <div>
                <input type='checkbox' value={item._id} onChange={handler}/>
                <label>{item.menuName}</label>
            </div>
            )
        }
        return tr;
    }

    render() {
        return (
            //partial code from https://tobiasahlin.com/spinkit/, modified.
            <MainContainer>
                <div className="row">
                    {this.state.formIsVisible ?

                        <div className="row">
                            <div className='col-md-8'>
                            {this.renderForm()}
                            </div>
                            <div className='col-md-4'>
                                <img src="https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?cs=srgb&dl=table-in-vintage-restaurant-6267.jpg&fm=jpg" style={{ marginTop: '5%' }} className="col-md-12" />
                                <h4 style={{ marginLeft: '5%' }}>Test Restaurant</h4>
                                <p style={{ marginLeft: '10%' }}>Restaurant Decription goes here</p>
                            </div>
                        </div>
                        : null}

                    {this.state.tableIsVisible ?
                        <div className="col-xs-12 col-md-12">
                                <div className="page-header text-left" style={{ marginTop: '5%' }}>
                                    <h3>Please Select a table</h3>
                                </div>
                                <Layout tables={this.state.tables} setTableId={this.setTableId} />
                                <div className="row">
                                    <div className="col-md-3">
                                        <button className="btn btn-warning" onClick={this.back}>Back</button>
                                    </div>
                                    <div className="col-md-6">

                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn btn-primary" onClick={this.book}>Book</button>
                                    </div>
                                </div>
                        </div> : null}
                    {this.state.resultIsVisible ?
                            <div className="page-header text-left" style={{ marginTop: '5%' }}>
                                <h3>Thanks for reserving</h3>
                                <h4>This is your reservation:</h4>
                                <p>Customer Name: {this.state.result.customer.firstName + " " + this.state.result.customer.lastName}</p>
                                <p>Time: {new Date(this.state.result.dateTime).toString()}</p>
                                <p>Restaurant: {this.state.result.restaurant.resName}</p>
                                <p>Number of People: {this.state.result.numOfPeople}</p>
                                <p>Restaurant Phone Number: {this.state.result.restaurant.businessNum}</p>
                            </div>
                         : null}


                </div>
            </MainContainer>
        )
    }

}


export default withRouter(Reserve);