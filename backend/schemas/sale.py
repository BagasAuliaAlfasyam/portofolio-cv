from pydantic import BaseModel


class SaleResponse(BaseModel):
    id: int
    company: str
    value: int
    status: str
