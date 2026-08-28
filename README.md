# ai-devops-experiment

A 30-day AI DevOps experiment: a simple Node.js/Express API, containerized with
Docker, deployed to Kubernetes (EKS), and shipped through a GitHub Actions
CI/CD pipeline.

## Structure

- `app/` — Node.js/Express API, Jest + Supertest tests, Dockerfile
- `k8s/` — Kubernetes manifests (Deployment, Service, Ingress) and a local
  `kind` cluster config
- `.github/workflows/` — CI/CD pipeline: test → build & push to ECR → deploy
  to EKS

## Local development

```bash
cd app
npm install
npm test
npm start
```

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yaml` runs tests and
a security audit, builds and pushes a Docker image to Amazon ECR, then
deploys to an EKS cluster via `kubectl`. It requires the following to be
configured in AWS/GitHub:

- `AWS_ACCOUNT_ID` GitHub secret
- `github-actions-ecr-role` and `github-actions-eks-role` IAM roles (OIDC
  trust with this repo)
- An EKS cluster named `prod-cluster` with a `production` namespace

