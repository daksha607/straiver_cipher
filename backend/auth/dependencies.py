from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPBearer
from jose import jwt, jwk, JWTError
from jose.utils import base64url_decode
import httpx

bearer_scheme = HTTPBearer()

CLERK_JWKS_URL = "https://lucky-reindeer-20.clerk.accounts.dev/.well-known/jwks.json"
CLERK_ISSUER = "https://lucky-reindeer-20.clerk.accounts.dev"
CLERK_AUDIENCE = "http://localhost:5173"

_cached_jwks = None

async def get_jwks():
    global _cached_jwks
    if _cached_jwks is None:
        async with httpx.AsyncClient() as client:
            resp = await client.get(CLERK_JWKS_URL)
            if resp.status_code != 200:
                raise HTTPException(status_code=500, detail="Failed to fetch JWKS")
            _cached_jwks = resp.json()
    return _cached_jwks

async def verify_token(request: Request, token=Depends(bearer_scheme)):
    token_str = token.credentials
    jwks = await get_jwks()

    # Step 1: Decode token header to get kid
    try:
        unverified_header = jwt.get_unverified_header(token_str)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid JWT header")

    kid = unverified_header.get("kid")
    key = next((k for k in jwks["keys"] if k["kid"] == kid), None)
    if not key:
        raise HTTPException(status_code=401, detail="Public key not found")

    public_key = jwk.construct(key)

    # Step 2: Verify signature manually
    message, encoded_signature = token_str.rsplit(".", 1)
    decoded_signature = base64url_decode(encoded_signature.encode())

    if not public_key.verify(message.encode(), decoded_signature):
        raise HTTPException(status_code=401, detail="Invalid token signature")

    # Step 3: Verify claims
    try:
        payload = jwt.decode(
            token_str,
            key=public_key,
            algorithms=["RS256"],
            audience=CLERK_AUDIENCE,
            issuer=CLERK_ISSUER,
        )
        return payload["sub"]  # Clerk user ID (e.g., user_abc123)
    except JWTError:
        raise HTTPException(status_code=401, detail="Token decode error")

