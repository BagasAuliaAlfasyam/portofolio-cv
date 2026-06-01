from fastapi import APIRouter

from schemas.sale import SaleResponse

router = APIRouter()

demo_sales = [
    SaleResponse(id=1, company="PT Maju Bersama", value=180000000, status="won"),
    SaleResponse(
        id=2,
        company="CV Digital Nusantara",
        value=95000000,
        status="negotiation",
    ),
]


@router.get("/", response_model=list[SaleResponse])
def read_sales() -> list[SaleResponse]:
    return demo_sales
