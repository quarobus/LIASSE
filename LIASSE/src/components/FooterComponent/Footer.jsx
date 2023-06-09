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
                <i className="fa fa-caret-right" aria-hidden="true"></i> <a className='FooterLink' href="#">Home</a><br/>
                <i className="fa fa-caret-right" aria-hidden="true"></i> <a className='FooterLink' href="#">Blog</a><br/>
                <i className="fa fa-caret-right" aria-hidden="true"></i> <a className='FooterLink' href="#">Event</a><br/>
                <i className="fa fa-caret-right" aria-hidden="true"></i> <a className='FooterLink' href="#">Faculty</a><br/>
              
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
                
              </div>
              <div className="tagcloud"><a className='FooterLink' href="#">Nous contacter</a></div>
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
