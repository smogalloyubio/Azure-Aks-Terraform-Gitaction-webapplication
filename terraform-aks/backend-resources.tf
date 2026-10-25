resource "azurerm_storage_account" "state_sa" {
  name                     = "tshopstatesa739401"
  resource_group_name      = "kml_rg_main-7394019cd7a14f7f"
  location                 = "eastus"
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    Environment = "Production"
    ManagedBy   = "Terraform"
    Purpose     = "Terraform State Backend"
  }
}

resource "azurerm_storage_container" "state_container" {
  name                  = "tfstate"
  storage_account_name  = azurerm_storage_account.state_sa.name
  container_access_type = "private"
}
