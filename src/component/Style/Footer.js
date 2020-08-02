
import React, { Component } from 'react'
import './Footer.css'
// import $ from 'jquery'


class Footer extends Component{
  // componentDidUpdate(){
  //   var screenHeight = $(window).height();
  //   var headerHeight = $("nav.navbar").height();
  //   var bodyHeight = $("div.body").height();
  //   var footerHeight = $("div.footer").height();
  //   if(bodyHeight === isNaN) bodyHeight = 0;
  //   if((headerHeight + bodyHeight + footerHeight)<screenHeight){
  //     console.log("in")
  //     var fix = screenHeight - headerHeight - footerHeight;
  //     $("div.body").css("height", fix + "px");
  //   }  
  // }

  // componentDidMount(){

    
  //   window.onresize=function(){
  //     $("div.body").css("height", "");
  //     var screenHeight = $(window).height();
  //     var headerHeight = $("nav.navbar").height();
  //     var bodyHeight = $("div.body").height();
  //     var footerHeight = $("div.footer").height();
  //     if(bodyHeight === isNaN) bodyHeight = 0;
  //     console.log("resize")
  //     console.log(screenHeight);
  //     console.log(headerHeight);
  //     console.log(footerHeight);
  //     console.log(bodyHeight);
  //     if((headerHeight + bodyHeight + footerHeight)<screenHeight){
  //       console.log("in")
  //       var fix = screenHeight - headerHeight - footerHeight;
  //       console.log(fix);
  //       $("div.body").css("height", fix + "px");
  //     }
  //   }
  //   if(bodyHeight === isNaN) bodyHeight = 0;

  //   var screenHeight = $(window).height();
  //   var headerHeight = $("nav.navbar").height();
  //   var bodyHeight = $("div.body").height();
  //   var footerHeight = $("div.footer").height();

  //   if((headerHeight + bodyHeight + footerHeight)<screenHeight){
  //     console.log("in")
  //     var fix = screenHeight - headerHeight - footerHeight;
  //     $("div.body").css("height", fix + "px");
  //   }
  // }

  render(){
    return (
   
      <footer className="page-footer font-small bg-dark">

        <div className="footer-copyright text-center py-3 text-muted">© 2020 Copyright: BookEat
        </div>
       
      </footer>
     
     
    );
  }
}



export default Footer;