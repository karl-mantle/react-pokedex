import { useEffect } from 'react';
import '../css/footer.css';

const Footer = () => {
  useEffect(() => {
    const footer = document.querySelector('.sticky:has(footer)');

    const hideFooter = () => {
      footer.classList.add('hidden-mobile');
    };

    const showFooter = () => {
      footer.classList.remove('hidden-mobile');
    };

    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
      input.addEventListener('focus', hideFooter);
      input.addEventListener('blur', showFooter);
    });

    window.addEventListener('scroll', showFooter);

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', hideFooter);
        input.removeEventListener('blur', showFooter);
      });
      window.removeEventListener('scroll', showFooter);
    };
    
  }, []);

  return (
    <div className="sticky">
      <footer>
      </footer>
    </div>
  )
}

export default Footer;