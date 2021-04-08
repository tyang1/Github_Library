import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BasicTable from "./BasicTable.jsx";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

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

  const addArticle = (article) => {
    if (!article || !article.length) return;
    let list = [...articles];
    list.push(article);
    console.log("addArticle", list);
    setArticles(list);
  };
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
                modalBody={
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

function MyVerticallyCenteredModal(props) {
  const { modalBody } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
