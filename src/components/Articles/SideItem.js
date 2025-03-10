import React from 'react'
import { Link } from 'react-router-dom'

const SideItem = ({relatedArticles}) => {
    if(relatedArticles.length === 0){
        return <p>No Related Articles Found.</p>
    }
    
  return (
    <>
    {relatedArticles.map((article)=>(
        <div key={article.id} className="side_items">
            <div className="side_img">
                {article.imageUrl && <img src={article.imageUrl} alt={article.title.rendered}/>}
            </div>
            <div className="side_content">
                <h5>{article.title.rendered}</h5>
                <p><span>Published on:</span>{new Date(article.date).toLocaleDateString()} </p>
                <Link className='side_link' to={`/article/${article.slug}`}>Read More</Link>
            </div>
        </div>
    )
    )}
    </>
  )
}

export default SideItem
