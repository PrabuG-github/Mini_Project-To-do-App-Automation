# 📝 Mini Project – To‑do App Automation

This project automates testing of a sample **To‑do App** using [Playwright](https://playwright.dev/) inside Docker.
It demonstrates scalable test execution, tagging (`@smoke`, `@regression`).

---

## 🚀 Features

- Playwright test automation for To‑do App
- Dockerized environment for consistent runs
- Tag-based test execution (`@smoke`, `@regression`)
- Parallel container runs with shared results
- Merged HTML reports with screenshots & videos

---

## 📦 Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed (Optional)
- Node.js & npm installed (for local Playwright usage)
- Git (optional, for version control)

---

## 📂 Project Structure

Mini_Project-To-do-App-Automation/
├── tests/                # Playwright test specs
├── playwright.config.ts  # Playwright configuration
├── Dockerfile            # Docker image definition
├── docker-compose.yml    # Compose setup for multiple runs
├── results/              # JSON reports
├── test-results/         # Screenshots & videos
└── playwright-report/    # HTML report

---


## ▶️ Running Tests Locally

To run all Playwright tests on your machine:

```bash
npx playwright test
```




## ▶️ Docker (with mount + tags)

To run all Playwright tests:

```bash
docker run --rm -v ${PWD}:/app todo-app npx playwright test
```


To run specific tags:

```bash
docker run --rm -v ${PWD}:/app todo-app npx playwright test --grep "@smoke"
```
