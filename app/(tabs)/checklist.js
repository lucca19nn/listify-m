import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";

export default function ChecklistScreen() {
    const [search, setSearch] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("checklistItems").then((stored) => {
            if (stored) {
                setItems(JSON.parse(stored));
            }
        });
    }, []);

    async function removeItem(id) {
        const filtered = items.filter((i) => i.id !== id);
        setItems(filtered);
        await AsyncStorage.setItem("checklistItems", JSON.stringify(filtered));
    }

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CheckList</Text>
            <TextInput
                style={styles.input}
                placeholder="Pesquisar produto..."
                value={search}
                onChangeText={setSearch}
            />
            <ScrollView style={styles.list}>
                {filteredItems.length === 0 ? (
                    <Text style={styles.empty}>Nenhum item adicionado.</Text>
                ) : (
                    filteredItems.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.category}>{item.category}</Text>
                                <Text style={styles.price}>R${item.price}</Text>
                            </View>
                            <TouchableOpacity onPress={() => removeItem(item.id)}>
                                <Text style={styles.delete}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const screenWidth = Dimensions.get("window").width;
const horizontalPadding = 20;
const inputHeight = 44;

const styles = StyleSheet.create({
    container: 
    { 
    paddingHorizontal: 20,
    paddingTop: 50,
    flex: 1, 
    padding: 16, 
},
    title: 
    { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 12 
},
    input: {
        backgroundColor: "#F06A6E",
        color: "white",
        width: "3rem",
        borderRadius: 20,
        marginBottom: 16,
        fontSize: 16,
    },
    list: { flex: 1 },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#CDFDF5",
        borderRadius: 20,
        marginBottom: 12,
        padding: 10,
    },
    image: { width: 50, height: 50, borderRadius: 10, marginRight: 12 },
    name: { fontWeight: "bold", fontSize: 16 },
    category: { fontSize: 13, color: "#888" },
    price: { fontWeight: "bold", marginTop: 4 },
    delete: { fontSize: 27, marginLeft: 8 },
    empty: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#888" },
});
