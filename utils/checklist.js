import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "checklistItems";

export async function addItemToChecklist(item) {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const items = stored ? JSON.parse(stored) : [];

    const normalizedItem = {
        id: `${item.category}-${item.id}`,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
    };

    const alreadyExists = items.some(existing => existing.id === normalizedItem.id);
    const updated = alreadyExists ? items : [...items, normalizedItem];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return normalizedItem;
}
