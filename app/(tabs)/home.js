import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CATEGORIES = [
  { name: "Alimentos", icon: "🍎", color: "#E8F5E9" }, 
  { name: "Eletrodomésticos", icon: "🧊", color: "#E8F5E9" }, 
];

const CategoryItem = ({ name, icon, color }) => (
  <TouchableOpacity style={styles.squareCardContainer}>
    <Text style={styles.squareCardIcon}>{icon}</Text>
    <Text style={styles.squareCardText}>{name}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();

  // Redireciona para a tela de citação se o usuário não a visitou antes - NÃO APAGAR FUNCIONALIDADE
  useEffect(() => {
    const checkVisitedQuote = async () => {
      const hasVisitedQuote = await AsyncStorage.getItem("hasVisitedQuote");
      if (!hasVisitedQuote) {
        router.replace("/(stack)/quote"); 
      }
    };

    checkVisitedQuote();
  }, []);

  return (
    <ScrollView style={styles.container}>
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
            <Text style={styles.userBubbleText}>Hoje eu estava muito cansada! 😩</Text>
          </View>
        </View>

        <View style={styles.featuredImageArea}>
          <Text style={styles.imagePlaceholder}>🖼️</Text>
        </View>

        <Text style={styles.categoriesTitle}>Categorias</Text>
        
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((item, index) => (
            <CategoryItem 
              key={index} 
              name={item.name} 
              icon={item.icon} 
              color={item.color} 
            />
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
    flex: 1,
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
    transform: [{ rotate: '-45deg' }],
  },
  userBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#FCE4EC", 
    borderRadius: 20,
    borderTopLeftRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 5,
    maxWidth: "80%",
  },
  userBubbleText: {
    fontSize: 14,
    color: "#333",
  },

  featuredImageArea: {
    width: "100%",
    height: 180,
    backgroundColor: "#f0f0f0", 
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  imagePlaceholder: {
    fontSize: 50,
    color: "#999",
  },

  categoriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", 
  },
  squareCardContainer: {
    width: "48%", 
    height: 120, 
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#E8F5E9", 
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  squareCardIcon: {
    fontSize: 40,
    marginBottom: 5,
  },
  squareCardText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});