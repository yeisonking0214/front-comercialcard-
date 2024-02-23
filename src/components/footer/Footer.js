import React from 'react';

const Footer = (props) => {
    const { text } = props;
  return (
    <footer>
        Day Tip: {text}
    </footer>
  );
};
export default Footer;