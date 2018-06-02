import React from 'react';
import PT from 'prop-types';


function Button ({onClick, text}) {
  return <button onClick={onClick} >{text}</button>
}

Button.propTypes = {
  text: PT.string.isRequired
}

export default Button;