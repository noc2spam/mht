"use client";
import { useEffect, useState } from "react";

export default function DashboardGraph() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        await fetch("/api/logs")
          .then((response) => response.json())
          .then((data) => setData(data));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
}
