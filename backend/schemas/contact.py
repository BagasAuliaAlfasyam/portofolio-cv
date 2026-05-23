import re

from pydantic import BaseModel, Field, field_validator

EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    email: str = Field(..., max_length=120)
    message: str = Field(..., min_length=10, max_length=2000)
    phone: str = Field(..., max_length=40)
    company: str = Field(default="", max_length=120)
    website: str = Field(default="", max_length=120)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        normalized = value.strip()
        if not EMAIL_PATTERN.match(normalized):
            raise ValueError("Invalid email address")
        return normalized

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        normalized = value.strip()
        digits = re.sub(r"\D", "", normalized)
        if len(digits) < 8:
            raise ValueError("WhatsApp number must contain at least 8 digits")
        return normalized

    @field_validator("name", "message", "company", "website")
    @classmethod
    def trim_text(cls, value: str) -> str:
        return value.strip()
