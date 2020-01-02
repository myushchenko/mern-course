import React, { useState, useEffect, useContext, useCallback } from "react";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinkList } from "../components/LinkList";
import { useMessage } from "../hooks/message.hook";

export const LinksPage = () => {
  const message = useMessage();
  const [links, setLinks] = useState([]);
  const { request, loading, error } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  useEffect(() => {
    message(error);
  }, [error, message]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && links && <LinkList links={links} />}</>;
};
