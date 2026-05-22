
# Career Clarity — Jenkins DevOps Pipeline

Career Clarity is a responsive web application designed to facilitate career assessments, user onboarding, and profile portfolios [3]. This repository houses the core codebase alongside a fully automated, production-ready Jenkins CI/CD pipeline [3]. The pipeline orchestrates automated building, comprehensive unit/integration testing, static code analysis (SonarQube), third-party security vulnerability scanning (Snyk), staging container deployment, registry release (Docker Hub), and automated prometheus metric verification [3].

---

## 🛠️ Technology Stack

- **Core Application:** Next.js (Node.js runtime, TypeScript) [3]
- **Database:** MongoDB [3]
- **CI/CD Orchestration:** Jenkins LTS [3]
- **Testing:** Jest & React Testing Library [3]
- **Static Code Analysis:** SonarQube Community Edition [3]
- **Vulnerability Scanning:** Snyk CLI [3]
- **Containerization & Staging Deployment:** Docker Engine & Custom Bridge Networks [3]
- **Monitoring & Metrics:** Prometheus Server & Google cAdvisor [3]

---

## 🚀 Pipeline Architecture

The pipeline consists of **8 automated stages** designed to enforce strict testing, quality gates, and automated security controls before code reaches the production registry [3].

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ CHECKOUT  ──>  BUILD  ──>  TEST  ──>  SONAR  ──>  SNYK  ──>  DEPLOY  ──>  RELEASE  ──> MONITOR  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Checkout Code:** Retrieves the latest codebase from the GitHub `main` branch [3].
2. **Build Artifact:** Compiles the Next.js production code and packages the app into a multi-stage, lightweight Docker image [3].
3. **Test:** Runs unit and integration tests using Jest and React Testing Library, generating an LCOV coverage report [3].
4. **Code Quality (SonarQube):** Analyzes the code for quality, duplicate blocks, design flaws, and imports the test coverage report [3].
5. **Quality Gate:** Webhook integration pauses the pipeline, waiting for SonarQube's analysis; the pipeline aborts if quality criteria are not met [3].
6. **Security (Snyk):** Evaluates `package.json` for vulnerable dependencies and inspects the container's base layers (`Dockerfile`) for system vulnerabilities [3].
7. **Deploy (Staging):** Automatically spins up MongoDB (`mongo:7.0`) and the Next.js web application containers locally, isolated on a custom bridge network (`career-clarity-network`) [3].
8. **Release (Docker Hub):** Safely logs into Docker Hub via Jenkins Credentials and pushes the built image with both versioned and `:latest` tags [3].
9. **Monitoring & Health Check:** Performs native Docker inspects on the running containers and queries Prometheus targets to ensure cAdvisor metric scraping is live [3].

---

## 📁 Repository Files

- **`Dockerfile`**: Production multi-stage build configuration optimized for Next.js [3].
- **`Jenkinsfile`**: Declarative pipeline script that orchestrates the 8 CI/CD stages [3].
- **`sonar-project.properties`**: Configuration for SonarQube scanner source paths and test exclusions [3].
- **`tsconfig.sonar.json`**: Specialized TypeScript configuration used to eliminate parser compilation conflicts during SonarQube analysis [3].
- **`__tests__/`**: Home to Jest unit tests (UI validation) and integration tests (validation logic) [3].
```

