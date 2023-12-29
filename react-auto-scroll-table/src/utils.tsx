import React, {useCallback, useEffect, useRef} from 'react';
import styles from './index.module.css';

export const DefaultSpacer = () => {
  return <tr className={styles.scrollTableSpacer}></tr>;
};

const useResizeObserver = (ref: React.RefObject<HTMLElement>, callback: (entry: ResizeObserverEntry) => void) => {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        callback(entry);
      });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback]);
}

export const useRefDimensions = <refT extends HTMLElement>() => {
  const ref = useRef<refT>(null);
  const [dims, setDimensions] = React.useState<DOMRectReadOnly>();
  const cb = useCallback((entry: ResizeObserverEntry) => {
    const dims = entry.target.getBoundingClientRect()
    setDimensions(dims)
  }, [setDimensions])
  useResizeObserver(ref, cb)
  return {ref, dims};
}

export const getshouldScroll = (
  containerHeight: number | undefined,
  tbodyHeight: number | undefined,
  tableHeight: number | undefined,
  tbody: HTMLTableSectionElement | null,
  hasThead: boolean,
) => {
  if (!containerHeight || !tbodyHeight || !tableHeight) return false;

  const innerHeight = hasThead ?
    tbodyHeight + (tbody?.children[0].clientHeight ?? 0) :
    tbodyHeight;
  return innerHeight > containerHeight;
}

export const animateStyle = (
  which: 'top' | 'bottom', duration: number, shouldScroll:boolean
) => shouldScroll ?
    ({animation: `${styles[which]} ${duration}s linear infinite`}) :
    {}
