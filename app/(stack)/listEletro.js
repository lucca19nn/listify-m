import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { addItemToChecklist } from "../../utils/checklist";
import axios from "axios";
import API_URL from "../../config/api";

export default function ListEletro() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        fetchEletrodomesticos();
    }, []);

    const fetchEletrodomesticos = async () => {
        try {
            setLoading(true);
            setError(null);
            const url = `${API_URL}/eletrodomesticos`;
            console.log("Tentativa", retryCount + 1, "- Buscando de:", url);

            const response = await axios.get(url, {
                timeout: 5000,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            });

            console.log("✓ Sucesso! Status:", response.status);

            if (Array.isArray(response.data)) {
                console.log("✓ Response é array com", response.data.length, "itens");
                setData(response.data);
            } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
                console.log("✓ Response.data.data é array com", response.data.data.length, "itens");
                setData(response.data.data);
            } else {
                console.error("✗ Dados não são um array. Tipo:", typeof response.data);
                setError("Formato inválido: esperado array de eletrodomésticos");
            }
        } catch (err) {
            console.error("✗ Erro na tentativa", retryCount + 1);
            console.error("- Mensagem:", err.message);

            if (err.code === "ECONNABORTED" && err.message.includes("timeout")) {
                setError("⏱️ Timeout - servidor demorando muito. Verifique se está rodando em " + API_URL);
            } else if (err.code === "ECONNREFUSED" || err.message.includes("Network Error")) {
                setError("📡 Sem conexão - servidor não está acessível em " + API_URL);
            } else if (err.response?.status === 500) {
                setError("❌ Erro 500 no servidor");
            } else if (err.response?.status === 404) {
                setError("❌ Rota não encontrada (404)");
            } else {
                setError("❌ Erro: " + (err.message || "Desconhecido"));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (item) => {
        try {
            await addItemToChecklist({
                id: item.id,
                name: item.nome || item.name,
                price: item.preco || item.price,
                image: item.imagem || item.image,
                category: "Eletrodomésticos",
            });
            router.push("/(tabs)/checklist");
        } catch (error) {
            console.error("Erro ao adicionar item ao checklist:", error);
        }
    };

    const filteredData = Array.isArray(data)
        ? data.filter((item) =>
            item && (item.nome || item.name || "").toLowerCase().includes(search.toLowerCase())
        )
        : [];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Eletrodomésticos</Text>

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

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#F28C8C" />
                    <Text style={styles.loadingText}>Carregando produtos...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={fetchEletrodomesticos}>
                        <Text style={styles.retryText}>Tentar novamente</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.imagem || item.image }} style={styles.image} />
                            <View style={styles.info}>
                                <Text style={styles.name}>{item.nome || item.name || "Produto"}</Text>
                                <Text style={styles.price}>R$ {item.preco || item.price || "0.00"}</Text>
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
            )}
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
    loadingContainer: { alignItems: "center", marginTop: 40 },
    loadingText: { marginTop: 10, color: "#555" },
    errorContainer: { alignItems: "center", marginTop: 40, paddingHorizontal: 10 },
    errorText: { color: "#d9534f", textAlign: "center", marginBottom: 12 },
    retryButton: {
        backgroundColor: "#F28C8C",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryText: { color: "#fff", fontWeight: "bold" },
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
