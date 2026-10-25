output "cluster_id" {
  value = module.compute.cluster_id
}

output "cluster_name" {
  value = module.compute.cluster_name
}

output "cluster_fqdn" {
  value = module.compute.cluster_fqdn
}

output "kube_config_raw" {
  value     = module.compute.kube_config_raw
  sensitive = true
}

output "storage_account_name" {
  value = module.storage.storage_account_name
}

output "storage_container_name" {
  value = module.storage.container_name
}

output "resource_group_name" {
  value = data.azurerm_resource_group.rg.name
}
