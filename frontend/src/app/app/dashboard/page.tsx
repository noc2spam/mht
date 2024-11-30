"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      await fetch("/api/logs")
        .then((response) => response.json())
        .then((data) => setData(data));
    })();
  }, []);
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
}
