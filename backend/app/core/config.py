from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Pradeep Nadig Portfolio & Management API"
    API_V1_STR: str = "/api/v1"
    
    # Database - PostgreSQL (IPv4 Pooler)
    DATABASE_URL: str = "postgresql://postgres.dtvjzkhsnfarlodjymbr:PradeepNadig1!@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"
    
    # Supabase Auth
    SUPABASE_URL: str = "https://your-supabase-project.supabase.co"
    SUPABASE_SERVICE_ROLE_KEY: str = "your-service-role-key"
    SUPABASE_JWT_SECRET: str = "your-supabase-jwt-secret"
    
    # Razorpay
    RAZORPAY_KEY_ID: str = "rzp_test_key"
    RAZORPAY_SECRET: str = "rzp_test_secret"
    
    # WhatsApp Cloud API
    WHATSAPP_TOKEN: str = "EAAX8xwSWXz4BSMMZBR1OzwZBnEZCH3epw4nZBaQiTSufo9S0U0Gm1njToROrWZAxFCz8ZB49HuQmxRVcjo6I2OqCXCuULcDwcquTKWHndPmwzgPrWhZCY94rQIgJvH3nZB0XPgMvUyjXkwy8Elx543VwVc5kmrfZBFVXP9ZCzvuyrtdZB4b7yPevIGvAumy49Cy6AZDZD"
    WHATSAPP_PHONE_ID: str = "1211611855373954"
    WHATSAPP_VERIFY_TOKEN: str = "pradeep_whatsapp_webhook_verify_token"
    
    # Google Calendar
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    GOOGLE_REFRESH_TOKEN: Optional[str] = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
