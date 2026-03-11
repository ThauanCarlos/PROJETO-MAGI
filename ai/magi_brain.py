import json

MEMORIA = "memoria.json"
HISTORICO = "historico.json"


def carregar_memoria():
    try:
        with open(MEMORIA, "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return {"nome": "", "cidade": "", "interesses": []}


def salvar_memoria(mem):
    with open(MEMORIA, "w", encoding="utf-8") as f:
        json.dump(mem, f, indent=4, ensure_ascii=False)


def salvar_historico(pergunta, resposta):

    try:
        with open(HISTORICO, "r", encoding="utf-8") as f:
            hist = json.load(f)
    except:
        hist = []

    hist.append({
        "pergunta": pergunta,
        "resposta": resposta
    })

    with open(HISTORICO, "w", encoding="utf-8") as f:
        json.dump(hist, f, indent=4, ensure_ascii=False)


def responder(pergunta):

    pergunta_original = pergunta
    pergunta = pergunta.lower()

    memoria = carregar_memoria()


    if "meu nome é" in pergunta:

        nome = pergunta.split("meu nome é")[-1].strip()

        memoria["nome"] = nome

        salvar_memoria(memoria)

        resposta = f"Prazer em conhecê-lo {nome}"

        salvar_historico(pergunta_original, resposta)

        return resposta


    if "qual é meu nome" in pergunta:

        if memoria["nome"] != "":
            resposta = f"Seu nome é {memoria['nome']}"
        else:
            resposta = "Você ainda não me disse seu nome."

        salvar_historico(pergunta_original, resposta)

        return resposta


    if "bom dia" in pergunta:

        if memoria["nome"] != "":
            resposta = f"Bom dia {memoria['nome']}"
        else:
            resposta = "Bom dia."

        salvar_historico(pergunta_original, resposta)

        return resposta


    resposta = "Ainda estou aprendendo."

    salvar_historico(pergunta_original, resposta)

    return resposta