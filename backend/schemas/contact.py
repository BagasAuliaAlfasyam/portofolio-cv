import re

from pydantic import BaseModel, ConfigDict, Field, field_validator

EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class ContactRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    name: str = Field(..., min_length=2, max_length=80)
    email: str = Field(..., max_length=120)
    message: str = Field(..., min_length=10, max_length=2000)
    phone: str = Field(..., max_length=40)
    company: str = Field(default="", max_length=120)
    website: str = Field(default="", max_length=120)
    need_type: str = Field(default="", alias="needType", max_length=80)
    budget_range: str = Field(default="", alias="budgetRange", max_length=80)
    timeline: str = Field(default="", max_length=80)
    page_path: str = Field(default="", alias="pagePath", max_length=240)
    utm_source: str = Field(default="", alias="utmSource", max_length=120)
    utm_medium: str = Field(default="", alias="utmMedium", max_length=120)
    utm_campaign: str = Field(default="", alias="utmCampaign", max_length=120)
    utm_content: str = Field(default="", alias="utmContent", max_length=120)
    utm_term: str = Field(default="", alias="utmTerm", max_length=120)

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

    @field_validator(
        "name",
        "message",
        "company",
        "website",
        "need_type",
        "budget_range",
        "timeline",
        "page_path",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
    )
    @classmethod
    def trim_text(cls, value: str) -> str:
        return value.strip()
