import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import Colors from '../constants/Colors';

interface IProps {
  loading?: boolean;
  children?: any;
}

const Loader = (props: IProps) => {
  if (!props.loading) {
    return props.children;
  }

  return (
    <View style={{ flex: 1,justifyContent:"center",alignItems:"center"}} >
      <ActivityIndicator size="large" color={Colors.tintColor} />
    </View>        
  );
}
Loader.defaultProps = {
  loading: true
}
export default Loader;