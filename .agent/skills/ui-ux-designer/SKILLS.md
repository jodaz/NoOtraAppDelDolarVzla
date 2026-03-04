---
name: ui-ux-designer
description: Enforces Akomo's design system for React Native (Expo) screens and components. Use when creating or modifying any UI — screens, cards, headers, navigation, or typography. Ensures visual consistency, brand correctness, and cross-platform compatibility.
---

# UI/UX Designer Skill — Akomo

## When to use this skill
- When creating or editing any screen, component, or layout
- When adding new UI elements (cards, inputs, buttons, modals, icons)
- When adjusting spacing, typography, or colors
- When designing for web, iOS, or Android within the same codebase

---

## Necessary Inputs
- The component or screen to create/modify
- Target platform (or assume all: iOS, Android, Web)
- Context within the app flow (header, card, detail screen, etc.)

---

## Workflow

1. **Identify scope** — Determine what component or screen is affected.
2. **Apply token values** — Use exact colors, font sizes, radii, and spacing from the design tokens below. Never invent new values.
3. **Reuse existing components** — Check `components/` before building new ones.
4. **Validate cross-platform** — Ensure layout works on iOS, Android, and Web.
5. **Review consistency** — Compare visually against existing screens for alignment.

---

## Design Tokens

### Color Palette

| Role | Token | Hex |
|---|---|---|
| Primary green (brand base) | `--green-primary` | `#178B3E` |
| Surface / card background | `--green-surface` | `#1B6B3E` |
| Border / divider | `--green-border` | `#448A44` |
| Accent yellow (CTA, values) | `--yellow-accent` | `#F1C40F` |
| Icon / teal accent | `--teal-accent` | `#14b8a6` |
| Text primary | `--text-primary` | `#FFFFFF` |
| Text muted | `--text-muted` | `rgba(255,255,255,0.4)` |
| Background dark overlay | `--bg-overlay` | `#030705` |
| Dark base background | `--bg-dark` | `#000000` |

**Gradient Background:**
- Base solid: `#178B3E`
- Overlay (top → bottom): `rgba(3,7,5,1)` → `rgba(3,7,5,0.90)` → `rgba(3,7,5,0.70)` → `rgba(3,7,5,0)`
- Locations: `[0, 0.20, 0.70, 1.0]`
- Implementation: `<GradientBackground>` component wraps all screens.

**Active / Inactive nav colors:**
- Active icon: `#F1C40F`
- Inactive icon: `#09c058`

---

### Typography

| Element | Font | Size | Weight |
|---|---|---|---|
| App name / brand | `Zain_700Bold` | `20` | `bold` |
| Card title | system default | `24` | `bold` |
| Input value | system default | `24` | `bold` |
| Rate value | system default | `24` | `bold` |
| Currency label | system default | `18` | `500` |
| Body / secondary | system default | `16` | normal |
| Small / timestamp | system default | `14` | normal |

- **Primary font**: `Zain_700Bold` (used for the app brand name in the header).
- Use `fontWeight: 'bold'` for all primary data/value display.
- Use `lineHeight: 20` for small text like timestamps and update labels.

---

### Spacing Scale

| Purpose | Value |
|---|---|
| Screen horizontal padding | `16px` |
| Card internal padding | `24px` |
| Card margin bottom | `40px` |
| Card margin horizontal | `10px` |
| List item padding | `16px` |
| Section gap (list) | `12px` |
| Icon gap in row | `6–8px` |
| Nav icon gap | `12px` |
| Logo-to-name gap | `8px` |
| Input horizontal padding | `16px` |
| Header padding bottom | `10px` |

---

### Border Radius

| Element | Radius |
|---|---|
| **Cards** | `20px` ← enforced for all cards |
| Rate items / sub-cards | `16px` |
| Input fields | `12px` |
| Buttons (small) | `12px` |
| Pill / toggle | `18–20px` |
| Icon containers | `20px` (circle: width/height 40) |
| Toast / full pill | `999px` |

> **Rule:** All cards must use `borderRadius: 20` and be centered horizontally and vertically on all platforms.

---

### Borders

