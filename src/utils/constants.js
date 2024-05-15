import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image as ImageCompressor } from "react-native-compressor";
import { PermissionsAndroid, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import storage from "@react-native-firebase/storage";

import { ToastMessage } from "./ToastMessage";

export const ValidateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
};
export const ValidatePass = (pass) => {
  const regex =
    /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  if (regex.test(pass)) {
    return true;
  } else {
    return false;
  }
};
export const uploadAndGetUrl = async (file) => {
  try {
    const resizeUri = await ImageCompressor.compress(
      file.fileCopyUri || file.path
    );
    const filename = `images/${new Date()
      .toISOString()
      .replace(/[.:-]+/g, "_")}`;
    const uploadUri =
      Platform.OS === "ios" ? resizeUri.replace("file://", "") : resizeUri;
    const storageRef = storage().ref(filename);
    await storageRef.putFile(uploadUri);
    const url = await storageRef.getDownloadURL();
    console.log("Image uploaded successfully");
    return url;
  } catch (err) {
    console.log("=======er", err);
    ToastMessage("Upload Again");
  }
};

export const getToken = async () => {
  // if (Platform.OS == "android") {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  );
  // }
  const fcmToken = await AsyncStorage.getItem("fcmToken");
  // console.log('=======fcmToken', fcmToken);
  if (!fcmToken) {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    const token = await messaging().getToken();
    await AsyncStorage.setItem("fcmToken", token);
  } else {
    return;
  }
};
var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
export const formatPrice = (number) => {
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) return number;
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  var formattedNumber =
    scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1);
  return formattedNumber + suffix;
};

export const placesList = [
  {
    id: 1,
    name: "Islamabad",
    desc: "Best Visiting area Islamabad",
    region: {
      latitude: 33.738045,
      longitude: 73.084488,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Faisal_Masjid_From_Damn_e_koh.jpg",
  },
  {
    id: 2,
    name: "Lahore",
    desc: "Best Visiting area Lahore",
    region: {
      latitude: 31.582045,
      longitude: 74.329376,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    image:
      "https://i.tribune.com.pk/media/images/1850131-lahore-1542598972/1850131-lahore-1542598972.jpg",
  },
  {
    id: 3,
    name: "Karachi",
    desc: "Best Visiting area Karachi",
    region: {
      latitude: 24.860966,
      longitude: 66.990501,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    image:
      "https://prestinetravels.com/wp-content/uploads/2022/11/Mazar-e-Quaid-Mausoleum-karachi-sindh-2021-2022.jpg",
  },
  {
    id: 4,
    name: "Multan",
    desc: "Best Visiting area Multan",
    region: {
      latitude: 30.181459,
      longitude: 71.492157,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk2ipw2CZMKyR-6VbuYQiR6kAVm-Rebxu5ivXy7RF6Ag&s",
  },
  {
    id: 5,
    name: "Peshawar",
    desc: "Best Visiting area Peshawar",
    region: {
      latitude: 34.025917,
      longitude: 71.560135,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    image:
      "https://qph.cf2.quoracdn.net/main-qimg-cb61980195fa1f30767cab9e2e5193f9-pjlq",
  },
  {
    id: 6,
    name: "Quetta",
    desc: "Best Visiting area Quetta",
    region: {
      latitude: 30.18327,
      longitude: 66.996452,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    image:
      "https://www.arabnews.pk/sites/default/files/styles/n_670_395/public/2024/03/24/4288401-2046009976.jpg?itok=a1UJbzxo",
  },
];
