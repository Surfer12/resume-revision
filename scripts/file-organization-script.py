import json
import boto3
from mistralai.client import MistralClient

def get_secrets():
    """Retrieve secrets from AWS Secrets Manager"""
    client = boto3.client('secretsmanager')
    response = client.get_secret_value(SecretId='resume-app-secrets')
    secret_string = response['SecretString']
    return json.loads(secret_string)

# Get secrets from AWS Secrets Manager
secrets = get_secrets()
api_key = secrets['MISTRAL_API_KEY']
database_url = secrets['DATABASE_URL']  # postgres://user:password@localhost:5432/mydatabase
secret_key = secrets['SECRET_KEY']      # mysecretkey
debug = secrets['DEBUG']                # True

model = "mistral-large-latest"

# Initialize Mistral client with API key from secrets
client = MistralClient(api_key=api_key)

# Print confirmation of retrieved secrets (remove in production)
print(f"Database URL: {database_url}")
print(f"Debug mode: {debug}")
print(f"Secret key retrieved: {'Yes' if secret_key else 'No'}")

chat_response = client.chat(
    model = model,
    messages = [
        {
            "role": "user",
            "content": "What is the best French cheese?",
        },
    ]
)

print(chat_response.choices[0].message.content)

# Note: To use this script, you'll need to:
# 1. Install boto3: pip install boto3
# 2. Configure AWS credentials: aws configure
# 3. Create a secret in AWS Secrets Manager named 'resume-app-secrets' with these keys:
#    - MISTRAL_API_KEY
#    - DATABASE_URL
#    - SECRET_KEY
#    - DEBUG
