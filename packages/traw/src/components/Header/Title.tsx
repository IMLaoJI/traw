import React, { useState } from 'react';

interface TitleProps {
  title: string;
  canEdit: boolean;
  handleChangeTitle: (title: string) => void;
}

const Title = ({ title, canEdit, handleChangeTitle }: TitleProps) => {
  const [name, setName] = useState(title);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeTitle(e.target.value);
    setName(e.target.value);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim();
    if (newTitle.length === 0) {
      setName(title);
      return;
    }
    setName(newTitle);
    handleChangeTitle(newTitle);
  };
  return (
    <input
      disabled={!canEdit}
      value={name}
      onChange={onChange}
      onBlur={onBlur}
      className="text-base font-bold text-traw-grey-dark indent-1"
    />
  );
};

export default Title;
