variable "storage_account_name" {
  type    = string
  default = "tshopstatesa739401"
}

variable "location" {
  type = string
}

variable "resource_group_name" {
  type = string
}

variable "container_name" {
  type    = string
  default = "tfstate"
}
