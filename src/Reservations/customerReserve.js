import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import dataService from '../Services/dataService';
import MainContainer from '../component/Style/MainContainer';
import $ from 'jquery';
import Layout from '../component/RestaurantLayout/Layout'
import { Animated } from 'react-animated-css';

class Reserve extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numofpeople: 0,
            dateTime: new Date(),
            resId: '5efa8fc9dd9918ba08ac9ade', //FIXME FOR DEBUG
            tablestatus: false,
            tables: [],
            formIsVisible: true,
            tableIsVisible: false,
            resultIsVisible: false,
            selectedtableId: '',
            result: {},
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.back = this.back.bind(this);
        this.book = this.book.bind(this);
        this.setTableId = this.setTableId.bind(this);
    }

    setTableId(id) {
        this.setState({
            selectedtableId: id
        })
    }
    componentDidMount() {

    }

    handleSubmit(e) {
        var react = this;
        e.preventDefault();
        console.log("submit")
        var numofpeople = $('#numofpeople').val();
        var date = $('#date').val();
        var time = $('#time').val();
        var resId = '5efa8fc9dd9918ba08ac9ade';
        var dateTime = new Date(Date.parse(date + ' ' + time));
        console.log(numofpeople)
        console.log(date)
        console.log(time)
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
        return (<form onSubmit={this.handleSubmit} className="col-xs-12 col-md-12 needs-validation" noValidate>
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
                            className='form-control' required />
                        {/* <span className="valid-feedback"></span> */}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="date" className="col-sm-2 col-form-label" > Date </label>
                    <div className="col-sm-6">
                        <input type="date" id="date" name="date" placeholder="date"
                            className='form-control' required />
                        {/* <span className="valid-feedback"></span> */}
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="time" className="col-sm-2 col-form-label" > Time </label>
                    <div className="col-sm-6">
                        <input type="text" id="time" name="time" placeholder="time"
                            className='form-control' required />
                        {/* <span className="valid-feedback"></span> */}
                    </div>
                </div>
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
        }).then(res => {
            if (res.errcode === 0) {
                console.log(res)
                this.setState({
                    tableIsVisible:false,
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

    render() {
        return (
            //partial code from https://tobiasahlin.com/spinkit/, modified.
            <MainContainer>
                <div className="row">
                    {this.state.formIsVisible ? 
                        <Animated animationIn="fadeInRight" animationOut="fadeOutLeft" animationInDuration={500} animationOutDuration={500} isVisible={this.state.formIsVisible}>{this.renderForm()}</Animated>
                    : null
                    }
                    <div className="col-xs-8 col-md-8">
                        {this.state.tableIsVisible ? <Animated animationIn="fadeInRight" animationOut="fadeOutLeft" animationInDuration={500} animationOutDuration={500} isVisible={this.state.tableIsVisible}>
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
                        </Animated> : null}
                    </div>
                    {this.state.resultIsVisible ?
                    <Animated animationIn="fadeInRight" animationOut="fadeOutLeft" animationInDuration={500} animationOutDuration={500} isVisible={this.state.resultIsVisible}>
                        <div className="page-header text-left" style={{ marginTop: '5%' }}>
                            <h3>Thanks for reserving</h3>
                            <h4>This is your reservation:</h4>
                            <p>Customer Name: {this.state.result.customer.firstName + "" + this.state.result.customer.lastName}</p>
                            <p>Time: {new Date(this.state.result.dateTime).toString()}</p>
                            <p>Restaurant: {this.state.result.restaurant.resName}</p>
                            <p>Number of People: {this.state.result.numOfPeople}</p>
                            <p>Restaurant Phone Number: {this.state.result.restaurant.businessNum}</p>
                        </div>
                    </Animated> : null}
                
                
                </div>
            </MainContainer>
        )
    }

}


export default Reserve;