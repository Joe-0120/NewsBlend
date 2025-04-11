/**
 * Article Service
 *
 * Handles all API interactions for retrieving and managing articles.
 * This service provides a clean interface for connecting to your backend API.
 */

import {
  Article,
  ArticleApiResponse,
  ArticleSearchParams,
} from "../models/Article";
import { API_URL } from "../config";

// Base URL for the API - change this to your actual API endpoint when deploying
// Using IP address instead of localhost for mobile compatibility

// const API_URL = 'http://127.0.0.1:5000/api'; // iOS simulator

/**
 * Fetch featured articles
 *
 * @returns Promise with featured articles
 */
export const getFeaturedArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch(`${API_URL}/articles/featured`);
    if (!response.ok) {
      throw new Error("Failed to fetch featured articles");
    }
    const data: ArticleApiResponse = await response.json();
    return data.data.articles;
  } catch (error) {
    console.error("Error fetching featured articles:", error);
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
    // For now, reuse featured articles as personalized articles
    // In a real implementation, this would call a separate endpoint
    const response = await fetch(`${API_URL}/articles/featured`);
    if (!response.ok) {
      throw new Error("Failed to fetch personalized articles");
    }
    const data: ArticleApiResponse = await response.json();

    return data.data.articles;
  } catch (error) {
    console.error("Error fetching personalized articles:", error);
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
    // For now, reuse featured articles and filter to get the first one as breaking news
    // In a real implementation, this would call a separate endpoint
    const response = await fetch(`${API_URL}/articles/featured`);
    if (!response.ok) {
      throw new Error("Failed to fetch breaking news");
    }
    const data: ArticleApiResponse = await response.json();
    // Just return the first article as breaking news
    return data.data.articles.slice(0, 1);
  } catch (error) {
    console.error("Error fetching breaking news:", error);
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
    // For now, reuse featured articles as more news
    // In a real implementation, this would call a separate endpoint
    const response = await fetch(`${API_URL}/articles/featured`);
    if (!response.ok) {
      throw new Error("Failed to fetch more news");
    }
    const data: ArticleApiResponse = await response.json();
    return data.data.articles;
  } catch (error) {
    console.error("Error fetching more news:", error);
    return [];
  }
};

/**
 * Search for articles based on provided parameters
 *
 * @param params Search parameters
 * @returns Promise with search results
 */
export const searchArticles = async (
  params: ArticleSearchParams
): Promise<Article[]> => {
  try {
    // Since we don't have a dedicated search endpoint yet,
    // we'll fetch all articles from the featured endpoint and filter them
    const response = await fetch(`${API_URL}/articles/featured`);
    if (!response.ok) {
      throw new Error("Failed to fetch articles for search");
    }

    const data: ArticleApiResponse = await response.json();
    const allArticles = data.data.articles;

    if (!params.query && !params.category && !params.source) {
      return allArticles;
    }

    return allArticles.filter((article) => {
      const matchesQuery =
        !params.query ||
        article.title.toLowerCase().includes(params.query.toLowerCase()) ||
        (article.summary &&
          article.summary.toLowerCase().includes(params.query.toLowerCase())) ||
        article.source.toLowerCase().includes(params.query.toLowerCase());

      const matchesCategory =
        !params.category ||
        article.category.toLowerCase() === params.category.toLowerCase();

      const matchesSource =
        !params.source ||
        article.source.toLowerCase() === params.source.toLowerCase();

      return matchesQuery && matchesCategory && matchesSource;
    });
  } catch (error) {
    console.error("Error searching articles:", error);
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

    console.log("Article saved:", articleId);
    return true;
  } catch (error) {
    console.error("Error saving article:", error);
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
        id: "b1",
        title: "Here's a breakdown of the newly announced tariffs by country",
        source: "CNN",
        category: "Politics",
        imageUrl: require("../assets/logo.png"),
        sourceLogo: require("../assets/logo.png"),
      },
      {
        id: "m1",
        title:
          "Could Trump's tariffs spell the end of Canadian-made NHL jerseys?",
        source: "CBC",
        category: "Politics",
        imageUrl: require("../assets/logo.png"),
        sourceLogo: require("../assets/logo.png"),
      },
    ];
  } catch (error) {
    console.error("Error fetching saved articles:", error);
    return [];
  }
};
