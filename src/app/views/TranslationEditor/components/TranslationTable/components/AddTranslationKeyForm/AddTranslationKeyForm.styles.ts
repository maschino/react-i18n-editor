import { createStyles, WithStyles, Theme } from '@material-ui/core';

export const addTranslationKeyFormStyles = (theme: Theme) => createStyles({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
});

export type AddTranslationKeyFormStyledProps = WithStyles<typeof addTranslationKeyFormStyles>;