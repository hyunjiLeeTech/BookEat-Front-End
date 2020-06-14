import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'


const Footer = () => {
  return (
   
    <footer className="page-footer font-small bg-muted">
      <div className="container text-center text-md-left mt-5 bg-muted">
        <div className="row mt-3">
          <div className="col-md-4 col-xs-6 text-muted">
            <h6 className="text-uppercase font-weight-bold">BookEat</h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto " />
            <p>Something Amazing Here</p>
          </div>
    
          <div className="col-md-4 col-xs-6 text-muted">
            <h6 className="text-uppercase font-weight-bold">Useful links</h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" />
            <p>
              <Link> Some Link</Link>
            </p>
            <p>
              <Link> Some Link</Link>
            </p>
            <p>
            <Link> Some Link</Link>
            </p>
            <p>
            <Link> Some Link</Link>
            </p>
    
          </div>
        
          <div className="col-md-4 col-xs-6 text-muted">
    
            <h6 className="text-uppercase font-weight-bold">Contact</h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"/>
            <p>
              <i className="fas fa-home mr-3"></i> Toronto, Ontario</p>
            <p>
              <i className="fas fa-envelope mr-3"></i> info@example.com</p>
            <p>
              <i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
            <p>
              <i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
    
          </div>
          
    
        </div>
       
    
      </div>
     
      <div className="footer-copyright text-center py-3 text-muted">© 2020 Copyright:
      
      </div>
     
    
    </footer>
   
   
  );
}

export default Footer;