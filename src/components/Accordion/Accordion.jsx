import AccordionDrawer from './AccordionDrawer';
import './accordion.css';

const Accordion = ({ drawers }) => {
  return (
    <div className="message-box accordion">
      {drawers.map((content, index) => (
        <AccordionDrawer key={index} title={content.title}>
          {content.component}
        </AccordionDrawer>
      ))}
    </div>
  );
};

export default Accordion;