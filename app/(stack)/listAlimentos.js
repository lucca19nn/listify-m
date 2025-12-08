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

const DATA = [
    {
        id: "1",
        name: "Morango",
        price: "R$ 12,00",
        image: "https://cdn-icons-png.flaticon.com/512/590/590685.png",
    },
    {
        id: "2",
        name: "Limão",
        price: "R$ 12,00",
        image: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
    },
    {
        id: "3",
        name: "Manga",
        price: "R$ 12,00",
        image: "https://cdn-icons-png.flaticon.com/512/2909/2909761.png",
    },
    {
        id: "4",
        name: "Maçã",
        price: "R$ 12,00",
        image: "https://cdn-icons-png.flaticon.com/512/415/415682.png",
    },
    {
        id: "5",
        name: "Abacaxi",
        price: "R$ 12,00",
        image: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
    },
    {
        id: "6",
        name: "Banana",
        price: "R$ 12,00",
        image: "https://cdn-icons-png.flaticon.com/512/2909/2909770.png",
    },
];

export default function Checklist() {
    const [search, setSearch] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CheckList</Text>

            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Pesquisar produto..."
                    placeholderTextColor="#fff"
                    style={styles.input}
                    value={search}
                    onChangeText={setSearch}
                />
                <Text style={styles.searchIcon}>🔍</Text>
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

                        <TouchableOpacity style={styles.addButton}>
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
