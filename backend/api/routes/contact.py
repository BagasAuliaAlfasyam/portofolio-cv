import html
import json
import time
from typing import Annotated
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from fastapi import APIRouter, Header, HTTPException, status

from core.config import settings
from schemas.contact import ContactRequest

router = APIRouter()

_request_log: dict[str, list[float]] = {}


@router.post("/contact")
def submit_contact(
    payload: ContactRequest,
    x_forwarded_for: Annotated[str | None, Header()] = None,
):
    client_ip = _get_client_ip(x_forwarded_for)

    if _is_rate_limited(client_ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please try again later.",
        )

    if payload.website:
        return {"ok": True}

    if not settings.RESEND_API_KEY or not settings.CONTACT_FROM:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Email service is not configured.",
        )

    email_payload = {
        "from": settings.CONTACT_FROM,
        "to": settings.CONTACT_TO,
        "reply_to": payload.email,
        "subject": f"Website inquiry from {payload.name}",
        "html": _build_email_html(payload),
        "text": _build_email_text(payload),
    }

    request = Request(
        "https://api.resend.com/emails",
        data=json.dumps(email_payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {settings.RESEND_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urlopen(request, timeout=12) as response:
            if response.status >= 400:
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail="Failed to send email.",
                )
    except HTTPError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Failed to send email.",
        ) from exc
    except URLError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Email service is unavailable.",
        ) from exc

    return {"ok": True}


def _get_client_ip(x_forwarded_for: str | None) -> str:
    if not x_forwarded_for:
        return "unknown"

    return x_forwarded_for.split(",")[0].strip() or "unknown"


def _is_rate_limited(client_ip: str) -> bool:
    now = time.monotonic()
    window_seconds = 10 * 60
    max_requests = 5
    recent_requests = [
        timestamp
        for timestamp in _request_log.get(client_ip, [])
        if now - timestamp < window_seconds
    ]

    if len(recent_requests) >= max_requests:
        _request_log[client_ip] = recent_requests
        return True

    recent_requests.append(now)
    _request_log[client_ip] = recent_requests
    return False


def _build_email_html(payload: ContactRequest) -> str:
    escaped_message = html.escape(payload.message).replace("\n", "<br />")

    return f"""
    <div style="font-family:Arial,sans-serif;color:#1a1a2e;line-height:1.6">
      <h2 style="color:#1B3A5C">New CatalystForge website inquiry</h2>
      <p><strong>Name:</strong> {html.escape(payload.name)}</p>
      <p><strong>Email:</strong> {html.escape(str(payload.email))}</p>
      <p><strong>Phone:</strong> {html.escape(payload.phone or "-")}</p>
      <p><strong>Company:</strong> {html.escape(payload.company or "-")}</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0" />
      <p><strong>Message:</strong></p>
      <p>{escaped_message}</p>
    </div>
    """


def _build_email_text(payload: ContactRequest) -> str:
    return "\n".join(
        [
            "New CatalystForge website inquiry",
            "",
            f"Name: {payload.name}",
            f"Email: {payload.email}",
            f"Phone: {payload.phone or '-'}",
            f"Company: {payload.company or '-'}",
            "",
            "Message:",
            payload.message,
        ]
    )
