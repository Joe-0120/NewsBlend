from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__)
CORS(app)

@app.route('/static/<path:filename>')
@cross_origin()
def static_files(filename):
    return send_from_directory(os.path.join(app.root_path, 'static'), filename)

ARTICLES = {
    "1": {
        "title": "South Korea’s worst-ever wildfires double in size, killing at least 28 and incinerating temples",
        "subtitle": "Blaze that began in central Uiseong county has carved trail of devastation",
        "date": "Thomson Reuters • Posted: Mar 26, 2025 11:27 PM EDT",
        "image_url": "http://localhost:5000/static/1_wildfire.png",
        "publisher_logo_url": "http://localhost:5000/static/cbc_logo.png",
        "content": [
            "Wildfires raging in South Korea doubled in size on Thursday from a day earlier, as authorities called the blazes the country’s worst natural fire disaster with at least 28 people killed and historic temples incinerated.",
            "More than 30,000 hectares have been charred or were still burning in the largest of the fires that began in the central Uiseong county. It is the biggest single forest fire in South Korea’s history. The previous record was 24,000 hectares in a March 2000 fire.",
            "Helicopters dumped water over burning forests in South Korea on Thursday as fire crews struggled to contain the country’s worst-ever wildfires, which have killed at least 28 people, forced at least 300 to flee their homes and destroyed historic temples. Officials say it may take several more days to bring the fires fully under control due to dry and windy conditions.",
            "Authorities have urged residents in high-risk areas to evacuate immediately. South Korea's president has called for an emergency response team to support those affected and speed up recovery efforts."
        ],
    },
    "2": {
        "title": "Here’s a breakdown of the newly announced tariffs by country",
        "subtitle": "Trade tensions rise amid global policy shifts",
        "date": "CNN • Posted: Mar 20, 2025 2:45 PM EDT",
        "image_url": "http://localhost:5000/static/2_tariff.png",
        "publisher_logo_url": "http://localhost:5000/static/cnn_logo.png",
        "content": [
            "Governments around the world are introducing new tariffs this quarter, sparking concerns among economists and global industries. Countries including the United States, China, and members of the European Union have announced measures affecting various sectors.",
            "The U.S. Department of Commerce confirmed a 10% tariff on imported steel and a 5% tariff on select electronic goods from Asia. In response, China imposed retaliatory tariffs on American agricultural products, including soybeans and corn.",
            "European officials emphasized that the new tariffs are a defensive measure to protect local manufacturing, particularly in the automotive and energy sectors. However, business leaders warn that the changes could lead to increased costs and supply chain disruptions.",
            "Economists are split on the long-term effects of the policies. Some suggest the moves are part of a broader push toward economic independence, while others fear it could slow down post-pandemic recovery."
        ],
    }
}

POLLS = {
    "1": {
        "article_id": "1",
        "question": "Do you think enough is being done to prevent climate-related disasters like wildfires?",
        "options": [
            {"label": "Yes, efforts are sufficient", "percentage": 18},
            {"label": "More action is needed", "percentage": 72},
            {"label": "Not sure", "percentage": 8},
            {"label": "It’s not a priority", "percentage": 2}
        ]
    },
    "2": {
        "article_id": "2",
        "question": "How do you think the new tariffs by major economies will affect global trade in the next 1–2 years?",
        "options": [
            {"label": "Significant Negative Impact", "percentage": 39},
            {"label": "Some Negative Impact", "percentage": 55},
            {"label": "Some Positive Impact", "percentage": 4},
            {"label": "Significant Positive Impact", "percentage": 2}
        ]
    }
}

@app.route('/api/articles/<article_id>')
@cross_origin()
def get_article(article_id):
    article = ARTICLES.get(article_id)
    if article:
        return jsonify(article)
    return jsonify({"error": "Article not found"}), 404

@app.route('/api/polls/<poll_id>')
@cross_origin()
def get_poll(poll_id):
    poll = POLLS.get(poll_id)
    if not poll:
        return jsonify({"error": "Poll not found"}), 404
    article = ARTICLES.get(poll["article_id"])
    return jsonify({
        "article": {
            "title": article["title"],
            "summary": article["subtitle"],
            "source": article["publisher_logo_url"],
            "category": "Environment" if poll_id == "1" else "Politics",
            "image_url": article["image_url"],
            "logo_url": article["publisher_logo_url"],
        },
        "question": poll["question"],
        "options": poll["options"]
    })

@app.route('/api/discussions/<int:article_id>')
@cross_origin()
def get_discussions(article_id):
    discussions = {
        1: {
            "article": {
                "summary": "Blaze that began in central Uiseong county has carved trail of devastation",
                "source": "CBC",
                "category": "Environment",
                "image_url": "http://localhost:5000/static/1_wildfire.png",
                "logo_url": "http://localhost:5000/static/cbc_logo.png"
            },
            "comments": [
                {
                    "user": "John Smith",
                    "comment": "The wildfires have become a serious issue lately. I think we need stronger climate policies to prevent this.",
                    "likes": 20,
                    "dislikes": 2,
                    "replies": 13
                },
                {
                    "user": "David Brown",
                    "comment": "Completely agree. It's sad to see ancient temples incinerated due to lack of preparedness.",
                    "likes": 35,
                    "dislikes": 3,
                    "replies": 21
                }
            ]
        },
        2: {
            "article": {
                "summary": "Here's a breakdown of the newly announced tariffs by country",
                "source": "CNN",
                "category": "Politics",
                "image_url": "http://localhost:5000/static/2_tariff.png",
                "logo_url": "http://localhost:5000/static/cnn_logo.png"
            },
            "comments": [
                {
                    "user": "John Smith",
                    "comment": "I've been going through the latest announcements on tariffs and wanted to break it down by country. There’s quite a bit of movement, especially with the ongoing trade shifts. Any thoughts on the global impact?",
                    "likes": 20,
                    "dislikes": 2,
                    "replies": 13
                },
                {
                    "user": "David Brown",
                    "comment": "Interesting topic! From what I’ve seen, countries like the U.S., China, and the EU are making the most noise about tariff adjustments. Anyone have insights into how China’s reacting?",
                    "likes": 35,
                    "dislikes": 3,
                    "replies": 21
                }
            ]
        }
    }
    return jsonify(discussions.get(article_id, {"article": {}, "comments": []}))

if __name__ == '__main__':
    app.run(debug=True)
