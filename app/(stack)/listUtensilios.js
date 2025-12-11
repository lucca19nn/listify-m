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
        name: "Faca de Cozinha",
        price: "35,00",
        image: "https://m.media-amazon.com/images/I/7112Ze-L08L._AC_UF894,1000_QL80_.jpg",
    },
    {
        id: "2",
        name: "Panela Grande",
        price: "150,00",
        image: "https://i.pinimg.com/736x/91/40/4d/91404db705be298e67cb518c7c98746f.jpg",
    },
    {
        id: "3",
        name: "Colher de Pau",
        price: "18,00",
        image: "https://i.pinimg.com/736x/21/f2/43/21f2437897cdb306a495d2d75d208a6e.jpg",
    },
    {
        id: "4",
        name: "Tábua de Corte",
        price: "45,00",
        image: "https://i.pinimg.com/736x/8a/09/37/8a09371db6f3b8407fe391a2afced599.jpg",
    },
    {
        id: "5",
        name: "Espátula",
        price: "22,00",
        image: "https://i.pinimg.com/736x/f6/db/cb/f6dbcb7ae24793659976b3c06381cf0c.jpg",
    },
    {
        id: "6",
        name: "Jogo de Tigelas",
        price: "59,00",
        image: "https://i.pinimg.com/736x/f2/fb/d5/f2fbd55b13a3019a53475e41996ed4d0.jpg",
    },
];

export default function ListUtensilios() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleAdd = async (item) => {
        try {
            await addItemToChecklist({
                ...item,
                category: "Utensílios de Cozinha",
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
                <Text style={styles.title}>Utensílios de Cozinha</Text>
                <View style={styles.backButton} />
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Pesquisar utensílio..."
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
        fontSize: 20, 
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
    info: { flex: 1 },
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
