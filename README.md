# Best Code Practices for Starting a New Project

## 1. Research & Planning

Before diving into development, thorough research and planning are essential. This phase ensures that you understand the project requirements, market landscape, and technical stack.

### Steps for Effective Research:

- **Create Notion Docs** to organize findings and project details.
- Define **what the project is about**—its purpose and intended users.
- Conduct deep research using tools like **ChatGPT/Claude** to analyze similar applications in production.
- **Watch demos** of similar applications to understand how they function.
- Identify **at least five similar applications** to benchmark against.
- **Search on CodeCanyon.net** for existing solutions and inspiration.
- Define the **app flow and key pages**, creating a structured case study.
- **Company overview**: Understand how the company operates and why they need your application.
- Identify the **problem statement**—the pain point your application will address.
- Plan the **MVP (Minimum Viable Product) features**, along with Phase 2 and Phase 3 features.
- **Break down MVP features** into modules.
- **Design a basic Prisma schema** for these modules, explaining relationships and use cases.
- Prioritize **first five models** if the application exceeds ten models.
- **Implementation schedule**: Assign two models per day over 10–14 days.
- **Seed file preparation**: Define the minimum required fields for each model (4 or fewer required fields).

## 2. Creating a Seed File

- Implement models from the seed file.
- Build the **UI for the models**.
- Fetch data and integrate it with **UI/UX design**.

## 3. Building the Back-End Architecture

- Ensure the **backend is swappable and scalable**.
- Avoid **tight coupling** of components.

---

## Optimization Strategies

### Forms Optimization

#### Traditional Forms Issues:

1. Required all data upfront, leading to the use of **multi-step forms**.
2. Used the same form for **both creation and updates**.
3. Large **payload size** in transit.

#### Modern Forms Optimization:

1. Limit the **number of fields to 4 or fewer**.
2. Use **popup modals** instead of separate pages.
3. Manage state using **React Query**.
4. For forms requiring more than **two fields**, group them logically using tabs or cards (each card should have a max of two fields).

### API Optimization

- Fetch only the **columns that are needed**.
- Always **implement pagination** to handle large datasets efficiently.
- Return **standardized API responses** for consistency.
- Use **Axios** for data fetching.

By following these best practices, you ensure that your project is well-structured, scalable, and optimized from the start.

