import { useEffect, useState } from "react"

const useFetchArticles=(slug=null)=>{
    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        const fetchArticles = async()=>{
            let url = 'http://localhost/wordpress-react/server/wp-json/wp/v2/articles';

            // if there is slug fetch according to its slug
            if(slug){
                url = `${url}?slug=${slug}`;
            }

            try{
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error('Error Fetching Articles');
                }

                const data = await response.json();
                setArticles(slug ? data[0] : data);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchArticles();
    },[slug]);
    return {articles,loading,error}
};

export default useFetchArticles;