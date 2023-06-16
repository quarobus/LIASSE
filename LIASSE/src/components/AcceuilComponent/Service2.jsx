import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Service2.scss";

function Service2() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles from the backend
    axios.get("http://localhost/api/latest.php").then((response) => {
      console.log(response.data)
      setArticles(response.data.slice(0, 6));
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const truncateText = (text) => {
    if (text.length > 100) {
      return text.slice(0, 150) + "...";
    }
    return text;
  };

  return (
    <div className="pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div className="section-head col-sm-12">
            <h4><span>Latest</span> Articles</h4>
          </div>
          {articles.map((article) => {
            return (
              <div className="col-lg-4 col-sm-6" key={article.id}>
                <div className="item2">
                  <div className="pic">
                    <img src={article.image} alt="Article" />

                    <div className="date">
                      <span className="day">{new Date(article.created_at).toLocaleDateString("en-US", { day: "numeric" })}</span>
                      <span className="month">{new Date(article.created_at).toLocaleDateString("en-US", { month: "short" })}</span>
                      <span className="year">{new Date(article.created_at).toLocaleDateString("en-US", { year: "numeric" })}</span>
                    </div>
                  </div>
                  <h5 className="fw-bold">{article.title}</h5>
                  <p style={{ wordWrap: "break-word", marginLeft: "0.5rem", marginRight: "0.5rem" }}>{truncateText(article.abstract)}</p>
                  <div className="d-flex align-items-center justify-content-between mt-3 pb-3">
                    <a href="#" className="admin" style={{ paddingTop: "15px", paddingLeft: "5px", borderTop: "1px solid #E3E3E3", fontSize: "0.875rem" }}>Read More</a>
                    <h6 className="admin" style={{ paddingTop: "16px", paddingRight: "5px", fontSize: "0.875rem" }}>Admin</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Service2;
