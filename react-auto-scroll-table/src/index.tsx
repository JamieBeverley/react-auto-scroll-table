import React, {ReactNode} from 'react';
import styles from './index.module.css';

type Props = {
  speed?: number;
  thead?: ReactNode;
  spacer?: ReactNode;
  tbodyRows: ReactNode[];
  tableClassName?: string;
  containerClassName?: React.CSSProperties;
};

const DefaultSpacer = () => {
  return <tr className={styles.spacer}></tr>;
};

function ScrollTable(props: Props) {
  const tbodyRows = props.tbodyRows;
  const speed = props.speed ?? 1;
  const SpacerComponent = props.spacer ?? <DefaultSpacer/>;
  const tableClassName = props.tableClassName ?? '';
  const animateDuration = props.tbodyRows.length / speed;
  return <div
    className={styles.scrollTable}
    style={props.containerClassName}
  >
    <table
      className={tableClassName} >
      {
        props.thead ?? null
      }
      <tbody style={{animation: `${styles.top} ${animateDuration}s linear infinite`}}>
        {tbodyRows}
        {SpacerComponent}
      </tbody>
      <tbody style={{animation: `${styles.bottom} ${animateDuration}s linear infinite`}}>
        {tbodyRows}
        {SpacerComponent}
      </tbody>
    </table>
  </div >;
}

export default ScrollTable;