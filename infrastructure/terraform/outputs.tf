output "namespace" {
  description = "Safargo Kubernetes namespace."
  value       = kubernetes_namespace.safargo.metadata[0].name
}

output "app_url" {
  description = "Public Safargo URL configured for ingress."
  value       = "https://${var.app_host}"
}
