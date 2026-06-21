provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "random_password" "jwt_access" {
  length  = 48
  special = true
}

resource "random_password" "jwt_refresh" {
  length  = 48
  special = true
}

resource "kubernetes_namespace" "safargo" {
  metadata {
    name = var.namespace
  }
}

resource "kubernetes_config_map" "config" {
  metadata {
    name      = "safargo-config"
    namespace = kubernetes_namespace.safargo.metadata[0].name
  }

  data = {
    NODE_ENV     = "production"
    PORT         = "8080"
    CORS_ORIGIN  = "https://${var.app_host}"
    REDIS_URL    = "redis://safargo-redis:6379"
    OPENAI_MODEL = "gpt-4o-mini"
    GEMINI_MODEL = "gemini-1.5-flash"
    LOG_LEVEL    = "info"
    VITE_API_URL = "https://${var.app_host}/api/v1"
  }
}

resource "kubernetes_secret" "secrets" {
  metadata {
    name      = "safargo-secrets"
    namespace = kubernetes_namespace.safargo.metadata[0].name
  }

  data = {
    POSTGRES_PASSWORD   = "managed-by-external-database"
    DATABASE_URL       = var.database_url
    JWT_ACCESS_SECRET  = random_password.jwt_access.result
    JWT_REFRESH_SECRET = random_password.jwt_refresh.result
    OPENAI_API_KEY     = var.openai_api_key
    GEMINI_API_KEY     = var.gemini_api_key
  }

  type = "Opaque"
}
