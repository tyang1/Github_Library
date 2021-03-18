import React from 'react';

export default function Article(props) {
  let { article } = props;
  return (
    <>
      {!books.length ? (
        <div className='alert alert-warning' style={{ marginTop: '20px' }}>
          No books found
        </div>
      ) : null}

      {isPending ? <Loading /> : null}

      {uiView.isGridView ? (
        <GridView menuBarHeight={menuBarHeight} books={books} />
      ) : uiView.isBasicList ? (
        <BasicListView books={books} />
      ) : uiView.isCoversList ? (
        <CoversView books={books} />
      ) : null}
    </>
  );
}
