from fastapi import APIRouter, HTTPException

from schemas.employee import EmployeeResponse

router = APIRouter()

# Demo data. Replace with async SQLAlchemy queries when persistence is enabled.
demo_employees = [
    EmployeeResponse(
        id=1,
        name="Andi Pratama",
        role="Senior Engineer",
        department="Engineering",
        status="active",
    ),
    EmployeeResponse(
        id=2,
        name="Siti Nurhaliza",
        role="Marketing Lead",
        department="Marketing",
        status="active",
    ),
    EmployeeResponse(
        id=3,
        name="Budi Santoso",
        role="Sales Manager",
        department="Sales",
        status="active",
    ),
]


@router.get("/", response_model=list[EmployeeResponse])
def read_employees(skip: int = 0, limit: int = 100) -> list[EmployeeResponse]:
    return demo_employees[skip : skip + limit]


@router.get("/{employee_id}", response_model=EmployeeResponse)
def read_employee(employee_id: int) -> EmployeeResponse:
    employee = next((emp for emp in demo_employees if emp.id == employee_id), None)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee
