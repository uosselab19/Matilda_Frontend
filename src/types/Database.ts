export const SortOrder = {
  ASC: 'ASC',
  DESC: 'DESC'
} as const;

export type SortOrderOption = typeof SortOrder[keyof typeof SortOrder];
