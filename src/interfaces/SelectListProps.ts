export interface SelectListProps<T> {
    selectListLabel: string;
    options: T[];
    selected?: T;
    setSelected?: (value: T) => void;
    getOptionLabel: (item: T) => string;
  };