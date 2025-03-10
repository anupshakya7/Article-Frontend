import React from 'react'
import { Link } from 'react-router-dom';

const ArticleItem = ({article,showExcerpt=true}) => {
    const removeHtmlTags = (str) => str.replace(/<[^>]*>/g,'');
  
    return (
        <div className='article-item col-md-4'>
            <div className="card p-2">
            <img src="#" alt="Image" />
            <h2>{article.title.rendered}</h2>
            {showExcerpt ? (
                <p>{removeHtmlTags(article.excerpt.rendered)}</p>
            ) : (
                <div dangerouslySetInnerHTML={{ __html: article.content.rendered}}></div>
            )}
            {showExcerpt && <Link className='btn btn-primary ' to={`/article/${article.slug}`}>Read More</Link>}
            </div>
          
        </div>
    )
}

export default ArticleItem
