export interface EntryCardProps {
  disabled?: boolean;
  definition: string;
  meaning: string;
  entryClickHandler: (isDisabled: boolean) => void;
}
