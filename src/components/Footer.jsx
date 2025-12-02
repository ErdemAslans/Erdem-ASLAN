const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-navy-800/30">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate">
            {currentYear} Erdem Aslan. All rights reserved.
          </p>
          <p className="text-sm text-slate">
            Built with precision and purpose.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
