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

const DATA = [
    {
        id: "1",
        name: "Arroz 5kg",
        price: "22,90",
        image: "https://www.estadao.com.br/resizer/v2/JDTYGBFAOVHYLDWGPVWTK5XTVU.jpg?quality=80&auth=a1e80f5fd2e4df3efa7bafe32e15929b88b34c90feb4e9502f9bd78c02c5fea6&width=720&height=503&smart=true",
    },
    {
        id: "2",
        name: "Feijão 1kg",
        price: "8,50",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH0cD8qWEXdJZPJ5zUW0YqaQI9xVs7xCGhjA&s",
    },
    {
        id: "3",
        name: "Óleo de Soja",
        price: "7,90",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQvuTTRZQKLbYx_YxQWBmRuNKCYAw_n8F2tg&s",
    },
    {
        id: "4",
        name: "Açúcar 1kg",
        price: "4,50",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtVVKSzC17lOqCCYf8rZmGfQSQZHH7LNPz1Q&s",
    },
    {
        id: "5",
        name: "Café 500g",
        price: "15,90",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOo_CsQz6fN3U6Zf8wJ_9Nh1NbZRcMON5wMw&s",
    },
    {
        id: "6",
        name: "Macarrão 500g",
        price: "3,90",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXvh2xWo3hBq8PJhJrH2xYMKHvMvqJ8K9rBg&s",
    },
];

export default function ListMercado() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.title}>Mercado</Text>
                <View style={styles.backButton} />
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Pesquisar produto..."
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
                        <TouchableOpacity style={styles.addButton}>
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
