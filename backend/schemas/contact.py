import re

from pydantic import BaseModel, Field, field_validator

EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    email: str = Field(..., max_length=120)
    message: str = Field(..., min_length=5, max_length=2000)
    phone: str = Field(default="", max_length=40)
    company: str = Field(default="", max_length=120)
    website: str = Field(default="", max_length=120)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        normalized = value.strip()
        if not EMAIL_PATTERN.match(normalized):
            raise ValueError("Invalid email address")
        return normalized

    @field_validator("name", "message", "phone", "company", "website")
    @classmethod
    def trim_text(cls, value: str) -> str:
        return value.strip()
