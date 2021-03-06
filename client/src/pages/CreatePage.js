import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useMessage } from "../hooks/message.hook";

export const CreatePage = () => {
  const history = useHistory();
  const message = useMessage();
  const auth = useContext(AuthContext);
  const { request, error } = useHttp();
  const [link, setLink] = useState("");

  const pressHandler = async event => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        history.push(`/detail/${data.link._id}`);
        console.log(data);
      } catch (e) {
        console.log("[UI] CreatePage", e);
      }
    }
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    message(error);
  }, [error, message]);

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Input link"
            id="link"
            type="text"
            name="link"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Input Link</label>
        </div>
      </div>
    </div>
  );
};
