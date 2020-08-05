import React, { Component } from 'react'
import DataService from '../Services/dataService';
import Layout from '../component/RestaurantLayout/Layout'
import Button from 'react-bootstrap/Button'

class RestaurantLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tables: []
        }
        DataService.getTables().then((res) => {
            console.log(res);
            for(var t of res.tables){
                t.isOpen = t.status
                t.isEdited = false;
                t.buttonDisabled = false;
            }
            this.setState({ tables: res.tables }, () => {

            })
        }).catch(err=>{
            console.log(err);
        })
        this.addTable = this.addTable.bind(this);
        this.delTable = this.delTable.bind(this);
        this.renderTablesTable = this.renderTablesTable.bind(this);

    }

    addTable(){
        this.state.tables.push( this.state.tables[0])
        this.forceUpdate();
    }
    delTable(){
        this.state.tables.pop();
        this.forceUpdate();
    }
    renderTablesTable(tables){
        var tr = [];
        var btnClick = (e) => {
            console.log(e.target.id);
            var t = null;
            for(var table of tables){
                if(table._id === e.target.id) t = table;
            }
            if(t != null){
                t.buttonDisabled = true;
                this.forceUpdate();
                setTimeout(()=>{
                    t.buttonDisabled = false;
                    this.forceUpdate();
                }, 5000)
            }

        }
        for(var index in tables){
            tr.push(
                <tr>
                    <td><input type='checkbox' checked={tables[index].status ? 'checked' : ''}></input></td>
            <td>{tables[index].size}</td>
            <td>{<input type='checkbox' checked={tables[index].isNearWindow ? 'checked' : ''}></input>}</td>
            <td><Button onClick={btnClick} id={tables[index]._id} className="btn btn-primary" disabled={tables[index].buttonDisabled ? "disabled" : ''}>{tables[index].buttonDisabled? 'Updating' : 'Update'}</Button></td>
                </tr>
            )
        }
        return tr;

    }

    render() {
        return (
            <div>
            <p> Insert layout here
                <Layout tables={this.state.tables} selectedTableId={id => console.log(id)} />
                {JSON.stringify(this.state.tables)}
                <button onClick={this.addTable} >add</button>
                <button onClick={this.delTable} >del</button>
            </p>

            <table className="table table table-striped">
                <thead>
                <td>Is Open</td>
                <td>Table Size</td>
                <td>Near Window</td>
                <td>Operation</td>
                </thead>
                <tbody>
                    {this.renderTablesTable(this.state.tables)}
                </tbody>
            </table>
            </div>
        )
    }

}

export default RestaurantLayout;