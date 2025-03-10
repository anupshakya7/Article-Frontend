import React from "react";
import useFetchArticles from "../../hooks/useFetchArticles";
import ArticleItem from "./ArticleItem";
import Loader from "./Loader";

const Articles =() =>{
    const {articles,loading,error,loadMore,totalPages,page} = useFetchArticles();

    if(loading && page === 1) return <Loader/>
    if(error) return <div>Error: {error}</div>
    console.log(articles);
    return(
        <>
            <div className="container">
            <h1 className="text-center heading">Article Hub</h1>
            <p className="text-center subheading">Read captivating articles, discover new perspectives, and stay informed with the latest stories.</p>
            <div className="row d-flex justify-content-center my-4">
                {articles.map((article)=>(
                    <ArticleItem key={article.id} article={article} showExcerpt={true} />
                ))}
                {page < totalPages && !loading && (
                    <button className="btn btn-primary my-5 w-25 mx-auto button" onClick={loadMore}>Load More Articles</button>
                )}

                {loading && page > 1 && <div>Loading more articles...</div>}
            </div>
            </div>
           
        </>
    )
}

export default Articles;