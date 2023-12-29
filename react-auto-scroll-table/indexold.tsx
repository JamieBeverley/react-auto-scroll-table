// import {ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react';
// import styles from './index.module.css'
// import useResizeObserver from '@react-hook/resize-observer'

// export function ScrollRow(props: {children: ReactNode}) {
//   return (
//     <tr className={styles.ScrollRow}>
//       {props.children}
//     </tr>
//   )
// }


// const isVerticalOverflown = (element: Element) => {
//   debugger
//   return element.scrollHeight > element.clientHeight;
// }

// const useIsOverflown = (ref: React.RefObject<HTMLElement>): boolean => {
//   if (ref.current === null) {
//     return false;
//   }
//   const element = ref.current;

//   return false
// }


// export type ScrollTableProps = {
//   rows: ReactNode[];
//   thead?: ReactNode
//   separator?: ReactNode;
// };

// const useOverflown = (target: React.RefObject<HTMLElement>) => {
//   const [overflown, setOverflown] = useState<boolean>()

//   useLayoutEffect(() => {
//     if (!target.current) return;
//     setOverflown(isVerticalOverflown(target.current));
//   }, [target])

//   useResizeObserver(target, (entry) => {
//     const over = isVerticalOverflown(entry.target)
//     console.log('resize', over)
//     setOverflown(over)
//   })
//   return overflown
// }

// export function ScrollTable(props: ScrollTableProps) {
//   const ref = useRef<HTMLTableElement>(null);
//   // const [isOverflown, setIsOverflown] = useState<boolean>(false);

//   // useLayoutEffect(() => {
//   //   if (!ref.current) return;
//   //   if (ref.current.clientHeight < ref.current.scrollHeight) {
//   //     setIsOverflown(true);
//   //   } else{
//   //     setIsOverflown(false);
//   //   }
//   // }, [ref]);
//   const isOverflown = useOverflown(ref);
//   console.log(isOverflown)

//   // const [isOverflown, setIsOverflown] = useState<boolean>(false);

//   // useEffect(() => {
//   //   if (!ref.current) return;
//   //   const resizeObserver = new ResizeObserver(() => {
//   //     if(!ref.current) return;
//   //     const isOverflown = isVerticalOverflown(ref.current)
//   //     setIsOverflown(isOverflown);
//   //   });
//   //   resizeObserver.observe(ref.current);
//   //   return () => resizeObserver.disconnect(); // clean up 
//   // }, []);

//   return (
//     <div
//       style={{height: '100%'}}
//       ref={ref}
//     >
//     <table
//       style={{border: '1px solid black', height: '100%', overflowY: 'auto'}}
//       className={styles.ScrollTable}
//     >
//       <thead
//         className={styles.ScrollTableHead}
//       >
//       {
//         props.thead ?? null
//       }
//       </thead>
//       <tbody
//         key={'top'}
//         // style={{overflowY: 'auto', height: '100%'}}
//         >
//         {
//           props.rows
//         }
//       </tbody>
//       {
//         !isOverflown ? null :
//           <>
//             {props.separator ?? null}
//             <tbody key={'bottom'}>
//               {
//                 props.rows
//               }
//             </tbody>
//           </>
//       }
//     </table>
//         </div>
//   )
// }
// export default ScrollTable;
