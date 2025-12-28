import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = "shuvabiswas.dev@gmail.com"
SMTP_PASS = "avha tglm ugfa vwbr"

def send_reset_email(to_email: str, reset_link: str):
    msg = MIMEMultipart()
    msg["From"] = SMTP_USER
    msg["To"] = to_email
    msg["Subject"] = "Reset your InsightFlow password"

    body = f"""
    Hi,

    You requested to reset your password.

    Click the link below to reset it:
    {reset_link}

    This link is valid for 30 minutes.

    If you didn’t request this, ignore this email.

    — InsightFlow Team
    """
    print(f"Email body: {body}")
    msg.attach(MIMEText(body, "plain"))

    server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
    server.starttls()
    server.login(SMTP_USER, SMTP_PASS)
    server.send_message(msg)
    server.quit()
