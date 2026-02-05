from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(
    title="Premium Barber Manager API",
    description="API para gestão de agendamentos e serviços de barbearia profissional.",
    version="1.0.0"
)

# Modelo de Dados (Pydantic - Garante a validação de tipos)
class Appointment(BaseModel):
    id: Optional[int] = None
    client_name: str
    service: str
    date_time: str
    status: str = "Agendado"

# Banco de dados em memória (Simulando persistência)
db_appointments = [
    {"id": 1, "client_name": "Jean Carlos", "service": "Corte de Elite", "date_time": "2026-02-10 14:00", "status": "Agendado"},
    {"id": 2, "client_name": "Marcos Silva", "service": "Barba e Toalha Quente", "date_time": "2026-02-10 15:30", "status": "Agendado"}
]

@app.get("/", tags=["Home"])
def read_root():
    return {"message": "Bem-vindo ao Premium Barber Manager API. Acesse /docs para a documentação interativa."}

@app.get("/appointments", response_model=List[Appointment], tags=["Agendamentos"])
def get_all_appointments():
    """Retorna todos os agendamentos cadastrados no sistema."""
    return db_appointments

@app.post("/appointments", response_model=Appointment, status_code=201, tags=["Agendamentos"])
def create_appointment(appointment: Appointment):
    """Cria um novo agendamento validando os campos obrigatórios."""
    new_id = len(db_appointments) + 1
    appointment.id = new_id
    appointment_dict = appointment.model_dump()
    db_appointments.append(appointment_dict)
    return appointment_dict

@app.get("/appointments/{appointment_id}", response_model=Appointment, tags=["Agendamentos"])
def get_appointment(appointment_id: int):
    """Busca um agendamento específico pelo ID."""
    for appt in db_appointments:
        if appt["id"] == appointment_id:
            return appt
    raise HTTPException(status_code=44, detail="Agendamento não encontrado.")

@app.delete("/appointments/{appointment_id}", tags=["Agendamentos"])
def delete_appointment(appointment_id: int):
    """Remove um agendamento do sistema."""
    global db_appointments
    db_appointments = [appt for appt in db_appointments if appt["id"] != appointment_id]
    return {"message": f"Agendamento {appointment_id} removido com sucesso."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
