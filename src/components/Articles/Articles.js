import React from "react";
import useFetchArticles from "../../hooks/useFetchArticles";
import ArticleItem from "./ArticleItem";

const Articles =() =>{
    const {articles,loading,error} = useFetchArticles();

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error}</div>

    return(
        <>
            <div className="container">
            <h1 className="text-center">Articles</h1>
            <div className="row">
                {articles.map((article)=>(
                    <ArticleItem key={article.id} article={article} showExcerpt={true} />
                ))}
            </div>
            </div>
           
        </>
    )
}

export default Articles;