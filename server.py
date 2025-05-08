from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime
from chatbot_data import CHATBOT_RESPONSES

app = Flask(__name__)
CORS(app)

def init_database():
    conn = sqlite3.connect("chatbot.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            keyword TEXT NOT NULL,
            response TEXT NOT NULL,
            related_keywords TEXT
        )
    """)
    conn.commit()
    conn.close()

def populate_responses():
    conn = sqlite3.connect("chatbot.db")
    cursor = conn.cursor()
    
    # 首先清空现有数据
    cursor.execute("DELETE FROM responses")
    
    # 插入新数据
    cursor.executemany("INSERT INTO responses (keyword, response, related_keywords) VALUES (?, ?, ?)", CHATBOT_RESPONSES)
    conn.commit()
    conn.close()

def get_response(user_input):
    conn = sqlite3.connect("chatbot.db")
    cursor = conn.cursor()
    
    # 首先尝试精确匹配关键词
    cursor.execute("SELECT response FROM responses WHERE keyword = ?", (user_input,))
    result = cursor.fetchone()
    
    if not result:
        # 如果没有精确匹配，尝试在相关关键词中查找
        cursor.execute("SELECT response FROM responses WHERE related_keywords LIKE ?", ('%' + user_input + '%',))
        result = cursor.fetchone()
    
    if not result:
        # 如果还是没有匹配，尝试模糊匹配关键词
        cursor.execute("SELECT response FROM responses WHERE keyword LIKE ?", ('%' + user_input + '%',))
        result = cursor.fetchone()
    
    conn.close()
    return result[0] if result else "抱歉，我不太明白你的意思。\n您可以詢問我關於：\n- 入學相關資訊\n- 系所資訊\n- 住宿資訊\n- 學務相關\n- 學習資源\n- 考試時間\n- 學校設施\n- 開學/結業時間\n- 學雜費\n- 畢業門檻\n- 學校地址\n等問題，我會盡力為您解答！"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('message', '')
    response = get_response(user_input)
    
    if "{time}" in response:
        now = datetime.now().strftime("%H:%M")
        response = response.replace("{time}", now)
    
    return jsonify({'response': response})

if __name__ == '__main__':
    init_database()
    populate_responses()
    app.run(debug=True, port=5000) 
