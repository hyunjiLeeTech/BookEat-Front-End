import React, { Component } from 'react'
import DataService from '../Services/dataService';
import Layout from '../component/RestaurantLayout/Layout'

class RestaurantLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tables: []
        }
        DataService.getTables().then((res) => {
            console.log(res);
            this.setState({ tables: res.tables })
        }).catch(err=>{
            console.log(err);
        })
        this.addTable = this.addTable.bind(this);
        this.delTable = this.delTable.bind(this);
    }

    addTable(){
        this.state.tables.push( this.state.tables[0])
        this.forceUpdate();
    }
    delTable(){
        this.state.tables.pop();
        this.forceUpdate();
    }

    render() {
        return (
            <p> Insert layout here
                <Layout tables={this.state.tables} selectedTableId={id => console.log(id)} />
                {JSON.stringify(this.state.tables)}
                <button onClick={this.addTable} >add</button>
                <button onClick={this.delTable} >del</button>
            </p>
        )
    }

}

export default RestaurantLayout;