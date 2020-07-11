import React, { Component } from "react";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import $ from "jquery";
import { Tab } from "bootstrap";
import Maincontainer from "../../component/Style/MainContainer"

class CustomerReviewHistory extends Component {
    render(){
        return(
            <Maincontainer>
<div className="form-group">
                <br />
                <br />
                <h3> My Rievew List</h3>
                <div form id="review">
                  <table className="table table-striped ">
                    <thead>
                      <tr className>
                        <th>Date</th>
                        <th>Review</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className>2020-06-01</td>
                        <td className>stake</td>
                        <td className>
                          {" "}
                          <div className="form-inline">
                            <div className="form-group">
                              <Link to="/">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm mr-sm-2"
                                >
                                  Edit
                                </button>
                              </Link>
                            </div>
                            <div className="form-group">
                              <Link to="/">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm mr-sm-2"
                                >
                                  Delete
                                </button>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2020-06-01</td>
                        <td>stake</td>
                        <td>
                          {" "}
                          <div className="form-inline">
                            <div className="form-group">
                              <Link to="/">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm mr-sm-2"
                                >
                                  Edit
                                </button>
                              </Link>
                            </div>
                            <div className="form-group">
                              <Link to="/">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm mr-sm-2"
                                >
                                  Delete
                                </button>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>2020-06-01</td>
                        <td>wine</td>
                        <td>
                          {" "}
                          <div className="form-inline">
                            <div className="form-group">
                              <Link to="/">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm mr-sm-2"
                                >
                                  Edit
                                </button>
                              </Link>
                            </div>
                            <div className="form-group">
                              <Link to="/">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm mr-sm-2"
                                >
                                  Delete
                                </button>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Maincontainer>
        )}}

        export default CustomerReviewHistory;