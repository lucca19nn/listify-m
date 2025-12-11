import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Quote() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchQuote = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://zenquotes.io/api/random");
            const data = await response.json();
            setQuote(data[0].q || "Persistence is the path to success.");
            setAuthor(data[0].a || "Unknown");
        } catch (e) {
            setQuote("Persistence is the path to success.");
            setAuthor("Charlie Chaplin");
        }
        setLoading(false);
    };

    // Marca que o usuário passou pela página quote.js - NÃO APAGAR FUNCIONALIDADE
    useEffect(() => {
        fetchQuote();
        AsyncStorage.setItem("hasVisitedQuote", "true"); 
    }, []);

    return (
        <View style={styles.bg}>
            <View style={styles.content}>
                <View style={styles.quoteBox}>
                    <Text style={styles.quoteIcon}>❝</Text>
                    <Text style={styles.quoteText}>{loading ? "Loading..." : quote}</Text>
                    <Text style={styles.author}>— {author}</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/(tabs)/home")}
                >
                    <Text style={styles.buttonText}>IR PARA HOME</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Image
                        source={require("../../assets/listify.png")}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: "#C6F3EA",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    quoteBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        width: "84%",
        alignSelf: "center",
    },
    quoteIcon: {
        fontSize: 80,
        color: "#222",
        marginBottom: 7,
        marginLeft: 2,
    },
    quoteText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 14,
        marginLeft: 2,
    },
    button: {
        width: 220,
        paddingVertical: 13,
        backgroundColor: "#F37070",
        borderRadius: 15,
        marginBottom: 48,
        alignSelf: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 3,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        letterSpacing: 1,
        textAlign: "center",
    },
    footer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },
    icon: {
        height: 130,
        width: 130,
    },
});