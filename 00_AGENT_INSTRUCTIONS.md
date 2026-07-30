# 00_AGENT_INSTRUCTIONS.md

# AI Coding Agent Instructions

Version: 1.0

Purpose:
This document defines how the coding agent must execute the project. It is not part of the application requirements. It exists to ensure consistent implementation.

---

# 1. Read Order

Always read the project documents in this order:

1. 00_AGENT_INSTRUCTIONS.md
2. 01_PROJECT_SPEC.md
3. 02_BUILD_GUIDE.md

Do not skip any document.

---

# 2. Source of Truth

01_PROJECT_SPEC.md defines WHAT must be built.

02_BUILD_GUIDE.md defines HOW it must be built.

If there is any conflict, follow PROJECT_SPEC first.

Do not invent new requirements.

---

# 3. Project Goal

Build a production-ready Portfolio + Enquiry + Workshop Registration website.

The objective is simplicity, maintainability and production quality.

Do not over-engineer the solution.

---

# 4. Development Philosophy

Prefer

- Simplicity
- Readability
- Reusability
- Maintainability

Avoid

- Unnecessary abstraction
- Premature optimisation
- Complex architectures
- Duplicate code
- Experimental libraries

---

# 5. Implementation Rules

Always

- Use reusable components.
- Reuse layouts.
- Keep business logic in the backend.
- Validate every form.
- Use TypeScript strictly.
- Follow the approved folder structure.
- Keep functions small and focused.

Never

- Hardcode secrets.
- Hardcode URLs.
- Duplicate components.
- Duplicate validation logic.
- Duplicate API logic.

---

# 6. UI Rules

The website should feel

- Clean
- Professional
- Fast
- Modern
- Spiritual but minimal

Avoid unnecessary animations.

Prioritise readability.

---

# 7. Coding Style

Prefer

Early returns

Small functions

Descriptive names

Strong typing

Consistent formatting

Avoid

Large files

Nested logic

Magic strings

Magic numbers

Unused code

---

# 8. Backend Rules

Business logic belongs only in FastAPI.

Frontend should never perform business decisions.

All important actions must be validated on the backend.

---

# 9. Frontend Rules

Keep pages lightweight.

Prefer Server Components.

Use Client Components only where interaction requires them.

Lazy-load heavy components.

Optimise images.

---

# 10. Database Rules

Normalise where practical.

Avoid duplicate tables.

Use foreign keys.

Use timestamps.

Prefer soft delete where appropriate.

---

# 11. API Rules

RESTful naming.

Consistent response format.

Meaningful HTTP status codes.

Validate every request.

Never expose internal errors.

---

# 12. Forms

Every form must include

- Client validation
- Server validation
- Loading state
- Success state
- Error state

Prevent duplicate submissions.

---

# 13. Error Handling

Never crash the UI.

Display friendly messages.

Log detailed server errors.

Handle edge cases gracefully.

---

# 14. Security

Protect admin routes.

Sanitise inputs.

Validate uploads.

Store secrets only in environment variables.

Never expose service credentials.

---

# 15. Performance

Optimise

Images

Fonts

Bundle size

API calls

Database queries

Avoid unnecessary re-renders.

---

# 16. Accessibility

Use semantic HTML.

Support keyboard navigation.

Provide alt text.

Associate labels with inputs.

Maintain sufficient colour contrast.

---

# 17. SEO

Every public page must support

- Title
- Description
- Canonical URL
- Open Graph metadata

Use meaningful URLs.

---

# 18. Reusability

Before creating

- Component
- API
- Utility
- Hook
- Service

Check whether an existing implementation can be reused.

Do not duplicate functionality.

---

# 19. Build Order

Always complete one feature before beginning another.

Recommended order

1. Project Setup
2. Layout
3. Homepage
4. Offerings
5. Classes
6. Workshops
7. Blogs
8. Gallery
9. FAQ
10. Contact
11. Admin
12. Integrations
13. SEO
14. Testing
15. Deployment

Do not jump ahead.

---

# 20. Completion Checklist

Before marking any feature complete, verify

✓ UI implemented

✓ Backend implemented

✓ Database updated

✓ Validation complete

✓ Mobile responsive

✓ Error handling present

✓ Loading states implemented

✓ Tested manually

---

# 21. Definition of Done

The project is complete only when

✓ Every page from PROJECT_SPEC exists.

✓ Every workflow functions end-to-end.

✓ Admin manages all content.

✓ WhatsApp integration works.

✓ Razorpay payment verification succeeds.

✓ Google Calendar integration functions correctly.

✓ Website is responsive.

✓ SEO essentials are complete.

✓ No critical or high-priority bugs remain.

✓ Application is ready for production deployment.

---

# 22. Final Rule

When faced with multiple implementation choices:

Choose the simplest solution that fully satisfies the approved specification.

Do not introduce additional complexity unless it is essential for correctness, security or maintainability.

End of File