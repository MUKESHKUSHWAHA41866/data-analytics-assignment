# 🔧 Layout Refactor - Technical Reference

## HTML Structure Fixed

```html
<!-- Before: No proper root styling -->
<body>
  <div id="root"></div>
</body>

<!-- After: Full-width root with proper sizing -->
<body class="m-0 p-0 w-full h-full overflow-x-hidden">
  <div id="root" class="w-full min-h-screen"></div>
</body>
```

### Why This Matters:
- `w-full` ensures #root takes full viewport width
- `min-h-screen` ensures minimum full viewport height
- `overflow-x-hidden` prevents horizontal scroll from images

---

## CSS Global Resets

```css
/* index.css */
* {
  @apply m-0 p-0 box-border;  /* Remove default margins, padding */
}

html, body {
  @apply w-full h-full;  /* Full dimensions */
}

body {
  @apply bg-gray-50 text-gray-900 antialiased;  /* Light background, dark text */
  font-size: 16px;
  line-height: 1.5;
}

#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}
```

### Key Points:
- `box-border` makes padding/borders not add to element width
- Dark text (`text-gray-900`) ensures visibility on light backgrounds
- `antialiased` smooths text rendering
- Flex container allows header to stick and content to push footer down

---

## Container Classes

### `.container-app`
```tailwind
w-full min-h-screen flex flex-col
```
**Used in:** App.jsx root div  
**Purpose:** Main wrapper for entire dashboard  
**Behavior:** Full width, full height, flex column layout

### `.container-main`
```tailwind
flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8
```
**Used in:** Header, main, footer  
**Purpose:** Responsive centered container  
**Responsive Padding:**
- Mobile: `px-4` (1rem)
- Tablet: `sm:px-6` (1.5rem)
- Desktop: `lg:px-8` (2rem)
- Max-width: `max-w-7xl` (80rem = 1280px)

### `.section-spacing`
```tailwind
mb-8
```
**Used in:** Between sections  
**Purpose:** Consistent vertical spacing  
**Value:** 2rem margin-bottom

---

## Text Color Guidelines

### Headings
```jsx
className="text-gray-900 font-bold"  // Dark heading
```
- Use `text-gray-900` for all headings (h1-h6)
- Ensures visibility on white and light backgrounds
- Combine with `font-bold` or `font-semibold`

### Body Text
```jsx
className="text-gray-700"  // Readable body text
```
- Use `text-gray-700` for paragraphs
- Slightly lighter than headings but still dark
- Good readability on white backgrounds

### Labels/Captions
```jsx
className="text-gray-600 text-sm"  // Muted small text
```
- Use `text-gray-600` for small labels
- Use `text-xs` or `text-sm` for size
- Reserve for secondary information

### Table Headers
```jsx
className="font-bold text-gray-900"  // Dark bold headers
```
- Always bold: `font-bold`
- Always dark: `text-gray-900`
- Should stand out from rows

---

## Responsive Grid Patterns

### 3-Column KPI Cards
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```
**Behavior:**
- Mobile (< 640px): 1 column
- Tablet (640px - 1024px): 2 columns
- Desktop (1024px+): 3 columns
- Gap between cards: 1.5rem

### 2-Column Charts
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div className="lg:col-span-2">
    {/* Full width chart */}
  </div>
  {/* Other charts: 50% each */}
</div>
```
**Behavior:**
- Mobile: Single column
- Desktop: Revenue full width, others side-by-side

### Full Width Tables
```jsx
<div className="overflow-x-auto">
  <table className="w-full text-left text-sm">
    {/* Table content */}
  </table>
</div>
```
**Behavior:**
- Scrolls horizontally on mobile
- Full width on desktop
- No wrapping of columns

---

## Card Component Pattern

### Base Card Class
```css
.card {
  @apply bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300;
}
```

### Card with Border
```jsx
<div className="card border-l-4 border-blue-500">
  {/* Content */}
</div>
```

### Card Title
```jsx
<h2 className="card-title">Title</h2>
```
**Class Definition:**
```css
.card-title {
  @apply text-xl font-bold text-gray-900 mb-4;
}
```

### Card Hover Effects
```jsx
<div className="card hover:shadow-lg hover:-translate-y-1 transition-all">
  {/* Content */}
</div>
```
**Effects:**
- `hover:shadow-lg` - Elevation shadow
- `hover:-translate-y-1` - Slight upward movement
- `transition-all` - Smooth animation

---

## Charts Responsive Setup

### Recharts ResponsiveContainer
```jsx
<div className="w-full">
  <ResponsiveContainer width="100%" height={320}>
    <LineChart data={data}>
      {/* Chart components */}
    </LineChart>
  </ResponsiveContainer>
</div>
```

**Key Points:**
- Outer div: `w-full` for full width
- Container: `width="100%" height={pixel}`
- Heights:
  - Revenue: 320px (large)
  - Category: 280px (medium)
  - Others: 300px (standard)
