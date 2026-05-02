# Zenve Design System

## Overview

Zenve's UI should adopt the overall look and feel of `https://mailhog.site`: warm, polished, editorial, and product-led. The goal is to make scheduling feel calm and trustworthy rather than sterile, playful, or enterprise-heavy.

This is a visual reference document for `react-dev`. It defines the experience users should feel and the UI patterns that should repeat across guest and host surfaces.

## Why This Direction

- Hosts need confidence that their scheduling setup looks professional when shared externally.
- Guests need a booking flow that feels simple, credible, and low-friction.
- A softer editorial SaaS aesthetic differentiates Zenve from harsh dashboard-style scheduling tools.

## In Scope

- Public marketing pages
- Guest booking pages
- Host dashboard and event management pages
- Shared UI primitives such as cards, buttons, badges, and empty states

## Out of Scope

- Copying MailHog's product domain, content structure, or brand assets
- Reproducing email-testing-specific widgets where they do not map to scheduling needs
- Defining implementation details such as component names, file structure, or state management

## Core Visual Direction

Zenve should feel like a premium scheduling product with editorial restraint.

- Use warm cream backgrounds instead of cold white or dark gray defaults.
- Use serif typography for major headings to create polish and contrast.
- Use clean sans-serif text for body copy, labels, and controls.
- Use muted borders, soft shadows, and moderate rounding to create depth without looking playful.
- Use a terracotta or burnt-orange accent sparingly for CTAs, active states, and important highlights.

The result should read as calm, modern, and credible.

## Color Guidance

Approximate the MailHog palette rather than cloning it exactly.

- Page background: warm cream
- Surface background: slightly lighter cream or off-white
- Elevated surface: subtly darker cream for section contrast
- Primary text: near-black with a warm cast
- Secondary text: muted brown-gray
- Borders: soft beige-gray hairlines
- Accent: terracotta / burnt orange
- Accent soft fill: pale peach or sand tint
- Danger: muted red
- Success: muted green

The accent color must stand out clearly against the warm neutral surfaces. Avoid neon, blue-heavy palettes, or high-contrast black panels as the default UI language.

## Typography

- Hero headlines and major section headings use a serif face with tight tracking and strong size contrast.
- Body copy, navigation, labels, and buttons use a clean sans-serif face.
- Metadata such as times, durations, booking details, and secondary system information may use monospace sparingly.
- Large headings should feel elegant, not loud.
- Supporting copy should remain highly readable at normal app densities.

## Layout and Spacing

- Marketing surfaces get generous whitespace and strong vertical rhythm.
- Product surfaces keep the same visual language but tighten spacing for utility.
- Cards and sections use clear containment with thin borders and soft shadows.
- Dense data views should stay breathable through alignment and typography rather than oversized padding.

## Reusable UI Patterns

### 1. Hero + Product Preview

For landing and major entry surfaces:

- Small announcement badge above the headline
- Large serif headline with one emphasized word or phrase
- One supporting paragraph with plain-language value
- Primary and secondary CTAs shown together
- A polished mock product panel beneath the CTAs

### 2. Product Demo Panels

Use dashboard-style demo cards to reinforce product credibility.

- Rounded container
- Thin border
- Soft layered shadow
- Distinct header row
- Selected rows highlighted with accent-tinted background and accent edge treatment
- Small badges for status, type, or confirmation state

### 3. Feature and Step Grids

- Section eyebrow in small uppercase text
- Serif section heading
- Cards arranged in a tidy grid
- Icons remain simple and functional
- Each card contains a concise title and compact supporting text

### 4. Code and Configuration Blocks

When showing setup or technical details:

- Use a dark inset panel as a contrast moment
- Keep rounded corners and polished chrome-style header treatment
- Tabs and copy actions must feel lightweight and crisp

### 5. FAQ and Informational Sections

- Use clean, text-forward layouts
- Preserve strong spacing rhythm
- Keep decorative treatment minimal so content remains easy to scan

## Product-Specific Adaptation for Zenve

The reference site is an engineering tool. Zenve is a scheduling product, so the same visual language must be adapted to scheduling flows.

- Booking pages should feel inviting and focused, not like an admin console.
- Time-slot selection should use soft containers, clear active states, and obvious confirmation feedback.
- Host pages may be denser, but they must keep the same warm palette and refined typography.
- Event cards, availability summaries, and confirmation states should borrow the polished demo-panel feel from the reference site.

## Interaction and Motion

- Use subtle hover feedback only.
- Small lifts, border darkening, or background tint changes are enough.
- Motion must feel quick and restrained.
- Avoid bouncy, overscaled, or decorative animation.

## What To Avoid

- Hard-edged industrial dashboard styling
- Full-time dark theme as the primary expression
- Heavy gradients or glossy startup visuals
- Bright blue SaaS defaults
- Oversized pill shapes everywhere
- Loud illustration-heavy compositions

## Definition of Done for React Design Work

The UI matches this design direction when:

- A user can recognize a warm editorial SaaS aesthetic across both marketing and product surfaces.
- Headings, spacing, cards, and CTAs feel visually consistent with the MailHog reference.
- Guest booking flows feel calm and trustworthy.
- Host views feel polished and information-rich without becoming visually harsh.
- New pages reuse the same color, typography, and panel patterns instead of inventing a separate style.
