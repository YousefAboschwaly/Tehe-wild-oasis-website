import './_styles/global.css'


export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className='min-h-screen bg-primary-950 text-primary-100'>{children}</body>
    </html>
  );
}
