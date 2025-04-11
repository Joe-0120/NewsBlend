from flask import Flask, jsonify, send_from_directory, request
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
        "category": "Environment",
        "source": "CBC",
        "date": "CBC • Posted: Mar 26, 2025 11:27 PM EDT",
        "image": "1_wildfire.png",
        "logo": "cbc_logo.png",
        "content": [
            "Wildfires raging in South Korea doubled in size on Thursday from a day earlier, as authorities called the blazes the country’s worst natural fire disaster with at least 28 people killed and historic temples incinerated.",
            "More than 30,000 hectares have been charred or were still burning in the largest of the fires that began in the central Uiseong county. It is the biggest single forest fire in South Korea’s history. The previous record was 24,000 hectares in a March 2000 fire.",
            "Helicopters dumped water over burning forests in South Korea on Thursday as fire crews struggled to contain the country’s worst-ever wildfires, which have killed at least 28 people, forced at least 300 to flee their homes and destroyed historic temples. Officials say it may take several more days to bring the fires fully under control due to dry and windy conditions.",
            "Authorities have urged residents in high-risk areas to evacuate immediately. South Korea's president has called for an emergency response team to support those affected and speed up recovery efforts."
        ]
    },
    "2": {
        "title": "Here’s a breakdown of the newly announced tariffs by country",
        "subtitle": "Trade tensions rise amid global policy shifts",
        "category": "politics",
        "source": "CNN",
        "date": "CNN • Posted: Mar 20, 2025 2:45 PM EDT",
        "image": "2_tariff.png",
        "logo": "cnn_logo.png",
        "content": [
            "Governments around the world are introducing new tariffs this quarter, sparking concerns among economists and global industries. Countries including the United States, China, and members of the European Union have announced measures affecting various sectors.",
            "The U.S. Department of Commerce confirmed a 10% tariff on imported steel and a 5% tariff on select electronic goods from Asia. In response, China imposed retaliatory tariffs on American agricultural products, including soybeans and corn.",
            "European officials emphasized that the new tariffs are a defensive measure to protect local manufacturing, particularly in the automotive and energy sectors. However, business leaders warn that the changes could lead to increased costs and supply chain disruptions.",
            "Economists are split on the long-term effects of the policies. Some suggest the moves are part of a broader push toward economic independence, while others fear it could slow down post-pandemic recovery."
        ]
    },
    "3": {
    "title": "Global CO2 Levels Hit Record High in 2025",
    "subtitle": "UN warns that rising emissions threaten climate goals",
    "category": "Climate",
    "source": "Reuters",
    "date": "Reuters • Posted: Apr 1, 2025 9:00 AM EDT",
    "image": "3_climate_co2.png",
    "logo": "reuters_logo.png",
    "content": [
        "The concentration of carbon dioxide in Earth's atmosphere has reached a new record high, according to a recent UN climate report. The findings raise concerns that the world is falling behind its climate targets.",
        "Measurements from observatories worldwide show atmospheric CO2 levels exceeded 421 ppm in March, a level not seen in over 4 million years. The rise is largely attributed to continued fossil fuel combustion and deforestation.",
        "The UN Secretary-General urged governments to double down on climate efforts, warning that 'the window to secure a livable future is rapidly closing.'",
        "Environmental groups called for immediate reforms, including phasing out coal and expanding renewable energy initiatives, especially in industrial nations."
    ]
},
    "4": {
    "title": "Stock Markets Volatile as Central Banks Hint at Rate Hikes",
    "subtitle": "Global indices tumble after surprise policy announcements",
    "category": "Business",
    "source": "Bloomberg",
    "date": "Bloomberg • Posted: Apr 2, 2025 1:15 PM EDT",
    "image": "4_stock_volatility.png",
    "logo": "bloomberg_logo.png",
    "content": [
        "Stock markets worldwide experienced sharp declines after major central banks hinted at upcoming interest rate hikes in an effort to combat inflation.",
        "The Dow Jones dropped over 600 points while the FTSE and Nikkei saw similar losses. Investors reacted nervously to statements from the U.S. Federal Reserve and European Central Bank.",
        "Analysts believe the hikes are necessary but warn they could slow down post-pandemic recovery.",
        "Sectors like tech and real estate were hit hardest, while energy stocks remained relatively stable due to rising oil prices."
    ]
},
"5": {
    "title": "Breakthrough in Quantum Computing Promises Faster AI Training",
    "subtitle": "Researchers at MIT unveil a 256-qubit processor",
    "category": "Tech",
    "source": "TechCrunch",
    "date": "TechCrunch • Posted: Apr 3, 2025 9:30 AM EDT",
    "image": "5_quantum_ai.png",
    "logo": "techcrunch_logo.png",
    "content": [
        "In a major step forward, MIT researchers announced the development of a 256-qubit quantum processor capable of performing machine learning optimizations at unprecedented speeds.",
        "This innovation could significantly reduce the time and cost required to train large-scale AI models.",
        "Industry leaders like Google and IBM praised the advancement and hinted at future partnerships to integrate quantum acceleration into commercial systems.",
        "Critics, however, warned that broader accessibility to such power could further deepen the digital divide."
    ]
},
"6": {
    "title": "Protests Erupt Worldwide Over Rising Food Prices",
    "subtitle": "Demonstrators call for government intervention amid economic hardship",
    "category": "World",
    "source": "BBC",
    "date": "BBC • Posted: Apr 4, 2025 6:45 PM EDT",
    "image": "6_food_protests.png",
    "logo": "bbc_logo.png",
    "content": [
        "Major cities across the globe saw mass protests today as thousands took to the streets demanding urgent action against rising food prices.",
        "Supply chain disruptions, climate-related crop failures, and ongoing conflicts have contributed to a steep rise in basic food costs.",
        "Protesters in cities like Cairo, Manila, and Buenos Aires called for subsidies, food aid, and regulatory interventions.",
        "The World Food Programme warned that without global cooperation, food insecurity could hit unprecedented levels by the end of 2025."
    ]
},
"7": {
    "title": "New Climate Deal Reached at Global Summit",
    "subtitle": "Nations commit to aggressive emissions cuts by 2030",
    "category": "Climate",
    "source": "Reuters",
    "date": "Reuters • Posted: Apr 5, 2025 4:00 PM EDT",
    "image": "7_climate_deal.png",
    "logo": "reuters_logo.png",
    "content": [
        "World leaders have agreed to a landmark climate deal at the 2025 Global Summit, aiming to cut carbon emissions by 50% before 2030.",
        "The agreement includes binding targets for both developed and developing nations, with a focus on renewable energy and climate finance.",
        "Critics argue the deal lacks enforcement mechanisms, but environmental groups call it a significant step forward.",
        "The summit also addressed loss and damage payments for vulnerable countries already affected by climate change."
    ]
},
"8": {
    "title": "Tech Giants Battle Over Generative AI Dominance",
    "subtitle": "Companies race to release faster, smarter language models",
    "category": "Tech",
    "source": "CNN",
    "date": "CNN • Posted: Apr 6, 2025 11:15 AM EDT",
    "image": "8_ai_wars.png",
    "logo": "cnn_logo.png",
    "content": [
        "Major tech companies including OpenAI, Google, and Meta are locked in a competitive sprint to dominate the generative AI market.",
        "New models claim better reasoning, multimodal support, and improved ethics filtering. Meanwhile, open-source competitors are rapidly closing the gap.",
        "The U.S. government is considering new regulations around model training data and transparency.",
        "Analysts warn that unchecked AI deployment could lead to misinformation surges and power concentration."
    ]
},
"9": {
    "title": "Global Economic Forecast Sees Slower Growth",
    "subtitle": "IMF revises GDP projections amid uncertainty",
    "category": "Business",
    "source": "BBC",
    "date": "BBC • Posted: Apr 7, 2025 10:00 AM EDT",
    "image": "9_imf_forecast.png",
    "logo": "bbc_logo.png",
    "content": [
        "The International Monetary Fund has downgraded its global GDP forecast for 2025, citing persistent inflation and geopolitical instability.",
        "Growth for advanced economies is expected to hover around 1.3%, while emerging markets will grow at 3.9%, down from previous estimates.",
        "Economists point to sluggish consumer demand and trade disruptions as key factors.",
        "The IMF has urged governments to balance fiscal discipline with targeted stimulus."
    ]
},
"10": {
    "title": "Voters Head to Polls in Key European Elections",
    "subtitle": "Nationalist parties seek gains amid economic discontent",
    "category": "Politics",
    "source": "CBC",
    "date": "CBC • Posted: Apr 8, 2025 7:30 PM EDT",
    "image": "10_europe_votes.png",
    "logo": "cbc_logo.png",
    "content": [
        "Millions of voters across Europe are casting ballots in elections that could reshape national and EU-wide policies.",
        "Economic dissatisfaction, immigration, and energy prices are dominating the campaigns.",
        "Right-wing and nationalist parties are polling stronger than expected, sparking concern among centrist coalitions.",
        "The results could impact not only domestic policies but also Europe's position on global issues like climate and trade."
    ]
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
    },
    "3": {
    "article_id": "3",
    "question": "Are current global climate efforts enough to curb CO2 emissions?",
    "options": [
        {"label": "Yes, it's improving", "percentage": 22},
        {"label": "Not even close", "percentage": 60},
        {"label": "Too early to tell", "percentage": 12},
        {"label": "Don’t care", "percentage": 6}
    ]
},
    "4": {
    "article_id": "4",
    "question": "Do you support central banks raising interest rates to control inflation?",
    "options": [
        {"label": "Yes, it’s necessary", "percentage": 48},
        {"label": "No, it harms growth", "percentage": 38},
        {"label": "Not sure", "percentage": 10},
        {"label": "I don't follow finance", "percentage": 4}
    ]
},
"5": {
    "article_id": "5",
    "question": "Will quantum computing revolutionize artificial intelligence in the next decade?",
    "options": [
        {"label": "Yes, it's a game changer", "percentage": 58},
        {"label": "Too early to tell", "percentage": 28},
        {"label": "No, it's overhyped", "percentage": 10},
        {"label": "I don’t understand quantum computing", "percentage": 4}
    ]
},
"6": {
    "article_id": "6",
    "question": "Should governments intervene to control food prices?",
    "options": [
        {"label": "Yes, urgently", "percentage": 65},
        {"label": "Only if prices keep rising", "percentage": 20},
        {"label": "No, let markets adjust", "percentage": 10},
        {"label": "I’m not sure", "percentage": 5}
    ]
},
"7": {
    "article_id": "7",
    "question": "Do you believe this climate agreement will lead to real change?",
    "options": [
        {"label": "Yes, it's historic", "percentage": 45},
        {"label": "Only if enforced", "percentage": 35},
        {"label": "No, just talk", "percentage": 15},
        {"label": "Not sure", "percentage": 5}
    ]
},
"8": {
    "article_id": "8",
    "question": "Should governments regulate the development of generative AI?",
    "options": [
        {"label": "Yes, urgently", "percentage": 52},
        {"label": "Maybe, with caution", "percentage": 30},
        {"label": "No, it will slow innovation", "percentage": 14},
        {"label": "Unsure", "percentage": 4}
    ]
},
"9": {
    "article_id": "9",
    "question": "Are you worried about the slowing global economy?",
    "options": [
        {"label": "Yes, it's already affecting me", "percentage": 55},
        {"label": "Somewhat concerned", "percentage": 30},
        {"label": "No, it’s manageable", "percentage": 10},
        {"label": "Not paying attention", "percentage": 5}
    ]
},
"10": {
    "article_id": "10",
    "question": "Do you think nationalist parties will gain ground in Europe?",
    "options": [
        {"label": "Yes, definitely", "percentage": 41},
        {"label": "Some, but not a majority", "percentage": 37},
        {"label": "No, center will hold", "percentage": 17},
        {"label": "Don’t know", "percentage": 5}
    ]
}


}

