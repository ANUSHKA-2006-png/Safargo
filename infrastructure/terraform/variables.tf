variable "namespace" {
  description = "Kubernetes namespace for Safargo resources."
  type        = string
  default     = "safargo"
}

variable "app_host" {
  description = "Public hostname for the Safargo ingress."
  type        = string
  default     = "safargo.local"
}

variable "database_url" {
  description = "Production PostgreSQL connection string."
  type        = string
  sensitive   = true
}

variable "openai_api_key" {
  description = "OpenAI API key."
  type        = string
  sensitive   = true
  default     = ""
}

variable "gemini_api_key" {
  description = "Google Gemini API key."
  type        = string
  sensitive   = true
  default     = ""
}
