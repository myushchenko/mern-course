import React, { useState, useEffect, useContext, useCallback } from "react";

import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinkList } from "../components/LinkList";

export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`
      });
      console.log("[UI] LinksPage: ", fetched);
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && links && <LinkList links={links} />}</>;
};
