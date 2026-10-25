variable "resource_group_name" {
  type    = string
  default = "kml_rg_main-7394019cd7a14f7f"
}

variable "location" {
  type    = string
  default = "East US"
}

variable "vnet_name" {
  type    = string
  default = "vnet-tableandshop"
}

variable "address_space" {
  type    = list(string)
  default = ["10.0.0.0/16"]
}

variable "subnet_name" {
  type    = string
  default = "subnet-aks"
}

variable "subnet_address_prefixes" {
  type    = list(string)
  default = ["10.0.1.0/24"]
}

variable "cluster_name" {
  type    = string
  default = "tshopaks"
}

variable "dns_prefix" {
  type    = string
  default = "tshopk8s"
}

variable "node_count" {
  type    = number
  default = 1
}

variable "vm_size" {
  type    = string
  default = "Standard_D2s_v3"
}

variable "storage_account_name" {
  type    = string
  default = "tshopapp"
}

variable "container_name" {
  type    = string
  default = "appdata"
}
