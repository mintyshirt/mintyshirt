"""Simple wrapper for sending emails via Amazon SES."""

from typing import Optional
import os

import boto3
from botocore.exceptions import BotoCoreError, ClientError


def send_email(to_address: str, subject: str, body: str, html_body: Optional[str] = None) -> bool:
    """Send an email using Amazon SES.

    Returns True on success, False otherwise.
    """

    aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
    aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
    aws_region = os.getenv("AWS_REGION")
    from_email = os.getenv("SES_FROM_EMAIL")

    if not all([aws_access_key_id, aws_secret_access_key, aws_region, from_email]):
        raise RuntimeError(
            "AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION and SES_FROM_EMAIL must be configured"
        )

    client = boto3.client(
        "ses",
        region_name=aws_region,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )

    body_data = {"Text": {"Charset": "UTF-8", "Data": body}}
    if html_body:
        body_data["Html"] = {"Charset": "UTF-8", "Data": html_body}

    try:
        client.send_email(
            Source=from_email,
            Destination={"ToAddresses": [to_address]},
            Message={
                "Subject": {"Data": subject, "Charset": "UTF-8"},
                "Body": body_data,
            },
        )
        return True
    except (BotoCoreError, ClientError):
        return False

