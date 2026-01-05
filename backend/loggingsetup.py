import logging
import os
from dotenv import load_dotenv
import boto3
from watchtower import CloudWatchLogHandler  # type: ignore
from datetime import datetime

load_dotenv()

class RequestIDFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.request_id = getattr(record, 'request_id', 'unknown')
        record.epoch_time = int(datetime.now().timestamp())
        return True

def setup_logger(endpoint_name, log_group, env, log_file=None):
    formatter = logging.Formatter(f"%(asctime)s : %(levelname)s - %(message)s - Request ID: %(request_id)s - Epoch Time: %(epoch_time)s")
    logger = logging.getLogger(endpoint_name)
    logger.setLevel(logging.DEBUG)  # Set the logging level for this logger
    
    if env == 'prod':
        # Create a Boto3 session for CloudWatch Logs
        boto3_session = boto3.client("logs", aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'), aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'), region_name="ap-south-1")
        # Create a CloudWatchLogHandler for this logger
        handler = CloudWatchLogHandler(boto3_client=boto3_session, log_group=log_group, create_log_group=True)

    elif env == 'staging':
        # Create a Boto3 session for CloudWatch Logs
        boto3_session = boto3.client("logs", aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'), aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'), region_name="ap-south-1")
        # Create a CloudWatchLogHandler for this logger
        handler = CloudWatchLogHandler(boto3_client=boto3_session, log_group=log_group, create_log_group=True)
    
    else:
        if not os.path.exists("logs"):
            os.makedirs("logs")  # Create the 'logs' directory if it doesn't exist
        # Set the log file path within the 'logs' directory
        log_file_path = os.path.join("logs", log_file) if log_file else None
        # Create a FileHandler for this logger
        handler = logging.FileHandler(log_file_path, encoding="utf-8")
    
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    
    # Add custom filter for request ID and epoch time
    logger.addFilter(RequestIDFilter())

    return logger