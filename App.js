import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

import api from './src/services/api';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('users');

      const first = response.data.slice(0, 5);

      const order = first.map((item) => {
        const teste = item.name;

        return teste;
      });

      const orderBy = order.sort();

      setUsers(orderBy);

      setLoading(false);
    }

    loadUsers();
  }, []);

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator color="#000" size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          {users.map((item) => (
            <Text key={item} style={styles.text}>
              {item}
            </Text>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 25,
  },
});

export default App;
