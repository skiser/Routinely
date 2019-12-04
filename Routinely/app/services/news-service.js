import {api_key, country_code, api_url, category} from '../config/newsapi';

export async function getArticles() {
    try{
        let articles= await fetch(`${api_url}?country=${country_code}&category=${category}`,
            {
                headers: {
                    'X-API-KEY': api_key
                }
            });
        let result = await articles.json();
        articles = null;
        return result.articles;
    }
    catch(error){
        throw error;
    }
}

