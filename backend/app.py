from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/news')
def get_news():
    dummy_news = [
        {"title": "Gen Z Leads Climate Change March", "source": "The Guardian"},
        {"title": "Instagram vs News: Gen Z's Preference", "source": "Reuters"},
    ]
    return jsonify(dummy_news)

if __name__ == '__main__':
    app.run(debug=True)
