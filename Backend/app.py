from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/test")
def test():
    return jsonify({"message": "Backend is working!"})

@app.route("/route", methods=["POST"])
def route():
    data = request.get_json()

    start = data.get("start")
    end = data.get("end")

    # For now, return a simple straight line route
    route_coords = [start, end]

    return jsonify({"route": route_coords})

if __name__ == "__main__":
    app.run(debug=True)