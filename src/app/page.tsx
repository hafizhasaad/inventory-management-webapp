@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
}

body {
  @apply bg-slate-100 text-slate-900;
}

input,
select,
textarea,
button {
  @apply outline-none;
}

.card {
  @apply rounded-2xl border border-slate-200 bg-white p-5 shadow-soft;
}

.label {
  @apply mb-2 block text-sm font-medium text-slate-700;
}

.input {
  @apply mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100;
}

.button-primary {
  @apply inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700;
}

.button-secondary {
  @apply inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50;
}
