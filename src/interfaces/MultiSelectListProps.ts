export interface MultiSelectListProps<T> {
    selectListLabel: string;
    options: T[];
    selected: T[];
    setSelected: (values: T[]) => void;
    getOptionLabel: (option: T) => string;
  }
  