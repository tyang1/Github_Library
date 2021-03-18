import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default function Articles(props) {
  const { articles } = props;
  console.log('articles', articles);
  return (
    <>
      <InputGroup>
        <FormControl
          placeholder='Any articles you find interesting'
          aria-label='(ie. React hooks tutorial)'
          aria-describedby='basic-addon2'
        />
        <InputGroup.Append>
          <Button variant='outline-secondary'>Save</Button>
        </InputGroup.Append>
      </InputGroup>
      <ArticleResults articles={articles} />
    </>
  );
}

function ArticleResults(props) {
  const { articles } = props;
  const uiView = { isBasicList: true };
  const columns = [
    {
      dataField: 'id',
      text: 'Article ID',
    },
    {
      dataField: 'title',
      text: 'Article Name',
    },
    {
      dataField: 'tags',
      text: 'Tags',
    },
    {
      dataField: 'link',
      text: 'Links',
    },
    {
      dataField: 'projects',
      text: 'Projects',
    },
  ];
  // const { isPending } = useContext(ModuleUpdateContext);
  return (
    <>
      {/* {!articles.length ? (
        <div className='alert alert-warning' style={{ marginTop: '20px' }}>
          No articles found
        </div>
      ) : null}

      {isPending ? <Loading /> : null} */}

      {/* {uiView.isGridView ? (
        <GridView menuBarHeight={menuBarHeight} articles={articles} />
      ) : uiView.isBasicList ? (
        <BasicListView articles={articles} />
      ) : uiView.isCoversList ? (
        <CoversView articles={articles} />
      ) : null} */}
      <BootstrapTable keyField='id' data={articles} columns={columns} />
    </>
  );
}
