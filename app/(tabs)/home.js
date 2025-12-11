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

// imagens do carrossel (mantive as suas)
const IMAGES = [
  { uri: "https://deportesaludable.com/wp-content/uploads/2018/12/alimentos-saludables.jpg" },
  { uri: "https://i.pinimg.com/736x/6b/41/8b/6b418b91a26123da0ee3fcad1ad4b438.jpg" },
  { uri: "https://media.gazetadopovo.com.br/2021/08/24165607/meio01_shutterstock_1042252666-1-660x372.jpg" },
  { uri: "https://medlimp.com.br/wp-content/uploads/2021/07/produtos-de-limpeza-profissional.jpg" },
];

// CATEGORIES agora será exibido na horizontal.
// Todas as cores definidas para "#C8E6C9" conforme solicitado.
// Removi verduras, padaria, embalagens e cuidados.
const CATEGORIES = [
  { name: "Frutas", icon: "🍎", color: "#C8E6C9", route: "/listAlimentos" },
  { name: "Utensílios", icon: "🍴", color: "#C8E6C9", route: "/listUtensilios" },
  { name: "Mercado", icon: "🛒", color: "#C8E6C9", route: "/listMercado" },
  { name: "Limpeza", icon: "🧼", color: "#C8E6C9", route: "/listProdutos" },
  { name: "Eletro", icon: "🔌", color: "#C8E6C9", route: "/listEletro" },
  { name: "Perfumes", icon: "🌺", color: "#C8E6C9", route: "/listPerfumes" },
  { name: "Maquiagem", icon: "💄", color: "#C8E6C9", route: "/listMaquiagem" },
];

// FlatLists horizontais específicas (ajustadas conforme pedido):
// - Removi "Verduras" e "Padaria" do MARKET_GROUP
// - Removi "Embalagens" e "Cuidados"
// - Coloquei "Limpeza" também em Perfumaria & Cosméticos
const MARKET_GROUP = [
  { name: "Mercado", icon: "🛒", color: "#C8E6C9", route: "/listMercado" },
  { name: "Frutas", icon: "🍎", color: "#C8E6C9", route: "/listAlimentos" },
];

const ITEMS_GROUP = [
  { name: "Utensílios", icon: "🍴", color: "#C8E6C9", route: "/listUtensilios" },
  { name: "Eletrodomésticos", icon: "🔌", color: "#C8E6C9", route: "/listEletro" },
];

const PERFUMERY_GROUP = [
  { name: "Perfumes", icon: "🌺", color: "#C8E6C9", route: "/listPerfumes" },
  { name: "Maquiagem", icon: "💄", color: "#C8E6C9", route: "/listMaquiagem" },
  // Limpeza adicionada aqui conforme pedido
  { name: "Limpeza", icon: "🧼", color: "#C8E6C9", route: "/listProdutos" },
];

const CategoryItem = ({ name, icon, route, color, compact = false }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[
        compact ? styles.horizontalCard : styles.categoryCard,
        { backgroundColor: color },
      ]}
      onPress={() => router.push(route)}
      activeOpacity={0.8}
    >
      <Text style={compact ? styles.horizontalIcon : styles.categoryIcon}>
        {icon}
      </Text>
      <Text style={compact ? styles.horizontalName : styles.categoryName}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const HorizontalSection = ({ title, data }) => {
  if (!data || data.length === 0) return null;
  return (
    <View style={styles.horizontalSection}>
      <Text style={styles.horizontalTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(i) => i.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => <CategoryItem {...item} compact={true} />}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      />
    </View>
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
      contentContainerStyle={{ paddingBottom: 120 }}
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

      {/* Conteúdo abaixo do header */}
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

        {/* CATEGORIES agora em horizontal (uma FlatList horizontal maior) */}
        <HorizontalSection title="Categorias" data={CATEGORIES} />

        {/* FlatLists horizontais pedidas */}
        <HorizontalSection title="Mercado" data={MARKET_GROUP} />
        <HorizontalSection title="Itens" data={ITEMS_GROUP} />
        <HorizontalSection title="Perfumaria & Cosméticos" data={PERFUMERY_GROUP} />
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
    paddingBottom: 18,
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
    marginBottom: 14,
    fontWeight: "400",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: "#FF7A8A",
    borderRadius: 14,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 15,
    marginRight: 10,
    shadowColor: "#FF7A8A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: "#FF7A8A",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF7A8A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  // Reflexões
  reflectionBox: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1A1A1A",
  },
  reflectionItem: {
    backgroundColor: "#F8F9FA",
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },

  // Conteúdo
  content: {
    paddingHorizontal: 20,
  },

  // Carousel
  carouselSection: {
    marginVertical: 18,
    height: 160,
  },
  carouselContent: {},
  carouselItem: {
    width: width - 40,
    height: 160,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#E8E8E8",
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },

  // Horizontal sections (ocupam mais linhas com cards maiores)
  horizontalSection: {
    marginBottom: 22,
  },
  horizontalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  horizontalList: {
    paddingLeft: 2,
    paddingVertical: 2,
  },

  // Cartões horizontais maiores para "ocupar mais linhas"
  horizontalCard: {
    width: 140,
    height: 140,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginRight: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  horizontalIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  horizontalName: {
    fontSize: 14,
    color: "#2C2C2C",
    textAlign: "center",
    fontWeight: "700",
  },

  // Mantive os estilos do grid caso queira reusar depois
  categoryCard: {
    width: (width - 55) / 3,
    height: 110,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    padding: 10,
  },
  categoryIcon: {
    fontSize: 34,
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 12,
    color: "#2C2C2C",
    textAlign: "center",
    fontWeight: "600",
  },
});