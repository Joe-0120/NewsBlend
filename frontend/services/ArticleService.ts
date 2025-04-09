/**
 * Article Service
 * 
 * Handles all API interactions for retrieving and managing articles.
 * This service provides a clean interface for connecting to your backend API.
 */

import { Article, ArticleApiResponse, ArticleSearchParams } from '../models/Article';

// Base URL for the API - change this to your actual API endpoint when deploying
const API_URL = 'http://localhost:5000/api';

/**
 * Fetch featured articles
 * 
 * @returns Promise with featured articles
 */
export const getFeaturedArticles = async (): Promise<Article[]> => {
  try {
    // When using real backend, uncomment this:
    // const response = await fetch(`${API_URL}/articles/featured`);
    // const data: ArticleApiResponse = await response.json();
    // return data.data.articles;
    
    // For now, return mock data
    return [
      { 
        id: '1', 
        title: 'Judge orders Trump administration to keep Signal records amid Yemen attack chat controversy', 
        source: 'CNN', 
        category: 'Politics', 
        imageUrl: require('../assets/logo.png'), 
        sourceLogo: require('../assets/logo.png')
      },
      { 
        id: '2', 
        title: 'US allies worldwide decry Trump\'s car tariffs and threaten retaliation', 
        source: 'The Guardian', 
        category: 'Politics', 
        imageUrl: require('../assets/logo.png'), 
        sourceLogo: require('../assets/logo.png')
      },
    ];
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
};

/**
 * Fetch personalized articles for the user
 * 
 * @returns Promise with personalized articles
 */
export const getPersonalizedArticles = async (): Promise<Article[]> => {
  try {
    // When using real backend, uncomment this:
    // const response = await fetch(`${API_URL}/articles/personalized`);
    // const data: ArticleApiResponse = await response.json();
    // return data.data.articles;
    
    // For now, return mock data
    return [
      { 
        id: '3', 
        title: "'Potent' ice storm likely to hit huge swath of Ontario, including Toronto: Environment Canada", 
        source: 'CBC', 
        category: 'Climate', 
        imageUrl: require('../assets/logo.png'), 
        sourceLogo: require('../assets/logo.png')
      },
      { 
        id: '4', 
        title: "Danielle Smith's fight against tariffs takes her to right-wing PragerU gala", 
        source: 'CBC', 
        category: 'Politics', 
        imageUrl: require('../assets/logo.png'), 
        sourceLogo: require('../assets/logo.png')
      },
    ];
  } catch (error) {
    console.error('Error fetching personalized articles:', error);
    return [];
  }
};

/**
 * Fetch breaking news articles
 * 
 * @returns Promise with breaking news articles
 */
export const getBreakingNewsArticles = async (): Promise<Article[]> => {
  try {
    // When using real backend, uncomment this:
    // const response = await fetch(`${API_URL}/articles/breaking`);
    // const data: ArticleApiResponse = await response.json();
    // return data.data.articles;
    
    // For now, return mock data
    return [
      { 
        id: 'b1', 
        title: "Here's a breakdown of the newly announced tariffs by country", 
        source: 'CNN', 
        category: 'Politics', 
        imageUrl: require('../assets/logo.png'), 
        sourceLogo: require('../assets/logo.png')
      },
    ];
  } catch (error) {
    console.error('Error fetching breaking news:', error);
    return [];
  }
};

/**
 * Fetch more news articles
 * 
 * @returns Promise with more news articles
 */
export const getMoreNewsArticles = async (): Promise<Article[]> => {
  try {
    // When using real backend, uncomment this:
    // const response = await fetch(`${API_URL}/articles/more`);
    // const data: ArticleApiResponse = await response.json();
    // return data.data.articles;
    
    // For now, return mock data
    return [
      { 
        id: 'm1', 
        title: "Could Trump's tariffs spell the end of Canadian-made NHL jerseys?", 
        source: 'CBC', 
        category: 'Politics', 
        imageUrl: require('../assets/logo.png'), 
        sourceLogo: require('../assets/logo.png')
      },
      { 
        id: 'm2', 
        title: "Trump administration lists Quebec language law Bill 96 as trade barrier", 
        source: 'CBC', 
        category: 'Politics', 
        imageUrl: require('../assets/logo.png'), 
        sourceLogo: require('../assets/logo.png')
      },
      { 
        id: 'm3', 
        title: "Another news item for the list", 
        source: 'Reuters', 
        category: 'Business', 
        imageUrl: require('../assets/logo.png'), 
        sourceLogo: require('../assets/logo.png')
      },
    ];
  } catch (error) {
    console.error('Error fetching more news:', error);
    return [];
  }
};

/**
 * Search for articles based on provided parameters
 * 
 * @param params Search parameters
 * @returns Promise with search results
 */
export const searchArticles = async (params: ArticleSearchParams): Promise<Article[]> => {
  try {
    // When using real backend, uncomment this:
    // const queryParams = new URLSearchParams();
    // Object.entries(params).forEach(([key, value]) => {
    //   if (value) queryParams.append(key, value.toString());
    // });
    // const response = await fetch(`${API_URL}/articles/search?${queryParams}`);
    // const data: ArticleApiResponse = await response.json();
    // return data.data.articles;
    
    // For now, filter the mock data based on the search query
    const allArticles = [
      ...await getFeaturedArticles(),
      ...await getPersonalizedArticles(),
      ...await getBreakingNewsArticles(),
      ...await getMoreNewsArticles(),
    ];
    
    if (!params.query && !params.category) {
      return allArticles;
    }
    
    return allArticles.filter(article => {
      const matchesQuery = !params.query || 
        article.title.toLowerCase().includes(params.query.toLowerCase()) ||
        article.source.toLowerCase().includes(params.query.toLowerCase());
      
      const matchesCategory = !params.category || 
        article.category.toLowerCase() === params.category.toLowerCase();
      
      return matchesQuery && matchesCategory;
    });
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
};

/**
 * Save an article to user's bookmarks
 * 
 * @param articleId ID of the article to save
 * @returns Promise with success status
 */
export const saveArticle = async (articleId: string): Promise<boolean> => {
  try {
    // When using real backend, uncomment this:
    // const response = await fetch(`${API_URL}/user/articles/save`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ articleId }),
    // });
    // const data = await response.json();
    // return data.status === 'success';
    
    console.log('Article saved:', articleId);
    return true;
  } catch (error) {
    console.error('Error saving article:', error);
    return false;
  }
};

/**
 * Get user's saved articles
 * 
 * @returns Promise with saved articles
 */
export const getSavedArticles = async (): Promise<Article[]> => {
  try {
    // When using real backend, uncomment this:
    // const response = await fetch(`${API_URL}/user/articles/saved`);
    // const data: ArticleApiResponse = await response.json();
    // return data.data.articles;
    
    // For now, return mock saved articles
    return [
      { 
        id: 'b1', 
        title: "Here's a breakdown of the newly announced tariffs by country", 
        source: 'CNN', 
        category: 'Politics', 
        imageUrl: require('../assets/logo.png'), 
        sourceLogo: require('../assets/logo.png')
      },
      { 
        id: 'm1', 
        title: "Could Trump's tariffs spell the end of Canadian-made NHL jerseys?", 
        source: 'CBC', 
        category: 'Politics', 
        imageUrl: require('../assets/logo.png'), 
        sourceLogo: require('../assets/logo.png')
      },
    ];
  } catch (error) {
    console.error('Error fetching saved articles:', error);
    return [];
  }
};