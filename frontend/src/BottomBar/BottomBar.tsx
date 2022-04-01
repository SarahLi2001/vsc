import React from 'react';
import './BottomBar.css';

import source_control from '../Icons/bottom-bar-source-control.svg';
import circle_x from '../Icons/bottom-bar-circle-x.svg';
import triangle_ex from '../Icons/bottom-bar-triangle-exclamation.svg';
import person_chat from '../Icons/bottom-bar-person-chat.svg';

const BottomBar: React.FC<{}> = () => {
  return (
    <div className='bottom-bar'>
      <div className='bottom-bar__left-content'>
        <img className='bottom-bar__icon' src={source_control} />
        <div className='bottom-bar__main'>main</div>
        <div className='bottom-bar__icon'></div>
        <img className='bottom-bar__icon' src={circle_x} />
        <div className='bottom-bar__text'>0</div>
        <img className='bottom-bar__icon' src={triangle_ex} />
        <div className='bottom-bar__text'>0</div>
      </div>
      <div className='bottom-bar__right-content'>
        <div className='bottom-bar__text'>Ln 15, Col 43</div>
        <div className='bottom-bar__text'>Spaces: 2</div>
        <div className='bottom-bar__text'>JavaScript</div>
        {/* <img className='bottom-bar__icon' src={person_chat} /> */}
        <div className='bottom-bar__icon'></div>
      </div>
    </div>
  );
};

export default BottomBar;
