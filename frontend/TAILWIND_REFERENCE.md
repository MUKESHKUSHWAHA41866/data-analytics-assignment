# 🎨 Tailwind CSS Quick Reference - Dashboard Design System

## 📐 Layout Classes

### Grid & Flexbox
```jsx
// Responsive Grid (KPI Cards, Charts)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Flexbox (Headers, Buttons)
<div className="flex justify-between items-center gap-4">

// Full-width flex column
<div className="min-h-screen flex flex-col">

// Centering
<div className="flex items-center justify-center">
```

### Container & Sizing
```jsx
// Max width container
<div className="max-w-7xl mx-auto w-full">

// Full screen
<div className="min-h-screen">

// Padding
<div className="p-6 sm:p-8 lg:p-10">

// Margin auto centering
<div className="mx-auto">
```

---

## 🎨 Background & Colors

### Gradients
```jsx
// Horizontal gradient (Header)
<div className="bg-gradient-to-r from-primary-500 to-secondary">

// Vertical gradient
<div className="bg-gradient-to-b from-gray-50 to-gray-100">

// Solid colors
<div className="bg-white">
<div className="bg-gray-50">
<div className="bg-primary-500">
```

### Text Colors
```jsx
// Primary text
<h1 className="text-gray-900">

// Secondary text
<p className="text-gray-600">

// Colored text
<span className="text-primary-500">
<span className="text-green-700">

// Accent
<strong className="text-primary-500">
```

---

## 🔷 Shadows & Borders

### Shadows
```jsx
// Soft shadow (cards)
<div className="shadow-lg">

// Hover shadow (interactive)
<div className="shadow-lg hover:shadow-xl transition-shadow">

// Custom shadow from config
<div className="shadow-soft">
<div className="shadow-hover">
```

### Borders & Radius
```jsx
// Rounded corners
<div className="rounded-lg">      // 0.5rem
<div className="rounded-xl">      // 0.75rem

// Border
<div className="border border-gray-300">
<div className="border-b-2 border-gray-200">

// Border left (KPI cards)
<div className="border-l-4 border-primary-500">
```

---

## 📝 Typography

### Font Sizes
```jsx
<h1 className="text-3xl sm:text-4xl">     // 30px → 36px
<h2 className="text-2xl">                 // 24px
<h3 className="text-xl">                  // 20px
<p className="text-base">                 // 16px (default)
<small className="text-sm">               // 14px
<p className="text-xs">                    // 12px
```

### Font Weight
```jsx
<h1 className="font-bold">       // 700
<h2 className="font-semibold">  // 600
<p className="font-medium">     // 500
<p className="font-normal">     // 400
```

### Other Typography
```jsx
// Letter spacing
<h1 className="tracking-tight">
<p className="tracking-wide">

// Line height
<p className="leading-relaxed">

// Text alignment
<div className="text-center">
<div className="text-right">
```

---

## 🎬 Interactions & Animations

### Hover Effects
```jsx
// Hover state
<div className="hover:shadow-lg">
<div className="hover:bg-gray-100">
<div className="hover:-translate-y-2">  // Lift on hover
<div className="hover:border-primary-500">

// Group hover
<div className="group hover:bg-blue-500">
  <span className="group-hover:text-white">
```

### Transitions
```jsx
// Smooth transition
<div className="transition-all duration-300">
<div className="transition-colors duration-200">
<div className="transition-shadow duration-300">

// Custom timing
duration-100  // 100ms
duration-200  // 200ms
duration-300  // 300ms (default)
duration-500  // 500ms
```

### Focus States (Forms)
```jsx
// Input focus
<input className="focus:outline-none focus:ring-2 focus:ring-primary-500">

// Button focus
<button className="focus:ring-4 focus:ring-offset-2">
```

---

## 📱 Responsive Breakpoints

```jsx
// Mobile first (375px - default)
<div className="text-sm px-4">

// Small screens (640px)
<div className="sm:text-base sm:px-6">

// Medium screens (768px - tablets)
<div className="md:grid-cols-2 md:px-8">

// Large screens (1024px)
<div className="lg:grid-cols-3">

// Extra large (1280px+)
<div className="xl:grid-cols-4">

// Combined example
<h1 className="text-xl md:text-2xl lg:text-3xl">
```

