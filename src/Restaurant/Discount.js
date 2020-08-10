import React, { Component } from "react";
import ds from "../Services/dataService";
import Parser from "html-react-parser";
import $ from "jquery";
import MainContainer from "../component/Style/MainContainer";
import FullscreenError from '../component/Style/FullscreenError'
import FullScrrenLoading from '../component/Style/FullscreenLoading';

const regExpNumbers = RegExp(/^[0-9]*$/);

const formValid = ({ isError, ...rest }) => {
    let isValid = false;
    Object.values(isError).forEach((val) => {
        if (val !== '&#160;') {
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

class Discount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discdescription: '',
            promdescription: '',
            discounts: [],
            contentTable: false,
            resultsErr: false,
            isResLoaded: false,
            isLoading: false,
            isError: {
                discdescription: "&#160;",
                promdescription: "&#160;"
            }
        };
        this.handleAddDiscount = this.handleAddDiscount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeInList = this.handleChangeInList.bind(this);
        this.discountEditButton = this.discountEditButton.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = this.state.isError;
        switch (name) {
            case "discdescription":
                isError.discdescription = regExpNumbers.test(value)
                    ? "&#160;"
                    : "Please put some promotional numbers";
                break;
            case "promdescription":
                isError.promdescription =
                    value.length >= 1 && value.length <= 255
                        ? "&#160;"
                        : "Atleast write something";
                break;
            default:
                break;
        }
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    handleChangeInList(e, index) {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };
        switch (name) {
            case "discdescription":
                isError.discdescription = regExpNumbers.test(value)
                    ? "&#160;"
                    : "Please put some promotional numbers";
                break;
            case "promdescription":
                isError.promdescription =
                    value.length >= 1 && value.length <= 255
                        ? "&#160;"
                        : "Atleast write something";
                break;
            default:
                break;
        }
        this.state.discounts[index][e.target.id] = e.target.value;
        this.forceUpdate();
    }

    handleAddDiscount = (e) => {
        e.preventDefault();
        var discount = {
            percent: this.state.discdescription,
            descript: this.state.promdescription
        }
      
            ds.addDiscount(discount).then(() => {
            this.queryDiscounts();
            $("#addDiscountText")
                .text("Disccount is added")
                .removeClass("alert-warning")
                .removeClass("alert-danger")
                .removeClass("alert-success")
                .addClass("alert-success");
        }).catch((err) => {
            $("#addDiscountText")
                .text("Sorry, " + err)
                .removeClass("alert-warning")
                .removeClass("alert-danger")
                .removeClass("alert-success")
                .addClass("alert-danger");
        });
        
    }

    componentWillMount() {
        this.queryDiscounts();
    }

    queryDiscounts() {
        this.setState({
            isLoading: true
        })
        ds.getDiscounts().then((res) => {
            
            this.setState({
                discounts: res.discounts
            })
            for (var discount of this.state.discounts) {
                discount.contentTable = false;
            }
            $("#DiscountEditResultModalText")
                .text("Disccount is change")
                .removeClass("alert-warning")
                .removeClass("alert-danger")
                .removeClass("alert-success")
                .addClass("alert-success");
        }).catch(err => {
            //TODO handling err
            $("#DiscountEditResultModalText")
                .text("Sorry, " + err)
                .removeClass("alert-warning")
                .removeClass("alert-danger")
                .removeClass("alert-success")
                .addClass("alert-danger");
        })

        this.setState({
            isLoading:false
        })
    }

    discountEditButton(index) {
        this.state.discounts[index].contentTable = !this.state.discounts[index].contentTable;
        if (!this.state.discounts[index].contentTable) {
            ds.editDiscount(this.state.discounts[index]);
        }

        this.callModal(index);
    }

    discountDeleteButton(index) {
        ds.deleteDiscount(this.state.discounts[index]).then(() => {
            this.queryDiscounts();
            $("#DiscountDDeleteResultModalText")
                .text("Discount is deleted")
                .removeClass("alert-warning")
                .removeClass("alert-danger")
                .removeClass("alert-success")
                .addClass("alert-success");
        }).catch((err) => {
            $("#DiscountDDeleteResultModalText")
                .text("Sorry, " + err)
                .removeClass("alert-warning")
                .removeClass("alert-danger")
                .removeClass("alert-success")
                .addClass("alert-danger");
        })
    }

    callModal(index) {
        this.setState(state => {
            return {
                discount: !state.discounts
            };
        },
            () => {
                if (this.state.discounts[index].contentTable) {
                    $('#save_edit_disc_btn').attr("data-toggle", 'modal').attr("data-target", '#DiscountEditResultModal').attr('type', 'button')
                }
                else {
                    $('#save_edit_disc_btn').attr("data-toggle", '').attr("data-target", '').attr("type", '')
                }

            });

    }

    renderDataDiscount() {
        return this.state.discounts.map((discount, index) => {
            return (
                <tr key={index}>
                    <th>

                        <input type="text" id={"discdescription" + index} name="discdescription"
                            defaultValue={this.state.discounts[index].percent} disabled={(!this.state.discounts[index].contentTable)}
                            onChange={(e) => this.handleChangeInList(e, index)} />


                    </th>
                    <th>
                        <textarea
                            rows="5"
                            id="promdescription"
                            name="promdescription"
                            defaultValue={this.state.discounts[index].description}
                            disabled={(!this.state.discounts[index].contentTable)}
                            onChange={(e) => this.handleChangeInList(e, index)}
                        ></textarea>


                    </th>
                    <th>
                        <button id='save_edit_disc_btn'
                            onClick={() => { this.discountEditButton(index) }
                            }
                            type="button" className="btn btn-primary mr-sm-4 "
                            data-target="#DiscountEditResultModal">
                            {this.state.discounts[index].contentTable ? "Save Change" : "Edit"}

                        </button>
                    </th>
                    <th>
                        <button
                            id='delete_btn'
                            type="button"
                            className="btn btn-danger btn-sm mr-sm-2"
                            onClick={() => { this.discountDeleteButton(index) }}
                            data-toggle="modal"
                            data-target="#DiscountDDeleteResultModal"
                        >
                            Delete
                        </button>
                    </th>
                </tr>
            )
        })
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



                <div className="container">
                    <div>
                        <br />
                        <h4>Discount Promotion</h4>
                        <hr />
                        <p>Add discounts or promotions here</p>
                        <div className="form-group row">
                            <label
                                htmlFor="discdescription"
                                className="col-sm-3 col-form-label"
                            >
                                Discount/Promotion
                      </label>
                            <div className="col-sm-2">
                                <input
                                    className={
                                        isError.discdescription.length > 6
                                            ? "is-invalid form-control"
                                            : "form-control"
                                    }
                                    rows="1"
                                    id="discdescription"
                                    name="discdescription"
                                    value={this.state.discdescription}
                                    onChange={this.handleChange}

                                ></input>
                                <span className="invalid-feedback">
                                    {Parser(isError.discdescription)}
                                </span>
                            </div>
                            <label
                                htmlFor="discdescription"
                                className="col-sm-2 col-form-label"
                            >
                                %
                      </label>
                        </div>

                        <div className="form-group row">
                            <label
                                htmlFor="promdescription"
                                className="col-sm-3 col-form-label"
                            >
                                Discount/Promotion Description
                      </label>
                            <div className="col-md-8">
                                <textarea
                                    className={
                                        isError.promdescription.length > 6
                                            ? "is-invalid form-control"
                                            : "form-control"
                                    }
                                    rows="5"
                                    id="promdescription"
                                    name="promdescription"
                                    value={this.state.promdescription}
                                    onChange={this.handleChange}

                                ></textarea>
                                <span className="invalid-feedback">
                                    {Parser(isError.promdescription)}
                                </span>
                            </div>
                        </div>

                        <button type="button"
                            onClick={this.handleAddDiscount.bind(this)}
                            className="btn btn-info"
                            data-toggle="modal"
                            data-target="#addDiscountResultModal">
                            Add Discount
                    </button>

                    </div>

                    <br />
                    <br />
                    <div>
                        <h4>Discount/Promotion List</h4>
                        <hr />
                        <table id="discount" className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">%</th>
                                    <th scope="col">Description</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderDataDiscount()}
                            </tbody>


                        </table>

                    </div>

                    <div
                        className="modal fade"
                        id="addDiscountResultModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="addDiscountModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="addDiscountModalLabel"
                                    >
                                        Discount
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
                                    <p
                                        className="alert alert-warning"
                                        id="addDiscountText"
                                    >
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



                    <div
                        className="modal fade"
                        id="DiscountDDeleteResultModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="DiscountDDeleteResultModal"
                        aria-hidden="true"
                    >

                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="DiscountDDeleteResultModal">
                                        Delete Discount
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
                                    <p className="alert alert-warning"
                                        id="DiscountDDeleteResultModalText">
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



                    <div
                        className="modal fade"
                        id="DiscountEditResultModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="DiscountEditResultModal"
                        aria-hidden="true"
                    >

                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="DiscountEditResultModal">
                                        Edit Discount
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
                                    <p className="alert alert-warning" id="DiscountEditResultModalText">
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
                </div>
            </MainContainer>
        )
    }



}

export default Discount;