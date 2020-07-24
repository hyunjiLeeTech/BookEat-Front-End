import React, { Component } from "react";
import table_s from '../../Image/table-s.png'
import table_m from '../../Image/table-m.png' //TODO: find table_m picture
import table_l from '../../Image/table-l.png' //TODO: find table_l picture
import './Layout.css'
import $ from 'jquery';
import Carousel from 'react-bootstrap/Carousel'

class Layout extends Component {
    constructor(props) {
        super(props);
        if (props.tables) {
            this.tables = props.tables;
            this.state = {
                carouselIndex: 0,

            }
        }
        this.genCarousel = this.genCarousel.bind(this);
    }

    componentWillMount() {
        //fetch tables data from serverside
        //...
        //sample data:
        var tables = [
            //id - table id in database, unique in database.
            //rtid - table id in the restaurant  
            //isOpen - table open status from server side.
            //prefers - table prefers decided from server side.
            { id: 101, rtid: 1, restaurantId: 1, isOpen: true, capacity: 4, prefers: "door washroom" },
            //{ id: 102, rtid: 2, restaurantId: 1, isOpen: false, capacity: 4, prefers: "door washroom" },
            { id: 103, rtid: 3, restaurantId: 1, isOpen: false, capacity: 4, prefers: "quite" },
            { id: 104, rtid: 4, restaurantId: 1, isOpen: true, capacity: 4, prefers: "kitchen" },
            { id: 106, rtid: 5, restaurantId: 1, isOpen: false, capacity: 6, prefers: "door" },
            { id: 108, rtid: 6, restaurantId: 1, isOpen: true, capacity: 6, prefers: "washroom" },
            { id: 111, rtid: 7, restaurantId: 1, isOpen: false, capacity: 6, prefers: "" },
            //{ id: 112, rtid: 8, restaurantId: 1, isOpen: false, capacity: 9, prefers: "quite" },
            //{ id: 115, rtid: 9, restaurantId: 1, isOpen: false, capacity: 9, prefers: "" },
            { id: 119, rtid: 10, restaurantId: 1, isOpen: false, capacity: 9, prefers: "kitchen" },
        ]
        if (!this.tables)
            this.tables = tables;
        else {
            tables = this.tables;
        }

        var rowshtmls = [];
        // var tableCount = tables.length > 9 ? 9 : tables.length;
        // for (var i = 0; i < tableCount / 3; i++) {
        //     var row = [];
        //     for (var j = 0; j < 3; j++) {
        //         if ((3 * i + j) >= tableCount) continue;
        //         var theTable = tables[3 * i + j];
        //         var cn = theTable.prefers + " r-table col-md-4 hovereffect" + (theTable.isOpen ? " open" : " close");
        //         var tableImg = table_s;
        //         if (theTable.capacity <= 4) tableImg=table_s;
        //         else if(theTable.capacity <= 7) tableImg=table_m;
        //         else if(theTable.capacity <= 10) tableImg=table_l;
        //         row.push(
        //             <div key={theTable.id} className={cn + " r-table-s"} id={(3 * i + j)}>
        //                 <img src={tableImg} className={theTable.isOpen ? " img-responsive" : ""} />
        //                 {theTable.isOpen ?
        //                     <div className="overlay">
        //                         <h2>Click to Reserve</h2>
        //                     </div> : <div>
        //                         <div className="overlay">
        //                             <p className="info">Unavalible</p>
        //                         </div>
        //                     </div>}
        //             </div>
        //         )

        //     }
        //     rowshtmls.push(<div key={"r" + i} className="row">
        //         {row}
        //     </div>);
        // }
        var tableCount = tables.length;
        var row = [];
        for (var i in tables) {
            var theTable = tables[i];
            var cn = theTable.prefers + " r-table col-md-4 hovereffect animated bounce" + (theTable.isOpen ? " open" : " close");
            var tableImg = table_s;
            if (theTable.capacity <= 4) tableImg = table_s;
            else if (theTable.capacity <= 7) tableImg = table_m;
            else if (theTable.capacity <= 10) tableImg = table_l;
            row.push(
                <div key={theTable._id} className={cn + " r-table-s"} id={i}>
                    <img src={tableImg} className={theTable.isOpen ? " img-responsive" : ""} />
                    {theTable.isOpen ?
                        <div className="overlay">
                            <h2>Click to Reserve</h2>
                        </div> : <div>
                            <div className="overlay">
                                <p className="info">Unavalible</p>
                            </div>
                        </div>}
                </div>
            )
        }

        //this.rowhtmls = rowshtmls;
        this.rows = row;
    }

    genCarousel(htmls) {
        const handleSelect = (selectedIndex, e) => {
            this.setState({ carouselIndex: selectedIndex });
        };
        var rows = []; //a list of row that contains 3 itmes 
        var tempItems = []; // a list of items. usually no more than 3;         
        for (var i in htmls) { //generate row
            i = Number.parseInt(i)

            if (i !== 0 && i % 3 === 0) {
                rows.push(<div key={"r" + rows.length} className="row">
                    {tempItems}
                </div>)
                tempItems = [];
            }
            tempItems.push(htmls[i])
        }
        if (tempItems.length !== 0) {
            rows.push(<div key={"r" + rows.length} className="row">
                {tempItems}
            </div>)
            tempItems = [];
        }



        var slides = [];
        var tempRows = [];


        for (var i in rows) { //generate slides
            i = Number.parseInt(i)
            if (i !== 0 && i % 3 === 0) {
                slides.push(<Carousel.Item key={'slide'+slides.length}>
                    <div style={{marginLeft: '15%', marginRight: '15%'}}>
                        {tempRows}
                    </div>
                </Carousel.Item>)
                tempRows = new Array();
            }
            tempRows.push(rows[i])
        }


        if (tempRows.length !== 0) {
            slides.push(<Carousel.Item  key={'slide'+slides.length}>
                <div style={{marginLeft: '15%', marginRight: '15%'}} >
                    {tempRows}
                </div>
            </Carousel.Item>)
            tempRows = [];
        }

        return (
            <Carousel activeIndex={this.state.carouselIndex} indicators={true} interval={null} onSelect={handleSelect}>
                {slides}
            </Carousel>
        );
    }











    componentDidMount() { //TODO: add prefer icon depends on the table prefereces, e.g. quite, door, etc.
        var reactThis = this; //get react reference.
        $(".r-table.open").on("click", function () {
            $('.r-table').css("background-color", "")
            var id = parseInt($(this).attr("id"));
            $(this).css("background-color", "red")
            //alert('Clicked table: ' + JSON.stringify(reactThis.tables[id]));
            reactThis.props.setTableId(reactThis.tables[id]._id);
            this.selectedTable = reactThis.tables[id];
        })
        var row = $('.carousel-item div.row img');
        row.first().one('load', function(){
            $('.carousel-item').css('min-height', $(this).height()*3+'px');
        })

    }



    render() {
        return (
            <div className="layoutwrapper" style={{background:'#aaaaaa'}}>
                {this.genCarousel(this.rows)}
            </div>
        )
    }
}

export default Layout