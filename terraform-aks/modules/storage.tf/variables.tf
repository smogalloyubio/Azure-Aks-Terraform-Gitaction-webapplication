variable "storage_account_name" {
  type    = string
  default = "tshopstorageacct"
}

variable "location" {
  type = string
}

variable "resource_group_name" {
  type = string
}

variable "container_name" {
  type    = string
  default = "appdata"
}
