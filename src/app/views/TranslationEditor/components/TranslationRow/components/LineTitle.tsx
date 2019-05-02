import React, { useContext } from 'react';

import { SearchContext } from '../../../../../components/SearchContext';

interface LineTitleProps {
  name: string;
}

export const LineTitle: React.FC<LineTitleProps> = ({ name }) => {
  const { searchString } = useContext(SearchContext);

  if (searchString === '') {
    return <>{name}</>;
  }

  const foundIndex = name.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase());
  if (foundIndex === -1) {
    return <>{name}</>;
  }

  return (
    <>
      {name.substr(0, foundIndex)}
      <strong>{name.substr(foundIndex, searchString.length)}</strong>
      {name.substr(foundIndex + searchString.length)}
    </>
  );
};
