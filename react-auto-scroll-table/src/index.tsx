import React, {ReactNode} from 'react';
import {DefaultSpacer, getshouldScroll, useRefDimensions, animateStyle} from './utils';
import styles from './index.module.css';

export type ScrollTableProps = {
  tbodyRows: ReactNode[];
  speed?: number;
  thead?: ReactNode;
  spacer?: ReactNode;
  tableClassName?: string;
  containerClassName?: string;
};

function ScrollTable(props: ScrollTableProps) {
  const tbodyRows = props.tbodyRows;
  const speed = props.speed ?? 1;
  const SpacerComponent = props.spacer ?? <DefaultSpacer />;
  const tableClassName = props.tableClassName ?? '';
  const animateDuration = props.tbodyRows.length / speed;

  const {ref: containerRef, dims: containerDims} = useRefDimensions<HTMLDivElement>();
  const {ref: tbodyRef, dims: tbodyDims} = useRefDimensions<HTMLTableSectionElement>();
  const {ref: tableRef, dims: tableDims} = useRefDimensions<HTMLTableElement>();

  const shouldScroll = getshouldScroll(
    containerDims?.height,
    tbodyDims?.height,
    tableDims?.height,
    tbodyRef.current,
    props.thead !== undefined,
  );

  const bottomAnimateStyle = animateStyle('bottom', animateDuration, shouldScroll)
  const topAnimateStyle = animateStyle('top', animateDuration, shouldScroll)

  return <div
    className={`${styles.scrollTable} ${props.containerClassName || ''}`}
    ref={containerRef}
  >
    <table
      ref={tableRef}
      className={tableClassName} >
      {
        props.thead ?? null
      }
      <tbody
        ref={tbodyRef}
        style={topAnimateStyle}
      >
        {tbodyRows}
        {
          shouldScroll ? SpacerComponent : null
        }
      </tbody>
      {
        !shouldScroll ? null :
          <tbody
            aria-hidden="true"
            style={bottomAnimateStyle}
          >
            {tbodyRows}
            {SpacerComponent}
          </tbody>
      }
    </table>
  </div >;
}

export default ScrollTable;
