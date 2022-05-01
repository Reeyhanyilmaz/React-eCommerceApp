import styles from "./styles.module.css";
import { useRef, useState } from "react";
import { useBasket } from "../../contexts/BasketContext";
import {
  Alert,
  Button,
  Image,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { postOrder } from "../../api";
import { useAuth } from "../../contexts/AuthContext";

function Basket() {
  const [address, setAddress] = useState("");
  const { basketItems, removeFromBasket, emptyBasket } = useBasket();
  const { user } = useAuth();
  console.log(user);
  //chakra'dan aldık
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();

  //toplama islemini yapacak func.
  const total = basketItems.reduce((acc, item) => acc + item.price, 0);

  console.log(basketItems);
  const handleSubmitForm = async (e) => {
    const input = {
      email: user.email,
      address,
      basketItems,
    };

    const response = await postOrder(input);
    console.log("order response:", response);

    //emptyBasket çalışacak sepet temizlenecek ve modal kapanacak.
    emptyBasket();
    onClose(
      toast({
        title: `Siparişiniz Alındı!`,
        description: "En kısa sürede kargoya verilecektir.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top",
      })
    );
  };
  return (
    <Box p="5">
      {basketItems.length < 1 && (
        <Alert status="warning">Sepetinizde ürün bulunmamaktadır.</Alert>
      )}

      {basketItems.length > 0 && (
          <Alert status="success">
            Sepetinizde {basketItems.length} adet ürün bulunmaktadır.
          </Alert>
        ) && (
          <>
            <Text fontSize="2xl" mb="2">
              Sepetim
            </Text>
            <ul className={styles.basketUl}>
              {basketItems.map((item) => (
                <li key={item.id} style={{ marginBottom: 15 }}>
                  <Link to={`/product/${item.id}`}>
                    <Image
                      hmtlWidth={200}
                      loading="lazy"
                      src={item.image}
                      alt="basket item"
                    />
                  </Link>

                  <Link to={`/product/${item.id}`}>
                    <Text fontSize="17">{item.title}</Text>
                  </Link>

                  <Text fontSize="17">{item.price}.0 $</Text>

                  <Button
                    color="white"
                    backgroundColor="#c0b9dd"
                    onClick={() => removeFromBasket(item.id)}
                  >
                    Sepetten Kaldır
                  </Button>
                </li>
              ))}
            </ul>

            <Box mt="10" className={styles.siparisOnaylaBox}>
              <Text fontSize="xl">Sipariş Özeti: {total}.0 $</Text>
              <Button
                mt="2"
                color="white"
                backgroundColor="#84A59D"
                onClick={onOpen}
              >
                Sepeti Onayla
              </Button>
            </Box>

            {/* Sipariş onayla dedigimizde karsımıza cıkacak olan ekran (Modal) */}
            <Modal
              initialFocusRef={initialRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Sipariş</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Adres Giriniz</FormLabel>
                    <Textarea
                      ref={initialRef}
                      placeholder="Adres Giriniz"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    backgroundColor="#c0b9dd"
                    color="white"
                    mr={3}
                    onClick={handleSubmitForm}
                  >
                    Kaydet
                  </Button>
                  <Button onClick={onClose}>İptal</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
    </Box>
  );
}

export default Basket;
