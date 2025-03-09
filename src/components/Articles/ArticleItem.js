import React from 'react'
import { Link } from 'react-router-dom';

const ArticleItem = ({article,showExcerpt=true}) => {
    const removeHtmlTags = (str) => str.replace(/<[^>]*>/g,'');
  
    return (
        <div className='article-item'>
            <h2>{article.title.rendered}</h2>
            {showExcerpt ? (
                <p>{removeHtmlTags(article.excerpt.rendered)}</p>
            ) : (
                <div dangerouslySetInnerHTML={{ __html: article.content.rendered}}></div>
            )}
            {showExcerpt && <Link to={`/article/${article.slug}`}>Read More</Link>}
        </div>
    )
}

export default ArticleItem
