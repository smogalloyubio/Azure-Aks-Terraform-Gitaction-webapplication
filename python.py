read -rsp "Paste your new Azure client secret: " AZURE_CLIENT_SECRET
echo

export AZURE_CLIENT_SECRET
export AZURE_CLIENT_ID="fec4f6e7-6372-4776-b8c0-6b57e59d71b9"
export AZURE_TENANT_ID="$(az account show --query tenantId -o tsv)"
export AZURE_SUBSCRIPTION_ID="$(az account show --query id -o tsv)"

python3 - <<'PY'
import json
import os

credentials = {
    "clientId": os.environ["AZURE_CLIENT_ID"],
    "clientSecret": os.environ["AZURE_CLIENT_SECRET"],
    "subscriptionId": os.environ["AZURE_SUBSCRIPTION_ID"],
    "tenantId": os.environ["AZURE_TENANT_ID"]
}

with open("azure-credentials.json", "w") as f:
    json.dump(credentials, f, indent=2)

print("Azure credentials JSON created successfully.")
PY

unset AZURE_CLIENT_SECRET AZURE_CLIENT_ID AZURE_TENANT_ID AZURE_SUBSCRIPTION_ID