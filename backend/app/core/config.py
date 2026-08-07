from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Pradeep Nadig Portfolio & Management API"
    API_V1_STR: str = "/api/v1"
    
    # Database - PostgreSQL
    DATABASE_URL: str = "postgresql://postgres:PradeepNadig1!@db.dtvjzkhsnfarlodjymbr.supabase.co:5432/postgres"
    
    # Supabase Auth
    SUPABASE_URL: str = "https://your-supabase-project.supabase.co"
    SUPABASE_SERVICE_ROLE_KEY: str = "your-service-role-key"
    SUPABASE_JWT_SECRET: str = "your-supabase-jwt-secret"
    
    # Razorpay
    RAZORPAY_KEY_ID: str = "rzp_test_key"
    RAZORPAY_SECRET: str = "rzp_test_secret"
    
    # WhatsApp Cloud API
    WHATSAPP_TOKEN: str = "mock_whatsapp_token"
    WHATSAPP_PHONE_ID: str = "mock_phone_id"
    WHATSAPP_VERIFY_TOKEN: str = "pradeep_whatsapp_webhook_verify_token"
    
    # Google Calendar
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    GOOGLE_REFRESH_TOKEN: Optional[str] = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
