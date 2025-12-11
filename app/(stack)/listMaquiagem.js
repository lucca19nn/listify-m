import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { addItemToChecklist } from "../../utils/checklist";

const DATA = [
    {
        id: "1",
        name: "Base Líquida",
        price: "45,90",
        image: "https://i.pinimg.com/736x/00/6c/d2/006cd281c756c113053c611e01b02fc8.jpg",
    },
    {
        id: "2",
        name: "Batom Matte",
        price: "28,00",
        image: "https://i.pinimg.com/736x/24/f3/c6/24f3c6b383f93f44aabc48b688f48848.jpg",
    },
    {
        id: "3",
        name: "Paleta de Sombras",
        price: "89,90",
        image: "https://i.pinimg.com/736x/49/e5/ed/49e5ed5c8bccec04f21bbf7a8e0d8203.jpg",
    },
    {
        id: "4",
        name: "Máscara de Cílios",
        price: "35,00",
        image: "https://i.pinimg.com/736x/f4/7a/a0/f47aa0d1836a39bca8f8cb8c170325c1.jpg",
    },
    {
        id: "5",
        name: "Blush",
        price: "32,50",
        image: "https://i.pinimg.com/736x/03/79/24/037924da75d8346c319e93518eda1a76.jpg",
    },
    {
        id: "6",
        name: "Delineador",
        price: "22,90",
        image: "https://i.pinimg.com/736x/36/24/66/362466da4cc8d8425d977ed2be03c1d8.jpg",
    },
];

export default function ListMaquiagem() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleAdd = async (item) => {
        try {
            await addItemToChecklist({
                ...item,
                category: "Maquiagem",
            });
            router.push("/(tabs)/checklist");
        } catch (error) {
            console.error("Erro ao adicionar item ao checklist:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.title}>Maquiagem</Text>
                <View style={styles.backButton} />
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Pesquisar maquiagem..."
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
                    placeholderTextColor="#fff"
                />
                <Ionicons name="search" size={18} color="#fff" />
            </View>

            <FlatList
                data={DATA.filter(item =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                )}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>R$ {item.price}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => handleAdd(item)}
                        >
                            <Text style={styles.addText}>+</Text>
                        </TouchableOpacity>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: "#F8F9FA",
        paddingTop: 50,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    title: { 
        fontSize: 24, 
        fontWeight: "bold",
        color: "#1A1A1A",
    },
    searchContainer: {
        flexDirection: "row",
        backgroundColor: "#FF7A8A",
        borderRadius: 25,
        paddingHorizontal: 20,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#FF7A8A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    searchInput: { 
        flex: 1, 
        height: 50, 
        color: "#fff",
        fontSize: 15,
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 15,
        alignItems: "center",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    image: { 
        width: 60, 
        height: 60, 
        borderRadius: 12,
        marginRight: 15,
        backgroundColor: "#f0f0f0",
    },
    info: { 
        flex: 1 
    },
    name: { 
        fontWeight: "600",
        fontSize: 16,
        color: "#1A1A1A",
        marginBottom: 4,
    },
    price: { 
        color: "#FF7A8A",
        fontSize: 15,
        fontWeight: "600",
    },
    addButton: {
        width: 36,
        height: 36,
        backgroundColor: "#C8E6C9",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    addText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2C2C2C",
    },
});
