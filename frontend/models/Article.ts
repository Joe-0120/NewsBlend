/**
 * Article Model
 * 
 * This model represents the structure of news articles in the application.
 * Use this format for consistency when integrating with a backend API.
 */

export interface Article {
  id: string;
  title: string;
  source: string;
  category: string;
  /** URL for the article image (when using real API) or a require statement for local images */
  imageUrl: any;
  /** URL for the source logo (when using real API) or a require statement for local images */
  sourceLogo: any;
  /** Optional full URL to the original article */
  originalUrl?: string;
  /** Optional article content */
  content?: string;
  /** Optional publication date */
  publishedDate?: string;
  /** Optional author information */
  author?: string;
  /** Optional summary of the article */
  summary?: string;
  /** Optional keywords or tags */
  tags?: string[];
}

/**
 * API Response Structure for Article Lists
 * 
 * Example response structure from the backend API:
 * {
 *   "status": "success",
 *   "data": {
 *     "articles": [
 *       {
 *         "id": "1",
 *         "title": "Article Title",
 *         "source": "CNN",
 *         "category": "Politics",
 *         "imageUrl": "https://example.com/image.jpg",
 *         "sourceLogo": "https://example.com/cnn-logo.png",
 *         "originalUrl": "https://cnn.com/article",
 *         "publishedDate": "2025-04-08T10:30:00Z",
 *         "author": "John Doe",
 *         "summary": "Brief summary of article",
 *         "tags": ["politics", "usa"]
 *       },
 *       ...
 *     ]
 *   }
 * }
 */
export interface ArticleApiResponse {
  status: string;
  data: {
    articles: Article[];
    /** Optional pagination info */
    pagination?: {
      currentPage: number;
      totalPages: number;
      totalArticles: number;
    };
  };
}

/**
 * Search Parameters Interface
 * 
 * Use this interface to define parameters for searching/filtering articles
 */
export interface ArticleSearchParams {
  /** Search term(s) */
  query?: string;
  /** Filter by category */
  category?: string;
  /** Filter by source */
  source?: string;
  /** Number of articles to return per page */
  limit?: number;
  /** Page number for pagination */
  page?: number;
  /** Sort by (e.g. 'date', 'relevance') */
  sortBy?: 'date' | 'relevance' | 'popularity';
}