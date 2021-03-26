import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/Button";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import mock from "../../state/mock.js";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function Articles(props) {
  const { articles, setArticles } = props;
  const { SearchBar } = Search;
  const columns = [
    {
      dataField: "title",
      text: "Article Name",
      sort: true,
    },
    {
      dataField: "tags",
      text: "Tags",
    },
    {
      dataField: "link",
      text: "Links",
    },
    {
      dataField: "projects",
      text: "Projects",
    },
  ];
  const rowStyle = {
    border: "solid 2px #ccc",
    overflowWrap: "break-word",
  };
  // const { isPending } = useContext(ModuleUpdateContext);
  const addArticle = (article) => {
    let list = [...articles];
    list.push(article);
    setArticles(list);
  };
  return (
    <>
      {!articles.length ? <div>No articles found</div> : null}
      <ToolkitProvider keyField="id" data={articles} columns={columns} search>
        {(props) => (
          <div>
            <h2>Search By Article Name:</h2>
            <SearchBar {...props.searchProps} />
            <hr />
            <Button
              onClick={() => {
                addArticle(addTest);
              }}
            >
              add more articles
            </Button>
            <BootstrapTable {...props.baseProps} rowStyle={rowStyle} />
          </div>
        )}
      </ToolkitProvider>
    </>
  );
}