---

## 🎴 Card Component Pattern

```jsx
// Reusable card styling
<div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-lg transition-shadow duration-300">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Title</h2>
  <p className="text-gray-600">Content</p>
</div>

// Hover effect card
<div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-hover hover:-translate-y-2 transition-all duration-300 cursor-pointer">
  {/* Content */}
</div>
```

---

## 🎨 Badge Component Pattern

```jsx
// Category badge
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
  {label}
</span>

// Trend badge
<div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
  +12.5%
</div>
```

---

## 📊 Table Styling Pattern

```jsx
// Table header
<thead className="bg-gray-50 border-b-2 border-gray-200">

// Table row with hover
<tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">

// Table cell
<td className="px-4 py-3 font-medium text-gray-900">

// Right-aligned cell
<td className="px-4 py-3 text-right font-semibold">
```

---

## 🔍 Form Elements

### Input Fields
```jsx
<input
  type="text"
  placeholder="Search..."
  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 transition-colors hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
/>
```

### Select Dropdowns
```jsx
<select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm font-medium transition-colors hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500">
  <option>Option 1</option>
</select>
```

---

## 🎯 Common Dashboard Patterns

### Header Section
```jsx
<div className="bg-gradient-to-r from-primary-500 to-secondary shadow-lg text-white px-8 py-8">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-4xl font-bold">Dashboard</h1>
    <p className="text-base opacity-95 font-light mt-2">Subtitle</p>
  </div>
</div>
```

### KPI Grid
```jsx
<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {kpis.map(kpi => <KPICard {...kpi} />)}
</section>
```

### Chart Container
```jsx
<div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-lg transition-shadow duration-300">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Chart Title</h2>
  <ResponsiveContainer width="100%" height={400}>
    {/* Chart component */}
  </ResponsiveContainer>
</div>
```

### Error Container
```jsx
<div className="bg-red-50 border border-red-200 rounded-lg p-6">
  <h3 className="text-red-800 font-semibold">Error</h3>
  <p className="text-red-700 mt-2">Error message</p>
</div>
```

### Loading Spinner
```jsx
<div className="min-h-screen bg-gradient-to-r from-primary-500 to-secondary flex flex-col items-center justify-center text-white">
  <div className="w-16 h-16 border-4 border-white border-opacity-30 border-t-white rounded-full animate-spin mb-8"></div>
  <h2 className="text-2xl font-semibold">Loading...</h2>
</div>
```

---

## 💡 Tips & Best Practices

### 1. Mobile-First Development
```jsx
/* Always start with mobile, then enhance */
<div className="text-sm md:text-base lg:text-lg">
<div className="px-4 md:px-8 lg:px-12">
```

### 2. Consistent Spacing
```jsx
// Use gap for spacing between items
<div className="grid gap-6">

// Use p-X for padding
<div className="p-6">

// Use mb-X for margins
<div className="mb-4">
```

### 3. Color Consistency
```jsx
// Use theme colors, not arbitrary colors
❌ bg-[#667eea]
✅ bg-primary-500
```

### 4. Hover States Always
```jsx
// Every interactive element should have hover state
<button className="bg-primary-500 hover:bg-primary-600 transition-colors">
```

### 5. Responsive Images
```jsx
<img 
  src="image.png" 
  className="w-full h-auto object-cover rounded-lg"
/>
```

---

## 🎨 Custom Theme Colors

```javascript
// From tailwind.config.js
primary: 'rgb(102 126 234 / <alpha-value>)'   // #667eea
secondary: 'rgb(118 75 162 / <alpha-value>)'  // #764ba2

// Usage
className="bg-primary-500"
className="text-secondary"
className="border-primary-500"
className="hover:bg-secondary"
```

---

## 🔗 Useful Links

- **Tailwind Color Palette**: https://tailwindcss.com/docs/customizing-colors
- **Responsive Design**: https://tailwindcss.com/docs/responsive-design
- **Hover, Focus & Active**: https://tailwindcss.com/docs/hover-focus-and-other-states
- **Transitions & Animation**: https://tailwindcss.com/docs/transition-property

---

**Use this guide as a reference while building and extending the dashboard! 🚀**
