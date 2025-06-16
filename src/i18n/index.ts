import en from './en';
import fr from './fr';

const dictionaries = { en, fr } as const;
export type Language = keyof typeof dictionaries;
export default dictionaries;
