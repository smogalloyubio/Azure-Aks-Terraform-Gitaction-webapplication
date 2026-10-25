terraform {
  backend "azurerm" {
    resource_group_name  = "kml_rg_main-7394019cd7a14f7f"
    storage_account_name = "tshopstatestorage"
    container_name       = "tfstate"
    key                  = "tableandshop-aks.terraform.tfstate"
  }
}
