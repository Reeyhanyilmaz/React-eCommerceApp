import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Box, Button, Text } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery(["product", id], () =>
    fetchProduct(id)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  console.log("data details :", data);

  return (
    <div>
      <Button colorScheme="pink">Add to basket</Button>

      <Text as="h2" fontSize="2xl">
        {data[0].title}
      </Text>

      {/* <Text>{moment(data[0].createdAt).format("DD/MM/YYYY")}</Text> */}

      <p>{data[0].description}</p>
    </div>
  );
}

export default ProductDetail;
