import {api_key, country_code, api_url, category} from '../config/newsapi';

export async function getTopArticles() {
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

export async function getArticlesByCategory(cat) {
    try{
        let articles= await fetch(`${api_url}?country=${country_code}&category=${cat}`,
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

export async function getTopArticle() {
    try{
        let articles= await fetch(`${api_url}?country=${country_code}&category=${category}`,
            {
                headers: {
                    'X-API-KEY': api_key
                }
            });
        let result = await articles.json();
        articles = null;
        articles = JSON;
        let ct = 0;
        result.articles.forEach (article => {
            if(ct === 0)
                articles = article;
            ct++;
        });
        return articles;
    }
    catch(error){
        throw error;
    }
}

export async function getArticleByCategory(cat) {
    try{
        let articles= await fetch(`${api_url}?country=${country_code}&category=${cat}`,
            {
                headers: {
                    'X-API-KEY': api_key
                }
            });
        let result = await articles.json();
        articles = null;
        articles = JSON;
        let ct = 0;
        result.articles.forEach (article => {
            if(ct === 0)
                articles = article;
            ct++;
        });
        return articles;
    }
    catch(error){
        throw error;
    }
}

