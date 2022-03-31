import React, { useState } from 'react';

type TerminalProps = {
  onCommandSend: (command: string) => void;
};

const Terminal: React.FC<TerminalProps> = ({ onCommandSend }) => {
  const [value, setValue] = useState<string>('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onCommandSend(value);
    setValue('');
    e.preventDefault();
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className='terminal'>
      <form onSubmit={handleFormSubmit}>
        <textarea value={value} onChange={handleValueChange} />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default Terminal;
