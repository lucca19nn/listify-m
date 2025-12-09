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
        name: "Perfume Floral",
        price: "89,90",
        image: "https://static.netshoes.com.br/produtos/perfume-carolina-herrera-good-girl-feminino-eau-de-parfum-80ml/06/NQQ-4363-006/NQQ-4363-006_zoom1.jpg",
    },
    {
        id: "2",
        name: "Perfume Cítrico",
        price: "120,00",
        image: "https://www.granado.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/8/082.jpg",
    },
    {
        id: "3",
        name: "Perfume Amadeirado",
        price: "150,00",
        image: "https://images.tcdn.com.br/img/img_prod/672252/perfume_212_vip_black_carolina_herrera_masculino_eau_de_parfum_100ml_3031_1_20201118132158.jpg",
    },
    {
        id: "4",
        name: "Perfume Oriental",
        price: "95,00",
        image: "https://www.sephora.com.br/dw/image/v2/BFJC_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/pt_BR/dw0b3d3f8c/images/hi-res-BR/3605521631459_1.jpg",
    },
    {
        id: "5",
        name: "Perfume Fresco",
        price: "78,90",
        image: "https://m.media-amazon.com/images/I/61xL3VKc+bL._AC_UF894,1000_QL80_.jpg",
    },
    {
        id: "6",
        name: "Perfume Doce",
        price: "110,00",
        image: "https://www.givenchy.com/dw/image/v2/BDJS_PRD/on/demandware.static/-/Sites-giv-master/default/dw9a0f8f3e/images/veryirresistible/3274872368286_1.jpg",
    },
];

export default function ListPerfumes() {
    const [search, setSearch] = useState("");
    const router = useRouter();

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
