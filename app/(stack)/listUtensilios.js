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

const DATA = [
    {
        id: "1",
        name: "Faca",
        price: "30,00",
        image: "https://m.media-amazon.com/images/I/7112Ze-L08L._AC_UF894,1000_QL80_.jpg",
    },
    {
        id: "2",
        name: "Panela",
        price: "120,00",
        image: "https://m.media-amazon.com/images/I/7112Ze-L08L._AC_UF894,1000_QL80_.jpg",
    },
    {
        id: "3",
        name: "Colher",
        price: "15,00",
        image: "https://m.media-amazon.com/images/I/7112Ze-L08L._AC_UF894,1000_QL80_.jpg",
    },
];

export default function ListUtensilios() {
    const [search, setSearch] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Utensílios</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Pesquisar produto..."
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
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
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
    searchContainer: {
        flexDirection: "row",
        backgroundColor: "#F28C8C",
        borderRadius: 25,
        paddingHorizontal: 15,
        alignItems: "center",
        marginBottom: 20,
    },
    searchInput: { flex: 1, height: 45, color: "#fff" },
    card: {
        flexDirection: "row",
        backgroundColor: "#CFF3E4",
        borderRadius: 15,
        padding: 12,
        alignItems: "center",
        marginBottom: 12,
    },
    image: { width: 45, height: 45, marginRight: 12 },
    info: { flex: 1 },
    name: { fontWeight: "600" },
    price: { color: "#7FBF9A" },
    addButton: {
        width: 28,
        height: 28,
        backgroundColor: "#9AD7B5",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    addText: { color: "#fff", fontWeight: "bold" },
});
