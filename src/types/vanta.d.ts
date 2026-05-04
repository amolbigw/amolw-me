declare module "vanta/dist/vanta.globe.min" {
  type VantaInstance = { destroy: () => void };
  type VantaOptions = {
    el: HTMLElement;
    THREE: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    color2?: number;
    size?: number;
    backgroundColor?: number;
  };
  const GLOBE: (opts: VantaOptions) => VantaInstance;
  export default GLOBE;
}
