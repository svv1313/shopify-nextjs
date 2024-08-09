const navigation = [
  { name: "Shop", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Terms and Conditions", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-2xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center" aria-label="Footer">
          {navigation.map((item) => (
            <div key={item.name} className="px-6 py-2">
              <a href={item.href} className="text-gray-500 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-8 text-center text-gray-400">
          &copy; 2024 Shopify Next.js, All right reserved.
        </p>
      </div>
    </footer>
  );
};
