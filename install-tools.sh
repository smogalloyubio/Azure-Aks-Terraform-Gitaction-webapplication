#!/bin/bash
set -e

echo "=== 1. Connecting to AKS Cluster ==="
az aks get-credentials --resource-group kml_rg_main-dd821858c67042ce --name tableandshop-aks-cluster-rs90vq --overwrite-existing

echo "=== 2. Adding Helm Repositories ==="
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update

echo "=== 3. Installing Prometheus & Grafana (kube-prometheus-stack) ==="
kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -
helm upgrade --install prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set grafana.service.type=LoadBalancer

echo "=== 4. Installing ArgoCD ==="
kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
helm upgrade --install argocd argo/argo-cd \
  --namespace argocd \
  --set server.service.type=LoadBalancer

echo "=== 5. Waiting for LoadBalancer IPs ==="
echo "Grafana Service:"
kubectl get svc -n monitoring prometheus-stack-grafana

echo "ArgoCD Service:"
kubectl get svc -n argocd argocd-server

echo "=== 6. Exporting and Saving Secrets ==="
mkdir -p ./credentials

# Grafana Admin Password
echo "Retrieving Grafana admin password..."
GRAFANA_PASSWORD=$(kubectl get secret -n monitoring prometheus-stack-grafana -o jsonpath="{.data.admin-password}" | base64 --decode || echo "Not available yet")
echo "Grafana Admin Password: $GRAFANA_PASSWORD"
echo "Grafana Password: $GRAFANA_PASSWORD" > ./credentials/grafana-secret.txt

# ArgoCD Initial Admin Password
echo "Retrieving ArgoCD initial admin password..."
ARGOCD_PASSWORD=$(kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode 2>/dev/null || echo "Not available yet")
echo "ArgoCD Admin Password: $ARGOCD_PASSWORD"
echo "ArgoCD Password: $ARGOCD_PASSWORD" > ./credentials/argocd-secret.txt

echo "=== Installation & Secret Export Complete! ==="
echo "Credentials saved in ./credentials/ directory."