- Automatically scales with container width

### Chart Wrapper
```jsx
<div className="w-full -ml-2">
  {/* Chart container */}
</div>
```
**Purpose:**
- `w-full` ensures full width
- `-ml-2` compensates for chart margins

---

## Color Palette

### Header
```tailwind
bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700
```
Professional blue gradient

### Primary Elements
```tailwind
bg-blue-600     /* Primary button */
text-blue-600   /* Links, highlights */
border-blue-500 /* Focus borders */
```

### Secondary Elements
```tailwind
bg-green-100    /* Badges, trends */
text-green-700  /* Success text */
```

### Neutral Elements
```tailwind
bg-gray-50      /* Backgrounds */
text-gray-900   /* Primary text */
text-gray-700   /* Secondary text */
text-gray-600   /* Muted text */
```

---

## Spacing Scale

```
Tailwind | Pixels | Usage
---------|--------|--------
p-4      | 1rem   | Small padding
p-6      | 1.5rem | Standard card padding
p-8      | 2rem   | Large padding
mb-4     | 1rem   | Internal spacing
mb-6     | 1.5rem | Section bottom spacing
mb-8     | 2rem   | Large section spacing
gap-4    | 1rem   | Small gap between items
gap-6    | 1.5rem | Standard gap
```

---

## Breakpoint Reference

```tailwind
Base     | > 0px    | Mobile (default)
sm:      | > 640px  | Small tablets
md:      | > 768px  | Medium tablets
lg:      | > 1024px | Laptops
xl:      | > 1280px | Desktops
2xl:     | > 1536px | Large screens
```

**Usage Example:**
```jsx
className="text-base sm:text-lg md:text-xl lg:text-2xl"
//         Mobile   Small   Medium  Large
```

---

## Form Elements Styling

### Input
```jsx
<input
  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
             text-gray-900 placeholder-gray-500 
             hover:border-blue-500 transition-colors 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:border-transparent"
/>
```

### Select
```jsx
<select
  className="px-3 py-2 border-2 border-gray-300 rounded-lg 
             bg-white text-gray-900 text-sm font-medium 
             hover:border-blue-500 
             focus:outline-none focus:ring-2 focus:ring-blue-500 
             cursor-pointer"
>
```

### Button
```jsx
<button
  className="px-6 py-2 rounded-lg font-bold 
             bg-blue-600 text-white 
             hover:bg-blue-700 active:scale-95 
             transition-all duration-300"
>
```

---

## Common Issues & Fixes

### Layout Shifts
**Problem:** Content shifts when scrollbar appears  
**Fix:** Add `overflow-x-hidden` to body

### Text Not Visible
**Problem:** Light gray text on white background  
**Fix:** Use `text-gray-900` for headers, `text-gray-700` for body

### Padding Adds to Width
**Problem:** Element width = content + padding  
**Fix:** Apply `box-border` to `*`

### Chart Cuts Off
**Problem:** Chart exceeds container  
**Fix:** Wrap in `<div className="w-full">` and use `ResponsiveContainer`

### Mobile Menu Overflow
**Problem:** Content exceeds mobile width  
**Fix:** Use `px-4` for mobile, scale up with `sm:px-6 lg:px-8`

---

## Performance Tips

1. **Use Responsive Images**
   ```jsx
   <img className="w-full h-auto object-cover rounded-lg" />
   ```

2. **Lazy Load Charts**
   ```jsx
   {filteredData.length > 0 ? (
     <ResponsiveContainer>{/* Chart */}</ResponsiveContainer>
   ) : (
     <p>No data</p>
   )}
   ```

3. **Memoize Computations**
   ```jsx
   const filteredData = useMemo(() => {
     // Heavy computation
   }, [dependencies])
   ```

4. **Use CSS Classes Over Inline**
   ```jsx
   // ✅ Good
   <div className="card">

   // ❌ Avoid
   <div style={{...styles}}>
   ```

---

## Testing at Different Sizes

### Mobile (375px)
```bash
Chrome DevTools → iPhone SE → 375x667
```

### Tablet (768px)
```bash
Chrome DevTools → iPad → 768x1024
```

### Desktop (1920px)
```bash
Chrome DevTools → Desktop → 1920x1080
```

---

## Quick Customization Guide

### Change Max Width
```javascript
// tailwind.config.js
extend: {
  maxWidth: {
    'container': '1400px',  // Change from 1280px
  }
}

// App.jsx
className="max-w-container"
```

### Change Color Scheme
```javascript
// tailwind.config.js
colors: {
  primary: 'rgb(59 130 246 / <alpha-value>)',  // Blue-500
}

// Use in classes
className="bg-primary hover:text-primary"
```

### Adjust Spacing
```jsx
// Increase section spacing
className="mb-12"  // Instead of mb-8

// Tighter card padding
className="p-4"   // Instead of p-6
```

---

**This dashboard now follows professional design practices and is fully responsive! 🚀**
