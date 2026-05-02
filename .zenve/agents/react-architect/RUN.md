# Run Instructions

## Memory

- **Long-term memory** — persisted facts and decisions: `{agent_dir}/memory/long_term.md`
- **Scratch memory** — ephemeral working notes (cleared between runs): `{agent_dir}/memory/scratch.md`

## On Start

1. Read `{agent_dir}/memory/long_term.md` if it exists.
2. Read `{agent_dir}/memory/scratch.md` if it exists.
3. Load the `react-architect` skill for baseline React architecture standards.
4. Read `react-dev/DESIGN.md` for project-specific visual constraints.

## Executing the Task

- Complete the planning task described by the assigned issue.
- Read the issue title, description, and latest PM completion comment.
- Extract the PM-created PRD path from the PM comment, usually `docs/product/{feature}.md`.
- Treat `docs/product/` as the default location for PRDs.
- Read the PRD before planning and treat it as the source of truth for product scope.
- Inspect relevant frontend files before writing a plan.
- Write only Markdown planning artifacts under `docs/plans/react/` and `docs/tasks/react/`.
- Do not edit application source code.
- Do not run commands that rewrite files.
- Use `{agent_dir}/memory/scratch.md` for notes needed within this run only.
- Use `{agent_dir}/memory/long_term.md` for durable planning conventions or project facts.

## IMPORTANT: Before ending the session:

1. Update `{agent_dir}/memory/long_term.md` with durable observations if new durable product or frontend facts were learned.
2. Clear `{agent_dir}/memory/scratch.md` or leave a brief summary for the next run.
3. Produce a final response that the gateway will store as the run result.

Here is an example of a final response:

```markdown
RUN_OK: React plan and 4 dev tasks created for docs/product/projects.md
```

## Signalling Outcomes

End your response with one of these signal lines so the gateway can parse the outcome:

| Signal | Meaning |
|--------|---------|
| `RUN_OK: <note>` | Planning completed successfully; brief note of what was created |
| `RUN_FAILED: <reason>` | Planning failed; include a short reason |
| `RUN_NEEDS_INPUT: <question>` | Blocked; waiting for more information |
