terraform {
  backend "azurerm" {
    resource_group_name  = "kml_rg_main-dd821858c67042ce"
    storage_account_name = "tshopstatesa739401"
    container_name       = "tfstate"
    key                  = "tableandshop-aks.terraform.tfstate"
  }
}
