import { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    const footer = document.querySelector('.footer-container');

    const handleFocus = () => {
      footer.classList.add('hidden-mobile');
    };

    const handleBlur = () => {
      footer.classList.remove('hidden-mobile');
    };

    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    return () => {
      document.querySelectorAll('input').forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
    };
    
  }, []);

  return (
    <div className="footer-container">
      <footer>
      </footer>
    </div>
  )
}

export default Footer;