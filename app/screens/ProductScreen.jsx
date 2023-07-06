import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addtocart } from "../context/actions/cartActions";

const ProductScreen = ({ route }) => {
  const { _id } = route.params;

  const cartItems = useSelector((state) => state.cartItems);
  const feeds = useSelector((state) => state.feeds);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [qty, setQty] = useState(1);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const screenHeight = Math.round(Dimensions.get("window").height);

  useEffect(() => {
    setIsLoading(true);
    if (feeds) {
      setData(feeds?.feeds.filter((item) => item._id === _id)[0]);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, []);

  const handleQty = (action) => {
    const newQty = qty + action;
    setQty(newQty >= 1 ? newQty : 1);
  };

  const handlePressCart = () => {
    dispatch(addtocart({ data: data, qty: qty }));
  };

  return (
    <View className="flex-1 items-start justify-start bg-[#EBEAEF] space-y-4">
      {isLoading ? (
        <View className="w-full flex-1 h-full items-center justify-center ">
          <ActivityIndicator size={"large"} color={"teal"} />
        </View>
      ) : (
        <>
          <SafeAreaView className="w-full">
            {/* Top section */}
            <View className="flex-row items-center justify-between px-4 py-2 w-full">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Entypo name="chevron-left" size={32} color={"#555"} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("CartScreen")}
              >
                <MaterialIcons name="shopping-cart" size={32} color={"#555"} />
              </TouchableOpacity>
            </View>

            {/* Image section */}
            <View
              className="w-full flex items-center justify-center relative"
              style={{ height: screenHeight / 2 }}
            >
              <Image
                source={{ uri: data?.bgImage?.asset?.url }}
                resizeMode="cover"
                className="w-full h-full opacity-30"
              />
              <View className="w-full h-full absolute top-0 left-0 flex items-center justify-center ">
                <Image
                  source={{ uri: data?.mainImage?.asset?.url }}
                  resizeMode="contain"
                  className="w-80 h-80"
                />
              </View>
            </View>

            {/* Category Section */}
            <View className="w-full flex-row items-center justify-evenly mb-4">
              {data?.categories &&
                data?.categories?.length > 0 &&
                data?.categories.map((value) => (
                  <View
                    key={value._id}
                    className="p-2 w-24 rounded-xl bg-white flex items-center justify-center space-y-2"
                  >
                    <Image
                      source={{ uri: value?.mainImage?.asset?.url }}
                      resizeMode="contain"
                      className="w-10 h-10 opacity-70"
                    />
                    <Text className="font-semibold text-[#555]">
                      {value.title}
                    </Text>
                  </View>
                ))}
            </View>
          </SafeAreaView>

          <View className="w-full flex-1 h-full bg-white rounded-t-[36px] py-6 px-12 space-y-4">
            <View className="w-full items-center justify-between flex-row">
              <View className="flex items-start justify-center">
                <Text className="text-xl font-semibold text-[#555]">
                  {data?.title}
                </Text>
                <Text className="text-sm font-semibold text-[#777]">
                  {data?.shortDescription}
                </Text>
              </View>
              <TouchableOpacity className="bg-black w-8 h-8 rounded-full flex items-center justify-center">
                <AntDesign name="heart" size={16} color="#fbfbfb" />
              </TouchableOpacity>
            </View>

            {/* bottom section */}
            <View className="flex-row w-full items-center justify-between">
              <Text className="text-xl font-bold text-black">
                $ {data?.price}
              </Text>

              <View className="flex-row items-center justify-center space-x-4 rounded-xl border border-gray-200 px-4 py-1">
                <TouchableOpacity onPress={() => handleQty(-1)}>
                  <Text className="text-xl font-bold text-[#555]">-</Text>
                </TouchableOpacity>
                <Text className="text-xl font-bold text-black">{qty}</Text>
                <TouchableOpacity onPress={() => handleQty(1)}>
                  <Text className="text-xl font-bold text-[#555]">+</Text>
                </TouchableOpacity>
              </View>

              {cartItems?.cart?.filter((item) => item?.data?._id === data?._id)
                ?.length > 0 ? (
                <TouchableOpacity className="bg-black px-4 py-2 rounded-xl">
                  <Text className="text-base font-semibold text-gray-50">
                    Added
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handlePressCart}
                  className="bg-black px-4 py-2 rounded-xl"
                >
                  <Text className="text-base font-semibold text-gray-50">
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ProductScreen;
