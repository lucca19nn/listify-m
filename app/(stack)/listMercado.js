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

export default function ListMercado() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        fetchAlimentos();
    }, []);

    const fetchAlimentos = async () => {
        try {
            setLoading(true);
            setError(null);
            const url = `${API_URL}/alimentos`;
            console.log("Tentativa", retryCount + 1, "- Buscando de:", url);
            
            const response = await axios.get(url, {
                timeout: 5000, 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            
            console.log("✓ Sucesso! Status:", response.status);
            console.log("Dados recebidos:", response.data);
            
            if (Array.isArray(response.data)) {
                console.log("✓ Response é array com", response.data.length, "itens");
                console.log("Primeiro item:", response.data[0]);
                setData(response.data);
            } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
                console.log("✓ Response.data.data é array com", response.data.data.length, "itens");
                console.log("Primeiro item:", response.data.data[0]);
                setData(response.data.data);
            } else {
                console.error("✗ Dados não são um array. Tipo:", typeof response.data);
                console.error("✗ Dados completos:", JSON.stringify(response.data));
                setError("Formato inválido: esperado array de alimentos");
            }
        } catch (err) {
            console.error("✗ Erro na tentativa", retryCount + 1);
            console.error("- Mensagem:", err.message);
            console.error("- Code:", err.code);
            
            if (err.code === 'ECONNABORTED' && err.message.includes('timeout')) {
                setError("⏱️ Timeout - servidor demorando muito. Verifique se está rodando em " + API_URL);
            } else if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
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
                ...item,
                category: "Mercado",
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

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF7A8A" />
                    <Text style={styles.loadingText}>Carregando produtos...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={fetchAlimentos}>
                        <Text style={styles.retryText}>Tentar novamente</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={Array.isArray(data) ? data.filter(item =>
                        item && (item.nome || item.name) && (item.nome || item.name).toLowerCase().includes(search.toLowerCase())
                    ) : []}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.imagem || item.image }} style={styles.image} />
                            <View style={styles.info}>
                                <Text style={styles.name}>{item.nome || item.name || "Produto sem nome"}</Text>
                                <Text style={styles.price}>R$ {item.preco || item.price || "0.00"}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => handleAdd({
                                    id: item.id,
                                    name: item.nome || item.name,
                                    price: item.preco || item.price,
                                    image: item.imagem || item.image,
                                })}
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 30,
    },
    errorText: {
        fontSize: 16,
        color: "#FF6B6B",
        textAlign: "center",
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: "#FF7A8A",
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    retryText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
