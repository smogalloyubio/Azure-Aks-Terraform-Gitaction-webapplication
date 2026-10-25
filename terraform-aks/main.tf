resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

data "azurerm_resource_group" "rg" {
  name = var.resource_group_name
}

module "network" {
  source                  = "./modules/network"
  resource_group_name     = data.azurerm_resource_group.rg.name
  location                = data.azurerm_resource_group.rg.location
  vnet_name               = "${var.vnet_name}-${random_string.suffix.result}"
  address_space           = var.address_space
  subnet_name             = var.subnet_name
  subnet_address_prefixes = var.subnet_address_prefixes
}

module "compute" {
  source              = "./modules/compute"
  cluster_name        = "${var.cluster_name}-${random_string.suffix.result}"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  dns_prefix          = "${var.dns_prefix}-${random_string.suffix.result}"
  node_count          = var.node_count
  vm_size             = var.vm_size
  subnet_id           = module.network.subnet_id
}

module "storage" {
  source               = "./modules/storage.tf"
  storage_account_name = "${var.storage_account_name}${random_string.suffix.result}"
  resource_group_name  = data.azurerm_resource_group.rg.name
  location             = data.azurerm_resource_group.rg.location
  container_name       = var.container_name
}
