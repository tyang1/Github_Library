import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BasicTable from "./BasicTable.jsx";
import MyVerticallyCenteredModal from "../ArticleViews/MyVerticallyCenteredModal.jsx";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

// const formStyle = {
//   display: "flex",
//   flexDirection: "row",
//   flexWrap: "wrap",
//   width: "100%",
// };

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  flexBasis: "100%",
  flex: "1",
};

export default function Articles(props) {
  const { articles, setArticles, useArticles } = props;
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useArticles();
  const [modalShow, setModalShow] = useState(false);

  const { SearchBar } = Search;

  const columns = [
    {
      dataField: "article",
      text: "Article Name",
      sort: true,
    },
    {
      dataField: "category",
      text: "Categories",
    },
    {
      dataField: "link",
      text: "Link",
    },
    {
      dataField: "notes",
      text: "Notes",
      hasMultiple: true,
    },
    {
      dataField: "actions",
      text: "Actions",
    },
  ];

  return (
    <>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <ToolkitProvider keyField="id" data={data} columns={columns} search>
          {(props) => (
            <div>
              <h2>Search By Article Name:</h2>
              <SearchBar {...props.searchProps} />
              <hr />
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                modalHeading={"adding new article"}
                withModalFooter={false}
                withModalTitle={false}
                withModalHeader={true}
                modalBody={
                  <AddArticleBlock
                    articles={articles}
                    setArticles={setArticles}
                  />
                }
              />
              <div style={{ marginBottom: "10px" }}>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  add more articles
                </Button>
              </div>
              <BasicTable data={data} columns={columns} />
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
}

function AddArticleBlock(props) {
  const { articles, setArticles } = props;
  const addArticle = (article) => {
    if (!article || !article.length) return;
    let list = [...articles];
    list.push(article);
    console.log("addArticle", list);
    setArticles(list);
  };
  return (
    <Form>
      <Form.Group
        style={{ ...formGroupStyle }}
        controlId="exampleForm.ControlInput1"
      >
        <Form.Label>Article Title</Form.Label>
        <Form.Control placeholder="React Fun.." />
        <Form.Label>Article Link</Form.Label>
        <Form.Control placeholder="www.medium.com" />
        <Form.Label>Article Tags</Form.Label>
        <Form.Control placeholder="www.medium.com" />
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button
        onClick={(e) => {
          //use the coming new state for the modal edit
          e.preventDefault();
          addArticle([
            {
              id: 0,
              title:
                "How State Management works? Dead simple SM in Vanilla JavaScript",
              link:
                "https://dev.to/vijaypushkin/dead-simple-state-management-in-vanilla-javascript-24p0?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email",
              tags: [],
              notes: [
                "https://github.com/tyang1/Github_Library",
                "https://github.com/tyang1/Prospect_Emails_OSHackathon",
              ],
            },
          ]);
        }}
      >
        Save
      </Button>
    </Form>
  );
}
