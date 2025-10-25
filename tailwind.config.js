/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./popup.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-gray-50', 'bg-white', 'bg-blue-900', 'bg-blue-700', 'bg-orange-400', 'bg-orange-600',
    'text-white', 'text-gray-600', 'text-gray-800', 'text-orange-500', 'text-green-800',
    'rounded-xl', 'rounded-full', 'p-4', 'p-6', 'px-4', 'py-3', 'space-x-2', 'space-x-3',
    'flex', 'items-center', 'justify-between', 'w-full', 'h-full', 'font-bold', 'text-lg',
    'hover:bg-gray-100', 'transition-colors', 'shadow-sm', 'border', 'border-gray-200'
  ]
}
