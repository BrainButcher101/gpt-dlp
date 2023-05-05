from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import msal
import openai


# Use environment variables for sensitive data
CLIENT_ID = os.environ["CLIENT_ID"]
TENANT_ID = os.environ["TENANT_ID"]
CLIENT_SECRET = os.environ["CLIENT_SECRET"]

AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"
SCOPE = ["openid", "profile", "User.Read"]

app = Flask(__name__)
CORS(app)

# Create an MSAL Confidential Client Application
app_config = {
    "authority": AUTHORITY,
    "client_id": CLIENT_ID,
    "client_credential": CLIENT_SECRET,
}
msal_app = msal.ConfidentialClientApplication(**app_config)

# Add OIDC authentication routes and handlers

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/api/config', methods=['POST'])
def set_config():
    data = request.get_json()
    rate_limit = data.get('rateLimit')
    api_key = data.get('apiKey')

    # Save the rate_limit and api_key in your preferred storage
    # (e.g., a database, file, or environment variable)

    return jsonify({"message": "Configuration saved successfully."})

if __name__ == '__main__':
    app.run(debug=True)