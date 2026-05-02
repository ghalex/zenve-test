# Design System

## Reference

Zenve should visually track `https://mailhog.site`.

The shared direction is warm editorial SaaS: cream surfaces, serif-led headlines, polished product mock panels, restrained accent color, and calm credibility.

Do not copy MailHog branding or content. Reuse the feel.

## Aesthetic

- Warm, premium, product-led
- Editorial rather than corporate
- Calm and trustworthy rather than technical or playful
- Refined dashboard surfaces instead of industrial control panels

## Color

Base the UI on warm neutrals with a terracotta accent.

- Page background: warm cream
- Surface: soft off-white / ivory
- Elevated sections: slightly darker cream
- Primary text: warm near-black
- Secondary text: muted brown-gray
- Border: beige-gray hairline
- Accent: terracotta / burnt orange
- Accent soft: pale peach / sand tint
- Danger: muted red
- Success: muted green

Guidance:

- Use accent color for primary CTAs, selected states, links, and small emphasis moments.
- Keep most of the interface neutral.
- Avoid saturated blues, neon colors, and stark grayscale dashboards.

## Typography

- Large page and section headings: serif
- Body, labels, navigation, and buttons: sans-serif
- Metadata, times, durations, and compact system details: monospace sparingly
- Eyebrows and section labels: small uppercase with loose tracking

Tone:

- Headings feel elegant and slightly compressed
- Body copy stays plain, readable, and modern

## Corners & Borders

- Cards, panels, dialogs, inputs, and buttons use moderate rounding
- Prefer `rounded-md` or `rounded-lg`
- Borders are thin and soft, never dashed by default
- Avoid `rounded-none` unless a specific local pattern requires it

## Shadows and Depth

- Use soft layered shadows for primary cards and hero product previews
- Standard app cards can use subtle shadows or border-only treatment
- Depth should feel polished, not heavy or glassy

## Spacing & Density

- Marketing sections: generous whitespace and strong vertical rhythm
- Product screens: tighter spacing, but still breathable
- Prefer clean alignment and typographic hierarchy over cramming controls together
- Avoid ultra-dense operator-dashboard layouts

## Buttons

- Primary buttons use the accent background with light text
- Secondary buttons use neutral surface treatment with visible border
- Button shapes remain lightly rounded, never square-cut and never oversized pills
- Keep paired CTAs visually balanced, especially on hero and empty states

## Cards and Panels

Default panel pattern:

- Warm surface background
- Soft border
- `rounded-lg`
- Optional soft shadow
- Distinct header area when the panel contains structured data

Use this pattern for:

- Booking summaries
- Event cards
- Availability sections
- Confirmation panels
- Product demo areas on landing surfaces

## Selection and Active States

- Selected rows or options use an accent-tinted background
- Active items may also use an accent edge, accent text, or small status indicator
- Active state must remain obvious without turning the whole screen into an accent block

## Product Demo Pattern

When a page needs a prominent visual container, mirror the reference site's polished mock-app treatment.

- Rounded outer shell
- Thin border
- Soft shadow
- Simple header bar
- Structured inner content with list/detail or grid layout
- Small badges for status, confirmation, or type

This is especially appropriate for hero sections, booking previews, and confirmation summaries.

## Content Section Pattern

For landing and informational sections:

- Small uppercase eyebrow
- Serif heading
- Short explanatory paragraph
- Grid of feature or step cards beneath

Cards use:

- Simple icons
- Compact titles
- Muted explanatory text

## Code / Config Block Pattern

For developer-facing setup examples, use a dark inset code panel as a contrast moment.

- Keep the rest of the page warm and light
- Dark panels are allowed only as contained components, not as the full-page default
- Rounded corners remain in place

## Scheduling-Specific Adaptation

Zenve is a scheduling product, so apply the reference style to scheduling use cases.

- Guest booking pages must feel focused and welcoming
- Time-slot pickers must be clear, tactile, and calm
- Confirmation states should feel polished and reassuring
- Host management pages can be denser, but must preserve the same warm visual language

## Animation

- Keep motion subtle and fast
- Use hover tint, border darkening, or slight lift
- Avoid bouncy, theatrical, or decorative animation libraries unless already established in the app

## Do Not Do

- No industrial control-panel styling
- No hard square UI as the default
- No primary dark-theme surfaces across whole pages
- No bright blue SaaS defaults
- No heavy gradients or glossy marketing gimmicks
- No cluttered tables that ignore spacing and hierarchy

## Quick Checks

Before shipping a screen, verify:

- Does it read as warm and premium at a glance?
- Are major headings serif-led where appropriate?
- Are cards and controls softly rounded with gentle borders?
- Is the accent color used intentionally rather than everywhere?
- Does the screen feel like the same product as the rest of Zenve?
