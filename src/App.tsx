import './App.css';
import Example from './Example';

function App() {
  return (
    <>
      <h1>react-auto-scroll-table</h1>
      <section className='installation'>
        <h2>Installation</h2>
        <code>
          npm install react-auto-scroll-table
        </code>
      </section>
      <Example />
      <section className='documentation'>
        <h2>Usage/Props</h2>
        <ul>
          <li>
            <code>tbodyRows: ReactNode[]</code>:
            rows of the table. These should probably be <code>{'<tr>'}</code>
            elements.
          </li>
          <li><code>speed?: number</code>: Scroll speed. Defaults to 1.</li>
          <li>
            <code>thead?: ReactNode</code>: Optional <code>thead</code> element.
          </li>
          <li>
            <code>spacer?: ReactNode</code>: Optional component to render between
            the last row of the table and the first element when scrolling.
          </li>
          <li>
            <code>tableClassName?: string</code>:
            Optional CSS class name appended to underlying table element.
          </li>
          <li>
            <code>containerClassName?: string</code>:
            Optional CSS class name appended to underlying table element.
          </li>
        </ul>
      </section>
      <section className='documentation'>
        <h2>Implementation Notes</h2>
        <ul>
          <li>
            When the table can fully render in the given area, it will not
            auto-scroll 
          </li>
          <li>
            Implementation uses CSS Animations to translate 2 duplicated/stacked
            <code>{'<tbody>'}</code> elements. 
          </li>
          <li>
            This is a bit of a hack and may have implication for performance for
            very large tables (due to duplicated notes in the DOM).
          </li>
          <li>
            It also probably isn't well suited for tables where many event
            handlers are registered withing table row elements. Although, given
            this is intended for use in passive (ie. not interactive) tables,
            this is unlikely.
          </li>
        </ul>
      </section>
    </>
  );
}

export default App;
