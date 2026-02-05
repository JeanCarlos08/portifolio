import pandas as pd
import time
import random

def mock_lead_collector():
    """
    Simula a coleta de leads de uma plataforma.
    Demonstra: Manipulação de Dados, Loops e Exportação com Pandas.
    """
    print("[AUTOMAÇÃO] Iniciando busca de leads estratégicos...")
    
    leads_encontrados = []
    categorias = ["Barbearia", "Estética", "SaaS", "Educação"]
    locais = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba"]

    # Simulando a coleta de 10 leads
    for i in range(1, 11):
        lead = {
            "ID": f"LD-{random.randint(1000, 9999)}",
            "Nome": f"Empresa Exemplo {i}",
            "Setor": random.choice(categorias),
            "Cidade": random.choice(locais),
            "Email": f"contato{i}@exemplo.com.br",
            "Status": "Novo"
        }
        leads_encontrados.append(lead)
        print(f" > Coletando dados de: {lead['Nome']}...")
        time.sleep(0.5) # Simula o delay de rede

    # Criando um DataFrame (A ferramenta mais poderosa do Python para dados)
    df = pd.DataFrame(leads_encontrados)

    # Salvando em CSV (Pode ser aberto no Excel)
    filename = "leads_extraidos.csv"
    df.to_csv(filename, index=False, encoding="utf-8-sig")
    
    print("-" * 40)
    print(f"SUCESSO! {len(df)} leads salvos em: {filename}")
    print("-" * 40)
    print(df.head()) # Mostra as primeiras linhas no terminal

if __name__ == "__main__":
    mock_lead_collector()
