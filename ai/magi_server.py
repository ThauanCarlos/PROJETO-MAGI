from flask import Flask, request, jsonify
from flask_cors import CORS
from magi_brain import responder

# criar aplicação Flask
app = Flask(__name__)

# permitir comunicação do navegador (CORS)
CORS(app)

# rota da IA
@app.route("/magi", methods=["POST"])
def magi():

    dados = request.get_json()

    pergunta = dados.get("mensagem")

    resposta = responder(pergunta)

    return jsonify({
        "resposta": resposta
    })


# iniciar servidor
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)