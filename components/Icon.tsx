import type { SVGProps } from 'react';

type IconName = 'arrow' | 'chevron' | 'close' | 'menu' | 'whatsapp' | 'phone' | 'pin' | 'spark';

export function Icon({ name, size = 20, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    close: <><path d="M6 6 18 18" /><path d="M18 6 6 18" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    whatsapp: <><path d="M20 11.5a8.5 8.5 0 0 1-12.7 7.4L4 20l1.1-3.2A8.5 8.5 0 1 1 20 11.5Z" /><path d="M8.7 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.6c.6 1 1.5 1.8 2.5 2.3l.7-.5c.2-.2.4-.2.7-.1l1.5.7c.3.1.4.3.3.6-.2.8-.8 1.3-1.5 1.4-1.2.1-3.1-.8-4.6-2.2-1.5-1.4-2.4-3.2-2.2-4.3.1-.4.4-.6.8-.8Z" /></>,
    phone: <><path d="M6.5 4.5 9 4l2 4-1.7 1.6a14 14 0 0 0 5.1 5.1L16 13l4 2 .1 2.5c0 1.2-1 2.2-2.2 2.2C11.3 19.4 4.6 12.7 4.3 6.7c0-1.2 1-2.2 2.2-2.2Z" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
    spark: <><path d="m12 3 1.2 5.8L19 10l-5.8 1.2L12 17l-1.2-5.8L5 10l5.8-1.2L12 3Z" /><path d="m19 15 .5 2.5L22 18l-2.5.5L19 21l-.5-2.5L16 18l2.5-.5L19 15Z" /></>,
  };
  return <svg {...common} {...props}>{paths[name]}</svg>;
}
