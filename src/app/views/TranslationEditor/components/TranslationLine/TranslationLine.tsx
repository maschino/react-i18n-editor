import React, { useCallback } from 'react';

import { FieldGroup } from 'react-ocean-forms';

import { TranslationRow } from '../TranslationRow';

interface ITranslationLineProps {
  name: string;
  languages: string[];
  showOnlyFiltered: boolean;
}

export const TranslationLine: React.FC<ITranslationLineProps> = ({ name, languages, showOnlyFiltered }: ITranslationLineProps) => {
  const renderFieldGroup = useCallback(() => {
    return (
      <TranslationRow
        key={name}
        name={name}
        languages={languages}
        showOnlyFiltered={showOnlyFiltered}
      />
    );
  }, [languages, name, showOnlyFiltered]);

  return (
    <FieldGroup
      name={name}
      label={name}
      render={renderFieldGroup}
    />
  );
};
