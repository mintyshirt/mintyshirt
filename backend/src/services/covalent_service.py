import os
from typing import Any, List, Optional, Dict

import requests


def create_snapshot(
    contract_address: str,
    chain_id: int,
    block_height: Optional[int] = None,
) -> Optional[List[Dict[str, Any]]]:
    """Create a snapshot of token holders using Covalent API.

    Returns a list of token holder objects on success, otherwise None.
    """
    api_key = os.getenv("COVALENT_API_KEY")
    base_url = os.getenv("COVALENT_API_URL")
    if not api_key or not base_url:
        raise RuntimeError("COVALENT_API_KEY and COVALENT_API_URL must be configured")

    endpoint = f"{base_url.rstrip('/')}/v1/{chain_id}/tokens/{contract_address}/token_holders/"
    params = {"key": api_key}
    if block_height is not None:
        params["block-height"] = block_height
    try:
        response = requests.get(endpoint, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        items = data.get("data", {}).get("items")
        if isinstance(items, list):
            return items
    except requests.RequestException:
        pass
    return None


def verify_address_in_snapshot(
    snapshot: List[Dict[str, Any]],
    wallet_address: str,
    min_amount: int = 1,
) -> bool:
    """Return True if the address holds at least ``min_amount`` tokens in the snapshot."""
    if not snapshot:
        return False
    wallet_address = wallet_address.lower()
    for holder in snapshot:
        address = str(holder.get("address", "")).lower()
        if address != wallet_address:
            continue
        try:
            balance_raw = holder.get("balance") or holder.get("token_balance")
            balance = int(balance_raw)
        except (ValueError, TypeError):
            return False
        return balance >= min_amount
    return False
