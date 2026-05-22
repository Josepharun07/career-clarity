
# Career Clarity — Jenkins DevOps Pipeline

Career Clarity is a responsive web application designed to facilitate career assessments, user onboarding, and profile portfolios. This repository houses the core codebase alongside a fully automated, production-ready Jenkins CI/CD pipeline. The pipeline orchestrates automated building, comprehensive unit/integration testing, static code analysis (SonarQube), third-party security vulnerability scanning (Snyk), staging container deployment, registry release (Docker Hub), and automated prometheus metric verification.

---

## 🛠️ Technology Stack

- **Core Application:** Next.js (Node.js runtime, TypeScript)
- **Database:** MongoDB
- **CI/CD Orchestration:** Jenkins LTS
- **Testing:** Jest & React Testing Library
- **Static Code Analysis:** SonarQube Community Edition
- **Vulnerability Scanning:** Snyk CLI
- **Containerization & Staging Deployment:** Docker Engine & Custom Bridge Networks
- **Monitoring & Metrics:** Prometheus Server & Google cAdvisor

---

## 🚀 Pipeline Architecture

The pipeline consists of **8 automated stages** designed to enforce strict testing, quality gates, and automated security controls before code reaches the production registry.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ CHECKOUT  ──>  BUILD  ──>  TEST  ──>  SONAR  ──>  SNYK  ──>  DEPLOY  ──>  RELEASE  ──> MONITOR  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Checkout Code:** Retrieves the latest codebase from the GitHub `main` branch.
2. **Build Artifact:** Compiles the Next.js production code and packages the app into a multi-stage, lightweight Docker image.
3. **Test:** Runs unit and integration tests using Jest and React Testing Library, generating an LCOV coverage report.
4. **Code Quality (SonarQube):** Analyzes the code for quality, duplicate blocks, design flaws, and imports the test coverage report.
5. **Quality Gate:** Webhook integration pauses the pipeline, waiting for SonarQube's analysis; the pipeline aborts if quality criteria are not met.
6. **Security (Snyk):** Evaluates `package.json` for vulnerable dependencies and inspects the container's base layers (`Dockerfile`) for system vulnerabilities.
7. **Deploy (Staging):** Automatically spins up MongoDB (`mongo:7.0`) and the Next.js web application containers locally, isolated on a custom bridge network (`career-clarity-network`).
8. **Release (Docker Hub):** Safely logs into Docker Hub via Jenkins Credentials and pushes the built image with both versioned and `:latest` tags.
9. **Monitoring & Health Check:** Performs native Docker inspects on the running containers and queries Prometheus targets to ensure cAdvisor metric scraping is live.

---

## 📁 Repository Files

- **`Dockerfile`**: Production multi-stage build configuration optimized for Next.js.
- **`Jenkinsfile`**: Declarative pipeline script that orchestrates the 8 CI/CD stages.
- **`sonar-project.properties`**: Configuration for SonarQube scanner source paths and test exclusions.
- **`tsconfig.sonar.json`**: Specialized TypeScript configuration used to eliminate parser compilation conflicts during SonarQube analysis.
- **`__tests__/`**: Home to Jest unit tests (UI validation) and integration tests (validation logic).
```

