import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BasicTable from "./BasicTable.jsx";
import MyVerticallyCenteredModal from "../ArticleViews/MyVerticallyCenteredModal.jsx";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { useQuery } from "react-query";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
  flexBasis: "100%",
  flex: "1",
};

export default function Articles(props) {
  const { getAllArticles, addArticle } = props;
  const [articles, setArticles] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  const { status, data, error, isFetching } = useQuery("fetchArticles", () => {
    return getAllArticles().then((articles) => {
      setArticles(articles);
      return articles;
    });
  });

  //useEffect: if articles change, then refetch with useQuery

  const { SearchBar } = Search;

  const columns = [
    {
      dataField: "article",
      text: "Article Name",
      sort: true,
    },
    {
      dataField: "categories",
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
                    addArticle={addArticle}
                  />
                }
              />
              <div style={{ marginBottom: "10px" }}>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  add more articles
                </Button>
              </div>
              <BasicTable data={articles} columns={columns} />
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
}

function AddArticleBlock(props) {
  const { articles, setArticles, addArticle } = props;
  const saveNewArticle = (article) => {
    if (!article || !Object.keys(article).length) {
      return;
    }
    let list = [...articles];
    list.push(article);
    addArticle(1, article);
    // setArticles(list);
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
          saveNewArticle({
            id: 0,
            article:
              "How State Management works? Dead simple SM in Vanilla JavaScript",
            link:
              "https://dev.to/vijaypushkin/dead-simple-state-management-in-vanilla-javascript-24p0?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email",
            categories: "react",
            notes:
              "https://github.com/tyang1/Github_Library, https://github.com/tyang1/Prospect_Emails_OSHackathon",
          });
        }}
      >
        Save
      </Button>
    </Form>
  );
}
