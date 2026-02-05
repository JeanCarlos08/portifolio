import os
from typing import List, Dict
from openai import OpenAI
from dotenv import load_dotenv

# Carrega as variáveis de ambiente (Segurança de chaves)
load_dotenv()

class AIDiagnosticEngine:
    def __init__(self, system_name: str):
        self.system_name = system_name
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    def get_ai_diagnosis(self, symptoms: List[str]) -> str:
        """
        Envia os sintomas para a GPT-4 e recebe um diagnóstico detalhado.
        """
        prompt = f"Você é um mecânico especialista de elite. Analise os seguintes sintomas no sistema {self.system_name}: {', '.join(symptoms)}. Forneça um diagnóstico técnico, lista de possíveis peças defeituosas e nível de urgência."

        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Erro ao conectar com a IA: {e}\n(Verifique se sua OPENAI_API_KEY está configurada no .env)"

# Simulação de Execução
if __name__ == "__main__":
    # 1. Configura o motor
    engine = AIDiagnosticEngine("Mecânica Automotiva de Alta Performance")
    
    # 2. Define os sintomas
    sintomas_cliente = [
        "Luz de óleo piscando no painel",
        "Barulho de batida metálica ao acelerar",
        "Fumaça azulada saindo pelo escapamento"
    ]
    
    print("\n[INFO] Consultando Especialista Virtual...")
    resultado = engine.get_ai_diagnosis(sintomas_cliente)
    
    print("\n" + "="*50)
    print(f"RELATÓRIO TÉCNICO VIRTUAL - {engine.system_name}")
    print("="*50)
    print(resultado)
    print("="*50)
