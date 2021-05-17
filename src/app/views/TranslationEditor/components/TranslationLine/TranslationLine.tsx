import React, { useCallback } from 'react';

import { FieldGroup } from 'react-ocean-forms';

import { TranslationRow } from '../TranslationRow';

interface ITranslationLineProps {
  name: string;
  languages: string[];
  showOnlyFiltered: boolean;
  showOnlyMissing: boolean;
}

export const TranslationLine: React.FC<ITranslationLineProps> = ({
  name,
  languages,
  showOnlyFiltered,
  showOnlyMissing,
}: ITranslationLineProps) => {
  const renderFieldGroup = useCallback(() => {
    return (
      <TranslationRow
        key={name}
        name={name}
        languages={languages}
        showOnlyFiltered={showOnlyFiltered}
        showOnlyMissing={showOnlyMissing}
      />
    );
  }, [languages, name, showOnlyFiltered, showOnlyMissing]);

  return <FieldGroup name={name} label={name} render={renderFieldGroup} />;
};
