output "cluster_id" {
  value = azurerm_kubernetes_cluster.aks.id
}

output "cluster_name" {
  value = azurerm_kubernetes_cluster.aks.name
}

output "cluster_fqdn" {
  value = azurerm_kubernetes_cluster.aks.fqdn
}

output "kube_config_raw" {
  value     = azurerm_kubernetes_cluster.aks.kube_config_raw
  sensitive = true
}
