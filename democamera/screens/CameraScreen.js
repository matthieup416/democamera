import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { Button, Modal } from "native-base";
import { StyleSheet, Text, View, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

export default function CameraScreen() {
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [tempPicture, setTempPicture] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    console.log("contenu de photo", photo);
    console.log("taille", photo.width, photo.height);
    console.log("photo.uri", photo.uri);
    setTempPicture(photo.uri);
    setIsModalVisible(true);
  };

  if (!hasPermission || !isFocused) {
    return <View></View>;
  }

  return (
    <Camera
      ref={(ref) => (cameraRef = ref)}
      type={type}
      style={{ flex: 1, justifyContent: "flex-end" }}
    >
      <Button
        onPress={() =>
          setType(type === CameraType.back ? CameraType.front : CameraType.back)
        }
      >
        Flip
      </Button>
      <Button
        title="Snap"
        onPress={() => takePicture()}
        style={{ marginTop: 10 }}
      >
        Snap !
      </Button>

      <Modal
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="4"
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <Image
              source={{ uri: tempPicture }}
              style={{ width: 200, height: 300 }}
            ></Image>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
                setIsModalVisible(false);
              }}
            >
              Fermer
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Camera>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
