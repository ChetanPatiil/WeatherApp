import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({ loading, size = 'large' }) => {
  if (!loading) return null;

  return (
    <View style={styles.loader}>
      <ActivityIndicator size={size} color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItemalignItems: 'center',
},
});

export default Loader;