import React from 'react';
import {useQuery} from "react-query";
import {fetchOrder} from "../../../api";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	Text,
} from "@chakra-ui/react";

function Orders() {
  // catch'lenirken ne ile catch olacak (verilen data), o yüzden useQuery'e key veriyoruz.
  const {data, isLoading, isError , error} = useQuery("admin:orders", fetchOrder);

  if(isLoading) {
    return <div>Loading...</div>
  }

  console.log(data)

  if(isError) {
    return <div>Error {error.message}</div>
  }

  return (
    <div>
       <Text fontSize="2xl" p="5">Orders</Text>

       <Table variant="simple">
         <TableCaption></TableCaption>
         <Thead>
           <Tr>
             <Th>Kullanıcı</Th>
             <Th>Adres</Th>
             <Th isNumeric>Sipariş Detayı</Th>
           </Tr>
         </Thead> 

         <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.email}</Td>
                <Td>{item.address}</Td>
                <Td isNumeric>{item.basketItems}</Td>
              </Tr>
            ))}
         </Tbody>

       </Table>
    </div>
  )
}

export default Orders;