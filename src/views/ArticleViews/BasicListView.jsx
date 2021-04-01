im

import React, { useContext, useState } from 'react';

export default function BasicListView(props) {
  const [{ isPublic: viewingPublic, online }] = useContext(AppContext);
  const {
    book,
    booksUiState,
    dispatchBooksUiState,
    setRead,
    runDelete,
  } = props;
  const { _id } = book;
  const { selectedBooks } = booksUiState;

  const [expanded, setExpanded] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [
    startDelete,
    cancelDelete,
    doDelete,
    pendingDelete,
    deleting,
  ] = useDelete(() => runDelete(_id));

  const hoverOverride = { display: pendingDelete ? 'inline' : '' };

  return (
    <>
      <tr>
        <td>
          <div style={{ minWidth: '75px', minHeight: '75px' }}>
            <CoverSmall url={book.smallImage} />
          </div>
        </td>
        <td>
          <Stack>
            <Stack tightest={true}>
              <div className={bookTitle}>{book.title}</div>
              {book.authors ? (
                <div className={bookAuthor}>{book.authors.join(', ')}</div>
              ) : null}
            </Stack>

            <FlowItems
              vCenter={true}
              tighter={true}
              containerStyle={{ minHeight: '35px' }}
            >
              {online ? (
                detailsLoading ? (
                  <a
                    style={hoverOverride}
                    target='_new'
                    className={`${gridHoverFilter}`}
                  >
                    <i className='fa fa-fw fa-spin fa-spinner' />
                  </a>
                ) : expanded ? (
                  <a
                    style={hoverOverride}
                    target='_new'
                    onClick={() => setExpanded(false)}
                    className={`${gridHoverFilter}`}
                  >
                    <i className={`far fa-minus`} />
                  </a>
                ) : (
                  <a
                    style={hoverOverride}
                    target='_new'
                    onClick={() => setExpanded(true)}
                    className={`${gridHoverFilter}`}
                  >
                    <i className={`far fa-plus`} />
                  </a>
                )
              ) : null}
              {book.isbn && online ? (
                <a
                  style={{ ...hoverOverride, paddingTop: '1px' }}
                  target='_new'
                  className={`${gridHoverFilter}`}
                  href={`https://www.amazon.com/gp/product/${book.isbn}/?tag=zoomiec-20`}
                >
                  <i className={`fab fa-amazon`} />
                </a>
              ) : null}
              {!viewingPublic && online ? (
                <>
                  <a
                    style={hoverOverride}
                    className={`${gridHoverFilter}`}
                    onClick={() => props.editBook(book)}
                  >
                    <i className='fal fa-pencil-alt'></i>
                  </a>
                  <a
                    style={hoverOverride}
                    className={`${gridHoverFilter}`}
                    onClick={startDelete}
                  >
                    <i className={`fal fa-trash-alt`} />
                  </a>
                </>
              ) : null}
              {pendingDelete ? (
                <ActionButton
                  text='Confirm Delete'
                  runningText='Deleting'
                  onClick={doDelete}
                  preset='danger-xs'
                >
                  Confirm Delete
                </ActionButton>
              ) : null}
              {pendingDelete ? (
                <button
                  disabled={deleting}
                  onClick={cancelDelete}
                  className='btn btn-xs'
                >
                  Cancel
                </button>
              ) : null}
            </FlowItems>
          </Stack>
        </td>
        <td>
          <div style={{ marginTop: '3px' }}>
            {book.subjectObjects.map((s, i) => (
              <div key={i} style={{ marginBottom: '4px' }}>
                <LabelDisplay item={s} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 5 }}>
            {!viewingPublic ? (
              <a
                className={`${gridHoverFilter}`}
                onClick={() => props.editBooksSubjects(book)}
              >
                <i className='fal fa-pencil-alt'></i>
              </a>
            ) : null}
          </div>
        </td>
        <td>
          <div style={{ marginTop: '3px' }}>
            {book.tagObjects.map((s, i) => (
              <div key={i} style={{ marginBottom: '4px' }}>
                <LabelDisplay item={s} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 5 }}>
            {!viewingPublic ? (
              <a
                className={`${gridHoverFilter}`}
                onClick={() => props.editBooksTags(book)}
              >
                <i className='fal fa-pencil-alt'></i>
              </a>
            ) : null}
          </div>
        </td>
        <td>
          <div style={{ marginTop: !viewingPublic ? '3px' : 0 }}>
            {!viewingPublic ? (
              !!book.isRead ? (
                <ActionButton
                  baseWidth='10ch'
                  text='Read'
                  runningText='Saving'
                  icon='fa fa-fw fa-check'
                  onClick={() => setRead([_id], !book.isRead)}
                  preset='success-xs'
                />
              ) : (
                <ActionButton
                  baseWidth='10ch'
                  text='Set read'
                  runningText='Saving'
                  onClick={() => setRead([_id], !book.isRead)}
                  preset='default-xs'
                />
              )
            ) : !!book.isRead ? (
              <span className='label label-success'>
                Read <i className='fa fa-fw fa-check' />
              </span>
            ) : null}
          </div>
        </td>
        <td>
          {book.publisher ? <div>{book.publisher}</div> : null}
          {book.publicationDate ? <div>{book.publicationDate}</div> : null}
          {book.isbn ? <div>{book.isbn}</div> : null}
        </td>
        <td>{book.pages}</td>
        <td>{book.dateAddedDisplay}</td>
      </tr>
      {expanded ? <BookRowDetails {...{ book, setDetailsLoading }} /> : null}
    </>
  );
}
