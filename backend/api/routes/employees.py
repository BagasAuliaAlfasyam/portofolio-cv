from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any

router = APIRouter()

# Mock Database
mock_employees = [
    {"id": 1, "name": "Andi Pratama", "role": "Senior Engineer", "department": "Engineering", "status": "active"},
    {"id": 2, "name": "Siti Nurhaliza", "role": "Marketing Lead", "department": "Marketing", "status": "active"},
    {"id": 3, "name": "Budi Santoso", "role": "Sales Manager", "department": "Sales", "status": "active"},
]

@router.get("/", response_model=List[Dict[str, Any]])
def read_employees(skip: int = 0, limit: int = 100):
    return mock_employees[skip : skip + limit]

@router.get("/{employee_id}", response_model=Dict[str, Any])
def read_employee(employee_id: int):
    employee = next((emp for emp in mock_employees if emp["id"] == employee_id), None)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee
