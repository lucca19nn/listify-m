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
import { useAuth } from "../../contexts/AuthContext";

const { width } = Dimensions.get("window");

// imagens do carrossel
const IMAGES = [
  { 
    uri: "https://deportesaludable.com/wp-content/uploads/2018/12/alimentos-saludables.jpg" 
  },
  { 
    uri: "https://i.pinimg.com/736x/6b/41/8b/6b418b91a26123da0ee3fcad1ad4b438.jpg" 
  },
  { 
    uri: "https://media.gazetadopovo.com.br/2021/08/24165607/meio01_shutterstock_1042252666-1-660x372.jpg" 
  },
  { 
    uri: "https://medlimp.com.br/wp-content/uploads/2021/07/produtos-de-limpeza-profissional.jpg" 
  },
];

// CATEGORIES
const CATEGORIES = [
  { 
    name: "Frutas", 
    icon: "🍎", 
    color: "#C8E6C9", 
    route: "/listAlimentos" 
  },
  { 
    name: "Utensílios", 
    icon: "🍴", 
    color: "#C8E6C9", 
    route: "/listUtensilios" 
  },
  { 
    name: "Mercado", 
    icon: "🛒", 
    color: "#C8E6C9", 
    route: "/listMercado" 
  },
  { 
    name: "Limpeza", 
    icon: "🧼", 
    color: "#C8E6C9", 
    route: "/listProdutos" 
  },
  { 
    name: "Eletro", 
    icon: "🔌", 
    color: "#C8E6C9", 
    route: "/listEletro" 
  },
  { 
    name: "Perfumes", 
    icon: "🌺", 
    color: "#C8E6C9", 
    route: "/listPerfumes" 
  },
  { 
    name: "Maquiagem", 
    icon: "💄", 
    color: "#C8E6C9", 
    route: "/listMaquiagem" 
  },
];

const MARKET_GROUP = [
  { 
    name: "Mercado", 
    icon: "🛒", 
    color: "#C8E6C9", 
    route: "/listMercado" },
  { 
    name: "Frutas", 
    icon: "🍎", 
    color: "#C8E6C9", 
    route: "/listAlimentos" 
  },
];

const ITEMS_GROUP = [
  { 
    name: "Utensílios", 
    icon: "🍴", 
    color: "#C8E6C9", 
    route: "/listUtensilios" 
  },
  { 
    name: "Eletrodomésticos", 
    icon: "🔌", 
    color: "#C8E6C9", 
    route: "/listEletro" 
  },
];

const PERFUMERY_GROUP = [
  { 
    name: "Perfumes", 
    icon: "🌺", 
    color: "#C8E6C9", 
    route: "/listPerfumes" 
  },
  { 
    name: "Maquiagem", 
    icon: "💄", 
    color: "#C8E6C9", 
    route: "/listMaquiagem" 
  },
  { 
    name: "Limpeza", 
    icon: "🧼", 
    color: "#C8E6C9", 
    route: "/listProdutos" 
  },
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
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [reflections, setReflections] = useState([]);
  const scrollViewRef = useRef(null);

  // derive an ID and display name for the currently logged-in user
  const currentUserId =
    user?.id || user?.uid || (typeof user === "string" ? user : user?.email) || null;
  const currentUserName =
    user?.name ||
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : null) ||
    (typeof user === "string" ? user : "Anônimo");

  // storage keys
  const globalKey = "userReflections"; // old global list (kept for migration)
  const perUserKey = (id) => `userReflections:${id || "guest"}`;

  useEffect(() => {
    const init = async () => {
      // redirect to quote if necessary
      try {
        const hasVisitedQuote = await AsyncStorage.getItem("hasVisitedQuote");
        if (!hasVisitedQuote) {
          router.replace("/(stack)/quote");
        }
      } catch (e) {
        // ignore
      }

      // load reflections for this user (with migration from old global storage if present)
      await loadReflectionsForCurrentUser();
    };

    init();
    // reload whenever the user changes
  }, [currentUserId, currentUserName]);

  const loadReflectionsForCurrentUser = async () => {
    try {
      // 1) Try to load per-user reflections directly
      const perKey = perUserKey(currentUserId);
      const storedPer = await AsyncStorage.getItem(perKey);
      let perList = storedPer ? JSON.parse(storedPer) : [];

      // 2) Check if an old global key exists. If so, migrate only the entries that belong to this user.
      const storedGlobal = await AsyncStorage.getItem(globalKey);
      if (storedGlobal) {
        let globalList = JSON.parse(storedGlobal) || [];

        // Find entries that belong to current user.
        const matching = [];
        const remaining = [];

        for (const entry of globalList) {
          const entryAuthorId = entry.authorId || null;
          const entryAuthorName = entry.authorName || entry.author || null;

          const matchesById =
            currentUserId && entryAuthorId && currentUserId === entryAuthorId;
          const matchesByName =
            !entryAuthorId &&
            currentUserName &&
            entryAuthorName &&
            entryAuthorName === currentUserName;

          if (matchesById || matchesByName) {
            matching.push(entry);
          } else {
            remaining.push(entry);
          }
        }

        // If any matching entries, merge them into per-user list and persist.
        if (matching.length > 0) {
          // avoid duplicates: prepend matching entries that aren't already present by timestamp+text
          const combined = [...matching, ...perList];
          // simple dedupe by JSON string of item (you can adapt to use id if you add one)
          const seen = new Set();
          const deduped = [];
          for (const it of combined) {
            const key = JSON.stringify({ text: it.text, date: it.date, authorId: it.authorId || null });
            if (!seen.has(key)) {
              seen.add(key);
              deduped.push(it);
            }
          }
          perList = deduped;
          await AsyncStorage.setItem(perKey, JSON.stringify(perList));
        }

        // Persist remaining global entries back (so other users still have their global entries),
        // but if no remaining entries we remove the global key entirely to avoid cross-user leakage.
        if (remaining.length > 0) {
          await AsyncStorage.setItem(globalKey, JSON.stringify(remaining));
        } else {
          await AsyncStorage.removeItem(globalKey);
        }
      }

      setReflections(Array.isArray(perList) ? perList : []);
    } catch (err) {
      // on any error, show an empty list to be safe
      setReflections([]);
    }
  };

  const saveReflection = async () => {
    if (!searchText.trim()) return;

    const newReflection = {
      text: searchText.trim(),
      date: new Date().toISOString(),
      authorId: currentUserId || null,
      authorName: currentUserName || "Anônimo",
    };

    try {
      const perKey = perUserKey(currentUserId);
      const stored = await AsyncStorage.getItem(perKey);
      const list = stored ? JSON.parse(stored) : [];
      const newList = [newReflection, ...list];
      await AsyncStorage.setItem(perKey, JSON.stringify(newList));
      setReflections(newList);
      setSearchText("");
    } catch (err) {
    }
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
            {reflections.map((item, idx) => {
              const authorDisplay =
                currentUserId && item.authorId && currentUserId === item.authorId
                  ? "Você"
                  : item.authorName || item.author || "Anônimo";

              return (
                <View style={styles.reflectionItem} key={idx}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <Text style={{ color: "#333", fontWeight: "600" }}>{authorDisplay}</Text>
                    {item.date && (
                      <Text style={{ fontSize: 10, color: "#999" }}>
                        {new Date(item.date).toLocaleString()}
                      </Text>
                    )}
                  </View>
                  <Text style={{ color: "#333" }}>{item.text}</Text>
                </View>
              );
            })}
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
                <Image source={item} style={styles.carouselImage} resizeMode="cover" />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CATEGORIES */}
        <HorizontalSection title="Categorias" data={CATEGORIES} />

        {/* FlatLists horizontais */}
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

  // Horizontal sections
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

  // Card horizontal
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

  // Grid styles mantidos
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