export interface Brick {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  popped: boolean;
  life: number;
}

export interface StepData {
  time: string;
  label: string;
  caption: string;
  glow: string;
}
