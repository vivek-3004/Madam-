export enum PageView {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  SLIDESHOW = 'SLIDESHOW',
  WINE = 'WINE',
  SORRY = 'SORRY',
  QUESTION = 'QUESTION',
  SECRET = 'SECRET'
}

export interface BaseProps {
  onNext: () => void;
  onBack?: () => void;
}
