import {ReactNode, useRef} from 'react';
import styles from './index.module.css'

export function ScrollRow(props: {children: ReactNode}) {
  return (
    <tr className={styles.ScrollRow}>
      {props.children}
    </tr>
  )
}


const isVerticalOverflown = (element: HTMLElement) => {
  debugger;
  return element.scrollHeight > element.clientHeight;
} 


export type ScrollTableProps = {
  rows: ReactNode[];
  thead?: ReactNode
  separator?: ReactNode;
};
export function ScrollTable(props:ScrollTableProps) {
  const ref = useRef<HTMLTableElement>(null);
  
  const isOverflown = ref.current === null ? false : isVerticalOverflown(ref.current);
  // const isOverflown = false;
  console.log("asdf")

  return (
    <div
      style={{border: '1px solid black'}}
      className={styles.ScrollTable}
    >
      <table
        // ref={ref}
      >
        {
          props.thead ?? null
        }
        <tbody key={'top'}>
          {
            props.rows
          }
        </tbody>
        {
          !isOverflown ? null:
          <>
            {props.separator ?? null}
            <tbody key={'bottom'}>
            {
              props.rows
            }
            </tbody> 
          </>
        }

      </table>
    </div>
  )
}
export default ScrollTable;