- All cards and interactive surfaces use:
  - `borderWidth: 1`
  - `borderColor: '#448A44'` (or `'#1B6B3E'` for outer card border)
- Icon container background: `rgba(20, 184, 166, 0.15)`

---

## Logo & Brand Assets

- **Logo mark**: `assets/images/logo.png` — rendered at `28×28px` in the header.
- **App name**: `"AKomo"` displayed next to the logo using `Zain_700Bold`, `fontSize: 20`, `color: '#fff'`.
- Logo and app name form a `flexDirection: 'row'` unit with `gap: 8`.
- **Never distort, recolor, or resize the logo outside of the established dimensions.**
- For other asset references:
  - USDT icon: `assets/images/logos/usdt.png` (24×24)
  - Splash screens: `splash-icon-dark.png`, `splash-icon-light.png`

---

## Icons

- **Library**: `lucide-react-native` only.
- Default icon size: `22–24px`.
- Active state color: `#F1C40F`.
- Inactive state color: `#09c058`.
- All icons inside containers: wrap in a `View` with `borderRadius: 20`, `width: 40`, `height: 40`, `backgroundColor: 'rgba(20, 184, 166, 0.15)'`.

---

## Component Rules

### Cards
- `borderRadius: 20` — **always**
- `padding: 24`
- `borderWidth: 1`, `borderColor: '#1B6B3E'`
- `marginHorizontal: 10`, `marginBottom: 40`
- Must be centered horizontally and vertically on all platforms (iOS, Android, Web)

### Inputs
- `backgroundColor: '#1B6B3E'`
- `borderRadius: 12`, `borderWidth: 1`, `borderColor: '#448A44'`
- `paddingHorizontal: 16`, `paddingVertical: 4`
- Input text: `color: '#F1C40F'`, `fontSize: 24`, `fontWeight: 'bold'`, `textAlign: 'center'`
- Placeholder text: `color: 'rgba(255,255,255,0.4)'`

### Toggles / Pills
- Container: `backgroundColor: '#1B6B3E'`, `borderRadius: 20`, `borderWidth: 1`, `borderColor: '#448A44'`, `padding: 4`
- Active section: `backgroundColor: '#F1C40F'`, text `color: '#1B6B3E'`
- Inactive text: `color: '#F1C40F'`

### Buttons (small actions)
- `backgroundColor: '#1B6B3E'`
- `borderRadius: 12`, `borderWidth: 1`, `borderColor: '#448A44'`
- `padding: 10`

### Header
- Always transparent background; the gradient from `GradientBackground` shows through.
- `paddingHorizontal: 16`, `paddingBottom: 10`
- Logo row: `flexDirection: 'row'`, `alignItems: 'center'`, `gap: 8`
- Nav icons: `flexDirection: 'row'`, `alignItems: 'center'`, `gap: 12`
- Icon button padding: `6px`

### Toasts / Feedback
- Background: `#F1C40F`
- Text: `color: '#1B6B3E'`, `fontWeight: 'bold'`, `fontSize: 16`
- `borderRadius: 999`, `borderWidth: 1`, `borderColor: '#1B6B3E'`
- Animate in with `Animated.timing` + `Easing.out(Easing.back(1.5))`

---

## Cross-Platform Rules

- Always use `useSafeAreaInsets` to handle notches and status bars.
- Use `Platform.OS` and `useWindowDimensions` for responsive breakpoints.
- Desktop web breakpoint: `width > 768` → `maxWidth: 1200`, `alignSelf: 'center'`.
- All layouts must be tested on iOS, Android, and Web.
- Use `StyleSheet.absoluteFill` for full-screen overlays (gradients, backgrounds).

---

## Output Format

When applying this skill, output:
1. The updated component code with all styles inside `StyleSheet.create({})`
2. Exact hex/rgba values — no variables unless already defined in the project
3. Inline comments for any non-obvious design decision
4. If a new component, note which existing patterns it mirrors

---

## Error Handling

- If a color is ambiguous, default to the table above — never guess.
- If a spacing value is missing, use the closest value from the spacing scale.
- If there is conflict between an existing component and these guidelines, flag it before altering shared components.
- Never override global typography or palette values without confirming with the user.