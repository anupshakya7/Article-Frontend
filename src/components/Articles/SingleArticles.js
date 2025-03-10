import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import useFetchArticles from "../../hooks/useFetchArticles";
import SideItem from "./SideItem";
import Loader from "./Loader";

const SingleArticles = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { articles,relatedArticles, loading, error } = useFetchArticles(slug,1,3);

  //Format Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <Loader />;
  if (error) return <div>Error:{error}</div>;

  if (!articles) return <div>Article Not Found</div>;

  return (
    <>
      <button className="btn button backBtn" onClick={()=>navigate(-1)}>&larr;Back</button>
      <div className="row">
        <div className="col-sm-9">
          <div className="card p-4 shadow">
            <img
              className="individual_image"
              src={articles.imageUrl}
              alt={articles.title.rendered}
            />
            <h2 className="article_heading">{articles.title.rendered}</h2>
            <p className="article_published">
              <span>Published on: </span>
              {formatDate(articles.date)}
            </p>
            <div
              className="article_paragraph"
              dangerouslySetInnerHTML={{ __html: articles.content.rendered }}
            ></div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card p-3 shadow relatedArticlesBox">
            <h2 className="article_heading">Related Articles</h2>
            <SideItem relatedArticles={relatedArticles || []}/>
          </div>
        </div>
      </div>
      {/* <ArticleItem article={articles} showExcerpt={false} /> */}
    </>
  );
};

export default SingleArticles;
