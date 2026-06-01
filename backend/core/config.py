from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Catalyst Forge API"
    API_V1_STR: str = ""

    BACKEND_CORS_ORIGINS: str = (
        "http://localhost:3000,http://localhost:3001,http://localhost:3002,"
        "http://localhost:3003,http://localhost:3004,http://localhost:3005"
    )

    # Database
    DATABASE_URL: str = ""
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "catalyst_forge"
    
    # AI Models
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""

    # Contact email
    RESEND_API_KEY: str = ""
    CONTACT_FROM: str = ""
    CONTACT_TO: str = "catalystforgetechnology@gmail.com"

    @property
    def cors_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.BACKEND_CORS_ORIGINS.split(",")
            if origin.strip()
        ]

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
