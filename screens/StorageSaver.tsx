import * as AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as SQLite from 'expo-sqlite';
import { Text,TouchableOpacity,View } from "react-native";
import * as MMKV from 'react-native-mmkv';
import { SafeAreaView } from "react-native-safe-area-context";

const StorageSaver = () => {
    function storeViaMMKV()
    {
        const storage = MMKV.createMMKV();
        const startTime = performance.now();
        storage.set('demo_key','High Speed Data');
        const value = storage.getString('demo_key');
        const endTime = performance.now();
        alert(`MMKV (Sync): ${value} saved in ${(endTime - startTime).toFixed(4)}ms`);
    }

    async function storeViaAsyncStorage() 
    {
        const startTime = performance.now();
        await AsyncStorage.default.setItem('demo_key','Standard Data');
        const value = await AsyncStorage.default.getItem('demo_key');
        const endTime = performance.now();
        alert(`AsyncStorage: ${value} saved in ${(endTime - startTime).toFixed(4)}ms`);
    }

    async function storeViaSecureStore()
    {
        try
        {
            const startTime = performance.now();
            await SecureStore.setItemAsync('auth_token','SuperSecret123');
            const value = await SecureStore.getItemAsync('auth_token');

            const endTime = performance.now();
            alert(`SecureStore (Encrypted): ${value} saved in ${(endTime - startTime).toFixed(4)}ms`);
        }
        catch
        {
            alert("SecureStore Error: Key too large or hardware failure.");
        }
    }

    async function storeViaSQLite()
    {
        const sqliteDatabase = await SQLite.openDatabaseAsync('demo.db');
        const startTime = performance.now();
        await sqliteDatabase.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT);
        `);

        await sqliteDatabase.runAsync('INSERT INTO test (value) VALUES (?)','Structured SQL Data');
        const allRows = await sqliteDatabase.getAllAsync('SELECT * FROM test');
        const endTime = performance.now();
        alert(`SQLite (Relational): Found ${allRows.length} rows. Last I/O: ${(endTime - startTime).toFixed(4)}ms`);
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

            </View>
            <View
                style={{
                    flex: 8,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    style={{
                        borderWidth: 2,
                        borderRadius: 1000,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 8,
                        paddingBottom: 8,
                    }}
                    onPress={() => {
                        storeViaMMKV();
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#0F0F0F',
                        }}
                    >{"MMKV"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderWidth: 2,
                        borderRadius: 1000,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 8,
                        paddingBottom: 8,
                    }}
                    onPress={() => {
                        storeViaAsyncStorage();
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#0F0F0F',
                        }}
                    >{"Async Storage"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderWidth: 2,
                        borderRadius: 1000,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 8,
                        paddingBottom: 8,
                    }}
                    onPress={() => {
                        storeViaSecureStore();
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#0F0F0F',
                        }}
                    >{"Secure Store"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        borderWidth: 2,
                        borderRadius: 1000,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 8,
                        paddingBottom: 8,
                    }}
                    onPress={() => {
                        storeViaSQLite();
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#0F0F0F',
                        }}
                    >{"SQLite"}</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

            </View>
        </SafeAreaView>
    );
};

export default StorageSaver;