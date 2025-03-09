import React from "react";
import useFetchArticles from "../../hooks/useFetchArticles";
import ArticleItem from "./ArticleItem";

const Articles =() =>{
    const {articles,loading,error} = useFetchArticles();

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error}</div>

    return(
        <>
            <h1>Articles</h1>
            <div>
                {articles.map((article)=>(
                    <ArticleItem key={article.id} article={article} showExcerpt={true} />
                ))}
            </div>
        </>
    )
}

export default Articles;