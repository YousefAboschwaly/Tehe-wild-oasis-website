import './_styles/global.css'
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className='min-h-screen bg-primary-950 text-primary-100'>{children}</body>
    </html>
  );
}
