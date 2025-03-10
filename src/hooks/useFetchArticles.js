import { useEffect, useState } from "react"

const useFetchArticles=(slug=null,currentPage=1,perPage=3)=>{
    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [page,setPage] = useState(currentPage);
    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(()=>{
        const fetchArticles = async()=>{
            let url = `http://localhost/wordpress-react/backend/wp-json/wp/v2/articles?page=${page}&per_page=${perPage}`;

            // if there is slug fetch according to its slug
            if(slug){
                url = `http://localhost/wordpress-react/backend/wp-json/wp/v2/articles?slug=${slug}`;
            }

            try{
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error('Error Fetching Articles');
                }

                const totalPages = parseInt(response.headers.get('X-WP-TotalPages'),10);
                setTotalPages(totalPages);

                const data = await response.json();

                if(slug){
                    const articlesWithImages = await fetchImage(data[0]?.featured_media);
                    const currentArticle ={...data[0],imageUrl:articlesWithImages};
                    setArticles(currentArticle);

                    fetchRelatedArticles(currentArticle.id);
                }else{
                    const articlesWithImages = await Promise.all(
                        data.map(async(article) =>{
                            const imageUrl = await fetchImage(article.featured_media);
                            return{
                                ...article,
                                imageUrl
                            };
                        })
                    );
                    setArticles((prevArticles)=>(page===1 ? articlesWithImages : [...prevArticles,...articlesWithImages]));
                }
                
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchArticles();
    },[slug,page,perPage]);

    const fetchImage = async(mediaId)=>{
        if(!mediaId) return null;

        try{
            const response = await fetch(`http://localhost/wordpress-react/backend/wp-json/wp/v2/media/${mediaId}`);

            if(!response.ok){
                throw new Error('Error Fetching Media');
            }

            const mediaData = await response.json();
            return mediaData.source_url;
        }catch(err){
            console.error('Error Fetching Image: ',err);
            return null;
        }
    };

    const fetchRelatedArticles = async (currentArticleId)=>{
        const url = `http://localhost/wordpress-react/backend/wp-json/wp/v2/articles?per_page=6`;

        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Error Fetching Related Articles");
            }

            const data = await response.json();

            const filteredArticles = data.filter((article)=>article.id !== currentArticleId);

            const articlesWithImages = await Promise.all(
                filteredArticles.map(async (article)=>{
                    const imageUrl = await fetchImage(article.featured_media);
                    return{
                        ...article,
                        imageUrl
                    };
                })
            );

            setRelatedArticles(articlesWithImages);
        }catch(err){
            console.error("Error Fetching Related Articles: ",err);
        }
    };

    const loadMore = ()=>{
        if(page<totalPages){
            setPage(page+1);
        }
    };

    return {articles,relatedArticles,loading,error,loadMore,totalPages,page};
};

export default useFetchArticles;