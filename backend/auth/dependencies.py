from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPBearer
from jose import jwt
import httpx

bearer_scheme = HTTPBearer()

CLERK_PEM_URL=https://quiet-herring-8.clerk.accounts.dev/.well-known/jwks.json
CLERK_ISSUER=https://quiet-herring-8.clerk.accounts.dev
CLERK_AUDIENCE=http://localhost:5173 

_cached_jwks = None

async def get_jwks():
    global _cached_jwks
    if _cached_jwks is None:
        async with httpx.AsyncClient() as client:
            resp = await client.get(CLERK_JWKS_URL)
            _cached_jwks = resp.json()
    return _cached_jwks

async def verify_token(request: Request, token=Depends(bearer_scheme)):
    from jose import jwk, JWTError
    from jose.utils import base64url_decode

    token_str = token.credentials
    jwks = await get_jwks()

    # Get key id (kid) from token header
    unverified_header = jwt.get_unverified_header(token_str)
    kid = unverified_header.get("kid")

    key = next((k for k in jwks["keys"] if k["kid"] == kid), None)
    if key is None:
        raise HTTPException(status_code=401, detail="Invalid token header")

    public_key = jwk.construct(key)

    # Split JWT and decode signature
    message, encoded_signature = token_str.rsplit(".", 1)
    decoded_signature = base64url_decode(encoded_signature.encode())

    # Verify signature
    if not public_key.verify(message.encode(), decoded_signature):
        raise HTTPException(status_code=401, detail="Invalid token signature")

    try:
        # Decode payload and return user id
        payload = jwt.decode(
            token_str,
            key=public_key,
            algorithms=["RS256"],
            audience=CLERK_AUDIENCE,
            issuer=CLERK_ISSUER
        )
        return payload["sub"]  # Clerk user ID
    except JWTError:
        raise HTTPException(status_code=401, detail="Token decode error")
