# react-auto-scroll-table
## Installation
```
npm install react-auto-scroll-table
```
## Usage/Props

- `tbodyRows: ReactNode[]:` rows of the table. These should probably be `<tr>` elements.
- `speed?: number:` Scroll speed. Defaults to 1.
- `thead?: ReactNode` Optional thead element.
- `spacer?: ReactNode:` Optional component to render between the last row of the table and the first element when scrolling.
- `tableClassName?: string` Optional CSS class name appended to underlying table element.
- `containerClassName?: string` Optional CSS class name appended to underlying table element.

## Implementation Notes

- When the table can fully render in the given area, it will not auto-scroll
- Implementation uses CSS Animations to translate 2 duplicated/stacked<tbody> elements.
- This is a bit of a hack and may have implication for performance for very large tables (due to duplicated notes in the DOM).
- It also probably isn't well suited for tables where many event handlers are registered withing table row elements. Although, given this is intended for use in passive (ie. not interactive) tables, this is unlikely.