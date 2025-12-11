import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
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

  const menuItems = [
    { 
      icon: "person-outline", 
      title: "Editar Perfil", 
      subtitle: "Altere suas informações" 
    },
    { 
      icon: "notifications-outline", 
      title: "Notificações", 
      subtitle: "Gerencie suas notificações" 
    },
    { 
      icon: "lock-closed-outline", 
      title: "Privacidade", 
      subtitle: "Configurações de segurança" 
    },
    { 
      icon: "help-circle-outline", 
      title: "Ajuda", subtitle: "Central de suporte" 
    },
  ];

  return (
    <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <MaterialCommunityIcons name="account-circle" size={80} color="#FF7A8A" />
        </View>
        <Text style={styles.name}>{user?.name || "Usuário"}</Text>
        <Text style={styles.email}>{user?.email || "email@exemplo.com"}</Text>
        
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Listas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Produtos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>89</Text>
            <Text style={styles.statLabel}>Comprados</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuIconContainer}>
              <Ionicons name={item.icon} size={24} color="#FF7A8A" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Account Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Ionicons name="calendar-outline" size={20} color="#666" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Membro desde</Text>
            <Text style={styles.infoValue}>
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("pt-BR") : "Dezembro 2025"}
            </Text>
          </View>
        </View>
        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#4CAF50" />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Status da Conta</Text>
            <Text style={[styles.infoValue, { color: "#4CAF50" }]}>Verificada</Text>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>

      {/* Version */}
      <Text style={styles.versionText}>Listify v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  profileCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFE8EC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#FF7A8A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 5,
  },
  email: {
    fontSize: 15,
    color: "#777",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF7A8A",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 13,
    color: "#999",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E0E0E0",
  },
  menuSection: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  menuIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#FFE8EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 3,
  },
  menuSubtitle: {
    fontSize: 13,
    color: "#999",
  },
  infoSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: "#999",
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#FF7A8A",
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF7A8A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  versionText: {
    fontSize: 13,
    color: "#999",
    textAlign: "center",
    marginVertical: 30,
  },
});