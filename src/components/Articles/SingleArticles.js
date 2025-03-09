import React from 'react'
import {useParams} from "react-router-dom";
import useFetchArticles from '../../hooks/useFetchArticles';
import ArticleItem from './ArticleItem';

const SingleArticles = () => {
    const{slug} = useParams();
    const {articles,loading,error} = useFetchArticles(slug);

    if(loading) return <div>Loading...</div>
    if(error) return <div>Error:{error}</div>

    if(!articles) return <div>Article Not Found</div>

  return (
    <div>
        <ArticleItem article={articles} showExcerpt={false} />
    </div>
  )
}

export default SingleArticles