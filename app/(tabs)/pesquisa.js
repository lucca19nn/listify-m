import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);

    const handleSubmit = () => {
        if (!search.trim()) return;
        if (tags.includes(search.trim())) return;
        setTags([search.trim(), ...tags]);
        setSearch("");
    };

    const handleClear = () => {
        setTags([]);
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Pesquisar produto..."
                    placeholderTextColor="#fff"
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
                    returnKeyType="search"
                    onSubmitEditing={handleSubmit}
                />
                <TouchableOpacity onPress={handleSubmit}>
                    <Ionicons name="search" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <Text style={styles.lastSeen}>visto pela última vez</Text>

            <View style={styles.productsRow}>
                <View style={styles.productCard}>
                    <Image
                        source={{ uri: "https://i.imgur.com/Zg4KJXf.png" }}
                        style={styles.productImage}
                    />
                </View>

                <View style={styles.productCard}>
                    <Image
                        source={{ uri: "https://i.imgur.com/eO2S7Qp.png" }}
                        style={styles.productImage}
                    />
                </View>

                <View style={[styles.productCard, styles.active]}>
                    <Image
                        source={{ uri: "https://i.imgur.com/k8Z6UJE.png" }}
                        style={styles.productImage}
                    />
                </View>
            </View>

            {tags.length > 0 && (
                <>
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>Títulos</Text>
                        <TouchableOpacity onPress={handleClear}>
                            <Text style={styles.clear}>Limpar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.tagsContainer}>
                        {tags.map((item, index) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    searchContainer: {
        marginTop: 40,
        backgroundColor: "#F56B6B",
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    searchInput: {
        color: "#fff",
        fontSize: 14,
        flex: 1,
        marginRight: 10,
    },
    lastSeen: {
        marginTop: 20,
        fontSize: 12,
        color: "#F56B6B",
        marginBottom: 10,
    },
    productsRow: {
        flexDirection: "row",
        gap: 12,
    },
    productCard: {
        width: 70,
        height: 70,
        borderRadius: 15,
        backgroundColor: "#EAFCEB",
        justifyContent: "center",
        alignItems: "center",
    },
    active: {
        backgroundColor: "#C6F3DE",
    },
    productImage: {
        width: 45,
        height: 45,
        resizeMode: "contain",
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
        alignItems: "center",
    },
    title: {
        fontSize: 15,
        color: "#F56B6B",
        fontWeight: "600",
    },
    clear: {
        fontSize: 14,
        color: "#F56B6B",
        lineHeight: 16,
        includeFontPadding: false,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 15,
        gap: 10,
    },
    tag: {
        borderWidth: 1,
        borderColor: "#2E7D5B",
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 6,
    },
    tagText: {
        fontSize: 13,
        color: "#000",
    },
});
