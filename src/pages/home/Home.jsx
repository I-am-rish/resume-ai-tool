import httpClient from "@/utils/httpClinet";
import { Box, Typography, CircularProgress } from "@mui/material";
import HTMLReactParser from "html-react-parser";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    setLoading(true); // start loading
    httpClient
      .get(`/dashboard/get-dashboard-contents`)
      .then((res) => {
        console.log("dashboard => ", res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // stop loading in both success/failure
      });
  }, []);

  return (
    <Box
      display="flex"
      res
      p={3}
      gap={6}
      flexWrap="wrap"
      bgcolor="#fff"
      minHeight="800px"
    >
      {loading ? (
        <Box
          width="100%"
          height="90vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={10}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box flex={1}>
          {data?.map((item, index) => (
            <Box key={index} mb={4}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {item.title}
              </Typography>
              {HTMLReactParser(item.SectionContents[0].description)}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Home;
