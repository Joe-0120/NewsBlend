from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='static')
CORS(app)

@app.route('/api/news')
def get_news():
    article = {
        "title": "South Korea’s worst-ever wildfires double in size, killing at least 28 and incinerating temples",
        "subtitle": "Blaze that began in central Uiseong county has carved trail of devastation",
        "publisher_logo_url": "http://localhost:5000/static/cbc_logo.png",
        "date": "Thomson Reuters · Posted: Mar 26, 2025 11:27 PM EDT",
        "image_url": "http://localhost:5000/static/wildfire.png",
        "content": [
            "Wildfires raging in South Korea doubled in size on Thursday from a day earlier, as authorities called the blazes the country’s worst natural fire disaster with at least 28 people killed and historic temples incinerated.",
            "More than 30,000 hectares has been charred or were still burning in the largest of the fires that began in the central Uiseong county, making it the biggest single forest fire in South Korea’s history.",
            "“We are nationally in a critical situation with numerous casualties because of the unprecedented rapid spread of forest fires,” acting President Han Duck-soo told a government press conference.",
        ]
    }
    return jsonify(article)

@app.route('/api/poll')
def get_poll():
    return jsonify({
        "article": {
            "title": "South Korea’s worst-ever wildfires double in size, killing at least 28 and incinerating temples",
            "summary": "Blaze that began in central Uiseong county has carved trail of devastation",
            "source": "CBC",
            "category": "Environment",
            "image_url": "http://localhost:5000/static/wildfire.png",
            "logo_url": "http://localhost:5000/static/cbc_logo.png"
        },
        "question": "Do you think enough is being done to prevent climate-related disasters like wildfires?",
        "options": [
            {"label": "Yes, efforts are sufficient", "percentage": 18},
            {"label": "More action is needed", "percentage": 72},
            {"label": "Not sure", "percentage": 8},
            {"label": "It’s not a priority", "percentage": 2}
        ]
    })

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True)
