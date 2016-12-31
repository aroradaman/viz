from flask import Flask, request, redirect, Response, send_from_directory
from flask_cors import CORS, cross_origin
from flask import jsonify

app = Flask(__name__, static_url_path='')
CORS(app)

PREFIX = '/viz'

@app.route( PREFIX + '/js/<path:path>')
def send_js(path):
	return send_from_directory('js', path)

@app.route( PREFIX + '/audio/<path:path>')
def send_audio(path):
	return send_from_directory('audio', path)

@app.route( PREFIX + '/css/<path:path>')
def send_css(path):
	return send_from_directory('css', path)

@app.route( PREFIX + '/textures/<path:path>')
def send_fonts(path):
	return send_from_directory('textures', path)

@app.route( PREFIX + '/three/', methods=['GET'])
def video():
	return send_from_directory('./', 'new.html')

@app.route( PREFIX + '/video/<_videoId>/save', methods=['POST'])
def videoSave(_videoId):
	data = request.get_json()
	try :
		db['video'].update({'_id':_videoId},data,upsert=True)
		return jsonify({"success":True})
	except KeyError:
		return jsonify({"success":False})


if __name__ == "__main__":
	app.run(host="0.0.0.0", port=6969, threaded=True, debug=True)