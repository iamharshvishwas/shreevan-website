---
rag_pack: shreevan-wellness-crm-agent
version: 0.1
last_updated: 2026-06-26
owner: Shreevan Wellness
intended_system: CRM AI Agent
format: Markdown knowledge base
---

# Shreevan Wellness CRM Agent RAG Knowledge Pack

This folder contains the first structured RAG knowledge base for the Shreevan Wellness CRM AI Agent.

Markdown is the right starting format for this use case because it is human-readable, easy to update, easy to review for compliance, and easy for most RAG pipelines to split by headings. The important point is not "markdown vs another format"; the important point is that the knowledge is chunked by topic, has clear metadata, and avoids mixing legal, health, program, and sales logic in one large file.

## Recommended ingestion method

- Ingest each markdown file separately.
- Chunk by `##` and `###` headings.
- Preserve frontmatter metadata where possible.
- Keep chunk size around 400-900 tokens.
- Add route/source metadata to every chunk if your CRM vector system supports it.
- Do not let the AI answer from memory alone when a related RAG chunk exists.

## Knowledge files

1. `00-agent-operating-rules.md`
   - Mandatory behavior rules for the CRM AI agent.
   - This should have highest retrieval priority.

2. `01-business-profile.md`
   - Brand identity, audience, positioning, tone, routes, and conversion model.

3. `02-programs-and-fit.md`
   - Program comparison, fit logic, inclusions, and responsible recommendation rules.

4. `03-stay-food-travel-location.md`
   - Accommodation, sattvic meals, international visitor reassurance, travel, arrival, location, and safety clarity.

5. `04-booking-payment-and-crm.md`
   - Consultation-first booking flow, payment rules, CRM forms, and follow-up states.

6. `05-health-legal-and-policy-boundaries.md`
   - Wellness disclaimer, privacy, terms, refund, cancellation, and legal response boundaries.

7. `06-faq-answer-bank.md`
   - CRM-safe answer bank for common visitor questions.

8. `07-lead-qualification-playbooks.md`
   - Lead scoring, routing, message templates, escalation triggers, and follow-up playbooks.

9. `08-known-gaps-and-do-not-invent.md`
   - Missing facts, unknowns, and things the agent must not make up.

## Source of truth used for v0.1

- `Shreevan Frontend.md`
- `data/admin/site-settings.json`
- `data/admin/home-content.json`
- `data/admin/program-content.json`
- `data/admin/content-trust.json`
- Legal pages under `src/app/privacy-policy`, `src/app/terms-conditions`, `src/app/refund-policy`, `src/app/wellness-disclaimer`
- Consultation, payment, stay and FAQ page components.

## Update discipline

When program price, exact venue, transfer provider, medical reviewer, registered legal entity, refund terms, or payment gateway changes, update the related RAG file before allowing the CRM AI agent to answer from it.

