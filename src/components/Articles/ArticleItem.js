import React from 'react'
import { Link } from 'react-router-dom';

const ArticleItem = ({article,showExcerpt=true,wordLimit=30}) => {
    //Remove Html Tag
    const removeHtmlTags = (str) => str.replace(/<[^>]*>/g,'');
    
    //Format Date
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US",{
            weekday:'long',
            year:'numeric',
            month:'long',
            day:'numeric' 
        });
    }

    //Limit Word for Description
    const limitWords = (str,limit)=>{
        const words = str.split(' ');
        if(words.length > limit){
            return words.slice(0,limit).join(' ')+'...';
        }
        return str;
    }

    const description = removeHtmlTags(article.excerpt.rendered);

    console.log(article);
    return (
        <div className='article-item col-lg-4'>
            <div className="card p-3 my-3 shadow">
            {article.imageUrl && <img src={article.imageUrl} alt={article.title.rendered} />}
            <h2 className='article_heading'>{article.title.rendered}</h2>
            <p className='article_published'><span>Published on:</span> {formatDate(article.date)}</p>
            {showExcerpt ? (
                <p className='article_paragraph'>{limitWords(description,wordLimit)}</p>
            ) : (
                <div className='article_paragraph' dangerouslySetInnerHTML={{ __html: article.content.rendered}}></div>
            )}
            {showExcerpt && <Link className='btn btn-primary button article_button' to={`/article/${article.slug}`}>Read More</Link>}
            </div>
          
        </div>
    )
}

export default ArticleItem
