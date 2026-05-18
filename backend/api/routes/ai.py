from fastapi import APIRouter
from pydantic import BaseModel
import time
import asyncio

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str
    context: dict = {}

@router.post("/chat", response_model=ChatResponse)
async def ai_chat(request: ChatRequest):
    # Simulate LLM processing time
    await asyncio.sleep(1.5)
    
    # Mock LLM Response logic
    msg = request.message.lower()
    reply = "I understand. Our team can help you architect a solution for that."
    
    if "pricing" in msg:
        reply = "Our enterprise pricing depends on the scale of your deployment. I can connect you with sales for a precise quote."
    elif "tech" in msg or "stack" in msg:
        reply = "We primarily use Next.js, FastAPI, and PostgreSQL, deployed on GCP using Cloud Run."
    elif "reset password" in msg:
        reply = "I've sent a password reset link to your registered email address."
        
    return ChatResponse(reply=reply, context={"intent_confidence": 0.95})

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
