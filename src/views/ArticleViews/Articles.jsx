import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/Button";
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

  const { SearchBar } = Search;

  // const columnStyle = {
  //   color: "white",
  //   border: "white",
  // };

  // const rowStyle = {
  //   overflowWrap: "break-word",
  //   border: "whilte",
  //   backgroundColor: "white",
  // };

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
    },
  ];

  const addArticle = (article) => {
    if (!article || !article.length) return;
    let list = [...articles];
    list.push(article);
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
              <Button
                onClick={() => {
                  //use the coming new state for the modal edit
                  addArticle([]);
                }}
              >
                add more articles
              </Button>
              <BasicTable />
            </div>
          )}
        </ToolkitProvider>
      )}
    </>
  );
}
