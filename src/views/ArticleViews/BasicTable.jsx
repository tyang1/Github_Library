import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const BasicTable = (props) => {
  const { columns, data } = props;
  return (
    <MDBTable striped style={{ backgroundColor: "white" }}>
      <MDBTableHead color="primary-color">
        <tr>
          {columns.map((col) => (
            <th>{col.text}</th>
          ))}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {data.map((article) => (
          <tr>
            <td>{article.title}</td>
            <td>{article.link}</td>
            <td>{article.tags}</td>
            <td>
              {article.notes.map((note) => (
                <p>{note}</p>
              ))}
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default BasicTable;