DISCUSSIONS = {
    1: {
        "article": {
            "summary": ARTICLES["1"]["subtitle"],
            "source": ARTICLES["1"]["source"],
            "category": ARTICLES["1"]["category"],
            "image": ARTICLES["1"]["image"],
            "logo": ARTICLES["1"]["logo"]
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
            "summary": ARTICLES["2"]["subtitle"],
            "source": ARTICLES["2"]["source"],
            "category": ARTICLES["2"]["category"],
            "image": ARTICLES["2"]["image"],
            "logo": ARTICLES["2"]["logo"]
        },
        "comments": [
            {
                "user": "John Smith",
                "comment": "I've been going through the latest announcements on tariffs and wanted to break it down by country...",
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
    },
    3: {
        "article": {
            "summary": ARTICLES["3"]["subtitle"],
            "source": ARTICLES["3"]["source"],
            "category": ARTICLES["3"]["category"],
            "image": ARTICLES["3"]["image"],
            "logo": ARTICLES["3"]["logo"]
        },
        "comments": [
            {
                "user": "Aisha Khan",
                "comment": "These numbers are terrifying. We're running out of time.",
                "likes": 27,
                "dislikes": 1,
                "replies": 10
            },
            {
                "user": "Thomas Green",
                "comment": "Governments talk big but act slow. We need global enforcement mechanisms.",
                "likes": 42,
                "dislikes": 5,
                "replies": 17
            }
        ]
    },
    4: {
    "article": {
        "summary": ARTICLES["4"]["subtitle"],
        "source": ARTICLES["4"]["source"],
        "category": ARTICLES["4"]["category"],
        "image": ARTICLES["4"]["image"],
        "logo": ARTICLES["4"]["logo"]
    },
    "comments": [
        {
            "user": "Maria Cheng",
            "comment": "Rate hikes might help inflation, but they’ll crush borrowing power for average people.",
            "likes": 34,
            "dislikes": 5,
            "replies": 11
        },
        {
            "user": "Ben Howard",
            "comment": "It’s a necessary move. Let the economy correct before another bubble forms.",
            "likes": 28,
            "dislikes": 3,
            "replies": 9
        }
    ]
},
5: {
    "article": {
        "summary": ARTICLES["5"]["subtitle"],
        "source": ARTICLES["5"]["source"],
        "category": ARTICLES["5"]["category"],
        "image": ARTICLES["5"]["image"],
        "logo": ARTICLES["5"]["logo"]
    },
    "comments": [
        {
            "user": "Laura Zhang",
            "comment": "The quantum leap we've been waiting for — AI training needs this badly.",
            "likes": 50,
            "dislikes": 4,
            "replies": 15
        },
        {
            "user": "Omar Patel",
            "comment": "I hope this doesn’t become a tool monopolized by tech giants.",
            "likes": 33,
            "dislikes": 6,
            "replies": 7
        }
    ]
},
6: {
    "article": {
        "summary": ARTICLES["6"]["subtitle"],
        "source": ARTICLES["6"]["source"],
        "category": ARTICLES["6"]["category"],
        "image": ARTICLES["6"]["image"],
        "logo": ARTICLES["6"]["logo"]
    },
    "comments": [
        {
            "user": "Rania Ibrahim",
            "comment": "I’m literally skipping meals. Something needs to be done!",
            "likes": 61,
            "dislikes": 2,
            "replies": 20
        },
        {
            "user": "Carlos Romero",
            "comment": "This is happening everywhere — even groceries are becoming a luxury.",
            "likes": 49,
            "dislikes": 3,
            "replies": 14
        }
    ]
},
7: {
    "article": {
        "summary": ARTICLES["7"]["subtitle"],
        "source": ARTICLES["7"]["source"],
        "category": ARTICLES["7"]["category"],
        "image": ARTICLES["7"]["image"],
        "logo": ARTICLES["7"]["logo"]
    },
    "comments": [
        {
            "user": "Fatima Noor",
            "comment": "Glad to see real commitments. Let’s hope it’s followed by real action.",
            "likes": 46,
            "dislikes": 3,
            "replies": 8
        },
        {
            "user": "Yann Dubois",
            "comment": "No enforcement means nothing will happen, just another PR show.",
            "likes": 31,
            "dislikes": 5,
            "replies": 6
        }
    ]
},
8: {
    "article": {
        "summary": ARTICLES["8"]["subtitle"],
        "source": ARTICLES["8"]["source"],
        "category": ARTICLES["8"]["category"],
        "image": ARTICLES["8"]["image"],
        "logo": ARTICLES["8"]["logo"]
    },
    "comments": [
        {
            "user": "Sophia Li",
            "comment": "We're moving too fast with this tech. Oversight is critical.",
            "likes": 39,
            "dislikes": 6,
            "replies": 9
        },
        {
            "user": "Max Jensen",
            "comment": "Regulating now will just kill open-source innovation.",
            "likes": 25,
            "dislikes": 7,
            "replies": 4
        }
    ]
},
9: {
    "article": {
        "summary": ARTICLES["9"]["subtitle"],
        "source": ARTICLES["9"]["source"],
        "category": ARTICLES["9"]["category"],
        "image": ARTICLES["9"]["image"],
        "logo": ARTICLES["9"]["logo"]
    },
    "comments": [
        {
            "user": "Nina Alvarez",
            "comment": "I feel the slowdown already — job market is stalling.",
            "likes": 42,
            "dislikes": 4,
            "replies": 10
        },
        {
            "user": "Mikhail Petrov",
            "comment": "We’ve been here before. Governments should prepare better.",
            "likes": 30,
            "dislikes": 3,
            "replies": 6
        }
    ]
},
10: {
    "article": {
        "summary": ARTICLES["10"]["subtitle"],
        "source": ARTICLES["10"]["source"],
        "category": ARTICLES["10"]["category"],
        "image": ARTICLES["10"]["image"],
        "logo": ARTICLES["10"]["logo"]
    },
    "comments": [
        {
            "user": "Lena Kravitz",
            "comment": "Nationalism is rising because people are frustrated and left behind.",
            "likes": 38,
            "dislikes": 7,
            "replies": 12
        },
        {
            "user": "Jordi Morales",
            "comment": "Let’s hope voters don’t fall for populist promises again.",
            "likes": 34,
            "dislikes": 6,
            "replies": 7
        }
    ]
}


}

def make_image_url(host, filename):
    return f"{host}static/{filename}"

@app.route('/api/articles/<article_id>')
@cross_origin()
def get_article(article_id):
    host = request.host_url
    article = ARTICLES.get(article_id)
    if article:
        article_copy = article.copy()
        article_copy["image_url"] = make_image_url(host, article["image"])
        article_copy["publisher_logo_url"] = make_image_url(host, article["logo"])
        return jsonify(article_copy)
    return jsonify({"error": "Article not found"}), 404

@app.route('/api/articles/featured')
@cross_origin()
def get_featured_articles():
    host = request.host_url
    featured_articles = []
    for id, article in ARTICLES.items():
        featured_articles.append({
            "id": id,
            "title": article["title"],
            "summary": article["subtitle"],
            "source": article["source"],
            "category": article["category"],
            "imageUrl": make_image_url(host, article["image"]),
            "sourceLogo": make_image_url(host, article["logo"])
        })
    return jsonify({"data": {"articles": featured_articles}})

@app.route('/api/polls/<poll_id>')
@cross_origin()
def get_poll(poll_id):
    host = request.host_url
    poll = POLLS.get(poll_id)
    if not poll:
        return jsonify({"error": "Poll not found"}), 404
    article = ARTICLES.get(poll["article_id"])
    return jsonify({
        "article": {
            "title": article["title"],
            "summary": article["subtitle"],
            "source": article["source"],
            "category": article["category"],
            "image_url": make_image_url(host, article["image"]),
            "logo_url": make_image_url(host, article["logo"]),
        },
        "question": poll["question"],
        "options": poll["options"]
    })

@app.route('/api/discussions/<int:article_id>')
@cross_origin()
def get_discussions(article_id):
    host = request.host_url
    discussion = DISCUSSIONS.get(article_id)
    if not discussion:
        return jsonify({"article": {}, "comments": []})

    article = discussion["article"]
    return jsonify({
        "article": {
            "summary": article["summary"],
            "source": article["source"],
            "category": article["category"],
            "image_url": make_image_url(host, article["image"]),
            "logo_url": make_image_url(host, article["logo"])
        },
        "comments": discussion["comments"]
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5050, debug=True)
