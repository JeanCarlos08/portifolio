from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    """Testa se a rota raiz (Home) está funcionando."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Bem-vindo ao Premium Barber Manager API. Acesse /docs para a documentação interativa."}

def test_get_appointments():
    """Testa se a lista de agendamentos retorna dados."""
    response = client.get("/appointments")
    assert response.status_code == 200
    assert len(response.json()) >= 2

def test_create_appointment():
    """Testa a criação de um novo agendamento."""
    new_data = {
        "client_name": "Teste Automatizado",
        "service": "Corte Teste",
        "date_time": "2026-12-12 10:00"
    }
    response = client.post("/appointments", json=new_data)
    assert response.status_code == 201
    assert response.json()["client_name"] == "Teste Automatizado"
