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
        name: "Morango",
        price: "12,00",
        image: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
    },
    {
        id: "2",
        name: "Limão",
        price: "8,00",
        image: "https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvNTQwMi81NDAyMTkxLnBuZw==&ts=1765401276&sig=43b1f1f2dfa04237d0dc58055b1fc5cc264ed4de770ff0dcad14af946875a02e",
    },
    {
        id: "3",
        name: "Manga",
        price: "15,00",
        image: "https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvMzEzNy8zMTM3MTUyLnBuZw==&ts=1765401608&sig=d7470f5aa54cd888dc728dde5d9434165ea6dbd2c3ff1ce944fe0ce0100123f2",
    },
    {
        id: "4",
        name: "Maçã",
        price: "10,00",
        image: "https://cdn-icons-png.flaticon.com/512/415/415682.png",
    },
    {
        id: "5",
        name: "Abacaxi",
        price: "6,00",
        image: "https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvMzE1MS8zMTUxMTIxLnBuZw==&ts=1765401716&sig=76cc29676fbac46fe6f46e47586d0da9baae66ee978c7141056242c21efdf64e",
    },
    {
        id: "6",
        name: "Banana",
        price: "5,00",
        image: "https://cdn-icons-png.flaticon.com/512/2909/2909761.png",
    },
];

export default function ListAlimentos() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleAdd = async (item) => {
        try {
            await addItemToChecklist({
                ...item,
                category: "Frutas",
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
                <Text style={styles.title}>Frutas</Text>
                <View style={styles.backButton} />
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Pesquisar fruta..."
                    placeholderTextColor="#fff"
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
                />
                <Ionicons name="search" size={18} color="#fff" />
            </View>

            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />

                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price}</Text>
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
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 60,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
    },

    searchBox: {
        backgroundColor: "#F28C8C",
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 45,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    input: {
        flex: 1,
        color: "#fff",
        fontSize: 14,
    },

    searchIcon: {
        fontSize: 18,
    },

    card: {
        backgroundColor: "#DFF5EA",
        borderRadius: 15,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },

    image: {
        width: 45,
        height: 45,
        marginRight: 15,
    },

    info: {
        flex: 1,
    },

    name: {
        fontSize: 16,
        fontWeight: "600",
    },

    price: {
        fontSize: 14,
        color: "#6DBE96",
        marginTop: 4,
    },

    addButton: {
        width: 28,
        height: 28,
        backgroundColor: "#9ADBB7",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },

    addText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
