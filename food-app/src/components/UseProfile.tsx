import { useEffect, useState } from "react";

export default function useProfile() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/profile").then(async (resp) => {
      resp.json().then((data) => {
        setData(data);
        setLoading(false);
        setAdmin(data.admin);
      });
    });
  }, []);
  return { loading, data ,admin};
}
