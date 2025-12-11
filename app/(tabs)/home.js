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
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const IMAGES = [
  { uri: "https://deportesaludable.com/wp-content/uploads/2018/12/alimentos-saludables.jpg" },
  { uri: "https://blog.novolar.com.br/wp-content/uploads/2022/04/Principais-eletrodomesticos.jpg" },
  { uri: "https://media.gazetadopovo.com.br/2021/08/24165607/meio01_shutterstock_1042252666-1-660x372.jpg" },
  { uri: "https://medlimp.com.br/wp-content/uploads/2021/07/produtos-de-limpeza-profissional.jpg" },
];

const CATEGORIES = [
  {
    name: "Frutas",
    icon: "🍎",
    color: "#C8E6C9",
    route: "/listAlimentos",
  },
  {
    name: "Utensílios de cozinha",
    icon: "🍴",
    color: "#C8E6C9",
    route: "/listUtensilios",
  },
  {
    name: "Mercado",
    icon: "🛒",
    color: "#C8E6C9",
    route: "/listMercado",
  },
  {
    name: "Produtos de limpeza",
    icon: "🧼",
    color: "#C8E6C9",
    route: "/listProdutos",
  },
  {
    name: "Produtos eletrodomésticos",
    icon: "🔌",
    color: "#C8E6C9",
    route: "/listEletro",
  },
  {
    name: "Perfumes",
    icon: "🌺",
    color: "#C8E6C9",
    route: "/listPerfumes",
  },
  {
    name: "Maquiagem",
    icon: "💄",
    color: "#C8E6C9",
    route: "/listMaquiagem",
  },
];

const CategoryItem = ({ name, icon, route, color }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: color }]}
      onPress={() => router.push(route)}
      activeOpacity={0.8}
    >
      <Text style={styles.categoryIcon}>{icon}</Text>
      <Text style={styles.categoryName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default function Home() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [reflections, setReflections] = useState([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const checkVisitedQuote = async () => {
      const hasVisitedQuote = await AsyncStorage.getItem("hasVisitedQuote");
      if (!hasVisitedQuote) {
        router.replace("/(stack)/quote");
      }
    };
    checkVisitedQuote();
    loadReflections();
  }, []);

  const loadReflections = async () => {
    try {
      const value = await AsyncStorage.getItem("userReflections");
      if (value) {
        setReflections(JSON.parse(value));
      }
    } catch (err) {}
  };

  const saveReflection = async () => {
    if (!searchText.trim()) return;
    const newReflection = { text: searchText, date: new Date().toISOString() };
    const newList = [newReflection, ...reflections];
    try {
      await AsyncStorage.setItem("userReflections", JSON.stringify(newList));
      setReflections(newList);
      setSearchText("");
    } catch (err) {}
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá!</Text>
        <Text style={styles.subGreeting}>Como está seu dia?</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="O que tá rolando?..."
            placeholderTextColor="#fff"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchButton} onPress={saveReflection}>
            <MaterialCommunityIcons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Mostra reflexões salvas em lista */}
        {reflections.length > 0 && (
          <View style={styles.reflectionBox}>
            <Text style={styles.title}>Suas Reflexões</Text>
            {reflections.map((item, idx) => (
              <View style={styles.reflectionItem} key={idx}>
                <Text style={{ color: "#333" }}>{item.text}</Text>
                {item.date && (
                  <Text style={{ fontSize: 10, color: "#999" }}>
                    {new Date(item.date).toLocaleString()}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Carrossel, categorias, etc… */}
      <View style={styles.content}>
        {/* Carousel */}
        <View style={styles.carouselSection}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
          >
            {IMAGES.map((item, index) => (
              <View key={index} style={styles.carouselItem}>
                <Image
                  source={item}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.categoriesTitle}>Categorias</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((item, index) => (
              <CategoryItem key={index} {...item} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 15,
    color: "#777",
    marginBottom: 20,
    fontWeight: "400",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#FF7A8A",
    borderRadius: 15,
    paddingHorizontal: 20,
    color: "#fff",
    fontSize: 15,
    marginRight: 10,
    shadowColor: "#FF7A8A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: "#FF7A8A",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF7A8A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  // Reflexão mostrada
  reflectionBox: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1A1A1A",
  },
  reflectionItem: {
    backgroundColor: "#F8F9FA",
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },

  // Conteúdo abaixo do header
  content: {
    paddingHorizontal: 20,
  },

  // Carousel
  carouselSection: {
    marginVertical: 25,
    height: 180,
  },
  carouselContent: {
    paddingRight: 0,
  },
  carouselItem: {
    width: width - 40,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },

  // Categories
  categoriesSection: {
    marginBottom: 25,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 18,
    letterSpacing: 0.3,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: (width - 55) / 3,
    height: 110,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  categoryIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 11,
    color: "#2C2C2C",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});