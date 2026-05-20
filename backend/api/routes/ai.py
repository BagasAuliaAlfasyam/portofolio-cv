from fastapi import APIRouter
from pydantic import BaseModel
import asyncio
from core.config import settings

try:
    from google import genai
except ImportError:
    genai = None

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str
    context: dict = {}

def mock_chat_reply(message: str) -> str:
    msg = message.lower()
    reply = "I understand. Our team can help you architect a solution for that."
    
    if "pricing" in msg:
        reply = "Our enterprise pricing depends on the scale of your deployment. I can connect you with sales for a precise quote."
    elif "tech" in msg or "stack" in msg:
        reply = "We primarily use Next.js, FastAPI, and PostgreSQL, deployed on GCP using Cloud Run."
    elif "reset password" in msg:
        reply = "I've sent a password reset link to your registered email address."

    return reply

def generate_gemini_reply(message: str) -> str:
    if genai is None:
        raise RuntimeError("google-genai is not installed")

    client = genai.Client(api_key=settings.GEMINI_API_KEY)
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=(
            "You are Nexus, a concise AI support agent for Catalyst Forge. "
            "Help users with product support, account questions, and technical "
            "triage. Keep replies short, practical, and friendly.\n\n"
            f"User message: {message}"
        ),
    )

    return response.text or "I processed your request, but I could not generate a response."

@router.post("/chat", response_model=ChatResponse)
async def ai_chat(request: ChatRequest):
    if settings.GEMINI_API_KEY:
        try:
            reply = await asyncio.to_thread(generate_gemini_reply, request.message)
            return ChatResponse(reply=reply, context={"provider": "gemini"})
        except Exception as exc:
            return ChatResponse(
                reply=mock_chat_reply(request.message),
                context={"provider": "mock", "fallback_reason": str(exc)},
            )

    await asyncio.sleep(1.5)
    return ChatResponse(
        reply=mock_chat_reply(request.message),
        context={"provider": "mock", "reason": "GEMINI_API_KEY is not configured"},
    )

class PredictRequest(BaseModel):
    features: dict

@router.post("/predict")
async def ai_predict(request: PredictRequest):
    await asyncio.sleep(0.5)
    return {"prediction": "High Risk", "confidence": 0.87, "factors": ["velocity", "amount"]}

@router.get("/recommend")
async def ai_recommend(user_id: str):
    await asyncio.sleep(0.8)
    return [
        {"item_id": "101", "score": 0.95, "reason": "Frequently bought together"},
        {"item_id": "205", "score": 0.88, "reason": "Popular in your segment"}
    ]
