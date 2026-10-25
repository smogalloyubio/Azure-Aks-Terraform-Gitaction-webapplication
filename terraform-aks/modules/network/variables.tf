variable "resource_group_name" {
  type = string
}

variable "location" {
  type = string
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
