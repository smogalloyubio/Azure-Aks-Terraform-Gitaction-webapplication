terraform {
  backend "azurerm" {
    resource_group_name  = "kml_rg_main-9bfffc222ddd4367"
    storage_account_name = "tshopappb9sk96"
    container_name       = "tfstate"
    key                  = "tableandshop-aks.terraform.tfstate"
  }
}
