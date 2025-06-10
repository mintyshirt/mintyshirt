import os
from typing import Any

import requests


def verify_token_ownership(
    wallet_address: str,
    contract_address: str,
    chain_id: int,
    min_amount: int = 1,
) -> bool:
    """Verify token ownership via the external Tomo.inc API."""
    api_key = os.getenv("TOMO_API_KEY")
    base_url = os.getenv("TOMO_API_URL")
    if not api_key or not base_url:
        raise RuntimeError("TOMO_API_KEY and TOMO_API_URL must be configured")

    url = f"{base_url.rstrip('/')}/verify"
    payload = {
        "wallet_address": wallet_address,
        "contract_address": contract_address,
        "chain_id": chain_id,
        "min_amount": min_amount,
        "api_key": api_key,
    }

    try:
        response = requests.post(url, json=payload, timeout=10)
        response.raise_for_status()
        data: Any = response.json()
        return bool(data.get("has_tokens"))
    except requests.RequestException:
        return False
