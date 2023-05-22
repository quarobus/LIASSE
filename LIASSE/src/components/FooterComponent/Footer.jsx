import React from 'react';
import  './footer.scss';
//import 'bootstrap/dist/css/bootstrap.min.css';


const FooterComponent = () => {
return (
  <footer className="footer-footer">
      <div className="container-footer">
        <div className="row-footer">
          <div className="col-md-6 col-lg-3">
            <aside className="widget widget_text-footer">
              <div className="widget-title-footer">
                <h5>LIASSE</h5>
              </div>
              <div className="textwidget-footer">
                <i className="fa fa-caret-right" aria-hidden="true"></i> <a href="#">Home</a><br/>
                <i className="fa fa-caret-right" aria-hidden="true"></i> <a href="#">Blog</a><br/>
                <i className="fa fa-caret-right" aria-hidden="true"></i> <a href="#">Event</a><br/>
                <i className="fa fa-caret-right" aria-hidden="true"></i> <a href="#">Faculty</a><br/>
              
              </div>
            </aside>
          </div>
          <div className="col-md-6 col-lg-3">
            <aside className="widget widget_text-footer">
              <div className="widget-title-footer">
                <h5>About us</h5>
              </div>
              <div className="textwidget-footer">
                
               <p>the website of LIASSE AI Laboratory, a world-class research facility dedicated to advancing the field of artificial intelligence. Our team of experts brings together decades of experience in AI research, machine learning, computer vision, natural language processing, and robotics.</p>
               </div>
            </aside>
          </div>
          <div className="col-md-6 col-lg-3">
            
            <aside className="widget widget_text-footer widget_tag_cloud">
              <div className="widget-title-footer">
                <h5>Contact</h5>
              </div>
              <div className="textwidget-footer">
                E-mail: <a href="#"><span className="__cf_email__" data-cfemail="e39486818e8290978691a3868d908285cd8280cd8e82">[email&#160;protected]</span></a> <br/>
                Phone: +212535600403 <br/>
                Fax: +212535600386 <br/>
              
              </div>
              <div className="tagcloud"><a className="m-t-20" href="#">Nous contacter</a></div>
            </aside>
          </div>
          
          <div className="col-md-6 col-lg-3">
           
            <aside className="widget widget_text-footer">
              <div className="widget-title-footer">
                <h5>Adresse</h5>
              </div>
              <div className="textwidget-footer">
                Ecole Nationale des Sciences Appliquées, Avenue My Abdallah Km 5<br/>Route d'Imouzzer, Fès BP 72.<br/>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container-footer">
          <div className="row-footer">
            <div className="col-md-12">
              <div className="text-center"><span className="copyright">© 2023 LIASSE, Copyright LIASSE</span></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    );
}



export default FooterComponent;
