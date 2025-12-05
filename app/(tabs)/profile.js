import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: signOut,
      },
    ]);
  };

  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Perfil</Text>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>            
            <MaterialCommunityIcons
              name="account-circle"
              size={50}
            />
            </View>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={styles.card}>
          <Text style={styles.infoLabel}>ID do Usuário</Text>
          <Text style={styles.infoValue}>{user?.id}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.infoLabel}>Membro desde</Text>
          <Text style={styles.infoValue}>
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("pt-BR")
              : "N/A"}
          </Text>
        </View>
        <View style={styles.cardGreen}>
          <Text style={styles.statusEmoji}>✅</Text>
          <Text style={styles.statusText}>Conta Ativa</Text>
          <Text style={styles.statusDescription}>
            Suas credenciais estão salvas no AsyncStorage
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🔒 Sair da Conta</Text>
        </TouchableOpacity>
        <View style={styles.versionCard}>
          <Text style={styles.versionText}>
            Versão 1.0 - Listify
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#ebebeb",
  },
  container: {
    marginTop: 40,
    marginHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 40,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    alignSelf: "flex-start",
    marginBottom: 12,
    color: "#222",
  },
  avatarContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#CEEDD3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    fontSize: 42,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 14,
  },
  card: {
    width: "100%",
    backgroundColor: "#f8faf6",
    borderRadius: 14,
    padding: 17,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#dde8e3",
    alignItems: "flex-start",
  },
  infoLabel: {
    fontSize: 11,
    color: "#7bb67e",
    marginBottom: 1.5,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  cardGreen: {
    width: "100%",
    backgroundColor: "#dff5e3",
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b6e1c7",
  },
  statusEmoji: {
    fontSize: 34,
    marginBottom: 6,
  },
  statusText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#279058",
    marginBottom: 2,
  },
  statusDescription: {
    fontSize: 12,
    color: "#408c58",
    textAlign: "center",
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "#fa9595",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 14,
  },
  logoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  versionCard: {
    marginTop: 5,
    width: "100%",
    paddingVertical: 9,
    alignItems: "center",
  },
  versionText: {
    fontSize: 12,
    color: "#a4a4a4",
    textAlign: "center",
  },
});