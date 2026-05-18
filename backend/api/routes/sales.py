from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()

mock_sales = [
    {"id": 1, "company": "PT Maju Bersama", "value": 180000000, "status": "won"},
    {"id": 2, "company": "CV Digital Nusantara", "value": 95000000, "status": "negotiation"},
]

@router.get("/", response_model=List[Dict[str, Any]])
def read_sales():
    return mock_sales
