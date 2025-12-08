import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const IMAGES = [
  { uri: "https://deportesaludable.com/wp-content/uploads/2018/12/alimentos-saludables.jpg" },
  { uri: "https://blog.novalar.com.br/wp-content/uploads/2022/04/Principais-eletrodomesticos.jpg" },
  { uri: "https://media.gazetadopovo.com.br/2021/08/24165607/meio01_shutterstock_1042252666-1-660x372.jpg" },
  { uri: "https://medlimp.com.br/wp-content/uploads/2021/07/produtos-de-limpeza-profissional.jpg" },
];

const CATEGORIES = [
  {
    name: "Alimentos",
    icon: "🍎",
    color: "#E8F5E9",
    route: "/listAlimentos",
  },
  {
    name: "Eletrodomésticos",
    icon: "🧊",
    color: "#E8F5E9",
    route: "/listEletro",
  },
  {
    name: "Produtos de Limpeza",
    icon: "🧼",
    color: "#E8F5E9",
    route: "/listProdutos",
  },
  {
    name: "Utensílios",
    icon: "🍴",
    color: "#E8F5E9",
    route: "/listUtensilios",
  },
];
const CategoryItem = ({ name, icon, route }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.squareCardContainer}
      onPress={() => router.push(route)}
    >
      <Text style={styles.squareCardIcon}>{icon}</Text>
      <Text style={styles.squareCardText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const checkVisitedQuote = async () => {
      const hasVisitedQuote = await AsyncStorage.getItem("hasVisitedQuote");
      if (!hasVisitedQuote) {
        router.replace("/(stack)/quote");
      }
    };

    checkVisitedQuote();
  }, []);

  useEffect(() => {
    if (!scrollViewRef.current) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % IMAGES.length;

      scrollViewRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}  contentContainerStyle={{ paddingBottom: 120 }}>
      <View style={styles.content}>
        <Text style={styles.greetingTitle}>Olá!</Text>
        <Text style={styles.greetingSubtitle}>Como está seu dia?</Text>

        <View style={styles.chatArea}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="O que tá rolando?..."
              placeholderTextColor="#f0f0f0"
            />
            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendIcon}>ᐳ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.userBubble}>
            <Text style={styles.userBubbleText}>
              Hoje eu estava muito cansada! 😩
            </Text>
          </View>
        </View>

        <View style={styles.featuredImageArea}>
          <FlatList
            ref={scrollViewRef}
            data={IMAGES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            getItemLayout={(_, index) => ({
              length: width - 40,
              offset: (width - 40) * index,
              index,
            })}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / (width - 40)
              );
              setActiveIndex(index);
            }}
            renderItem={({ item }) => (
              <Image
                source={item}
                style={{
                  width: width - 40,
                  height: 180,
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
            )}
          />

          <View style={styles.dotsContainer}>
            {IMAGES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === activeIndex && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <Text style={styles.categoriesTitle}>Categorias</Text>

        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((item, index) => (
            <CategoryItem key={index} {...item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  greetingTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  greetingSubtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },

  chatArea: {
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "#F28C8C",
    borderRadius: 24,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
    color: "#fff",
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: "#F28C8C",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    transform: [{ rotate: "-45deg" }],
  },

  userBubble: {
    backgroundColor: "#FCE4EC",
    borderRadius: 20,
    borderTopLeftRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: "80%",
  },
  userBubbleText: {
    fontSize: 14,
    color: "#333",
  },

  featuredImageArea: {
    height: 180,
    borderRadius: 10,
    marginBottom: 30,
    overflow: "hidden",
  },

  dotsContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#aaa",
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: "#333",
  },

  categoriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  squareCardContainer: {
    width: "48%",
    height: 120,
    backgroundColor: "#E8F5E9",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 3,
  },
  squareCardIcon: {
    fontSize: 40,
    marginBottom: 5,
  },
  squareCardText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
