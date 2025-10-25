/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./popup.html",
  ],
  safelist: [
    'p-3', 'p-4', 'p-5', 'p-6', 'px-3', 'px-4', 'px-5', 'px-6', 'px-10', 'px-16',
    'py-3', 'py-4', 'py-5', 'py-6', 'py-10',
    'rounded-xl', 'rounded-full', 'shadow-sm', 'shadow-lg', 'shadow-xl', 'shadow-2xl',
    'border', 'border-2', 'border-t', 'border-b',
    'flex', 'flex-col', 'flex-1', 'shrink-0', 'items-center', 'items-start', 'justify-between', 'justify-center',
    'w-full', 'h-full', 'w-10', 'h-10', 'w-12', 'h-12', 'w-5', 'h-5', 'w-6', 'h-6',
    'absolute', 'relative', 'top-1/2', 'left-2', 'right-2', 'z-30',
    'overflow-hidden', 'overflow-visible', 'overflow-y-auto',
    'space-y-6', 'space-x-2', 'space-x-3', 'gap-2', 'gap-3', 'gap-4',
    'text-center', 'text-right', 'text-sm', 'text-xs', 'text-lg',
    'font-bold', 'font-semibold', 'font-medium',
    'hover:scale-105', 'hover:scale-110', 'hover:underline', 'hover:shadow-xl',
    'group-hover:translate-y-[-2px]', 'group-hover:rotate-12', 'group-hover:opacity-20',
    'transition-all', 'transition-colors', 'transition-opacity', 'transition-shadow', 'transition-transform',
    'duration-200', 'duration-300', 'duration-500', 'duration-700',
    'mx-auto', 'block', 'inline-flex'
  ]
}
