from pydantic import BaseModel


class EmployeeResponse(BaseModel):
    id: int
    name: str
    role: str
    department: str
    status: str
