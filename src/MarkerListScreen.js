import React from "react";
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from "./auth-context";
import { calcLastSeen } from "./utils";

export default function MarkerListScreen() {
  const { usersData } = useAuth();

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{item.email}</Text>
      <Text>last seen {calcLastSeen(item.timestamp)}s</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={usersData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  }
});