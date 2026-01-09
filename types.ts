export enum PageView {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  SLIDESHOW = 'SLIDESHOW',
  WINE = 'WINE',
  SORRY = 'SORRY',
  QUESTION = 'QUESTION'
}

export interface BaseProps {
  onNext: () => void;
  onBack?: () => void;
}