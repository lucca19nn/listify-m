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
        name: "Perfume Floral",
        price: "89,90",
        image: "https://i.pinimg.com/736x/05/5f/21/055f2156c2d315ca5165a9df48f8f7a7.jpg",
    },
    {
        id: "2",
        name: "Perfume Cítrico",
        price: "120,00",
        image: "https://i.pinimg.com/736x/9e/54/3e/9e543e4b0a2c8ea3c75a585f99796292.jpg",
    },
    {
        id: "3",
        name: "Perfume Amadeirado",
        price: "150,00",
        image: "https://i.pinimg.com/736x/63/17/39/6317398aabe0019df97ec6863650b6be.jpg",
    },
    {
        id: "4",
        name: "Perfume Oriental",
        price: "95,00",
        image: "https://i.pinimg.com/736x/c4/94/68/c49468e86ac60eb58e16408fb4186b87.jpg",
    },
    {
        id: "5",
        name: "Perfume Fresco",
        price: "78,90",
        image: "https://i.pinimg.com/736x/6a/5d/d9/6a5dd92f2085ad3bd8c3e6a63db86b88.jpg",
    },
    {
        id: "6",
        name: "Perfume Doce",
        price: "110,00",
        image: "https://i.pinimg.com/736x/52/64/f3/5264f3dfce930768501b67c7a5a7e95f.jpg",
    },
];

export default function ListPerfumes() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleAdd = async (item) => {
        try {
            await addItemToChecklist({
                ...item,
                category: "Perfumes",
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
                <Text style={styles.title}>Perfumes</Text>
                <View style={styles.backButton} />
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Pesquisar perfume..."
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
